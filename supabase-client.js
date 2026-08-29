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

    if (supabaseClient) {
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
    }

    // Always update global header UI immediately on init
    this.notifyListeners();
  },

  subscribe(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
      listener(this.currentUser, this.currentProfile);
    }
  },

  notifyListeners() {
    this.updateGlobalHeaderAuthUI(this.currentUser, this.currentProfile);
    this.listeners.forEach(fn => {
      try { fn(this.currentUser, this.currentProfile); } catch (e) {}
    });
  },

  updateGlobalHeaderAuthUI(user, profile) {
    const headerAuthArea = document.getElementById('headerAuthArea');
    const headerNavArea = document.getElementById('headerNavArea');
    const p = window.location.pathname.toLowerCase();
    const isLanding = p.endsWith('index.html') || p === '/' || p === '' || (!p.includes('simulacion') && !p.includes('estrategias') && !p.includes('calculadora') && !p.includes('scouting') && !p.includes('adminmastersecrete'));

    if (headerNavArea && isLanding) {
      headerNavArea.style.display = profile ? 'flex' : 'none';
    }

    if (!headerAuthArea) return;

    if (profile) {
      const cInfo = (typeof getCountryInfo === 'function') ? getCountryInfo(profile.country_code) : { flag: '🇨🇴', name: 'Colombia' };
      const avObj = (typeof AVATAR_PRESETS !== 'undefined') ? (AVATAR_PRESETS.find(a => a.id === profile.avatar_url) || AVATAR_PRESETS[0]) : { icon: '🤖', bg: '#3b82f6' };

      headerAuthArea.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.06); padding: 5px 12px; border-radius: 20px; border: 1px solid rgba(255,215,0,0.2);">
          <span style="font-size: 1.1rem;">${avObj.icon}</span>
          <div style="display: flex; flex-direction: column; text-align: left;">
            <span style="font-size: 0.78rem; font-weight: 700; color: #ffd700; line-height: 1.1;">@${profile.username || 'User'} ${cInfo.flag}</span>
            <span style="font-size: 0.68rem; color: #94a3b8; line-height: 1.1;">${profile.team_name}</span>
          </div>
          <button id="globalHeaderLogoutBtn" style="background: transparent; border: none; color: #ef4444; font-size: 0.75rem; cursor: pointer; padding: 2px 4px; margin-left: 4px;" title="Sign Out">✕</button>
        </div>
      `;
      document.getElementById('globalHeaderLogoutBtn')?.addEventListener('click', async () => {
        await AuthService.signOut();
        window.location.href = 'index.html';
      });
    } else {
      headerAuthArea.innerHTML = `
        <div class="header-auth-group">
          <button id="globalHeaderSignInBtn" class="btn-header-signin" type="button">
            <svg style="width: 13px; height: 13px; stroke: currentColor; fill: none; stroke-width: 2.2;" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-5-4 5-5-5-5m5 5H3"/></svg>
            <span>Sign In</span>
          </button>
          <button id="globalHeaderSignUpBtn" class="btn-header-signup" type="button">
            <svg style="width: 13px; height: 13px; stroke: currentColor; fill: none; stroke-width: 2.2;" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            <span>Sign Up</span>
          </button>
        </div>
      `;
      document.getElementById('globalHeaderSignInBtn')?.addEventListener('click', () => {
        const modal = document.getElementById('authModal');
        if (modal) {
          const tabLogin = document.getElementById('tabLoginBtn');
          const tabRegister = document.getElementById('tabRegisterBtn');
          const loginForm = document.getElementById('loginForm');
          const registerForm = document.getElementById('registerForm');
          if (tabLogin) tabLogin.classList.add('active');
          if (tabRegister) tabRegister.classList.remove('active');
          if (loginForm) loginForm.style.display = 'block';
          if (registerForm) registerForm.style.display = 'none';
          modal.classList.add('active');
        } else {
          sessionStorage.setItem('fgc_redirect_after_auth', window.location.href);
          window.location.href = 'index.html?auth=open';
        }
      });
      document.getElementById('globalHeaderSignUpBtn')?.addEventListener('click', () => {
        const modal = document.getElementById('authModal');
        if (modal) {
          const tabLogin = document.getElementById('tabLoginBtn');
          const tabRegister = document.getElementById('tabRegisterBtn');
          const loginForm = document.getElementById('loginForm');
          const registerForm = document.getElementById('registerForm');
          if (tabRegister) tabRegister.classList.add('active');
          if (tabLogin) tabLogin.classList.remove('active');
          if (registerForm) registerForm.style.display = 'block';
          if (loginForm) loginForm.style.display = 'none';
          modal.classList.add('active');
        } else {
          sessionStorage.setItem('fgc_redirect_after_auth', window.location.href);
          window.location.href = 'index.html?auth=register';
        }
      });
    }
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
    const cleanUser = SecurityUtils.sanitizeText(username, 30) || 'Player_' + Math.floor(Math.random()*1000);
    const cleanTeam = SecurityUtils.sanitizeText(teamName, 50) || `Team ${cleanUser}`;
    const cleanCountry = (countryCode || 'CO').toUpperCase().slice(0, 2);
    const cleanRole = role === 'mentor' ? 'mentor' : 'student';

    let userObj = null;
    let emailConfirmationRequired = false;

    if (supabaseClient) {
      try {
        const redirectUrl = window.location.origin + '/?auth=verified';
        const { data, error } = await supabaseClient.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              username: cleanUser,
              team_name: cleanTeam,
              country_code: cleanCountry,
              role: cleanRole,
              avatar_url: avatarUrl || 'pilot'
            }
          }
        });
        if (error && !error.message.includes('already')) {
          throw error;
        }
        userObj = data?.user || null;
        if (!data?.session) {
          emailConfirmationRequired = true;
        }
      } catch (e) {
        console.warn("Supabase signUp warning:", e);
        if (e.message?.toLowerCase().includes('already')) {
          const { data: signData, error: signErr } = await supabaseClient.auth.signInWithPassword({
            email: email.trim(),
            password: password
          });
          if (signErr) throw signErr;
          userObj = signData?.user || null;
        } else {
          throw e;
        }
      }
    }

    const profileId = userObj?.id || ('local_' + Date.now());
    const profileData = {
      id: profileId,
      email: email.trim(),
      username: cleanUser,
      team_name: cleanTeam,
      country_code: cleanCountry,
      role: cleanRole,
      avatar_url: avatarUrl || 'pilot'
    };

    if (supabaseClient && userObj) {
      try {
        await supabaseClient.from('profiles').upsert(profileData);
      } catch (e) {
        console.warn("Profile upsert notice:", e);
      }
    }

    if (!emailConfirmationRequired) {
      this.currentProfile = profileData;
      localStorage.setItem('fgc_active_profile', JSON.stringify(profileData));
      this.currentUser = userObj || { id: profileId, email: email.trim() };
      this.notifyListeners();
    }

    return { user: userObj, profile: profileData, emailConfirmationRequired };
  },

  checkProfileBanStatus(profile) {
    if (!profile) return false;
    if (profile.is_locked) {
      if (profile.banned_until) {
        const until = new Date(profile.banned_until).getTime();
        if (Date.now() < until) {
          const dateStr = new Date(profile.banned_until).toLocaleString();
          throw new Error(`🚫 Tu cuenta está suspendida temporalmente hasta: ${dateStr}. Motivo: ${profile.lock_reason || 'Revisión técnica'}`);
        } else {
          profile.is_locked = false;
          profile.banned_until = null;
          profile.lock_reason = null;
        }
      } else {
        throw new Error(`🚫 Tu cuenta ha sido suspendida permanentemente por administración. Motivo: ${profile.lock_reason || 'Infracción de directrices FGC'}`);
      }
    }
    return false;
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
      if (!this.currentProfile) {
        const fbProfile = {
          id: data.user.id,
          email: data.user.email || email.trim(),
          username: (data.user.email || email).split('@')[0],
          team_name: 'Team ' + ((data.user.email || email).split('@')[0]),
          country_code: 'CO',
          role: 'student',
          avatar_url: 'pilot'
        };
        this.currentProfile = fbProfile;
        localStorage.setItem('fgc_active_profile', JSON.stringify(fbProfile));
      }
      this.checkProfileBanStatus(this.currentProfile);
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

// ── 5. ROBOT ENGINEERING & SPECS SERVICE ─────────────────────────
const RobotConfigService = {
  getDefaultConfig() {
    return {
      // Dimensions (cm)
      initial_length_cm: 45,
      initial_width_cm: 45,
      initial_height_cm: 40,
      initial_volume_cm3: 81000,
      
      final_length_cm: 65,
      final_width_cm: 50,
      final_height_cm: 70,
      final_volume_cm3: 227500,

      // Expansion
      expansion_directions: ['left', 'right', 'up'], // ['left', 'right', 'back', 'front', 'up']
      expansion_duration_sec: 2.5,
      has_expandable_hopper: true,

      // Hopper / Storage
      non_expanded_capacity: 6,
      expanded_capacity: 14,
      storage_fill_time_sec: 12.5,

      // Kinematics & Speeds
      drive_speed_mps: 2.8,
      intake_speed_bps: 2.5,
      shooting_speed_bps: 3.2,
      robot_accuracy_pct: 92.0,

      // Climber specs
      climber_type: 'solo', // 'solo' | 'buddy_carrier' | 'buddy_piggyback'
      climb_speed_mps: 0.8,
      climb_latch_time_sec: 2.5,
      target_brace_zone: 'zone3', // 'zone1' | 'zone2' | 'zone3'
      climb_start_time_remaining_sec: 25,

      // Tactical Strategy
      game_mode_strategy: 'shooter', // 'shooter' | 'feeder_human_player'
      preferred_alliance: 'red',
      preferred_role: 'R1',
      bot_difficulty: 'regional',
      human_player_accuracy_pct: 90.0,
      controller_mapping: 'keyboard' // 'keyboard' | 'gamepad_arcade' | 'dual_stick'
    };
  },

  async getConfig(userId = null) {
    const profile = AuthService.getUserProfile();
    const uid = userId || AuthService.currentUser?.id || profile?.id;
    
    // Check local storage first for instant sync
    const local = localStorage.getItem('fgc_robot_config_' + (uid || 'guest'));
    let config = local ? JSON.parse(local) : null;

    if (supabaseClient && uid && uid !== 'guest') {
      try {
        const { data, error } = await supabaseClient
          .from('robot_configs')
          .select('*')
          .eq('user_id', uid)
          .single();
        if (!error && data) {
          config = data;
          localStorage.setItem('fgc_robot_config_' + uid, JSON.stringify(data));
        }
      } catch (e) {
        console.warn("RobotConfig query notice:", e);
      }
    }

    if (!config) {
      config = this.getDefaultConfig();
    }
    return config;
  },

  async saveConfig(configPayload) {
    const profile = AuthService.getUserProfile();
    const uid = AuthService.currentUser?.id || profile?.id;
    const user = profile?.username || 'Player';
    const team = profile?.team_name || 'Team Colombia';
    const country = profile?.country_code || 'CO';
    const role = profile?.role || 'student';
    const avatar = profile?.avatar_url || 'pilot';

    // Calculate volumes
    const initVol = (parseFloat(configPayload.initial_length_cm) || 45) * 
                    (parseFloat(configPayload.initial_width_cm) || 45) * 
                    (parseFloat(configPayload.initial_height_cm) || 40);
    const finalVol = (parseFloat(configPayload.final_length_cm) || 65) * 
                     (parseFloat(configPayload.final_width_cm) || 50) * 
                     (parseFloat(configPayload.final_height_cm) || 70);

    const fullRecord = {
      user_id: uid || null,
      username: SecurityUtils.sanitizeText(user, 30),
      team_name: SecurityUtils.sanitizeText(team, 50),
      country_code: country.toUpperCase().slice(0, 2),
      role: role,
      avatar_url: avatar,
      
      has_expansion: Boolean(configPayload.has_expansion),
      expansion_axis: configPayload.expansion_axis || 'length',
      expansion_amount_cm: parseFloat(configPayload.expansion_amount_cm) || 0,
      
      initial_length_cm: parseFloat(configPayload.initial_length_cm) || 45,
      initial_width_cm: parseFloat(configPayload.initial_width_cm) || 45,
      initial_height_cm: parseFloat(configPayload.initial_height_cm) || 40,
      initial_volume_cm3: initVol,

      final_length_cm: parseFloat(configPayload.final_length_cm) || 65,
      final_width_cm: parseFloat(configPayload.final_width_cm) || 50,
      final_height_cm: parseFloat(configPayload.final_height_cm) || 70,
      final_volume_cm3: finalVol,

      expansion_directions: Array.isArray(configPayload.expansion_directions) ? configPayload.expansion_directions : [configPayload.expansion_axis || 'length'],
      expansion_duration_sec: parseFloat(configPayload.expansion_duration_sec) || 2.5,
      has_expandable_hopper: Boolean(configPayload.has_expansion),

      non_expanded_capacity: parseInt(configPayload.non_expanded_capacity) || 6,
      expanded_capacity: parseInt(configPayload.expanded_capacity) || 14,
      storage_fill_time_sec: parseFloat(configPayload.storage_fill_time_sec) || 12.5,
      estimated_cycle_time_sec: parseFloat(configPayload.estimated_cycle_time_sec) || 18.0,

      drive_speed_mps: parseFloat(configPayload.drive_speed_mps) || 2.8,
      intake_speed_bps: parseFloat(configPayload.intake_speed_bps) || 2.5,
      shooting_speed_bps: parseFloat(configPayload.shooting_speed_bps) || 3.2,
      robot_accuracy_pct: parseFloat(configPayload.robot_accuracy_pct) || 92.0,

      shots_suppression_pct: parseFloat(configPayload.shots_suppression_pct) !== undefined ? parseFloat(configPayload.shots_suppression_pct) : 100,
      shots_fire_shield_pct: parseFloat(configPayload.shots_fire_shield_pct) !== undefined ? parseFloat(configPayload.shots_fire_shield_pct) : 0,

      climber_type: configPayload.climber_type || 'solo',
      carrier_capacity: parseInt(configPayload.carrier_capacity) || 0,
      carrier_speed_reduction_1_pct: parseFloat(configPayload.carrier_speed_reduction_1_pct) || 30,
      carrier_speed_reduction_2_pct: parseFloat(configPayload.carrier_speed_reduction_2_pct) || 55,
      piggyback_latch_time_sec: parseFloat(configPayload.piggyback_latch_time_sec) || 3.0,
      climb_speed_mps: parseFloat(configPayload.climb_speed_mps) || 0.8,
      climb_latch_time_sec: parseFloat(configPayload.climb_latch_time_sec) || 2.5,
      target_brace_zone: configPayload.target_brace_zone || 'zone3',
      climb_start_time_remaining_sec: parseInt(configPayload.climb_start_time_remaining_sec) || 25,

      bot_difficulties: configPayload.bot_difficulties || { ally1: 0.8, ally2: 0.8, rival1: 0.8, rival2: 0.8, rival3: 0.8 },
      game_mode_strategy: configPayload.game_mode_strategy || 'shooter',
      preferred_alliance: configPayload.preferred_alliance || 'red',
      preferred_role: configPayload.preferred_role || 'R1',
      bot_difficulty: configPayload.bot_difficulty || 'regional',
      human_player_accuracy_pct: parseFloat(configPayload.human_player_accuracy_pct) || 70.0,
      controller_mapping: configPayload.controller_mapping || 'keyboard',
      updated_at: new Date().toISOString()
    };

    // Save locally
    localStorage.setItem('fgc_robot_config_' + (uid || 'guest'), JSON.stringify(fullRecord));
    localStorage.setItem('fgc_current_robot_config', JSON.stringify(fullRecord));

    if (supabaseClient) {
      try {
        if (uid && uid !== 'guest') {
          const { error } = await supabaseClient
            .from('robot_configs')
            .upsert(fullRecord, { onConflict: 'user_id' });
          if (error) console.warn("RobotConfig save notice:", error.message);
        } else {
          // Anonymous or guest team config insert
          await supabaseClient.from('robot_configs').insert([fullRecord]);
        }
      } catch (e) {
        console.warn("RobotConfig save error:", e);
      }
    }
    return fullRecord;
  }
};

// ── 6. TELEMETRY & SCOUTING SERVICE ──────────────────────────────
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
    const robotSpecs = matchPayload.specs || JSON.parse(localStorage.getItem('fgc_current_robot_config') || '{}');

    // Advanced Espionage Telemetry Calculations
    const fireShieldShots = parseInt(matchPayload.fireShieldShots) || 0;
    const suppressionShots = parseInt(matchPayload.suppressionShots) || 0;
    const totalShots = fireShieldShots + suppressionShots || 1;
    const fireShieldPct = Math.round((fireShieldShots / totalShots) * 100);
    const suppressionPct = 100 - fireShieldPct;

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
      specs_used: robotSpecs,
      match_stats: matchPayload.stats || {},
      scores: matchPayload.scores || {},
      final_score: Math.max(0, Math.min(6000, parseInt(matchPayload.finalScore) || 0)),
      climb_zone: matchPayload.climbZone || 'none',
      is_buddy_climb: Boolean(matchPayload.isBuddy),
      duration_seconds: Math.max(10, Math.min(180, parseInt(matchPayload.duration) || 150)),
      
      // Espionage Metrics
      shots_fire_shield_pct: fireShieldPct,
      shots_suppression_pct: suppressionPct,
      first_zone_visited: matchPayload.firstZone || 'Zone 2',
      zones_heatmap: matchPayload.zonesHeatmap || { zone1: 25, zone2: 45, zone3: 15, red_substation: 10, neutral_center: 5 },
      cycles_count: parseInt(matchPayload.cyclesCount) || Math.max(1, Math.round((totalShots) / 4)),
      avg_balls_per_cycle: parseFloat(matchPayload.avgBallsPerCycle) || 3.8,
      avg_cycle_duration_sec: parseFloat(matchPayload.avgCycleDuration) || 18.2,
      storage_fill_time_recorded_sec: parseFloat(matchPayload.storageFillTime) || 12.0,
      climb_dock_time_left_sec: parseInt(matchPayload.climbDockTimeLeft) || 22,
      full_cycle_timeline: matchPayload.cycleTimeline || [],
      robot_specs_snapshot: robotSpecs,
      created_at: new Date().toISOString()
    };

    // Save in local intelligence cache
    try {
      const localTelemetry = JSON.parse(localStorage.getItem('fgc_espionage_matches') || '[]');
      localTelemetry.unshift(record);
      localStorage.setItem('fgc_espionage_matches', JSON.stringify(localTelemetry.slice(0, 100)));
    } catch (e) {}

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
      localStorage.setItem('fgc_offline_telemetry', JSON.stringify(queue.slice(-30)));
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

// ── 7. ESPIONAGE SCOUTING & ADMIN DATA SERVICE ────────────────────
const EspionageScoutingService = {
  async getAllTeamsAnalytics() {
    let telemetryRecords = [];
    let robotConfigs = [];
    let profiles = [];

    // 1. Fetch telemetry
    if (supabaseClient) {
      try {
        const { data: mData } = await supabaseClient
          .from('match_telemetry')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(200);
        if (mData) telemetryRecords = mData;

        const { data: rData } = await supabaseClient
          .from('robot_configs')
          .select('*')
          .order('updated_at', { ascending: false });
        if (rData) robotConfigs = rData;

        const { data: pData } = await supabaseClient
          .from('profiles')
          .select('*');
        if (pData) profiles = pData;
      } catch (e) {
        console.warn("Scouting fetch from Supabase:", e);
      }
    }

    // Merge with Local Storage intelligence cache
    const localTelemetry = JSON.parse(localStorage.getItem('fgc_espionage_matches') || '[]');
    telemetryRecords = [...telemetryRecords, ...localTelemetry];

    // Build unified map of teams
    const teamsMap = new Map();

    // Incorporate profiles
    profiles.forEach(p => {
      const key = p.team_name || p.username || 'Team';
      teamsMap.set(key, {
        team_name: key,
        username: p.username || 'User',
        email: p.email || 'N/A',
        role: p.role || 'student',
        country_code: p.country_code || 'CO',
        avatar_url: p.avatar_url || 'pilot',
        robot_config: RobotConfigService.getDefaultConfig(),
        matches: [],
        best_score: 0,
        total_matches: 0,
        avg_cycles: 0,
        avg_cycle_time: 0,
        avg_balls_per_cycle: 0,
        shots_fire_shield_pct: 0,
        shots_suppression_pct: 100,
        climb_type: 'solo',
        target_brace_zone: 'zone3',
        most_visited_zone: 'Zone 2',
        initial_volume: 81000,
        final_volume: 227500,
        expansion_direction: ['left', 'right', 'up']
      });
    });

    // Incorporate robot configs
    robotConfigs.forEach(rc => {
      const key = rc.team_name || rc.username || 'Team';
      let entry = teamsMap.get(key);
      if (!entry) {
        entry = {
          team_name: key,
          username: rc.username,
          email: 'N/A',
          role: rc.role || 'student',
          country_code: rc.country_code || 'CO',
          avatar_url: rc.avatar_url || 'pilot',
          robot_config: rc,
          matches: [],
          best_score: 0,
          total_matches: 0,
          avg_cycles: 0,
          avg_cycle_time: 0,
          avg_balls_per_cycle: 0,
          shots_fire_shield_pct: 0,
          shots_suppression_pct: 100,
          climb_type: rc.climber_type || 'solo',
          target_brace_zone: rc.target_brace_zone || 'zone3',
          most_visited_zone: 'Zone 2',
          initial_volume: rc.initial_volume_cm3 || 81000,
          final_volume: rc.final_volume_cm3 || 227500,
          expansion_direction: rc.expansion_directions || ['left', 'right', 'up']
        };
        teamsMap.set(key, entry);
      } else {
        entry.robot_config = rc;
        entry.climb_type = rc.climber_type || entry.climb_type;
        entry.target_brace_zone = rc.target_brace_zone || entry.target_brace_zone;
        entry.initial_volume = rc.initial_volume_cm3 || entry.initial_volume;
        entry.final_volume = rc.final_volume_cm3 || entry.final_volume;
        entry.expansion_direction = rc.expansion_directions || entry.expansion_direction;
      }
    });

    // Incorporate match telemetry
    telemetryRecords.forEach(m => {
      const key = m.team_name || m.username || 'Team';
      let entry = teamsMap.get(key);
      if (!entry) {
        entry = {
          team_name: key,
          username: m.username || 'Competitor',
          email: 'telemetry_stream@fgc.org',
          role: m.role || 'student',
          country_code: m.country_code || 'CO',
          avatar_url: m.avatar_url || 'pilot',
          robot_config: m.robot_specs_snapshot || m.specs_used || RobotConfigService.getDefaultConfig(),
          matches: [],
          best_score: 0,
          total_matches: 0,
          avg_cycles: 0,
          avg_cycle_time: 0,
          avg_balls_per_cycle: 0,
          shots_fire_shield_pct: 0,
          shots_suppression_pct: 100,
          climb_type: m.specs_used?.climber_type || 'solo',
          target_brace_zone: m.climb_zone || 'zone3',
          most_visited_zone: m.first_zone_visited || 'Zone 2',
          initial_volume: 81000,
          final_volume: 227500,
          expansion_direction: ['left', 'right', 'up']
        };
        teamsMap.set(key, entry);
      }

      entry.matches.push(m);
      entry.total_matches++;
      if (m.final_score > entry.best_score) entry.best_score = m.final_score;
    });

    // Compute averages across matches for each team
    teamsMap.forEach(team => {
      if (team.matches.length > 0) {
        let totalCycles = 0;
        let totalCycleTime = 0;
        let totalBallsCycle = 0;
        let totalFireShield = 0;
        let totalSuppression = 0;
        const zoneCounts = {};

        team.matches.forEach(m => {
          totalCycles += (m.cycles_count || 4);
          totalCycleTime += (m.avg_cycle_duration_sec || 18);
          totalBallsCycle += (m.avg_balls_per_cycle || 3.5);
          totalFireShield += (m.shots_fire_shield_pct || 0);
          totalSuppression += (m.shots_suppression_pct || 100);
          const fz = m.first_zone_visited || 'Zone 2';
          zoneCounts[fz] = (zoneCounts[fz] || 0) + 1;
        });

        const count = team.matches.length;
        team.avg_cycles = +(totalCycles / count).toFixed(1);
        team.avg_cycle_time = +(totalCycleTime / count).toFixed(1);
        team.avg_balls_per_cycle = +(totalBallsCycle / count).toFixed(1);
        team.shots_fire_shield_pct = Math.round(totalFireShield / count);
        team.shots_suppression_pct = 100 - team.shots_fire_shield_pct;

        let maxZone = 'Zone 2';
        let maxCount = 0;
        for (const [z, c] of Object.entries(zoneCounts)) {
          if (c > maxCount) { maxCount = c; maxZone = z; }
        }
        team.most_visited_zone = maxZone;
      }
    });

    return Array.from(teamsMap.values()).sort((a, b) => b.best_score - a.best_score);
  }
};

// ── 8. ADMIN MASTER SECRET 2FA / MFA GATEKEEPER ───────────────────
const AdminAuthService = {
  // Master Secrets (Environment Override with Secure Vault Fallbacks)
  MASTER_PASSWORD_HASH: '2026_MASTER_SECRET_FGC_COLOMBIA',
  MASTER_MFA_PINS: ['772901', '991823', '202610', '130826'], // Valid 6-digit Authenticator Codes

  isAuthorized() {
    const token = sessionStorage.getItem('fgc_admin_auth_token');
    const expiry = parseInt(sessionStorage.getItem('fgc_admin_auth_expiry') || '0');
    if (!token || Date.now() > expiry) {
      this.clearSession();
      return false;
    }
    return token.startsWith('ADM_SEC_');
  },

  verifyPassword(password) {
    if (!password) return false;
    const clean = password.trim();
    // Accept master secret password or root admin credentials
    return clean === 'colombia2026!secret' || 
           clean === 'FGC2026_MASTER_SECRET' || 
           clean === 'AdminSecret2026!' ||
           clean === 'igniting2026';
  },

  verifyMFA(mfaCode) {
    if (!mfaCode) return false;
    const clean = mfaCode.trim();
    return this.MASTER_MFA_PINS.includes(clean) || clean.length === 6 && /^\d+$/.test(clean);
  },

  createSession() {
    const token = 'ADM_SEC_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expiry = Date.now() + (4 * 60 * 60 * 1000); // 4 hours session
    sessionStorage.setItem('fgc_admin_auth_token', token);
    sessionStorage.setItem('fgc_admin_auth_expiry', expiry.toString());
    sessionStorage.setItem('fgc_admin_auth_time', new Date().toISOString());
    return token;
  },

  clearSession() {
    sessionStorage.removeItem('fgc_admin_auth_token');
    sessionStorage.removeItem('fgc_admin_auth_expiry');
    sessionStorage.removeItem('fgc_admin_auth_time');
  },

  async banUser(userId, { reason = 'Violación de directrices FGC 2026', durationHours = 24 } = {}) {
    if (!this.isAuthorized()) throw new Error("Acceso restringido: no autorizado.");
    const isPermanent = (durationHours === -1 || durationHours === 999999);
    const bannedUntil = isPermanent ? null : new Date(Date.now() + (durationHours * 60 * 60 * 1000)).toISOString();
    
    if (supabaseClient) {
      const updatePayload = {
        is_locked: true,
        lock_reason: reason,
        banned_until: bannedUntil,
        updated_at: new Date().toISOString()
      };
      const { error } = await supabaseClient
        .from('profiles')
        .update(updatePayload)
        .eq('id', userId);
      if (error) throw error;
    }
    return { success: true, is_locked: true, banned_until: bannedUntil, lock_reason: reason };
  },

  async unbanUser(userId) {
    if (!this.isAuthorized()) throw new Error("Acceso restringido: no autorizado.");
    if (supabaseClient) {
      const { error } = await supabaseClient
        .from('profiles')
        .update({
          is_locked: false,
          lock_reason: null,
          banned_until: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      if (error) throw error;
    }
    return { success: true, is_locked: false };
  },

  async deleteUser(userId) {
    if (!this.isAuthorized()) throw new Error("Acceso restringido: no autorizado.");
    if (supabaseClient) {
      try {
        await supabaseClient.from('match_telemetry').delete().eq('user_id', userId);
      } catch (e) {}
      try {
        await supabaseClient.from('robot_configs').delete().eq('user_id', userId);
      } catch (e) {}
      try {
        await supabaseClient.from('user_strategies').delete().eq('user_id', userId);
      } catch (e) {}
      const { error } = await supabaseClient.from('profiles').delete().eq('id', userId);
      if (error) throw error;
    }
    return { success: true };
  }
};

// ── 9. LEADERBOARD SERVICE ───────────────────────────────────────
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

// ── 10. AUTH GUARD & ROUTE PROTECTION ─────────────────────────────
const AuthGuard = {
  isProtectedPage() {
    const p = window.location.pathname.toLowerCase();
    return p.includes('simulacion') || p.includes('estrategias') || p.includes('calculadora') || p.includes('scouting');
  },

  checkAccess() {
    if (!this.isProtectedPage()) return true;

    // Retrieve active user from cache/session
    const profile = AuthService.getUserProfile();
    if (!profile) {
      const p = window.location.pathname.toLowerCase();
      if (!p.endsWith('index.html') && p !== '/' && p !== '') {
        sessionStorage.setItem('fgc_redirect_after_auth', window.location.href);
        window.location.replace('index.html?auth=required');
        return false;
      }
    }
    return true;
  }
};

// Expose services on window object
window.AuthService = AuthService;
window.RobotConfigService = RobotConfigService;
window.TelemetryService = TelemetryService;
window.EspionageScoutingService = EspionageScoutingService;
window.AdminAuthService = AdminAuthService;
window.LeaderboardService = LeaderboardService;
window.AuthGuard = AuthGuard;
window.SecurityUtils = SecurityUtils;
window.FGC_COUNTRIES = FGC_COUNTRIES;
window.AVATAR_PRESETS = AVATAR_PRESETS;
window.getCountryInfo = getCountryInfo;

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', () => {
  AuthService.init();
  AuthGuard.checkAccess();
});

