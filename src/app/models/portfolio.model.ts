export interface TechItem {
  name: string;
  icon?: string;
  color?: string;
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'web' | 'mobile' | 'saas' | 'ai' | 'backend';
  stack: string[];
  techItems?: TechItem[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  color: string;
  featured?: boolean;
  
  // Case Study / Modal Details
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string[];
  results: string[];
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'ai' | 'devops' | 'tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency?: number;
  icon: string; // Devicon class or SVG
  description: string;
  tags?: string[];
  highlight?: string;
}

export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  duration: string;
  type: string;
  responsibilities: string[];
  technologies: string[];
  highlight?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
  tech: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}
