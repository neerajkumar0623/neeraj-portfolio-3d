import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface CameraKeyframe {
  section: string;
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
}

/**
 * Drives the cinematic camera moves as the user scrolls through the
 * one-page 3D experience. Isolated from ThreeSceneService so the raw
 * scene setup and the scroll choreography can evolve independently.
 */
@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {
  private triggers: ScrollTrigger[] = [];
  private lookAtTarget = new THREE.Vector3(0, 1.2, 0);

  /** Base (scroll-driven) camera position, kept separate from mouse parallax
   *  so the two motions never fight over the same THREE.Vector3 fields. */
  private basePosition = new THREE.Vector3(0, 1.6, 6.5);
  private parallaxOffset = new THREE.Vector3(0, 0, 0);
  private parallaxTarget = new THREE.Vector3(0, 0, 0);

  private keyframes: CameraKeyframe[] = [
    { section: '#hero', position: new THREE.Vector3(0, 1.5, 3.1), lookAt: new THREE.Vector3(0, 1.35, 0) },
    { section: '#about', position: new THREE.Vector3(-1.6, 1.6, 3.4), lookAt: new THREE.Vector3(0.5, 1.25, 0) },
    { section: '#skills', position: new THREE.Vector3(1.8, 1.8, 3.6), lookAt: new THREE.Vector3(-0.4, 1.3, 0) },
    { section: '#experience', position: new THREE.Vector3(0, 2, 5.5), lookAt: new THREE.Vector3(0, 1.1, 0) },
    { section: '#projects', position: new THREE.Vector3(-1.2, 1.7, 3.2), lookAt: new THREE.Vector3(0.7, 1.2, -0.5) },
    { section: '#contact', position: new THREE.Vector3(0, 1.5, 3.3), lookAt: new THREE.Vector3(0, 1.35, 0) },
  ];

  init(camera: THREE.PerspectiveCamera): void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.basePosition.copy(camera.position);

    this.keyframes.forEach((kf) => {
      const el = document.querySelector(kf.section);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => this.moveCamera(camera, kf, reducedMotion),
        onEnterBack: () => this.moveCamera(camera, kf, reducedMotion),
      });
      this.triggers.push(trigger);
    });
  }

  private moveCamera(
    camera: THREE.PerspectiveCamera,
    kf: CameraKeyframe,
    reducedMotion: boolean
  ): void {
    if (reducedMotion) {
      this.basePosition.copy(kf.position);
      camera.position.copy(kf.position).add(this.parallaxOffset);
      this.lookAtTarget.copy(kf.lookAt);
      camera.lookAt(this.lookAtTarget);
      return;
    }
    gsap.to(this.basePosition, {
      x: kf.position.x,
      y: kf.position.y,
      z: kf.position.z,
      duration: 1.6,
      ease: 'power2.inOut',
    });
    gsap.to(this.lookAtTarget, {
      x: kf.lookAt.x,
      y: kf.lookAt.y,
      z: kf.lookAt.z,
      duration: 1.6,
      ease: 'power2.inOut',
    });
  }

  /** Sets the desired mouse-parallax offset (small, subtle). */
  setParallaxTarget(nx: number, ny: number): void {
    this.parallaxTarget.set(nx * 0.3, ny * 0.18, 0);
  }

  /** Called every frame: blends base scroll position with parallax + look-at. */
  update(camera: THREE.PerspectiveCamera): void {
    this.parallaxOffset.lerp(this.parallaxTarget, 0.05);
    camera.position.copy(this.basePosition).add(this.parallaxOffset);
    camera.lookAt(this.lookAtTarget);
  }

  refresh(): void {
    ScrollTrigger.refresh();
  }

  dispose(): void {
    this.triggers.forEach((t) => t.kill());
    this.triggers = [];
  }
}
