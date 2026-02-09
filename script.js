

// ==========================================
// INTRO ANIMATION SEQUENCE
// ==========================================

function initIntroSequence() {
    const introOverlay = document.querySelector('.intro-overlay');
    const introWelcome = document.querySelector('.intro-welcome');
    const introWorld = document.querySelector('.intro-world');
    const abstractElements = document.querySelectorAll('.abstract-element');
    const heroContent = document.querySelector('.hero-content');
    const logo = document.querySelector('.logo-container');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    // Step 1: Show "WELCOME TO"
    setTimeout(() => {
        introWelcome.classList.add('animate');
    }, 500);
    
    // Step 2: Move "WELCOME TO" up and show "MY WORLD"
    setTimeout(() => {
        introWelcome.classList.add('move-up');
        introWorld.classList.add('animate');
    }, 2000);
    
    // Step 3: Wake abstract elements with stagger
    setTimeout(() => {
        abstractElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('wake');
            }, i * 200);
        });
    }, 2800);
    
    // Step 4: Exit intro and show main content
    setTimeout(() => {
        introOverlay.classList.add('exit');
        heroContent.classList.add('visible');
        logo.classList.add('visible');
        scrollProgress.classList.add('visible');
    }, 4200);
    
    // Step 5: Remove intro from DOM
    setTimeout(() => {
        introOverlay.classList.add('hidden');
    }, 5600);
}

// ==========================================
// CUSTOM CURSOR SYSTEM - FAST & RESPONSIVE
// ==========================================

const cursor = {
    dot: document.querySelector('.cursor-dot'),
    ring: document.querySelector('.cursor-ring'),
    label: document.querySelector('.cursor-label'),
    container: document.querySelector('.cursor'),
    
    pos: { x: 0, y: 0 },
    mouse: { x: 0, y: 0 },
    speed: 0.55,
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Dot follows immediately
            this.dot.style.left = this.mouse.x + 'px';
            this.dot.style.top = this.mouse.y + 'px';
        });
        
        this.render();
        this.addHoverEffects();
    },
    
    render() {
          this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
          this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

          // use transform instead of left/top (smoother)
          this.ring.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0) translate3d(-50%, -50%, 0)`;
          this.label.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y - 50}px, 0) translate3d(-50%, -50%, 0)`;

          requestAnimationFrame(() => this.render());
    },

    
    addHoverEffects() {
        const hoverTargets = document.querySelectorAll('a, .project-card, .process-step, .capability-item, [data-magnetic]');
        
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                this.container.classList.add('hover');
                
                // Set contextual labels
                let label = '';
                if (target.classList.contains('project-card')) label = 'VIEW';
                else if (target.classList.contains('contact-email')) label = 'EMAIL';
                else if (target.classList.contains('contact-phone')) label = 'CALL';
                else if (target.classList.contains('process-step')) label = 'PROCESS';
                else if (target.classList.contains('capability-item')) label = 'SKILL';
                else if (target.tagName === 'A') label = 'OPEN';
                
                if (label) {
                    this.label.textContent = label;
                    this.container.classList.add('show-label');
                }
            });
            
            target.addEventListener('mouseleave', () => {
                this.container.classList.remove('hover');
                this.container.classList.remove('show-label');
            });
        });
    }
};

// ==========================================
// MAGNETIC EFFECT
// ==========================================

function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--magnetic-strength'));
            
            const moveX = x * strength;
            const moveY = y * strength;
            
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// ==========================================
// PARALLAX LAYERS - SMOOTH RAF
// ==========================================

function initParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    });
    
    function animate() {
        currentX += (mouseX - currentX) * 0.035;
        currentY += (mouseY - currentY) * 0.035;

        layers.forEach((layer, i) => {
          const depth = (i + 1) * 10; // was 20, too much
          const moveX = currentX * depth;
          const moveY = currentY * depth;
          layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform =
      `translate3d(${x * 6}px, ${y * 6}px, 0) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translate3d(0,0,0))';
  });
});


// ==========================================
// SCROLL PROGRESS - SMOOTH UPDATE
// ==========================================

function updateScrollProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const currentSection = document.querySelector('.current-section');
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const maxScroll = documentHeight - windowHeight;
    const progress = (scrollTop / maxScroll) * 100;
    
    progressFill.style.height = Math.min(progress, 100) + '%';
    
    // Update section counter
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            currentSection.textContent = String(i + 1).padStart(2, '0');
        }
    });
}

// ==========================================
// SCROLL REVEAL - STAGGERED
// ==========================================

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -120px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay if multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-reveal]').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// FLOATING STICKS PULSE - RANDOM
// ==========================================

function initSticksPulse() {
    const sticks = document.querySelectorAll('.stick');
    
    function randomPulse() {
        const randomStick = sticks[Math.floor(Math.random() * sticks.length)];
        randomStick.classList.add('pulse');
        
        setTimeout(() => {
            randomStick.classList.remove('pulse');
        }, 1000);
        
        // Next pulse at random interval
        const nextDelay = 1000 + Math.random() * 2000;
        setTimeout(randomPulse, nextDelay);
    }
    
    setTimeout(randomPulse, 3000);
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Start intro sequence
    initIntroSequence();
    
    // Initialize cursor - fast and responsive
    cursor.init();
    
    // Initialize magnetic effect
    initMagneticEffect();
    
    // Initialize parallax
    initParallax();
    
    // Setup scroll progress
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
    
    // Setup scroll reveal with stagger
    initScrollReveal();
    
    // Initialize sticks pulse
    initSticksPulse();
});

// ==========================================
// CLICK FEEDBACK MICRO-INTERACTION
// ==========================================

document.addEventListener('mousedown', (e) => {
    const target = e.target.closest('.project-card, .process-step, .capability-item, .glass, .glass-soft');
    if (target) {
        const originalTransform = target.style.transform;
        target.style.transform = originalTransform + ' scale(0.97)';
        
        setTimeout(() => {
            target.style.transform = originalTransform;
        }, 200);
    }
});

// ==========================================
// KEYBOARD SHORTCUTS PREVENTION
// ==========================================

document.addEventListener('keydown', (e) => {
    // Prevent common browser shortcuts
    if (e.ctrlKey || e.metaKey) {
        if (['s', 'p', 'f'].includes(e.key.toLowerCase())) {
            e.preventDefault();
        }
    }
});

// ==========================================
// CONTEXT MENU PREVENTION
// ==========================================

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});