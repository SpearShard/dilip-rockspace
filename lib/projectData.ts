export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'WEB' | 'MOTION' | '3D' | 'BRAND' | 'DATA' | 'VR';
  description: string;
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
    title: 'TeraaCharge',
    subtitle: 'EV Charging Platform',
    category: 'WEB',
    description: 'UI/UX overhaul for India\'s fastest-growing EV charging network — 3D product viz, real-time maps, design system built for scale.',
  },
  {
    id: '002',
    title: 'Generative Color',
    subtitle: 'Design System Exploration',
    category: 'BRAND',
    description: 'A generative color system that creates dynamic brand palettes from audio input. A living tool for creative teams.',
  },
  {
    id: '003',
    title: 'Fluid Motion',
    subtitle: 'Interface Language',
    category: 'MOTION',
    description: 'Physics-based transitions, gesture-driven interactions, and a component animation library for product teams.',
  },
  {
    id: '004',
    title: "L'Oréal Experience",
    subtitle: 'Tactile Digitalism',
    category: '3D',
    description: 'Immersive brand experience merging tactile interfaces with WebGL product visualization for beauty retail.',
  },
  {
    id: '005',
    title: 'SkillsDA',
    subtitle: 'Data Intelligence Platform',
    category: 'DATA',
    description: 'AI-powered skills platform with complex data viz, real-time workforce analytics, and adaptive interface.',
  },
  {
    id: '006',
    title: 'Spatial Interfaces',
    subtitle: '3D/VR Exploration',
    category: 'VR',
    description: 'Next-gen spatial computing interfaces for immersive environments — AR commerce and virtual collaboration.',
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
