import { Component, AfterViewInit, ElementRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsapAnimationService } from '../../services/gsap-animation.service';

interface AiCapability {
  title: string;
  icon: string;
  badge: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-ai-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="ai" class="section ai-section">
      <div class="ai-ambient-glow"></div>

      <div class="section-header">
        <span class="section__eyebrow">
          <span>&bull;</span> NEXT-GEN SPECIALIZATION
        </span>
        <h2 class="section__title">
          Building With <span class="section__title--gradient">AI</span>
        </h2>
        <p class="section__subtitle">
          Bridging the frontier of full-stack engineering with generative AI, autonomous agentic loops, multimodal models, and custom RAG pipelines.
        </p>
      </div>

      <!-- Main AI Visual Grid: Interactive Neural Core + Capabilities Grid -->
      <div class="ai-interactive-layout">
        <!-- AI Core Neural Visualizer -->
        <div class="glass-panel ai-core-container">
          <div class="core-header">
            <div class="core-status">
              <span class="status-dot"></span>
              <span>NEURAL CORE ENGINE v3.5 &bull; ONLINE</span>
            </div>
            <span class="core-meta">LATENCY &lt; 90ms</span>
          </div>

          <!-- Futuristic AI Orb with Orbiting Satellites -->
          <div class="neural-visual-stage">
            <div class="orbit-ring orbit-ring--outer"></div>
            <div class="orbit-ring orbit-ring--middle"></div>
            <div class="orbit-ring orbit-ring--inner"></div>

            <!-- Central Glowing Core -->
            <div class="neural-core-orb">
              <div class="core-pulse-1"></div>
              <div class="core-pulse-2"></div>
              <div class="core-center">
                <span class="core-glyph">&#10022;</span>
                <span class="core-title">AI CORE</span>
              </div>
            </div>

            <!-- Orbiting Satellite Nodes -->
            <div class="orbit-node node--openai">
              <i class="devicon-python-plain colored"></i>
              <span>OpenAI GPT-4o</span>
            </div>

            <div class="orbit-node node--gemini">
              <i class="devicon-google-plain colored"></i>
              <span>Gemini 1.5 Pro</span>
            </div>

            <div class="orbit-node node--rag">
              <i class="devicon-postgresql-plain colored"></i>
              <span>pgvector RAG</span>
            </div>

            <div class="orbit-node node--agents">
              <i class="devicon-networkx-original"></i>
              <span>Autonomous Agents</span>
            </div>
          </div>

          <!-- Bottom Live Stream Console -->
          <div class="core-console">
            <span class="console-prompt">&gt;</span>
            <span class="console-text">Model Router: Dynamic routing between Gemini (deep synthesis) &amp; GPT-4o (structured JSON schemas)</span>
          </div>
        </div>

