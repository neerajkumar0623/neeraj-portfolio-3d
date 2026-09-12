import { Component, AfterViewInit, ElementRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EDUCATION_DATA } from '../../data/portfolio-data';
import { EducationItem } from '../../models/portfolio.model';
import { GsapAnimationService } from '../../services/gsap-animation.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="education" class="section education-section">
      <div class="section-header">
        <span class="section__eyebrow">
          <span>&bull;</span> ACADEMIC FOUNDATIONS
        </span>
        <h2 class="section__title">
          Academic <span class="section__title--gradient">Education</span>
        </h2>
        <p class="section__subtitle">
          Formal training in Computer Science, algorithms, database architectures, and software engineering principles.
        </p>
      </div>

      <!-- Minimal Education Card -->
      <div class="education-container">
        <div class="glass-panel education-card">
          <div class="edu-glow"></div>
          
          <div class="edu-top-row">
            <div class="edu-badge">
              <span class="grad-icon">&#127891;</span>
              <span class="degree-title">{{ education.degree }}</span>
            </div>
            <span class="edu-period-badge">{{ education.period }}</span>
          </div>

          <h3 class="edu-field">{{ education.field }}</h3>
          
          <div class="edu-institution-info">
            <span class="inst-name">{{ education.institution }}</span>
            <span class="inst-dot">&bull;</span>
            <span class="inst-loc">{{ education.location }}</span>
          </div>

          <p class="edu-description">{{ education.description }}</p>

          <div class="edu-highlights">
            <div *ngFor="let h of education.highlights" class="edu-highlight-pill">
              <span class="pill-check">&#10003;</span>
              <span>{{ h }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .education-section {
      position: relative;
    }

    .education-container {
      max-width: 900px;
      margin: 0 auto;
    }

    .education-card {
      padding: 2.5rem 2rem;
      position: relative;
      border-color: rgba(0, 242, 254, 0.25);
      display: flex;
      flex-direction: column;

      @media (max-width: 600px) {
        padding: 1.75rem 1.25rem;
      }
    }

    .edu-glow {
      position: absolute;
      top: 0;
      right: 0;
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }

    .edu-top-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .edu-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;

      .grad-icon {
        font-size: 1.75rem;
        line-height: 1;
      }

      .degree-title {
        font-family: var(--font-heading, sans-serif);
        font-size: 1.45rem;
        font-weight: 800;
        color: #fff;
      }
    }

    .edu-period-badge {
      font-family: var(--font-mono, monospace);
      font-size: 0.72rem;
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #10b981;
      letter-spacing: 0.05em;
    }

    .edu-field {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.15rem;
      font-weight: 600;
      color: #00f2fe;
      margin: 0 0 0.5rem;
    }

    .edu-institution-info {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.95rem;
      color: #cbd5e1;
      margin-bottom: 1.25rem;

      .inst-name {
        font-weight: 600;
        color: #f1f5f9;
      }

      .inst-dot {
        color: #64748b;
      }

      .inst-loc {
        color: #94a3b8;
      }
    }

    .edu-description {
      font-size: 0.92rem;
      color: #94a3b8;
      line-height: 1.7;
      margin: 0 0 1.75rem;
    }

    .edu-highlights {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .edu-highlight-pill {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      font-size: 0.86rem;
      color: #cbd5e1;

      .pill-check {
        color: #00f2fe;
        font-weight: bold;
      }
    }
  `]
})
export class EducationComponent implements AfterViewInit, OnDestroy {
  private animationService = inject(GsapAnimationService);
  private elementRef = inject(ElementRef);
  education: EducationItem = EDUCATION_DATA;

  ngAfterViewInit(): void {
    // Initialize GSAP animations after view is ready
    this.initAnimations();
  }

  /**
   * Initialize premium GSAP animations for education section
   * - Section header reveal
   * - Education card fade-up with scale effect
   * - Highlight pills stagger animation
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

      // Education card fade-up with scale effect
      const educationCard = nativeElement.querySelector('.education-card');
      if (educationCard) {
        this.animationService.scaleIn(educationCard, {
          scrollTrigger: true,
          delay: 0.2,
          duration: 0.8,
          scale: 0.95
        });
      }

      // Highlight pills stagger animation
      const highlightPills = nativeElement.querySelectorAll('.edu-highlight-pill');
      if (highlightPills.length > 0) {
        this.animationService.staggerFadeUp(highlightPills, {
          scrollTrigger: true,
          delay: 0.4,
          duration: 0.5,
          y: 20,
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
