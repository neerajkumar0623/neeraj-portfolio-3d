import { Component, HostListener, signal, AfterViewInit, ElementRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECTS_DATA } from '../../data/portfolio-data';
import { Project } from '../../models/portfolio.model';
import { GsapAnimationService } from '../../services/gsap-animation.service';

type ProjectFilter = 'all' | 'web' | 'mobile' | 'saas' | 'ai' | 'backend';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="section projects-section">
      <div class="section-header">
        <span class="section__eyebrow">
          <span>&bull;</span> PRODUCTION PORTFOLIO
        </span>
        <h2 class="section__title">
          Selected <span class="section__title--gradient">Projects</span>
        </h2>
        <p class="section__subtitle">
          Commercial web applications, enterprise ERPs, EdTech platforms, and AI-powered workflow systems delivered to production.
        </p>
      </div>

      <!-- Project Filter Pills -->
      <div class="filter-pills-container">
        <button
          *ngFor="let filter of filters"
          class="filter-pill"
          [class.filter-pill--active]="activeFilter() === filter.id"
          (click)="setFilter(filter.id)"
        >
          {{ filter.label }}
          <span class="filter-count">{{ getCount(filter.id) }}</span>
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <div 
          *ngFor="let project of filteredProjects()" 
          class="glass-panel project-card"
          [style.--project-color]="project.color"
        >
          <!-- Card Visual / Mockup Preview -->
          <div class="project-media-wrapper" (click)="openModal(project)">
            <img 
              [src]="project.image" 
              [alt]="project.name + ' UI Preview'"
              class="project-img"
              loading="lazy"
            />
            <div class="media-overlay">
              <span class="view-case-study-badge">
                <span>View Case Study</span>
                <span class="arrow">&rarr;</span>
              </span>
            </div>
            <span class="category-chip">{{ project.category | uppercase }}</span>
          </div>

          <!-- Project Information -->
          <div class="project-content">
            <div class="project-title-row">
              <h3 class="project-name" (click)="openModal(project)">{{ project.name }}</h3>
              <span class="status-indicator"></span>
            </div>
            <h4 class="project-subtitle">{{ project.subtitle }}</h4>
            <p class="project-description">{{ project.description }}</p>

            <!-- Tech Stack Tags -->
            <div class="project-stack">
              <span *ngFor="let tech of project.stack" class="tech-tag">{{ tech }}</span>
            </div>

            <!-- Action Buttons -->
            <div class="project-actions">
              <button 
                class="btn-project btn-project--study"
                (click)="openModal(project)"
              >
                <span>Case Study</span>
                <span class="icon">&#10022;</span>
              </button>

              <a 
                *ngIf="project.liveUrl" 
                [href]="project.liveUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn-project btn-project--live"
                title="Live Demo"
              >
                <span>Live Demo</span>
                <span class="icon">&nearr;</span>
              </a>

              <a 
                *ngIf="project.githubUrl" 
                [href]="project.githubUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn-project btn-project--git"
                title="GitHub Repository"
                aria-label="GitHub Repository"
              >
                <i class="devicon-github-original"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Projects Banner -->
      <div class="view-all-projects-wrapper">
        <a 
          href="https://github.com/Neerajkumar55" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn btn--secondary view-all-btn"
        >
          <i class="devicon-github-original"></i>
          <span>View All 20+ Repositories on GitHub</span>
          <span class="arrow">&rarr;</span>
        </a>
      </div>

      <!-- =========================================================================
           PROJECT DETAIL MODAL
           ========================================================================= -->
      <div 
        class="modal-backdrop" 
        *ngIf="selectedProject()"
        (click)="closeModal()"
      >
        <div 
          class="glass-panel modal-card" 
          (click)="$event.stopPropagation()"
          role="dialog"
          [attr.aria-label]="selectedProject()?.name + ' Case Study'"
        >
          <button class="modal-close-btn" (click)="closeModal()" aria-label="Close modal">
            &times;
          </button>

          <div class="modal-body" *ngIf="selectedProject() as p">
            <!-- Modal Header Image -->
            <div class="modal-hero-image">
              <img [src]="p.image" [alt]="p.name" />
              <div class="modal-img-gradient"></div>
              <div class="modal-header-meta">
                <span class="category-chip">{{ p.category | uppercase }}</span>
                <h2 class="modal-title">{{ p.name }}</h2>
                <p class="modal-subtitle">{{ p.subtitle }}</p>
              </div>
            </div>

            <div class="modal-content-scroll">
              <!-- Links Row -->
              <div class="modal-links-row">
                <a *ngIf="p.liveUrl" [href]="p.liveUrl" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
                  <span>Launch Live System</span>
                  <span>&nearr;</span>
                </a>
                <a *ngIf="p.githubUrl" [href]="p.githubUrl" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
                  <i class="devicon-github-original"></i>
                  <span>Inspect Codebase</span>
                </a>
              </div>

              <!-- Tech Stack Badges -->
              <div class="modal-section">
                <h4 class="modal-section-title">ENGINEERING STACK</h4>
                <div class="modal-stack-tags">
                  <span *ngFor="let s of p.stack" class="tech-tag">{{ s }}</span>
                </div>
              </div>

              <!-- Problem & Solution Grid -->
              <div class="modal-two-col">
                <div class="modal-callout modal-callout--problem">
                  <h4 class="callout-title">The Challenge / Problem</h4>
                  <p>{{ p.problem }}</p>
                </div>

                <div class="modal-callout modal-callout--solution">
                  <h4 class="callout-title">Engineered Solution</h4>
                  <p>{{ p.solution }}</p>
                </div>
              </div>

              <!-- Key Features -->
              <div class="modal-section">
                <h4 class="modal-section-title">KEY SYSTEM FEATURES</h4>
                <ul class="modal-features-list">
                  <li *ngFor="let feat of p.features">
                    <span class="check-icon">&#10003;</span>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <!-- Architecture -->
              <div class="modal-section">
                <h4 class="modal-section-title">TECHNICAL ARCHITECTURE</h4>
                <p class="modal-architecture-text">{{ p.architecture }}</p>
              </div>

              <!-- Challenges & Results Grid -->
              <div class="modal-two-col">
                <div class="modal-section">
                  <h4 class="modal-section-title">CORE CHALLENGES OVERCOME</h4>
                  <ul class="modal-bullet-list">
                    <li *ngFor="let c of p.challenges">
                      <span class="bullet">&bull;</span>
                      <span>{{ c }}</span>
                    </li>
                  </ul>
                </div>

                <div class="modal-section">
                  <h4 class="modal-section-title">MEASURABLE RESULTS &amp; IMPACT</h4>
                  <ul class="modal-bullet-list">
                    <li *ngFor="let r of p.results">
                      <span class="bullet bullet--green">&#9658;</span>
                      <span>{{ r }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      position: relative;
    }

    /* Filter Pills */
    .filter-pills-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      margin-bottom: 3.5rem;
    }

    .filter-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.55rem 1.25rem;
      border-radius: 999px;
      background: rgba(13, 20, 38, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
      backdrop-filter: blur(8px);

      &:hover {
        color: #fff;
        border-color: rgba(0, 242, 254, 0.3);
      }

      &--active {
        color: #050811;
        background: linear-gradient(135deg, #00f2fe, #4facfe);
        border-color: transparent;
        box-shadow: 0 4px 18px -3px rgba(0, 242, 254, 0.45);

        .filter-count {
          background: rgba(0, 0, 0, 0.25);
          color: #050811;
          font-weight: 700;
        }
      }
    }

    .filter-count {
      padding: 0.15rem 0.45rem;
      border-radius: 999px;
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      background: rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
    }

    /* Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 2rem;

      @media (min-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
        gap: 2.25rem;
      }
    }

    /* Project Card */
    .project-card {
      padding: 0;
      display: flex;
      flex-direction: column;
      position: relative;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.4s ease,
                  box-shadow 0.4s ease;

      &:hover {
        transform: translateY(-8px);
        border-color: rgba(0, 242, 254, 0.45);
        box-shadow: 0 20px 45px -15px rgba(0, 0, 0, 0.8),
                    0 0 30px -5px rgba(0, 242, 254, 0.2);

        .project-img {
          transform: scale(1.04);
        }

        .media-overlay {
          opacity: 1;
        }
      }
    }

    .project-media-wrapper {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: hidden;
      background: #080d1a;
      cursor: pointer;
    }

    .project-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .media-overlay {
      position: absolute;
      inset: 0;
      background: rgba(5, 8, 17, 0.65);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .view-case-study-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.25rem;
      border-radius: 999px;
      background: rgba(0, 242, 254, 0.9);
      color: #050811;
      font-weight: 700;
      font-size: 0.85rem;
      box-shadow: 0 0 20px rgba(0, 242, 254, 0.6);
      transform: translateY(6px);
      transition: transform 0.3s ease;

      .arrow {
        font-size: 1.1rem;
      }
    }

    .project-card:hover .view-case-study-badge {
      transform: translateY(0);
    }

    .category-chip {
      position: absolute;
      top: 14px;
      left: 14px;
      font-family: var(--font-mono, monospace);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      background: rgba(5, 8, 17, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #00f2fe;
      backdrop-filter: blur(8px);
    }

    .project-content {
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .project-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.25rem;
    }

    .project-name {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.4rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: #00f2fe;
      }
    }

    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
    }

    .project-subtitle {
      font-size: 0.88rem;
      font-weight: 500;
      color: #a78bfa;
      margin: 0 0 0.85rem;
    }

    .project-description {
      font-size: 0.88rem;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0 0 1.25rem;
    }

    .project-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.75rem;
      margin-top: auto;
    }

    .project-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .btn-project {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      padding: 0.55rem 1rem;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.25s ease;

      &--study {
        background: rgba(0, 242, 254, 0.1);
        border-color: rgba(0, 242, 254, 0.3);
        color: #00f2fe;

        &:hover {
          background: #00f2fe;
          color: #050811;
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.4);
        }
      }

      &--live {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
        color: #f8fafc;

        &:hover {
          border-color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }
      }

      &--git {
        width: 36px;
        height: 36px;
        padding: 0;
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(255, 255, 255, 0.1);
        color: #94a3b8;
        font-size: 1.1rem;

        &:hover {
          color: #00f2fe;
          border-color: #00f2fe;
        }
      }
    }

    .view-all-projects-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 3.5rem;
    }

    .view-all-btn {
      padding: 0.85rem 2rem;
      font-size: 0.95rem;

      i {
        font-size: 1.2rem;
      }
      .arrow {
        transition: transform 0.2s ease;
      }
      &:hover .arrow {
        transform: translateX(4px);
      }
    }

    /* =========================================================================
       MODAL STYLES
       ========================================================================= */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(3, 6, 15, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.25s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-card {
      width: 100%;
      max-width: 820px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      background: #080d1a;
      border: 1px solid rgba(0, 242, 254, 0.3);
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 242, 254, 0.2);
      border-radius: 24px;
      overflow: hidden;
      position: relative;
      animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes scaleUp {
      from { transform: scale(0.95) translateY(10px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }

    .modal-close-btn {
      position: absolute;
      top: 18px;
      right: 18px;
      z-index: 20;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(5, 8, 17, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #00f2fe;
        color: #050811;
        border-color: #00f2fe;
      }
    }

    .modal-hero-image {
      position: relative;
      width: 100%;
      height: 240px;
      background: #060912;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .modal-img-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(5,8,17,0.2) 0%, rgba(8,13,26,0.95) 100%);
    }

    .modal-header-meta {
      position: absolute;
      bottom: 20px;
      left: 24px;
      right: 24px;

      .modal-title {
        font-family: var(--font-heading, sans-serif);
        font-size: 2rem;
        font-weight: 800;
        color: #fff;
        margin: 0.35rem 0 0.2rem;
      }

      .modal-subtitle {
        font-size: 1rem;
        color: #00f2fe;
        margin: 0;
      }
    }

    .modal-content-scroll {
      padding: 2rem 2.25rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;

      @media (max-width: 600px) {
        padding: 1.5rem;
      }
    }

    .modal-links-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .modal-section-title {
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      font-weight: 700;
      color: #00f2fe;
      letter-spacing: 0.15em;
      margin: 0 0 0.85rem;
    }

    .modal-stack-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .modal-two-col {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;

      @media (min-width: 640px) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .modal-callout {
      padding: 1.25rem;
      border-radius: 14px;

      .callout-title {
        font-family: var(--font-heading, sans-serif);
        font-size: 0.95rem;
        font-weight: 700;
        margin: 0 0 0.5rem;
      }

      p {
        font-size: 0.86rem;
        line-height: 1.6;
        margin: 0;
      }

      &--problem {
        background: rgba(239, 68, 68, 0.06);
        border: 1px solid rgba(239, 68, 68, 0.25);
        .callout-title { color: #f87171; }
        p { color: #fca5a5; }
      }

      &--solution {
        background: rgba(16, 185, 129, 0.06);
        border: 1px solid rgba(16, 185, 129, 0.25);
        .callout-title { color: #34d399; }
        p { color: #a7f3d0; }
      }
    }

    .modal-features-list,
    .modal-bullet-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.65rem;
        font-size: 0.88rem;
        color: #cbd5e1;
        line-height: 1.55;

        .check-icon {
          color: #10b981;
          font-weight: bold;
        }

        .bullet {
          color: #00f2fe;

          &--green {
            color: #10b981;
            font-size: 0.75rem;
            margin-top: 0.2rem;
          }
        }
      }
    }

    .modal-architecture-text {
      font-size: 0.9rem;
      color: #cbd5e1;
      line-height: 1.7;
      margin: 0;
      padding: 1rem 1.25rem;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      font-family: var(--font-mono, monospace);
    }
  `]
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  private animationService = inject(GsapAnimationService);
  private elementRef = inject(ElementRef);
  projects: Project[] = PROJECTS_DATA;
  activeFilter = signal<ProjectFilter>('all');
  selectedProject = signal<Project | null>(null);

  filters: { id: ProjectFilter; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Applications' },
    { id: 'saas', label: 'SaaS Platforms' },
    { id: 'ai', label: 'AI Products' },
    { id: 'mobile', label: 'Mobile Apps' },
  ];

  setFilter(filter: ProjectFilter): void {
    this.activeFilter.set(filter);
  }

  getCount(filter: ProjectFilter): number {
    if (filter === 'all') return this.projects.length;
    return this.projects.filter((p) => p.category === filter).length;
  }

  filteredProjects(): Project[] {
    const f = this.activeFilter();
    if (f === 'all') return this.projects;
    return this.projects.filter((p) => p.category === f);
  }

  openModal(project: Project): void {
    this.selectedProject.set(project);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.selectedProject.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedProject()) {
      this.closeModal();
    }
  }

  ngAfterViewInit(): void {
    // Initialize GSAP animations after view is ready
    this.initAnimations();
  }

  /**
   * Initialize premium GSAP animations for projects section
   * - Section header reveal
   * - Filter pills stagger animation
   * - Project cards stagger animation with scale effect
   * - View all button fade-up
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

      // Filter pills stagger animation
      const filterPills = nativeElement.querySelectorAll('.filter-pill');
      if (filterPills.length > 0) {
        this.animationService.staggerFadeUp(filterPills, {
          scrollTrigger: true,
          delay: 0.2,
          duration: 0.5,
          y: 20,
          stagger: 0.08
        });
      }

      // Project cards stagger animation with scale effect
      const projectCards = nativeElement.querySelectorAll('.project-card');
      if (projectCards.length > 0) {
        this.animationService.staggerFadeUp(projectCards, {
          scrollTrigger: true,
          delay: 0.4,
          duration: 0.6,
          y: 50,
          stagger: 0.12
        });
      }

      // View all button fade-up
      const viewAllBtn = nativeElement.querySelector('.view-all-btn');
      if (viewAllBtn) {
        this.animationService.fadeUp(viewAllBtn, {
          scrollTrigger: true,
          delay: 0.6,
          duration: 0.6,
          y: 20
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup GSAP animations
    this.animationService.cleanup();
  }
}
