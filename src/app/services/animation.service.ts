import { Injectable } from '@angular/core';
import gsap from 'gsap';

/**
 * Small collection of reusable GSAP helpers for UI-level motion
 * (entrance reveals, hover feedback, magnetic buttons). Scroll/camera
 * choreography lives in ScrollAnimationService, not here.
 */
@Injectable({ providedIn: 'root' })
export class AnimationService {
  private get reducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  fadeInUp(target: gsap.TweenTarget, delay = 0): gsap.core.Tween {
    if (this.reducedMotion) {
      return gsap.set(target, { opacity: 1, y: 0 });
    }
    return gsap.fromTo(
      target,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay }
    );
  }

  staggerReveal(targets: gsap.TweenTarget, stagger = 0.08): gsap.core.Tween {
    if (this.reducedMotion) {
      return gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
    }
    return gsap.fromTo(
      targets,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger, ease: 'back.out(1.4)' }
    );
  }

  cardTilt(el: HTMLElement, x: number, y: number): void {
    if (this.reducedMotion) return;
    const rect = el.getBoundingClientRect();
    const px = (x - rect.left) / rect.width - 0.5;
    const py = (y - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateX: py * -8,
      rotateY: px * 8,
      translateZ: 10,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    });
  }

  resetTilt(el: HTMLElement): void {
    gsap.to(el, { rotateX: 0, rotateY: 0, translateZ: 0, duration: 0.6, ease: 'power3.out' });
  }

  magneticMove(el: HTMLElement, x: number, y: number, strength = 0.35): void {
    if (this.reducedMotion) return;
    const rect = el.getBoundingClientRect();
    const dx = (x - (rect.left + rect.width / 2)) * strength;
    const dy = (y - (rect.top + rect.height / 2)) * strength;
    gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
  }

  magneticReset(el: HTMLElement): void {
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  }

  countUp(target: { value: number }, to: number, onUpdate: (v: number) => void): void {
    if (this.reducedMotion) {
      onUpdate(to);
      return;
    }
    gsap.to(target, {
      value: to,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => onUpdate(Math.round(target.value)),
    });
  }
}
