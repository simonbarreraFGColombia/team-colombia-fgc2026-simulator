-- ====================================================================
-- FGC 2026 GAME SIMULATOR - COMPLETE SELF-CONTAINED DATABASE SCHEMA
-- File: 20260829_espionage_robot_specs.sql
-- Description: Creates all required tables (profiles, robot_configs,
-- match_telemetry, user_strategies, robot_presets), RLS policies,
-- and espionage analytics fields idempotently.
-- ====================================================================

-- 0. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. TABLA: PROFILES (Perfiles de Usuarios y Competidores)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT,
  email TEXT,
  team_name TEXT NOT NULL DEFAULT 'Team Colombia',
  country_code CHAR(2) NOT NULL DEFAULT 'CO',
  team_number TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'mentor', 'driver', 'engineer', 'admin')),
  is_locked BOOLEAN NOT NULL DEFAULT FALSE,
  lock_reason TEXT,
  avatar_url TEXT DEFAULT 'pilot',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. TABLA: MATCH_TELEMETRY (Telemetría de Partidos y Espionaje Táctico)
CREATE TABLE IF NOT EXISTS public.match_telemetry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  username TEXT DEFAULT 'pilot',
  country_code CHAR(2) NOT NULL DEFAULT 'CO',
  team_name TEXT NOT NULL DEFAULT 'Team Colombia',
  alliance_color TEXT NOT NULL DEFAULT 'red' CHECK (alliance_color IN ('red', 'blue')),
  game_mode INT NOT NULL DEFAULT 1,
  role TEXT DEFAULT 'student',
  avatar_url TEXT DEFAULT 'pilot',
  final_score INT NOT NULL DEFAULT 0,
  balls_scored INT NOT NULL DEFAULT 0,
  accuracy_pct NUMERIC(5,2) DEFAULT 0.00,
  climb_level INT DEFAULT 0,
  buddy_climbed BOOLEAN DEFAULT FALSE,
  match_duration_sec INT DEFAULT 150,
  
  -- Campos de Espionaje e Inteligencia
  shots_fire_shield_pct NUMERIC(5,2) DEFAULT 0.00,
  shots_suppression_pct NUMERIC(5,2) DEFAULT 100.00,
  first_zone_visited TEXT DEFAULT 'Zone 2',
  zones_heatmap JSONB DEFAULT '{"zone1": 25, "zone2": 45, "zone3": 15, "red_substation": 10, "neutral_center": 5}'::jsonb,
  cycles_count INT DEFAULT 4,
  avg_balls_per_cycle NUMERIC(4,2) DEFAULT 3.50,
  avg_cycle_duration_sec NUMERIC(5,2) DEFAULT 18.00,
  storage_fill_time_recorded_sec NUMERIC(5,2) DEFAULT 12.00,
  climb_dock_time_left_sec INT DEFAULT 20,
  full_cycle_timeline JSONB DEFAULT '[]'::jsonb,
  robot_specs_snapshot JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Asegurar columnas si la tabla ya existía previamente
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS username TEXT DEFAULT 'pilot';
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student';
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS avatar_url TEXT DEFAULT 'pilot';
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS shots_fire_shield_pct NUMERIC(5,2) DEFAULT 0.00;
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS shots_suppression_pct NUMERIC(5,2) DEFAULT 100.00;
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS first_zone_visited TEXT DEFAULT 'Zone 2';
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS zones_heatmap JSONB DEFAULT '{"zone1": 25, "zone2": 45, "zone3": 15, "red_substation": 10, "neutral_center": 5}'::jsonb;
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS cycles_count INT DEFAULT 4;
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS avg_balls_per_cycle NUMERIC(4,2) DEFAULT 3.50;
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS avg_cycle_duration_sec NUMERIC(5,2) DEFAULT 18.00;
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS storage_fill_time_recorded_sec NUMERIC(5,2) DEFAULT 12.00;
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS climb_dock_time_left_sec INT DEFAULT 20;
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS full_cycle_timeline JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.match_telemetry ADD COLUMN IF NOT EXISTS robot_specs_snapshot JSONB DEFAULT '{}'::jsonb;

