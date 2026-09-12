import { Component, signal, AfterViewInit, ElementRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SKILLS_DATA } from '../../data/portfolio-data';
import { Skill, SkillCategory } from '../../models/portfolio.model';
import { GsapAnimationService } from '../../services/gsap-animation.service';

interface CategoryTab {
  id: SkillCategory | 'all';
  label: string;
  count: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="section skills-section">
      <div class="section-header">
        <span class="section__eyebrow">
          <span>&bull;</span> TECHNICAL CAPABILITIES
        </span>
        <h2 class="section__title">
          Skills &amp; <span class="section__title--gradient">Technologies</span>
        </h2>
        <p class="section__subtitle">
          Comprehensive full-stack architecture spanning enterprise frontend SPAs, resilient backend microservices, modern databases, and agentic AI integrations.
        </p>
      </div>

      <!-- Interactive Category Filter Tabs -->
      <div class="category-tabs-wrapper">
        <button
          *ngFor="let cat of categories"
          class="category-tab"
          [class.category-tab--active]="activeCategory() === cat.id"
          (click)="setCategory(cat.id)"
        >
          <span>{{ cat.label }}</span>
          <span class="category-tab-count">{{ cat.count }}</span>
        </button>
      </div>

      <!-- Skills Cards Grid -->
      <div class="skills-grid">
        <div 
          *ngFor="let skill of filteredSkills()" 
          class="glass-panel skill-card"
          [attr.data-category]="skill.category"
        >
          <div class="skill-card-glow"></div>
          
          <div class="skill-header">
            <div class="skill-icon-wrapper">
              <i [class]="skill.icon"></i>
            </div>
            <div class="skill-meta">
              <h3 class="skill-name">{{ skill.name }}</h3>
              <span class="skill-category-badge">{{ skill.category }}</span>
            </div>
          </div>

          <p class="skill-desc">{{ skill.description }}</p>

          <!-- Tags List -->
          <div class="skill-tags" *ngIf="skill.tags?.length">
            <span *ngFor="let tag of skill.tags" class="tech-tag">{{ tag }}</span>
          </div>

          <!-- Proficiency Level Bar -->
          <div class="proficiency-container" *ngIf="skill.proficiency">
            <div class="proficiency-header">
              <span class="proficiency-label">Proficiency</span>
              <span class="proficiency-num">{{ skill.proficiency }}%</span>
            </div>
            <div class="proficiency-track">
              <div class="proficiency-bar" [style.width.%]="skill.proficiency"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-section {
      position: relative;
    }

    /* Category Filter Tabs */
    .category-tabs-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 3.5rem;
    }

    .category-tab {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.25rem;
      border-radius: 999px;
      background: rgba(13, 20, 38, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      font-family: var(--font-sans, sans-serif);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      backdrop-filter: blur(10px);

      &:hover {
        color: #fff;
        border-color: rgba(0, 242, 254, 0.3);
        background: rgba(0, 242, 254, 0.05);
      }

      &--active {
        color: #050811;
        background: linear-gradient(135deg, #00f2fe, #4facfe 70%, #8b5cf6);
        border-color: transparent;
        box-shadow: 0 4px 20px -4px rgba(0, 242, 254, 0.5);

        .category-tab-count {
          background: rgba(0, 0, 0, 0.25);
          color: #050811;
          font-weight: 700;
        }
      }
    }

    .category-tab-count {
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      background: rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
    }

    /* Skills Grid */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;

      @media (min-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
        gap: 1.75rem;
      }
    }

    /* Skill Card */
    .skill-card {
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      cursor: default;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.35s ease,
                  box-shadow 0.35s ease;

      &:hover {
        transform: translateY(-6px);
        border-color: rgba(0, 242, 254, 0.4);
        box-shadow: 0 16px 36px -10px rgba(0, 242, 254, 0.18),
                    0 0 25px rgba(139, 92, 246, 0.1);

        .skill-icon-wrapper {
          transform: scale(1.12);
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
        }

        .skill-card-glow {
          opacity: 1;
        }
      }
    }

    .skill-card-glow {
      position: absolute;
      top: -40px;
      right: -40px;
      width: 120px;
      height: 120px;
      background: radial-gradient(circle, rgba(0, 242, 254, 0.25) 0%, transparent 70%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.35s ease;
    }

    .skill-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .skill-icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 0.35s ease;
    }

    .skill-meta {
      display: flex;
      flex-direction: column;
    }

    .skill-name {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.15rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 0.2rem;
    }

    .skill-category-badge {
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      color: #00f2fe;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .skill-desc {
      font-size: 0.85rem;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0 0 1.25rem;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.5rem;
    }

    /* Proficiency Bar */
    .proficiency-container {
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .proficiency-header {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      margin-bottom: 0.4rem;
    }

    .proficiency-label {
      color: #64748b;
    }

    .proficiency-num {
      color: #00f2fe;
      font-weight: 600;
    }

    .proficiency-track {
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 999px;
      overflow: hidden;
    }

    .proficiency-bar {
      height: 100%;
      background: linear-gradient(90deg, #00f2fe, #8b5cf6);
      border-radius: 999px;
      box-shadow: 0 0 8px rgba(0, 242, 254, 0.5);
    }
  `]
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  private animationService = inject(GsapAnimationService);
  private elementRef = inject(ElementRef);
  allSkills: Skill[] = SKILLS_DATA;
  activeCategory = signal<SkillCategory | 'all'>('all');

  categories: CategoryTab[] = [
    { id: 'all', label: 'All Tech', count: this.allSkills.length },
    { id: 'frontend', label: 'Frontend', count: this.countCategory('frontend') },
    { id: 'backend', label: 'Backend', count: this.countCategory('backend') },
    { id: 'database', label: 'Database', count: this.countCategory('database') },
    { id: 'ai', label: 'AI & Automation', count: this.countCategory('ai') },
    { id: 'devops', label: 'Cloud & DevOps', count: this.countCategory('devops') },
    { id: 'tools', label: 'Tools', count: this.countCategory('tools') },
  ];

  private countCategory(cat: SkillCategory): number {
    return this.allSkills.filter((s) => s.category === cat).length;
  }

  setCategory(cat: SkillCategory | 'all'): void {
    this.activeCategory.set(cat);
  }

  filteredSkills(): Skill[] {
    const cat = this.activeCategory();
    if (cat === 'all') return this.allSkills;
    return this.allSkills.filter((s) => s.category === cat);
  }

  ngAfterViewInit(): void {
    // Initialize GSAP animations after view is ready
    this.initAnimations();
  }

  /**
   * Initialize premium GSAP animations for skills section
   * - Section header reveal
   * - Category tabs stagger animation
   * - Skills cards stagger animation with scale effect
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

      // Category tabs stagger animation
      const categoryTabs = nativeElement.querySelectorAll('.category-tab');
      if (categoryTabs.length > 0) {
        this.animationService.staggerFadeUp(categoryTabs, {
          scrollTrigger: true,
          delay: 0.2,
          duration: 0.5,
          y: 20,
          stagger: 0.08
        });
      }

      // Skills cards stagger animation with scale effect
      const skillCards = nativeElement.querySelectorAll('.skill-card');
      if (skillCards.length > 0) {
        this.animationService.staggerFadeUp(skillCards, {
          scrollTrigger: true,
          delay: 0.4,
          duration: 0.6,
          y: 40,
          stagger: 0.1
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup GSAP animations
    this.animationService.cleanup();
  }
}
