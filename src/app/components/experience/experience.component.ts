import { Component, AfterViewInit, ElementRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPERIENCE_DATA } from '../../data/portfolio-data';
import { Experience } from '../../models/portfolio.model';
import { GsapAnimationService } from '../../services/gsap-animation.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="section experience-section">
      <div class="section-header">
        <span class="section__eyebrow">
          <span>&bull;</span> CAREER TRAJECTORY
        </span>
        <h2 class="section__title">
          Work <span class="section__title--gradient">Experience</span>
        </h2>
        <p class="section__subtitle">
          Evolution from foundational web engineer to senior full-stack architect and AI systems specialist.
        </p>
      </div>

      <!-- Futuristic Vertical Timeline -->
      <div class="timeline-container">
        <!-- Glowing Central Axis Spine -->
        <div class="timeline-spine">
          <div class="timeline-spine-glow"></div>
        </div>

        <div class="timeline-items">
          <div 
            *ngFor="let exp of experiences; let i = index; let even = even" 
            class="timeline-item"
            [class.timeline-item--left]="even"
            [class.timeline-item--right]="!even"
          >
            <!-- Timeline Center Checkpoint Node -->
            <div class="timeline-node">
              <div class="node-outer-ring"></div>
              <div class="node-inner-dot"></div>
              <span class="node-year-label">{{ exp.year }}</span>
            </div>

            <!-- Experience Content Card -->
            <div class="glass-panel timeline-card">
              <div class="card-glow"></div>

              <div class="card-header">
                <div class="role-group">
                  <span class="exp-duration-badge">{{ exp.duration }}</span>
                  <h3 class="exp-role">{{ exp.role }}</h3>
                  <h4 class="exp-company">{{ exp.company }}</h4>
                </div>
                <span class="exp-type-tag">{{ exp.type }}</span>
              </div>

              <!-- Responsibilities Bullet Points -->
              <ul class="exp-responsibilities">
                <li *ngFor="let resp of exp.responsibilities">
                  <span class="bullet-caret">&bull;</span>
                  <span>{{ resp }}</span>
                </li>
              </ul>

              <!-- Milestone Highlight Banner -->
              <div class="exp-highlight" *ngIf="exp.highlight">
                <span class="highlight-star">&#9733;</span>
                <span>{{ exp.highlight }}</span>
              </div>

              <!-- Tech Stack Tags -->
              <div class="exp-tech-tags">
                <span *ngFor="let tech of exp.technologies" class="tech-tag">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience-section {
      position: relative;
    }

    .timeline-container {
      position: relative;
      max-width: 1100px;
      margin: 0 auto;
      padding: 2rem 0;
    }

    /* Central Glowing Spine */
    .timeline-spine {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      background: linear-gradient(
        to bottom,
        rgba(0, 242, 254, 0.1) 0%,
        rgba(0, 242, 254, 0.8) 20%,
        rgba(139, 92, 246, 0.8) 80%,
        rgba(139, 92, 246, 0.1) 100%
      );
      z-index: 1;

      @media (max-width: 768px) {
        left: 20px;
      }
    }

    .timeline-spine-glow {
      position: absolute;
      inset: -4px;
      background: inherit;
      filter: blur(8px);
      opacity: 0.6;
    }

    .timeline-items {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 3.5rem;
    }

    .timeline-item {
      position: relative;
      display: flex;
      width: 100%;

      @media (min-width: 769px) {
        &--left {
          justify-content: flex-start;

          .timeline-card {
            margin-right: calc(50% + 40px);
          }
          .node-year-label {
            left: 36px;
          }
        }

        &--right {
          justify-content: flex-end;

          .timeline-card {
            margin-left: calc(50% + 40px);
          }
          .node-year-label {
            right: 36px;
          }
        }
      }

      @media (max-width: 768px) {
        .timeline-card {
          margin-left: 55px;
          width: calc(100% - 55px);
        }
      }
    }

    /* Timeline Center Node */
    .timeline-node {
      position: absolute;
      top: 24px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;

      @media (max-width: 768px) {
        left: 20px;
      }
    }

    .node-outer-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid #00f2fe;
      background: #050811;
      box-shadow: 0 0 14px #00f2fe;
      animation: pulseNode 2.5s infinite;
    }

    .node-inner-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 8px #ffffff;
      z-index: 2;
    }

    .node-year-label {
      position: absolute;
      top: 2px;
      font-family: var(--font-mono, monospace);
      font-size: 0.85rem;
      font-weight: 700;
      color: #00f2fe;
      white-space: nowrap;

      @media (max-width: 768px) {
        display: none;
      }
    }

    @keyframes pulseNode {
      0% { transform: scale(0.95); box-shadow: 0 0 8px #00f2fe; }
      50% { transform: scale(1.15); box-shadow: 0 0 20px #00f2fe, 0 0 30px #8b5cf6; }
      100% { transform: scale(0.95); box-shadow: 0 0 8px #00f2fe; }
    }

    /* Timeline Card */
    .timeline-card {
      padding: 2rem;
      width: 100%;
      position: relative;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 0.35s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 40px -10px rgba(0, 242, 254, 0.16),
                    0 0 30px rgba(139, 92, 246, 0.1);
      }
    }

    .card-glow {
      position: absolute;
      top: 0;
      right: 0;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
      pointer-events: none;
    }

    .card-header {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .exp-duration-badge {
      display: inline-block;
      font-family: var(--font-mono, monospace);
      font-size: 0.72rem;
      color: #00f2fe;
      letter-spacing: 0.08em;
      margin-bottom: 0.3rem;
    }

    .exp-role {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.3rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 0.2rem;
      line-height: 1.25;
    }

    .exp-company {
      font-size: 0.95rem;
      font-weight: 500;
      color: #94a3b8;
      margin: 0;
    }

    .exp-type-tag {
      font-family: var(--font-mono, monospace);
      font-size: 0.68rem;
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
      background: rgba(139, 92, 246, 0.12);
      border: 1px solid rgba(139, 92, 246, 0.3);
      color: #c084fc;
    }

    .exp-responsibilities {
      list-style: none;
      padding: 0;
      margin: 0 0 1.25rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.6rem;
        font-size: 0.88rem;
        color: #cbd5e1;
        line-height: 1.6;

        .bullet-caret {
          color: #00f2fe;
          font-size: 1.1rem;
          line-height: 1.3;
        }
      }
    }

    .exp-highlight {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 1rem;
      border-radius: 10px;
      background: rgba(0, 242, 254, 0.05);
      border-left: 3px solid #00f2fe;
      font-size: 0.82rem;
      font-weight: 500;
      color: #38bdf8;
      margin-bottom: 1.25rem;

      .highlight-star {
        color: #f59e0b;
        font-size: 1rem;
      }
    }

    .exp-tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
  `]
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  private animationService = inject(GsapAnimationService);
  private elementRef = inject(ElementRef);
  experiences: Experience[] = EXPERIENCE_DATA;

  ngAfterViewInit(): void {
    // Initialize GSAP animations after view is ready
    this.initAnimations();
  }

  /**
   * Initialize premium GSAP animations for experience section
   * - Section header reveal
   * - Timeline spine glow animation
   * - Timeline items stagger animation
   * - Timeline cards fade-up with scale effect
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

      // Timeline spine subtle glow animation (desktop only)
      if (this.animationService.isDesktop()) {
        const timelineSpine = nativeElement.querySelector('.timeline-spine');
        if (timelineSpine) {
          this.animationService.fadeIn(timelineSpine, {
            scrollTrigger: true,
            delay: 0.2,
            duration: 1.0
          });
        }
      }

      // Timeline items stagger animation
      const timelineItems = nativeElement.querySelectorAll('.timeline-item');
      if (timelineItems.length > 0) {
        this.animationService.staggerFadeUp(timelineItems, {
          scrollTrigger: true,
          delay: 0.3,
          duration: 0.7,
          y: 60,
          stagger: 0.2
        });
      }

      // Timeline cards scale-in effect
      const timelineCards = nativeElement.querySelectorAll('.timeline-card');
      if (timelineCards.length > 0) {
        timelineCards.forEach((card: Element, index: number) => {
          this.animationService.scaleIn(card, {
            scrollTrigger: true,
            delay: 0.4 + (index * 0.15),
            duration: 0.6,
            scale: 0.95
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup GSAP animations
    this.animationService.cleanup();
  }
}
