// script.js
// Global Variables
let currentProduct = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initPage();
});

// Initialize Page
function initPage() {
    // Simulate loading delay
    setTimeout(() => {
        document.getElementById('loading').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            initModals();
        }, 500);
    }, 1500);
}

// Initialize Modals
function initModals() {
    const modal = document.getElementById('acquisitionModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Open Acquisition Modal
function openAcquisitionModal(productName, productPrice) {
    currentProduct = { name: productName, price: productPrice };
    const modal = document.getElementById('acquisitionModal');
    const modalProductName = document.getElementById('modalProductName');
    
    if (modal && modalProductName) {
        modalProductName.textContent = productName;
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('visible');
        }, 10);
        
        // Prevent background scroll
        document.body.style.overflow = 'hidden';
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('acquisitionModal');
    if (modal) {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            currentProduct = null;
        }, 300);
    }
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
