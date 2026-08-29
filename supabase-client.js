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

// ── 1. FGC WORLD COUNTRIES CATALOG (Excluding Surinam, Islandia, Suiza, Arabia Saudita, Kuwait, Armenia, Chipre, Nueva Zelanda, Andorra, Corea del Norte) ─────────
const EXCLUDED_COUNTRY_CODES = new Set(['SR', 'IS', 'CH', 'SA', 'KW', 'AM', 'CY', 'NZ', 'AD', 'KP']);

const FGC_COUNTRIES = [
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
  { code: 'CI', name: 'Ivory Coast', flag: '🇨🇮' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' }
].filter(c => !EXCLUDED_COUNTRY_CODES.has(c.code));

// Profile Avatar Presets (STEM & Robotics Themed)
const AVATAR_PRESETS = [
  { id: 'pilot', name: 'Robot Pilot', icon: '🤖', bg: '#3b82f6' },
  { id: 'engineer', name: 'Lead Engineer', icon: '⚙️', bg: '#f59e0b' },
  { id: 'strategist', name: 'Alliance Strategist', icon: '🧠', bg: '#10b981' },
  { id: 'coder', name: 'Autonomous Coder', icon: '💻', bg: '#8b5cf6' },
  { id: 'mechanic', name: 'Chassis Mechanic', icon: '🔧', bg: '#ef4444' },
  { id: 'scientist', name: 'Quantum Scientist', icon: '🔬', bg: '#06b6d4' },
  { id: 'mentor', name: 'Master Mentor', icon: '🛡️', bg: '#ffd700' },
  { id: 'captain', name: 'Team Captain', icon: '⭐', bg: '#ec4899' }
];

// Helper to get country info
function getCountryInfo(code) {
  const c = FGC_COUNTRIES.find(x => x.code === (code || '').toUpperCase());
  return c || { code: code || 'CO', name: 'World Team', flag: '🌐' };
}

// ── 2. SECURITY & SANITIZATION HELPERS ────────────────────────────
const SecurityUtils = {
  sanitizeText(input, maxLen = 60) {
    if (typeof input !== 'string') return '';
    const clean = input
      .replace(/<[^>]*>?/gm, '')
      .replace(/[^\w\s\u00C0-\u017F#\-_().,@]/gi, '')
      .trim();
    return clean.slice(0, maxLen);
  },

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

  rateLimiter: {
    lastMatchTime: 0,
    lastPresetTime: 0,
    lastStrategyTime: 0,
    
    canSendMatch() {
      const now = Date.now();
      if (now - this.lastMatchTime < 15000) return false;
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

// ── 3. AUTHENTICATION & USER PROFILE SERVICE ───────────────────────
const AuthService = {
  currentUser: null,
  currentProfile: null,
  listeners: [],

  async init() {
    // Restore cached profile immediately for instant UI
    const cached = localStorage.getItem('fgc_active_profile');
    if (cached) {
      try { this.currentProfile = JSON.parse(cached); } catch (e) {}
    }

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
          localStorage.removeItem('fgc_active_profile');
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

  getUserProfile() {
    if (this.currentProfile) return this.currentProfile;
    const cached = localStorage.getItem('fgc_active_profile');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return null;
  },

  async loadProfile(userId) {
    if (!userId) return null;
    try {
      if (supabaseClient) {
        const { data, error } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        if (!error && data) {
          this.currentProfile = data;
          localStorage.setItem('fgc_active_profile', JSON.stringify(data));
          return data;
        }
      }
    } catch (e) {
      console.error("Error loading user profile from Supabase:", e);
    }

    // Fallback to local profile cache
    const cached = localStorage.getItem('fgc_active_profile');
    if (cached) {
      try {
        this.currentProfile = JSON.parse(cached);
        return this.currentProfile;
      } catch (e) {}
    }
    return null;
  },

  async signUp(email, password, { username, teamName, countryCode, role = 'student', avatarUrl = 'pilot' }) {
    if (!supabaseClient) throw new Error("Supabase no inicializado.");
    const cleanUser = SecurityUtils.sanitizeText(username, 30) || 'Player_' + Math.floor(Math.random()*1000);
    const cleanTeam = SecurityUtils.sanitizeText(teamName, 50) || `Team ${cleanUser}`;
    const cleanCountry = (countryCode || 'CO').toUpperCase().slice(0, 2);
    const cleanRole = role === 'mentor' ? 'mentor' : 'student';

    const { data, error } = await supabaseClient.auth.signUp({
      email: email.trim(),
      password: password
    });

    if (error) throw error;
    if (data.user) {
      const profileData = {
        id: data.user.id,
        email: email.trim(),
        username: cleanUser,
        team_name: cleanTeam,
        country_code: cleanCountry,
        role: cleanRole,
        avatar_url: avatarUrl || 'pilot'
      };

      try {
        const { error: pError } = await supabaseClient.from('profiles').insert(profileData);
        if (pError) console.warn("Profile table insert notice:", pError.message);
      } catch (e) {}

      this.currentProfile = profileData;
      localStorage.setItem('fgc_active_profile', JSON.stringify(profileData));
      this.currentUser = data.user;
      this.notifyListeners();
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
      this.currentUser = data.user;
      await this.loadProfile(data.user.id);
      this.notifyListeners();
    }
    return data;
  },

  async signOut() {
    if (supabaseClient) {
      try { await supabaseClient.auth.signOut(); } catch (e) {}
    }
    this.currentUser = null;
    this.currentProfile = null;
    localStorage.removeItem('fgc_active_profile');
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

    const profile = AuthService.getUserProfile();
    const country = profile?.country_code || 'CO';
    const team = profile?.team_name || 'Guest Team';
    const user = profile?.username || 'Player';
    const role = profile?.role || 'student';
    const avatar = profile?.avatar_url || 'pilot';

    const record = {
      user_id: AuthService.currentUser?.id || null,
      username: SecurityUtils.sanitizeText(user, 30),
      team_name: SecurityUtils.sanitizeText(team, 50),
      country_code: country.toUpperCase().slice(0, 2),
      role: role,
      avatar_url: avatar,
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
    if (supabaseClient) {
      try {
        let query = supabaseClient
          .from('match_telemetry')
          .select('username, team_name, country_code, role, avatar_url, final_score, created_at')
          .order('final_score', { ascending: false })
          .limit(limit);

        if (gameMode) {
          query = query.eq('game_mode', gameMode);
        }

        const { data: rawMatches, error: rawError } = await query;
        if (!rawError && rawMatches && rawMatches.length > 0) {
          const map = new Map();
          rawMatches.forEach(m => {
            const key = m.team_name || m.username || 'Team';
            if (!map.has(key)) {
              map.set(key, {
                username: m.username || key,
                team_name: key,
                country_code: m.country_code || 'CO',
                role: m.role || 'student',
                avatar_url: m.avatar_url || 'pilot',
                best_score: m.final_score,
                matches_played: 1
              });
            } else {
              const cur = map.get(key);
              cur.matches_played++;
              if (m.final_score > cur.best_score) cur.best_score = m.final_score;
            }
          });

          return Array.from(map.values())
            .sort((a, b) => b.best_score - a.best_score)
            .map((item, idx) => ({ rank: idx + 1, ...item }));
        }
      } catch (e) {
        console.warn("Leaderboard query:", e);
      }
    }

    return [];
  }
};

// ── 7. AUTH GUARD & ROUTE PROTECTION ──────────────────────────────
const AuthGuard = {
  isProtectedPage() {
    const p = window.location.pathname.toLowerCase();
    return p.includes('simulacion') || p.includes('estrategias') || p.includes('calculadora') || p.includes('scouting');
  },

  checkAccess() {
    if (!this.isProtectedPage()) return true;

    // Retrieve active user from cache/session
    const user = AuthService.getUser();
    if (!user) {
      // Save target page to redirect back once logged in
      sessionStorage.setItem('fgc_redirect_after_auth', window.location.href);
      window.location.replace('index.html?auth=required');
      return false;
    }
    return true;
  }
};

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', () => {
  AuthService.init();
  AuthGuard.checkAccess();
});
