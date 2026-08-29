/**
 * FGC 2026 Global Multi-Language System (i18n)
 * Supports 55+ distinct world languages
 * Team Colombia
 */

const FGC_LANGUAGES = [
  { code: 'es', name: 'Español', native: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', native: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', native: '繁體中文', flag: '🇹🇼' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'tl', name: 'Filipino', native: 'Tagalog', flag: '🇵🇭' },
  { code: 'th', name: 'Thai', native: 'ไทย', flag: '🇹🇭' },
  { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська', flag: '🇺🇦' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'cs', name: 'Czech', native: 'Čeština', flag: '🇨🇿' },
  { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪' },
  { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar', flag: '🇭🇺' },
  { code: 'iw', name: 'Hebrew', native: 'עברית', flag: '🇮🇱' },
  { code: 'da', name: 'Danish', native: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', native: 'Suomi', flag: '🇫🇮' },
  { code: 'no', name: 'Norwegian', native: 'Norsk', flag: '🇳🇴' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina', flag: '🇸🇰' },
  { code: 'bg', name: 'Bulgarian', native: 'Български', flag: '🇧🇬' },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sr', name: 'Serbian', native: 'Српски', flag: '🇷🇸' },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių', flag: '🇱🇹' },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina', flag: '🇸🇮' },
  { code: 'lv', name: 'Latvian', native: 'Latviešu', flag: '🇱🇻' },
  { code: 'et', name: 'Estonian', native: 'Eesti', flag: '🇪🇪' },
  { code: 'fa', name: 'Persian', native: 'فارسی', flag: '🇮🇷' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'kk', name: 'Kazakh', native: 'Қазақша', flag: '🇰🇿' },
  { code: 'uz', name: 'Uzbek', native: 'Oʻzbekcha', flag: '🇺🇿' },
  { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan', flag: '🇦🇿' },
  { code: 'ka', name: 'Georgian', native: 'ქართული', flag: '🇬🇪' },
  { code: 'hy', name: 'Armenian', native: 'Հայերեն', flag: '🇦🇲' },
  { code: 'mn', name: 'Mongolian', native: 'Монгол', flag: '🇲🇳' },
  { code: 'km', name: 'Khmer', native: 'ភាសាខ្មែរ', flag: '🇰🇭' },
  { code: 'lo', name: 'Lao', native: 'ພາສາລາວ', flag: '🇱🇦' },
  { code: 'my', name: 'Burmese', native: 'မြန်မာစာ', flag: '🇲🇲' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', flag: '🇳🇵' },
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans', flag: '🇿🇦' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪' },
  { code: 'is', name: 'Icelandic', native: 'Íslenska', flag: '🇮🇸' }
];

const I18nManager = {
  currentLang: localStorage.getItem('fgc_lang') || 'es',
  isOpen: false,

  init() {
    this.injectGoogleTranslateScript();
    this.injectLanguagePickerUI();
    this.applyLanguage(this.currentLang, false);
  },

  injectGoogleTranslateScript() {
    // Inject hidden container
    if (!document.getElementById('google_translate_element')) {
      const gDiv = document.createElement('div');
      gDiv.id = 'google_translate_element';
      document.body.appendChild(gDiv);
    }

    // Define Global Callback
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'es',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
        
        if (this.currentLang && this.currentLang !== 'es') {
          setTimeout(() => this.triggerGoogleTranslate(this.currentLang), 600);
        }
      }
    };

    // Load Translate script if not present
    if (!document.getElementById('gt_script')) {
      const script = document.createElement('script');
      script.id = 'gt_script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }
  },

  injectLanguagePickerUI() {
    const currentLangObj = FGC_LANGUAGES.find(l => l.code === this.currentLang) || FGC_LANGUAGES[0];

    const container = document.createElement('div');
    container.className = 'lang-picker-container';
    container.id = 'fgcLangPicker';

    container.innerHTML = `
      <button class="lang-picker-btn" id="langPickerBtn" type="button" aria-label="Cambiar idioma / Switch language">
        <span class="lang-flag" id="currentLangFlag">${currentLangObj.flag}</span>
        <span class="lang-text" id="currentLangName">${currentLangObj.code.toUpperCase()}</span>
        <span class="lang-arrow">▼</span>
      </button>

      <div class="lang-picker-dropdown" id="langPickerDropdown">
        <div class="lang-search-box">
          <input type="text" class="lang-search-input" id="langSearchInput" placeholder="Buscar idioma / Search (55+)...">
        </div>
        <div class="lang-list" id="langList">
          ${FGC_LANGUAGES.map(l => `
            <button class="lang-item ${l.code === this.currentLang ? 'selected' : ''}" data-code="${l.code}">
              <div class="lang-item-left">
                <span style="font-size: 1.1rem;">${l.flag}</span>
                <span class="lang-item-name">${l.native} <small style="color:#94a3b8;">(${l.name})</small></span>
              </div>
              <span class="lang-item-code">${l.code}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Try to attach to navigation area or header
    const header = document.querySelector('.app-header');
    if (header) {
      // Look for nav-area or top right container
      const nav = header.querySelector('.nav-area') || header.querySelector('div:last-child');
      if (nav) {
        header.insertBefore(container, nav.nextSibling || nav);
      } else {
        header.appendChild(container);
      }
    } else {
      document.body.appendChild(container);
    }

    this.bindEvents();
  },

  bindEvents() {
    const btn = document.getElementById('langPickerBtn');
    const dropdown = document.getElementById('langPickerDropdown');
    const search = document.getElementById('langSearchInput');
    const list = document.getElementById('langList');

    if (dropdown) {
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    if (btn && dropdown) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.isOpen = !this.isOpen;
        dropdown.classList.toggle('active', this.isOpen);
        if (this.isOpen && search) {
          setTimeout(() => search.focus(), 50);
        }
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('#fgcLangPicker')) {
          this.isOpen = false;
          dropdown.classList.remove('active');
        }
      });
    }

    if (search && list) {
      search.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const items = list.querySelectorAll('.lang-item');
        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(query) ? 'flex' : 'none';
        });
      });
    }

    if (list) {
      list.querySelectorAll('.lang-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const code = item.dataset.code;
          this.applyLanguage(code, true);
          this.isOpen = false;
          dropdown?.classList.remove('active');
        });
      });
    }
  },

  applyLanguage(code, doReload = true) {
    this.currentLang = code;
    localStorage.setItem('fgc_lang', code);
    document.documentElement.lang = code;

    const langObj = FGC_LANGUAGES.find(l => l.code === code) || FGC_LANGUAGES[0];
    const flagEl = document.getElementById('currentLangFlag');
    const nameEl = document.getElementById('currentLangName');
    if (flagEl) flagEl.textContent = langObj.flag;
    if (nameEl) nameEl.textContent = langObj.code.toUpperCase();

    // Update selected class
    document.querySelectorAll('.lang-item').forEach(el => {
      el.classList.toggle('selected', el.dataset.code === code);
    });

    // Set Google Translate Cookie
    this.setTranslateCookie(code);

    if (doReload) {
      this.triggerGoogleTranslate(code);
    }

    // Inform chatbot about language preference
    window.__FGC_ACTIVE_LANG = langObj;
  },

  setTranslateCookie(code) {
    const val = code === 'es' ? '/es/es' : `/es/${code}`;
    const domain = window.location.hostname;
    document.cookie = `googtrans=${val}; path=/; domain=${domain}`;
    document.cookie = `googtrans=${val}; path=/;`;
  },

  triggerGoogleTranslate(code) {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event('change'));
    } else {
      // Reload to let cookie trigger translation cleanly
      window.location.reload();
    }
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  I18nManager.init();
});
