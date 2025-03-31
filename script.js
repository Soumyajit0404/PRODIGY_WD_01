const header = document.querySelector('header');
const navItems = document.querySelectorAll('.nav-item');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

// Toggle menu on mobile
menuToggle.addEventListener('click', function() {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close menu when clicking a nav item on mobile
navItems.forEach(item => {
  item.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    }
  });
});

// Change navigation style on scroll
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
  
  // Highlight current section in the navigation
  updateActiveMenuItem();
});

// Highlight menu item based on current scroll position
function updateActiveMenuItem() {
  const sections = document.querySelectorAll('.section');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all menu items
      navItems.forEach(item => {
        item.classList.remove('nav-active');
      });
      
      // Add active class to current menu item
      const currentItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);
      if (currentItem) {
        currentItem.classList.add('nav-active');
      }
    }
  });
}

// Smooth scrolling for navigation links
navItems.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
    
    // Remove active class from all menu items
    navItems.forEach(item => {
      item.classList.remove('nav-active');
    });
    
    // Add active class to clicked menu item
    this.classList.add('nav-active');
  });
});

// Handle window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
  }
});

// Initialize active menu item
window.addEventListener('load', function() {
  updateActiveMenuItem();
});