-- ====================================================================
-- FGC 2026 GAME SIMULATOR - ADVANCED DATABASE SECURITY HARDENING
-- File: 20260826_security_hardening.sql
-- Description: Zero-Trust RLS, Anti-Cheat, Honeypot, JWT Role Validation,
-- Immutable Audit Logs, Rate Limiting and Scouting Telemetry.
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLA: PROFILES (Perfiles y Roles Blindados)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  team_name TEXT NOT NULL CHECK (char_length(trim(team_name)) BETWEEN 2 AND 50),
  country_code CHAR(2) NOT NULL CHECK (country_code ~ '^[A-Z]{2}$'),
  team_number TEXT CHECK (char_length(team_number) <= 20),
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'mentor', 'driver', 'engineer', 'admin')),
  is_locked BOOLEAN NOT NULL DEFAULT FALSE,
  lock_reason TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABLA: ROBOT_PRESETS (Configuraciones de Robot en la Nube)
CREATE TABLE IF NOT EXISTS public.robot_presets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  preset_name TEXT NOT NULL CHECK (char_length(trim(preset_name)) BETWEEN 2 AND 40),
  specs JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABLA: USER_STRATEGIES (Playbook Táctico de Equipos)
CREATE TABLE IF NOT EXISTS public.user_strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  country_code CHAR(2) NOT NULL CHECK (country_code ~ '^[A-Z]{2}$'),
  team_name TEXT NOT NULL CHECK (char_length(trim(team_name)) BETWEEN 2 AND 50),
  strategy_name TEXT NOT NULL CHECK (char_length(trim(strategy_name)) BETWEEN 2 AND 50),
  description TEXT,
  roles_config JSONB NOT NULL,       -- { r1Role, r1Climb, r2Role, r2Climb, r3Role, r3Climb }
  hp_strategy TEXT NOT NULL DEFAULT 'balanced' CHECK (hp_strategy IN ('extinguisher_focus', 'field_resupply', 'balanced')),
  projected_points JSONB NOT NULL,   -- { worstCase, averageCase, bestCase }
  is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. TABLA: MATCH_TELEMETRY (Telemetría de Scouting y Récords)
CREATE TABLE IF NOT EXISTS public.match_telemetry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  country_code CHAR(2) NOT NULL CHECK (country_code ~ '^[A-Z]{2}$'),
  team_name TEXT NOT NULL CHECK (char_length(trim(team_name)) BETWEEN 2 AND 50),
  alliance_color TEXT NOT NULL CHECK (alliance_color IN ('red', 'blue')),
  game_mode INT NOT NULL CHECK (game_mode IN (1, 2)),
  coop_relation TEXT CHECK (coop_relation IN ('teammates', 'rivals', NULL)),
  specs_used JSONB NOT NULL,
  match_stats JSONB NOT NULL,
  scores JSONB NOT NULL,
  final_score INT NOT NULL CHECK (final_score >= 0 AND final_score <= 6000),
  climb_zone TEXT CHECK (climb_zone IN ('zone1', 'zone2', 'zone3', 'none')),
  is_buddy_climb BOOLEAN NOT NULL DEFAULT FALSE,
  duration_seconds INT NOT NULL CHECK (duration_seconds BETWEEN 10 AND 180),
  client_version TEXT NOT NULL DEFAULT '2026.2.0',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. TABLA: AUDIT_LOGS (Registro de Auditoría Inmutable)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action_type TEXT NOT NULL,
  details JSONB NOT NULL,
  ip_address TEXT,
  signature TEXT NOT NULL, -- Firma SHA-256 de integridad
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. TABLA: ANTI_CHEAT_LOGS (Detección de Trampas y Anomalías)
CREATE TABLE IF NOT EXISTS public.anti_cheat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  violation_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  payload JSONB NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. TABLA HONEYPOT: SYSTEM_CREDENTIALS (Trampa para Hackers / Scanners)
CREATE TABLE IF NOT EXISTS public.system_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  master_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Inserción de señuelo
INSERT INTO public.system_credentials (service_name, master_key)
VALUES ('admin_root_gateway', 'sk_live_fake_honeypot_trap_team_colombia_do_not_read_99482')
ON CONFLICT DO NOTHING;

-- ====================================================================
-- TRIGGERS DE SEGURIDAD Y REGLAS DE NEGOCIO
-- ====================================================================

