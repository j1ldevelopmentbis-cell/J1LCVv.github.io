// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');
    
    // Animate Links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                navLinksItems.forEach(link => {
                    link.style.animation = '';
                });
                burger.classList.remove('toggle');
            }
        }
    });
});

// Header Shadow on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-category, .project-card, .stat-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animations on load for elements already in view
    animateOnScroll();
});

// Trigger animations on scroll
window.addEventListener('scroll', animateOnScroll);

// Form Validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]');
        const email = this.querySelector('input[type="email"]');
        const message = this.querySelector('textarea');
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Simple validation
        if (name.value.trim() === '') {
            name.style.borderColor = 'red';
            return;
        } else {
            name.style.borderColor = '#ddd';
        }
        
        if (email.value.trim() === '' || !isValidEmail(email.value)) {
            email.style.borderColor = 'red';
            return;
        } else {
            email.style.borderColor = '#ddd';
        }
        
        if (message.value.trim() === '') {
            message.style.borderColor = 'red';
            return;
        } else {
            message.style.borderColor = '#ddd';
        }
        
        // Form submission simulation
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Message sent successfully!');
            this.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Dynamic Button Effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.innerHTML = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        animation: rippleEffect 0.6s linear;
    }
    
    @keyframes rippleEffect {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Project Card Hover Effect Enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add dynamic CSS for project cards
const projectCardStyle = document.createElement('style');
projectCardStyle.innerHTML = `
    .project-card {
        position: relative;
        overflow: hidden;
    }
    
    .project-card::before {
        content: '';
        position: absolute;
        top: var(--mouse-y, 0);
        left: var(--mouse-x, 0);
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(108, 99, 255, 0.1) 0%, transparent 80%);
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
        pointer-events: none;
        z-index: 1;
    }
    
    .project-card:hover::before {
        width: 300px;
        height: 300px;
    }
`;
document.head.appendChild(projectCardStyle);