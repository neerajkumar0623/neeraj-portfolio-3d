import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header 
      class="navbar-wrapper"
      [class.navbar-wrapper--scrolled]="isScrolled()"
    >
      <div class="navbar-container">
        <!-- Brand Logo -->
        <a href="#hero" class="nav-brand" (click)="scrollTo($event, 'hero')">
          <div class="brand-badge">
            <span class="brand-code">&lt;</span>
            <span class="brand-initials">NK</span>
            <span class="brand-code">/&gt;</span>
          </div>
          <div class="brand-info">
            <span class="brand-name">NEERAJ KUMAR</span>
            <span class="brand-role">MEAN STACK &bull; AI</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="nav-menu" aria-label="Main Navigation">
          <ul class="nav-links">
            <li *ngFor="let item of navItems">
              <a 
                [href]="item.href"
                class="nav-link"
                [class.nav-link--active]="activeSection() === item.id"
                (click)="scrollTo($event, item.id)"
              >
                {{ item.label }}
                <span class="nav-indicator" *ngIf="activeSection() === item.id"></span>
              </a>
            </li>
          </ul>
        </nav>

        <!-- Header Actions -->
        <div class="nav-actions">
          <a 
            href="#contact" 
            class="btn-cta"
            (click)="scrollTo($event, 'contact')"
          >
            <span class="cta-pulse"></span>
            <span>Let's Talk</span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button 
            class="hamburger-btn" 
            [class.hamburger-btn--open]="mobileMenuOpen()"
            (click)="toggleMobileMenu()"
            aria-label="Toggle navigation menu"
            [attr.aria-expanded]="mobileMenuOpen()"
          >
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div 
        class="mobile-drawer" 
        [class.mobile-drawer--open]="mobileMenuOpen()"
      >
        <div class="mobile-drawer-inner">
          <ul class="mobile-nav-links">
            <li *ngFor="let item of navItems">
              <a 
                [href]="item.href"
                class="mobile-nav-link"
                [class.mobile-nav-link--active]="activeSection() === item.id"
                (click)="scrollTo($event, item.id)"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>

          <div class="mobile-drawer-footer">
            <a 
              href="#contact" 
              class="btn-cta mobile-cta"
              (click)="scrollTo($event, 'contact')"
            >
              <span class="cta-pulse"></span>
              <span>Let's Talk</span>
            </a>
            <div class="mobile-socials">
              <a href="https://github.com/Neerajkumar55" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i class="devicon-github-original"></i>
              </a>
              <a href="https://linkedin.com/in/neeraj-kumar-dev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i class="devicon-linkedin-plain"></i>
              </a>
              <a href="mailto:neeraj.developer.contact@gmail.com" aria-label="Email">
                <span>&#9993;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding: 1.25rem 1.5rem;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .navbar-wrapper--scrolled {
      padding: 0.75rem 1.5rem;
    }

    .navbar-container {
      max-width: 1320px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Brand */
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: inherit;
    }

    .brand-badge {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      padding: 0.45rem 0.75rem;
      border-radius: 12px;
      background: rgba(0, 242, 254, 0.06);
      border: 1px solid rgba(0, 242, 254, 0.2);
      font-family: var(--font-mono, monospace);
      font-weight: 700;
      font-size: 1rem;
      box-shadow: 0 0 15px -3px rgba(0, 242, 254, 0.2);
      transition: all 0.3s ease;
    }

    .nav-brand:hover .brand-badge {
      border-color: rgba(0, 242, 254, 0.6);
      box-shadow: 0 0 22px rgba(0, 242, 254, 0.4);
      transform: translateY(-1px);
    }

    .brand-code {
      color: #00f2fe;
    }

    .brand-initials {
      background: linear-gradient(135deg, #fff, #00f2fe);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 0.05em;
    }

    .brand-info {
      display: flex;
      flex-direction: column;
    }

    .brand-name {
      font-family: var(--font-heading, sans-serif);
      font-size: 0.95rem;
      font-weight: 700;
      color: #f8fafc;
      letter-spacing: 0.04em;
    }

    .brand-role {
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      color: #00f2fe;
      letter-spacing: 0.12em;
    }

    /* Desktop Navigation */
    .nav-menu {
      display: none;
    }

    @media (min-width: 900px) {
      .nav-menu {
        display: block;
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0.35rem 0.5rem;
      border-radius: 999px;
      background: rgba(13, 20, 38, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      gap: 0.25rem;
    }

    .nav-link {
      position: relative;
      display: inline-block;
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      font-weight: 500;
      color: #94a3b8;
      text-decoration: none;
      border-radius: 999px;
      transition: all 0.25s ease;
    }

    .nav-link:hover {
      color: #fff;
    }

    .nav-link--active {
      color: #00f2fe;
      background: rgba(0, 242, 254, 0.08);
      font-weight: 600;
    }

    .nav-indicator {
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #00f2fe;
      box-shadow: 0 0 6px #00f2fe;
    }

    /* Header Actions */
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .btn-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.25rem;
      border-radius: 999px;
      background: linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(139, 92, 246, 0.15));
      border: 1px solid rgba(0, 242, 254, 0.4);
      color: #fff;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.02em;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 0 15px -4px rgba(0, 242, 254, 0.25);
    }

    .btn-cta:hover {
      background: linear-gradient(135deg, #00f2fe, #8b5cf6);
      color: #050811;
      border-color: transparent;
      box-shadow: 0 0 25px rgba(0, 242, 254, 0.55);
      transform: translateY(-2px);
    }

    .cta-pulse {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    @keyframes ping {
      0% { transform: scale(0.9); opacity: 1; }
      70%, 100% { transform: scale(2.2); opacity: 0; }
    }

    /* Hamburger Button */
    .hamburger-btn {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 8px 7px;
      cursor: pointer;
      z-index: 1001;
      transition: all 0.3s ease;
    }

    @media (min-width: 900px) {
      .hamburger-btn {
        display: none;
      }
    }

    .hamburger-line {
      width: 100%;
      height: 2px;
      background: #e2e8f0;
      border-radius: 2px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hamburger-btn--open .hamburger-line:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .hamburger-btn--open .hamburger-line:nth-child(2) {
      opacity: 0;
      transform: translateX(10px);
    }
    .hamburger-btn--open .hamburger-line:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* Mobile Drawer */
    .mobile-drawer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(5, 8, 17, 0.96);
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 5rem 2rem 2rem;
    }

    .mobile-drawer--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .mobile-nav-links {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem 0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      text-align: center;
    }

    .mobile-nav-link {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.4rem;
      font-weight: 600;
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .mobile-nav-link:hover,
    .mobile-nav-link--active {
      color: #00f2fe;
    }

    .mobile-drawer-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .mobile-cta {
      width: 80%;
      justify-content: center;
      padding: 0.85rem 1.5rem;
      font-size: 1rem;
    }

    .mobile-socials {
      display: flex;
      gap: 1.5rem;
      font-size: 1.4rem;
    }

    .mobile-socials a {
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .mobile-socials a:hover {
      color: #00f2fe;
    }
  `]
})
export class NavbarComponent implements OnInit {
  isScrolled = signal(false);
  activeSection = signal('hero');
  mobileMenuOpen = signal(false);

  navItems: NavItem[] = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'ai', label: 'Building With AI', href: '#ai' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.checkScroll();
      this.setupIntersectionObserver();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 40);
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  scrollTo(event: Event, id: string): void {
    event.preventDefault();
    this.mobileMenuOpen.set(false);
    this.activeSection.set(id);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private setupIntersectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    this.navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
  }
}
