import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ── EXPERIENCES ──────────────────────────────────────────────────────────────
const experienceTranslations = [
  {
    poste: 'Intégrateur/Webdesigner JV & Formateur stagiaire',
    poste_en: 'UI Integrator/Webdesigner (Video Games) & Trainee Trainer',
    poste_de: 'UI-Integrator/Webdesigner (Videospiele) & Ausbildungstrainer',
    poste_zh: 'UI集成/网页设计师（游戏）& 培训讲师',
    details_en: [
      'UI integration and design for video game projects.',
      'Facilitation of training sessions.',
      'Design of user-centred interfaces.',
    ],
    details_de: [
      'UI-Integration und Design für Videospielprojekte.',
      'Durchführung von Schulungen.',
      'Gestaltung nutzerzentrierter Oberflächen.',
    ],
    details_zh: [
      '为游戏项目进行UI集成与设计。',
      '主持培训课程。',
      '设计以用户为中心的界面。',
    ],
  },
  {
    poste: 'Assistance numérique/informatique bénévole',
    poste_en: 'Volunteer Digital/IT Support',
    poste_de: 'Ehrenamtliche Digital-/IT-Unterstützung',
    poste_zh: '志愿数字/IT支持',
    details_en: [
      'IT assistance for residents with limited digital access.',
      'Awareness of digital hygiene and cybersecurity best practices.',
      'Support with online administrative procedures.',
      'Liaison with telecom and ISP providers.',
    ],
    details_de: [
      'IT-Unterstützung für Bewohner mit eingeschränktem digitalem Zugang.',
      'Sensibilisierung für digitale Hygiene und Cybersicherheit.',
      'Begleitung bei Online-Verwaltungsverfahren.',
      'Kontaktaufnahme mit Telekommunikations- und Internetanbietern.',
    ],
    details_zh: [
      '为数字弱势居民提供IT支持。',
      '普及数字卫生与网络安全意识。',
      '协助完成在线行政手续。',
      '联系电信和互联网服务提供商。',
    ],
  },
  {
    poste: 'Développeur web stagiaire',
    entreprise: 'Taxi Laurie Bouclier',
    poste_en: 'Junior Web Developer (Internship)',
    poste_de: 'Junior-Webentwickler (Praktikum)',
    poste_zh: '初级网页开发实习生',
    details_en: [
      'Website development with WordPress CMS.',
      'SEO optimisation to increase online visibility.',
      'Participation in team meetings to discuss requirements and technical solutions.',
      'Writing technical documentation and user tutorials for the client.',
    ],
    details_de: [
      'Website-Entwicklung mit dem CMS WordPress.',
      'SEO-Optimierung zur Steigerung der Online-Sichtbarkeit.',
      'Teilnahme an Teambesprechungen zu Anforderungen und technischen Lösungen.',
      'Erstellung technischer Dokumentation und Einführungstutorials für die Kundin.',
    ],
    details_zh: [
      '使用WordPress CMS开发网站。',
      '进行SEO优化以提升在线可见度。',
      '参与团队会议讨论需求和技术方案。',
      '为客户撰写技术文档和使用教程。',
    ],
  },
  {
    poste: 'Développeur web stagiaire',
    entreprise: 'Instant Media',
    poste_en: 'Junior Web Developer (Internship)',
    poste_de: 'Junior-Webentwickler (Praktikum)',
    poste_zh: '初级网页开发实习生',
    details_en: [
      'Development of CRUD tools for review management and client email tracking.',
      'Participation in team meetings to discuss requirements and technical solutions.',
      'Writing technical documentation for developed features.',
    ],
    details_de: [
      'Entwicklung von CRUD-Tools für die Bewertungsverwaltung und Kunden-E-Mail-Tracking.',
      'Teilnahme an Teambesprechungen zu Anforderungen und technischen Lösungen.',
      'Erstellung technischer Dokumentation für entwickelte Funktionen.',
    ],
    details_zh: [
      '开发用于评价管理和客户邮件跟踪的CRUD工具。',
      '参与团队会议讨论需求和技术方案。',
      '为开发的功能撰写技术文档。',
    ],
  },
  {
    poste: 'Professeur Documentaliste',
    poste_en: 'Teacher-Librarian',
    poste_de: 'Schulbibliothekar / Dokumentationslehrer',
    poste_zh: '图书馆教师',
    details_en: [
      'Management and organisation of documentary resources.',
      'Training students in research skills and digital tools.',
      'Participation in educational and cultural projects.',
    ],
    details_de: [
      'Verwaltung und Organisation von Dokumentationsressourcen.',
      'Schulung der Schüler in Recherchetechniken und digitalen Werkzeugen.',
      'Mitwirkung an pädagogischen und kulturellen Projekten.',
    ],
    details_zh: [
      '管理和组织文献资源。',
      '培训学生文献检索和数字工具使用能力。',
      '参与教育和文化项目。',
    ],
  },
  {
    poste: 'Professeur Documentaliste stagiaire',
    poste_en: 'Trainee Teacher-Librarian',
    poste_de: 'Schulbibliothekar im Praktikum',
    poste_zh: '图书馆教师实习生',
    details_en: [
      'Placements in secondary schools.',
      'Master student representative.',
      'Participation in documentary resource digitisation projects.',
    ],
    details_de: [
      'Praktika an weiterführenden Schulen.',
      'Studentenvertreter im Master.',
      'Mitwirkung an Digitalisierungsprojekten für Dokumentationsressourcen.',
    ],
    details_zh: [
      '在中学进行实习。',
      '硕士生代表。',
      '参与文献资源数字化项目。',
    ],
  },
  {
    poste: 'Professeur de FLE',
    poste_en: 'French as a Foreign Language Teacher',
    poste_de: 'Französischlehrer (Fremdsprache)',
    poste_zh: '法语外语教师',
    details_en: [
      'Teaching French as a foreign language to international students.',
      'Organisation of cultural activities to promote French language and culture.',
    ],
    details_de: [
      'Unterricht in Französisch als Fremdsprache für internationale Studierende.',
      'Organisation kultureller Aktivitäten zur Förderung der französischen Sprache und Kultur.',
    ],
    details_zh: [
      '向国际学生教授法语。',
      '组织文化活动推广法语语言和文化。',
    ],
  },
  {
    poste: "Professeur d'Allemand",
    poste_en: 'German Language Teacher',
    poste_de: 'Deutschlehrer',
    poste_zh: '德语教师',
    details_en: [
      'Private tutoring and school placements.',
      'Creation of teaching materials adapted to different levels.',
    ],
    details_de: [
      'Nachhilfe und Schulpraktika.',
      'Erstellung von Lehrmaterialien für verschiedene Niveaus.',
    ],
    details_zh: [
      '家教和学校实习。',
      '制作适合不同水平的教学材料。',
    ],
  },
  {
    poste: 'Ambassadeur Medion / Animateur de vente informatique',
    poste_en: 'Medion Brand Ambassador / IT Sales Promoter',
    poste_de: 'Medion-Markenbotschafter / IT-Verkaufsanimateur',
    poste_zh: 'Medion品牌大使 / IT销售推广员',
    details_en: [
      'Selected by Atout Job Service for a specialist sales mission.',
      'Trained by an Intel engineer (Core i3/i5/i7 – 1st generation).',
      '8 sales completed in 3 days including 2 MEDION desktop units.',
      'Customer advice based on usage and budget (non-aggressive approach).',
      'SWOT reporting to Adhesia.',
    ],
    details_de: [
      'Ausgewählt von Atout Job Service für eine Fachverkaufsmission.',
      'Schulung durch einen Intel-Ingenieur (Core i3/i5/i7 – 1. Generation).',
      '8 Verkäufe in 3 Tagen, darunter 2 MEDION-Desktop-Einheiten.',
      'Kundenberatung nach Nutzung und Budget (nicht-aggressiver Ansatz).',
      'SWOT-Berichterstattung an Adhesia.',
    ],
    details_zh: [
      '由Atout Job Service选派执行专项销售任务。',
      '接受英特尔工程师培训（Core i3/i5/i7 – 第一代）。',
      '3天内完成8笔销售，包括2台MEDION台式机。',
      '根据使用需求和预算为客户提供建议（非强迫式销售）。',
      '向Adhesia提交SWOT报告。',
    ],
  },
  {
    poste: 'Responsable en Associations',
    poste_en: 'Association Manager',
    poste_de: 'Vereinsverantwortlicher',
    poste_zh: '社团负责人',
    details_en: [
      'Music album, media productions (GEM) — 2015–2021.',
      'PSC1, BEPS, IRR (Red Cross) — 2012.',
      'Web/comms manager, radio host, stage assistant (ENS de Lyon) — 2009–2010.',
      'Web/IS/comms manager, sales, survey officer (NEOMA) — 2008–2009.',
      'President of CPGE student union (Lycée Masséna) — 2007–2008.',
    ],
    details_de: [
      'Musikalbum, Medienproduktionen (GEM) — 2015–2021.',
      'PSC1, BEPS, IRR (Rotes Kreuz) — 2012.',
      'Web-/Kommunikationsverantwortlicher, Radiomoderator, Regieassistent (ENS de Lyon) — 2009–2010.',
      'Web-/IS-/Kommunikationsverantwortlicher, Vertrieb, Umfragebeauftragter (NEOMA) — 2008–2009.',
      'Präsident des Studentenverbands der CPGE (Lycée Masséna) — 2007–2008.',
    ],
    details_zh: [
      '音乐专辑、媒体制作（GEM）— 2015–2021。',
      'PSC1、BEPS、IRR（红十字会）— 2012。',
      '网络/传播负责人、电台主持、舞台助理（里昂高师）— 2009–2010。',
      '网络/IS/传播负责人、销售、调查员（NEOMA）— 2008–2009。',
      'CPGE学生会主席（Masséna高中）— 2007–2008。',
    ],
  },
];

