import { Project, Skill, Experience, ServiceItem, EducationItem } from '../models/portfolio.model';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'edutrack',
    name: 'Edutrack',
    subtitle: 'Attendance & Education Management System',
    description: 'Enterprise education platform powering real-time student attendance, automated biometric synchronization, live interactive classes, grading pipelines, and institutional analytics.',
    category: 'web',
    stack: ['Angular 18', 'Node.js', 'MongoDB', 'Socket.io', 'REST API', 'Tailwind CSS'],
    liveUrl: 'https://edutrack.example.com',
    githubUrl: 'https://github.com/Neerajkumar55/edutrack-attendance-system',
    image: 'assets/images/projects/edutrack.svg',
    color: '#00f2fe',
    featured: true,
    problem: 'Educational institutions struggled with fragmented attendance logs, manual proxy prevention, and disorganized live lecture scheduling across multi-branch campuses.',
    solution: 'Engineered a centralized MEAN-stack educational operating system with real-time biometric and QR check-ins, automated absentee notifications, and integrated WebRTC live video classrooms.',
    features: [
      'Biometric and QR-code real-time attendance tracking with anti-spoofing',
      'Automated SMS & WhatsApp notifications to parents upon student check-in',
      'High-throughput student timetable & exam grading management portal',
      'Interactive live lecture broadcasting with WebRTC and Socket.io',
      'Granular role-based access control (Admin, Principal, Teacher, Student, Parent)'
    ],
    architecture: 'Angular 18 frontend with reactive state architecture communicating over REST APIs and WebSockets to an Express/Node.js cluster backed by indexed MongoDB collections and Redis session caching.',
    challenges: [
      'Handling concurrent morning attendance spikes of 10,000+ simultaneous check-ins without database lockups.',
      'Optimizing WebRTC connections across varying bandwidth conditions in institutional networks.'
    ],
    results: [
      'Reduced manual attendance recording overhead by 88% across client institutions.',
      'Achieved sub-120ms API response latency even during peak 9:00 AM check-in spikes.',
      'Maintained 99.9% system uptime through containerized automated deployments.'
    ]
  },
  {
    id: 'sikho-kids',
    name: 'Sikho Kids',
    subtitle: 'Kids Learning Application & EdTech SaaS',
    description: 'Interactive gamified learning platform for early-childhood education with voice-assisted AI phonics, multimedia content streaming, Razorpay subscriptions, and parent supervision portals.',
    category: 'mobile',
    stack: ['Flutter', 'Firebase', 'Cloudinary', 'Razorpay', 'Generative AI', 'Node.js'],
    liveUrl: 'https://sikhokids.example.com',
    githubUrl: 'https://github.com/Neerajkumar55/sikho-kids',
    image: 'assets/images/projects/sikho-kids.svg',
    color: '#f59e0b',
    featured: true,
    problem: 'Early age learners require interactive, safe, and engaging micro-learning modules without intrusive advertisements or complex navigation.',
    solution: 'Designed and deployed a cross-platform Flutter application with cloud asset streaming, AI-driven pronunciation feedback, gamified milestone badges, and seamless Razorpay subscription tiers.',
    features: [
      'Interactive phonics and math games with sound effects & dynamic animations',
      'AI-powered speech evaluation comparing child voice audio against phonics phonemes',
      'Secure parent dashboard with screen-time controls and skill progress analytics',
      'Multi-currency Razorpay subscription billing with auto-renewal webhooks',
      'Optimized media CDN delivery through Cloudinary streaming transformations'
    ],
    architecture: 'Flutter mobile client connected to Firebase Firestore for real-time document synchronization and Node.js microservices for billing webhooks and AI audio validation.',
    challenges: [
      'Minimizing app download bundle size while packing hundreds of HD illustrated learning assets.',
      'Implementing child-safe input handling with strict parental biometric gating.'
    ],
    results: [
      'Processed over 15,000 learning sessions within the first month of pilot release.',
      'Attained 4.8-star parent satisfaction rating for speech phonetics accuracy.',
      'Cut video streaming payload bandwidth by 42% through Cloudinary AVIF/WebP pipelines.'
    ]
  },
  {
    id: 'tradeflow-tradentrix',
    name: 'TradeFlow / Tradentix',
    subtitle: 'Import-Export ERP & Global Supply Chain Suite',
    description: 'Mission-critical enterprise resource planning suite for international trade, customs tariff calculations, multi-currency invoices, shipment telemetry, and warehouse ledger reconciliation.',
    category: 'saas',
    stack: ['Angular 18', 'NestJS', 'PostgreSQL', 'Supabase', 'Docker', 'TypeScript'],
    liveUrl: 'https://tradeflow.example.com',
    githubUrl: 'https://github.com/Neerajkumar55/tradentrix',
    image: 'assets/images/projects/tradeflow.svg',
    color: '#8b5cf6',
    featured: true,
    problem: 'Global traders suffered from error-prone Excel ledgers, delayed freight status visibility, and complex multi-country VAT/tax calculations across ocean freight pipelines.',
    solution: 'Built Tradentix: a high-resilience ERP system delivering real-time cargo container tracking, automated commercial invoice generation, and synchronized PostgreSQL ledger accounting.',
    features: [
      'Automated Customs Bill-of-Lading & Packing List generator with QR verification',
      'Live container GPS status tracking via integrated ocean carrier shipping APIs',
      'Dynamic FX multi-currency currency hedges and exchange rate recalculation',
      'Multi-warehouse inventory distribution and barcode scanning support',
      'Audit-ready financial ledgers with ACID compliance on PostgreSQL'
    ],
    architecture: 'Modular NestJS microservice architecture utilizing TypeORM with PostgreSQL, JWT RBAC security, Supabase storage for encrypted shipping documents, and Angular 18 enterprise UI.',
    challenges: [
      'Maintaining absolute precision across multi-currency decimal transactions with floating FX rates.',
      'Building performant data tables rendering 50,000+ cargo line items without UI freezing.'
    ],
    results: [
      'Accelerated international shipment documentation turnaround from 4 days to 15 minutes.',
      'Zero financial discrepancies recorded across audited transactions exceeding $2M in value.',
      'Virtual scrolling and RxJS debounce reduced frontend memory usage by 65%.'
    ]
  },
  {
    id: 'magnify-reviews',
    name: 'Magnify Reviews',
    subtitle: 'Automated Review Management & Reputation SaaS',
    description: 'AI-boosted customer feedback aggregation SaaS enabling businesses to capture 5-star Google reviews, intercept negative feedback, analyze customer sentiment, and auto-generate review replies.',
    category: 'saas',
    stack: ['Angular 18', 'NestJS', 'MongoDB', 'OpenAI API', 'REST API', 'Stripe'],
    liveUrl: 'https://magnifyreviews.example.com',
    githubUrl: 'https://github.com/Neerajkumar55/magnify-backend',
    image: 'assets/images/projects/magnify.svg',
    color: '#10b981',
    featured: true,
    problem: 'Local and multi-location businesses struggled to proactively collect positive customer reviews while private negative feedback escalated publicly on Google Maps.',
    solution: 'Architected a reputation engine that sends SMS/Email review requests, routes positive feedback to Google/Trustpilot, and utilizes OpenAI to draft tone-aware responses.',
    features: [
      'Smart review gating sending happy customers directly to Google Business Profile',
      'Private internal feedback loop for dissatisfied customers to resolve issues',
      'OpenAI integration generating context-aware professional responses to reviews in 1-click',
      'Sentiment analysis dashboard classifying customer sentiment trends over time',
      'Embeddable interactive social-proof review widgets with live schema markup'
    ],
    architecture: 'NestJS backend communicating with Google Business API and OpenAI GPT-4o, with Angular 18 dashboard powered by reactive signal graphs and MongoDB aggregation pipelines.',
    challenges: [
      'Adhering to strict Google Business review solicitation policies and API rate limits.',
      'Prompt engineering LLM responses to consistently reflect each unique client’s brand tone.'
    ],
    results: [
      'Boosted average Google review volumes by 340% for subscribed enterprise clients.',
      'Saved marketing teams an estimated 25 hours per week in customer reply drafting.',
      'Maintained 99.95% webhook processing reliability for Stripe recurring subscriptions.'
    ]
  },
  {
    id: 'ai-prompt-studio',
    name: 'AI Agent & Prompt Studio',
    subtitle: 'Generative AI Orchestrator & Autonomous Workflow Engine',
    description: 'Autonomous AI workflow orchestrator integrating Gemini Pro and OpenAI to execute structured data extraction, multi-agent code generation, and automated document synthesis.',
    category: 'ai',
    stack: ['Angular 18', 'Node.js', 'OpenAI', 'Gemini API', 'Vector DB', 'TypeScript'],
    liveUrl: 'https://ai-orchestrator.example.com',
    githubUrl: 'https://github.com/Neerajkumar55/ai-question-backend',
    image: 'assets/images/projects/ai-agent.svg',
    color: '#ec4899',
    featured: true,
    problem: 'Teams found it hard to chain multiple LLMs for complex business workflows without incurring hallucinations or high token billing costs.',
    solution: 'Engineered a visual node-based prompt pipeline allowing users to chain Gemini and OpenAI models with validation guards, custom knowledge embeddings, and automated fallback models.',
    features: [
      'Dual-engine orchestration switching dynamically between Gemini 1.5 and GPT-4o',
      'Vector semantic search indexing corporate PDFs and markdown documentation',
      'Prompt temperature and token optimization minimizing API cost per inference',
      'Structured JSON schema output enforcement with automatic retry loops',
      'Exportable webhook endpoints for headless workflow automation'
    ],
    architecture: 'Angular 18 frontend with interactive canvas graph nodes, Node.js streaming proxy with Server-Sent Events (SSE), and pgvector PostgreSQL embeddings storage.',
    challenges: [
      'Streaming multi-token LLM responses in real-time through WebSocket/SSE to Angular UI without layout shifts.',
      'Guaranteeing deterministic JSON response formats from non-deterministic LLM providers.'
    ],
    results: [
      'Reduced average LLM API operational costs by 48% via intelligent prompt token pruning.',
      'Delivered instantaneous streaming responses with sub-100ms time-to-first-token latency.'
    ]
  }
];

