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
    description: 'A systematic deconstruction of color theory. Generative palettes, dynamic contrast systems and a visual language that breaks the rules to make new ones.',
    image: 'https://ik.imagekit.io/yv4cjaya8/assets/RGB.png',
    month: 'January',
    year: '2025',
  },
  {
    id: '002',
    title: 'Generative Color',
    subtitle: 'Living design system',
    category: 'MOTION',
    description: 'Color that responds to sound. A living system that generates dynamic brand palettes from music, voice and ambient audio.',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200&auto=format',
    month: 'January',
    year: '2025',
  },
  {
    id: '003',
    title: 'Fluid UI V1',
    subtitle: 'Physics-based motion',
    category: 'MOTION',
    description: 'Physics-based transitions that feel real. Gesture-driven interactions. A component animation library for product teams shipping at speed.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format',
    month: 'January',
    year: '2025',
  },
  {
    id: '004',
    title: "L'Oréal Experience",
    subtitle: 'Tactile digitalism',
    category: '3D',
    description: 'Immersive brand experience that lets you touch, see and feel beauty products before they exist. WebGL meets tactile interfaces for L\'Oréal.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format',
    month: 'February',
    year: '2025',
  },
  {
    id: '005',
    title: 'Studio Pipeline',
    subtitle: 'End-to-end workflow',
    category: 'TECH',
    description: 'From brief to delivery without a single manual handoff. We automated our entire studio workflow. Built for speed, not ceremony.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format',
    month: 'February',
    year: '2025',
  },
  {
    id: '006',
    title: 'TeraaCharge UI',
    subtitle: 'EV charging platform',
    category: 'WEB',
    description: 'India\'s fastest EV charging network needed a UI that matched their ambition. 3D product views, real-time maps and a design system built for scale.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format',
    month: 'February',
    year: '2025',
  },
  {
    id: '007',
    title: 'Organic Petals',
    subtitle: 'Generative flora system',
    category: 'VR',
    description: 'A VR environment where organic forms bloom in real time. Art installation meets spatial computing R&D.',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format',
    month: 'March',
    year: '2025',
  },
  {
    id: '008',
    title: 'Spatial Interfaces',
    subtitle: '3D/VR exploration V0.9',
    category: 'VR',
    description: 'AR commerce, virtual collaboration and embodied navigation. The next generation of spatial computing interfaces.',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format',
    month: 'March',
    year: '2025',
  },
  {
    id: '009',
    title: 'Cambrian SkillsDA',
    subtitle: 'Data intelligence platform',
    category: 'DATA',
    description: 'A skills platform powered by AI. Real-time workforce analytics, complex data visualization and an interface that gets smarter the more you use it.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format',
    month: 'March',
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