// ── PROJECTS ─────────────────────────────────────────────────────────────────
const projectTranslations = [
  {
    name: 'Portfolio Silent System',
    description_en: 'Personal portfolio 2026 — immersive cyber/abyss design',
    description_de: 'Persönliches Portfolio 2026 — immersives Cyber/Abyss-Design',
    description_zh: '2026个人作品集 — 沉浸式网络/深渊设计',
    context_en: 'Full refactoring of my React/Vite portfolio to Next.js 16 + TypeScript. 3 thematic pages, Silent System design system, i18n in 4 languages.',
    context_de: 'Vollständige Überarbeitung meines React/Vite-Portfolios auf Next.js 16 + TypeScript. 3 thematische Seiten, Design-System „Silent System", i18n in 4 Sprachen.',
    context_zh: '将React/Vite作品集完全重构为Next.js 16 + TypeScript。3个主题页面，"Silent System"设计系统，4语言国际化。',
    learnings_en: ['Custom Design System', 'SSR/SSG', 'i18n 4 languages', 'Responsive', 'ISTQB-driven QA'],
    learnings_de: ['Eigenes Design-System', 'SSR/SSG', 'i18n 4 Sprachen', 'Responsiv', 'ISTQB-gesteuertes QA'],
    learnings_zh: ['自定义设计系统', 'SSR/SSG', '4语言国际化', '响应式', 'ISTQB驱动的QA'],
  },
  {
    name: 'Prof Norton',
    description_en: 'Serious game for fake news awareness',
    description_de: 'Serious Game zur Sensibilisierung für Fake News',
    description_zh: '假新闻意识教育游戏',
    context_en: 'Interactive serious game (Python) and dedicated website for fake news analysis and digital hygiene awareness. HTML/CSS/Bootstrap/JS/JSON/PayPal SDK/Formspree/Google Analytics.',
    context_de: 'Interaktives Serious Game (Python) und dedizierte Website zur Sensibilisierung für Fake-News-Analyse und digitale Hygiene. HTML/CSS/Bootstrap/JS/JSON/PayPal SDK/Formspree/Google Analytics.',
    context_zh: '交互式严肃游戏（Python）和专属网站，用于假新闻分析和数字卫生意识教育。HTML/CSS/Bootstrap/JS/JSON/PayPal SDK/Formspree/Google Analytics。',
    learnings_en: ['Co-founder & creator', 'Serious game', 'Fake news & manipulation awareness', 'Digital hygiene'],
    learnings_de: ['Mitgründer & Schöpfer', 'Serious Game', 'Sensibilisierung für Fake News & Manipulation', 'Digitale Hygiene'],
    learnings_zh: ['联合创始人', '严肃游戏', '假新闻与操纵意识', '数字卫生'],
  },
  {
    name: 'DWWM ReviZ',
    description_en: 'Revision app for the DWWM professional certification',
    description_de: 'Lern-App für die DWWM-Berufsqualifikation',
    description_zh: 'DWWM职业认证复习应用',
    context_en: 'Web application for revising the DWWM Professional Title certification. Interactive quizzes, revision sheets, progress tracking.',
    context_de: 'Webanwendung zur Vorbereitung auf den Berufstitel DWWM. Interaktive Quiz, Lernkarten, Fortschrittsverfolgung.',
    context_zh: '用于备考DWWM职业资格认证的网页应用。互动测验、复习卡片、进度跟踪。',
    learnings_en: ['Educational engineering', 'Learning-oriented UX', 'Deployed in production'],
    learnings_de: ['Bildungstechnik', 'Lernorientierte UX', 'In Produktion eingesetzt'],
    learnings_zh: ['教育工程', '以学习为导向的UX', '已部署上线'],
  },
  {
    name: 'AgilFlow.app',
    description_en: 'User story management application',
    description_de: 'User-Story-Verwaltungsanwendung',
    description_zh: '用户故事管理应用',
    context_en: 'Web application for managing user stories in an agile environment: creation, prioritisation, sprint tracking, Kanban board.',
    context_de: 'Webanwendung zur Verwaltung von User Stories in einer agilen Umgebung: Erstellung, Priorisierung, Sprint-Tracking, Kanban-Board.',
    context_zh: '敏捷环境下的用户故事管理网页应用：创建、优先级排序、Sprint跟踪、看板。',
    learnings_en: ['MVC architecture', 'Dynamic Kanban', 'Agile environment'],
    learnings_de: ['MVC-Architektur', 'Dynamisches Kanban', 'Agile Umgebung'],
    learnings_zh: ['MVC架构', '动态看板', '敏捷环境'],
  },
  {
    name: 'Instant-Media.fr',
    description_en: 'CRUD tools — review management and client tracking',
    description_de: 'CRUD-Tools — Bewertungsverwaltung und Kunden-Tracking',
    description_zh: 'CRUD工具 — 评价管理与客户跟踪',
    context_en: 'Internship at Instant Media: development of CRUD tools for client review management and email tracking.',
    context_de: 'Praktikum bei Instant Media: Entwicklung von CRUD-Tools für die Kundenbewertungsverwaltung und E-Mail-Tracking.',
    context_zh: '在Instant Media实习期间开发用于客户评价管理和邮件跟踪的CRUD工具。',
    learnings_en: ['Admin interface', 'Dynamic filters', 'Technical documentation'],
    learnings_de: ['Admin-Oberfläche', 'Dynamische Filter', 'Technische Dokumentation'],
    learnings_zh: ['管理界面', '动态过滤器', '技术文档'],
  },
  {
    name: 'Zer0Wipe',
    description_en: 'Desktop application for secure data erasure',
    description_de: 'Desktop-Anwendung zur sicheren Datenlöschung',
    description_zh: '安全数据擦除桌面应用',
    context_en: 'Python desktop application for secure erasure of sensitive data according to DoD 5220.22-M standards.',
    context_de: 'Python-Desktop-Anwendung zur sicheren Löschung sensibler Daten nach DoD-5220.22-M-Standard.',
    context_zh: '基于Python的桌面应用，按照DoD 5220.22-M标准安全擦除敏感数据。',
    learnings_en: ['Data security', 'DoD standard', 'CLI + GUI'],
    learnings_de: ['Datensicherheit', 'DoD-Standard', 'CLI + GUI'],
    learnings_zh: ['数据安全', 'DoD标准', 'CLI + GUI'],
  },
  {
    name: 'TaxiLaurieBouclier.wordpress.com',
    description_en: 'Showcase website + SEO optimisation',
    description_de: 'Präsentationswebsite + SEO-Optimierung',
    description_zh: '展示网站 + SEO优化',
    context_en: 'Development of the showcase website with WordPress, full SEO optimisation, documentation and tutorials for the client.',
    context_de: 'Entwicklung der Präsentationswebsite mit WordPress, vollständige SEO-Optimierung, Dokumentation und Tutorials für die Kundin.',
    context_zh: '使用WordPress开发展示网站，全面SEO优化，为客户提供文档和教程。',
    learnings_en: ['Local SEO', 'Client training', 'Technical documentation'],
    learnings_de: ['Lokales SEO', 'Kundenschulung', 'Technische Dokumentation'],
    learnings_zh: ['本地SEO', '客户培训', '技术文档'],
  },
];