export const SKILLS_DATA: Skill[] = [
  // Frontend
  {
    id: 'angular',
    name: 'Angular',
    category: 'frontend',
    proficiency: 96,
    icon: 'devicon-angularjs-plain colored',
    description: 'Angular 18, Standalone Components, Signals, RxJS, SSR & Enterprise SPAs',
    tags: ['Angular 18', 'Signals', 'RxJS', 'SSR']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 94,
    icon: 'devicon-typescript-plain colored',
    description: 'Strict type safety, generics, decorators, advanced utility types',
    tags: ['Generics', 'Strict Mode', 'AST', 'ESNext']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    proficiency: 95,
    icon: 'devicon-javascript-plain colored',
    description: 'ES2024+, asynchronous pipelines, event loop, Canvas & WebGL',
    tags: ['ES6+', 'Async/Await', 'Event Loop', 'DOM']
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    proficiency: 95,
    icon: 'devicon-html5-plain colored',
    description: 'Semantic markup, accessibility (a11y), SEO optimization, microdata',
    tags: ['Semantics', 'Accessibility', 'SEO', 'WAI-ARIA']
  },
  {
    id: 'css3',
    name: 'CSS3 / SCSS',
    category: 'frontend',
    proficiency: 92,
    icon: 'devicon-sass-original colored',
    description: 'Modern SCSS, CSS Grid, Flexbox, keyframe animations, glassmorphism',
    tags: ['SCSS', 'CSS Grid', 'Custom Properties', 'Animations']
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'frontend',
    proficiency: 90,
    icon: 'devicon-tailwindcss-original colored',
    description: 'Utility-first styling, design token systems, responsive fluid layouts',
    tags: ['Utility CSS', 'Fluid UI', 'JIT Engine']
  },
  {
    id: 'rxjs',
    name: 'RxJS',
    category: 'frontend',
    proficiency: 90,
    icon: 'devicon-rxjs-plain colored',
    description: 'Reactive streams, custom operators, memory leak prevention, multicasting',
    tags: ['Observables', 'Operators', 'State Management']
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    proficiency: 94,
    icon: 'devicon-nodejs-plain colored',
    description: 'Event-driven high-concurrency microservices, streams, cluster clustering',
    tags: ['Event Loop', 'Streams', 'Microservices', 'Clustering']
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    category: 'backend',
    proficiency: 92,
    icon: 'devicon-nestjs-original colored',
    description: 'Enterprise architecture, dependency injection, TypeORM/Prisma, Guards',
    tags: ['Dependency Injection', 'TypeORM', 'Swagger', 'Microservices']
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    proficiency: 94,
    icon: 'devicon-express-original',
    description: 'REST API architectures, middleware chains, JWT authentication, rate limiting',
    tags: ['REST APIs', 'Middleware', 'JWT', 'Security']
  },
  {
    id: 'restapi',
    name: 'REST APIs',
    category: 'backend',
    proficiency: 95,
    icon: 'devicon-fastapi-plain colored',
    description: 'API design, OpenAPI specifications, idempotency, versioning, hypermedia',
    tags: ['OpenAPI', 'Idempotency', 'Webhooks', 'Caching']
  },

  // Database
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    proficiency: 93,
    icon: 'devicon-mongodb-plain colored',
    description: 'Aggregation pipelines, sharding, compound indexing, Mongoose ODM',
    tags: ['Aggregation', 'Indexing', 'Mongoose', 'Replica Sets']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    proficiency: 90,
    icon: 'devicon-postgresql-plain colored',
    description: 'Relational modeling, ACID compliance, CTEs, performance query tuning',
    tags: ['ACID', 'Indexing', 'Stored Procs', 'pgvector']
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'database',
    proficiency: 88,
    icon: 'devicon-supabase-plain colored',
    description: 'PostgreSQL auth, realtime websockets, edge functions, storage policies',
    tags: ['PostgreSQL Auth', 'Realtime', 'RLS Policies']
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'database',
    proficiency: 86,
    icon: 'devicon-firebase-plain colored',
    description: 'Firestore realtime synchronization, Cloud Functions, Firebase Auth',
    tags: ['Firestore', 'Cloud Functions', 'Rules']
  },

  // AI & Automation
  {
    id: 'openai',
    name: 'OpenAI API',
    category: 'ai',
    proficiency: 92,
    icon: 'devicon-python-plain colored',
    description: 'GPT-4o integration, function calling, streaming tokens, embeddings',
    tags: ['GPT-4o', 'Tool Calling', 'Embeddings', 'Streaming']
  },
  {
    id: 'gemini',
    name: 'Gemini API',
    category: 'ai',
    proficiency: 90,
    icon: 'devicon-google-plain colored',
    description: 'Google Gemini 1.5 Pro multimodal processing, long-context window synthesis',
    tags: ['Gemini 1.5', 'Multimodal', 'System Prompts']
  },
  {
    id: 'generative-ai',
    name: 'Generative AI',
    category: 'ai',
    proficiency: 89,
    icon: 'devicon-tensorflow-original colored',
    description: 'RAG pipelines, vector similarity search, semantic chunking, prompt engineering',
    tags: ['RAG', 'Vector Search', 'Hallucination Defense']
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    category: 'ai',
    proficiency: 94,
    icon: 'devicon-markdown-original',
    description: 'Few-shot prompting, chain-of-thought, structured JSON output constraints',
    tags: ['Few-Shot', 'CoT', 'Structured JSON', 'Evals']
  },
  {
    id: 'ai-api-integration',
    name: 'AI API Integration',
    category: 'ai',
    proficiency: 92,
    icon: 'devicon-networkx-original',
    description: 'Production AI pipelines, latency caching, fallbacks, rate limit backoffs',
    tags: ['Autonomous Agents', 'Rate Limiting', 'Telemetry']
  },

  // Cloud & DevOps
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    proficiency: 88,
    icon: 'devicon-docker-plain colored',
    description: 'Multi-stage builds, containerization, docker-compose orchestration',
    tags: ['Containers', 'Docker Compose', 'Multi-Stage']
  },
  {
    id: 'git',
    name: 'Git',
    category: 'devops',
    proficiency: 94,
    icon: 'devicon-git-plain colored',
    description: 'Gitflow, trunk-based development, rebasing, bisecting, merge resolutions',
    tags: ['Branching', 'Rebase', 'Submodules', 'Hooks']
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'devops',
    proficiency: 92,
    icon: 'devicon-github-original',
    description: 'GitHub Actions CI/CD automation, pull request reviews, security audits',
    tags: ['Actions', 'CI/CD', 'Release Automation']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'devops',
    proficiency: 90,
    icon: 'devicon-vercel-original',
    description: 'Edge network deployment, zero-config previews, serverless functions',
    tags: ['Edge Network', 'Serverless', 'Preview Deploys']
  },
  {
    id: 'netlify',
    name: 'Netlify',
    category: 'devops',
    proficiency: 88,
    icon: 'devicon-netlify-plain colored',
    description: 'Continuous static deploys, DNS management, redirects, identity',
    tags: ['Deploy Previews', 'Forms', 'Edge Routing']
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'devops',
    proficiency: 82,
    icon: 'devicon-amazonwebservices-plain-wordmark colored',
    description: 'S3 buckets, EC2 hosting, Route 53, CloudFront CDN, IAM configuration',
    tags: ['EC2', 'S3', 'CloudFront', 'Route53']
  },

  // Tools
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    proficiency: 96,
    icon: 'devicon-vscode-plain colored',
    description: 'Power user workflows, custom snippets, remote container debugging',
    tags: ['Productivity', 'Debugging', 'Extensions']
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'tools',
    proficiency: 88,
    icon: 'devicon-figma-plain colored',
    description: 'UI/UX wireframing, component design systems, developer handoff',
    tags: ['Design Systems', 'Prototyping', 'Handoff']
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    proficiency: 94,
    icon: 'devicon-postman-plain colored',
    description: 'API testing collections, mock servers, automated environment variables',
    tags: ['Collections', 'Environments', 'Automated Tests']
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'tools',
    proficiency: 92,
    icon: 'devicon-electron-original colored',
    description: 'Agentic AI coding workflows, context indexing, rapid prototyping',
    tags: ['Agentic Workflows', 'Context-Aware AI']
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    category: 'tools',
    proficiency: 95,
    icon: 'devicon-google-plain colored',
    description: 'Advanced agentic coding, custom skills, planning workflows, automated validation',
    tags: ['Agentic Engineering', 'Planning', 'Automation']
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'exp-2026',
    year: '2026',
    role: 'AI + Software Engineering Specialist',
    company: 'Next-Gen Products & Enterprise Tech',
    duration: '2026 — Present',
    type: 'Full-time / High-Impact Role',
    responsibilities: [
      'Architecting intelligent agentic systems and multi-model LLM pipelines integrating Gemini 1.5 Pro and OpenAI GPT-4o.',
      'Designing RAG architectures and pgvector databases enabling autonomous enterprise knowledge retrieval.',
      'Leading end-to-end frontend performance engineering on Angular 18 with reactive Signals and SSR hydrations.',
      'Mentoring developers on prompt engineering, structured JSON LLM validation, and AI agent automation.'
    ],
    technologies: ['Angular 18', 'OpenAI', 'Gemini', 'NestJS', 'PostgreSQL', 'TypeScript', 'Docker'],
    highlight: 'Pioneered AI-assisted workflows cutting development turnaround cycles by 40%.'
  },
  {
    id: 'exp-2025',
    year: '2025',
    role: 'Senior-Level Web Development Lead',
    company: 'Enterprise SaaS & Cloud Systems',
    duration: '2025 — 2026',
    type: 'Senior Full Stack Role',
    responsibilities: [
      'Engineered scalable microservices and modular NestJS backend services supporting high-concurrency client traffic.',
      'Transformed monolithic web applications into high-performance standalone Angular SPAs with zero breaking regressions.',
      'Instituted automated CI/CD pipelines, Docker containerization, and staging environments on AWS & Vercel.',
      'Standardized REST API schemas and real-time Socket.io bi-directional messaging architectures.'
    ],
    technologies: ['Angular', 'NestJS', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Redis'],
    highlight: 'Delivered multi-tenant ERP system serving 50,000+ daily operational records.'
  },
  {
    id: 'exp-2024',
    year: '2024',
    role: 'MEAN Stack Developer',
    company: 'SaaS Platforms & Web Solutions',
    duration: '2024 — 2025',
    type: 'Full Stack Developer',
    responsibilities: [
      'Developed full-stack web products including Magnify Reviews SaaS and Edutrack attendance management systems.',
      'Constructed MongoDB aggregation pipelines and indexing strategies that reduced slow database queries by 60%.',
      'Implemented secure JWT authentication, role-based access control (RBAC), and multi-currency Stripe payment webhooks.',
      'Crafted pixel-perfect, accessible UI components utilizing Tailwind CSS and advanced SCSS.'
    ],
    technologies: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Stripe'],
    highlight: 'Shipped 3 commercial SaaS products from initial concept to paying customers.'
  },
  {
    id: 'exp-2023',
    year: '2023',
    role: 'Full Stack Developer',
    company: 'Tech Solutions & Mobile Apps',
    duration: '2023 — 2024',
    type: 'Full Stack Engineer',
    responsibilities: [
      'Built cross-platform educational mobile solutions using Flutter integrated with Node.js and Firebase cloud services.',
      'Created custom RESTful endpoints and middleware for secure image uploads via Cloudinary media delivery pipelines.',
      'Integrated Razorpay payment gateways and webhook listeners with automated receipt dispatching.',
      'Collaborated closely with design teams to translate Figma prototypes into fluid web and mobile interfaces.'
    ],
    technologies: ['Flutter', 'Node.js', 'Express.js', 'Firebase', 'Cloudinary', 'Razorpay'],
    highlight: 'Achieved 4.8-star user rating on mobile educational application launch.'
  },
  {
    id: 'exp-2022',
    year: '2022',
    role: 'Junior Developer',
    company: 'Web Engineering & Client Services',
    duration: '2022 — 2023',
    type: 'Junior Web Developer',
    responsibilities: [
      'Engineered interactive, responsive web interfaces using JavaScript, TypeScript, HTML5, and CSS3/SCSS.',
      'Assisted in backend REST API endpoint creation and database schema migrations in MongoDB and MySQL.',
      'Wrote comprehensive unit tests and conducted cross-browser compatibility verification across modern browsers.',
      'Maintained version control integrity through Git branching and code review standards.'
    ],
    technologies: ['JavaScript', 'TypeScript', 'Node.js', 'MongoDB', 'HTML5', 'SCSS', 'Git'],
    highlight: 'Successfully delivered 8+ client web portals on schedule with zero critical bugs.'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-app-dev',
    number: '01',
    title: 'Web Application Development',
    description: 'Bespoke, high-performance web applications built from scratch with modern architecture, maximum security, and uncompromising attention to detail.',
    deliverables: ['Full-lifecycle development', 'Reactive single-page apps', 'SSR & SEO optimization', 'Cross-browser excellence'],
    icon: 'devicon-chrome-plain',
    tech: ['Angular', 'TypeScript', 'Node.js', 'HTML5/SCSS']
  },
  {
    id: 'angular-dev',
    number: '02',
    title: 'Angular Development',
    description: 'Enterprise Angular engineering leveraging Standalone Components, Signals, RxJS streams, and scalable modular design patterns.',
    deliverables: ['Angular 18 architecture', 'Signals state management', 'Complex reactive forms', 'Lighthouse 95+ performance'],
    icon: 'devicon-angularjs-plain',
    tech: ['Angular 18', 'RxJS', 'TypeScript', 'Tailwind']
  },
  {
    id: 'backend-dev',
    number: '03',
    title: 'Node.js / NestJS Backend',
    description: 'High-throughput, clean-architecture backend services, RESTful APIs, microservices, and asynchronous event pipelines.',
    deliverables: ['Enterprise NestJS modules', 'Express.js lightweight APIs', 'JWT & OAuth2 security', 'Microservice architectures'],
    icon: 'devicon-nodejs-plain',
    tech: ['Node.js', 'NestJS', 'Express.js', 'WebSockets']
  },
  {
    id: 'saas-dev',
    number: '04',
    title: 'SaaS Development',
    description: 'Complete software-as-a-service product development including multi-tenancy, Stripe/Razorpay billing, and customer portals.',
    deliverables: ['Multi-tenant data isolation', 'Subscription recurring billing', 'User onboarding & telemetry', 'Admin control planes'],
    icon: 'devicon-fastapi-plain',
    tech: ['Angular', 'NestJS', 'PostgreSQL', 'Stripe']
  },
  {
    id: 'ai-integration',
    number: '05',
    title: 'AI Integration & Engineering',
    description: 'Integrating cutting-edge LLMs (Gemini, OpenAI), prompt engineering pipelines, autonomous agents, and RAG knowledge retrieval.',
    deliverables: ['LLM streaming APIs', 'Custom RAG vector search', 'Autonomous agents & tools', 'Prompt cost optimization'],
    icon: 'devicon-python-plain',
    tech: ['OpenAI', 'Gemini API', 'Vector DB', 'Prompt Eng']
  },
  {
    id: 'api-development',
    number: '06',
    title: 'API Development & Integration',
    description: 'Robust, clean REST APIs with comprehensive OpenAPI documentation, idempotency keys, rate limiting, and third-party webhooks.',
    deliverables: ['OpenAPI / Swagger specs', 'Third-party integrations', 'Webhook systems', 'High-throughput caching'],
    icon: 'devicon-postman-plain',
    tech: ['REST APIs', 'Swagger', 'Redis', 'Node.js']
  },
  {
    id: 'database-arch',
    number: '07',
    title: 'Database Architecture',
    description: 'Scalable data modeling, query indexing optimization, ACID compliance, and zero-downtime database migration strategies.',
    deliverables: ['MongoDB schema design', 'PostgreSQL relational schemas', 'Complex aggregation pipelines', 'Query indexing & tuning'],
    icon: 'devicon-postgresql-plain',
    tech: ['PostgreSQL', 'MongoDB', 'Supabase', 'Firebase']
  },
  {
    id: 'cloud-deployment',
    number: '08',
    title: 'Deployment & Cloud Setup',
    description: 'Automated CI/CD pipelines, Docker containerization, cloud orchestration, SSL certificates, and zero-downtime deployments.',
    deliverables: ['Docker containerization', 'GitHub Actions CI/CD', 'Vercel / Netlify edge hosting', 'AWS cloud infrastructure'],
    icon: 'devicon-docker-plain',
    tech: ['Docker', 'GitHub Actions', 'AWS', 'Vercel']
  }
];

export const EDUCATION_DATA: EducationItem = {
  degree: 'Bachelor of Computer Applications (BCA)',
  field: 'Computer Science & Software Development',
  institution: 'Mohan Lal Sukhadia University',
  location: 'Udaipur, Rajasthan, India',
  period: 'Completed with Academic Distinction',
  description: 'Rigorous foundation in computer science principles, data structures, relational database management systems, algorithms, object-oriented software engineering, and web architecture.',
  highlights: [
    'Core coursework in Data Structures, Algorithms, DBMS, Operating Systems & Networking',
    'Led multiple academic software development capstone projects in full-stack web technologies',
    'Demonstrated consistent academic excellence and active participation in coding hackathons'
  ]
};
