import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer-wrapper">
      <div class="footer-container">
        <!-- Top Row: Brand & Quick Navigation -->
        <div class="footer-top">
          <div class="footer-brand">
            <a href="#hero" class="brand-link" (click)="scrollToTop($event)">
              <div class="brand-badge">
                <span class="brand-code">&lt;</span>
                <span class="brand-initials">NK</span>
                <span class="brand-code">/&gt;</span>
              </div>
              <span class="brand-name">NEERAJ KUMAR</span>
            </a>
            <p class="brand-tagline">
              Software Engineering + AI + Modern Web Development
            </p>
          </div>

          <div class="footer-socials">
            <a 
              href="https://github.com/Neerajkumar55" 
              target="_blank" 
              rel="noopener noreferrer"
              class="footer-social-btn"
              title="GitHub"
              aria-label="GitHub"
            >
              <i class="devicon-github-original"></i>
            </a>

            <a 
              href="https://linkedin.com/in/neeraj-kumar-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              class="footer-social-btn"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <i class="devicon-linkedin-plain"></i>
            </a>

            <a 
              href="mailto:neeraj.developer.contact@gmail.com" 
              class="footer-social-btn"
              title="Email"
              aria-label="Email"
            >
              <span>&#9993;</span>
            </a>
          </div>
        </div>

        <!-- Bottom Row: Copyright & Back to Top -->
        <div class="footer-bottom">
          <p class="copyright-text">
            Designed &amp; Developed by <strong>Neeraj Kumar</strong> &bull; &copy; 2026 Neeraj Kumar. All rights reserved.
          </p>

          <button class="back-to-top-btn" (click)="scrollToTop($event)" aria-label="Back to top">
            <span>Back to top</span>
            <span class="arrow">&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      position: relative;
      z-index: 2;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(5, 8, 17, 0.95);
      padding: 4rem 1.5rem 2.5rem;
    }

    .footer-container {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    .footer-top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .brand-link {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: inherit;
    }

    .brand-badge {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      padding: 0.4rem 0.7rem;
      border-radius: 10px;
      background: rgba(0, 242, 254, 0.06);
      border: 1px solid rgba(0, 242, 254, 0.2);
      font-family: var(--font-mono, monospace);
      font-weight: 700;
      font-size: 0.95rem;
    }

    .brand-code {
      color: #00f2fe;
    }

    .brand-initials {
      background: linear-gradient(135deg, #fff, #00f2fe);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .brand-name {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.1rem;
      font-weight: 700;
      color: #f8fafc;
      letter-spacing: 0.04em;
    }

    .brand-tagline {
      font-family: var(--font-mono, monospace);
      font-size: 0.76rem;
      color: #64748b;
      margin: 0.5rem 0 0;
    }

    .footer-socials {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .footer-social-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      font-size: 1.2rem;
      text-decoration: none;
      transition: all 0.25s ease;

      &:hover {
        color: #00f2fe;
        border-color: rgba(0, 242, 254, 0.4);
        background: rgba(0, 242, 254, 0.08);
        transform: translateY(-2px);
      }
    }

    .footer-bottom {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1.25rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .copyright-text {
      font-size: 0.82rem;
      color: #64748b;
      margin: 0;

      strong {
        color: #94a3b8;
      }
    }

    .back-to-top-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.45rem 1rem;
      border-radius: 999px;
      color: #94a3b8;
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;

      .arrow {
        color: #00f2fe;
        font-size: 0.9rem;
        transition: transform 0.2s ease;
      }

      &:hover {
        color: #fff;
        border-color: #00f2fe;
        background: rgba(0, 242, 254, 0.05);

        .arrow {
          transform: translateY(-2px);
        }
      }
    }
  `]
})
export class FooterComponent {
  scrollToTop(event: Event): void {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
