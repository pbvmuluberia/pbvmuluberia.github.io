/**
 * --- Initialization and Event Listeners ---
 * Updated to match status bar color with CSS --primary-color
 */

"use strict";

// Define theme colors for the meta tags based on style.css --primary-color
const THEME_COLORS = {
    // Light Mode Primary: hsl(24, 88%, 40%) -> #c0540c
    light: '#c0540c',
    // Dark Mode Primary: hsl(61, 66%, 44%) -> #babb26
    dark: '#babb26' 
};

/**
 * Helper to update <meta> tags for browser UI coloring
 */
function updateMetaThemeColor(isDark) {
    const color = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
    
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const appleStatusMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar"]');

    if (themeColorMeta) themeColorMeta.setAttribute('content', color);
    if (appleStatusMeta) appleStatusMeta.setAttribute('content', color);
}

/**
 * Initial theme setup
 */
function init() {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    
    if (isDark) {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
    
    // Set initial meta color
    updateMetaThemeColor(isDark);
}

// --- AUTOMATIC THEME OBSERVER ---
// Watches the <html> element. If 'dark-theme' class is added/removed,
// this triggers automatically to update the browser status bar.
const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const isDark = document.documentElement.classList.contains('dark-theme');
            updateMetaThemeColor(isDark);
        }
    });
});

// Start observing
themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
});

// --- Cross-Tab Synchronization Listener ---
window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
        // We only need to toggle the class here. 
        // The MutationObserver above will handle the meta tag update.
        if (e.newValue === 'dark') document.documentElement.classList.add('dark-theme');
        else document.documentElement.classList.remove('dark-theme');
    }
    if (e.key === 'language') {
        // switchVisuals is available via window (from utils.js)
        if (window.switchVisuals) window.switchVisuals(e.newValue);
    }
});


async function loadDataAndInit() {
    // Use global state
    if (window.isInitialized) return;
    window.isInitialized = true;

    // Run basic init to ensure colors are correct immediately
    init();

    const pageId = document.body.id || 'home';

    // 1. Inject Navbar
    const navbarContainer = document.getElementById('navbar-placeholder');
    if (navbarContainer && typeof ComponentGenerator !== 'undefined' && typeof ComponentGenerator.getNavbar === 'function') {
        navbarContainer.innerHTML = ComponentGenerator.getNavbar(pageId);
    }

    // 2. Inject Donation Modal
    const donationContainer = document.getElementById('donation-modal-placeholder');
    if (donationContainer && typeof ComponentGenerator !== 'undefined' && typeof ComponentGenerator.getDonationModal === 'function') {
        donationContainer.innerHTML = ComponentGenerator.getDonationModal();
    }

    // 3. Inject Notice Modal
    const noticeContainer = document.getElementById('notice-modal-placeholder');
    if (noticeContainer && typeof ComponentGenerator !== 'undefined' && typeof ComponentGenerator.getNoticeModal === 'function') {
        noticeContainer.innerHTML = ComponentGenerator.getNoticeModal();
    }

    // 4. Inject Hero/Carousel
    const heroContainer = document.getElementById('hero-placeholder');
    if (heroContainer && typeof ComponentGenerator !== 'undefined' && typeof ComponentGenerator.getHero === 'function') {

        const activeId = pageId || 'home';
        const titleKey = `carousel_${activeId}_name`;
        const descKey = `carousel_${activeId}_des`;
        const btnKey = `carousel_${activeId}_btn`;
        const bgImage = `../../background/${activeId}.jpeg`;

        heroContainer.innerHTML = ComponentGenerator.getHero(titleKey, descKey, btnKey, bgImage);
    }

    // 5. Apply Initial Language and Translations
    window.savedLang = localStorage.getItem('language') || 'bn';
    if (window.switchVisuals) window.switchVisuals(window.savedLang);

    // 6. Load Publication Data
    if (pageId === 'publications') {
        // The publications page needs data loaded immediately.
        if (window.generatePublicationsContent) await window.generatePublicationsContent(window.savedLang);
    } else if (!window.bookData || Object.keys(window.bookData).length === 0) {
        // Pre-cache primary language data
        try {
            const url = (window.savedLang === 'bn') ? window.JSON_URL_BN : window.JSON_URL_EN;
            if (url) window.bookData[window.savedLang] = await fetch(url).then(response => response.json());
        } catch (e) { console.error("Failed to load primary data on non-publications page:", e); }
    }

    // 7. Initialize Gallery Dots
    if (document.body.id === 'publications' && document.querySelector('.book-covers-container')) {
        if (window.setupGalleryDots) window.setupGalleryDots('book-covers-carousel-1');
    }
    
    if (window.switchVisuals) window.switchVisuals(window.savedLang);

    // 8. Load data for the *other* language (for fast switching)
    try {
        const url = (window.savedLang === 'bn') ? window.JSON_URL_EN : window.JSON_URL_BN;
        if (url) window.bookData[(window.savedLang === 'bn' ? 'en' : 'bn')] = await fetch(url).then(response => response.json());
    } catch (e) {
        console.error("Failed to load secondary language data:", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Attach scroll listener
    window.addEventListener('scroll', () => {
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');
        if (scrollToTopBtn) scrollToTopBtn.classList.toggle('show', window.scrollY > 300);
    });

    // loadDataAndInit must be called after other files load
    loadDataAndInit();

    // Show notice popup
    setTimeout(() => {
        if (window.showNoticePopup) window.showNoticePopup();
    }, 500);

    if (window.showNoticePopup) window.showNoticePopup();

    // Close mobile menu on outside click
    document.addEventListener('click', (event) => {
        const navLinks = document.getElementById('navLinks');
        const hamburgerBtn = document.getElementById('hamburgerBtn');

        const isOpen = navLinks && navLinks.classList.contains('open');
        const isClickInsideMenu = navLinks && navLinks.contains(event.target);
        const isClickOnButton = hamburgerBtn && hamburgerBtn.contains(event.target);

        if (isOpen && !isClickInsideMenu && !isClickOnButton) {
            if (window.toggleMenu) window.toggleMenu(false);
        }
    });
});

// Attach to window for external/inline access
window.loadDataAndInit = loadDataAndInit;