// ── HOBBIES ──────────────────────────────────────────────────────────────────
const hobbyTranslations = [
  {
    name: 'Arts',
    name_en: 'Arts',
    name_de: 'Kunst',
    name_zh: '艺术',
    description_en: 'Music, Photography, Short films, Theatre',
    description_de: 'Musik, Fotografie, Kurzfilme, Theater',
    description_zh: '音乐、摄影、短片、戏剧',
  },
  {
    name: 'Associatif',
    name_en: 'Community',
    name_de: 'Vereinsleben',
    name_zh: '社团活动',
    description_en: 'Sino-French rock band',
    description_de: 'Chinesisch-französische Rockband',
    description_zh: '中法摇滚乐队',
  },
  {
    name: 'Culture',
    name_en: 'Culture',
    name_de: 'Kultur',
    name_zh: '文化',
    description_en: 'Reading, conferences, travel',
    description_de: 'Lesen, Konferenzen, Reisen',
    description_zh: '阅读、讲座、旅行',
  },
  {
    name: 'Sport',
    name_en: 'Sport',
    name_de: 'Sport',
    name_zh: '运动',
    description_en: 'Swimming, skiing (competition)',
    description_de: 'Schwimmen, Skifahren (Wettkampf)',
    description_zh: '游泳、滑雪（竞技）',
  },
  {
    name: 'Formations',
    name_en: 'Training',
    name_de: 'Weiterbildung',
    name_zh: '培训',
    description_en: 'Stage management/PEMP (ENS de Lyon), MOOCs, PAF',
    description_de: 'Bühnentechnik/PEMP (ENS de Lyon), MOOCs, PAF',
    description_zh: '舞台管理/PEMP（里昂高师）、MOOCs、PAF',
  },
];

