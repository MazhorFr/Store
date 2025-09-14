// script.js
// Global Variables
let currentProduct = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading delay
    setTimeout(() => {
        document.getElementById('loading').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 500);
    }, 1500);

    // Initialize the page
    initNavigation();
    initScrollAnimations();
    initModals();
    loadProducts();
});

// Initialize Smooth Scroll Navigation
function initNavigation() {
    document.querySelectorAll('nav a, .cta-buttons a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Initialize Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize Modals
function initModals() {
    const modal = document.getElementById('purchaseModal');
    const closeBtn = document.querySelector('.close-modal');

    closeBtn.addEventListener('click', () => {
        closeModal();
    });

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

// Load Products from JSON (if you use it)
function loadProducts() {
    // This would fetch from products.json if you set it up
    // For now, products are hardcoded in HTML
    console.log("Products loaded");
}

// Open Purchase Modal
function openPurchaseModal(productName, productPrice) {
    currentProduct = { name: productName, price: productPrice };
    const modal = document.getElementById('purchaseModal');
    const modalTitle = document.querySelector('.modal-title');
    const modalText = document.querySelector('.modal-text');

    modalTitle.textContent = `Purchase ${productName}`;
    modalText.innerHTML = `Please confirm your purchase of <strong>${productName}</strong> for <strong>$${productPrice}</strong>. Enter your Discord ID below to proceed.`;

    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('visible');
        document.getElementById('userDiscordId').focus();
    }, 10);

    // Prevent background scroll
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('purchaseModal');
    modal.classList.remove('visible');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentProduct = null;
    }, 300);
}

// Confirm Purchase
function confirmPurchase() {
    const discordId = document.getElementById('userDiscordId').value.trim();
    if (!discordId) {
        alert('Please enter your Discord ID.');
        return;
    }

    if (!currentProduct) {
        alert('Error: No product selected.');
        return;
    }

    // Open PayPal
    const paypalLink = `https://paypal.me/Mazh0rfr/${currentProduct.price}`;
    window.open(paypalLink, '_blank');

    // Show success message
    alert(`✅ PURCHASE INITIATED!\n\n1. Complete your payment of $${currentProduct.price} on PayPal.\n2. MUST include this Discord ID in the note: "${discordId}"\n3. Your product will be delivered within 24 hours.\n\nThank you for your trust in 360.`);

    // Close modal
    closeModal();
}

// Buy Product Function (called from HTML)
function buyProduct(productName, productPrice) {
    openPurchaseModal(productName, productPrice);
}

// Optional: Add a cool terminal-like effect to the hero title
function initTerminalEffect() {
    const title = document.querySelector('.hero-title');
    const originalText = title.textContent;
    title.textContent = '';

    let i = 0;
    const typeWriter = setInterval(() => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 100);
}

// Initialize when page loads
window.onload = initTerminalEffect;