        <!-- AI Capabilities Cards Grid -->
        <div class="ai-capabilities-grid">
          <div *ngFor="let cap of capabilities" class="glass-panel capability-card">
            <div class="cap-header">
              <span class="cap-icon-box">
                <i [class]="cap.icon"></i>
              </span>
              <span class="cap-badge">{{ cap.badge }}</span>
            </div>
            <h3 class="cap-title">{{ cap.title }}</h3>
            <p class="cap-desc">{{ cap.description }}</p>
            <div class="cap-tags">
              <span *ngFor="let tag of cap.tags" class="tech-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .ai-section {
      position: relative;
    }

    .ai-ambient-glow {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 700px;
      height: 700px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0, 242, 254, 0.08) 50%, transparent 70%);
      filter: blur(100px);
      pointer-events: none;
      z-index: 1;
    }

    .ai-interactive-layout {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;

      @media (min-width: 1024px) {
        grid-template-columns: 0.9fr 1.1fr;
        gap: 3rem;
        align-items: center;
      }
    }

    /* Core Container */
    .ai-core-container {
      padding: 0;
      display: flex;
      flex-direction: column;
      border-color: rgba(139, 92, 246, 0.3);
      box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.8),
                  0 0 30px rgba(139, 92, 246, 0.15);
    }

    .core-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      background: rgba(8, 12, 24, 0.9);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-family: var(--font-mono, monospace);
      font-size: 0.72rem;
    }

    .core-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #00f2fe;

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #00f2fe;
        box-shadow: 0 0 8px #00f2fe;
        animation: pulse 2s infinite;
      }
    }

    .core-meta {
      color: #64748b;
    }

    /* Neural Stage */
    .neural-visual-stage {
      position: relative;
      width: 100%;
      height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: radial-gradient(circle at center, rgba(13, 20, 38, 0.9) 0%, rgba(5, 8, 17, 0.98) 100%);
    }

    /* Concentric Orbit Rings */
    .orbit-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px dashed rgba(0, 242, 254, 0.2);
      pointer-events: none;

      &--inner {
        width: 180px;
        height: 180px;
        border-color: rgba(139, 92, 246, 0.35);
        animation: rotateClockwise 25s linear infinite;
      }
      &--middle {
        width: 260px;
        height: 260px;
        border-color: rgba(0, 242, 254, 0.2);
        animation: rotateCounter 35s linear infinite;
      }
      &--outer {
        width: 340px;
        height: 340px;
        border-color: rgba(255, 255, 255, 0.08);
        animation: rotateClockwise 45s linear infinite;
      }
    }

    @keyframes rotateClockwise {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes rotateCounter {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }

    /* Central Glowing Orb */
    .neural-core-orb {
      position: relative;
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
    }

    .core-pulse-1,
    .core-pulse-2 {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 242, 254, 0.4) 0%, rgba(139, 92, 246, 0.2) 60%, transparent 80%);
      filter: blur(12px);
      animation: pulseOrb 3s ease-in-out infinite alternate;
    }

    .core-pulse-2 {
      animation-delay: 1.5s;
    }

    @keyframes pulseOrb {
      0% { transform: scale(0.85); opacity: 0.5; }
      100% { transform: scale(1.35); opacity: 0.9; }
    }

    .core-center {
      position: relative;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0f172a, #1e1b4b);
      border: 1.5px solid #00f2fe;
      box-shadow: 0 0 25px rgba(0, 242, 254, 0.6), inset 0 0 15px rgba(139, 92, 246, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 6;

      .core-glyph {
        color: #00f2fe;
        font-size: 1.2rem;
        line-height: 1;
      }

      .core-title {
        font-family: var(--font-mono, monospace);
        font-size: 0.58rem;
        font-weight: 700;
        color: #fff;
        letter-spacing: 0.08em;
      }
    }

    /* Orbiting Nodes */
    .orbit-node {
      position: absolute;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.4rem 0.75rem;
      border-radius: 999px;
      background: rgba(13, 20, 38, 0.85);
      border: 1px solid rgba(0, 242, 254, 0.3);
      backdrop-filter: blur(8px);
      font-family: var(--font-mono, monospace);
      font-size: 0.72rem;
      color: #e2e8f0;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
      z-index: 10;
      transition: all 0.3s ease;

      &:hover {
        border-color: #00f2fe;
        box-shadow: 0 0 20px rgba(0, 242, 254, 0.5);
      }

      &.node--openai {
        top: 35px;
        left: 45px;
      }
      &.node--gemini {
        top: 45px;
        right: 40px;
      }
      &.node--rag {
        bottom: 50px;
        left: 40px;
      }
      &.node--agents {
        bottom: 40px;
        right: 45px;
      }
    }

    .core-console {
      padding: 0.85rem 1.25rem;
      background: rgba(5, 8, 17, 0.95);
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #94a3b8;

      .console-prompt {
        color: #00f2fe;
        font-weight: bold;
      }
    }

    /* Capabilities Grid */
    .ai-capabilities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.25rem;
    }

    .capability-card {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      transition: transform 0.35s ease, border-color 0.35s ease;

      &:hover {
        transform: translateY(-4px);
        border-color: rgba(139, 92, 246, 0.5);
      }
    }

    .cap-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.85rem;
    }

    .cap-icon-box {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(139, 92, 246, 0.12);
      border: 1px solid rgba(139, 92, 246, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      color: #c084fc;
    }

    .cap-badge {
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      color: #00f2fe;
      letter-spacing: 0.08em;
    }

    .cap-title {
      font-family: var(--font-heading, sans-serif);
      font-size: 1.15rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 0.5rem;
    }

    .cap-desc {
      font-size: 0.85rem;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0 0 1rem;
    }

    .cap-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-top: auto;
    }
  `]
})
export class AiSectionComponent implements AfterViewInit, OnDestroy {
  private animationService = inject(GsapAnimationService);
  private elementRef = inject(ElementRef);
  capabilities: AiCapability[] = [
    {
      title: 'LLM API Integrations',
      icon: 'devicon-python-plain colored',
      badge: 'MULTI-ENGINE',
      description: 'Streaming token APIs, function calling, tool use, and structured JSON schema enforcement with OpenAI GPT-4o and Gemini 1.5 Pro.',
      tags: ['GPT-4o', 'Gemini 1.5', 'Streaming', 'Tool Calling']
    },
    {
      title: 'RAG & Vector Retrieval',
      icon: 'devicon-postgresql-plain colored',
      badge: 'SEMANTIC MEMORY',
      description: 'Document indexing with vector embeddings (pgvector), hybrid keyword + semantic search, and hallucination reduction guards.',
      tags: ['pgvector', 'Cosine Similarity', 'Chunking', 'Embeddings']
    },
    {
      title: 'Prompt Engineering & Evals',
      icon: 'devicon-markdown-original',
      badge: 'DETERMINISTIC',
      description: 'System prompt architecture, few-shot conditioning, chain-of-thought synthesis, token budget cost optimization, and test evals.',
      tags: ['Few-Shot', 'Chain-of-Thought', 'Cost Pruning', 'Evals']
    },
    {
      title: 'Autonomous AI Agents',
      icon: 'devicon-networkx-original',
      badge: 'AGENTIC WORKFLOWS',
      description: 'Multi-agent orchestration loops executing complex workflows, data scraping, code validation, and automated webhook dispatching.',
      tags: ['Agent Loops', 'Self-Correction', 'Webhooks', 'State Graphs']
    }
  ];

  ngAfterViewInit(): void {
    // Initialize GSAP animations after view is ready
    this.initAnimations();
  }

  /**
   * Initialize premium GSAP animations for AI section
   * - Section header reveal
   * - AI core container scale-in
   * - Orbit nodes stagger animation
   * - Capability cards stagger animation
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

      // AI core container scale-in
      const aiCoreContainer = nativeElement.querySelector('.ai-core-container');
      if (aiCoreContainer) {
        this.animationService.scaleIn(aiCoreContainer, {
          scrollTrigger: true,
          delay: 0.2,
          duration: 0.8,
          scale: 0.95
        });
      }

      // Orbit nodes stagger animation
      const orbitNodes = nativeElement.querySelectorAll('.orbit-node');
      if (orbitNodes.length > 0) {
        this.animationService.staggerFadeUp(orbitNodes, {
          scrollTrigger: true,
          delay: 0.4,
          duration: 0.6,
          y: 30,
          stagger: 0.15
        });
      }

      // Capability cards stagger animation
      const capabilityCards = nativeElement.querySelectorAll('.capability-card');
      if (capabilityCards.length > 0) {
        this.animationService.staggerFadeUp(capabilityCards, {
          scrollTrigger: true,
          delay: 0.3,
          duration: 0.6,
          y: 40,
          stagger: 0.12
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup GSAP animations
    this.animationService.cleanup();
  }
}
