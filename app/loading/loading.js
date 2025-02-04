// Duration
const LOADING_DURATION = 1500;

// Animation
const startLoading = () => {
    const progressFill = document.querySelector('.progress-fill');
    const loadingText = document.querySelector('.loading-text');
    
    progressFill.style.animationDuration = `${LOADING_DURATION}ms`;
    
    setTimeout(() => {
        window.location.href = 'app/Homepage.html';
    }, LOADING_DURATION);
};

document.addEventListener('DOMContentLoaded', () => {
    startLoading();
    
    // Anti-Right click thingy
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Anti-FOUC
    document.body.style.visibility = 'visible';
});