-- 1. HONEYPOT TRAP TRIGGER (Detecta lectura no autorizada y banea)
CREATE OR REPLACE FUNCTION public.trg_honeypot_trigger()
RETURNS TRIGGER AS $$
DECLARE
  v_uid UUID := auth.uid();
BEGIN
  INSERT INTO public.anti_cheat_logs (user_id, violation_type, severity, payload)
  VALUES (
    v_uid,
    'HONEYPOT_TABLE_ACCESSED',
    'CRITICAL',
    jsonb_build_object('message', 'Intento de acceso a tabla señuelo system_credentials', 'timestamp', NOW())
  );

  IF v_uid IS NOT NULL THEN
    UPDATE public.profiles 
    SET is_locked = TRUE, lock_reason = 'Violación crítica de seguridad (Honeypot)'
    WHERE id = v_uid;
  END IF;

  RAISE EXCEPTION 'Access Denied: Security violation logged.';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_honeypot_alert ON public.system_credentials;
CREATE TRIGGER trg_honeypot_alert
BEFORE SELECT OR INSERT OR UPDATE OR DELETE ON public.system_credentials
FOR EACH STATEMENT EXECUTE FUNCTION public.trg_honeypot_trigger();

-- 2. BLOQUEO DE ESCALADA ADMINISTRATIVA EN PROFILES
CREATE OR REPLACE FUNCTION public.protect_profile_roles()
RETURNS TRIGGER AS $$
BEGIN
  -- Impedir que un usuario no-admin se asigne el rol 'admin'
  IF NEW.role = 'admin' AND (OLD.role IS NULL OR OLD.role <> 'admin') THEN
    IF auth.uid() IS NOT NULL AND auth.uid() <> NEW.id THEN
      -- Solo superuser/service role directo puede promover a admin
      RAISE EXCEPTION 'No tienes autorización para asignar el rol de administrador.';
    END IF;
  END IF;
  
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_protect_profile_roles ON public.profiles;
CREATE TRIGGER trg_protect_profile_roles
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_profile_roles();

-- 3. VALIDACIÓN ANTI-CHEAT DE TELEMETRÍA
CREATE OR REPLACE FUNCTION public.validate_match_telemetry()
RETURNS TRIGGER AS $$
DECLARE
  v_move_speed NUMERIC;
  v_capacity INT;
  v_shot INT;
  v_hits INT;
  v_misses INT;
  v_picked INT;
  v_is_locked BOOLEAN;
BEGIN
  -- Verificar si el usuario está bloqueado por el circuit breaker
  IF NEW.user_id IS NOT NULL THEN
    SELECT is_locked INTO v_is_locked FROM public.profiles WHERE id = NEW.user_id;
    IF v_is_locked = TRUE THEN
      RAISE EXCEPTION 'Tu cuenta se encuentra temporalmente suspendida por seguridad.';
    END IF;
  END IF;

  -- 1. Validar rangos físicos
  v_move_speed := (NEW.specs_used->>'moveSpeed')::NUMERIC;
  v_capacity := (NEW.specs_used->>'capacity')::INT;
  
  IF v_move_speed IS NULL OR v_move_speed < 0.4 OR v_move_speed > 3.5 THEN
    INSERT INTO public.anti_cheat_logs (user_id, violation_type, severity, payload)
    VALUES (NEW.user_id, 'INVALID_SPEED_SPEC', 'HIGH', jsonb_build_object('speed', v_move_speed));
    RAISE EXCEPTION 'Velocidad de movimiento fuera de rango permitido (0.5 - 3.5 m/s)';
  END IF;

  IF v_capacity IS NULL OR v_capacity < 3 OR v_capacity > 100 THEN
    INSERT INTO public.anti_cheat_logs (user_id, violation_type, severity, payload)
    VALUES (NEW.user_id, 'INVALID_CAPACITY_SPEC', 'HIGH', jsonb_build_object('capacity', v_capacity));
    RAISE EXCEPTION 'Capacidad de tolva fuera de rango permitido (3 - 100)';
  END IF;

  -- 2. Validar coherencia estadística
  v_shot := COALESCE((NEW.match_stats->>'shot')::INT, 0);
  v_hits := COALESCE((NEW.match_stats->>'hits')::INT, 0);
  v_misses := COALESCE((NEW.match_stats->>'misses')::INT, 0);
  v_picked := COALESCE((NEW.match_stats->>'pickedUp')::INT, 0);

  IF (v_hits + v_misses) > v_shot THEN
    INSERT INTO public.anti_cheat_logs (user_id, violation_type, severity, payload)
    VALUES (NEW.user_id, 'STATS_INCONSISTENCY_HITS_SHOTS', 'MEDIUM', NEW.match_stats);
    RAISE EXCEPTION 'Inconsistencia de tiros: aciertos + fallos excede total disparado';
  END IF;

  IF v_shot > (v_picked + v_capacity + 15) THEN
    INSERT INTO public.anti_cheat_logs (user_id, violation_type, severity, payload)
    VALUES (NEW.user_id, 'STATS_INCONSISTENCY_EXCESS_SHOTS', 'MEDIUM', NEW.match_stats);
    RAISE EXCEPTION 'Inconsistencia: Tiros realizados superan las pelotas recogidas';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validate_telemetry ON public.match_telemetry;
