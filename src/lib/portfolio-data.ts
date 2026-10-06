// Portfolio content — single source of truth
// Edit this file to update projects, skills, and socials

export const profile = {
  name: 'Ajibade Hassan',
  firstName: 'Ajibade',
  lastName: 'Hassan',
  role: 'Full-Stack Web Developer',
  location: 'Lagos, Nigeria',
  email: 'hassanajibade17@gmail.com',
  available: true,
  tagline:
    'Full-Stack Web Developer and AI Engineer building modern web applications end-to-end — from intuitive interfaces to robust APIs and intelligent, AI-powered features.',
  bio: [
    "I'm a Full-Stack Web Developer and AI Engineer who loves turning ideas into polished, production-ready web applications. From crafting responsive, accessible interfaces with React and Next.js to designing robust APIs with Django and Node.js — and layering in AI-powered features with modern LLM and machine learning tooling — I work across the entire stack.",
    "I'm open to job opportunities where I can contribute, learn, and grow. If you have a role that matches my skills and experience, don't hesitate to reach out.",
  ],
  resumeUrl: '/resume.pdf',
}

export const socials = [
  {
    name: 'GitHub',
    handle: '@AjibadeHassan',
    url: 'https://github.com/AjibadeHassan',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    handle: 'Ajibade Hassan',
    url: 'https://www.linkedin.com/in/ajibade-hassan-2a2691242/',
    icon: 'linkedin',
  },
  {
    name: 'X (Twitter)',
    handle: '@devcarefree',
    url: 'https://x.com/devcarefree',
    icon: 'twitter',
  },
] as const

export const skills = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Responsive Design'],
  Backend: ['Node.js', 'Python', 'Django', 'REST API', 'PostgreSQL', 'MySQL', 'Prisma'],
  'AI Engineering': ['LLM Integration', 'Prompt Engineering', 'RAG', 'OpenAI API', 'LangChain', 'Vector Databases', 'Model Fine-Tuning'],
  Tools: ['Git', 'GitHub', 'Docker', 'Jest', 'Vite', 'Webpack', 'Linux/Terminal', 'SEO'],
}

export interface Project {
  id: string
  title: string
  category: 'Full-Stack' | 'Frontend' | 'Backend'
  description: string
  longDescription: string
  tech: string[]
  liveUrl?: string
  codeUrl: string
  featured?: boolean
  accent: string // tailwind gradient classes
}

export const projects: Project[] = [
  {
    id: 'e-hospital-app',
    title: 'E-Hospital Management System',
    category: 'Full-Stack',
    description:
      'A comprehensive healthcare platform connecting patients, doctors, and care teams with appointment booking, medical records, prescriptions, and real-time notifications.',
    longDescription:
      'Full-stack healthcare management system with role-based dashboards for patients and doctors. Features include appointment booking with live time-slot availability, medical records management, prescriptions with refill requests, a real-time notification center, and configurable notification preferences. Built with Next.js 16 App Router, Prisma ORM, and a complete REST API.',
    tech: ['Next.js 16', 'TypeScript', 'Prisma', 'SQLite', 'shadcn/ui', 'Tailwind CSS', 'Zustand', 'React Hook Form', 'Zod'],
    liveUrl: 'https://github.com/AjibadeHassan/e-hospital-app',
    codeUrl: 'https://github.com/AjibadeHassan/e-hospital-app',
    featured: true,
    accent: 'from-blue-500 to-sky-500',
  },
  {
    id: 'django-rest-react',
    title: 'Django REST + React',
    category: 'Full-Stack',
    description:
      'A full-stack application showcasing Django REST Framework on the backend with a React frontend, demonstrating API design and client-server integration.',
    longDescription:
      'Full-stack project demonstrating end-to-end integration between a Django REST Framework backend and a React frontend. Includes JWT authentication, serialized models, and a responsive React UI consuming the API.',
    tech: ['Django', 'Django REST Framework', 'React', 'Python', 'JavaScript', 'PostgreSQL'],
    codeUrl: 'https://github.com/AjibadeHassan/django-rest-and-react',
    accent: 'from-blue-600 to-indigo-500',
  },
  {
    id: 'e-commerce-react',
    title: 'E-Commerce Web Application',
    category: 'Full-Stack',
    description:
      'A web app where clients can request sewage cleaning services and order related products, with cart, checkout, and order management.',
    longDescription:
      'Service-booking and product-ordering platform. Customers can request cleaning services, browse related products, add them to a cart, and complete checkout. Includes an admin dashboard for managing orders and inventory.',
    tech: ['React', 'JavaScript', 'CSS3', 'REST API'],
    codeUrl: 'https://github.com/AjibadeHassan/e-commerce-with-react',
    accent: 'from-sky-500 to-cyan-500',
  },
  {
    id: 'job-finder',
    title: 'Job Finder',
    category: 'Frontend',
    description:
      'A job search application that aggregates listings and lets users filter, save, and apply to opportunities.',
    longDescription:
      'Job search interface with filtering by location, role, and seniority. Users can save listings and track applications. Built with a clean, accessible UI.',
    tech: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    codeUrl: 'https://github.com/AjibadeHassan/job-finder',
    accent: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'budget-app',
    title: 'Budget App',
    category: 'Frontend',
    description:
      'A personal budget tracker for managing income, expenses, and savings goals with visual summaries.',
    longDescription:
      'Personal finance tracker with income and expense logging, category breakdowns, and visual charts showing spending trends over time.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    codeUrl: 'https://github.com/AjibadeHassan/Budget-app',
    accent: 'from-sky-500 to-blue-500',
  },
  {
    id: 'dev-profile',
    title: 'Developer Portfolio',
    category: 'Frontend',
    description:
      'A modern, animated developer portfolio built with Next.js, TypeScript, and shadcn/ui — featuring dark mode and a working contact form.',
    longDescription:
      'This very portfolio — built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui. Features dark/light mode, smooth animations, responsive design, and a contact form backed by a Prisma database.',
    tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Prisma', 'Framer Motion'],
    liveUrl: '#',
    codeUrl: 'https://github.com/AjibadeHassan/Dev-profile',
    accent: 'from-blue-500 to-indigo-600',
  },
]

export const stats = [
  { label: 'Years Coding', value: '3+' },
  { label: 'Projects Built', value: '20+' },
  { label: 'GitHub Repos', value: '30+' },
  { label: 'Technologies', value: '15+' },
]
