export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  month: string;
  year: string;
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
  {
    id: '001',
    title: 'RGB Design',
    subtitle: 'Breaking the color grid',
    category: 'BRAND',
    description: 'Phase 01 of a systematic deconstruction of color theory — generative palettes, dynamic contrast systems, and a visual language that rewrites the rules.',
    image: 'https://ik.imagekit.io/yv4cjaya8/assets/RGB.png',
    month: 'January',
    year: '2025',
  },
  {
    id: '002',
    title: 'Generative Color',
    subtitle: 'Living design system',
    category: 'MOTION',
    description: 'A generative color system that creates dynamic brand palettes from audio input. A living tool for creative teams.',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200&auto=format',
    month: 'January',
    year: '2025',
  },
  {
    id: '003',
    title: 'Fluid UI V1',
    subtitle: 'Physics-based motion',
    category: 'MOTION',
    description: 'Physics-based transitions, gesture-driven interactions, and a component animation library for product teams shipping at scale.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format',
    month: 'January',
    year: '2025',
  },
  {
    id: '004',
    title: "L'Oréal Experience",
    subtitle: 'Tactile digitalism',
    category: '3D',
    description: 'Immersive brand experience merging tactile interfaces with WebGL product visualization for beauty retail — touch, see, feel.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format',
    month: 'February',
    year: '2025',
  },
  {
    id: '005',
    title: 'Studio Pipeline',
    subtitle: 'End-to-end workflow',
    category: 'TECH',
    description: 'An internal pipeline automating the entire studio workflow — from brief ingestion to delivery. Built for speed, not ceremony.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format',
    month: 'February',
    year: '2025',
  },
  {
    id: '006',
    title: 'TeraaCharge UI',
    subtitle: 'EV charging platform',
    category: 'WEB',
    description: 'UI/UX overhaul for India\'s fastest-growing EV charging network — 3D product viz, real-time maps, design system built for scale.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format',
    month: 'February',
    year: '2025',
  },
  {
    id: '007',
    title: 'Organic Petals',
    subtitle: 'Generative flora system',
    category: 'VR',
    description: 'A generative VR environment where organic forms bloom in real-time. Part art installation, part spatial computing R&D.',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format',
    month: 'March',
    year: '2025',
  },
  {
    id: '008',
    title: 'Spatial Interfaces',
    subtitle: '3D/VR exploration V0.9',
    category: 'VR',
    description: 'Next-gen spatial computing interfaces for immersive environments — AR commerce, virtual collaboration, embodied navigation.',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format',
    month: 'March',
    year: '2025',
  },
  {
    id: '009',
    title: 'Cambrian SkillsDA',
    subtitle: 'Data intelligence platform',
    category: 'DATA',
    description: 'AI-powered skills platform with complex data viz, real-time workforce analytics, and an adaptive interface that learns from use.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format',
    month: 'March',
    year: '2025',
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Debasis Maharana',
    role: 'Founder & Creative Director',
    bio: 'Creative force behind RockSpace. With a designer\'s eye and a storyteller\'s soul, Debasis shapes brands that don\'t just look good — they feel inevitable. Obsessed with visual systems, motion, and the quiet details that separate good from iconic.',
    social: [
      { platform: 'Instagram', url: '#' },
      { platform: 'LinkedIn', url: '#' },
    ],
    skills: ['Brand Identity', 'Visual Systems', 'Motion Direction', 'Design Strategy', 'Typography', 'Art Direction'],
    initials: 'DM',
  },
  {
    name: 'G. Jayaditya',
    role: 'Technical Lead — Frontend',
    bio: 'Architect of the web layer. Jayaditya transforms design into living, breathing interfaces — pixel-perfect, performant, and buttery smooth. If it ships to the browser, it runs through his hands. Next.js, WebGL, TypeScript — he speaks them fluently.',
    social: [
      { platform: 'GitHub', url: '#' },
      { platform: 'LinkedIn', url: '#' },
    ],
    skills: ['React/Next.js', 'WebGL', 'TypeScript', 'CSS Architecture', 'Performance', 'Motion Engineering'],
    initials: 'GJ',
  },
  {
    name: 'Dilip',
    role: 'AI & Automation Polymath',
    bio: 'Bridging creativity with systems thinking. Dilip builds the engines that make RockSpace run — AI agents, automated workflows, data pipelines, and internal tools. When you see efficiency that feels like magic, that\'s Dilip\'s handiwork.',
    social: [
      { platform: 'GitHub', url: '#' },
      { platform: 'LinkedIn', url: '#' },
    ],
    skills: ['AI Agents', 'Workflow Automation', 'Data Engineering', 'Systems Design', 'API Architecture', 'Growth Infrastructure'],
    initials: 'DP',
  },
];
