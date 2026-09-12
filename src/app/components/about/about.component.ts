import { Component, OnInit, signal, AfterViewInit, ElementRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapAnimationService } from '../../services/gsap-animation.service';

interface StatCounter {
  value: string;
  number: number;
  suffix: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="section about-section">
      <div class="section-header">
        <span class="section__eyebrow">
          <span>&bull;</span> BACKGROUND &amp; ARCHITECTURE
        </span>
        <h2 class="section__title">
          About <span class="section__title--gradient">Me</span>
        </h2>
        <p class="section__subtitle">
          Engineering scalable web systems, clean microservices, and AI-driven products with a relentless focus on performance and developer craft.
        </p>
      </div>

      <div class="about-grid">
        <!-- Main Narrative Card -->
        <div class="glass-panel about-narrative-card">
          <div class="card-glow"></div>
          <div class="terminal-bar">
            <div class="terminal-dots">
              <span class="dot dot--red"></span>
              <span class="dot dot--yellow"></span>
              <span class="dot dot--green"></span>
            </div>
            <span class="terminal-title">neeraj.developer.profile.ts</span>
            <span class="terminal-badge">STABLE</span>
          </div>

          <div class="narrative-body">
            <h3 class="narrative-heading">
              MEAN Stack Developer, Software Architect &amp; AI Integration Engineer
            </h3>

            <p class="lead-text">
              I'm a passionate MEAN Stack Developer with 4+ years of experience building scalable, responsive, and production-ready web applications.
            </p>

            <p class="narrative-para">
              My engineering philosophy revolves around building end-to-end web software that marries resilient backends with fluid, high-frame-rate user interfaces. I specialize in the modern <strong>Angular ecosystem</strong> (Standalone components, reactive Signals, and RxJS pipelines), backed by modular <strong>Node.js and NestJS microservices</strong>.
            </p>

            <p class="narrative-para">
              From designing performant relational schemas in <strong>PostgreSQL</strong> and document collections in <strong>MongoDB</strong>, to orchestrating complex <strong>REST APIs</strong> and real-time WebSockets, I deliver robust commercial SaaS products. Recently, my work has focused on integrating <strong>AI &amp; Generative AI models</strong> (OpenAI GPT-4o, Gemini 1.5, prompt pipelines, and embeddings) to turn ambitious software concepts into reality.
            </p>

            <!-- Key Competency Badges -->
            <div class="competency-tags">
              <span class="tech-tag"><i class="devicon-angularjs-plain colored"></i> Angular Development</span>
              <span class="tech-tag"><i class="devicon-nodejs-plain colored"></i> Node.js &amp; NestJS</span>
              <span class="tech-tag"><i class="devicon-mongodb-plain colored"></i> MongoDB &amp; PostgreSQL</span>
              <span class="tech-tag"><i class="devicon-fastapi-plain colored"></i> RESTful APIs</span>
              <span class="tech-tag"><i class="devicon-google-plain colored"></i> AI Integrations</span>
              <span class="tech-tag"><i class="devicon-docker-plain colored"></i> Cloud &amp; Deployment</span>
            </div>
          </div>
        </div>

        <!-- Animated Counters Cards Grid -->
        <div class="stats-cards-grid">
          <div *ngFor="let stat of stats" class="glass-panel stat-card">
            <div class="stat-number-wrapper">
              <span class="stat-number">{{ stat.number }}</span>
              <span class="stat-suffix">{{ stat.suffix }}</span>
            </div>
            <h4 class="stat-label">{{ stat.label }}</h4>
            <p class="stat-desc">{{ stat.description }}</p>
            <div class="stat-corner-accent"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      position: relative;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;