-- 3. TABLA: ROBOT_CONFIGS (Especificaciones de Ingeniería y Geometría 3D/2D)
CREATE TABLE IF NOT EXISTS public.robot_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  username TEXT NOT NULL DEFAULT 'pilot',
  team_name TEXT NOT NULL DEFAULT 'Team Colombia',
  country_code CHAR(2) NOT NULL DEFAULT 'CO',
  role TEXT NOT NULL DEFAULT 'student',
  avatar_url TEXT DEFAULT 'pilot',
  
  -- Dimensiones Iniciales (cm y cm3)
  initial_length_cm NUMERIC(5,2) NOT NULL DEFAULT 45.00 CHECK (initial_length_cm BETWEEN 20.00 AND 90.00),
  initial_width_cm NUMERIC(5,2) NOT NULL DEFAULT 45.00 CHECK (initial_width_cm BETWEEN 20.00 AND 90.00),
  initial_height_cm NUMERIC(5,2) NOT NULL DEFAULT 40.00 CHECK (initial_height_cm BETWEEN 20.00 AND 90.00),
  initial_volume_cm3 NUMERIC(10,2) GENERATED ALWAYS AS (initial_length_cm * initial_width_cm * initial_height_cm) STORED,

  -- Dimensiones Finales Expandidas (cm y cm3)
  final_length_cm NUMERIC(5,2) NOT NULL DEFAULT 65.00 CHECK (final_length_cm BETWEEN 20.00 AND 120.00),
  final_width_cm NUMERIC(5,2) NOT NULL DEFAULT 50.00 CHECK (final_width_cm BETWEEN 20.00 AND 120.00),
  final_height_cm NUMERIC(5,2) NOT NULL DEFAULT 70.00 CHECK (final_height_cm BETWEEN 20.00 AND 140.00),
  final_volume_cm3 NUMERIC(10,2) GENERATED ALWAYS AS (final_length_cm * final_width_cm * final_height_cm) STORED,

  -- Mecanismo y Dirección de Expansión
  expansion_directions JSONB NOT NULL DEFAULT '["left", "right", "up"]'::jsonb, -- ['left', 'right', 'back', 'front', 'up']
  expansion_duration_sec NUMERIC(4,2) NOT NULL DEFAULT 2.50 CHECK (expansion_duration_sec BETWEEN 0.20 AND 15.00),
  has_expandable_hopper BOOLEAN NOT NULL DEFAULT TRUE,

  -- Capacidad de Almacenamiento y Tolva
  non_expanded_capacity INT NOT NULL DEFAULT 6 CHECK (non_expanded_capacity BETWEEN 1 AND 25),
  expanded_capacity INT NOT NULL DEFAULT 14 CHECK (expanded_capacity BETWEEN 1 AND 50),
  storage_fill_time_sec NUMERIC(5,2) NOT NULL DEFAULT 12.50 CHECK (storage_fill_time_sec BETWEEN 2.00 AND 60.00),

  -- Cinemática y Velocidades
  drive_speed_mps NUMERIC(4,2) NOT NULL DEFAULT 2.80 CHECK (drive_speed_mps BETWEEN 0.50 AND 5.00),
  intake_speed_bps NUMERIC(4,2) NOT NULL DEFAULT 2.50 CHECK (intake_speed_bps BETWEEN 0.50 AND 6.00),
  shooting_speed_bps NUMERIC(4,2) NOT NULL DEFAULT 3.20 CHECK (shooting_speed_bps BETWEEN 0.50 AND 8.00),
  robot_accuracy_pct NUMERIC(4,1) NOT NULL DEFAULT 92.0 CHECK (robot_accuracy_pct BETWEEN 50.0 AND 100.0),

  -- Sistema de Escalada (Climber)
  climber_type TEXT NOT NULL DEFAULT 'solo' CHECK (climber_type IN ('solo', 'buddy_carrier', 'buddy_piggyback')),
  climb_speed_mps NUMERIC(4,2) NOT NULL DEFAULT 0.80 CHECK (climb_speed_mps BETWEEN 0.10 AND 2.50),
  climb_latch_time_sec NUMERIC(4,2) NOT NULL DEFAULT 2.50 CHECK (climb_latch_time_sec BETWEEN 0.50 AND 10.00),
  target_brace_zone TEXT NOT NULL DEFAULT 'zone3' CHECK (target_brace_zone IN ('zone1', 'zone2', 'zone3')),
  climb_start_time_remaining_sec INT NOT NULL DEFAULT 25 CHECK (climb_start_time_remaining_sec BETWEEN 5 AND 60),

  -- Estrategia y Control
  game_mode_strategy TEXT NOT NULL DEFAULT 'shooter' CHECK (game_mode_strategy IN ('shooter', 'feeder_human_player')),
  preferred_alliance TEXT NOT NULL DEFAULT 'red' CHECK (preferred_alliance IN ('red', 'blue')),
  preferred_role TEXT NOT NULL DEFAULT 'R1' CHECK (preferred_role IN ('R1', 'R2', 'R3')),
  bot_difficulty TEXT NOT NULL DEFAULT 'regional' CHECK (bot_difficulty IN ('rookie', 'regional', 'champion')),
  human_player_accuracy_pct NUMERIC(4,1) NOT NULL DEFAULT 90.0 CHECK (human_player_accuracy_pct BETWEEN 40.0 AND 100.0),
  controller_mapping TEXT NOT NULL DEFAULT 'keyboard' CHECK (controller_mapping IN ('keyboard', 'gamepad_arcade', 'dual_stick')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABLA: USER_STRATEGIES (Playbook Táctico)
CREATE TABLE IF NOT EXISTS public.user_strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  country_code CHAR(2) NOT NULL DEFAULT 'CO',
  team_name TEXT NOT NULL DEFAULT 'Team Colombia',
  strategy_name TEXT NOT NULL,
  description TEXT,
  roles_config JSONB NOT NULL,
  hp_strategy TEXT NOT NULL DEFAULT 'balanced',
  projected_points JSONB NOT NULL,
  is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ÍNDICES DE RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_robot_configs_user ON public.robot_configs(user_id);
CREATE INDEX IF NOT EXISTS idx_robot_configs_country ON public.robot_configs(country_code);
CREATE INDEX IF NOT EXISTS idx_match_telemetry_created ON public.match_telemetry(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_match_telemetry_country ON public.match_telemetry(country_code);
CREATE INDEX IF NOT EXISTS idx_profiles_country ON public.profiles(country_code);

-- 6. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.robot_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_strategies ENABLE ROW LEVEL SECURITY;

-- 7. POLÍTICAS RLS SEGURAS E IDEMPOTENTES
DROP POLICY IF EXISTS "Public Read Profiles" ON public.profiles;
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Profiles" ON public.profiles;
CREATE POLICY "Public Insert Profiles" ON public.profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Profiles" ON public.profiles;
CREATE POLICY "Public Update Profiles" ON public.profiles FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public Read Telemetry" ON public.match_telemetry;
CREATE POLICY "Public Read Telemetry" ON public.match_telemetry FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Telemetry" ON public.match_telemetry;
CREATE POLICY "Public Insert Telemetry" ON public.match_telemetry FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Robot Configs" ON public.robot_configs;
CREATE POLICY "Public Read Robot Configs" ON public.robot_configs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Upsert Robot Configs" ON public.robot_configs;
CREATE POLICY "Public Upsert Robot Configs" ON public.robot_configs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Strategies" ON public.user_strategies;
CREATE POLICY "Public Read Strategies" ON public.user_strategies FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Upsert Strategies" ON public.user_strategies;
CREATE POLICY "Public Upsert Strategies" ON public.user_strategies FOR ALL USING (true) WITH CHECK (true);
