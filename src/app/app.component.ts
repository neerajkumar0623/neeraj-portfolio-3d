import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { ThreeSceneComponent } from './components/three-scene/three-scene.component';
import { MobileWarningComponent } from './components/mobile-warning/mobile-warning.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AiSectionComponent } from './components/ai-section/ai-section.component';
import { ServicesComponent } from './components/services/services.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoadingScreenComponent,
    ThreeSceneComponent,
    MobileWarningComponent,
    NavbarComponent,
    CustomCursorComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    AiSectionComponent,
    ServicesComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loadProgress = 0;
  sceneReady = true;

  onProgress(value: number): void {
    this.loadProgress = value;
  }

  onSceneReady(): void {
    this.sceneReady = true;
  }
}