      @media (min-width: 1024px) {
        grid-template-columns: 1.15fr 0.85fr;
        gap: 3rem;
      }
    }

    /* Narrative Card */
    .about-narrative-card {
      padding: 0;
      display: flex;
      flex-direction: column;
    }

    .card-glow {
      position: absolute;
      top: 0;
      right: 0;
      width: 280px;
      height: 280px;
      background: radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }

    .terminal-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.85rem 1.5rem;
      background: rgba(8, 12, 24, 0.9);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .terminal-dots {
      display: flex;
      align-items: center;
      gap: 0.45rem;

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;

        &--red { background: #ef4444; }
        &--yellow { background: #f59e0b; }
        &--green { background: #10b981; }
      }
    }

    .terminal-title {
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      color: #94a3b8;
      letter-spacing: 0.05em;
    }

    .terminal-badge {
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #10b981;
      letter-spacing: 0.1em;
    }

    .narrative-body {
      padding: 2.25rem;

      @media (max-width: 600px) {
        padding: 1.5rem;
      }
    }

    .narrative-heading {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.4rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 1.25rem;
      line-height: 1.35;
    }

    .lead-text {
      font-size: 1.1rem;
      font-weight: 500;
      color: #00f2fe;
      line-height: 1.65;
      margin-bottom: 1.25rem;
    }

    .narrative-para {
      font-size: 0.96rem;
      color: #94a3b8;
      line-height: 1.75;
      margin-bottom: 1.25rem;

      strong {
        color: #e2e8f0;
        font-weight: 600;
      }
    }

    .competency-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-top: 1.75rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    /* Stats Grid */
    .stats-cards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .stat-card {
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .stat-number-wrapper {
      display: flex;
      align-items: baseline;
      gap: 0.2rem;
      margin-bottom: 0.5rem;
    }

    .stat-number {
      font-family: var(--font-heading, sans-serif);
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #ffffff 40%, #00f2fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
    }

    .stat-suffix {
      font-family: var(--font-heading, sans-serif);
      font-size: 2.2rem;
      font-weight: 800;
      color: #8b5cf6;
      line-height: 1;
    }

    .stat-label {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.05rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0 0 0.5rem;
    }

    .stat-desc {
      font-size: 0.82rem;
      color: #94a3b8;
      line-height: 1.5;
      margin: 0;
    }

    .stat-corner-accent {
      position: absolute;
      top: 0;
      right: 0;
      width: 24px;
      height: 24px;
      border-top: 2px solid rgba(0, 242, 254, 0.4);
      border-right: 2px solid rgba(0, 242, 254, 0.4);
      border-top-right-radius: 20px;
      opacity: 0.4;
      transition: opacity 0.3s ease;
    }

    .stat-card:hover .stat-corner-accent {
      opacity: 1;
      border-color: #00f2fe;
    }
  `]
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  private animationService = inject(GsapAnimationService);
  private elementRef = inject(ElementRef);
  stats: StatCounter[] = [
    {
      value: '4+',
      number: 4,
      suffix: '+',
      label: 'Years Experience',
      description: 'Production web applications, client projects & engineering lead workflows.'
    },
    {
      value: '20+',
      number: 20,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Enterprise ERPs, mobile EdTech, review SaaS platforms & AI tools.'
    },
    {
      value: '10+',
      number: 10,
      suffix: '+',
      label: 'Core Technologies',
      description: 'Angular, Node, NestJS, MongoDB, PostgreSQL, Docker, AI LLM APIs.'
    },
    {
      value: 'Multiple',
      number: 5,
      suffix: '+',
      label: 'Production SaaS Apps',
      description: 'Deployed solutions handling high concurrency, payments & real-time telemetry.'
    }
  ];

  ngOnInit(): void {
    // Component lifecycle
  }

  ngAfterViewInit(): void {
    // Initialize GSAP animations after view is ready
    this.initAnimations();
  }

  /**
   * Initialize premium GSAP animations for about section
   * - Section header reveal
   * - Narrative card fade-up
   * - Stats cards stagger animation
   */
  private initAnimations(): void {
    if (this.animationService.shouldDisableAnimations()) return;

    const nativeElement = this.elementRef.nativeElement;
    const context = this.animationService.createContext(nativeElement);

    context.add(() => {
      // Section header reveal
      const sectionHeader = nativeElement.querySelector('.section-header');
      if (sectionHeader) {
        this.animationService.fadeUp(sectionHeader, {
          scrollTrigger: true,
          duration: 0.8,
          y: 40
        });
      }

      // Narrative card fade-up
      const narrativeCard = nativeElement.querySelector('.about-narrative-card');
      if (narrativeCard) {
        this.animationService.fadeUp(narrativeCard, {
          scrollTrigger: true,
          delay: 0.2,
          duration: 0.8,
          y: 50
        });
      }

      // Stats cards stagger animation
      const statCards = nativeElement.querySelectorAll('.stat-card');
      if (statCards.length > 0) {
        this.animationService.staggerFadeUp(statCards, {
          scrollTrigger: true,
          delay: 0.4,
          duration: 0.6,
          y: 40,
          stagger: 0.15
        });
      }

      // Tech tags subtle scale-in
      const techTags = nativeElement.querySelectorAll('.competency-tags .tech-tag');
      if (techTags.length > 0) {
        this.animationService.staggerFadeUp(techTags, {
          scrollTrigger: true,
          delay: 0.6,
          duration: 0.4,
          y: 15,
          stagger: 0.05
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup GSAP animations
    this.animationService.cleanup();
  }
}
