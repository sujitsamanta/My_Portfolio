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
 const words = ["cover", "design", "experience", "interface"];
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