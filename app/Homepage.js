document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    const isLoading = sessionStorage.getItem('isLoading');
    
    if(!isLoading) {
        sessionStorage.setItem('isLoading', true);
        window.location.href = '../index.html';
    } else {
        setTimeout(() => {
            loadingScreen.classList.add('loading-hidden');
        }, 1000);
    }
});

window.addEventListener('beforeunload', () => {
    document.getElementById('loadingScreen').classList.remove('loading-hidden');
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);
});

// Refresh
window.addEventListener('beforeunload', () => {
    document.body.classList.add('loading');
    sessionStorage.setItem('isLoading', 'true');
});

// Cursor glow
const gridSpotlight = document.querySelector('.grid-spotlight');
let posX = 0, posY = 0;
const smoothness = 0.15;

// Glow thingy visibility
gridSpotlight.style.opacity = '0';

document.addEventListener('mousemove', (e) => {
    // Place
    posX = e.clientX - (gridSpotlight.offsetWidth / 2);
    posY = e.clientY - (gridSpotlight.offsetHeight / 2);
    
    gridSpotlight.style.left = `${posX}px`;
    gridSpotlight.style.top = `${posY}px`;
    
    // Visibility
    gridSpotlight.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    gridSpotlight.style.opacity = '0';
});

// Boop boop thingy
gridSpotlight.animate([
    { transform: 'scale(1)', opacity: 0.8 },
    { transform: 'scale(1.2)', opacity: 0.4 },
    { transform: 'scale(1)', opacity: 0.8 }
], {
    duration: 2500,
    iterations: Infinity,
    easing: 'ease-in-out'
});

// Header things
const nav = document.querySelector('.nav');
let lastScroll = 0;

// Header blur thingy
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Scroll detection stuff
    const scrollDirection = currentScroll > lastScroll ? 'down' : 'up';
    lastScroll = currentScroll;
    
    // Header management stuff
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
        nav.style.transform = scrollDirection === 'down' 
            ? 'translateY(-100%)' 
            : 'translateY(0)';
    } else {
        nav.classList.remove('scrolled');
        nav.style.transform = 'translateY(0)';
    }
});

// Mobile stuff
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu click thingy
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Gallery stuff
const gallery = document.querySelector('.gallery-grid');
const projects = [
    { title: "Game Character", tools: "Blender + ZBrush", category: "3D & 2D" },
    { title: "App/Web UI", tools: "Figma", category: "Design" },
    { title: "Artwork", tools: "Ibis Paint X + Photoshop", category: "2D Art" },
    { title: "Brand Identity", tools: "Illustrator + After Effects", category: "Design" },
    { title: "3D Environments", tools: "Unreal Engine + Maya", category: "3D" },
    { title: "Web Designs", tools: "Figma + Webflow", category: "Development" },
    { title: "Story Concepts", tools: "Creative Writing", category: "Writing" },
    { title: "Logo Designs", tools: "Illustrator + InkScape", category: "Design" },
    { title: "VR/AR Experience", tools: "Spark AR + Blender", category: "3D" },
    { title: "Game Assets", tools: "Substance Designer + Maya", category: "3D" }
];

// Gallery loading thingy
const createGalleryItem = (project) => {
    const item = document.createElement('div');
    item.className = `gallery-item ${project.category.toLowerCase()}`;
    item.innerHTML = `
        <div class="image-placeholder">
            <div class="loading-overlay"></div>
        </div>
        <div class="project-overlay">
            <h3>${project.title}</h3>
            <p>${project.tools}</p>
            <span class="project-category">${project.category}</span>
        </div>
    `;
    return item;
};

// Initializer G
projects.forEach(project => {
    gallery.appendChild(createGalleryItem(project));
});

// Scroll extra stuff
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.15,
    rootMargin: '0px 0px -25px 0px'
});

// Observer
document.querySelectorAll('.section-title').forEach(el => observer.observe(el));

// Scroll smoothner
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = nav.offsetHeight + 20;
        const targetPosition = target.offsetTop - headerOffset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Form stuff
const form = document.querySelector('#contact-form');
const inputs = document.querySelectorAll('input, textarea');

// Error msg thingy
const errorMessages = {
    valueMissing: 'This field is required',
    typeMismatch: 'Please enter a valid email address',
    tooShort: 'Message should be at least 20 characters'
};

// Validation stuff
const showError = (input, message) => {
    const error = document.createElement('small');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#ff4444';
    error.style.marginTop = '0.5rem';
    error.style.display = 'block';
    input.parentNode.insertBefore(error, input.nextSibling);
    input.classList.add('invalid');
};

const clearErrors = () => {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    inputs.forEach(input => input.classList.remove('invalid'));
};

// Real-time check thingy
inputs.forEach(input => {
    input.addEventListener('input', () => {
        clearErrors();
        
        if (!input.validity.valid) {
            let message = errorMessages.valueMissing;
            
            if (input.validity.typeMismatch) {
                message = errorMessages.typeMismatch;
            } else if (input.validity.tooShort) {
                message = errorMessages.tooShort;
            }
            
            showError(input, message);
        }
    });
});

// Form handler thingy
form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    if (form.checkValidity()) {
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));
        
        form.classList.add('success');
        setTimeout(() => form.classList.remove('success'), 3000);
        form.reset();
    } else {
        inputs.forEach(input => {
            if (!input.validity.valid) {
                showError(input, input.validationMessage);
            }
        });
    }
});

// Extra stuff
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView();
    }

    document.body.style.visibility = 'visible';
});

// Optimizer
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        gallery.style.display = 'none';
        gallery.offsetHeight;
        gallery.style.display = 'grid';
    }, 100);
});

// Ease in Ease out thingy
let lastAnimation = 0;
const animationThrottle = 16;
window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastAnimation >= animationThrottle) {
        lastAnimation = now;
    }
});

        // Other stuff
        if('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }

        // Offline thingy
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        function updateOnlineStatus() {
            const warning = document.querySelector('.offline-warning');
            warning.hidden = navigator.onLine;
        }