async function main() {
  // Experiences
  for (const t of experienceTranslations) {
    const where = t.entreprise
      ? { poste: t.poste, entreprise: t.entreprise }
      : { poste: t.poste };
    const records = await prisma.experience.findMany({ where });
    for (const r of records) {
      await prisma.experience.update({
        where: { id: r.id },
        data: {
          poste_en: t.poste_en,
          poste_de: t.poste_de,
          poste_zh: t.poste_zh,
          details_en: t.details_en,
          details_de: t.details_de,
          details_zh: t.details_zh,
        },
      });
    }
    console.log(`✓ Experience: ${t.poste}`);
  }

  // Projects
  for (const t of projectTranslations) {
    await prisma.project.updateMany({
      where: { name: t.name },
      data: {
        description_en: t.description_en,
        description_de: t.description_de,
        description_zh: t.description_zh,
        context_en: t.context_en,
        context_de: t.context_de,
        context_zh: t.context_zh,
        learnings_en: t.learnings_en,
        learnings_de: t.learnings_de,
        learnings_zh: t.learnings_zh,
      },
    });
    console.log(`✓ Project: ${t.name}`);
  }

  // Hobbies
  for (const t of hobbyTranslations) {
    await prisma.hobby.updateMany({
      where: { name: t.name },
      data: {
        name_en: t.name_en,
        name_de: t.name_de,
        name_zh: t.name_zh,
        description_en: t.description_en,
        description_de: t.description_de,
        description_zh: t.description_zh,
      },
    });
    console.log(`✓ Hobby: ${t.name}`);
  }

  console.log('\n✅ Toutes les traductions seedées.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
