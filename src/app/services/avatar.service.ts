import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export interface AvatarLoadResult {
  model: THREE.Group;
  mixer: THREE.AnimationMixer | null;
  clips: THREE.AnimationClip[];
}

const MODEL_PATH = 'assets/models/neerajavatar.glb';

// Keywords used to *guess* a semantic role for a clip without assuming
// exact names — the GLB's real clip names are inspected at runtime.
const IDLE_HINTS = ['idle', 'breath', 'stand', 'rest'];
const WAVE_HINTS = ['wave', 'hello', 'greet'];
const TALK_HINTS = ['talk', 'speak'];
const TYPE_HINTS = ['typ', 'keyboard'];
const WALK_HINTS = ['walk', 'run'];

@Injectable({ providedIn: 'root' })
export class AvatarService {
  model: THREE.Group | null = null;
  mixer: THREE.AnimationMixer | null = null;
  clips: THREE.AnimationClip[] = [];
  currentAction: THREE.AnimationAction | null = null;

  /** Target rotation the render loop lerps the avatar's head/body toward. */
  private targetYaw = 0;
  private currentYaw = 0;
  private targetPitch = 0;
  private currentPitch = 0;
  private headBone: THREE.Object3D | null = null;

  async load(scene: THREE.Scene, isMobile: boolean): Promise<AvatarLoadResult> {
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(draco);

    return new Promise((resolve, reject) => {
      loader.load(
        MODEL_PATH,
        (gltf: GLTF) => {
          const model = gltf.scene;
          model.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) {
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (mat && !isMobile) mat.envMapIntensity = 1;
            }
            // Try to find a head bone for subtle look-at movement.
            if (/head/i.test(child.name) && !this.headBone) {
              this.headBone = child;
            }
          });

          // Normalize scale & position: fit the model to a consistent height.
          const box = new THREE.Box3().setFromObject(model);
          const size = new THREE.Vector3();
          box.getSize(size);
          const targetHeight = 1.75;
          const scale = size.y > 0 ? targetHeight / size.y : 1;
          model.scale.setScalar(scale);

          const box2 = new THREE.Box3().setFromObject(model);
          const center = new THREE.Vector3();
          box2.getCenter(center);
          model.position.x -= center.x;
          model.position.z -= center.z;
          model.position.y -= box2.min.y; // sit exactly on the floor (y = -1 in scene, offset below)
          model.position.y -= 1;

          scene.add(model);
          this.model = model;

          this.clips = gltf.animations ?? [];
          if (this.clips.length > 0) {
            this.mixer = new THREE.AnimationMixer(model);
            const idleClip = this.findClip(IDLE_HINTS) ?? this.clips[0];
            this.playClip(idleClip, true);
          }

          resolve({ model, mixer: this.mixer, clips: this.clips });
        },
        undefined,
        (err) => reject(err)
      );
    });
  }

  /** Dynamically locate a clip by matching keyword hints against its name. */
  private findClip(hints: string[]): THREE.AnimationClip | undefined {
    return this.clips.find((clip) =>
      hints.some((h) => clip.name.toLowerCase().includes(h))
    );
  }

  playByRole(role: 'idle' | 'wave' | 'talk' | 'typing' | 'walk'): void {
    const map: Record<string, string[]> = {
      idle: IDLE_HINTS,
      wave: WAVE_HINTS,
      talk: TALK_HINTS,
      typing: TYPE_HINTS,
      walk: WALK_HINTS,
    };
    const clip = this.findClip(map[role]);
    if (clip) this.playClip(clip, role === 'idle');
  }

  playClip(clip: THREE.AnimationClip, loop = true): void {
    if (!this.mixer) return;
    const nextAction = this.mixer.clipAction(clip);
    nextAction.reset();
    nextAction.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity);
    nextAction.clampWhenFinished = !loop;
    nextAction.fadeIn(0.5);
    nextAction.play();

    if (this.currentAction && this.currentAction !== nextAction) {
      this.currentAction.fadeOut(0.5);
    }
    this.currentAction = nextAction;

    if (!loop) {
      const onFinished = () => {
        this.mixer?.removeEventListener('finished', onFinished);
        const idle = this.findClip(IDLE_HINTS);
        if (idle) this.playClip(idle, true);
      };
      this.mixer.addEventListener('finished', onFinished);
    }
  }

  /** Called from the pointer-move handler with normalized (-1..1) coordinates. */
  setPointerTarget(nx: number, ny: number): void {
    this.targetYaw = THREE.MathUtils.clamp(nx, -1, 1) * 0.35;
    this.targetPitch = THREE.MathUtils.clamp(ny, -1, 1) * 0.12;
  }

  /** Called every frame to smoothly interpolate the avatar toward the cursor. */
  update(delta: number): void {
    this.mixer?.update(delta);
    if (!this.model) return;

    this.currentYaw = THREE.MathUtils.lerp(this.currentYaw, this.targetYaw, 0.06);
    this.currentPitch = THREE.MathUtils.lerp(this.currentPitch, this.targetPitch, 0.06);

    this.model.rotation.y = this.currentYaw;
    if (this.headBone) {
      this.headBone.rotation.x = -this.currentPitch * 0.5;
    }
  }

  dispose(): void {
    this.mixer?.stopAllAction();
    this.mixer = null;
    this.model = null;
    this.clips = [];
    this.currentAction = null;
    this.headBone = null;
  }
}
