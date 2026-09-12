import { Injectable, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class GsapAnimationService implements OnDestroy {
  private scrollTriggers: ScrollTrigger[] = [];
  private contexts: gsap.Context[] = [];
  private isReducedMotion = false;

  constructor() {
    this.checkReducedMotion();
    // Listen for changes to reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', () => this.checkReducedMotion());
    }
  }

  /**
   * Check if user prefers reduced motion
   */
  private checkReducedMotion(): void {
    if (typeof window !== 'undefined') {
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }

  /**
   * Check if animations should be disabled
   */
  shouldDisableAnimations(): boolean {
    return this.isReducedMotion;
  }

  /**
   * Create a GSAP context for automatic cleanup
   */
  createContext(scope: HTMLElement): gsap.Context {
    const context = gsap.context(() => {}, scope);
    this.contexts.push(context);
    return context;
  }

  /**
   * Animate element with fade-up effect
   */
  fadeUp(
    element: Element | string,
    options: {
      delay?: number;
      duration?: number;
      y?: number;
      opacity?: number;
      scrollTrigger?: boolean | ScrollTrigger.Vars;
      once?: boolean;
    } = {}
  ): gsap.core.Tween | null {
    if (this.shouldDisableAnimations()) return null;

    const {
      delay = 0,
      duration = 0.8,
      y = 50,
      opacity = 0,
      scrollTrigger = false,
      once = true
    } = options;

    const defaults = {
      y,
      opacity,
      duration,
      delay,
      ease: 'power3.out'
    };

    let tween: gsap.core.Tween;

    if (scrollTrigger) {
      const triggerOptions: ScrollTrigger.Vars = typeof scrollTrigger === 'boolean' 
        ? { 
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: once ? 'play none none reverse' : 'play none none none'
          }
        : {
            ...scrollTrigger,
            toggleActions: scrollTrigger.toggleActions || (once ? 'play none none reverse' : 'play none none none')
          };

      tween = gsap.from(element, {
        ...defaults,
        scrollTrigger: {
          ...triggerOptions,
          markers: false // Always false in production
        }
      });

      // Store ScrollTrigger for cleanup
      if (tween.scrollTrigger) {
        this.scrollTriggers.push(tween.scrollTrigger);
      }
    } else {
      tween = gsap.from(element, defaults);
    }

    return tween;
  }

  /**
   * Animate element with fade-in effect (no movement)
   */
  fadeIn(
    element: Element | string,
    options: {
      delay?: number;
      duration?: number;
      opacity?: number;
      scrollTrigger?: boolean | ScrollTrigger.Vars;
      once?: boolean;
    } = {}
  ): gsap.core.Tween | null {
    if (this.shouldDisableAnimations()) return null;

    const {
      delay = 0,
      duration = 0.6,
      opacity = 0,
      scrollTrigger = false,
      once = true
    } = options;

    const defaults = {
      opacity,
      duration,
      delay,
      ease: 'power2.out'
    };

    let tween: gsap.core.Tween;

    if (scrollTrigger) {
      const triggerOptions: ScrollTrigger.Vars = typeof scrollTrigger === 'boolean'
        ? {
            start: 'top 85%',
            toggleActions: once ? 'play none none reverse' : 'play none none none'
          }
        : {
            ...scrollTrigger,
            toggleActions: scrollTrigger.toggleActions || (once ? 'play none none reverse' : 'play none none none')
          };

      tween = gsap.from(element, {
        ...defaults,
        scrollTrigger: {
          ...triggerOptions,
          markers: false
        }
      });

      if (tween.scrollTrigger) {
        this.scrollTriggers.push(tween.scrollTrigger);
      }
    } else {
      tween = gsap.from(element, defaults);
    }

    return tween;
  }

  /**
   * Animate multiple elements with stagger effect
   */
  staggerFadeUp(
    elements: NodeListOf<Element> | Element[],
    options: {
      delay?: number;
      duration?: number;
      y?: number;
      opacity?: number;
      stagger?: number;
      scrollTrigger?: boolean | ScrollTrigger.Vars;
      once?: boolean;
    } = {}
  ): gsap.core.Tween | null {
    if (this.shouldDisableAnimations()) return null;

    const {
      delay = 0,
      duration = 0.6,
      y = 40,
      opacity = 0,
      stagger = 0.1,
      scrollTrigger = false,
      once = true
    } = options;

    const defaults = {
      y,
      opacity,
      duration,
      delay,
      stagger,
      ease: 'power3.out'
    };

    let tween: gsap.core.Tween;

    if (scrollTrigger) {
      const triggerOptions: ScrollTrigger.Vars = typeof scrollTrigger === 'boolean'
        ? {
            start: 'top 85%',
            toggleActions: once ? 'play none none reverse' : 'play none none none'
          }
        : {
            ...scrollTrigger,
            toggleActions: scrollTrigger.toggleActions || (once ? 'play none none reverse' : 'play none none none')
          };

      tween = gsap.from(elements, {
        ...defaults,
        scrollTrigger: {
          ...triggerOptions,
          markers: false
        }
      });

      if (tween.scrollTrigger) {
        this.scrollTriggers.push(tween.scrollTrigger);
      }
    } else {
      tween = gsap.from(elements, defaults);
    }

    return tween;
  }

  /**
   * Animate element with scale effect
   */
  scaleIn(
    element: Element | string,
    options: {
      delay?: number;
      duration?: number;
      scale?: number;
      opacity?: number;
      scrollTrigger?: boolean | ScrollTrigger.Vars;
      once?: boolean;
    } = {}
  ): gsap.core.Tween | null {
    if (this.shouldDisableAnimations()) return null;

    const {
      delay = 0,
      duration = 0.6,
      scale = 0.9,
      opacity = 0,
      scrollTrigger = false,
      once = true
    } = options;

    const defaults = {
      scale,
      opacity,
      duration,
      delay,
      ease: 'back.out(1.2)'
    };

    let tween: gsap.core.Tween;

    if (scrollTrigger) {
      const triggerOptions: ScrollTrigger.Vars = typeof scrollTrigger === 'boolean'
        ? {
            start: 'top 85%',
            toggleActions: once ? 'play none none reverse' : 'play none none none'
          }
        : {
            ...scrollTrigger,
            toggleActions: scrollTrigger.toggleActions || (once ? 'play none none reverse' : 'play none none none')
          };

      tween = gsap.from(element, {
        ...defaults,
        scrollTrigger: {
          ...triggerOptions,
          markers: false
        }
      });

      if (tween.scrollTrigger) {
        this.scrollTriggers.push(tween.scrollTrigger);
      }
    } else {
      tween = gsap.from(element, defaults);
    }

    return tween;
  }

  /**
   * Create parallax effect on scroll
   */
  parallax(
    element: Element | string,
    options: {
      y?: number | string;
      speed?: number;
      scrollTrigger?: ScrollTrigger.Vars;
    } = {}
  ): gsap.core.Tween | null {
    if (this.shouldDisableAnimations()) return null;

    const {
      y = '-20%',
      speed = 1,
      scrollTrigger = {}
    } = options;

    const tween = gsap.to(element, {
      y,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        ...scrollTrigger,
        markers: false
      }
    });

    if (tween.scrollTrigger) {
      this.scrollTriggers.push(tween.scrollTrigger);
    }

    return tween;
  }

  /**
   * Animate text with character-by-character reveal
   */
  textReveal(
    element: Element | string,
    options: {
      delay?: number;
      duration?: number;
      stagger?: number;
      scrollTrigger?: boolean | ScrollTrigger.Vars;
      once?: boolean;
    } = {}
  ): gsap.core.Tween | null {
    if (this.shouldDisableAnimations()) return null;

    const {
      delay = 0,
      duration = 0.5,
      stagger = 0.02,
      scrollTrigger = false,
      once = true
    } = options;

    // Split text into characters (simple implementation)
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return null;

    const text = el.textContent || '';
    el.innerHTML = text.split('').map(char => 
      `<span style="display: inline-block; opacity: 0; transform: translateY(100%);">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    const chars = el.querySelectorAll('span');

    const defaults = {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power2.out'
    };

    let tween: gsap.core.Tween;

    if (scrollTrigger) {
      const triggerOptions: ScrollTrigger.Vars = typeof scrollTrigger === 'boolean'
        ? {
            start: 'top 85%',
            toggleActions: once ? 'play none none reverse' : 'play none none none'
          }
        : {
            ...scrollTrigger,
            toggleActions: scrollTrigger.toggleActions || (once ? 'play none none reverse' : 'play none none none')
          };

      tween = gsap.to(chars, {
        ...defaults,
        scrollTrigger: {
          ...triggerOptions,
          markers: false
        }
      });

      if (tween.scrollTrigger) {
        this.scrollTriggers.push(tween.scrollTrigger);
      }
    } else {
      tween = gsap.to(chars, defaults);
    }

    return tween;
  }

  /**
   * Animate heading with word-by-word reveal
   */
  headingReveal(
    element: Element | string,
    options: {
      delay?: number;
      duration?: number;
      stagger?: number;
      scrollTrigger?: boolean | ScrollTrigger.Vars;
      once?: boolean;
    } = {}
  ): gsap.core.Tween | null {
    if (this.shouldDisableAnimations()) return null;

    const {
      delay = 0,
      duration = 0.6,
      stagger = 0.08,
      scrollTrigger = false,
      once = true
    } = options;

    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return null;

    const text = el.textContent || '';
    el.innerHTML = text.split(' ').map(word => 
      `<span style="display: inline-block; opacity: 0; transform: translateY(30px);">${word}</span>`
    ).join(' ');

    const words = el.querySelectorAll('span');

    const defaults = {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out'
    };

    let tween: gsap.core.Tween;

    if (scrollTrigger) {
      const triggerOptions: ScrollTrigger.Vars = typeof scrollTrigger === 'boolean'
        ? {
            start: 'top 85%',
            toggleActions: once ? 'play none none reverse' : 'play none none none'
          }
        : {
            ...scrollTrigger,
            toggleActions: scrollTrigger.toggleActions || (once ? 'play none none reverse' : 'play none none none')
          };

      tween = gsap.to(words, {
        ...defaults,
        scrollTrigger: {
          ...triggerOptions,
          markers: false
        }
      });

      if (tween.scrollTrigger) {
        this.scrollTriggers.push(tween.scrollTrigger);
      }
    } else {
      tween = gsap.to(words, defaults);
    }

    return tween;
  }

  /**
   * Pin an element while scrolling
   */
  pin(
    element: Element | string,
    options: ScrollTrigger.Vars = {}
  ): ScrollTrigger | null {
    if (this.shouldDisableAnimations()) return null;

    const trigger = ScrollTrigger.create({
      trigger: element,
      pin: true,
      start: 'top top',
      end: '+=100%',
      ...options,
      markers: false
    });

    this.scrollTriggers.push(trigger);
    return trigger;
  }

  /**
   * Refresh all ScrollTriggers (call after dynamic content loads)
   */
  refresh(): void {
    ScrollTrigger.refresh();
  }

  /**
   * Clean up all animations and ScrollTriggers
   */
  cleanup(): void {
    // Kill all ScrollTriggers
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.scrollTriggers = [];

    // Revert all contexts
    this.contexts.forEach(context => context.revert());
    this.contexts = [];
  }

  /**
   * Clean up specific ScrollTrigger
   */
  killScrollTrigger(trigger: ScrollTrigger): void {
    trigger.kill();
    const index = this.scrollTriggers.indexOf(trigger);
    if (index > -1) {
      this.scrollTriggers.splice(index, 1);
    }
  }

  /**
   * Get current viewport width for responsive animations
   */
  getViewportWidth(): number {
    return typeof window !== 'undefined' ? window.innerWidth : 1200;
  }

  /**
   * Check if current viewport is mobile
   */
  isMobile(): boolean {
    return this.getViewportWidth() < 768;
  }

  /**
   * Check if current viewport is tablet
   */
  isTablet(): boolean {
    const width = this.getViewportWidth();
    return width >= 768 && width < 1024;
  }

  /**
   * Check if current viewport is desktop
   */
  isDesktop(): boolean {
    return this.getViewportWidth() >= 1024;
  }

  ngOnDestroy(): void {
    this.cleanup();
  }
}
