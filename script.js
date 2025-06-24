/*===== MENU SHOW/HIDE =====*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== ACCORDION SKILLS =====*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills(){
    let itemClass = this.parentNode.className;
    
    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close';
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

/*===== PORTFOLIO SWIPER =====*/
// Not using Swiper for simplicity, but can be added later

/*===== TESTIMONIAL SWIPER =====*/
// Not using Swiper for simplicity, but can be added later

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', navHighlighter);

function navHighlighter() {
    // Get current scroll position
    let scrollY = window.pageYOffset;
    
    // Now we loop through sections to get height, top and ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        
        /* 
        - If our current scroll position enters the space where current section on screen is, 
          add .active class to corresponding navigation link, else remove it
        - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
        */
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

/*===== CHANGE BACKGROUND HEADER =====*/ 
function scrollHeader(){
    const nav = document.getElementById('header');
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); 
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*===== SHOW SCROLL UP =====*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); 
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*===== DARK LIGHT THEME =====*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'sun-icon';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'moon-icon' : 'sun-icon';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'moon-icon' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
if(themeButton) {
    themeButton.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}

/*===== SMOOTH SCROLLING =====*/
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*===== TYPING ANIMATION =====*/
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if(this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 300;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.hero__subtitle');
    const words = ['Software Developer', 'Tech Enthusiast', 'Problem Solver', 'Creative Thinker'];
    const wait = 3000;
    
    if(txtElement) {
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = {
    reveal: (elements, options = {}) => {
        const defaultOptions = {
            origin: 'top',
            distance: '60px',
            duration: 2000,
            delay: 200,
            opacity: 0,
            scale: 1,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            mobile: true,
            reset: false,
            useDelay: 'always',
            viewFactor: 0.2,
        };
        
        const config = { ...defaultOptions, ...options };
        
        // Simple intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: config.viewFactor });
        
        document.querySelectorAll(elements).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = `translateY(${config.distance})`;
            element.style.transition = `all ${config.duration}ms ${config.easing} ${config.delay}ms`;
            observer.observe(element);
        });
    }
};

// Scroll Reveal
sr.reveal('.hero__data, .hero__img', { delay: 400 });
sr.reveal('.hero__data', { delay: 600 });
sr.reveal('.hero__img', { delay: 800 });
sr.reveal('.about__img, .about__data', { interval: 200 });
sr.reveal('.skills__content', { interval: 200 });
sr.reveal('.project__card', { interval: 200 });
sr.reveal('.contact__card', { interval: 200 });

/*===== CONTACT FORM =====*/
const contactForm = document.querySelector('.contact__form-container');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
        
        // Simple validation
        if(name && email && message) {
            // Create a temporary success message
            const successMessage = document.createElement('div');
            successMessage.className = 'contact__success';
            successMessage.innerHTML = `
                <p style="color: var(--first-color); font-weight: var(--font-medium); text-align: center; padding: 1rem; background-color: var(--first-color-lighter); border-radius: 0.5rem; margin-top: 1rem;">
                    Thank you for your message! I'll get back to you soon.
                </p>
            `;
            
            // Add success message after form
            contactForm.appendChild(successMessage);
            
            // Reset form
            this.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } else {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'contact__error';
            errorMessage.innerHTML = `
                <p style="color: #ff6b6b; font-weight: var(--font-medium); text-align: center; padding: 1rem; background-color: rgba(255, 107, 107, 0.1); border-radius: 0.5rem; margin-top: 1rem;">
                    Please fill in all fields.
                </p>
            `;
            
            // Add error message after form
            contactForm.appendChild(errorMessage);
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        }
    });
}

/*===== PRELOADER =====*/
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if(preloader) {
        preloader.style.display = 'none';
    }
});

/*===== PERFORMANCE OPTIMIZATIONS =====*/
// Debounce function for scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(scrollHeader, 100));
window.addEventListener('scroll', throttle(scrollUp, 100));
window.addEventListener('scroll', throttle(navHighlighter, 100));

/*===== LAZY LOADING IMAGES =====*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*===== KEYBOARD NAVIGATION =====*/
// Enhance keyboard navigation accessibility
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
        }
    }
    
    // Enter or Space to activate buttons/links
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('nav__toggle')) {
            e.preventDefault();
            navToggle.click();
        }
        if (e.target.classList.contains('nav__close')) {
            e.preventDefault();
            navClose.click();
        }
    }
});

/*===== SKILLS ANIMATION ON SCROLL =====*/
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            const skillBars = document.querySelectorAll('.skills__percentage');
            skillBars.forEach(bar => {
                bar.style.animation = 'progressBar 2s ease-in-out forwards';
            });
            skillsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

console.log('🚀 Portfolio website loaded successfully!');
console.log('💼 Built with modern web technologies');
console.log('📱 Responsive design for all devices');
console.log('⚡ Optimized for performance and accessibility');