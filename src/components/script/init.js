// init.js

/**
 * --- Initialization and Event Listeners ---
 */

"use strict";

// Helper function to restore theme early (though the inline script in HTML handles the critical FOUC prevention)
function init() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
}

// Cross-Tab Synchronization Listener
window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
        if (e.newValue === 'dark') document.documentElement.classList.add('dark-theme');
        else document.documentElement.classList.remove('dark-theme');
    }
    if (e.key === 'language') {
        // switchVisuals is available via window (from utils.js)
        window.switchVisuals(e.newValue);
    }
});


async function loadDataAndInit() {
    // Use global state
    if (window.isInitialized) return;
    window.isInitialized = true;

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

    // 5. Apply Initial Language and Translations (FIX: Moved up to show visuals immediately)
    // This resolves the issue by activating the correct language visuals *before* network calls.
    window.switchVisuals(window.savedLang);

    // 6. Load Publication Data (if on publications page, or pre-cache both languages) (Original Step 5)
    if (pageId === 'publications') {
        // The publications page needs data loaded immediately. This awaits the network response.
        await window.generatePublicationsContent(window.savedLang);
    } else if (!window.bookData || Object.keys(window.bookData).length === 0) {
        // Pre-cache primary language data only if not already loaded (e.g., from an inline script)
        try {
            const url = (window.savedLang === 'bn') ? window.JSON_URL_BN : window.JSON_URL_EN;
            window.bookData[window.savedLang] = await fetch(url).then(response => response.json());
        } catch (e) { console.error("Failed to load primary data on non-publications page:", e); }
    }

    // 7. Initialize Gallery Dots if they exist (only for publications) (Original Step 7)
    if (document.body.id === 'publications' && document.querySelector('.book-covers-container')) {
        window.setupGalleryDots('book-covers-carousel-1');
    }
    window.switchVisuals(window.savedLang);

    // 8. Load data for the *other* language (for fast switching) (Original Step 8)
    try {
        // Use global constant JSON_URL_EN
        const url = (window.savedLang === 'bn') ? window.JSON_URL_EN : window.JSON_URL_BN;
        // Store in global data
        window.bookData[(window.savedLang === 'bn' ? 'en' : 'bn')] = await fetch(url).then(response => response.json());
    } catch (e) {
        console.error("Failed to load secondary language data:", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Attach scroll listener
    window.addEventListener('scroll', () => {
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');
        const installBtn = document.getElementById('installBtn');
        const shouldShowScrollTop = window.scrollY > 300;
        const dontShowInstallBtn = window.scrollY > 100;

        // Toggle Scroll to Top Button
        if (scrollToTopBtn) {
            scrollToTopBtn.classList.toggle('show', shouldShowScrollTop);
        }

        // Toggle Install Button: Hide it when scrolling down (when scroll-to-top is shown)
        if (installBtn) {
            installBtn.classList.toggle('hide-on-scroll', dontShowInstallBtn);
        }
    });

    // loadDataAndInit must be called after other files load
    loadDataAndInit();

    // Show notice popup (double call structure preserved from original file)
    setTimeout(() => {
        window.showNoticePopup();
    }, 500);

    window.showNoticePopup();

    document.addEventListener('click', (event) => {
        const navLinks = document.getElementById('navLinks');
        const hamburgerBtn = document.getElementById('hamburgerBtn');

        const isOpen = navLinks && navLinks.classList.contains('open');

        const isClickInsideMenu = navLinks && navLinks.contains(event.target);
        const isClickOnButton = hamburgerBtn && hamburgerBtn.contains(event.target);

        // Close menu if open and click is outside the menu and not on the button
        if (isOpen && !isClickInsideMenu && !isClickOnButton) {
            window.toggleMenu(false);
        }
    });
});

// Attach to window for external/inline access
window.loadDataAndInit = loadDataAndInit;
