// Pree loder 
// Progress bar animation with unique variable names
let sujitProgressValue = 0;
const sujitProgressBarElement = document.getElementById('sujit_progress_bar_fill');
const sujitPercentageDisplayElement = document.getElementById('sujit_percentage_text');

const sujitUpdateProgressFunction = () => {
  if (sujitProgressValue < 100) {
    sujitProgressValue += Math.random() * 4 + 2;
    if (sujitProgressValue > 100) sujitProgressValue = 100;

    sujitProgressBarElement.style.width = sujitProgressValue + '%';
    sujitPercentageDisplayElement.textContent = Math.floor(sujitProgressValue);

    setTimeout(sujitUpdateProgressFunction, 80 + Math.random() * 120);
  } else {
    // Loading complete - hide loader
    setTimeout(() => {
      const sujitLoaderContainer = document.getElementById('sujit_main_loader_container');

      // Fade out loader
      sujitLoaderContainer.style.transform = 'scale(0.8)';
      sujitLoaderContainer.style.opacity = '0';
      sujitLoaderContainer.style.transition = 'all 0.5s ease-in-out';

      setTimeout(() => {
        // Completely remove loader from DOM
        sujitLoaderContainer.remove();

        // Dispatch custom event to notify that loader is complete
        document.dispatchEvent(new CustomEvent('sujitLoaderComplete'));
      }, 500);
    }, 500);
  }
};

// Start progress animation
setTimeout(sujitUpdateProgressFunction, 300);

// Dynamic typing effect for different phrases with unique variables
const sujitLoadingPhrases = [
  'Loading Portfolio...',
  'Compiling Code...',
  'Initializing Magic...',
  'Almost Ready...'
];

let sujitCurrentPhraseIndex = 0;
const sujitTypingDisplayElement = document.getElementById('sujit_typing_text_element');

const sujitPhraseChangeInterval = setInterval(() => {
  sujitCurrentPhraseIndex = (sujitCurrentPhraseIndex + 1) % sujitLoadingPhrases.length;
  if (sujitTypingDisplayElement) {
    sujitTypingDisplayElement.textContent = sujitLoadingPhrases[sujitCurrentPhraseIndex];
  }
}, 1500);

// Clean up interval when loader is complete
setTimeout(() => {
  clearInterval(sujitPhraseChangeInterval);
}, 6000);

