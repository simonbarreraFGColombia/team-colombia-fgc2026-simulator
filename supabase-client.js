/**
 * Supabase Client & Security Service Layer
 * FGC 2026 Game Simulator - Team Colombia
 */

// Global Configuration (Live Supabase Project)
const SUPABASE_CONFIG = {
  url: window.__ENV_SUPABASE_URL || localStorage.getItem('FGC_SUPABASE_URL') || 'https://trocdxhugqfagdegbbgz.supabase.co',
  anonKey: window.__ENV_SUPABASE_ANON_KEY || localStorage.getItem('FGC_SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyb2NkeGh1Z3FmYWdkZWdiYmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMDUyOTksImV4cCI6MjEwMzU4MTI5OX0.eil2VNWjAJlTNo6ei-UO9GnyoH7l9fnocSUjn3PT348'
};

// Initialize Supabase Client
let supabaseClient = null;
try {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
} catch (e) {
  console.warn("Supabase client init fallback:", e);
}

// ── 1. SECURITY & SANITIZATION HELPERS ────────────────────────────
const SecurityUtils = {
  // Strip dangerous characters and HTML tags (Anti-XSS)
  sanitizeText(input, maxLen = 60) {
    if (typeof input !== 'string') return '';
    const clean = input
      .replace(/<[^>]*>?/gm, '') // Remove HTML tags
      .replace(/[^\w\s\u00C0-\u017F#\-_().,]/gi, '') // Keep alphanumeric, latin accents, standard symbols
      .trim();
    return clean.slice(0, maxLen);
  },

  // Validate Physical Robot Specs Bounds
  validateSpecs(specs) {
    if (!specs || typeof specs !== 'object') return false;
    const speed = parseFloat(specs.moveSpeed);
    const cap = parseInt(specs.capacity);
    const acc = parseInt(specs.accuracy);
    const climb = parseFloat(specs.climbSpeed);

    if (isNaN(speed) || speed < 0.4 || speed > 3.5) return false;
    if (isNaN(cap) || cap < 3 || cap > 100) return false;
    if (isNaN(acc) || acc < 10 || acc > 100) return false;
    if (isNaN(climb) || climb < 0.1 || climb > 2.0) return false;
    return true;
  },

  // Client-Side Rate Limiter
  rateLimiter: {
    lastMatchTime: 0,
    lastPresetTime: 0,
    lastStrategyTime: 0,
    
    canSendMatch() {
      const now = Date.now();
      if (now - this.lastMatchTime < 15000) return false; // Min 15s between matches locally
      this.lastMatchTime = now;
      return true;
    },
    
    canSendPreset() {
      const now = Date.now();
      if (now - this.lastPresetTime < 2000) return false;
      this.lastPresetTime = now;
      return true;
    }
  }
};

// ── 2. AUTHENTICATION SERVICE ────────────────────────────────────
const AuthService = {
  currentUser: null,
  currentProfile: null,
  listeners: [],

  async init() {
    if (!supabaseClient) return;
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session?.user) {
        this.currentUser = session.user;
        await this.loadProfile(session.user.id);
      }
      
      supabaseClient.auth.onAuthStateChange(async (event, session) => {
        this.currentUser = session?.user || null;
        if (this.currentUser) {
          await this.loadProfile(this.currentUser.id);
        } else {
          this.currentProfile = null;
        }
        this.notifyListeners();
      });
    } catch (e) {
      console.warn("Auth initialization error:", e);
    }
  },

  subscribe(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
      listener(this.currentUser, this.currentProfile);
    }
  },

  notifyListeners() {
    this.listeners.forEach(fn => fn(this.currentUser, this.currentProfile));
  },

  async loadProfile(userId) {
    if (!supabaseClient || !userId) return null;
    try {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (!error && data) {
        this.currentProfile = data;
        return data;
      }
    } catch (e) {
      console.error("Error loading user profile:", e);
    }
    return null;
  },

  async signUp(email, password, { teamName, countryCode, teamNumber, role = 'student' }) {
    if (!supabaseClient) throw new Error("Supabase no inicializado.");
    const cleanTeam = SecurityUtils.sanitizeText(teamName, 50);
    const cleanNumber = SecurityUtils.sanitizeText(teamNumber, 15);
    const cleanCountry = (countryCode || 'CO').toUpperCase().slice(0, 2);

    const { data, error } = await supabaseClient.auth.signUp({
      email: email.trim(),
      password: password
    });

    if (error) throw error;
    if (data.user) {
      // Create profile record
      const { error: pError } = await supabaseClient.from('profiles').insert({
        id: data.user.id,
        email: email.trim(),
        team_name: cleanTeam || 'Equipo FGC',
        country_code: cleanCountry,
        team_number: cleanNumber,
        role: role
      });
      if (pError) console.warn("Profile creation notice:", pError);
      await this.loadProfile(data.user.id);
    }
    return data;
  },

  async signIn(email, password) {
    if (!supabaseClient) throw new Error("Supabase no inicializado.");
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email.trim(),
      password: password
    });
    if (error) throw error;
    if (data.user) {
      await this.loadProfile(data.user.id);
    }
    return data;
  },

  async signOut() {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
    this.currentUser = null;
    this.currentProfile = null;
    this.notifyListeners();
  },

  isAdmin() {
    return this.currentProfile?.role === 'admin';
  }
};

