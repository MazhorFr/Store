// script.js
// Global Variables
let currentProduct = null;
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!%^&*()";

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
            initScrollAnimations();
            initSoundEffects();
            initCryptoTicker();
            initScrambler();
        }, 500);
    }, 2000);
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

// Initialize Sound Effects
function initSoundEffects() {
    // Sounds are already loaded via Howler in the HTML
    // Add event listeners for UI sounds
    document.querySelectorAll('button, a, .nav-link').forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (window.soundEngine) window.soundEngine.hover.play();
        });
        element.addEventListener('click', () => {
            if (window.soundEngine) window.soundEngine.click.play();
        });
    });
}

// Initialize Crypto Ticker
function initCryptoTicker() {
    const updateCryptoPrices = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
            const data = await response.json();
            document.getElementById('btc-price').textContent = data.bitcoin.usd.toLocaleString();
            document.getElementById('eth-price').textContent = data.ethereum.usd.toLocaleString();
        } catch (error) {
            console.error('Failed to fetch crypto prices:', error);
            document.getElementById('btc-price').textContent = 'ERR';
            document.getElementById('eth-price').textContent = 'ERR';
        }
    };

    updateCryptoPrices();
    setInterval(updateCryptoPrices, 30000); // Update every 30 seconds
}

// Initialize Text Scrambler
function initScrambler() {
    const text = "WELCOME TO 360";
    const element = document.getElementById('scrambler-text');
    let iterations = 0;
    const duration = 40;
    const scrambleDuration = 20;

    const interval = setInterval(() => {
        element.innerText = text.split('')
            .map((char, index) => {
                if (index < iterations) {
                    return text[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iterations >= text.length) {
            clearInterval(interval);
            setTimeout(() => {
                element.style.animation = "glow 2s ease-in-out infinite alternate";
            }, 1000);
        }

        iterations += 1 / (scrambleDuration / duration);
    }, duration);
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

// Open Purchase Modal
function openPurchaseModal(productName, productPrice) {
    currentProduct = { name: productName, price: productPrice };
    const modal = document.getElementById('purchaseModal');
    const modalTitle = document.querySelector('.modal-title');
    const modalText = document.querySelector('.modal-text');

    modalTitle.textContent = `Acquire ${productName}`;
    modalText.innerHTML = `You are acquiring <strong>${productName}</strong> for <strong>$${productPrice}</strong>. Enter your Discord ID to proceed.`;

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

    if (window.soundEngine) window.soundEngine.confirm.play();

    // Open PayPal
    const paypalLink = `https://paypal.me/Mazh0rfr/${currentProduct.price}`;
    window.open(paypalLink, '_blank');

    // Show success message
    alert(`✅ ACQUISITION INITIATED\n\nProduct: ${currentProduct.name}\nAmount: $${currentProduct.price}\nDiscord ID: ${discordId}\n\nComplete payment on PayPal with your Discord ID in the notes. Delivery within 24 hours.`);

    closeModal();
}

// Buy Product Function (called from HTML)
function buyProduct(productName, productPrice) {
    openPurchaseModal(productName, productPrice);
}

// Smooth Scroll for Navigation Links
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
