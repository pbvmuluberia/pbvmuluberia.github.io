// utils.js

/**
 * --- Utility Functions and Core Logic ---
 */

"use strict";

// Helper to get language, defaults to 'bn'
function getLang() {
    return localStorage.getItem('language') || 'bn';
}

function applyTranslations() {
    const lang = getLang();
    // Use window.translations
    const langDict = window.translations[lang] || window.translations['bn'];

    // 1. Translate simple key-based elements
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (langDict[key]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', langDict[key]);
            } else if (element.classList.contains('deep-link-btn')) {
                const icon = element.querySelector('i');
                element.innerHTML = '';
                if (icon) element.appendChild(icon.cloneNode(true));
                element.appendChild(document.createTextNode(' ' + langDict[key]));
            } else {
                element.textContent = langDict[key];
            }
        }
    });

    // 2. Toggle static HTML content blocks
    document.querySelectorAll('.lang-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll(`.lang-content.${lang}`).forEach(el => el.classList.add('active'));
}

function showSubscriptionMessage(messageKey) {
    const messageBox = document.getElementById('subscription-message-box');
    const messageElement = document.getElementById('subscription-message');
    if (messageBox && messageElement && window.translations) {
        const lang = getLang();
        const message = window.translations[lang]?.messages?.[messageKey] || window.translations['bn']?.messages?.[messageKey];
        if (message) {
            messageElement.textContent = message;
            messageBox.classList.add('show');
            setTimeout(() => messageBox.classList.remove('show'), 4000);
        }
    }
}

function stringToHslColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = hash % 360;
    // Keep saturation and lightness high for good visibility in Gruvbox dark theme
    return `hsl(${h}, 70%, 75%)`;
}

function scrollToContent(id) {
    const targetId = id || 'main-content';
    const element = document.getElementById(targetId);
    if (element) {
        // Find the closest parent with class 'lang-content'
        let currentLangContainer = element.closest('.lang-content');
        // If the element is not in an active language container, switch the language first
        if (currentLangContainer && !currentLangContainer.classList.contains('active')) {
            const lang = currentLangContainer.classList.contains('en') ? 'en' : 'bn';
            setLang(lang);
            // Give a moment for the content to become visible
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        } else {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    // Also close the menu on navigation
    const navLinks = document.getElementById('navLinks');
    if (navLinks && navLinks.classList.contains('open')) {
        toggleMenu();
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    if (navLinks && hamburgerBtn) {
        navLinks.classList.toggle('open');
        hamburgerBtn.classList.toggle('active');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark-theme');
    const newTheme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
}

// Helper to enable mouse wheel horizontal scrolling
function enableMouseWheelScroll(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.addEventListener("wheel", (evt) => {
        // Check if content is wider than viewport
        if (container.scrollWidth > container.clientWidth) {
            evt.preventDefault();
            // Scroll horizontally based on vertical delta
            container.scrollLeft += evt.deltaY;
        }
    }, { passive: false });
}

// NEW: Function to generate and manage gallery dot indicators
function setupGalleryDots(containerId, dotsContainerId) {
    const container = document.getElementById(containerId);
    const dotsContainer = document.getElementById(dotsContainerId);

    if (!container || !dotsContainer) return;

    const items = container.querySelectorAll('.scroll-item');
    if (items.length === 0) return;

    // 1. Generate Dots
    dotsContainer.innerHTML = ''; // Clear existing
    items.forEach((item, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.index = index;
        if (index === 0) dot.classList.add('active'); // First dot is active initially

        // 2. Add Click Handler for Smooth Scroll
        dot.addEventListener('click', () => {
            // Calculate the left position of the target item
            // We want to scroll the item into view, aligned to the start (left)
            const itemOffsetLeft = item.offsetLeft - (item.parentNode.offsetLeft || 0);

            container.scrollTo({
                left: itemOffsetLeft,
                behavior: 'smooth'
            });
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    // 3. Update Dots on Scroll
    const updateDots = () => {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;

        let activeIndex = 0;

        // Find which item is currently the most prominent (e.g., closest to being fully visible at the start)
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemLeft = item.offsetLeft;
            const itemWidth = item.offsetWidth;

            // Check if the item's start position is close to the container's scroll position.
            // Using a threshold (e.g., half the item width) for activation.
            if (scrollLeft >= itemLeft - itemWidth / 2) {
                activeIndex = i;
            }
        }

        // Edge case: If fully scrolled to the end, ensure the last dot is active
        const maxScrollLeft = scrollWidth - containerWidth;
        if (scrollLeft >= maxScrollLeft - 5) { // 5px tolerance
            activeIndex = items.length - 1;
        }

        // Update class
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === activeIndex) {
                dot.classList.add('active');
            }
        });
    };

    // Throttle the scroll event listener for performance
    let isThrottled = false;
    container.addEventListener('scroll', () => {
        if (!isThrottled) {
            window.requestAnimationFrame(() => {
                updateDots();
                isThrottled = false;
            });
            isThrottled = true;
        }
    });

    // Run once on load and on resize to ensure initial state is correct 
    updateDots();
    window.addEventListener('resize', updateDots);
}


// 1. Update UI visually without affecting storage
async function switchVisuals(lang) {
    document.documentElement.lang = lang;

    // Button States
    document.getElementById('langEn').classList.remove('active');
    document.getElementById('langBn').classList.remove('active');
    const langElement = document.getElementById('lang' + lang.charAt(0).toUpperCase() + lang.slice(1));
    if (langElement) langElement.classList.add('active');

    // Text Content
    applyTranslations();

    // Dynamic Content (Publications)
    if (document.body.id === 'publications') {
        // Function from publication.js
        await window.updatePublicationsContent(lang);
    }
}

// 2. Set Language (Triggered by User Click)
async function setLang(lang) {
    localStorage.setItem('language', lang); // Save preference
    await switchVisuals(lang); // Update UI
}


// Attach to window for external/inline access
window.getLang = getLang;
window.applyTranslations = applyTranslations;
window.showSubscriptionMessage = showSubscriptionMessage;
window.stringToHslColor = stringToHslColor;
window.scrollToContent = scrollToContent;
window.scrollToTop = scrollToTop;
window.toggleMenu = toggleMenu;
window.toggleTheme = toggleTheme;
window.enableMouseWheelScroll = enableMouseWheelScroll;
window.setupGalleryDots = setupGalleryDots; // NEW
window.switchVisuals = switchVisuals;
window.setLang = setLang;