// Listen for loader completion (you can use this in your main portfolio)
document.addEventListener('sujitLoaderComplete', function () {
  console.log('Sujit loader completed - portfolio ready!');

  // Refresh AOS animations after loader completes
  setTimeout(() => {
    // Check if AOS is available and refresh it
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
      // Force trigger animations for elements in viewport
      AOS.refreshHard();
    }

    // Alternative: manually trigger hero section animations
    const heroElements = document.querySelectorAll('[data-aos]');
    heroElements.forEach(element => {
      // Force remove and re-add AOS classes to trigger animations
      element.classList.remove('aos-animate');
      setTimeout(() => {
        element.classList.add('aos-animate');
      }, 100);
    });

    // Dispatch window resize to trigger AOS recalculation
    window.dispatchEvent(new Event('resize'));

    // Scroll to top to ensure hero section is in view
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }, 100);
});
 
 
 
 
 // Mobile menu functionality
 const mobileMenuBtn = document.getElementById("mobile-menu-btn");
 const mobileMenu = document.getElementById("mobile-menu");
 const mobileMenuLinks = document.querySelectorAll(".mobile-nav-link");
 const body = document.body;

 // Function to open mobile menu
 function openMobileMenu() {
   mobileMenu.classList.add("active");
   mobileMenuBtn.classList.add("active");
   body.classList.add("menu-open");
 }

 // Function to close mobile menu
 function closeMobileMenu() {
   mobileMenu.classList.remove("active");
   mobileMenuBtn.classList.remove("active");
   body.classList.remove("menu-open");
 }

 // Toggle mobile menu
 mobileMenuBtn.addEventListener("click", (e) => {
   e.stopPropagation();
   if (mobileMenu.classList.contains("active")) {
     closeMobileMenu();
   } else {
     openMobileMenu();
   }
 });

 // Close button functionality - removed duplicate close button

 // Close mobile menu when clicking on links
 mobileMenuLinks.forEach((link) => {
   link.addEventListener("click", () => {
     closeMobileMenu();
   });
 });

 // Close mobile menu when clicking outside
 document.addEventListener("click", (e) => {
   if (
     mobileMenu.classList.contains("active") &&
     !mobileMenu.contains(e.target) &&
     !mobileMenuBtn.contains(e.target)
   ) {
     closeMobileMenu();
   }
 });

 // Prevent menu from closing when clicking inside mobile menu
 mobileMenu.addEventListener("click", (e) => {
   e.stopPropagation();
 });


 // Smooth scrolling for navigation links
 document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   anchor.addEventListener("click", function (e) {
     e.preventDefault();
     const target = document.querySelector(this.getAttribute("href"));
     if (target) {
       const offset = 80; // Account for fixed navbar
       const elementPosition = target.offsetTop;
       const offsetPosition = elementPosition - offset;

       window.scrollTo({
         top: offsetPosition,
         behavior: "smooth",
       });
     }
   });
 });

 // Navbar scroll effect
 const navbar = document.getElementById("navbar");
 window.addEventListener("scroll", () => {
   if (window.scrollY > 100) {
     navbar.classList.add("bg-opacity-90");
     navbar.classList.remove("bg-opacity-20");
   } else {
     navbar.classList.add("bg-opacity-20");
     navbar.classList.remove("bg-opacity-90");
   }
 });

 // Typing animation effect
 const words = ["Welcome to my page", "PHP developer","Laravel developer", "Web developer", "Ui/Ux designer"];
 let currentWordIndex = 0;
 let currentCharIndex = 0;
 let isDeleting = false;
 const typingElement = document.querySelector(".typing-animation");
 const typingSpeed = 100;
 const deletingSpeed = 50;
 const pauseTime = 2000;

 function typeWriter() {
   const currentWord = words[currentWordIndex];

   if (isDeleting) {
     typingElement.textContent = currentWord.substring(
       0,
       currentCharIndex - 1
     );
     currentCharIndex--;
   } else {
     typingElement.textContent = currentWord.substring(
       0,
       currentCharIndex + 1
     );
     currentCharIndex++;
   }

   let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

   if (!isDeleting && currentCharIndex === currentWord.length) {
     typeSpeed = pauseTime;
     isDeleting = true;
   } else if (isDeleting && currentCharIndex === 0) {
     isDeleting = false;
     currentWordIndex = (currentWordIndex + 1) % words.length;
   }

   setTimeout(typeWriter, typeSpeed);
 }

 // Start typing animation
 typeWriter();

 // Handle window resize
 window.addEventListener("resize", () => {
   if (
     window.innerWidth >= 768 &&
     mobileMenu.classList.contains("active")
   ) {
     closeMobileMenu();
   }
 });

 // Keyboard accessibility
 document.addEventListener("keydown", (e) => {
   if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
     closeMobileMenu();
   }
 });

 //dawnlode CV
 
//  function downloadFile() {
//    const a = document.createElement("a");
//    a.href = "file.doc";
//    a.download = "file.doc";
//    document.body.appendChild(a);
//    a.click();
//    document.body.removeChild(a);
//  }



 // Education and Wark section Tab switching functionality
 const workTab = document.getElementById('workTab');
 const educationTab = document.getElementById('educationTab');
 const workSection = document.getElementById('workSection');
 const educationSection = document.getElementById('educationSection');

 workTab.addEventListener('click', () => {
     workTab.classList.remove('tab-inactive');
     workTab.classList.add('tab-active');
     educationTab.classList.remove('tab-active');
     educationTab.classList.add('tab-inactive');
     
     workSection.classList.remove('hidden');
     educationSection.classList.add('hidden');
 });

 educationTab.addEventListener('click', () => {
     educationTab.classList.remove('tab-inactive');
     educationTab.classList.add('tab-active');
     workTab.classList.remove('tab-active');
     workTab.classList.add('tab-inactive');
     
     educationSection.classList.remove('hidden');
     workSection.classList.add('hidden');
 });



    
// contact-us receive message
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});


// Preloader Minimal Background Integration
class PreloaderMinimalBackground {
  constructor() {
    this.preloaderContainer = document.getElementById('sujit_main_loader_container');
    this.particles = [];
    this.maxParticles = 6;
    
    if (this.preloaderContainer) {
      this.init();
    }
  }
  
  init() {
    // Only add effects if reduced motion is not preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('Reduced motion detected, using simple preloader background');
      return;
    }
    
    this.createPreloaderElements();
    this.createPreloaderParticles();
    
