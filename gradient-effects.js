// Background Gradient Effects System
class GradientEffects {
  constructor() {
    this.mouseGradient = null;
    this.particles = [];
    this.maxParticles = 20;
    this.mouseX = 0;
    this.mouseY = 0;
    
    this.init();
  }
  
  init() {
    this.createBackgroundElements();
    this.createMouseGradient();
    this.createParticles();
    this.bindEvents();
    this.startAnimation();
    
    console.log('Gradient effects initialized');
  }
  
  createBackgroundElements() {
    // Create animated background
    const animatedBg = document.createElement('div');
    animatedBg.className = 'animated-background';
    document.body.appendChild(animatedBg);
    
    // Create gradient mesh
    const gradientMesh = document.createElement('div');
    gradientMesh.className = 'gradient-mesh';
    document.body.appendChild(gradientMesh);
    
    // Create floating orbs
    for (let i = 1; i <= 4; i++) {
      const orb = document.createElement('div');
      orb.className = `gradient-orb gradient-orb-${i}`;
      document.body.appendChild(orb);
    }
    
    // Create gradient lines
    const gradientLines = document.createElement('div');
    gradientLines.className = 'gradient-lines';
    document.body.appendChild(gradientLines);
    
    // Create pulsing spots
    for (let i = 1; i <= 3; i++) {
      const spot = document.createElement('div');
      spot.className = `gradient-spot gradient-spot-${i}`;
      document.body.appendChild(spot);
    }
    
    // Create gradient wave
    const gradientWave = document.createElement('div');
    gradientWave.className = 'gradient-wave';
    document.body.appendChild(gradientWave);
    
    // Create aurora effect
    const auroraEffect = document.createElement('div');
    auroraEffect.className = 'aurora-effect';
    document.body.appendChild(auroraEffect);
  }
  
  createMouseGradient() {
    this.mouseGradient = document.createElement('div');
    this.mouseGradient.className = 'mouse-gradient';
    document.body.appendChild(this.mouseGradient);
  }
  
  createParticles() {
    for (let i = 0; i < this.maxParticles; i++) {
      setTimeout(() => {
        this.createParticle();
      }, i * 800); // Stagger particle creation
    }
  }
  
  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'gradient-particle';
    
    // Random horizontal position
    const startX = Math.random() * window.innerWidth;
    particle.style.left = startX + 'px';
    particle.style.bottom = '-10px';
    
    // Random animation duration
    const duration = 15 + Math.random() * 10;
    particle.style.animationDuration = duration + 's';
    
