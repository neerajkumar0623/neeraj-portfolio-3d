import { Component, signal, AfterViewInit, ElementRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GsapAnimationService } from '../../services/gsap-animation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="section contact-section">
      <div class="section-header">
        <span class="section__eyebrow">
          <span>&bull;</span> GET IN TOUCH
        </span>
        <h2 class="section__title">
          Let's Build <span class="section__title--gradient">Something Amazing</span>
        </h2>
        <p class="section__subtitle">
          Have an idea, project or product in mind? Let's turn it into something real.
        </p>
      </div>

      <div class="contact-layout">
        <!-- Left Side: Direct Contact Channels & Availability Status -->
        <div class="contact-info-col">
          <div class="glass-panel contact-meta-card">
            <h3 class="meta-heading">Connect Directly</h3>
            <p class="meta-desc">
              Feel free to reach out directly via email or social platforms for consulting, full-stack architecture, or full-time opportunities.
            </p>

            <!-- Channels List -->
            <div class="channels-list">
              <!-- Email Card -->
              <a 
                href="mailto:neeraj.developer.contact@gmail.com" 
                class="channel-item"
              >
                <div class="channel-icon-box">
                  <span>&#9993;</span>
                </div>
                <div class="channel-details">
                  <span class="channel-title">Email</span>
                  <span class="channel-val">neeraj.developer.contact&#64;gmail.com</span>
                </div>
                <span class="channel-arrow">&rarr;</span>
              </a>

              <!-- LinkedIn Card -->
              <a 
                href="https://linkedin.com/in/neeraj-kumar-dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="channel-item"
              >
                <div class="channel-icon-box">
                  <i class="devicon-linkedin-plain"></i>
                </div>
                <div class="channel-details">
                  <span class="channel-title">LinkedIn</span>
                  <span class="channel-val">linkedin.com/in/neeraj-kumar-dev</span>
                </div>
                <span class="channel-arrow">&nearr;</span>
              </a>

              <!-- GitHub Card -->
              <a 
                href="https://github.com/Neerajkumar55" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="channel-item"
              >
                <div class="channel-icon-box">
                  <i class="devicon-github-original"></i>
                </div>
                <div class="channel-details">
                  <span class="channel-title">GitHub</span>
                  <span class="channel-val">github.com/Neerajkumar55</span>
                </div>
                <span class="channel-arrow">&nearr;</span>
              </a>
            </div>

            <!-- Availability Radar Card -->
            <div class="availability-status-card">
              <div class="avail-header">
                <span class="avail-pulse"></span>
                <span class="avail-title">CURRENT AVAILABILITY</span>
              </div>
              <p class="avail-text">
                Accepting select high-impact freelance projects, technical consulting, and senior engineering roles.
              </p>
              <div class="avail-badge">
                <span>Response time &lt; 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Interactive Validated Contact Form -->
        <div class="contact-form-col">
          <div class="glass-panel contact-form-card">
            <h3 class="form-title">Send a Direct Message</h3>
            
            <!-- Success Notification Alert -->
            <div *ngIf="submitSuccess()" class="alert-success">
              <span class="alert-icon">&#10003;</span>
              <div>
                <strong>Message Dispatched Successfully!</strong>
                <p>Thank you for reaching out, Neeraj will get back to you shortly.</p>
              </div>
            </div>

            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form" novalidate>
              <!-- Name & Email Row -->
              <div class="form-row">
                <div class="form-group">
                  <label for="name" class="form-label">Your Name <span class="required">*</span></label>
                  <input 
                    id="name"
                    type="text" 
                    class="form-control"
                    [class.form-control--error]="isFieldInvalid('name')"
                    placeholder="e.g. Alex Mercer"
                    formControlName="name"
                  />
                  <span *ngIf="isFieldInvalid('name')" class="field-error">
                    Please provide your name.
                  </span>
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email Address <span class="required">*</span></label>
                  <input 
                    id="email"
                    type="email" 
                    class="form-control"
                    [class.form-control--error]="isFieldInvalid('email')"
                    placeholder="e.g. alex@enterprise.com"
                    formControlName="email"
                  />
                  <span *ngIf="isFieldInvalid('email')" class="field-error">
                    Valid email address is required.
                  </span>
                </div>
              </div>

              <!-- Subject -->
              <div class="form-group">
                <label for="subject" class="form-label">Subject <span class="required">*</span></label>
                <input 
                  id="subject"
                  type="text" 
                  class="form-control"
                  [class.form-control--error]="isFieldInvalid('subject')"
                  placeholder="e.g. MEAN Stack / AI Product Development"
                  formControlName="subject"
                />
                <span *ngIf="isFieldInvalid('subject')" class="field-error">
                  Please specify a subject.
                </span>
              </div>

              <!-- Message -->
              <div class="form-group">
                <label for="message" class="form-label">Message <span class="required">*</span></label>
                <textarea 
                  id="message"
                  rows="5" 
                  class="form-control"
                  [class.form-control--error]="isFieldInvalid('message')"
                  placeholder="Tell me about your project scope, timeline, goals, and technical requirements..."
                  formControlName="message"
                ></textarea>
                <span *ngIf="isFieldInvalid('message')" class="field-error">
                  Message must contain at least 15 characters.
                </span>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="btn btn--primary submit-btn"
                [disabled]="isSubmitting()"
              >
                <span *ngIf="!isSubmitting()">Send Message</span>
                <span *ngIf="isSubmitting()">Dispatching Message...</span>
                <span class="btn-arrow" *ngIf="!isSubmitting()">&rarr;</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      position: relative;
    }

    .contact-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;

      @media (min-width: 1024px) {
        grid-template-columns: 0.9fr 1.1fr;
        gap: 3rem;
      }
    }

    /* Meta Left Card */
    .contact-meta-card {
      padding: 2.5rem 2rem;
      height: 100%;
      display: flex;
      flex-direction: column;

      @media (max-width: 600px) {
        padding: 1.75rem 1.25rem;
      }
    }

    .meta-heading {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.5rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 0.65rem;
    }

    .meta-desc {
      font-size: 0.92rem;
      color: #94a3b8;
      line-height: 1.7;
      margin: 0 0 2rem;
    }

    .channels-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .channel-item {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1rem 1.25rem;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      text-decoration: none;
      color: inherit;
      transition: all 0.25s ease;

      &:hover {
        background: rgba(0, 242, 254, 0.06);
        border-color: rgba(0, 242, 254, 0.4);
        transform: translateX(4px);

        .channel-icon-box {
          color: #00f2fe;
          border-color: #00f2fe;
        }

        .channel-arrow {
          color: #00f2fe;
          transform: translateX(3px);
        }
      }
    }

    .channel-icon-box {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      color: #cbd5e1;
      transition: all 0.25s ease;
      flex-shrink: 0;
    }

    .channel-details {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow: hidden;
    }

    .channel-title {
      font-family: var(--font-mono, monospace);
      font-size: 0.72rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .channel-val {
      font-size: 0.88rem;
      font-weight: 600;
      color: #f1f5f9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .channel-arrow {
      color: #64748b;
      font-size: 1.2rem;
      transition: all 0.2s ease;
    }

    /* Availability Status */
    .availability-status-card {
      margin-top: auto;
      padding: 1.5rem;
      border-radius: 16px;
      background: rgba(16, 185, 129, 0.05);
      border: 1px solid rgba(16, 185, 129, 0.25);
    }

    .avail-header {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 0.5rem;
    }

    .avail-pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 10px #10b981;
      animation: ping 2s infinite;
    }

    .avail-title {
      font-family: var(--font-mono, monospace);
      font-size: 0.72rem;
      font-weight: 700;
      color: #10b981;
      letter-spacing: 0.1em;
    }

    .avail-text {
      font-size: 0.85rem;
      color: #cbd5e1;
      line-height: 1.55;
      margin: 0 0 0.85rem;
    }

    .avail-badge {
      display: inline-block;
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      color: #a7f3d0;
    }

    /* Form Right Card */
    .contact-form-card {
      padding: 2.5rem 2rem;

      @media (max-width: 600px) {
        padding: 1.75rem 1.25rem;
      }
    }

    .form-title {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.5rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 1.5rem;
    }

    .alert-success {
      display: flex;
      align-items: flex-start;
      gap: 0.85rem;
      padding: 1rem 1.25rem;
      border-radius: 12px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #a7f3d0;
      margin-bottom: 1.75rem;

      .alert-icon {
        background: #10b981;
        color: #050811;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
      }

      strong {
        display: block;
        color: #fff;
        margin-bottom: 0.2rem;
      }

      p {
        margin: 0;
        font-size: 0.85rem;
      }
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;

      @media (min-width: 600px) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .form-label {
      font-family: var(--font-sans, sans-serif);
      font-size: 0.82rem;
      font-weight: 600;
      color: #cbd5e1;

      .required {
        color: #f87171;
      }
    }

    .form-control {
      width: 100%;
      padding: 0.85rem 1.1rem;
      border-radius: 10px;
      background: rgba(13, 20, 38, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #f8fafc;
      font-family: var(--font-sans, sans-serif);
      font-size: 0.9rem;
      transition: all 0.25s ease;

      &::placeholder {
        color: #475569;
      }

      &:focus {
        outline: none;
        border-color: #00f2fe;
        box-shadow: 0 0 15px rgba(0, 242, 254, 0.25);
        background: rgba(15, 23, 42, 0.95);
      }

      &--error {
        border-color: #ef4444 !important;
      }
    }

    textarea.form-control {
      resize: vertical;
      min-height: 120px;
    }

    .field-error {
      font-family: var(--font-mono, monospace);
      font-size: 0.72rem;
      color: #f87171;
    }

    .submit-btn {
      margin-top: 0.5rem;
      padding: 0.95rem 2rem;
      width: 100%;
      font-size: 0.95rem;

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  `]
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  private animationService = inject(GsapAnimationService);
  private elementRef = inject(ElementRef);
  contactForm: FormGroup;
  isSubmitting = signal(false);
  submitSuccess = signal(false);

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(15)]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
      this.contactForm.reset();

      setTimeout(() => {
        this.submitSuccess.set(false);
      }, 7000);
    }, 1000);
  }

  ngAfterViewInit(): void {
    // Initialize GSAP animations after view is ready
    this.initAnimations();
  }

  /**
   * Initialize premium GSAP animations for contact section
   * - Section header reveal
   * - Contact info card fade-up
   * - Channel items stagger animation
   * - Contact form card fade-up with scale effect
   */
  private initAnimations(): void {
    if (this.animationService.shouldDisableAnimations()) return;

    const nativeElement = this.elementRef.nativeElement;
    const context = this.animationService.createContext(nativeElement);

    context.add(() => {
      // Section header reveal
      const sectionHeader = nativeElement.querySelector('.section-header');
      if (sectionHeader) {
        this.animationService.fadeUp(sectionHeader, {
          scrollTrigger: true,
          duration: 0.8,
          y: 40
        });
      }

      // Contact info card fade-up
      const contactMetaCard = nativeElement.querySelector('.contact-meta-card');
      if (contactMetaCard) {
        this.animationService.fadeUp(contactMetaCard, {
          scrollTrigger: true,
          delay: 0.2,
          duration: 0.8,
          y: 50
        });
      }

      // Channel items stagger animation
      const channelItems = nativeElement.querySelectorAll('.channel-item');
      if (channelItems.length > 0) {
        this.animationService.staggerFadeUp(channelItems, {
          scrollTrigger: true,
          delay: 0.4,
          duration: 0.5,
          y: 30,
          stagger: 0.1
        });
      }

      // Availability status card fade-in
      const availabilityCard = nativeElement.querySelector('.availability-status-card');
      if (availabilityCard) {
        this.animationService.fadeIn(availabilityCard, {
          scrollTrigger: true,
          delay: 0.6,
          duration: 0.6
        });
      }

      // Contact form card fade-up with scale effect
      const contactFormCard = nativeElement.querySelector('.contact-form-card');
      if (contactFormCard) {
        this.animationService.scaleIn(contactFormCard, {
          scrollTrigger: true,
          delay: 0.3,
          duration: 0.8,
          scale: 0.95
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup GSAP animations
    this.animationService.cleanup();
  }
}
