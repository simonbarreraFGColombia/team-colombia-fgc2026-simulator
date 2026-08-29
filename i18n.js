/**
 * FGC 2026 Global Multi-Language System (i18n)
 * Supports 78 distinct world languages
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

// ── INSTANT CLIENT-SIDE TRANSLATION DICTIONARY ──────────────────────────
const UI_DICTIONARY = {
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
    "Ask ColBot about rules, strategy, or robot specs...": "Fragen Sie ColBot nach Regeln, Strategie oder Specs..."
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
    "Complete engineering ecosystem for match score calculation, real-time 2D simulation with robot kinematics, alliance tactical planning, and AI assistance built for teams worldwide.": "Ecosistema completo de ingeniería para cálculo de puntajes, simulación 2D en tiempo real con cinemática, planificación táctica de alianzas y asistencia de IA para equipos del mundo.",
    "Launch 2D Simulator": "Iniciar Simulador 2D",
    "Strategy Playbook": "Playbook de Estrategia",
    "Score Calculator": "Calculadora de Puntos",
    "Official Game Manual — FGC 2026 Incheon": "Manual Oficial de Juego — FGC 2026 Incheon",
    "Access the official rules, 7×7m arena layout, ramp specifications, climbing zones, and robot inspection requirements.": "Accede a las reglas oficiales, layout de cancha de 7×7m, especificaciones de rampa, zonas de escalada e inspección de robots.",
    "Open Official Manual (Google Docs) ↗": "Abrir Manual Oficial (Google Docs) ↗",
    "Platform Tactical Modules": "Módulos Tácticos de la Plataforma",
    "Designed by Team Colombia to empower robotics alliances worldwide": "Diseñado por Team Colombia para potenciar alianzas robóticas del mundo",
    "Tactical Strategy Playbook": "Playbook Táctico de Alianza",
    "Interactive alliance designer with real-time scoring projection, role synchronization, and 3-robot strategic synergy graphs.": "Diseñador interactivo de alianzas con proyección de puntos en tiempo real, sincronización de roles y gráficos de sinergia entre 3 robots.",
    "Design Strategy": "Diseñar Estrategia",
    "Real-Time 2D Match Simulator": "Simulador de Partidos 2D en Tiempo Real",
    "Full physics game simulator with 6 autonomous and player-controlled robots, linear motion hoppers, cable climbing, and live telemetry.": "Simulador de física completa con 6 robots autónomos y controlables, tolvas de linear motion, escalada y telemetría en vivo.",
    "Launch Simulator": "Iniciar Simulador",
    "Official Scoring Calculator": "Calculadora Oficial de Puntos",
    "Rulebook mathematical validation engine. Evaluate regional match scenarios, cooperative alliance ranking points, and climbing multipliers.": "Motor de validación matemática según el reglamento. Evalúa escenarios de partido, puntos de ranking de alianza y multiplicadores.",
    "Open Calculator": "Abrir Calculadora",
    "Global Leaderboard & Match Records": "Ranking Mundial & Récords de Partidos",
    "Verified scores recorded in competition from the database": "Puntajes verificados registrados en competencia desde la base de datos",
    "Play & Submit Record ➔": "Jugar & Enviar Récord ➔",
    "Filter by team name or country...": "Filtrar por equipo o país...",
    "Rank": "Puesto",
    "Competitor": "Competidor",
    "Team Name": "Nombre de Equipo",
    "Country": "País",
    "Role": "Rol",
    "Matches": "Partidos",
    "Record Score": "Puntaje Récord",
    "Platform Navigation": "Navegación de Plataforma",
    "Official Resources": "Recursos Oficiales",
    "Portal Home": "Inicio Portal",
    "2D Match Simulator": "Simulador de Partidos 2D",
    "Game Manual 2026": "Manual de Juego 2026",
    "FIRST Global Official": "FIRST Global Oficial",
    "Team Colombia Hub": "Hub Team Colombia",
    "FGC Access & Profile Setup": "Portal de Acceso y Perfil FGC",
    "Create Profile & Team": "Crear Perfil y Equipo",
    "Username": "Nombre de Usuario",
    "Profile Picture / Avatar": "Foto de Perfil / Avatar",
    "Email Address": "Correo Electrónico",
    "Password": "Contraseña",
    "Enter Platform": "Ingresar a la Plataforma",
    "Complete Profile & Enter": "Completar Perfil e Ingresar",
    "ColBot AI": "ColBot IA",
    "Ask ColBot about rules, strategy, or robot specs...": "Pregúntale a ColBot sobre reglas, estrategia o specs..."
  },
  fr: {
    "Portal": "Portail",
    "2D Simulator": "Simulateur 2D",
    "Tactical Playbook": "Cahier Tactique",
    "Calculator": "Calculateur",
    "Sign In": "Se Connecter",
    "OFFICIAL STRATEGY & SIMULATION PLATFORM": "PLATEFORME OFFICIELLE DE STRATÉGIE ET SIMULATION",
    "FIRST Global Challenge 2026": "FIRST Global Challenge 2026",
    "Igniting Innovation": "Allumer l'Innovation",
    "Complete engineering ecosystem for match score calculation, real-time 2D simulation with robot kinematics, alliance tactical planning, and AI assistance built for teams worldwide.": "Écosystème d'ingénierie complet pour le calcul des scores, simulation 2D temps réel, planification tactique et assistance IA.",
    "Launch 2D Simulator": "Lancer le Simulateur 2D",
    "Strategy Playbook": "Cahier de Stratégie",
    "Score Calculator": "Calculateur de Score",
    "Official Game Manual — FGC 2026 Incheon": "Manuel Officiel du Jeu — FGC 2026 Incheon",
    "Access the official rules, 7×7m arena layout, ramp specifications, climbing zones, and robot inspection requirements.": "Accédez aux règles officielles, disposition d'arène 7×7m, spécifications de rampe, zones d'escalade et inspection des robots.",
    "Open Official Manual (Google Docs) ↗": "Ouvrir le Manuel Officiel (Google Docs) ↗",
    "Platform Tactical Modules": "Modules Tactiques de la Plateforme",
    "Designed by Team Colombia to empower robotics alliances worldwide": "Conçu par Team Colombia pour autonomiser les alliances robotiques mondiales",
    "Tactical Strategy Playbook": "Cahier Tactique d'Alliance",
    "Interactive alliance designer with real-time scoring projection, role synchronization, and 3-robot strategic synergy graphs.": "Concepteur d'alliance interactif avec projection de score en temps réel et graphes de synergie.",
    "Design Strategy": "Concevoir la Stratégie",
    "Real-Time 2D Match Simulator": "Simulateur de Match 2D en Temps Réel",
    "Full physics game simulator with 6 autonomous and player-controlled robots, linear motion hoppers, cable climbing, and live telemetry.": "Simulateur physique complet avec 6 robots, trémies linear motion, escalade et télémétrie en direct.",
    "Launch Simulator": "Lancer le Simulateur",
    "Official Scoring Calculator": "Calculateur Officiel de Score",
    "Rulebook mathematical validation engine. Evaluate regional match scenarios, cooperative alliance ranking points, and climbing multipliers.": "Moteur de validation mathématique des règles FGC.",
    "Open Calculator": "Ouvrir le Calculateur",
    "Global Leaderboard & Match Records": "Classement Mondial & Records",
    "Verified scores recorded in competition from the database": "Scores vérifiés enregistrés en compétition",
    "Play & Submit Record ➔": "Jouer & Soumettre Record ➔",
    "Filter by team name or country...": "Filtrer par équipe ou pays...",
    "Rank": "Rang",
    "Competitor": "Concurrent",
    "Team Name": "Nom d'Équipe",
    "Country": "Pays",
    "Role": "Rôle",
    "Matches": "Matchs",
    "Record Score": "Score Record",
    "Platform Navigation": "Navigation Plateforme",
    "Official Resources": "Ressources Officielles",
    "Portal Home": "Accueil Portail",
    "2D Match Simulator": "Simulateur 2D",
    "Game Manual 2026": "Manuel du Jeu 2026",
    "FIRST Global Official": "FIRST Global Officiel",
    "Team Colombia Hub": "Hub Team Colombia",
    "FGC Access & Profile Setup": "Accès FGC & Configuration Profil",
    "Create Profile & Team": "Créer Profil & Équipe",
    "Username": "Nom d'utilisateur",
    "Profile Picture / Avatar": "Photo de Profil / Avatar",
    "Email Address": "Adresse Email",
    "Password": "Mot de passe",
    "Enter Platform": "Entrer sur la Plateforme",
    "Complete Profile & Enter": "Compléter le Profil & Entrer",
    "ColBot AI": "ColBot IA",
    "Ask ColBot about rules, strategy, or robot specs...": "Demandez à ColBot sur les règles ou specs..."
  },
  ko: {
    "Portal": "포털",
    "2D Simulator": "2D 시뮬레이터",
    "Tactical Playbook": "전술 플레이북",
    "Calculator": "계산기",
    "Sign In": "로그인",
    "OFFICIAL STRATEGY & SIMULATION PLATFORM": "공식 전략 및 시뮬레이션 플랫폼",
    "FIRST Global Challenge 2026": "FIRST Global Challenge 2026",
    "Igniting Innovation": "혁신을 점화하다",
    "Complete engineering ecosystem for match score calculation, real-time 2D simulation with robot kinematics, alliance tactical planning, and AI assistance built for teams worldwide.": "경기 점수 계산, 로봇 기구학 기반 2D 실시간 시뮬레이션, 연합 전술 계획 및 전 세계 팀을 위한 AI 엔지니어링 에코시스템.",
    "Launch 2D Simulator": "2D 시뮬레이터 실행",
    "Strategy Playbook": "전략 플레이북",
    "Score Calculator": "점수 계산기",
    "Official Game Manual — FGC 2026 Incheon": "공식 경기 매뉴얼 — FGC 2026 인천",
    "Access the official rules, 7×7m arena layout, ramp specifications, climbing zones, and robot inspection requirements.": "공식 규칙, 7×7m 경기장 레이아웃, 경사로 사양, 클라이밍 구역 및 로봇 검사 요건 확인.",
    "Open Official Manual (Google Docs) ↗": "공식 매뉴얼 열기 (Google Docs) ↗",
    "Platform Tactical Modules": "플랫폼 전술 모듈",
    "Designed by Team Colombia to empower robotics alliances worldwide": "전 세계 로봇 공학 연합을 지원하기 위해 Team Colombia에서 설계",
    "Tactical Strategy Playbook": "전술 전략 플레이북",
    "Interactive alliance designer with real-time scoring projection, role synchronization, and 3-robot strategic synergy graphs.": "실시간 점수 예측, 역할 동기화 및 3대 로봇 전략 시너지 그래프를 제공하는 대화형 연합 설계기.",
    "Design Strategy": "전략 설계하기",
    "Real-Time 2D Match Simulator": "실시간 2D 경기 시뮬레이터",
    "Full physics game simulator with 6 autonomous and player-controlled robots, linear motion hoppers, cable climbing, and live telemetry.": "6대의 자율 및 조종 로봇, 리니어 모션 호퍼, 케이블 클라이밍 및 실시간 텔레메트리를 포함한 물리 시뮬레이터.",
    "Launch Simulator": "시뮬레이터 시작",
    "Official Scoring Calculator": "공식 점수 계산기",
    "Rulebook mathematical validation engine. Evaluate regional match scenarios, cooperative alliance ranking points, and climbing multipliers.": "공식 규칙 수학적 검증 엔진. 경기 시나리오, 협력 순위 점수 및 승수를 평가합니다.",
    "Open Calculator": "계산기 열기",
    "Global Leaderboard & Match Records": "글로벌 리더보드 & 경기 기록",
    "Verified scores recorded in competition from the database": "데이터베이스에 기록된 검증된 공식 경기 점수",
    "Play & Submit Record ➔": "플레이 및 기록 등록 ➔",
    "Filter by team name or country...": "팀 이름 또는 국가로 검색...",
    "Rank": "순위",
    "Competitor": "참가자",
    "Team Name": "팀 이름",
    "Country": "국가",
    "Role": "역할",
    "Matches": "경기 수",
    "Record Score": "최고 점수",
    "Platform Navigation": "플랫폼 탐색",
    "Official Resources": "공식 리소스",
    "Portal Home": "포털 홈",
    "2D Match Simulator": "2D 경기 시뮬레이터",
    "Game Manual 2026": "2026 경기 매뉴얼",
    "FIRST Global Official": "FIRST Global 공식",
    "Team Colombia Hub": "Team Colombia 허브",
    "FGC Access & Profile Setup": "FGC 접속 및 프로필 설정",
    "Create Profile & Team": "프로필 및 팀 생성",
    "Username": "사용자 이름",
    "Profile Picture / Avatar": "프로필 사진 / 아바타",
    "Email Address": "이메일 주소",
    "Password": "비밀번호",
    "Enter Platform": "플랫폼 입장",
    "Complete Profile & Enter": "프로필 완료 및 입장",
    "ColBot AI": "ColBot AI",
    "Ask ColBot about rules, strategy, or robot specs...": "ColBot에게 규칙, 전략 또는 로봇 스펙에 대해 질문하세요..."
  }
};

const I18nManager = {
  currentLang: localStorage.getItem('fgc_lang') || 'en',
  isOpen: false,

  init() {
    this.injectGoogleTranslateScript();
    this.injectLanguagePickerUI();
    this.applyLanguage(this.currentLang, false);
  },

  injectGoogleTranslateScript() {
    if (!document.getElementById('google_translate_element')) {
      const gDiv = document.createElement('div');
      gDiv.id = 'google_translate_element';
      gDiv.style.display = 'none';
      document.body.appendChild(gDiv);
    }

    window.googleTranslateElementInit = () => {
      try {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
          
          if (this.currentLang && this.currentLang !== 'en') {
            setTimeout(() => this.triggerGoogleTranslate(this.currentLang), 500);
          }
        }
      } catch (e) {
        console.warn("Google Translate widget init notice:", e);
      }
    };

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
      <button class="lang-picker-btn" id="langPickerBtn" type="button" aria-label="Switch language">
        <span class="lang-flag" id="currentLangFlag">${currentLangObj.flag}</span>
        <span class="lang-text" id="currentLangName">${currentLangObj.code.toUpperCase()}</span>
        <span class="lang-arrow">▼</span>
      </button>

      <div class="lang-picker-dropdown" id="langPickerDropdown">
        <div class="lang-search-box">
          <input type="text" class="lang-search-input" id="langSearchInput" placeholder="Search (78 languages)...">
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
          const code = item.getAttribute('data-code');
          this.applyLanguage(code, true);
          this.isOpen = false;
          dropdown.classList.remove('active');
        });
      });
    }
  },

  applyLanguage(code, isUserAction = false) {
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

    // 1. Instant Client-Side DOM Dictionary Translation
    this.translateDOM(code);

    // 2. Set Multi-Domain Cookies for Google Translate
    this.setTranslateCookie(code);

    // 3. Trigger Google Translate for deep coverage
    if (isUserAction) {
      this.triggerGoogleTranslate(code);
    }

    window.__FGC_ACTIVE_LANG = langObj;
  },

  translateDOM(code) {
    const dict = UI_DICTIONARY[code] || UI_DICTIONARY['en'];

    // Map of text replacements
    const walkTextNodes = (element) => {
      if (!element || element.id === 'fgcLangPicker') return;
      
      if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE' || element.tagName === 'CANVAS') return;

      for (let node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const trimmed = node.nodeValue.trim();
          if (trimmed) {
            // Check direct match
            if (dict[trimmed]) {
              node.nodeValue = node.nodeValue.replace(trimmed, dict[trimmed]);
            } else {
              // Search in all dictionary keys
              for (const [langKey, langMap] of Object.entries(UI_DICTIONARY)) {
                for (const [origEn, translatedVal] of Object.entries(langMap)) {
                  if (trimmed === translatedVal && dict[origEn]) {
                    node.nodeValue = node.nodeValue.replace(trimmed, dict[origEn]);
                    break;
                  }
                }
              }
            }
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.placeholder && dict[node.placeholder]) {
            node.placeholder = dict[node.placeholder];
          }
          walkTextNodes(node);
        }
      }
    };

    walkTextNodes(document.body);
  },

  setTranslateCookie(code) {
    const val = code === 'en' ? '/en/en' : `/en/${code}`;
    const host = window.location.hostname;
    
    document.cookie = `googtrans=${val}; path=/;`;
    document.cookie = `googtrans=${val}; path=/; domain=${host};`;
    document.cookie = `googtrans=${val}; path=/; domain=.${host.replace(/^www\./, '')};`;
  },

  triggerGoogleTranslate(code) {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  I18nManager.init();
});