// ── 3. PRESETS SERVICE ───────────────────────────────────────────
const PresetService = {
  async getPresets() {
    if (!supabaseClient || !AuthService.currentUser) {
      // Local storage fallback for offline / guest
      const local = localStorage.getItem('fgc_local_presets');
      return local ? JSON.parse(local) : [];
    }
    try {
      const { data, error } = await supabaseClient
        .from('robot_presets')
        .select('*')
        .eq('user_id', AuthService.currentUser.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn("PresetService getPresets fallback:", e);
      return [];
    }
  },

  async savePreset(name, specs) {
    const cleanName = SecurityUtils.sanitizeText(name, 35);
    if (!cleanName) throw new Error("El nombre del preset no es válido.");
    if (!SecurityUtils.validateSpecs(specs)) throw new Error("Especificaciones del robot fuera de límites permitidos.");

    if (!SecurityUtils.rateLimiter.canSendPreset()) {
      throw new Error("Por favor espera un momento antes de guardar otro preset.");
    }

    if (!supabaseClient || !AuthService.currentUser) {
      // Save locally
      const local = await this.getPresets();
      const newPreset = { id: 'local_' + Date.now(), preset_name: cleanName, specs, created_at: new Date().toISOString() };
      local.unshift(newPreset);
      localStorage.setItem('fgc_local_presets', JSON.stringify(local.slice(0, 10)));
      return newPreset;
    }

    const { data, error } = await supabaseClient
      .from('robot_presets')
      .insert({
        user_id: AuthService.currentUser.id,
        preset_name: cleanName,
        specs: specs
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deletePreset(presetId) {
    if (!supabaseClient || !AuthService.currentUser) {
      const local = await this.getPresets();
      const filtered = local.filter(p => p.id !== presetId);
      localStorage.setItem('fgc_local_presets', JSON.stringify(filtered));
      return true;
    }
    const { error } = await supabaseClient
      .from('robot_presets')
      .delete()
      .eq('id', presetId)
      .eq('user_id', AuthService.currentUser.id);
    if (error) throw error;
    return true;
  }
};

// ── 4. STRATEGY PLAYBOOK SERVICE ─────────────────────────────────
const StrategyService = {
  async getStrategies() {
    if (!supabaseClient || !AuthService.currentUser) {
      const local = localStorage.getItem('fgc_local_strategies');
      return local ? JSON.parse(local) : [];
    }
    try {
      const { data, error } = await supabaseClient
        .from('user_strategies')
        .select('*')
        .eq('user_id', AuthService.currentUser.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn("StrategyService getStrategies fallback:", e);
      return [];
    }
  },

  async saveStrategy(strategyData) {
    const cleanName = SecurityUtils.sanitizeText(strategyData.strategy_name, 40);
    const cleanDesc = SecurityUtils.sanitizeText(strategyData.description, 200);
    if (!cleanName) throw new Error("Nombre de estrategia inválido.");

    const payload = {
      strategy_name: cleanName,
      description: cleanDesc,
      roles_config: strategyData.roles_config || {},
      hp_strategy: strategyData.hp_strategy || 'balanced',
      projected_points: strategyData.projected_points || {},
      country_code: AuthService.currentProfile?.country_code || 'CO',
      team_name: AuthService.currentProfile?.team_name || 'Equipo Anónimo'
    };

    if (!supabaseClient || !AuthService.currentUser) {
      const local = await this.getStrategies();
      const newStrat = { id: 'local_strat_' + Date.now(), ...payload, created_at: new Date().toISOString() };
      local.unshift(newStrat);
      localStorage.setItem('fgc_local_strategies', JSON.stringify(local.slice(0, 10)));
      return newStrat;
    }

    const { data, error } = await supabaseClient
      .from('user_strategies')
      .insert({
        user_id: AuthService.currentUser.id,
        ...payload
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ── 5. TELEMETRY & SCOUTING SERVICE ──────────────────────────────
const TelemetryService = {
  async submitMatch(matchPayload) {
    if (!SecurityUtils.rateLimiter.canSendMatch()) {
      console.log("Telemetry rate limited locally, skipping duplicate submission.");
      return;
    }

    const country = AuthService.currentProfile?.country_code || localStorage.getItem('fgc_guest_country') || 'CO';
    const team = AuthService.currentProfile?.team_name || localStorage.getItem('fgc_guest_team') || 'Guest Player';

    const record = {
      user_id: AuthService.currentUser?.id || null,
      country_code: country.toUpperCase().slice(0, 2),
      team_name: SecurityUtils.sanitizeText(team, 50),
      alliance_color: matchPayload.alliance === 'red' ? 'red' : 'blue',
      game_mode: matchPayload.gameMode || 1,
      coop_relation: matchPayload.coopRelation || null,
      specs_used: matchPayload.specs || {},
      match_stats: matchPayload.stats || {},
      scores: matchPayload.scores || {},
      final_score: Math.max(0, Math.min(6000, parseInt(matchPayload.finalScore) || 0)),
      climb_zone: matchPayload.climbZone || 'none',
      is_buddy_climb: Boolean(matchPayload.isBuddy),
      duration_seconds: Math.max(10, Math.min(180, parseInt(matchPayload.duration) || 150))
    };

    if (!supabaseClient) {
      // Save to offline queue
      this.enqueueOffline(record);
      return;
    }

    try {
      const { error } = await supabaseClient
        .from('match_telemetry')
        .insert(record);
      if (error) {
        console.warn("Match telemetry insert notice:", error.message);
        this.enqueueOffline(record);
      } else {
        // Flush any pending offline matches
        this.flushOfflineQueue();
      }
    } catch (e) {
      console.warn("Failed to send match telemetry:", e);
      this.enqueueOffline(record);
    }
  },

  enqueueOffline(record) {
    try {
      const queue = JSON.parse(localStorage.getItem('fgc_offline_telemetry') || '[]');
      queue.push(record);
      localStorage.setItem('fgc_offline_telemetry', JSON.stringify(queue.slice(-20)));
    } catch (e) {}
  },

  async flushOfflineQueue() {
    if (!supabaseClient) return;
    try {
      const queue = JSON.parse(localStorage.getItem('fgc_offline_telemetry') || '[]');
      if (queue.length === 0) return;
      const { error } = await supabaseClient.from('match_telemetry').insert(queue);
      if (!error) {
        localStorage.removeItem('fgc_offline_telemetry');
      }
    } catch (e) {}
  }
};

// ── 6. LEADERBOARD SERVICE ───────────────────────────────────────
const LeaderboardService = {
  async getLeaderboard(limit = 50, gameMode = null) {
    if (!supabaseClient) {
      return [
        { rank: 1, team_name: 'Team Colombia 🇨🇴', country_code: 'CO', team_number: '#108', best_score: 540, matches_played: 28 },
        { rank: 2, team_name: 'Team Mexico 🇲🇽', country_code: 'MX', team_number: '#142', best_score: 495, matches_played: 19 },
        { rank: 3, team_name: 'Team Germany 🇩🇪', country_code: 'DE', team_number: '#56', best_score: 480, matches_played: 22 },
        { rank: 4, team_name: 'Team Kazakhstan 🇰🇿', country_code: 'KZ', team_number: '#88', best_score: 465, matches_played: 15 }
      ];
    }
    try {
      const { data, error } = await supabaseClient.rpc('get_global_leaderboard', {
        p_limit: limit,
        p_game_mode: gameMode
      });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn("Leaderboard RPC fallback:", e);
      return [];
    }
  }
};

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', () => {
  AuthService.init();
});
