/**
 * FGC 2026 Global Multi-Language System (i18n)
 * Supports 78 distinct world languages with Instant Client Dictionaries + Real-Time Universal Neural Translation Engine
 * Default: English (en)
 * Team Colombia
 */

const FGC_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
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
  { code: 'is', name: 'Icelandic', native: 'Íslenska', flag: '🇮🇸' },
  { code: 'ca', name: 'Catalan', native: 'Català', flag: '🇪🇸' },
  { code: 'eu', name: 'Basque', native: 'Euskara', flag: '🇪🇸' },
  { code: 'gl', name: 'Galician', native: 'Galego', flag: '🇪🇸' },
  { code: 'cy', name: 'Welsh', native: 'Cymraeg', flag: '🇬🇧' },
  { code: 'ga', name: 'Irish', native: 'Gaeilge', flag: '🇮🇪' },
  { code: 'la', name: 'Latin', native: 'Latina', flag: '🇻🇦' },
  { code: 'eo', name: 'Esperanto', native: 'Esperanto', flag: '🌐' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ', flag: '🇪🇹' },
  { code: 'yo', name: 'Yoruba', native: 'Èdè Yorùbá', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', native: 'Asụsụ Igbo', flag: '🇳🇬' },
  { code: 'zu', name: 'Zulu', native: 'isiZulu', flag: '🇿🇦' },
  { code: 'ceb', name: 'Cebuano', native: 'Sinugboanon', flag: '🇵🇭' },
  { code: 'haw', name: 'Hawaiian', native: 'ʻŌlelo Hawaiʻi', flag: '🌺' },
  { code: 'sm', name: 'Samoan', native: 'Gagana Sāmoa', flag: '🇼🇸' },
  { code: 'mi', name: 'Maori', native: 'Te Reo Māori', flag: '🇳🇿' },
  { code: 'ht', name: 'Haitian Creole', native: 'Kreyòl Ayisyen', flag: '🇭🇹' },
  { code: 'sq', name: 'Albanian', native: 'Shqip', flag: '🇦🇱' }
];

// ── PRE-COMPILED INSTANT DICTIONARIES (Top World Languages) ──────────
const BUILTIN_DICTIONARY = {
  en: {
    "Portal": "Portal",
    "2D Simulator": "2D Simulator",
    "Tactical Playbook": "Tactical Playbook",
    "Calculator": "Calculator",
    "Sign In": "Sign In",
    "OFFICIAL STRATEGY & SIMULATION PLATFORM": "OFFICIAL STRATEGY & SIMULATION PLATFORM",
    "FIRST Global Challenge 2026": "FIRST Global Challenge 2026",
    "Igniting Innovation": "Igniting Innovation",
    "Complete engineering ecosystem for match score calculation, real-time 2D simulation with robot kinematics, alliance tactical planning, and AI assistance built for teams worldwide.": "Complete engineering ecosystem for match score calculation, real-time 2D simulation with robot kinematics, alliance tactical planning, and AI assistance built for teams worldwide.",
    "Launch 2D Simulator": "Launch 2D Simulator",
    "Strategy Playbook": "Strategy Playbook",
    "Score Calculator": "Score Calculator",
    "Official Game Manual — FGC 2026 Incheon": "Official Game Manual — FGC 2026 Incheon",
    "Access the official rules, 7×7m arena layout, ramp specifications, climbing zones, and robot inspection requirements.": "Access the official rules, 7×7m arena layout, ramp specifications, climbing zones, and robot inspection requirements.",
    "Open Official Manual (Google Docs) ↗": "Open Official Manual (Google Docs) ↗",
    "Platform Tactical Modules": "Platform Tactical Modules",
    "Designed by Team Colombia to empower robotics alliances worldwide": "Designed by Team Colombia to empower robotics alliances worldwide",
    "Tactical Strategy Playbook": "Tactical Strategy Playbook",
    "Interactive alliance designer with real-time scoring projection, role synchronization, and 3-robot strategic synergy graphs.": "Interactive alliance designer with real-time scoring projection, role synchronization, and 3-robot strategic synergy graphs.",
    "Design Strategy": "Design Strategy",
    "Real-Time 2D Match Simulator": "Real-Time 2D Match Simulator",
    "Full physics game simulator with 6 autonomous and player-controlled robots, linear motion hoppers, cable climbing, and live telemetry.": "Full physics game simulator with 6 autonomous and player-controlled robots, linear motion hoppers, cable climbing, and live telemetry.",
    "Launch Simulator": "Launch Simulator",
    "Official Scoring Calculator": "Official Scoring Calculator",
    "Rulebook mathematical validation engine. Evaluate regional match scenarios, cooperative alliance ranking points, and climbing multipliers.": "Rulebook mathematical validation engine. Evaluate regional match scenarios, cooperative alliance ranking points, and climbing multipliers.",
    "Open Calculator": "Open Calculator",
    "Global Leaderboard & Match Records": "Global Leaderboard & Match Records",
    "Verified scores recorded in competition from the database": "Verified scores recorded in competition from the database",
    "Play & Submit Record ➔": "Play & Submit Record ➔",
    "Filter by team name or country...": "Filter by team name or country...",
    "Rank": "Rank",
    "Competitor": "Competitor",
    "Team Name": "Team Name",
    "Country": "Country",
    "Role": "Role",
    "Matches": "Matches",
    "Record Score": "Record Score",
    "Platform Navigation": "Platform Navigation",
    "Official Resources": "Official Resources",
    "Portal Home": "Portal Home",
    "2D Match Simulator": "2D Match Simulator",
    "Game Manual 2026": "Game Manual 2026",
    "FIRST Global Official": "FIRST Global Official",
    "Team Colombia Hub": "Team Colombia Hub",
    "FGC Access & Profile Setup": "FGC Access & Profile Setup",
    "Create Profile & Team": "Create Profile & Team",
    "Username": "Username",
    "Profile Picture / Avatar": "Profile Picture / Avatar",
    "Email Address": "Email Address",
    "Password": "Password",
    "Enter Platform": "Enter Platform",
    "Complete Profile & Enter": "Complete Profile & Enter",
    "ColBot AI": "ColBot AI",
    "Ask ColBot about rules, strategy, or robot specs...": "Ask ColBot about rules, strategy, or robot specs..."
  },
  es: {
    "Portal": "Portal",
    "2D Simulator": "Simulador 2D",
    "Tactical Playbook": "Playbook Táctico",
    "Calculator": "Calculadora",
    "Sign In": "Iniciar Sesión",
    "OFFICIAL STRATEGY & SIMULATION PLATFORM": "PLATAFORMA OFICIAL DE ESTRATEGIA Y SIMULACIÓN",
    "FIRST Global Challenge 2026": "FIRST Global Challenge 2026",
    "Igniting Innovation": "Encendiendo la Innovación",
    "Complete engineering ecosystem for match score calculation, real-time 2D simulation with robot kinematics, alliance tactical planning, and AI assistance built for teams worldwide.": "Ecosistema integral de ingeniería para el cálculo de puntajes, simulación 2D en tiempo real con cinemática de robots, planificación táctica de alianzas y asistencia con IA para delegaciones mundiales.",
    "Launch 2D Simulator": "Iniciar Simulador 2D",
    "Strategy Playbook": "Playbook de Estrategia",
    "Score Calculator": "Calculadora de Puntaje",
    "Official Game Manual — FGC 2026 Incheon": "Manual Oficial del Juego — FGC 2026 Incheon",
    "Access the official rules, 7×7m arena layout, ramp specifications, climbing zones, and robot inspection requirements.": "Accede a las reglas oficiales, dimensiones de la arena de 7×7m, especificaciones de rampas, zonas de escalada e inspección de robots.",
    "Open Official Manual (Google Docs) ↗": "Abrir Manual Oficial (Google Docs) ↗",
    "Platform Tactical Modules": "Módulos Tácticos de la Plataforma",
    "Designed by Team Colombia to empower robotics alliances worldwide": "Diseñado por Team Colombia para potenciar alianzas de robótica en todo el mundo",
    "Tactical Strategy Playbook": "Playbook de Estrategia Táctica",
    "Interactive alliance designer with real-time scoring projection, role synchronization, and 3-robot strategic synergy graphs.": "Diseñador interactivo de alianzas con proyección de puntaje en tiempo real, sincronización de roles y gráficos de sinergia entre 3 robots.",
    "Design Strategy": "Diseñar Estrategia",
    "Real-Time 2D Match Simulator": "Simulador de Partidas 2D en Tiempo Real",
    "Full physics game simulator with 6 autonomous and player-controlled robots, linear motion hoppers, cable climbing, and live telemetry.": "Simulador de física completa con 6 robots autónomos y controlados por jugadores, tolvas con movimiento lineal, escalada por cables y telemetría en vivo.",
    "Launch Simulator": "Iniciar Simulador",
    "Official Scoring Calculator": "Calculadora Oficial de Puntuación",
    "Rulebook mathematical validation engine. Evaluate regional match scenarios, cooperative alliance ranking points, and climbing multipliers.": "Motor de validación matemática según el reglamento. Evalúa escenarios de juego regional, puntos de ranking cooperativos y multiplicadores de escalada.",
    "Open Calculator": "Abrir Calculadora",
    "Global Leaderboard & Match Records": "Tabla de Clasificación Global y Récords",
    "Verified scores recorded in competition from the database": "Puntajes verificados y registrados en competencia desde la base de datos",
    "Play & Submit Record ➔": "Jugar y Registrar Récord ➔",
    "Filter by team name or country...": "Filtrar por nombre de equipo o país...",
    "Rank": "Puesto",
    "Competitor": "Competidor",
    "Team Name": "Nombre del Equipo",
    "Country": "País",
    "Role": "Rol",
    "Matches": "Partidas",
    "Record Score": "Puntaje Récord",
    "Platform Navigation": "Navegación de la Plataforma",
    "Official Resources": "Recursos Oficiales",
    "Portal Home": "Inicio del Portal",
    "2D Match Simulator": "Simulador de Partidas 2D",
    "Game Manual 2026": "Manual de Juego 2026",
    "FIRST Global Official": "Sitio Oficial FIRST Global",
    "Team Colombia Hub": "Portal Team Colombia",
    "FGC Access & Profile Setup": "Acceso FGC y Configuración de Perfil",
    "Create Profile & Team": "Crear Perfil y Equipo",
    "Username": "Usuario",
    "Profile Picture / Avatar": "Foto de Perfil / Avatar",
    "Email Address": "Correo Electrónico",
    "Password": "Contraseña",
    "Enter Platform": "Ingresar a la Plataforma",
    "Complete Profile & Enter": "Completar Perfil e Ingresar",
    "ColBot AI": "ColBot IA",
    "Ask ColBot about rules, strategy, or robot specs...": "Pregunta a ColBot sobre reglas, estrategias o especificaciones..."
  },
  de: {
    "Portal": "Portal",
    "2D Simulator": "2D-Simulator",
    "Tactical Playbook": "Taktisches Playbook",
    "Calculator": "Rechner",
    "Sign In": "Anmelden",
    "OFFICIAL STRATEGY & SIMULATION PLATFORM": "OFFIZIELLE STRATEGIE- & SIMULATIONSPLATTFORM",
    "FIRST Global Challenge 2026": "FIRST Global Challenge 2026",
    "Igniting Innovation": "Innovation Entfachen",
    "Complete engineering ecosystem for match score calculation, real-time 2D simulation with robot kinematics, alliance tactical planning, and AI assistance built for teams worldwide.": "Komplettes Engineering-Ökosystem für Spielergebnisberechnung, 2D-Echtzeitsimulation mit Roboterdynamik, taktische Allianzplanung und KI-Assistenz für weltweite Teams.",
    "Launch 2D Simulator": "2D-Simulator Starten",
    "Strategy Playbook": "Strategie-Playbook",
    "Score Calculator": "Punkterechner",
    "Official Game Manual — FGC 2026 Incheon": "Offizielles Spielhandbuch — FGC 2026 Incheon",
    "Access the official rules, 7×7m arena layout, ramp specifications, climbing zones, and robot inspection requirements.": "Zugriff auf offizielle Regeln, 7×7m Arenalayout, Rampenspezifikationen, Kletterzonen und Roboterinspektionsanforderungen.",
    "Open Official Manual (Google Docs) ↗": "Offizielles Handbuch Öffnen (Google Docs) ↗",
    "Platform Tactical Modules": "Taktische Plattformmodule",
    "Designed by Team Colombia to empower robotics alliances worldwide": "Entwickelt von Team Colombia zur Stärkung von Robotik-Allianzen weltweit",
    "Tactical Strategy Playbook": "Taktisches Strategie-Playbook",
    "Interactive alliance designer with real-time scoring projection, role synchronization, and 3-robot strategic synergy graphs.": "Interaktiver Allianzdesigner mit Echtzeit-Punktprojektion, Rollensynchronisation und 3-Roboter-Synergiegraphen.",
    "Design Strategy": "Strategie Entwerfen",
    "Real-Time 2D Match Simulator": "2D-Echtzeit-Spielsimulator",
    "Full physics game simulator with 6 autonomous and player-controlled robots, linear motion hoppers, cable climbing, and live telemetry.": "Vollphysikalischer Spielsimulator mit 6 autonomen und spielergesteuerten Robotern, Linear-Motion-Speichern, Klettern und Live-Telemetrie.",
    "Launch Simulator": "Simulator Starten",
    "Official Scoring Calculator": "Offizieller Punkterechner",
    "Rulebook mathematical validation engine. Evaluate regional match scenarios, cooperative alliance ranking points, and climbing multipliers.": "Mathematische Regelwerk-Validierungsengine. Bewerten Sie Spielszenarien, Kooperationspunkte und Klettermultiplikatoren.",
    "Open Calculator": "Rechner Öffnen",
    "Global Leaderboard & Match Records": "Globale Bestenliste & Spielergebnisse",
    "Verified scores recorded in competition from the database": "Verifizierte, im Wettbewerb erzielte Ergebnisse aus der Datenbank",
    "Play & Submit Record ➔": "Spielen & Rekord Einreichen ➔",
    "Filter by team name or country...": "Nach Teamname oder Land filtern...",
    "Rank": "Rang",
    "Competitor": "Teilnehmer",
    "Team Name": "Teamname",
    "Country": "Land",
    "Role": "Rolle",
    "Matches": "Spiele",
    "Record Score": "Rekordpunktzahl",
    "Platform Navigation": "Plattform-Navigation",
    "Official Resources": "Offizielle Ressourcen",
    "Portal Home": "Portal-Startseite",
    "2D Match Simulator": "2D-Spielsimulator",
    "Game Manual 2026": "Spielhandbuch 2026",
    "FIRST Global Official": "FIRST Global Offiziell",
    "Team Colombia Hub": "Team Colombia Zentrum",
    "FGC Access & Profile Setup": "FGC-Zugang & Profil-Einrichtung",
    "Create Profile & Team": "Profil & Team Erstellen",
    "Username": "Benutzername",
    "Profile Picture / Avatar": "Profilbild / Avatar",
    "Email Address": "E-Mail-Adresse",
    "Password": "Passwort",
    "Enter Platform": "Plattform Betreten",
    "Complete Profile & Enter": "Profil Vervollständigen & Eintreten",
    "ColBot AI": "ColBot KI",
    "Ask ColBot about rules, strategy, or robot specs...": "Fragen Sie ColBot nach Regeln, Strategien oder Spezifikationen..."
  },
  fr: {
    "Portal": "Portail",
    "2D Simulator": "Simulateur 2D",
    "Tactical Playbook": "Playbook Tactique",
    "Calculator": "Calculateur",
    "Sign In": "Connexion",
    "OFFICIAL STRATEGY & SIMULATION PLATFORM": "PLATEFORME OFFICIELLE DE STRATÉGIE ET DE SIMULATION",
    "FIRST Global Challenge 2026": "FIRST Global Challenge 2026",
    "Igniting Innovation": "Allumer l'Innovation",
    "Complete engineering ecosystem for match score calculation, real-time 2D simulation with robot kinematics, alliance tactical planning, and AI assistance built for teams worldwide.": "Écosystème d'ingénierie complet pour le calcul des scores, la simulation 2D en temps réel avec cinématique des robots, la planification tactique des alliances et l'assistance IA.",
    "Launch 2D Simulator": "Lancer le Simulateur 2D",
    "Strategy Playbook": "Playbook Stratégique",
    "Score Calculator": "Calculateur de Score",
    "Official Game Manual — FGC 2026 Incheon": "Manuel Officiel du Jeu — FGC 2026 Incheon",
    "Access the official rules, 7×7m arena layout, ramp specifications, climbing zones, and robot inspection requirements.": "Accédez aux règles officielles, dimensions de l'arène 7×7m, spécifications des rampes, zones d'escalade et inspection des robots.",
    "Open Official Manual (Google Docs) ↗": "Ouvrir le Manuel Officiel (Google Docs) ↗",
    "Platform Tactical Modules": "Modules Tactiques de la Plateforme",
    "Designed by Team Colombia to empower robotics alliances worldwide": "Conçu par Team Colombia pour renforcer les alliances de robotique dans le monde entier",
    "Tactical Strategy Playbook": "Playbook de Stratégie Tactique",
    "Interactive alliance designer with real-time scoring projection, role synchronization, and 3-robot strategic synergy graphs.": "Concepteur interactif d'alliance avec projection des scores en temps réel, synchronisation des rôles et synergies à 3 robots.",
    "Design Strategy": "Concevoir la Stratégie",
    "Real-Time 2D Match Simulator": "Simulateur de Match 2D en Temps Réel",
    "Full physics game simulator with 6 autonomous and player-controlled robots, linear motion hoppers, cable climbing, and live telemetry.": "Simulateur de physique avec 6 robots autonomes et télécommandés, trémies à mouvement linéaire, escalade et télémétrie.",
    "Launch Simulator": "Lancer le Simulateur",
    "Official Scoring Calculator": "Calculateur Officiel de Score",
    "Rulebook mathematical validation engine. Evaluate regional match scenarios, cooperative alliance ranking points, and climbing multipliers.": "Moteur de validation mathématique du règlement. Évaluez les scénarios de match, points de classement et multiplicateurs d'escalade.",
    "Open Calculator": "Ouvrir le Calculateur",
    "Global Leaderboard & Match Records": "Classement Mondial & Récords",
    "Verified scores recorded in competition from the database": "Scores vérifiés enregistrés en compétition depuis la base de données",
    "Play & Submit Record ➔": "Jouer et Enregistrer le Score ➔",
    "Filter by team name or country...": "Filtrar por nom d'équipe ou pays...",
    "Rank": "Rang",
    "Competitor": "Compétiteur",
    "Team Name": "Nom de l'Équipe",
    "Country": "Pays",
    "Role": "Rôle",
    "Matches": "Matchs",
    "Record Score": "Score Record",
    "Platform Navigation": "Navigation sur la Plateforme",
    "Official Resources": "Ressources Officielles",
    "Portal Home": "Accueil du Portail",
    "2D Match Simulator": "Simulateur de Match 2D",
    "Game Manual 2026": "Manuel de Jeu 2026",
    "FIRST Global Official": "Site Officiel FIRST Global",
    "Team Colombia Hub": "Hub Team Colombia",
    "FGC Access & Profile Setup": "Accès FGC & Configuration du Profil",
    "Create Profile & Team": "Créer un Profil & une Équipe",
    "Username": "Nom d'utilisateur",
    "Profile Picture / Avatar": "Photo de Profil / Avatar",
    "Email Address": "Adresse E-mail",
    "Password": "Mot de passe",
    "Enter Platform": "Entrer sur la Plateforme",
    "Complete Profile & Enter": "Compléter le Profil & Entrer",
    "ColBot AI": "ColBot IA",
    "Ask ColBot about rules, strategy, or robot specs...": "Demandez à ColBot sur les règles, la stratégie ou les spécifications..."
  },
  ko: {
    "Portal": "포털",
    "2D Simulator": "2D 시뮬레이터",
    "Tactical Playbook": "전술 플레이북",
    "Calculator": "점수 계산기",
    "Sign In": "로그인",
    "OFFICIAL STRATEGY & SIMULATION PLATFORM": "공식 전술 전략 및 시뮬레이션 플랫폼",
    "FIRST Global Challenge 2026": "FIRST Global Challenge 2026",
    "Igniting Innovation": "혁신을 밝히다 (Igniting Innovation)",
    "Complete engineering ecosystem for match score calculation, real-time 2D simulation with robot kinematics, alliance tactical planning, and AI assistance built for teams worldwide.": "전 세계 팀을 위해 제작된 경기 점수 계산, 로봇 기구학 기반 실시간 2D 시뮬레이션, 동맹 전술 계획 및 AI 지원 엔지니어링 생태계.",
    "Launch 2D Simulator": "2D 시뮬레이터 실행",
    "Strategy Playbook": "전략 플레이북",
    "Score Calculator": "점수 계산기",
    "Official Game Manual — FGC 2026 Incheon": "공식 경기 매뉴얼 — FGC 2026 인천",
    "Access the official rules, 7×7m arena layout, ramp specifications, climbing zones, and robot inspection requirements.": "공식 규칙, 7×7m 경기장 배치, 경사로 사양, 클라이밍 구역 및 로봇 검사 요구 사항을 확인하세요.",
    "Open Official Manual (Google Docs) ↗": "공식 매뉴얼 열기 (Google Docs) ↗",
    "Platform Tactical Modules": "플랫폼 전술 모듈",
    "Designed by Team Colombia to empower robotics alliances worldwide": "전 세계 로봇 동맹을 지원하기 위해 Team Colombia가 설계함",
    "Tactical Strategy Playbook": "전술 전략 플레이북",
    "Interactive alliance designer with real-time scoring projection, role synchronization, and 3-robot strategic synergy graphs.": "실시간 점수 예측, 역할 동기화 및 3개 로봇 전략 시너지 그래프를 제공하는 대화형 동맹 디자이너.",
    "Design Strategy": "전략 수립하기",
    "Real-Time 2D Match Simulator": "실시간 2D 경기 시뮬레이터",
    "Full physics game simulator with 6 autonomous and player-controlled robots, linear motion hoppers, cable climbing, and live telemetry.": "6개의 자율 및 플레이어 제어 로봇, 선형 운동 호퍼, 케이블 클라이밍 및 실시간 텔레메트리가 포함된 물리 시뮬레이터.",
    "Launch Simulator": "시뮬레이터 시작",
    "Official Scoring Calculator": "공식 경기 점수 계산기",
    "Rulebook mathematical validation engine. Evaluate regional match scenarios, cooperative alliance ranking points, and climbing multipliers.": "경기 규칙 수학적 검증 엔진. 경기 시나리오, 협력 랭킹 포인트 및 클라이밍 승수를 평가하세요.",
    "Open Calculator": "계산기 열기",
    "Global Leaderboard & Match Records": "글로벌 순위표 및 경기 기록",
    "Verified scores recorded in competition from the database": "데이터베이스에서 검증된 대회 기록 점수",
    "Play & Submit Record ➔": "경기 플레이 & 기록 제출 ➔",
    "Filter by team name or country...": "팀 이름 또는 국가로 검색...",
    "Rank": "순위",
    "Competitor": "참가자",
    "Team Name": "팀 이름",
    "Country": "국가",
    "Role": "역할",
    "Matches": "경기 수",
    "Record Score": "최고 점수",
    "Platform Navigation": "플랫폼 탐색",
    "Official Resources": "공식 자료실",
    "Portal Home": "포털 홈",
    "2D Match Simulator": "2D 경기 시뮬레이터",
    "Game Manual 2026": "2026 게임 매뉴얼",
    "FIRST Global Official": "FIRST Global 공식 사이트",
    "Team Colombia Hub": "Team Colombia 허브",
    "FGC Access & Profile Setup": "FGC 참가자 프로필 설정",
    "Create Profile & Team": "프로필 및 팀 생성",
    "Username": "사용자 이름",
    "Profile Picture / Avatar": "프로필 사진 / 아바타",
    "Email Address": "이메일 주소",
    "Password": "비밀번호",
    "Enter Platform": "플랫폼 입장",
    "Complete Profile & Enter": "프로필 완료 후 입장",
    "ColBot AI": "ColBot 인공지능",
    "Ask ColBot about rules, strategy, or robot specs...": "ColBot에게 경기 규칙, 전략 또는 로봇 규격을 물어보세요..."
  },
  ur: {
    "Portal": "پورٹل",
    "2D Simulator": "2D سمیلیٹر",
    "Tactical Playbook": "حکمت عملی پلے بک",
    "Calculator": "کیلکولیٹر",
    "Sign In": "سائن ان کریں",
    "OFFICIAL STRATEGY & SIMULATION PLATFORM": "سرکاری حکمت عملی اور تخروپن کا پلیٹ فارم",
    "FIRST Global Challenge 2026": "FIRST Global Challenge 2026",
    "Igniting Innovation": "جدت کو جگانا (Igniting Innovation)",
    "Complete engineering ecosystem for match score calculation, real-time 2D simulation with robot kinematics, alliance tactical planning, and AI assistance built for teams worldwide.": "دنیا بھر کی ٹیموں کے لیے میچ سکور کیلکولیشن، روبوٹ کائینیٹکس کے ساتھ 2D سمولیشن اور AI مدد کا مکمل انجینئرنگ ایکو سسٹم۔",
    "Launch 2D Simulator": "2D سمیلیٹر شروع کریں",
    "Strategy Playbook": "حکمت عملی پلے بک",
    "Score Calculator": "سکور کیلکولیٹر",
    "Official Game Manual — FGC 2026 Incheon": "سرکاری گیم دستی — FGC 2026 انچیون",
    "Access the official rules, 7×7m arena layout, ramp specifications, climbing zones, and robot inspection requirements.": "سرکاری قواعد، 7x7 میٹر میدان کا لے آؤٹ، ریمپ اور چڑھنے کے زون تک رسائی حاصل کریں۔",
    "Open Official Manual (Google Docs) ↗": "سرکاری دستی کھولیں (گوگل دستاویزات) ↗",
    "Platform Tactical Modules": "پلیٹ فارم کے ٹیکٹیکل ماڈیولز",
    "Designed by Team Colombia to empower robotics alliances worldwide": "دنیا بھر کے روبوٹکس اتحاد کو بااختیار بنانے کے لیے ٹیم کولمبیا کا ڈیزائن کردہ",
    "Tactical Strategy Playbook": "ٹیکٹیکل اسٹریٹجی پلے بک",
    "Interactive alliance designer with real-time scoring projection, role synchronization, and 3-robot strategic synergy graphs.": "ریئل ٹائم اسکورنگ اور 3 روبوٹ سٹریٹجک گراف کے ساتھ انٹرایکٹو الائنس ڈیزائنر۔",
    "Design Strategy": "حکمت عملی ڈیزائن کریں",
    "Real-Time 2D Match Simulator": "ریئل ٹائم 2D میچ سمیلیٹر",
    "Full physics game simulator with 6 autonomous and player-controlled robots, linear motion hoppers, cable climbing, and live telemetry.": "6 روبوٹس، لکیری موشن ہوپرز، کیبل چڑھنے اور لائیو ٹیلی میٹری کے ساتھ مکمل فزکس گیم سمیلیٹر۔",
    "Launch Simulator": "سمیلیٹر لانچ کریں",
    "Official Scoring Calculator": "آفیشل اسکورنگ کیلکولیٹر",
    "Rulebook mathematical validation engine. Evaluate regional match scenarios, cooperative alliance ranking points, and climbing multipliers.": "قواعد ریاضیاتی توثیق کا انجن۔ میچ کے منظرناموں اور چڑھنے کے ملٹی پلائرز کا جائزہ لیں۔",
    "Open Calculator": "کیلکولیٹر کھولیں",
    "Global Leaderboard & Match Records": "عالمی لیڈر بورڈ اور میچ ریکارڈز",
    "Verified scores recorded in competition from the database": "ڈیٹا بیس سے تصدیق شدہ مسابقتی ریکارڈ سکور",
    "Play & Submit Record ➔": "کھیلیں اور ریکارڈ جمع کروائیں ➔",
    "Filter by team name or country...": "ٹیم کے نام یا ملک کے لحاظ سے تلاش کریں...",
    "Rank": "درجہ",
    "Competitor": "مدمقابل",
    "Team Name": "ٹیم کا نام",
    "Country": "ملک",
    "Role": "کردار",
    "Matches": "میچز",
    "Record Score": "ریکارڈ سکور",
    "Platform Navigation": "پلیٹ فارم نیویگیشن",
    "Official Resources": "سرکاری وسائل",
    "Portal Home": "پورٹل ہوم",
    "2D Match Simulator": "2D میچ سمیلیٹر",
    "Game Manual 2026": "گیم دستی 2026",
    "FIRST Global Official": "آفیشل فرسٹ گلوبل",
    "Team Colombia Hub": "ٹیم کولمبیا حب",
    "FGC Access & Profile Setup": "پروفائل سیٹ اپ اور رسائی",
    "Create Profile & Team": "پروفائل اور ٹیم بنائیں",
    "Username": "صارف کا نام",
    "Profile Picture / Avatar": "پروفائل تصویر / اوتار",
    "Email Address": "ای میل ایڈریس",
    "Password": "پاس ورڈ",
    "Enter Platform": "پلیٹ فارم میں داخل ہوں",
    "Complete Profile & Enter": "پروفائل مکمل کریں اور داخل ہوں",
    "ColBot AI": "کول بوٹ AI",
    "Ask ColBot about rules, strategy, or robot specs...": "کول بوٹ سے قواعد، حکمت عملی یا روبوٹ کے بارے میں پوچھیں..."
  },
  id: {
    "Portal": "Portal",
    "2D Simulator": "Simulator 2D",
    "Tactical Playbook": "Buku Taktis",
    "Calculator": "Kalkulator",
    "Sign In": "Masuk",
    "OFFICIAL STRATEGY & SIMULATION PLATFORM": "PLATFORM STRATEGI & SIMULASI RESMI",
    "FIRST Global Challenge 2026": "FIRST Global Challenge 2026",
    "Igniting Innovation": "Menyalakan Inovasi",
    "Complete engineering ecosystem for match score calculation, real-time 2D simulation with robot kinematics, alliance tactical planning, and AI assistance built for teams worldwide.": "Ekosistem rekayasa lengkap untuk kalkulasi skor, simulasi 2D waktu nyata dengan kinematika robot, dan bantuan AI.",
    "Launch 2D Simulator": "Mulai Simulator 2D",
    "Strategy Playbook": "Buku Strategi",
    "Score Calculator": "Kalkulator Skor",
    "Official Game Manual — FGC 2026 Incheon": "Panduan Game Resmi — FGC 2026 Incheon",
    "Access the official rules, 7×7m arena layout, ramp specifications, climbing zones, and robot inspection requirements.": "Akses aturan resmi, tata letak arena 7×7m, spesifikasi tanjakan, dan zona panjat.",
    "Open Official Manual (Google Docs) ↗": "Buka Panduan Resmi (Google Docs) ↗",
    "Platform Tactical Modules": "Modul Taktis Platform",
    "Designed by Team Colombia to empower robotics alliances worldwide": "Dirancang oleh Tim Kolombia untuk memberdayakan aliansi robotika di seluruh dunia",
    "Tactical Strategy Playbook": "Buku Strategi Taktis",
    "Interactive alliance designer with real-time scoring projection, role synchronization, and 3-robot strategic synergy graphs.": "Perancang aliansi interaktif dengan proyeksi skor langsung dan sinergi 3 robot.",
    "Design Strategy": "Rancang Strategi",
    "Real-Time 2D Match Simulator": "Simulator Pertandingan 2D Waktu Nyata",
    "Full physics game simulator with 6 autonomous and player-controlled robots, linear motion hoppers, cable climbing, and live telemetry.": "Simulator fisika penuh dengan 6 robot, gerak linier, panjat kabel, dan telemetri langsung.",
    "Launch Simulator": "Luncurkan Simulator",
    "Official Scoring Calculator": "Kalkulator Skor Resmi",
    "Rulebook mathematical validation engine. Evaluate regional match scenarios, cooperative alliance ranking points, and climbing multipliers.": "Mesin validasi aturan matematika untuk skenario pertandingan dan pengganda panjat.",
    "Open Calculator": "Buka Kalkulator",
    "Global Leaderboard & Match Records": "Papan Peringkat Global & Rekor Pertandingan",
    "Verified scores recorded in competition from the database": "Skor terverifikasi yang tercatat dari database",
    "Play & Submit Record ➔": "Main & Kirim Rekor ➔",
    "Filter by team name or country...": "Cari berdasarkan nama tim atau negara...",
    "Rank": "Peringkat",
    "Competitor": "Peserta",
    "Team Name": "Nama Tim",
    "Country": "Negara",
    "Role": "Peran",
    "Matches": "Pertandingan",
    "Record Score": "Skor Rekor",
    "Platform Navigation": "Navigasi Platform",
    "Official Resources": "Sumber Daya Resmi",
    "Portal Home": "Beranda Portal",
    "2D Match Simulator": "Simulator Pertandingan 2D",
    "Game Manual 2026": "Buku Panduan Game 2026",
    "FIRST Global Official": "Resmi FIRST Global",
    "Team Colombia Hub": "Pusat Tim Kolombia",
    "FGC Access & Profile Setup": "Akses FGC & Pengaturan Profil",
    "Create Profile & Team": "Buat Profil & Tim",
    "Username": "Nama Pengguna",
    "Profile Picture / Avatar": "Foto Profil / Avatar",
    "Email Address": "Alamat Email",
    "Password": "Kata Sandi",
    "Enter Platform": "Masuk Platform",
    "Complete Profile & Enter": "Lengkapi Profil & Masuk",
    "ColBot AI": "AI ColBot",
    "Ask ColBot about rules, strategy, or robot specs...": "Tanyakan ColBot tentang aturan, strategi, atau robot..."
  }
};

// ── UNIVERSAL I18N MANAGER ───────────────────────────────────────────
const I18nManager = {
  currentLang: 'en',
  isOpen: false,
  isTranslating: false,
  originalNodes: new Map(), // Element/TextNode -> Original baseline English string
  cache: {}, // langCode -> { text: translation }

  _CACHE_VERSION: 'v3',

  init() {
    // 1. Clear corrupted translation cache from previous batch translation engine
    const cacheVer = localStorage.getItem('fgc_trans_ver');
    if (cacheVer !== this._CACHE_VERSION) {
      localStorage.removeItem('fgc_trans_cache');
      localStorage.setItem('fgc_trans_ver', this._CACHE_VERSION);
      this.cache = {};
    }

    // 2. Recover saved language (Default: English)
    const saved = localStorage.getItem('fgc_lang') || 'en';
    this.currentLang = saved;

    // Load local storage translation cache
    try {
      const stored = localStorage.getItem('fgc_trans_cache');
      if (stored) this.cache = JSON.parse(stored);
    } catch (e) {
      this.cache = {};
    }

    // Merge pre-compiled dictionaries into memory cache
    for (const [lang, map] of Object.entries(BUILTIN_DICTIONARY)) {
      this.cache[lang] = Object.assign({}, this.cache[lang] || {}, map);
    }

    this.renderPicker();
    this.indexDOM();
    this.applyLanguage(this.currentLang, false);
  },

  // Index every text node and placeholder in the document on baseline English
  indexDOM() {
    const walk = (el) => {
      if (!el || el.id === 'fgcLangPicker' || el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'CANVAS') return;

      for (let node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const txt = node.nodeValue.trim();
          if (txt && !this.originalNodes.has(node)) {
            this.originalNodes.set(node, node.nodeValue);
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.placeholder && !node.__i18nPlaceholderOrig) {
            node.__i18nPlaceholderOrig = node.placeholder;
          }
          if (node.title && !node.__i18nTitleOrig) {
            node.__i18nTitleOrig = node.title;
          }
          walk(node);
        }
      }
    };
    walk(document.body);
  },

  renderPicker() {
    if (document.getElementById('fgcLangPicker')) return;

    const current = FGC_LANGUAGES.find(l => l.code === this.currentLang) || FGC_LANGUAGES[0];

    const container = document.createElement('div');
    container.id = 'fgcLangPicker';
    container.className = 'lang-picker-wrapper';
    container.innerHTML = `
      <button type="button" id="langPickerBtn" class="lang-picker-btn" aria-label="Select Language">
        <span id="currentLangFlag" style="font-size: 1.15rem;">${current.flag}</span>
        <span id="currentLangName" style="font-family: var(--font-display); font-weight: 700; font-size: 0.72rem;">${current.code.toUpperCase()}</span>
        <svg style="width: 10px; height: 10px; fill: currentColor; opacity: 0.7;" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </button>

      <div id="langPickerDropdown" class="lang-dropdown-panel">
        <div class="lang-dropdown-header">
          <input type="text" id="langSearchInput" class="lang-search-box" placeholder="Search (${FGC_LANGUAGES.length} languages)...">
        </div>
        <div id="langList" class="lang-scroll-list">
          ${FGC_LANGUAGES.map(l => `
            <button type="button" class="lang-item ${l.code === this.currentLang ? 'selected' : ''}" data-code="${l.code}">
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

    const header = document.querySelector('.app-header');
    if (header) {
      const nav = header.querySelector('.nav-area');
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
      dropdown.addEventListener('click', (e) => e.stopPropagation());
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
          const code = item.getAttribute('data-code');
          this.applyLanguage(code, true);
          this.isOpen = false;
          dropdown.classList.remove('active');
        });
      });
    }
  },

  async applyLanguage(code, isUserAction = false) {
    try {
      const langObj = FGC_LANGUAGES.find(l => l.code === code) || FGC_LANGUAGES[0];
      this.currentLang = langObj.code;
      localStorage.setItem('fgc_lang', this.currentLang);

      const flagEl = document.getElementById('currentLangFlag');
      const nameEl = document.getElementById('currentLangName');
      if (flagEl) flagEl.textContent = langObj.flag;
      if (nameEl) nameEl.textContent = langObj.code.toUpperCase();

      document.querySelectorAll('.lang-item').forEach(el => {
        el.classList.toggle('selected', el.dataset.code === code);
      });

      // Support RTL for Arabic, Urdu, Persian, Hebrew
      const isRtl = ['ar', 'ur', 'fa', 'he', 'iw'].includes(code);
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

      // Always restore to clean English baseline first
      this.restoreEnglish();

      if (code === 'en') {
        window.__FGC_ACTIVE_LANG = langObj;
        return;
      }

      // 1. Apply cached translations
      const dict = this.cache[code] || {};
      this.translateDOMWithDict(dict);

      // 2. Fetch missing phrases using Google Translate Neural Client API
      await this.fetchMissingTranslations(code);

      window.__FGC_ACTIVE_LANG = langObj;
    } catch (err) {
      console.error('Language switch error:', err);
      // Safety fallback: restore English if translation fails
      this.restoreEnglish();
    }
  },

  restoreEnglish() {
    this.originalNodes.forEach((origVal, node) => {
      if (node && node.parentNode) {
        node.nodeValue = origVal;
      }
    });

    document.querySelectorAll('[placeholder]').forEach(el => {
      if (el.__i18nPlaceholderOrig) el.placeholder = el.__i18nPlaceholderOrig;
    });
    document.querySelectorAll('[title]').forEach(el => {
      if (el.__i18nTitleOrig) el.title = el.__i18nTitleOrig;
    });
  },

  translateDOMWithDict(dict) {
    if (!dict || typeof dict !== 'object') return;

    this.originalNodes.forEach((origVal, node) => {
      if (!node || !node.parentNode) return;
      const trimmed = origVal.trim();
      if (!trimmed) return;

      const translated = dict[trimmed];
      // Safety: never replace with empty/whitespace/undefined values
      if (translated && typeof translated === 'string' && translated.trim().length > 0) {
        node.nodeValue = origVal.replace(trimmed, translated);
      }
    });

    document.querySelectorAll('[placeholder]').forEach(el => {
      const orig = el.__i18nPlaceholderOrig || el.placeholder;
      if (orig && dict[orig] && dict[orig].trim().length > 0) {
        el.placeholder = dict[orig];
      }
    });

    document.querySelectorAll('[title]').forEach(el => {
      const orig = el.__i18nTitleOrig || el.title;
      if (orig && dict[orig] && dict[orig].trim().length > 0) {
        el.title = dict[orig];
      }
    });
  },

  async fetchMissingTranslations(targetLang) {
    const dict = this.cache[targetLang] || {};
    const missingPhrases = new Set();

    this.originalNodes.forEach((origVal) => {
      const trimmed = origVal.trim();
      if (trimmed && trimmed.length > 1 && !/^\d+$/.test(trimmed) && !dict[trimmed]) {
        missingPhrases.add(trimmed);
      }
    });

    document.querySelectorAll('[placeholder]').forEach(el => {
      const orig = el.__i18nPlaceholderOrig || el.placeholder;
      if (orig && !dict[orig]) missingPhrases.add(orig);
    });

    const phraseList = Array.from(missingPhrases);
    if (phraseList.length === 0) return;

    // Show loading indicator
    this._showTranslatingIndicator(phraseList.length);

    // Translate each phrase individually for 100% reliability
    // Process in parallel batches of 5 for speed
    const PARALLEL = 5;
    let completed = 0;

    const translateOne = async (phrase) => {
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(phrase)}`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        if (data && data[0]) {
          const translated = data[0].map(x => x[0]).join('').trim();
          if (translated && translated !== phrase) {
            dict[phrase] = translated;
          }
        }
      } catch (err) {
        console.warn(`Translation error for "${phrase}" -> ${targetLang}:`, err);
      }
      completed++;
      this._updateTranslatingIndicator(completed, phraseList.length);
    };

    for (let i = 0; i < phraseList.length; i += PARALLEL) {
      const batch = phraseList.slice(i, i + PARALLEL);
      await Promise.all(batch.map(p => translateOne(p)));

      // Progressively apply translations to DOM every batch
      if (this.currentLang === targetLang) {
        this.translateDOMWithDict(dict);
      }
    }

    this.cache[targetLang] = dict;
    try {
      localStorage.setItem('fgc_trans_cache', JSON.stringify(this.cache));
    } catch (e) {}

    this._hideTranslatingIndicator();

    // Final re-apply
    if (this.currentLang === targetLang) {
      this.translateDOMWithDict(dict);
    }
  },

  _showTranslatingIndicator(total) {
    let el = document.getElementById('i18nTranslatingBar');
    if (!el) {
      el = document.createElement('div');
      el.id = 'i18nTranslatingBar';
      el.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:999999;background:linear-gradient(90deg,#ff6b00,#ff9500);height:3px;transition:width 0.3s ease;width:0%;';
      document.body.appendChild(el);
    }
    el.style.display = 'block';
    el.style.width = '2%';

    let label = document.getElementById('i18nTranslatingLabel');
    if (!label) {
      label = document.createElement('div');
      label.id = 'i18nTranslatingLabel';
      label.style.cssText = 'position:fixed;top:5px;left:50%;transform:translateX(-50%);z-index:999999;background:rgba(17,21,37,0.92);color:#ff9500;padding:5px 18px;border-radius:20px;font-size:0.75rem;font-family:var(--font-display,Inter,sans-serif);backdrop-filter:blur(6px);border:1px solid rgba(255,107,0,0.3);';
      document.body.appendChild(label);
    }
    label.textContent = `Translating… 0/${total}`;
    label.style.display = 'block';
  },

  _updateTranslatingIndicator(done, total) {
    const bar = document.getElementById('i18nTranslatingBar');
    const label = document.getElementById('i18nTranslatingLabel');
    const pct = Math.min(98, Math.round((done / total) * 100));
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = `Translating… ${done}/${total}`;
  },

  _hideTranslatingIndicator() {
    const bar = document.getElementById('i18nTranslatingBar');
    const label = document.getElementById('i18nTranslatingLabel');
    if (bar) { bar.style.width = '100%'; setTimeout(() => { bar.style.display = 'none'; }, 400); }
    if (label) { setTimeout(() => { label.style.display = 'none'; }, 400); }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  I18nManager.init();
});