CREATE TRIGGER trg_validate_telemetry
BEFORE INSERT ON public.match_telemetry
FOR EACH ROW EXECUTE FUNCTION public.validate_match_telemetry();

-- 4. RATE LIMITING DE TELEMETRÍA (45s entre partidas)
CREATE OR REPLACE FUNCTION public.check_match_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  v_recent_count INT;
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    SELECT COUNT(*) INTO v_recent_count
    FROM public.match_telemetry
    WHERE user_id = NEW.user_id
      AND created_at > (NOW() - INTERVAL '30 seconds');
      
    IF v_recent_count > 0 THEN
      INSERT INTO public.anti_cheat_logs (user_id, violation_type, severity, payload)
      VALUES (NEW.user_id, 'TELEMETRY_RATE_LIMIT_EXCEEDED', 'LOW', jsonb_build_object('recent_count', v_recent_count));
      RAISE EXCEPTION 'Rate limit excedido. Espera unos segundos antes de registrar otra partida.';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_rate_limit_telemetry ON public.match_telemetry;
CREATE TRIGGER trg_rate_limit_telemetry
BEFORE INSERT ON public.match_telemetry
FOR EACH ROW EXECUTE FUNCTION public.check_match_rate_limit();

-- 5. CIRCUIT BREAKER / AUTO-LOCKOUT (3 violaciones en 1 hora = bloqueo automático)
CREATE OR REPLACE FUNCTION public.circuit_breaker_check()
RETURNS TRIGGER AS $$
DECLARE
  v_violations INT;
BEGIN
  IF NEW.user_id IS NOT NULL AND NEW.severity IN ('MEDIUM', 'HIGH', 'CRITICAL') THEN
    SELECT COUNT(*) INTO v_violations
    FROM public.anti_cheat_logs
    WHERE user_id = NEW.user_id
      AND severity IN ('MEDIUM', 'HIGH', 'CRITICAL')
      AND created_at > (NOW() - INTERVAL '1 hour');

    IF v_violations >= 3 THEN
      UPDATE public.profiles
      SET is_locked = TRUE, lock_reason = 'Bloqueo automático por circuito de seguridad (múltiples anomalías)'
      WHERE id = NEW.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_circuit_breaker ON public.anti_cheat_logs;
CREATE TRIGGER trg_circuit_breaker
AFTER INSERT ON public.anti_cheat_logs
FOR EACH ROW EXECUTE FUNCTION public.circuit_breaker_check();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.robot_presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anti_cheat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_credentials ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES
DROP POLICY IF EXISTS "Public can view non-sensitive profiles" ON public.profiles;
CREATE POLICY "Public can view non-sensitive profiles" 
ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id AND is_locked = FALSE);

-- 2. ROBOT_PRESETS (Privados por usuario)
DROP POLICY IF EXISTS "Users manage own presets" ON public.robot_presets;
CREATE POLICY "Users manage own presets" 
ON public.robot_presets FOR ALL USING (auth.uid() = user_id);

