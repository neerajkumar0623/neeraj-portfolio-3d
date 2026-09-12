import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Top Scroll Progress Bar -->
    <div class="scroll-progress-container" aria-hidden="true">
      <div class="scroll-progress-fill" [style.width.%]="scrollPercent()"></div>
    </div>

    <!-- Custom Cursor (Desktop Only) -->
    <div class="custom-cursor-root" *ngIf="!isTouchDevice()">
      <div 
        class="cursor-dot"
        [style.transform]="'translate3d(' + dotX() + 'px, ' + dotY() + 'px, 0)'"
      ></div>

      <div 
        class="cursor-ring"
        [class.cursor-ring--hover]="isHovered()"
        [style.transform]="'translate3d(' + ringX() + 'px, ' + ringY() + 'px, 0)'"
      ></div>
    </div>
  `,
  styles: [`
    .scroll-progress-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: transparent;
      z-index: 10001;
      pointer-events: none;
    }

    .scroll-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #00f2fe, #4facfe, #8b5cf6, #ec4899);
      box-shadow: 0 0 10px rgba(0, 242, 254, 0.8), 0 0 20px rgba(139, 92, 246, 0.4);
      transition: width 0.08s ease-out;
    }

    .custom-cursor-root {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 99999;
    }

    .cursor-dot {
      position: absolute;
      top: -3px;
      left: -3px;
      width: 6px;
      height: 6px;
      background-color: #00f2fe;
      border-radius: 50%;
      pointer-events: none;
      box-shadow: 0 0 8px #00f2fe;
      transition: opacity 0.2s ease;
      will-change: transform;
    }

    .cursor-ring {
      position: absolute;
      top: -18px;
      left: -18px;
      width: 36px;
      height: 36px;
      border: 1.5px solid rgba(0, 242, 254, 0.6);
      border-radius: 50%;
      pointer-events: none;
      transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                  height 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                  top 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                  left 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.25s ease,
                  background-color 0.25s ease,
                  box-shadow 0.25s ease;
      will-change: transform;
    }

    .cursor-ring--hover {
      top: -28px;
      left: -28px;
      width: 56px;
      height: 56px;
      border-color: rgba(139, 92, 246, 0.9);
      background-color: rgba(0, 242, 254, 0.08);
      box-shadow: 0 0 25px rgba(0, 242, 254, 0.3), inset 0 0 15px rgba(139, 92, 246, 0.2);
    }
  `]
})
export class CustomCursorComponent implements OnInit {
  dotX = signal(0);
  dotY = signal(0);
  ringX = signal(0);
  ringY = signal(0);
  isHovered = signal(false);
  isTouchDevice = signal(false);
  scrollPercent = signal(0);

  private targetX = 0;
  private targetY = 0;
  private currentRingX = 0;
  private currentRingY = 0;
  private rafId = 0;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isTouchDevice.set(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );

      if (!this.isTouchDevice()) {
        document.body.classList.add('custom-cursor-active');
        this.animateRing();
      }
      this.updateScroll();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (this.isTouchDevice()) return;

    this.targetX = e.clientX;
    this.targetY = e.clientY;
    this.dotX.set(this.targetX);
    this.dotY.set(this.targetY);

    const target = e.target as HTMLElement;
    if (target) {
      const isInteractive = !!target.closest('a, button, input, textarea, select, [data-cursor-hover], .glass-panel, .project-card, .skill-card, .service-card');
      this.isHovered.set(isInteractive);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateScroll();
  }

  private updateScroll(): void {
    if (typeof window === 'undefined') return;
    const docEl = document.documentElement;
    const scrollTop = window.scrollY || docEl.scrollTop;
    const scrollHeight = docEl.scrollHeight - docEl.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    this.scrollPercent.set(Math.min(100, Math.max(0, pct)));
  }

  private animateRing = (): void => {
    // Smooth lerp trailing movement
    this.currentRingX += (this.targetX - this.currentRingX) * 0.18;
    this.currentRingY += (this.targetY - this.currentRingY) * 0.18;

    this.ringX.set(this.currentRingX);
    this.ringY.set(this.currentRingY);

    this.rafId = requestAnimationFrame(this.animateRing);
  };

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (typeof document !== 'undefined') {
      document.body.classList.remove('custom-cursor-active');
    }
  }
}
