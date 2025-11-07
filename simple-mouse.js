// Simple Mouse Animation System
class SimpleMouseAnimation {
  constructor() {
    this.cursor = null;
    this.dot = null;
    this.glow = null;
    this.trails = [];
    this.maxTrails = 5;
    
    this.mouseX = 0;
    this.mouseY = 0;
    this.isActive = false;
    
    this.init();
  }
  
  init() {
    // Only run on devices with hover support
    if (!window.matchMedia('(hover: hover)').matches) {
      return;
    }
    
    this.createElements();
    this.bindEvents();
    this.startAnimation();
    
    console.log('Simple mouse animation initialized');
  }
  
  createElements() {
    // Create cursor
    this.cursor = document.createElement('div');
    this.cursor.className = 'simple-cursor';
    document.body.appendChild(this.cursor);
    
    // Create dot
    this.dot = document.createElement('div');
    this.dot.className = 'simple-dot';
    document.body.appendChild(this.dot);
    
    // Create glow
    this.glow = document.createElement('div');
    this.glow.className = 'simple-glow';
    document.body.appendChild(this.glow);
    
    // Create trails
    for (let i = 0; i < this.maxTrails; i++) {
      const trail = document.createElement('div');
      trail.className = 'simple-trail';
      document.body.appendChild(trail);
      
      this.trails.push({
        element: trail,
        x: 0,
        y: 0,
        delay: (i + 1) * 0.1
      });
    }
  }
  
  bindEvents() {
    // Mouse move
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      if (!this.isActive) {
        this.activate();
      }
      
      // Update dot position immediately
      this.updateDot();
    });
    
    // Mouse enter page
    document.addEventListener('mouseenter', () => {
      this.activate();
    });
    
    // Mouse leave page
    document.addEventListener('mouseleave', () => {
      this.deactivate();
    });
    
    // Click effect
    document.addEventListener('click', (e) => {
      this.createClickRipple(e.clientX, e.clientY);
    });
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .tech-icon, .magnetic-element');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.setHoverState(true);
      });
      
      element.addEventListener('mouseleave', () => {
        this.setHoverState(false);
      });
    });
  }
  
  startAnimation() {
    const animate = () => {
      this.updateCursor();
      this.updateGlow();
      this.updateTrails();
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  updateDot() {
    if (this.dot) {
      this.dot.style.left = this.mouseX - 4 + 'px';
      this.dot.style.top = this.mouseY - 4 + 'px';
    }
  }
  
  updateCursor() {
    if (this.cursor) {
      // Smooth cursor movement
      const currentLeft = parseFloat(this.cursor.style.left) || this.mouseX;
      const currentTop = parseFloat(this.cursor.style.top) || this.mouseY;
      
      const newLeft = currentLeft + (this.mouseX - 10 - currentLeft) * 0.15;
      const newTop = currentTop + (this.mouseY - 10 - currentTop) * 0.15;
      
      this.cursor.style.left = newLeft + 'px';
      this.cursor.style.top = newTop + 'px';
    }
  }
  
  updateGlow() {
    if (this.glow) {
      // Slower glow movement
      const currentLeft = parseFloat(this.glow.style.left) || this.mouseX;
      const currentTop = parseFloat(this.glow.style.top) || this.mouseY;
      
      const newLeft = currentLeft + (this.mouseX - 50 - currentLeft) * 0.05;
      const newTop = currentTop + (this.mouseY - 50 - currentTop) * 0.05;
      
      this.glow.style.left = newLeft + 'px';
      this.glow.style.top = newTop + 'px';
    }
  }
  
  updateTrails() {
    this.trails.forEach((trail, index) => {
      const currentLeft = parseFloat(trail.element.style.left) || this.mouseX;
      const currentTop = parseFloat(trail.element.style.top) || this.mouseY;
      
      const speed = 0.2 - (trail.delay * 0.02);
      const newLeft = currentLeft + (this.mouseX - 2.5 - currentLeft) * speed;
      const newTop = currentTop + (this.mouseY - 2.5 - currentTop) * speed;
      
      trail.element.style.left = newLeft + 'px';
      trail.element.style.top = newTop + 'px';
      trail.element.style.opacity = this.isActive ? (1 - index * 0.15) : '0';
    });
  }
  
  activate() {
    this.isActive = true;
    
    if (this.cursor) this.cursor.classList.add('active');
    if (this.dot) this.dot.classList.add('active');
    if (this.glow) this.glow.classList.add('active');
  }
  
  deactivate() {
    this.isActive = false;
    
    if (this.cursor) this.cursor.classList.remove('active');
    if (this.dot) this.dot.classList.remove('active');
    if (this.glow) this.glow.classList.remove('active');
    
    this.setHoverState(false);
  }
  
  setHoverState(isHovering) {
    if (this.cursor) {
      if (isHovering) {
        this.cursor.classList.add('hover');
      } else {
        this.cursor.classList.remove('hover');
      }
    }
    
    if (this.dot) {
      if (isHovering) {
        this.dot.classList.add('hover');
      } else {
        this.dot.classList.remove('hover');
      }
    }
  }
  
  createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = x - 10 + 'px';
    ripple.style.top = y - 10 + 'px';
    
    document.body.appendChild(ripple);
    
    // Remove after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// Initialize simple mouse animation
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing simple mouse animation...');
  
  try {
    new SimpleMouseAnimation();
    console.log('Simple mouse animation loaded successfully!');
  } catch (error) {
    console.error('Error loading simple mouse animation:', error);
  }
});

// Also initialize after loader completes (if loader exists)
document.addEventListener('sujitLoaderComplete', () => {
  console.log('Loader complete, reinitializing simple mouse animation...');
  
  setTimeout(() => {
    try {
      new SimpleMouseAnimation();
      console.log('Simple mouse animation reinitialized successfully!');
    } catch (error) {
      console.error('Error reinitializing simple mouse animation:', error);
    }
  }, 100);
});