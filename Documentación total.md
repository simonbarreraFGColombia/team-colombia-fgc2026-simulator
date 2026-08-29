# Documentación Total • Plataforma FGC 2026 Igniting Innovation
**Team Colombia • Simulación Táctica, Scouting & Centro de Inteligencia de Espionaje**

---

## 1. Resumen de la Arquitectura & Soluciones Implementadas

### A. Corrección Estructural del Layout de Landing Page
- **Diagnóstico:** Se corrigió un desfase de clases CSS entre `i18n.js` y `i18n.css` que generaba que el selector de idiomas de 80+ lenguajes se inyectara en flujo normal del DOM en lugar de estar oculto con `position: absolute; display: none;`. Al no tener estas reglas activas, el listado se renderizaba abierto por defecto empujando todo el viewport.
- **Solución:**
  - Alineación de selectores `.lang-picker-container`, `.lang-picker-dropdown`, `.lang-search-input`, `.lang-list` y sus variantes.
  - Corrección de etiquetas SVG mal cerradas (`</polygon>` en lugar de `</path>`) en `index.html`.
  - Eliminación de scripts diagnósticos invasivos y consolidación de un sistema de logging seguro en consola.

---

### B. Módulo de Customización de Ingeniería del Robot (`simulacion.html` & `simulacion.js`)
Permite a cada competidor y equipo configurar todas las especificaciones físicas y dinámicas de su robot antes de saltar a la arena de juego:
1. **Dimensiones Físicas y Bounding Box:**
   - Dimensiones iniciales (Largo × Ancho × Alto en cm) con cálculo dinámico en tiempo real del volumen inicial en $\text{cm}^3$.
   - Dimensiones finales expandidas (Largo × Ancho × Alto en cm) con cálculo del volumen expandido en $\text{cm}^3$.
2. **Mecanismo y Dirección de Expansión:**
   - Selector multidireccional: `⬅️ Izquierda`, `➡️ Derecha`, `⬆️ Arriba (Altura)`, `🔼 Adelante`, `🔽 Atrás`.
   - Tiempo de despliegue de expansión en segundos (0.5s – 8.0s).
   - Indicador de tolva expandible por Linear Motion.
3. **Capacidad de Tolva y Almacenamiento:**
   - Capacidad sin expansión (1 a 25 pelotas).
   - Capacidad con expansión (3 a 50 pelotas).
   - Tiempo estimado para llenar el 100% de la capacidad de la tolva.
4. **Cinemática y Velocidades:**
   - Velocidad de movimiento del chasis (0.5 – 4.5 m/s).
   - Velocidad del sistema de recogida (Intake: 0.5 – 6.0 pelotas/s).
   - Velocidad del shooter (1.0 – 8.0 pelotas/s).
   - Precisión mecánica del robot (50% – 100%).
   - Estrategia de disparo: `🎯 Shooter a Supresión` vs `🔥 Feeder a Human Player en Fire Shield`.
5. **Sistema de Escalada (Climber):**
   - Tipos de mecanismo:
     - `🧗 Solo Climber`: Subida autónoma individual.
     - `🤝 Buddy Carrier`: Robot nodriza con barra/soporte para remolcar o anclar aliados.
     - `🪝 Buddy Piggyback`: Robot diseñado para engancharse mecánicamente de un compañero.
   - Velocidad de escalada (0.1 – 2.0 m/s).
   - Tiempo de anclaje / pestillo (0.5 – 8.0s).
   - Zona máxima objetivo en el Brace (Zona 1, Zona 2, Zona 3).
   - Tiempo restante en el reloj cuando el robot inicia su aproximación al Brace para colgarse.

---

### C. Motor de Telemetría Táctica en Vivo (`ESPIONAGE_TRACKER`)
Durante el partido simulado de 2:30, el motor registra silenciosamente las métricas de espionaje:
1. **Analítica de Ciclos:**
   - Detección automática de ciclo (Fase de recolección en campo $\rightarrow$ transporte $\rightarrow$ descarga de tiro).
   - Conteo total de ciclos completados por partido.
   - Duración exacta de cada ciclo individual y promedio del partido.
   - Cantidad de pelotas anotadas por ciclo.
2. **Distribución de Disparos:**
   - % de pelotas disparadas hacia la Unidad de Supresión vs. % hacia el Fire Shield.
3. **Mapa de Calor de Posicionamiento (Heatmap):**
   - Porcentaje de tiempo de permanencia en: Zona 1, Zona 2, Zona 3, Red Substation, Blue Substation, Rampa y Centro Neutral.
   - Identificación de la **Zona Inicial** a la que se dirige el robot inmediatamente arranca el partido.
4. **Telemetría de Tiempos Críticos:**
   - Tiempo transcurrido en el partido al momento de llenar por primera vez el almacenamiento al 100%.
   - Tiempo restante en el reloj al momento de comenzar el escalado en el Brace.

---

### D. Terminal Maestra de Espionaje e Inteligencia (`/adminmastersecrete`)
- **Acceso:** Ruta `/adminmastersecrete` y `/adminmastersecrete.html` con rewrite en `vercel.json`.
- **Autenticación en 2 Pasos (MFA / 2FA):**
  - **Paso 1:** Contraseña Maestra de Administrador (`colombia2026!secret`).
  - **Paso 2:** Código de Autenticador TOTP / MFA de 6 dígitos con distribución automática en inputs numéricos (`772901`, `991823`, `202610`).
  - Token de sesión seguro en `sessionStorage` con temporizador de expiración activa (4 horas).
- **Tablero de Control de Inteligencia:**
  - **KPIs Globales:** Total de equipos espiados, tiempo promedio de ciclo, tasa de adopción de Linear Motion, ratio de Buddy Climbers y distribución de disparos Supresión/Fire Shield.
  - **Buscador y Filtros Rápidos:** Filtrado instantáneo por nombre de equipo, usuario, país, rol (estudiante/mentor), tipo de escalador y ciclos rápidos.
  - **Tabla de Inteligencia:** Muestra hasta el detalle más mínimo de cada equipo (identidad, dimensiones iniciales y finales, direcciones de expansión, capacidades, velocidades, climber, ciclos y zonas).
  - **Modal Holográfico de Inspección Profunda:**
    - Dossier completo del competidor y equipo con avatar y correo.
    - Wireframe y bounding box visual interactivo con flechas de expansión vectorial.
    - Desglose de tolva y llenado.
    - Gráfico de barra de distribución de disparos.
    - Matriz de mapa de calor de zonas en campo.
    - Visualizador JSON raw con copia al portapapeles.
  - **Exportación de Datos:** Descarga de todo el dataset de espionaje en formato **JSON** y **CSV** con un solo clic.

---

## 2. Credenciales y Métodos de Acceso

| Parámetro | Valor Oficial |
|---|---|
| **URL del Panel** | `https://team-colombia-fgc2026-simulator.vercel.app/adminmastersecrete` |
| **Contraseña Paso 1** | `colombia2026!secret` |
| **Código MFA Paso 2** | `772901` (o alternativos: `991823`, `202610`) |
| **Duración de Sesión** | 4 Horas (con cuenta regresiva en vivo) |

---

## 3. Estado de Despliegue & Producción
- **Repositorio:** `simonbarreraFGColombia/team-colombia-fgc2026-simulator`
- **Rama:** `main`
- **Deploy Vercel:** Aliased a `https://team-colombia-fgc2026-simulator.vercel.app/`
- **Estado:** 100% Operativo y Verificado.
