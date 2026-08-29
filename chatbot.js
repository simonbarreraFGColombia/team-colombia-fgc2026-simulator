/**
 * BARU AI - Strategic Assistant for FGC 2026 Game Simulator
 * Team Colombia
 */

(function() {
  const Chatbot = {
    isOpen: false,
    messages: [
      {
        role: 'assistant',
        content: '¡Hola! 🤖 Soy **BARU AI**, tu asistente estratégico de ingeniería para **FIRST Global Challenge 2026: Igniting Innovation**.\n\n¿En qué puedo ayudarte hoy?\n- Optimizar las *specs* de tu robot\n- Tácticas de *Buddy Climb* y *Linear Motion*\n- Estrategias de alianza y ciclo de partido'
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
          <div class="chatbot-badge-callout">🤖 Asistente IA FGC</div>
          <button class="chatbot-toggle-btn" id="chatbotToggleBtn" aria-label="Abrir Asistente IA">
            💬
          </button>
        </div>

        <!-- Chat Window -->
        <div class="chatbot-window" id="chatbotWindow">
          <div class="chatbot-header">
            <div class="chatbot-title-area">
              <div class="chatbot-avatar">🇨🇴</div>
              <div class="chatbot-title">
                <h4>BARU AI</h4>
                <span class="chatbot-status">Estratega FGC 2026</span>
              </div>
            </div>
            <button class="chatbot-close-btn" id="chatbotCloseBtn" aria-label="Cerrar chat">✕</button>
          </div>

          <div class="chatbot-messages" id="chatbotMessages">
            <!-- Messages rendered dynamically -->
          </div>

          <div class="chatbot-quick-prompts">
            <button class="quick-prompt-chip" data-prompt="¿Cuál es la mejor estrategia de escalada?">🧗 Escalada Óptima</button>
            <button class="quick-prompt-chip" data-prompt="¿Cómo funciona el Linear Motion?">📦 Linear Motion</button>
            <button class="quick-prompt-chip" data-prompt="¿Cómo maximizar puntos con el Human Player?">🎯 Human Player</button>
            <button class="quick-prompt-chip" data-prompt="¿Qué specs recomiendas para un ciclado rápido?">⚡ Specs de Velocidad</button>
          </div>

          <form class="chatbot-input-area" id="chatbotForm">
            <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Pregunta sobre estrategia, reglas o specs..." maxlength="500" autocomplete="off">
            <button type="submit" class="chatbot-send-btn" id="chatbotSendBtn" aria-label="Enviar pregunta">➤</button>
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
