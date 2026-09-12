import { Component, OnInit, OnDestroy, signal, AfterViewInit, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { GsapAnimationService } from '../../services/gsap-animation.service';

export interface TechCard {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  private animationService = inject(GsapAnimationService);
  private elementRef = inject(ElementRef);
  @ViewChild('heroVideo', { static: false }) heroVideo!: ElementRef<HTMLVideoElement>;
  // 4 Interactive Timeline Phases
  currentPhase = signal(1); // 1: Profile, 2: Education, 3: Tech Stack, 4: Explore
  progressHeight = signal(0); // 0% to 100%

  phaseTimer: any = null;
  private isUserInteracting = false;

  // Typewriter / rotating professions
  professions = ['Gen AI Enthusiast', 'Full Stack Developer'];
  currentProfIndex = signal(0);
  typedText = signal('');
  typeTimeout: any = null;

  // Track 1 Tech Cards (Moving Left)
  techTrack1: TechCard[] = [
    { name: 'Angular 18', icon: 'devicon-angularjs-plain colored' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    { name: 'NestJS', icon: 'devicon-nestjs-original colored' },
    { name: 'Express.js', icon: 'devicon-express-original' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'RxJS', icon: 'devicon-rxjs-plain colored' },
    { name: 'HTML5', icon: 'devicon-html5-plain colored' },
    { name: 'SCSS', icon: 'devicon-sass-original colored' },
    { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original colored' },
    // Repeat for seamless infinite loop
    { name: 'Angular 18', icon: 'devicon-angularjs-plain colored' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    { name: 'NestJS', icon: 'devicon-nestjs-original colored' },
    { name: 'Express.js', icon: 'devicon-express-original' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'RxJS', icon: 'devicon-rxjs-plain colored' },
    { name: 'HTML5', icon: 'devicon-html5-plain colored' },
    { name: 'SCSS', icon: 'devicon-sass-original colored' },
    { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original colored' }
  ];

  // Track 2 Tech Cards (Moving Right)
  techTrack2: TechCard[] = [
    { name: 'OpenAI API', icon: 'devicon-python-plain colored' },
    { name: 'Gemini 1.5', icon: 'devicon-google-plain colored' },
    { name: 'Generative AI', icon: 'devicon-tensorflow-original colored' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
    { name: 'Supabase', icon: 'devicon-supabase-plain colored' },
    { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
    { name: 'Docker', icon: 'devicon-docker-plain colored' },
    { name: 'Git', icon: 'devicon-git-plain colored' },
    { name: 'GitHub', icon: 'devicon-github-original' },
    { name: 'VS Code', icon: 'devicon-vscode-plain colored' },
    // Repeat for seamless infinite loop
    { name: 'OpenAI API', icon: 'devicon-python-plain colored' },
    { name: 'Gemini 1.5', icon: 'devicon-google-plain colored' },
    { name: 'Generative AI', icon: 'devicon-tensorflow-original colored' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
    { name: 'Supabase', icon: 'devicon-supabase-plain colored' },
    { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
    { name: 'Docker', icon: 'devicon-docker-plain colored' },
    { name: 'Git', icon: 'devicon-git-plain colored' },
    { name: 'GitHub', icon: 'devicon-github-original' },
    { name: 'VS Code', icon: 'devicon-vscode-plain colored' }
  ];

  ngOnInit(): void {
    this.startTypewriter();
    this.startPhaseTimer();
  }

  ngAfterViewInit(): void {
    // Initialize GSAP animations after view is ready
    this.initAnimations();
  }

  /**
   * Initialize premium GSAP animations for hero section
   * - Scroll-controlled video playback
   * - Pin hero section on scroll
   * - Phase transitions based on scroll
   * - Status pill fade-in
   * - Hero name heading reveal
   * - Profession text reveal
   * - Bio text fade-up
   * - Tech belts stagger animation
   * - Action buttons scale-in
   * - Social links stagger
   * - Timeline navigation fade-in
   */
  private initAnimations(): void {
    if (this.animationService.shouldDisableAnimations()) return;

    const nativeElement = this.elementRef.nativeElement;
    const context = this.animationService.createContext(nativeElement);

    context.add(() => {
      const heroSection = nativeElement.querySelector('.hero-section');
      
      // Scroll-controlled video playback
      if (this.heroVideo) {
        const video = this.heroVideo.nativeElement;
        const fallbackImage = nativeElement.querySelector('.hero-bg-image');
        
        if (heroSection && video) {
          // Hide fallback image initially
          if (fallbackImage) {
            (fallbackImage as HTMLElement).style.opacity = '0';
          }
          
          // Wait for video metadata to load
          video.addEventListener('loadedmetadata', () => {
            console.log('Video loaded, duration:', video.duration);
            // Initialize video
            video.currentTime = 0;
            video.playbackRate = 1;
            
            // Ensure video is visible
            video.style.opacity = '1';
            
            // Pin hero section and control video playback
            gsap.to(heroSection, {
              scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: '+=300%', // Pin for 3x viewport height
                pin: true,
                scrub: 1, // Smooth scrubbing for better feel
                onUpdate: (self) => {
                  const progress = self.progress;
                  const duration = video.duration || 10;
                  video.currentTime = progress * duration;
                  
                  // Update phase based on scroll progress
                  const phase = Math.floor(progress * 4) + 1;
                  if (phase !== this.currentPhase() && phase >= 1 && phase <= 4) {
                    this.setPhase(phase);
                  }
                  
                  // Update progress bar
                  this.progressHeight.set(progress * 100);
                }
              }
            });
          });

          // Handle video load error - show fallback image
          video.addEventListener('error', () => {
            console.warn('Video failed to load, using fallback image');
            video.style.opacity = '0';
            video.classList.add('error');
            if (fallbackImage) {
              (fallbackImage as HTMLElement).style.opacity = '1';
            }
          });

          // Handle video data loading
          video.addEventListener('loadeddata', () => {
            console.log('Video data loaded');
            video.style.opacity = '1';
            if (fallbackImage) {
              (fallbackImage as HTMLElement).style.opacity = '0';
            }
          });
        }
      }

      // Status pill fade-in
      const statusPill = nativeElement.querySelector('.hero-status-pill');
      if (statusPill) {
        this.animationService.fadeIn(statusPill, {
          delay: 0.2,
          duration: 0.8
        });
      }

      // Hero name heading reveal (word by word for premium feel)
      const heroName = nativeElement.querySelector('.hero-name');
      if (heroName) {
        this.animationService.headingReveal(heroName, {
          delay: 0.4,
          duration: 0.8,
          stagger: 0.1
        });
      }

      // Profession text fade-up
      const profession = nativeElement.querySelector('.hero-profession');
      if (profession) {
        this.animationService.fadeUp(profession, {
          delay: 0.8,
          duration: 0.6,
          y: 20
        });
      }

      // Action buttons scale-in
      const actionButtons = nativeElement.querySelectorAll('.hero-phase-actions .btn');
      if (actionButtons.length > 0) {
        this.animationService.staggerFadeUp(actionButtons, {
          delay: 1.4,
          duration: 0.5,
          y: 20,
          stagger: 0.1
        });
      }

      // Social links stagger
      const socialLinks = nativeElement.querySelectorAll('.social-btn');
      if (socialLinks.length > 0) {
        this.animationService.staggerFadeUp(socialLinks, {
          delay: 1.0,
          duration: 0.4,
          y: 15,
          stagger: 0.08
        });
      }
    });
  }

  // Smooth Typewriter effect
  private startTypewriter(): void {
    const word = this.professions[this.currentProfIndex()];
    let charIdx = 0;
    let isDeleting = false;

    const tick = () => {
      if (!isDeleting) {
        this.typedText.set(word.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === word.length) {
          isDeleting = true;
          this.typeTimeout = setTimeout(tick, 2200); // Pause at end of word
          return;
        }
      } else {
        this.typedText.set(word.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          this.currentProfIndex.update((i: number) => (i + 1) % this.professions.length);
          this.typeTimeout = setTimeout(() => this.startTypewriter(), 300);
          return;
        }
      }

      const speed = isDeleting ? 40 : 80;
      this.typeTimeout = setTimeout(tick, speed);
    };

    tick();
  }

  // Auto-advance through the 4 phases
  private startPhaseTimer(): void {
    this.phaseTimer = setInterval(() => {
      if (!this.isUserInteracting) {
        const next = (this.currentPhase() % 4) + 1;
        this.setPhase(next, false);
      }
    }, 7000);
  }

  setPhase(phase: number, userInitiated = true): void {
    this.currentPhase.set(phase);
    // 1 -> 0%, 2 -> 33%, 3 -> 66%, 4 -> 100%
    const pct = ((phase - 1) / 3) * 100;
    this.progressHeight.set(pct);

    if (userInitiated) {
      this.isUserInteracting = true;
      // Resume auto-cycle after 15s of inactivity
      setTimeout(() => {
        this.isUserInteracting = false;
      }, 15000);
    }
  }

  scrollTo(targetId: string, event?: Event): void {
    if (event) event.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    if (this.typeTimeout) clearTimeout(this.typeTimeout);
    if (this.phaseTimer) clearInterval(this.phaseTimer);
    // Cleanup GSAP animations
    this.animationService.cleanup();
  }
}
