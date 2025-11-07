// Minimal Professional Background Animation System
class MinimalBackground {
  constructor() {
    this.mouseGlow = null;
    this.particles = [];
    this.maxParticles = 8;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isActive = false;
    
    this.init();
  }
  
  init() {
    // Only run if animations are supported
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('Reduced motion detected, using static background');
      this.createStaticBackground();
      return;
    }
    
    this.createBackgroundElements();
    this.createMouseGlow();
    this.createParticles();
    this.bindEvents();
    
    console.log('Minimal background animation initialized');
  }
  
  createStaticBackground() {
    // Create a simple static dark background for reduced motion
    const staticBg = document.createElement('div');
    staticBg.className = 'minimal-dark-bg';
    staticBg.style.background = '#0a0a0a';
    document.body.appendChild(staticBg);
  }
  
  createBackgroundElements() {
    // Create dark background
    const darkBg = document.createElement('div');
    darkBg.className = 'minimal-dark-bg';
    document.body.appendChild(darkBg);
    
    // Create subtle grid
    const grid = document.createElement('div');
    grid.className = 'minimal-grid';
    document.body.appendChild(grid);
    
    // Create floating dots
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement('div');
      dot.className = 'minimal-dot';
      document.body.appendChild(dot);
    }
    
    // Create glow lines
    for (let i = 0; i < 3; i++) {
      const line = document.createElement('div');
      line.className = 'minimal-line';
      document.body.appendChild(line);
    }
    
    // Create breathing glows
    for (let i = 1; i <= 3; i++) {
      const glow = document.createElement('div');
      glow.className = `minimal-glow minimal-glow-${i}`;
      document.body.appendChild(glow);
    }
    
    // Create scan lines
    const scanlines = document.createElement('div');
    scanlines.className = 'minimal-scanlines';
    document.body.appendChild(scanlines);
    
    // Create vignette
    const vignette = document.createElement('div');
    vignette.className = 'minimal-vignette';
    document.body.appendChild(vignette);
    
    // Create corner accents
    const corners = ['tl', 'tr', 'bl', 'br'];
    corners.forEach(corner => {
      const cornerEl = document.createElement('div');
      cornerEl.className = `minimal-corner minimal-corner-${corner}`;
      document.body.appendChild(cornerEl);
    });
  }
  
  createMouseGlow() {
    if (window.matchMedia('(hover: hover)').matches) {
      this.mouseGlow = document.createElement('div');
      this.mouseGlow.className = 'minimal-mouse-glow';
      document.body.appendChild(this.mouseGlow);
    }
  }
  
  createParticles() {
    for (let i = 0; i < this.maxParticles; i++) {
      setTimeout(() => {
        this.createParticle();
      }, i * 2000); // Stagger particle creation more
    }
  }
  
  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'minimal-particle';
    
    // Random horizontal position
    const startX = Math.random() * window.innerWidth;
    particle.style.left = startX + 'px';
    particle.style.bottom = '-5px';
    
    // Random animation duration (slower for minimal effect)
    const duration = 25 + Math.random() * 15;
    particle.style.animationDuration = duration + 's';
    
    // Random color variation
    const colors = [
      'rgba(168, 85, 247, 0.4)',
      'rgba(236, 72, 153, 0.3)',
      'rgba(139, 92, 246, 0.35)'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
      // Create new particle to maintain count
      setTimeout(() => {
        this.createParticle();
      }, Math.random() * 5000); // Random delay before next particle
    }, duration * 1000);
  }
  
  bindEvents() {
    if (!this.mouseGlow) return;
    
    // Mouse move for subtle glow
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      this.updateMouseGlow();
    });
    
    // Mouse enter/leave
    document.addEventListener('mouseenter', () => {
      this.activateMouseGlow();
    });
    
    document.addEventListener('mouseleave', () => {
      this.deactivateMouseGlow();
    });
    
    // Scroll effects (very subtle)
    window.addEventListener('scroll', () => {
      this.updateScrollEffects();
    });
    
    // Focus effects for accessibility
    document.addEventListener('focusin', (e) => {
      this.highlightFocusedElement(e.target);
    });
    
    document.addEventListener('focusout', () => {
      this.removeFocusHighlight();
    });
  }
  
  updateMouseGlow() {
    if (this.mouseGlow) {
      this.mouseGlow.style.left = this.mouseX - 100 + 'px';
      this.mouseGlow.style.top = this.mouseY - 100 + 'px';
    }
  }
  
  activateMouseGlow() {
    if (this.mouseGlow) {
      this.mouseGlow.classList.add('active');
      this.isActive = true;
    }
  }
  
  deactivateMouseGlow() {
    if (this.mouseGlow) {
      this.mouseGlow.classList.remove('active');
      this.isActive = false;
    }
  }
  
  updateScrollEffects() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Very subtle grid movement based on scroll
    const grid = document.querySelector('.minimal-grid');
    if (grid) {
      const translateY = scrollPercent * 20; // Very subtle movement
      grid.style.transform = `translate(0, ${translateY}px)`;
    }
    
    // Subtle corner accent intensity based on scroll
    const corners = document.querySelectorAll('.minimal-corner');
    corners.forEach((corner, index) => {
      const intensity = 0.1 + (scrollPercent * 0.1); // 0.1 to 0.2
      corner.style.opacity = intensity;
    });
  }
  
  highlightFocusedElement(element) {
    // Add subtle glow to focused elements for accessibility
    if (element && element.tagName) {
      element.style.boxShadow = '0 0 0 2px rgba(168, 85, 247, 0.3)';
      element.style.transition = 'box-shadow 0.2s ease';
    }
  }
  
  removeFocusHighlight() {
    // Remove focus highlight
    const focusedElement = document.activeElement;
    if (focusedElement && focusedElement !== document.body) {
      setTimeout(() => {
        focusedElement.style.boxShadow = '';
      }, 200);
    }
  }
  
  // Method to adjust intensity based on user preference
  setIntensity(level) {
    const root = document.documentElement;
    
    switch (level) {
      case 'subtle':
        root.style.setProperty('--bg-opacity', '0.5');
        break;
      case 'normal':
        root.style.setProperty('--bg-opacity', '1');
        break;
      case 'intense':
        root.style.setProperty('--bg-opacity', '1.5');
        break;
      default:
        root.style.removeProperty('--bg-opacity');
    }
  }
  
  // Method to pause/resume animations
  toggleAnimations(pause = false) {
    const animatedElements = document.querySelectorAll(`
      .minimal-grid,
      .minimal-dot,
      .minimal-line,
      .minimal-glow,
      .minimal-particle,
      .minimal-scanlines,
      .minimal-corner
    `);
    
    animatedElements.forEach(element => {
      element.style.animationPlayState = pause ? 'paused' : 'running';
    });
  }
  
  // Method to create a subtle pulse effect
  createPulse(x, y) {
    const pulse = document.createElement('div');
    pulse.style.position = 'fixed';
    pulse.style.left = x - 25 + 'px';
    pulse.style.top = y - 25 + 'px';
    pulse.style.width = '50px';
    pulse.style.height = '50px';
    pulse.style.border = '1px solid rgba(168, 85, 247, 0.3)';
    pulse.style.borderRadius = '50%';
    pulse.style.pointerEvents = 'none';
    pulse.style.zIndex = '-5';
    pulse.style.animation = 'minimalPulse 1s ease-out forwards';
    
    // Add keyframes if not already added
    if (!document.querySelector('#minimal-pulse-keyframes')) {
      const style = document.createElement('style');
      style.id = 'minimal-pulse-keyframes';
      style.textContent = `
        @keyframes minimalPulse {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(pulse);
    
    setTimeout(() => {
      pulse.remove();
    }, 1000);
  }
}

// Initialize minimal background
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing minimal background animation...');
  
  try {
    const minimalBg = new MinimalBackground();
    
    // Make it globally accessible
    window.minimalBackground = minimalBg;
    
    // Add click pulse effect
    document.addEventListener('click', (e) => {
      if (minimalBg.isActive) {
        minimalBg.createPulse(e.clientX, e.clientY);
      }
    });
    
    console.log('Minimal background animation loaded successfully!');
  } catch (error) {
    console.error('Error loading minimal background animation:', error);
  }
});

// Initialize after loader completes
document.addEventListener('sujitLoaderComplete', () => {
  console.log('Loader complete, ensuring minimal background is active...');
  
  setTimeout(() => {
    if (!window.minimalBackground) {
      try {
        window.minimalBackground = new MinimalBackground();
        console.log('Minimal background animation initialized after loader!');
      } catch (error) {
        console.error('Error initializing minimal background after loader:', error);
      }
    }
  }, 300);
});