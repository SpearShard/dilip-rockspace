export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  month: string;
  year: string;
  url?: string;
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
    image: 'https://api.microlink.io?url=https%3A%2F%2Fwww.galactic-3d.com&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'January',
    year: '2025',
    url: 'https://www.galactic-3d.com',
  },
  {
    id: '002',
    title: 'TEDxCITBengaluru',
    subtitle: 'Event platform & ticketing',
    category: 'Websites',
    description: 'Complete event site for ARC 07. Countdown timer, speaker grid, 3D badge preview, UPI-verified seat booking, and automated QR confirmation emails.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Ftedxcitbengaluru.in&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'February',
    year: '2025',
    url: 'https://tedxcitbengaluru.in',
  },
  {
    id: '003',
    title: 'TeraaWatt',
    subtitle: 'EV & clean energy ecosystem',
    category: 'Websites',
    description: 'Brand site for the TeraaWatt product ecosystem — TeraaCharge, TeraaMart, TeraaCycle. Canvas animations, neon wireframe aesthetics, investor-ready pitch layout.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Fwww.teraawatt.com&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'March',
    year: '2025',
    url: 'https://www.teraawatt.com',
  },
  {
    id: '004',
    title: 'TechEdumatic Solutions',
    subtitle: 'Ed-tech corporate site',
    category: 'Websites',
    description: 'Corporate site for a technology education company. Service breakdowns, course listings, client trust signals, and a lead capture flow designed to convert institutional buyers.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Fwww.techedumaticsolutions.com&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'January',
    year: '2025',
    url: 'https://www.techedumaticsolutions.com',
  },
  {
    id: '005',
    title: 'Cambrian Skills DA',
    subtitle: 'Data intelligence platform',
    category: 'Websites',
    description: 'Skills platform with real-time workforce analytics, course listings, instructor profiles, and a clean onboarding funnel aimed at working professionals.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Fcambrian-skills-da.vercel.app&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'February',
    year: '2025',
    url: 'https://cambrian-skills-da.vercel.app',
  },
  {
    id: '006',
    title: 'Dronza',
    subtitle: 'Drone services startup',
    category: 'Websites',
    description: 'Launch site for a drone-tech startup. Service tier cards, aerial footage integrations, and a bold full-viewport hero built to generate early traction.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Fdronza-wvmk.vercel.app&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'March',
    year: '2025',
    url: 'https://dronza-wvmk.vercel.app',
  },
  {
    id: '007',
    title: 'Software Quality Assurance',
    subtitle: 'QA consulting website',
    category: 'Websites',
    description: 'Professional site for a QA consultancy. Service breakdowns, methodology explainers, client case studies, and a structured lead generation flow.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Fsoftwarequalityassurance.vercel.app&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'January',
    year: '2025',
    url: 'https://softwarequalityassurance.vercel.app',
  },
  {
    id: '008',
    title: 'Sky2Earth',
    subtitle: 'Aerial solutions brand',
    category: 'Websites',
    description: 'Brand and service site for an aerial photography and drone solutions company. Full-screen reel, portfolio gallery, pricing tiers, and booking inquiry flow.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Fsky2earth.in&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'February',
    year: '2025',
    url: 'https://sky2earth.in',
  },
  {
    id: '009',
    title: 'Bengaluru Comic Con 2025',
    subtitle: 'Fan event platform',
    category: 'Websites',
    description: 'Event site for Bengaluru\'s pop-culture convention. Schedule builder, exhibitor map, cosplay registration, and a merch showcase built for high-energy fan traffic.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Fbengalurucomicon2025.vercel.app&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'March',
    year: '2025',
    url: 'https://bengalurucomicon2025.vercel.app',
  },
  {
    id: '010',
    title: 'MLSAC-IT',
    subtitle: 'Microsoft tech club hub',
    category: 'Websites',
    description: 'Community site for a Microsoft Learn Student Ambassador chapter. Event announcements, member profiles, project showcases, and a campus resource library.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Fmlsacit-weld.vercel.app&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'January',
    year: '2025',
    url: 'https://mlsacit-weld.vercel.app',
  },
  {
    id: '011',
    title: 'OpenHouse',
    subtitle: 'Student exhibition & demo day',
    category: 'Websites',
    description: 'Event site for a student project exhibition. Project submissions, team profiles, jury panel display, and a live voting mechanic to spotlight builders on demo day.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Fopenhouse-delta.vercel.app&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'February',
    year: '2025',
    url: 'https://openhouse-delta.vercel.app',
  },

  // ── Designs ──
  {
    id: '012',
    title: 'RGB Design',
    subtitle: 'Breaking the color grid',
    category: 'Designs',
    description: 'A systematic deconstruction of color theory. Generative palettes, dynamic contrast systems and a visual language that breaks the rules to make new ones.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Fwww.rgbdesign.in&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'January',
    year: '2025',
    url: 'https://www.rgbdesign.in',
  },
  {
    id: '013',
    title: 'RepoGami',
    subtitle: 'Codebase visualization tool',
    category: 'Designs',
    description: 'OSS dev tool that folds any GitHub repo into an interactive visual map. Dependency graphs, file-tree origami, and contributor heatmaps — for developers who think in systems.',
    image: 'https://api.microlink.io?url=https%3A%2F%2Frepogami.vercel.app&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000',
    month: 'March',
    year: '2025',
    url: 'https://repogami.vercel.app',
  },
  {
    id: '014',
    title: 'Moodboard Series',
    subtitle: 'Visual tone exploration',
    category: 'Designs',
    description: 'A curated series of moodboards exploring texture, colour and composition. Each board captures a distinct emotional tone for brand direction.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format',
    month: 'February',
    year: '2025',
  },
  {
    id: '015',
    title: 'Poster Studies',
    subtitle: 'Typography & composition',
    category: 'Designs',
    description: 'Experimental poster series exploring grid systems, type hierarchies and visual tension. Each poster is a standalone composition study.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1200&auto=format',
    month: 'March',
    year: '2025',
  },
  {
    id: '016',
    title: 'Brand Identity System',
    subtitle: 'Complete visual language',
    category: 'Designs',
    description: 'From logo to stationery to digital — a comprehensive brand identity for a fintech startup. Cohesive across every touchpoint.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format',
    month: 'January',
    year: '2025',
  },

  // ── Editing ──
  {
    id: '017',
    title: 'Product Launch Reel',
    subtitle: '60-second brand film',
    category: 'Editing',
    description: 'A high-energy product launch video with dynamic cuts, kinetic typography and a pulse-synced soundtrack. Shot-to-story in 48 hours.',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format',
    month: 'February',
    year: '2025',
  },
  {
    id: '018',
    title: 'Behind the Scenes',
    subtitle: 'Studio culture edit',
    category: 'Editing',
    description: 'A raw, candid edit capturing the energy of a studio photoshoot. Natural light, real moments, no script.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format',
    month: 'March',
    year: '2025',
  },
  {
    id: '019',
    title: 'Event Highlight Reel',
    subtitle: 'Conference coverage',
    category: 'Editing',
    description: 'Fast-paced recap of a 2-day design conference. Multi-camera edit, interview snippets, motion graphics overlays.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format',
    month: 'January',
    year: '2025',
  },

  // ── PPT ──
  {
    id: '020',
    title: 'Startup Pitch Deck',
    subtitle: 'Investor-ready presentation',
    category: 'PPT',
    description: 'A clean, narrative-driven deck that helped a seed-stage startup raise $2M. Data storytelling through custom charts and visual metaphors.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format',
    month: 'February',
    year: '2025',
  },
  {
    id: '021',
    title: 'Brand Guidelines Deck',
    subtitle: 'Internal brand education',
    category: 'PPT',
    description: 'A living brand guidelines deck that walks teams through tone, typography, colour and application. Designed for clarity and adoption.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format',
    month: 'March',
    year: '2025',
  },
  {
    id: '022',
    title: 'Annual Report Deck',
    subtitle: 'Year-in-review presentation',
    category: 'PPT',
    description: 'A visually rich annual report presentation. Infographics, pull-quotes and a narrative arc that turns numbers into a story.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format',
    month: 'January',
    year: '2025',
  },

  // ── Thumbnails ──
  {
    id: '023',
    title: 'YouTube Thumbnail Pack',
    subtitle: 'Click-optimised designs',
    category: 'Thumbnails',
    description: 'A set of high-contrast, curiosity-driven thumbnails for a tech channel. Average CTR improvement of 34% over previous style.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format',
    month: 'February',
    year: '2025',
  },
  {
    id: '024',
    title: 'Gaming Thumbnails',
    subtitle: 'Esports tournament series',
    category: 'Thumbnails',
    description: 'Dynamic, action-packed thumbnails for a Valorant tournament series. Consistent branding across 12 match cards.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format',
    month: 'March',
    year: '2025',
  },
  {
    id: '025',
    title: 'Podcast Cover Set',
    subtitle: 'Season 2 rebrand',
    category: 'Thumbnails',
    description: 'Illustrated podcast thumbnails for a 10-episode season. Each episode gets a unique visual while maintaining series cohesion.',
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1200&auto=format',
    month: 'January',
    year: '2025',
  },
];

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