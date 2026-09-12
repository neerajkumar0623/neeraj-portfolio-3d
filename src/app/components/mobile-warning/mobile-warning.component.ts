import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-warning',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mobile-warning-overlay" *ngIf="isMobile()">
      <div class="mobile-warning-content">
        <div class="warning-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
        </div>
        <h2 class="warning-title">Desktop Only</h2>
        <p class="warning-message">
          This portfolio is optimized for desktop devices. For the best experience, please view on a larger screen.
        </p>
        <div class="warning-features">
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <span>3D Animations</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎬</span>
            <span>Interactive Video</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">✨</span>
            <span>Premium Effects</span>
          </div>
        </div>
        <button class="continue-btn" (click)="dismiss()">
          Continue Anyway
        </button>
      </div>
    </div>
  `,
  styles: [`
    .mobile-warning-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(5, 8, 17, 0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .mobile-warning-content {
      max-width: 400px;
      text-align: center;
      color: #f8fafc;
    }

    .warning-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      background: rgba(0, 242, 254, 0.1);
      border: 2px solid rgba(0, 242, 254, 0.3);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00f2fe;
    }

    .warning-icon svg {
      width: 40px;
      height: 40px;
    }

    .warning-title {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 1rem;
      background: linear-gradient(135deg, #fff, #00f2fe);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .warning-message {
      font-size: 1rem;
      line-height: 1.6;
      color: #94a3b8;
      margin: 0 0 2rem;
    }

    .warning-features {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .feature-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      font-size: 0.95rem;
      color: #cbd5e1;
    }

    .feature-icon {
      font-size: 1.25rem;
    }

    .continue-btn {
      padding: 0.85rem 2rem;
      background: rgba(0, 242, 254, 0.1);
      border: 1px solid rgba(0, 242, 254, 0.3);
      border-radius: 12px;
      color: #00f2fe;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .continue-btn:hover {
      background: rgba(0, 242, 254, 0.2);
      border-color: rgba(0, 242, 254, 0.5);
    }
  `]
})
export class MobileWarningComponent implements OnInit, OnDestroy {
  dismissed = signal(false);
  private resizeListener?: () => void;

  ngOnInit(): void {
    this.resizeListener = () => {
      // Re-check on resize
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.resizeListener);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeListener && typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  isMobile(): boolean {
    if (this.dismissed()) return false;
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024;
  }

  dismiss(): void {
    this.dismissed.set(true);
  }
}
