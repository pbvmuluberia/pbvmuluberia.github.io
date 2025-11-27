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
                 if(icon) element.appendChild(icon.cloneNode(true));
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
    const messageBox = document.getElementById('messageBox');
    const lang = getLang();
    // Use window.translations
    const message = window.translations[lang][messageKey] || window.translations['en'][messageKey] || messageKey;
    messageBox.textContent = message;
    messageBox.classList.add('show');
    setTimeout(() => messageBox.classList.remove('show'), 3000);
}

// Simple string hash function for consistent HSL color
function stringToHslColor(str, s, l) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'; 
}

function scrollToContent() {
    const nav = document.querySelector('nav.menu');
    const navHeight = nav ? nav.offsetHeight : 0;
    
    const targetElement = document.querySelector('h1.lang-content.active');
    
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    } else {
        console.warn("scrollToContent: No target element found to scroll to.");
    }
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    navLinks.classList.toggle('open');
    const isExpanded = navLinks.classList.contains('open');
    hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    hamburgerBtn.querySelector('i').className = isExpanded ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

function toggleTheme() {
    const htmlEl = document.documentElement;
    htmlEl.classList.toggle('dark-theme');
    
    const isDark = htmlEl.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Helper to enable mouse wheel horizontal scrolling
function enableMouseWheelScroll(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.addEventListener("wheel", (evt) => {
        if (container.scrollWidth > container.clientWidth) {
            evt.preventDefault();
            container.scrollLeft += evt.deltaY;
        }
    }, { passive: false });
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
    if(document.body.id === 'publications') {
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
window.switchVisuals = switchVisuals;
window.setLang = setLang;