    console.log('Preloader minimal background initialized');
  }
  
  createPreloaderElements() {
    // Create subtle grid
    const grid = document.createElement('div');
    grid.className = 'preloader-grid';
    this.preloaderContainer.appendChild(grid);
    
    // Create floating dots
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement('div');
      dot.className = 'preloader-dot';
      this.preloaderContainer.appendChild(dot);
    }
    
    // Create breathing glows
    for (let i = 1; i <= 3; i++) {
      const glow = document.createElement('div');
      glow.className = `preloader-glow preloader-glow-${i}`;
      this.preloaderContainer.appendChild(glow);
    }
    
    // Create corner accents
    const corners = ['tl', 'tr', 'bl', 'br'];
    corners.forEach(corner => {
      const cornerEl = document.createElement('div');
      cornerEl.className = `preloader-corner preloader-corner-${corner}`;
      this.preloaderContainer.appendChild(cornerEl);
    });
    
    // Create scan lines
    const scanlines = document.createElement('div');
    scanlines.className = 'preloader-scanlines';
    this.preloaderContainer.appendChild(scanlines);
    
    // Create vignette
    const vignette = document.createElement('div');
    vignette.className = 'preloader-vignette';
    this.preloaderContainer.appendChild(vignette);
  }
  
  createPreloaderParticles() {
    for (let i = 0; i < this.maxParticles; i++) {
      setTimeout(() => {
        this.createParticle();
      }, i * 1500);
    }
  }
  
  createParticle() {
    if (!this.preloaderContainer || !this.preloaderContainer.parentNode) {
      return; // Preloader has been removed
    }
    
    const particle = document.createElement('div');
    particle.className = 'preloader-particle';
    
    // Random horizontal position
    const startX = Math.random() * 100;
    particle.style.left = startX + '%';
    particle.style.bottom = '0';
    
    // Random animation duration
    const duration = 15 + Math.random() * 10;
    particle.style.animationDuration = duration + 's';
    
    // Random color variation
    const colors = [
      'rgba(168, 85, 247, 0.6)',
      'rgba(236, 72, 153, 0.5)',
      'rgba(139, 92, 246, 0.55)'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    this.preloaderContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
      // Create new particle if preloader still exists
      if (this.preloaderContainer && this.preloaderContainer.parentNode) {
        setTimeout(() => {
          this.createParticle();
        }, Math.random() * 3000);
      }
    }, duration * 1000);
  }
  
  // Method to intensify effects during loading
  intensifyEffects() {
    const dots = this.preloaderContainer.querySelectorAll('.preloader-dot');
    const glows = this.preloaderContainer.querySelectorAll('.preloader-glow');
    
    dots.forEach(dot => {
      dot.style.animationDuration = '8s';
      dot.style.opacity = '0.8';
    });
    
    glows.forEach(glow => {
      glow.style.animationDuration = '6s';
      glow.style.opacity = '0.4';
    });
  }
  
  // Method to create loading pulse effect
  createLoadingPulse() {
    const pulse = document.createElement('div');
    pulse.style.position = 'absolute';
    pulse.style.top = '50%';
    pulse.style.left = '50%';
    pulse.style.width = '100px';
    pulse.style.height = '100px';
    pulse.style.border = '2px solid rgba(168, 85, 247, 0.3)';
    pulse.style.borderRadius = '50%';
    pulse.style.transform = 'translate(-50%, -50%)';
    pulse.style.animation = 'preloaderPulse 2s ease-out forwards';
    
    // Add keyframes if not already added
    if (!document.querySelector('#preloader-pulse-keyframes')) {
      const style = document.createElement('style');
      style.id = 'preloader-pulse-keyframes';
      style.textContent = `
        @keyframes preloaderPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    this.preloaderContainer.appendChild(pulse);
    
    setTimeout(() => {
      if (pulse.parentNode) {
        pulse.remove();
      }
    }, 2000);
  }
}

// Initialize preloader background when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing preloader minimal background...');
  
  try {
    const preloaderBg = new PreloaderMinimalBackground();
    
    // Create loading pulse every few seconds
    const pulseInterval = setInterval(() => {
      if (document.getElementById('sujit_main_loader_container')) {
        preloaderBg.createLoadingPulse();
      } else {
        clearInterval(pulseInterval);
      }
    }, 4000);
    
    // Intensify effects when progress reaches certain points
    const progressBar = document.getElementById('sujit_progress_bar_fill');
    if (progressBar) {
      const observer = new MutationObserver(() => {
        const width = parseFloat(progressBar.style.width);
        if (width > 50 && width < 52) {
          preloaderBg.intensifyEffects();
        }
      });
      
      observer.observe(progressBar, { 
        attributes: true, 
        attributeFilter: ['style'] 
      });
    }
    
    console.log('Preloader minimal background loaded successfully!');
  } catch (error) {
    console.error('Error loading preloader minimal background:', error);
  }
});


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