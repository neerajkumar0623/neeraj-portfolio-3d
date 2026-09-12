import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';

/**
 * Owns the core Three.js primitives (scene, camera, renderer) plus the
 * futuristic developer-workspace environment (floor, fog, particles,
 * light beams, floating panels). Kept isolated from Angular UI logic.
 */
@Injectable({ providedIn: 'root' })
export class ThreeSceneService {
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  clock = new THREE.Clock();

  private canvas?: HTMLCanvasElement;
  private frameId = 0;
  private updateCallbacks: Array<(delta: number, elapsed: number) => void> = [];
  private isMobile = false;
  private particles?: THREE.Points;
  private floor?: THREE.Mesh;
  private running = false;

  private disposables: Array<THREE.BufferGeometry | THREE.Material | THREE.Texture> = [];

  constructor(private ngZone: NgZone) {}

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.isMobile = window.innerWidth < 768;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x05060a, this.isMobile ? 0.035 : 0.028);

    // Narrower FOV + closer distance = a flattering "portrait" framing
    // where the avatar fills most of the hero frame, instead of a small
    // full-body figure lost in a wide establishing shot.
    this.camera = new THREE.PerspectiveCamera(
      32,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 1.5, 3.1);
    this.camera.lookAt(0, 1.35, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !this.isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1.5 : 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this.buildEnvironment();
    this.buildLighting();
    this.buildFloatingTech();

    window.addEventListener('resize', this.handleResize);
  }

  /** Register a per-frame callback (e.g. avatar mixer update, parallax). */
  onUpdate(cb: (delta: number, elapsed: number) => void): void {
    this.updateCallbacks.push(cb);
  }

  removeUpdate(cb: (delta: number, elapsed: number) => void): void {
    this.updateCallbacks = this.updateCallbacks.filter((c) => c !== cb);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.ngZone.runOutsideAngular(() => this.loop());
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.frameId);
  }

  private loop = (): void => {
    if (!this.running) return;
    this.frameId = requestAnimationFrame(this.loop);
    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    if (this.particles) {
      this.particles.rotation.y = elapsed * 0.015;
    }

    for (const cb of this.updateCallbacks) cb(delta, elapsed);

    this.renderer.render(this.scene, this.camera);
  };

  private buildLighting(): void {
    const key = new THREE.DirectionalLight(0x8fb8ff, 2.2);
    key.position.set(3, 6, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(this.isMobile ? 512 : 2048, this.isMobile ? 512 : 2048);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 20;
    key.shadow.bias = -0.0015;
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0x6c5ce7, 1.4);
    rim.position.set(-4, 3, -3);
    this.scene.add(rim);

    const ambient = new THREE.AmbientLight(0x1c2030, 1.1);
    this.scene.add(ambient);

    const accent = new THREE.PointLight(0x00e5ff, 6, 12, 2);
    accent.position.set(0, 2.5, 2);
    this.scene.add(accent);

    // Soft vertical "light beams" behind the avatar
    const beamGeo = new THREE.PlaneGeometry(0.6, 8);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x3d5afe,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    });
    this.disposables.push(beamGeo, beamMat);
    for (let i = -2; i <= 2; i++) {
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(i * 1.6, 3, -4);
      beam.rotation.x = Math.PI / 10;
      this.scene.add(beam);
    }
  }

  private buildEnvironment(): void {
    // Grid floor
    const grid = new THREE.GridHelper(40, 60, 0x2a3a5c, 0x11151f);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.35;
    grid.position.y = -1.01;
    this.scene.add(grid);

    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x05060a,
      roughness: 0.85,
      metalness: 0.2,
    });
    this.disposables.push(floorGeo, floorMat);
    this.floor = new THREE.Mesh(floorGeo, floorMat);
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.y = -1.02;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);

    // Floating particles ("code dust")
    const count = this.isMobile ? 180 : 550;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 10 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x7ea8ff,
      size: 0.02,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    this.disposables.push(particleGeo, particleMat);
    this.particles = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particles);
  }

  private floatingTech: THREE.Sprite[] = [];

  /** Floating labelled tech chips orbiting near the avatar (hero focal area). */
  private buildFloatingTech(): void {
    const labels = ['Angular', 'Node.js', 'NestJS', 'TypeScript', 'AI', 'PostgreSQL', 'MongoDB'];
    const radius = this.isMobile ? 1.1 : 1.7;

    labels.forEach((label, i) => {
      const angle = (i / labels.length) * Math.PI * 2;
      const sprite = this.makeLabelSprite(label);
      sprite.position.set(
        Math.cos(angle) * radius,
        1.4 + Math.sin(i * 1.7) * 0.9,
        Math.sin(angle) * radius - 1
      );
      sprite.userData['baseY'] = sprite.position.y;
      sprite.userData['phase'] = i;
      this.scene.add(sprite);
      this.floatingTech.push(sprite);
    });

    this.onUpdate((_delta, elapsed) => {
      this.floatingTech.forEach((s) => {
        const phase = s.userData['phase'];
        s.position.y = s.userData['baseY'] + Math.sin(elapsed * 0.6 + phase) * 0.12;
      });
    });
  }

  private makeLabelSprite(text: string): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 96;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const radius = 20;
    ctx.fillStyle = 'rgba(14, 18, 32, 0.55)';
    ctx.strokeStyle = 'rgba(120, 170, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(4, 20, canvas.width - 8, canvas.height - 40, radius);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#e8eeff';
    ctx.font = '600 34px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    this.disposables.push(texture);

    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    this.disposables.push(material);
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(1.1, 0.42, 1);
    return sprite;
  }

  private handleResize = (): void => {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2)
    );
  };

  dispose(): void {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    this.updateCallbacks = [];

    this.scene?.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if ((mesh as any).geometry) (mesh as any).geometry.dispose?.();
      const mat = (mesh as any).material;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose?.());
      else mat?.dispose?.();
    });

    this.disposables.forEach((d) => (d as any).dispose?.());
    this.disposables = [];
    this.renderer?.dispose();
  }

  get mobile(): boolean {
    return this.isMobile;
  }
}
