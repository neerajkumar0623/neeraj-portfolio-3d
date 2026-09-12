import { Component, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="three-container" aria-hidden="true">
      <canvas #bgCanvas class="three-canvas"></canvas>
      <div class="ambient-vignette"></div>
    </div>
  `,
  styles: [`
    .three-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .three-canvas {
      width: 100%;
      height: 100%;
      display: block;
      opacity: 0.85;
    }

    .ambient-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 50%, transparent 40%, #050811 100%);
      pointer-events: none;
    }
  `]
})
export class ThreeSceneComponent implements OnInit, OnDestroy {
  @ViewChild('bgCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Output() progress = new EventEmitter<number>();
  @Output() ready = new EventEmitter<void>();
  @Output() avatarFailed = new EventEmitter<void>();

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private rafId = 0;
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.initThree();
      window.addEventListener('resize', this.onWindowResize);
      window.addEventListener('mousemove', this.onMouseMove);
    }
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050811, 0.018);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Particle Constellation
    const count = window.innerWidth < 768 ? 400 : 900;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color(0x00f2fe);
    const purple = new THREE.Color(0x8b5cf6);
    const blue = new THREE.Color(0x3b82f6);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;

      const choice = Math.random();
      const col = choice < 0.5 ? cyan : choice < 0.8 ? purple : blue;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Initial signal to parent
    this.progress.emit(100);
    this.ready.emit();

    this.ngZone.runOutsideAngular(() => this.animate());
  }

  private onMouseMove = (e: MouseEvent): void => {
    this.targetMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
    this.targetMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
  };

  private animate = (): void => {
    this.rafId = requestAnimationFrame(this.animate);

    // Smooth mouse inertia
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    this.particles.rotation.y += 0.0004;
    this.particles.rotation.x += 0.0002;

    this.camera.position.x = this.mouseX;
    this.camera.position.y = -this.mouseY;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  };

  private onWindowResize = (): void => {
    if (!this.camera || !this.renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onWindowResize);
      window.removeEventListener('mousemove', this.onMouseMove);
    }
    this.renderer?.dispose();
  }
}
