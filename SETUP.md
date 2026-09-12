# Neeraj Kumar — 3D Portfolio (Angular 18 + Three.js)

A cinematic, scroll-driven 3D portfolio built with Angular 18 standalone
components, Three.js, and GSAP ScrollTrigger.

## 1. Add your assets

This project does **not** ship with a fake avatar. Drop your real files in:

```
public/assets/models/neeraj-avatar.glb     ← your rigged/animated GLB avatar
public/assets/resume/neeraj-kumar-resume.pdf
public/assets/og-image.jpg                 ← optional, for social share previews
```

Angular serves everything under `public/` at the site root, so
`public/assets/models/neeraj-avatar.glb` is fetched at runtime as
`assets/models/neeraj-avatar.glb` — this already matches the path hardcoded
in `avatar.service.ts`, so no code changes are needed once the file is in place.

If the GLB fails to load (missing file, bad path, network error), the site
does **not** break: the console logs the error, a small "avatar could not be
loaded" panel appears, and the rest of the 3D environment and all sections
keep working normally.

## 2. Install & run

```bash
npm install
npm start        # ng serve, http://localhost:4200
```

## 3. Production build

```bash
npm run build     # ng build --configuration production
```

Production builds can take noticeably longer than dev builds because of
Three.js/GSAP tree-shaking and minification — this is expected, just let it
finish. Output goes to `dist/neeraj-portfolio/browser`.

## Project structure

```
src/app/
  components/
    navbar/            floating glass nav, mobile hamburger
    loading-screen/     cinematic intro, real GLB load percentage
    three-scene/        canvas host — wires scene/avatar/scroll services together
    hero/                name, title, CTAs, floating tech chips (in 3D layer)
    about/               stats + glassmorphism cards
    skills/              14-card tech universe with 3D tilt on hover
    experience/          animated timeline
    projects/            5 project cards + project-modal for details
    contact/             email/GitHub/LinkedIn + footer
    custom-cursor/       desktop-only magnetic cursor
  services/
    three-scene.service.ts     renderer, camera, environment, particles, lifecycle
    avatar.service.ts          GLTFLoader, dynamic animation detection, mouse-follow
    animation.service.ts       reusable GSAP UI helpers (fade/stagger/tilt/magnetic)
    scroll-animation.service.ts GSAP ScrollTrigger camera choreography per section
  models/
    project.model.ts, skill.model.ts, experience.model.ts
```

## Notes on how the 3D avatar animation works

`AvatarService` never assumes clip names. It inspects `gltf.animations` at
runtime and matches clip names against keyword hints (`idle`, `wave`, `talk`,
`typ…`, `walk`) to pick a sensible role for each clip, defaulting to the
first clip if nothing matches. Whatever idle-like clip is found plays on
load; mouse movement subtly rotates the avatar and camera via
`THREE.MathUtils.lerp`, and GSAP ScrollTrigger repositions the camera as you
scroll through each section — no per-scene page reloads, it's one continuous
WebGL scene behind the HTML content.

## Performance & accessibility

- Pixel ratio capped, shadows/particles reduced on screens < 768px
- All Three.js geometries/materials/textures are disposed on destroy
- Custom cursor auto-disables on touch/coarse-pointer devices
- `prefers-reduced-motion` disables GSAP entrance/scroll motion and CSS
  transitions site-wide (see `styles.scss` and each service)
- Semantic HTML, labelled nav/buttons, keyboard-operable project cards and modal (Esc to close)