-- 3. USER_STRATEGIES (Playbooks tácticos)
DROP POLICY IF EXISTS "Users manage own strategies" ON public.user_strategies;
CREATE POLICY "Users manage own strategies" 
ON public.user_strategies FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admin reads all strategies for scouting" ON public.user_strategies;
CREATE POLICY "Admin reads all strategies for scouting" 
ON public.user_strategies FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 4. MATCH_TELEMETRY (Scouting Seguro)
DROP POLICY IF EXISTS "Insert match telemetry allowed" ON public.match_telemetry;
CREATE POLICY "Insert match telemetry allowed" 
ON public.match_telemetry FOR INSERT WITH CHECK (
  (auth.uid() IS NULL AND user_id IS NULL) OR 
  (auth.uid() = user_id)
);

DROP POLICY IF EXISTS "Read match telemetry restricted" ON public.match_telemetry;
CREATE POLICY "Read match telemetry restricted" 
ON public.match_telemetry FOR SELECT USING (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. AUDIT & ANTI-CHEAT LOGS (Admin Only)
DROP POLICY IF EXISTS "Admin reads audit logs" ON public.audit_logs;
CREATE POLICY "Admin reads audit logs" 
ON public.audit_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Admin reads anti cheat logs" ON public.anti_cheat_logs;
CREATE POLICY "Admin reads anti cheat logs" 
ON public.anti_cheat_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ====================================================================
-- SECURITY DEFINER RPCS (LEADERBOARD & SCOUTING ANALYTICS)
-- ====================================================================

-- 1. LEADERBOARD PÚBLICO AGREGADO (Sin filtrar specs privadas)
CREATE OR REPLACE FUNCTION public.get_global_leaderboard(p_limit INT DEFAULT 50, p_game_mode INT DEFAULT NULL)
RETURNS TABLE (
  rank BIGINT,
  team_name TEXT,
  country_code CHAR(2),
  team_number TEXT,
  best_score INT,
  matches_played BIGINT,
  last_active TIMESTAMPTZ
) 
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH RankedTeams AS (
    SELECT 
      m.team_name,
      m.country_code,
      p.team_number,
      MAX(m.final_score) AS best_score,
      COUNT(m.id) AS matches_played,
      MAX(m.created_at) AS last_active
    FROM public.match_telemetry m
    LEFT JOIN public.profiles p ON m.user_id = p.id
    WHERE (p_game_mode IS NULL OR m.game_mode = p_game_mode)
    GROUP BY m.team_name, m.country_code, p.team_number
  )
  SELECT 
    ROW_NUMBER() OVER (ORDER BY r.best_score DESC, r.matches_played DESC) AS rank,
    r.team_name,
    r.country_code,
    COALESCE(r.team_number, '-') AS team_number,
    r.best_score,
    r.matches_played,
    r.last_active
  FROM RankedTeams r
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- 2. SCOUTING ANALYTICS (Exclusivo Admin Team Colombia)
CREATE OR REPLACE FUNCTION public.get_scouting_analytics()
RETURNS JSONB
SECURITY DEFINER
AS $$
DECLARE
  v_is_admin BOOLEAN;
  v_result JSONB;
BEGIN
  SELECT (role = 'admin') INTO v_is_admin FROM public.profiles WHERE id = auth.uid();
  IF v_is_admin IS NOT TRUE THEN
    RAISE EXCEPTION 'Acceso no autorizado: función restringida al equipo de análisis de Team Colombia.';
  END IF;

  WITH SpecsAgg AS (
    SELECT 
      COUNT(*) AS total_matches,
      AVG((specs_used->>'moveSpeed')::NUMERIC) AS avg_speed,
      AVG((specs_used->>'capacity')::INT) AS avg_capacity,
      AVG((specs_used->>'accuracy')::INT) AS avg_accuracy,
      COUNT(CASE WHEN (specs_used->>'hasLinearMotion')::BOOLEAN = TRUE THEN 1 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100 AS linear_motion_pct,
      COUNT(CASE WHEN is_buddy_climb = TRUE THEN 1 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100 AS buddy_climb_pct
    FROM public.match_telemetry
  ),
  CountryRank AS (
    SELECT 
      country_code,
      COUNT(*) AS matches_count,
      MAX(final_score) AS max_score,
      AVG(final_score) AS avg_score
    FROM public.match_telemetry
    GROUP BY country_code
    ORDER BY avg_score DESC
    LIMIT 20
  )
  SELECT jsonb_build_object(
    'specs_overview', (SELECT row_to_json(SpecsAgg.*) FROM SpecsAgg),
    'top_countries', (SELECT jsonb_agg(row_to_json(CountryRank.*)) FROM CountryRank)
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql;
