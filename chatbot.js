/**
 * ColBot - Strategic AI Engineering Assistant for FGC 2026
 * Team Colombia
 */

(function() {
  const Chatbot = {
    isOpen: false,
    messages: [
      {
        role: 'assistant',
        content: 'Hello! 🤖 I am **ColBot**, your official AI engineering & tactical assistant for **FIRST Global Challenge 2026: Igniting Innovation**.\n\nHow can I help you today?\n- Tune and optimize robot specs (Speed, Hopper, Hook)\n- Master *Buddy Climb* & *Linear Motion* physics\n- Plan 3-robot alliance strategies & match cycles'
      }
    ],
    isLoading: false,

    init() {
      this.renderWidget();
      this.bindEvents();
    },

    renderWidget() {
      const container = document.createElement('div');
      container.id = 'baruChatbotRoot';
      container.innerHTML = `
        <!-- Floating Launcher -->
        <div class="chatbot-launcher" id="chatbotLauncher">
          <div class="chatbot-badge-callout">🤖 ColBot AI</div>
          <button class="chatbot-toggle-btn" id="chatbotToggleBtn" aria-label="Open ColBot AI">
            <svg style="width: 22px; height: 22px; stroke: #0a0c14; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </button>
        </div>

        <!-- Chat Window -->
        <div class="chatbot-window" id="chatbotWindow">
          <div class="chatbot-header">
            <div class="chatbot-title-area">
              <div class="chatbot-avatar" style="display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.06);">
                <img src="logo_team_colombia.png" alt="Team Colombia" style="width: 26px; height: 26px; object-fit: contain;">
              </div>
              <div class="chatbot-title">
                <h4>ColBot AI</h4>
                <span class="chatbot-status">Team Colombia Engineering Strategist</span>
              </div>
            </div>
            <button class="chatbot-close-btn" id="chatbotCloseBtn" aria-label="Close chat">✕</button>
          </div>

          <div class="chatbot-messages" id="chatbotMessages">
            <!-- Messages rendered dynamically -->
          </div>

          <div class="chatbot-quick-prompts">
            <button class="quick-prompt-chip" data-prompt="What is the highest-scoring climbing strategy in Zone 3?">🧗 Optimal Climbing</button>
            <button class="quick-prompt-chip" data-prompt="How does the Linear Motion mechanism extension work?">📦 Linear Motion</button>
            <button class="quick-prompt-chip" data-prompt="How to maximize match cycles with the Human Player?">🎯 Human Player</button>
            <button class="quick-prompt-chip" data-prompt="What robot specs do you recommend for rapid cycling?">⚡ High-Speed Specs</button>
          </div>

          <form class="chatbot-input-area" id="chatbotForm">
            <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Ask ColBot about rules, strategy, or robot specs..." maxlength="500" autocomplete="off">
            <button type="submit" class="chatbot-send-btn" id="chatbotSendBtn" aria-label="Send query">➤</button>
          </form>
        </div>
      `;
      document.body.appendChild(container);
      this.renderMessages();
    },

    bindEvents() {
      const toggleBtn = document.getElementById('chatbotToggleBtn');
      const closeBtn = document.getElementById('chatbotCloseBtn');
      const form = document.getElementById('chatbotForm');
      const quickChips = document.querySelectorAll('.quick-prompt-chip');

      if (toggleBtn) toggleBtn.addEventListener('click', () => this.toggleChat());
      if (closeBtn) closeBtn.addEventListener('click', () => this.toggleChat(false));

      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const input = document.getElementById('chatbotInput');
          const text = input.value.trim();
          if (text) {
            this.sendMessage(text);
            input.value = '';
          }
        });
      }

      quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
          const prompt = chip.dataset.prompt;
          if (prompt) this.sendMessage(prompt);
        });
      });
    },

    toggleChat(forceState = null) {
      this.isOpen = forceState !== null ? forceState : !this.isOpen;
      const win = document.getElementById('chatbotWindow');
      if (win) {
        win.classList.toggle('active', this.isOpen);
      }
      if (this.isOpen) {
        document.getElementById('chatbotInput')?.focus();
        this.scrollToBottom();
      }
    },

    renderMessages() {
      const container = document.getElementById('chatbotMessages');
      if (!container) return;

      container.innerHTML = this.messages.map(m => `
        <div class="chat-bubble ${m.role === 'user' ? 'user' : 'bot'}">
          ${this.formatMarkdown(m.content)}
        </div>
      `).join('');

      if (this.isLoading) {
        container.innerHTML += `
          <div class="chat-bubble bot loading">
            <div class="dot-flashing"></div>
            <div class="dot-flashing"></div>
            <div class="dot-flashing"></div>
          </div>
        `;
      }

      this.scrollToBottom();
    },

    formatMarkdown(text) {
      if (!text) return '';
      // Safe escaping & lightweight markdown formatting
      let formatted = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n- (.*?)/g, '<br>• $1')
        .replace(/\n/g, '<br>');
      return formatted;
    },

    scrollToBottom() {
      const container = document.getElementById('chatbotMessages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },

    async sendMessage(userText) {
      if (this.isLoading || !userText.trim()) return;

      this.messages.push({ role: 'user', content: userText.trim() });
      this.isLoading = true;
      this.renderMessages();

      try {
        let response = await fetch('/api/chat.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: this.messages
          })
        });

        if (!response.ok && response.status === 404) {
          response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: this.messages })
          });
        }

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Error ${response.status}`);
        }

        const data = await response.json();
        const botReply = data.choices?.[0]?.message?.content || 'No pude procesar la respuesta. Por favor intenta de nuevo.';
        this.messages.push({ role: 'assistant', content: botReply });
      } catch (err) {
        console.warn("Chatbot proxy notice:", err);
        this.messages.push({
          role: 'assistant',
          content: `⚠️ *(${err.message})*\n\nRecuerda que para el reto **Igniting Innovation**, una estrategia balanceada consiste en acumular pelotas en la Suppression Unit durante los primeros 2 minutos y reservar los últimos 30 segundos exclusivamente para el anclaje y escalada al **Brace Zona 3**.`
        });
      } finally {
        this.isLoading = false;
        this.renderMessages();
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    Chatbot.init();
  });
})();
