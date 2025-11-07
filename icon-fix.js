// Simple Icon Fix - Replace with Text/Symbols
function replaceIconsWithText() {
  console.log('Replacing icons with text fallbacks...');
  
  // Icon mappings
  const iconMappings = {
    'fa-github': { text: 'GitHub', symbol: '⚡' },
    'fa-linkedin': { text: 'LinkedIn', symbol: '💼' },
    'fa-facebook-f': { text: 'Facebook', symbol: '📘' },
    'fa-instagram': { text: 'Instagram', symbol: '📷' },
    'fa-envelope': { text: 'Email', symbol: '✉️' },
    'fa-phone': { text: 'Phone', symbol: '📞' },
    'fa-map-marker-alt': { text: 'Location', symbol: '📍' },
    'fa-external-link-alt': { text: 'Link', symbol: '🔗' },
    'fa-paper-plane': { text: 'Send', symbol: '✈️' },
    'fa-home': { text: 'Home', symbol: '🏠' },
    'fa-chevron-down': { text: '↓', symbol: '⬇️' },
    'fa-briefcase': { text: 'Work', symbol: '💼' },
    'fa-code': { text: 'Code', symbol: '💻' },
    'fa-graduation-cap': { text: 'Education', symbol: '🎓' }
  };
  
  // Replace each icon type
  Object.keys(iconMappings).forEach(iconClass => {
    const icons = document.querySelectorAll(`.${iconClass}`);
    console.log(`Found ${icons.length} ${iconClass} icons`);
    
    icons.forEach((icon, index) => {
      const mapping = iconMappings[iconClass];
      
      // Check if icon is in a small space (use symbol) or larger space (use text)
      const parent = icon.parentElement;
      const isSmallSpace = parent && (
        parent.classList.contains('w-10') || 
        parent.classList.contains('w-12') ||
        parent.offsetWidth < 50
      );
      
      // Use symbol for small spaces, text for larger spaces
      const replacement = isSmallSpace ? mapping.symbol : mapping.text;
      
      // Replace the icon
      icon.innerHTML = replacement;
      icon.style.fontFamily = isSmallSpace ? 'Arial, sans-serif' : "'Montserrat', sans-serif";
      icon.style.fontSize = isSmallSpace ? '1.2rem' : '0.9rem';
      icon.style.fontWeight = '400';
      icon.style.display = 'inline-block';
      icon.style.textAlign = 'center';
      icon.style.lineHeight = '1';
      
      // Remove Font Awesome classes
      icon.classList.remove('fab', 'fas', 'far');
      
      console.log(`Replaced ${iconClass} with "${replacement}"`);
    });
  });
}

// Run immediately
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(replaceIconsWithText, 100);
});

// Run after loader completes
document.addEventListener('sujitLoaderComplete', () => {
  setTimeout(replaceIconsWithText, 500);
});

// Run after page fully loads
window.addEventListener('load', () => {
  setTimeout(replaceIconsWithText, 1000);
});

// Also run after a delay to catch any late-loading content
setTimeout(replaceIconsWithText, 2000);