    // Random horizontal drift
    const drift = (Math.random() - 0.5) * 200;
    particle.style.setProperty('--drift', drift + 'px');
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
      // Create new particle to maintain count
      this.createParticle();
    }, duration * 1000);
  }
  
  bindEvents() {
    // Mouse move for interactive gradient
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      this.updateMouseGradient();
    });
    
    // Mouse enter/leave for activation
    document.addEventListener('mouseenter', () => {
      this.activateMouseGradient();
    });
    
    document.addEventListener('mouseleave', () => {
      this.deactivateMouseGradient();
    });
    
    // Scroll effects
    window.addEventListener('scroll', () => {
      this.updateScrollEffects();
    });
    
    // Resize handling
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }
  
  startAnimation() {
    // Dynamic color shifting based on time
    setInterval(() => {
      this.updateDynamicColors();
    }, 5000);
    
    // Particle burst on certain interactions
    document.addEventListener('click', (e) => {
      this.createParticleBurst(e.clientX, e.clientY);
    });
  }
  
  updateMouseGradient() {
    if (this.mouseGradient) {
      this.mouseGradient.style.left = this.mouseX - 200 + 'px';
      this.mouseGradient.style.top = this.mouseY - 200 + 'px';
    }
  }
  
  activateMouseGradient() {
    if (this.mouseGradient) {
      this.mouseGradient.classList.add('active');
    }
  }
  
  deactivateMouseGradient() {
    if (this.mouseGradient) {
      this.mouseGradient.classList.remove('active');
    }
  }
  
  updateScrollEffects() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Update gradient mesh based on scroll
    const gradientMesh = document.querySelector('.gradient-mesh');
    if (gradientMesh) {
      const hueRotation = scrollPercent * 60; // 0 to 60 degrees
      gradientMesh.style.filter = `hue-rotate(${hueRotation}deg)`;
    }
    
    // Update orbs position based on scroll
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.5;
      const translateY = scrollPercent * 100 * speed;
      orb.style.transform = `translateY(${translateY}px)`;
    });
  }
  
  updateDynamicColors() {
    const time = Date.now() * 0.001;
    
    // Update animated background colors
    const animatedBg = document.querySelector('.animated-background');
    if (animatedBg) {
      const hue1 = Math.sin(time * 0.3) * 30 + 270; // Purple range
      const hue2 = Math.sin(time * 0.5) * 30 + 300; // Pink range
      const hue3 = Math.sin(time * 0.7) * 30 + 250; // Blue-purple range
      
      animatedBg.style.background = `linear-gradient(45deg, 
        hsl(${hue1}, 70%, 15%), 
        hsl(${hue2}, 60%, 25%), 
        hsl(${hue3}, 65%, 20%), 
        hsl(${hue1}, 70%, 15%))`;
    }
  }
  
  createParticleBurst(x, y) {
    const burstCount = 8;
    
    for (let i = 0; i < burstCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'gradient-particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.position = 'fixed';
      
      const angle = (i / burstCount) * Math.PI * 2;
      const distance = 50 + Math.random() * 100;
      const targetX = x + Math.cos(angle) * distance;
      const targetY = y + Math.sin(angle) * distance;
      
      particle.style.transition = 'all 1s ease-out';
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.style.left = targetX + 'px';
        particle.style.top = targetY + 'px';
        particle.style.opacity = '0';
        particle.style.transform = 'scale(0)';
      }, 50);
      
      setTimeout(() => {
        particle.remove();
      }, 1100);
    }
  }
  
  handleResize() {
    // Recreate particles with new screen dimensions
    const particles = document.querySelectorAll('.gradient-particle');
    particles.forEach(particle => {
      if (particle.style.left) {
        const leftPercent = (parseFloat(particle.style.left) / window.innerWidth) * 100;
        particle.style.left = leftPercent + '%';
      }
    });
  }
  
  // Method to temporarily intensify effects
  intensifyEffects() {
    document.body.classList.add('gradient-intense');
    
    setTimeout(() => {
      document.body.classList.remove('gradient-intense');
    }, 3000);
  }
  
  // Method to create themed color schemes
  setColorTheme(theme) {
    const root = document.documentElement;
    
    switch (theme) {
      case 'purple':
        root.style.setProperty('--gradient-primary', '#a855f7');
        root.style.setProperty('--gradient-secondary', '#8b5cf6');
        break;
      case 'pink':
        root.style.setProperty('--gradient-primary', '#ec4899');
        root.style.setProperty('--gradient-secondary', '#f472b6');
        break;
      case 'blue':
        root.style.setProperty('--gradient-primary', '#3b82f6');
        root.style.setProperty('--gradient-secondary', '#6366f1');
        break;
      default:
        // Reset to default
        root.style.removeProperty('--gradient-primary');
        root.style.removeProperty('--gradient-secondary');
    }
  }
}

// Initialize gradient effects
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if device supports animations
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Initializing gradient effects...');
    
    try {
      const gradientEffects = new GradientEffects();
      
      // Make it globally accessible for theme switching
      window.gradientEffects = gradientEffects;
      
      console.log('Gradient effects loaded successfully!');
    } catch (error) {
      console.error('Error loading gradient effects:', error);
    }
  } else {
    console.log('Reduced motion detected, skipping gradient effects');
  }
});

// Initialize after loader completes
document.addEventListener('sujitLoaderComplete', () => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Loader complete, reinitializing gradient effects...');
    
    setTimeout(() => {
      try {
        if (!window.gradientEffects) {
          window.gradientEffects = new GradientEffects();
        }
        console.log('Gradient effects reinitialized successfully!');
      } catch (error) {
        console.error('Error reinitializing gradient effects:', error);
      }
    }, 200);
  }
});