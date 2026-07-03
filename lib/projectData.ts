export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  month: string;
  year: string;
  url?: string;
  githubUrl?: string; // Added for 'Projects' category
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  social: { platform: string; url: string }[];
  skills: string[];
  initials: string;
}

export const projects: Project[] = [

  // ── Websites ──
  {
    id: '001',
    title: 'Galactic 3D',
    subtitle: 'Industrial additive manufacturing',
    category: 'Websites',
    description: 'ISO-certified additive manufacturing firm needed a site that matched the precision of their parts. Hero video, service breakdowns, and a quote flow built to convert industrial buyers.',
    image: '/work/001-galactic-3d.jpg',
    month: 'January',
    year: '2025',
    url: 'https://www.galactic-3d.com',
  },
  {
    id: '002',
    title: 'TeraaWatt',
    subtitle: 'EV & clean energy ecosystem',
    category: 'Websites',
    description: 'Brand site for the TeraaWatt product ecosystem: TeraaCharge, TeraaMart, TeraaCycle. Canvas animations, neon wireframe aesthetics, investor-ready pitch layout.',
    image: '/work/002-teraawatt.jpg',
    month: 'March',
    year: '2025',
    url: 'https://www.teraawatt.com',
  },
  {
    id: '003',
    title: 'TechEdumatic Solutions',
    subtitle: 'Ed-tech corporate site',
    category: 'Websites',
    description: 'Corporate site for a technology education company. Service breakdowns, course listings, client trust signals, and a lead capture flow designed to convert institutional buyers.',
    image: '/work/003-techedumatic.jpg',
    month: 'January',
    year: '2025',
    url: 'https://www.techedumaticsolutions.com',
  },
  {
    id: '004',
    title: 'Cambrian Skills DA',
    subtitle: 'Data intelligence platform',
    category: 'Websites',
    description: 'Skills platform with real-time workforce analytics, course listings, instructor profiles, and a clean onboarding funnel aimed at working professionals.',
    image: '/work/004-cambrian-skills.jpg',
    month: 'February',
    year: '2025',
    url: 'https://cambrian-skills-da.vercel.app',
  },
  {
    id: '005',
    title: 'Dronza',
    subtitle: 'Drone services startup',
    category: 'Websites',
    description: 'Launch site for a drone-tech startup. Service tier cards, aerial footage integrations, and a bold full-viewport hero built to generate early traction.',
    image: '/work/005-dronza.jpg',
    month: 'March',
    year: '2025',
    url: 'https://dronza-wvmk.vercel.app',
  },
  {
    id: '006',
    title: 'Sky2Earth',
    subtitle: 'Aerial solutions brand',
    category: 'Websites',
    description: 'Brand and service site for an aerial photography and drone solutions company. Full-screen reel, portfolio gallery, pricing tiers, and booking inquiry flow.',
    image: '/work/006-sky2earth.jpg',
    month: 'February',
    year: '2025',
    url: 'https://sky2earth.in',
  },
  {
    id: '007',
    title: 'MLSA_CIT',
    subtitle: 'Microsoft tech club hub',
    category: 'Websites',
    description: 'Community site for a Microsoft Learn Student Ambassador chapter. Event announcements, member profiles, project showcases, and a campus resource library.',
    image: '/work/007-mlsac-it.jpg',
    month: 'January',
    year: '2025',
    url: 'https://mlsacit-weld.vercel.app',
  },
  {
    id: '008',
    title: 'Cambrian Open House',
    subtitle: 'Student exhibition & demo day',
    category: 'Websites',
    description: 'Event site for a student project exhibition. Project submissions, team profiles, jury panel display, and a live voting mechanic to spotlight builders on demo day.',
    image: '/work/008-openhouse.jpg',
    month: 'February',
    year: '2025',
    url: 'https://openhouse-delta.vercel.app',
  },
  {
    id: '009',
    title: 'RGB Design',
    subtitle: 'Breaking the color grid',
    category: 'Websites',
    description: 'A systematic deconstruction of color theory. Generative palettes, dynamic contrast systems and a visual language that breaks the rules to make new ones.',
    image: '/work/009-rgb-design.jpg',
    month: 'January',
    year: '2025',
    url: 'https://www.rgbdesign.in',
  },

  {
    id: '010',
    title: 'JOSEPHITERUN',
    subtitle: 'Marathon & community run platform',
    category: 'Websites',
    description: 'Event site for a community running event. Registration flow, route maps, live tracking, photo gallery, and sponsor showcase built for runners and organizers.',
    image: '/work/010-josephiterun.jpg',
    month: 'March',
    year: '2025',
    url: 'https://josephiterun.in',
  },
  {
    id: '011',
    title: 'TEDxCITBengaluru',
    subtitle: 'Ideas worth spreading',
    category: 'Websites',
    description: 'Complete event site for ARC 07. Countdown timer, speaker grid, 3D badge preview, UPI-verified seat booking, and automated QR confirmation emails.',
    image: '/work/011-tedxcit.jpg',
    month: 'February',
    year: '2025',
    url: 'https://www.tedxcitbengaluru.in',
  },

  // ── Projects ──
  {
    id: '012',
    title: 'RepoGami',
    subtitle: 'Codebase visualization tool',
    category: 'Projects',
    description: 'OSS dev tool that folds any GitHub repo into an interactive visual map. Dependency graphs, file-tree origami, and contributor heatmaps for developers who think in systems.',
    image: '/repogami.png',
    month: 'March',
    year: '2025',
    url: 'https://repogami.vercel.app',
  },

  // ── Designs/Mockups ──
  {
    id: '013',
    title: 'ALA',
    subtitle: 'Idea to sketch, 5-page flow',
    category: 'Designs',
    description: 'A complete design flow from concept to refined sketch. Five pages capturing the evolution of an idea through wireframes, iterations, and final mockups.',
    image: '/work/designs/ala/1.png',
    images: [
      '/work/designs/ala/2.png',
      '/work/designs/ala/3.png',
      '/work/designs/ala/4.png',
      '/work/designs/ala/5.png',
    ],
    month: 'April',
    year: '2025',
  },
  {
    id: '014',
    title: 'Capture 360',
    subtitle: 'Brand identity & visual system',
    category: 'Designs',
    description: '360-degree brand identity system with cohesive visual language across digital and print touchpoints.',
    image: '/work/designs/Capture360.jpg',
    month: 'April',
    year: '2025',
  },
  {
    id: '015',
    title: 'Q Series',
    subtitle: 'Typography & form exploration',
    category: 'Designs',
    description: 'An experimental typographic study exploring form, rhythm, and negative space through the letter Q.',
    image: '/work/designs/qqqqqqqqqqqqqqqq.jpg',
    month: 'April',
    year: '2025',
  },
  {
    id: '016',
    title: 'Open House',
    subtitle: 'Event poster & collateral',
    category: 'Designs',
    description: 'Poster series and event collateral for a student project exhibition. Bold typography, dynamic layouts, and a cohesive visual identity.',
    image: '/work/designs/Openhouse.jpg',
    month: 'March',
    year: '2025',
  },
  {
    id: '017',
    title: 'Group 101',
    subtitle: 'Community brand system',
    category: 'Designs',
    description: 'Complete brand identity for a creative community group. Logo, color system, typography, and application guidelines.',
    image: '/work/designs/Group 101.jpg',
    month: 'April',
    year: '2025',
  },
  {
    id: '018',
    title: 'GDG',
    subtitle: 'Google Developer Groups brand',
    category: 'Designs',
    description: 'Event branding and marketing materials for Google Developer Groups meetups and hackathons.',
    image: '/work/designs/GDG.png',
    month: 'March',
    year: '2025',
  },
  {
    id: '019',
    title: '3D View',
    subtitle: 'Architectural visualization',
    category: 'Designs',
    description: '3D architectural visualization and site renderings showcasing spatial design and environmental context.',
    image: '/work/designs/3D View of the Site.jpg',
    month: 'April',
    year: '2025',
  },
  {
    id: '020',
    title: '3×6 Golden',
    subtitle: 'Grid system & composition',
    category: 'Designs',
    description: 'A study in modular grid systems and golden ratio compositions. Explores structure, balance, and proportion across a 3×6 framework.',
    image: '/work/designs/3x6, Golden.jpg',
    month: 'April',
    year: '2025',
  },

  // ── Thumbnails ──
  {
    id: '021',
    title: '',
    subtitle: '',
    category: 'Thumbnails',
    description: '',
    image: 'https://img.youtube.com/vi/z-e4S3C155w/maxresdefault.jpg',
    month: '',
    year: '',
    url: 'https://youtu.be/z-e4S3C155w',
  },
  {
    id: '022',
    title: '',
    subtitle: '',
    category: 'Thumbnails',
    description: '',
    image: 'https://img.youtube.com/vi/-UORHKxp_xA/maxresdefault.jpg',
    month: '',
    year: '',
    url: 'https://youtu.be/-UORHKxp_xA',
  },
  {
    id: '023',
    title: '',
    subtitle: '',
    category: 'Thumbnails',
    description: '',
    image: 'https://img.youtube.com/vi/VUlADlxWiZo/maxresdefault.jpg',
    month: '',
    year: '',
    url: 'https://youtu.be/VUlADlxWiZo',
  },
];

