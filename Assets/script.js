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
 const words = ["Welcome to my page", "Laravel developer", "Full-Stack Web developer", "Ui/Ux designer"];
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


