/**
 * Serverless AI Proxy - Groq LLM API
 * Handles AI chat queries securely without exposing GROQ_API_KEY to the browser.
 */

// Simple in-memory rate limiting per IP for serverless warm instances
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

const SYSTEM_PROMPT = `Eres "BARU AI", el Asistente Estratégico y Técnico de Inteligencia Artificial para el simulador de juego del reto FIRST Global Challenge 2026: "Igniting Innovation" (Incheon, Corea del Sur), desarrollado por Team Colombia.

Tus conocimientos clave sobre el juego FGC 2026:
1. TERRENO Y ELEMENTOS: Cancha de 7.0m x 7.0m. 2 Alianzas (Roja y Azul), 3 robots por alianza. Rampa y Braces centrales de escalada. Suppression Units laterales (Roja y Azul). Fire Shield central. Zona de Human Player.
2. PUNTUACIÓN:
   - Pelotas en Suppression Unit: 1 punto cada una.
   - Pelotas en Fire Shield (Extinguidor central): Multiplica el impacto de supresión y otorga puntos de extinción compartidos.
   - Escalada (Brace Climbing):
     * Zona 1 (Baja): Multiplicador x1.2
     * Zona 2 (Media): Multiplicador x1.4
     * Zona 3 (Alta): Multiplicador x1.6
     * Buddy Climb (colgar a un compañero): +25 puntos adicionales de alianza.
   - Multiplicador Regional Total = 1.0 + sumatoria de escalada de los 3 robots.
3. MECANISMOS DESTACADOS:
   - Drivetrain (Arcade/Tank/Swerve).
   - Linear Motion: Tolva retráctil de cremallera que inicia al 30% de capacidad y se extiende al 100%. Requiere vaciarse para poder retraerse.
   - Climber Hook: Gancho de fricción para anclaje al cable diagonal.
4. OBJETIVO: Responde con entusiasmo, precisión técnica de ingeniería, consejos tácticos de partido, sugerencias de configuración de specs (velocidad, capacidad, tiempo de anclaje) y análisis de sinergia entre robots. Sé conciso, inspirador y profesional. Responde en español (o en el idioma del usuario si pregunta en inglés).`;

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();

    // Rate limiting check
    const clientRate = rateLimitMap.get(clientIp) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };
    if (now > clientRate.resetTime) {
      clientRate.count = 0;
      clientRate.resetTime = now + RATE_LIMIT_WINDOW_MS;
    }
    clientRate.count++;
    rateLimitMap.set(clientIp, clientRate);

    if (clientRate.count > MAX_REQUESTS_PER_WINDOW) {
      return res.status(429).json({ 
        error: 'Has enviado demasiadas preguntas en poco tiempo. Por favor espera unos segundos.' 
      });
    }

    let payload = req.body;
    if (typeof payload === 'string') {
      try { payload = JSON.parse(payload); } catch (e) { payload = {}; }
    }
    const { messages } = payload || {};
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'El cuerpo de la solicitud debe incluir un array "messages".' });
    }

    // Sanitize and limit input tokens/characters
    const lastUserMessage = messages[messages.length - 1];
    if (!lastUserMessage || !lastUserMessage.content || typeof lastUserMessage.content !== 'string') {
      return res.status(400).json({ error: 'Mensaje de usuario inválido.' });
    }

    const sanitizedContent = lastUserMessage.content.trim().slice(0, 1000);
    if (sanitizedContent.length === 0) {
      return res.status(400).json({ error: 'El mensaje no puede estar vacío.' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      // Fallback demo response if API key is not yet configured in environment
      return res.status(200).json({
        choices: [{
          message: {
            role: 'assistant',
            content: `⚡ **BARU AI (Modo Local/Offline)**: La clave de API de Groq aún no ha sido configurada en las variables de entorno de Vercel (\`GROQ_API_KEY\`).\n\nSin embargo, puedo recordarte que para maximizar tu puntaje en **FGC 2026 Igniting Innovation**, la combinación óptima es:\n1. **2 Robots de alta capacidad (12-15 bolas)** ciclando a la Suppression Unit.\n2. **1 Robot ágil con Buddy Climb** para asegurar el multiplicador x1.6 + 25 pts en los últimos 30 segundos.\n\n*Configura tu \`GROQ_API_KEY\` para activar las respuestas completas de IA.*`
          }
        }]
      });
    }

    // Build context history (limit to last 6 messages to preserve token economy)
    const contextMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-6).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content).slice(0, 1000)
      }))
    ];

    // Call Groq API via Serverless fetch
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: contextMessages,
        temperature: 0.6,
        max_tokens: 650,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API Error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Error al comunicarse con el motor de IA de Groq.',
        details: errorText
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Serverless Chat Handler Error:', error);
    return res.status(500).json({ 
      error: 'Error interno en el servidor de IA.',
      message: error.message 
    });
  }
};