export const siteConfig = {
  email: 'hello@rockspace.io',
  location: 'Bengaluru, India',
};

export const workStats = [
  { value: '20+', label: 'Launches' },
  { value: '6+', label: 'Industries' },
  { value: '3', label: 'Disciplines in-house' },
];

export const featuredProjectIds = ['001', '011', '002', '012'];

export const teamMembers: TeamMember[] = [
  {
    name: 'Debasis',
    role: 'Founder',
    bio: 'Debasis is the creative force behind RockSpace. Designer, storyteller, brand builder. He shapes brands that feel inevitable. You don\'t just see his work. You feel it.',
    social: [
      { platform: 'Instagram', url: '#' },
      { platform: 'LinkedIn', url: '#' },
    ],
    skills: ['Brand Identity', 'Visual Systems', 'Motion Direction', 'Design Strategy', 'Typography', 'Art Direction'],
    initials: 'DM',
  },
  {
    name: 'Jayaditya',
    role: 'Co-founder',
    bio: 'Jayaditya architects the web layer. He turns design into living interfaces. Pixel-perfect. Performant. Buttery smooth. If it ships to a browser, it goes through his hands.',
    social: [
      { platform: 'GitHub', url: '#' },
      { platform: 'LinkedIn', url: '#' },
    ],
    skills: ['React/Next.js', 'WebGL', 'TypeScript', 'CSS Architecture', 'Performance', 'Motion Engineering'],
    initials: 'GJ',
  },
  {
    name: 'Dilip',
    role: 'Polymath',
    bio: 'Dilip builds the engines that make RockSpace run. AI agents. Automated workflows. Data pipelines. When you see efficiency that feels like magic, that\'s Dilip.',
    social: [
      { platform: 'GitHub', url: '#' },
      { platform: 'LinkedIn', url: '#' },
    ],
    skills: ['AI Agents', 'Workflow Automation', 'Data Engineering', 'Systems Design', 'API Architecture', 'Growth Infrastructure'],
    initials: 'DP',
  },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/rockspace.in/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rkspace/posts/?feedView=all' },
];

