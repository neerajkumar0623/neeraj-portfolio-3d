import { Component, AfterViewInit, ElementRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SERVICES_DATA } from '../../data/portfolio-data';
import { ServiceItem } from '../../models/portfolio.model';
import { GsapAnimationService } from '../../services/gsap-animation.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="section services-section">
      <div class="section-header">
        <span class="section__eyebrow">
          <span>&bull;</span> VALUE DELIVERED
        </span>
        <h2 class="section__title">
          Engineering <span class="section__title--gradient">Services</span>
        </h2>
        <p class="section__subtitle">
          Full-lifecycle development capabilities from initial system architecture to production cloud deployment and AI acceleration.
        </p>
      </div>

      <!-- Services 8 Large Numbered Cards Grid -->
      <div class="services-grid">
        <div 
          *ngFor="let service of services" 
          class="glass-panel service-card"
        >
          <div class="service-number-header">
            <span class="service-number">{{ service.number }}</span>
            <div class="service-icon-wrapper">
              <i [class]="service.icon"></i>
            </div>
          </div>

          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>

          <!-- Deliverables Checklist -->
          <div class="deliverables-container">
            <h4 class="deliverables-label">KEY DELIVERABLES</h4>
            <ul class="deliverables-list">
              <li *ngFor="let item of service.deliverables">
                <span class="check-dot">&bull;</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Technologies Footer -->
          <div class="service-tech-tags">
            <span *ngFor="let t of service.tech" class="tech-tag">{{ t }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      position: relative;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.75rem;

      @media (min-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
        gap: 2rem;
      }
    }

    .service-card {
      padding: 2.25rem 1.75rem;
      display: flex;
      flex-direction: column;
      position: relative;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.35s ease,
                  box-shadow 0.35s ease;

      &:hover {
        transform: translateY(-6px);
        border-color: rgba(0, 242, 254, 0.4);
        box-shadow: 0 16px 36px -10px rgba(0, 242, 254, 0.15),
                    0 0 25px rgba(139, 92, 246, 0.1);

        .service-number {
          color: #00f2fe;
          text-shadow: 0 0 15px rgba(0, 242, 254, 0.6);
        }

        .service-icon-wrapper {
          border-color: #00f2fe;
          transform: scale(1.1);
        }
      }
    }

    .service-number-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }

    .service-number {
      font-family: var(--font-mono, monospace);
      font-size: 2.4rem;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.2);
      transition: color 0.3s ease, text-shadow 0.3s ease;
      line-height: 1;
    }

    .service-icon-wrapper {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      color: #00f2fe;
      transition: all 0.3s ease;
    }

    .service-title {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.25rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 0.75rem;
      line-height: 1.3;
    }

    .service-description {
      font-size: 0.88rem;
      color: #94a3b8;
      line-height: 1.65;
      margin: 0 0 1.5rem;
    }

    .deliverables-container {
      margin-bottom: 1.5rem;
      margin-top: auto;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .deliverables-label {
      font-family: var(--font-mono, monospace);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #64748b;
      margin: 0 0 0.65rem;
    }

    .deliverables-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        font-size: 0.82rem;
        color: #cbd5e1;

        .check-dot {
          color: #00f2fe;
          font-size: 1rem;
          line-height: 1.2;
        }
      }
    }

    .service-tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }
  `]
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  private animationService = inject(GsapAnimationService);
  private elementRef = inject(ElementRef);
  services: ServiceItem[] = SERVICES_DATA;

  ngAfterViewInit(): void {
    // Initialize GSAP animations after view is ready
    this.initAnimations();
  }

  /**
   * Initialize premium GSAP animations for services section
   * - Section header reveal
   * - Service cards stagger animation with scale effect
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

      // Service cards stagger animation with scale effect
      const serviceCards = nativeElement.querySelectorAll('.service-card');
      if (serviceCards.length > 0) {
        this.animationService.staggerFadeUp(serviceCards, {
          scrollTrigger: true,
          delay: 0.2,
          duration: 0.6,
          y: 50,
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
