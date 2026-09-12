import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-overlay" [class.loader-overlay--hidden]="isComplete">
      <div class="loader-content">
        <div class="loader-brand">
          <span class="brand-bracket">&lt;</span>
          <span class="brand-text">NK</span>
          <span class="brand-bracket">/&gt;</span>
        </div>

        <div class="loader-bar-container">
          <div class="loader-bar-fill" [style.width.%]="displayProgress"></div>
        </div>

        <div class="loader-status">
          <span class="loader-label">INITIALIZING NEURAL PORTFOLIO SYSTEM</span>
          <span class="loader-percent">{{ displayProgress }}%</span>
        </div>

        <div class="loader-tags">
          <span>ANGULAR 18</span>
          <span>&bull;</span>
          <span>MEAN STACK</span>
          <span>&bull;</span>
          <span>AI SYSTEMS</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #050811;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                  visibility 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .loader-overlay--hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 380px;
      width: 90%;
      padding: 2rem;
    }

    .loader-brand {
      font-family: var(--font-mono, monospace);
      font-size: 2.8rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    .brand-bracket {
      color: #00f2fe;
      animation: pulseGlow 1.5s ease-in-out infinite alternate;
    }

    .brand-text {
      background: linear-gradient(135deg, #ffffff 40%, #00f2fe 80%, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .loader-bar-container {
      width: 100%;
      height: 3px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 1rem;
      box-shadow: 0 0 12px rgba(0, 242, 254, 0.15);
    }

    .loader-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #00f2fe, #4facfe 60%, #8b5cf6);
      border-radius: 999px;
      transition: width 0.25s ease-out;
      box-shadow: 0 0 16px #00f2fe;
    }

    .loader-status {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-family: var(--font-mono, monospace);
      font-size: 0.72rem;
      letter-spacing: 0.15em;
      color: #94a3b8;
      margin-bottom: 1.25rem;
    }

    .loader-percent {
      color: #00f2fe;
      font-weight: 600;
    }

    .loader-tags {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      letter-spacing: 0.2em;
      color: #64748b;
    }

    @keyframes pulseGlow {
      0% { text-shadow: 0 0 5px rgba(0, 242, 254, 0.4); }
      100% { text-shadow: 0 0 20px rgba(0, 242, 254, 0.9), 0 0 35px rgba(139, 92, 246, 0.6); }
    }
  `]
})
export class LoadingScreenComponent implements OnChanges {
  @Input() progress = 0;
  displayProgress = 0;
  isComplete = false;

  ngOnInit() {
    // Graceful auto-advance simulation if assets load instantly
    const interval = setInterval(() => {
      if (this.displayProgress < 100) {
        this.displayProgress = Math.min(100, this.displayProgress + 15);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.isComplete = true;
        }, 350);
      }
    }, 45);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['progress']) {
      const incoming = changes['progress'].currentValue || 0;
      if (incoming > this.displayProgress) {
        this.displayProgress = Math.min(100, incoming);
      }
      if (this.displayProgress >= 100) {
        setTimeout(() => {
          this.isComplete = true;
        }, 400);
      }
    }
  }
}