export const aboutStats = [
  { value: '20+', label: 'Projects shipped' },
  { value: '3', label: 'Core team' },
  { value: '15+', label: 'Years combined' },
  { value: '6+', label: 'Industries' },
];

export const aboutPillars = [
  {
    title: 'Design is strategy',
    desc: 'Every color, grid, and motion serves the problem. If it doesn\'t convert or clarify, it doesn\'t ship.',
    detail: 'We start with intent, not inspiration. Every visual decision ties back to a business outcome. We don\'t decorate, we communicate. The result is work that feels inevitable, not arbitrary.',
    tag: 'Identity' as const,
  },
  {
    title: 'Code that scales',
    desc: 'Components before pages. Performance is a feature. We architect systems, not one-off screens.',
    detail: 'We build with the next project in mind. Every component is reusable, every pattern documented, every performance budget respected. Our codebases age well because we plan for growth from line one.',
    tag: 'Engineering' as const,
  },
  {
    title: 'Automation as instinct',
    desc: 'AI agents, pipelines, smart workflows. We build the machines that multiply your team\'s output.',
    detail: 'While others hire more hands, we build better systems. From automated deployment pipelines to AI-powered content workflows, we engineer leverage into everything we touch. Less busy work, more impact.',
    tag: 'Systems' as const,
  },
  {
    title: 'Motion that matters',
    desc: 'Animation guides attention and builds trust. We use motion with purpose, never as decoration.',
    detail: 'Every transition, hover state, and micro-interaction serves a purpose. Motion guides the eye, provides feedback, and makes interfaces feel alive. We obsess over the 200ms between states because that\'s where delight lives.',
    tag: 'Motion' as const,
  },
];

export const teamPhotos = ['/debasispfp.png', '/jayadityapfp.png', '/dilippfp.png'];

export const footerServices = [
  'Brand & Identity',
  'Web & Product',
  'AI & Systems',
  'Motion & 3D',
  'Strategy',
  'Pitch & Narrative',
];
