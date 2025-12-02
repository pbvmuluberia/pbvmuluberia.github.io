// init.js

/**
 * --- Initialization and Event Listeners ---
 */

"use strict";

function init() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
}

// 5. Cross-Tab Synchronization Listener
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

    // Assuming ComponentGenerator is defined elsewhere (or will be provided)
    // For now, these lines rely on an external dependency (ComponentGenerator)
    const navbarContainer = document.getElementById('navbar-placeholder');
    if (navbarContainer && typeof ComponentGenerator !== 'undefined' && typeof ComponentGenerator.getNavbar === 'function') {
        navbarContainer.innerHTML = ComponentGenerator.getNavbar(pageId);
    }

    const donationContainer = document.getElementById('donation-modal-placeholder');
    if (donationContainer && typeof ComponentGenerator !== 'undefined' && typeof ComponentGenerator.getDonationModal === 'function') {
        donationContainer.innerHTML = ComponentGenerator.getDonationModal();
    }

    const noticeContainer = document.getElementById('notice-modal-placeholder');
    if (noticeContainer && typeof ComponentGenerator !== 'undefined' && typeof ComponentGenerator.getNoticeModal === 'function') {
        noticeContainer.innerHTML = ComponentGenerator.getNoticeModal();
    }
    // -------------------------------------

    // Initialize Theme
    init();
    
    // Initialize Language (Defaults to BN)
    // getLang and switchVisuals are available via window (from utils.js)
    const savedLang = window.getLang();
    await window.switchVisuals(savedLang); 
    
    // Background Data Fetch for the *other* language
    try {
        // Use global constant JSON_URL_EN
        const url = (savedLang === 'bn') ? window.JSON_URL_EN : window.JSON_URL_BN; 
        const response = await fetch(url);
        // Store in global data
        window.bookData[(savedLang === 'bn' ? 'en' : 'bn')] = await response.json();
    } catch (e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', () => {
    // Attach scroll listener
    window.addEventListener('scroll', () => { 
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');
        if (scrollToTopBtn) scrollToTopBtn.classList.toggle('show', window.scrollY > 300); 
    });

    // loadDataAndInit must be called after other files load
    loadDataAndInit();
    
    setTimeout(() => {
        window.showNoticePopup();
    }, 500);
    
    // showNoticePopup is available via window (from modal.js)
    window.showNoticePopup(); 

    document.addEventListener('click', (event) => {
        const navLinks = document.getElementById('navLinks');
        const hamburgerBtn = document.getElementById('hamburgerBtn');

        const isOpen = navLinks.classList.contains('open');

        const isClickInsideMenu = navLinks.contains(event.target);
        const isClickOnButton = hamburgerBtn.contains(event.target);
        
        // toggleMenu is available via window (from utils.js)
        if (isOpen && !isClickInsideMenu && !isClickOnButton) {
            window.toggleMenu(); 
        }
    });
});
