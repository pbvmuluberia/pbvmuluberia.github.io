"use strict";

const translations = {
    'en': {
        'nav_menu': 'Menu',
        'nav_home': 'Home',
        'nav_about': 'About',
        'nav_projects': 'Projects',
        'nav_publications': 'Publications',
        'nav_download': 'Download',
        'nav_contact': 'Contact',
        'carousel_home_name': 'Welcome',
        'carousel_home_des': 'Uluberia Vigyan Kendra',
        'carousel_home_btn': "See What's New",
        'carousel_donate_btn': 'Donate to us',
        'carousel_about_name': 'About',
        'carousel_about_des': 'Learn about us here.',
        'carousel_about_btn': 'Learn About Us',
        'carousel_projects_name': 'Projects',
        'carousel_projects_des': 'Our ongoing and past projects.',
        'carousel_projects_btn': 'View Projects',
        'carousel_publications_name': 'Publications',
        'carousel_publications_des': 'Read our publications and research.',
        'carousel_publications_btn': 'Read Publications',
        'carousel_download_name': 'Download',
        'carousel_download_des': 'Get downloadable resources here.',
        'carousel_download_btn': 'Get Resources',
        'carousel_contact_name': 'Contact',
        'carousel_contact_des': 'Reach out to us anytime.',
        'carousel_contact_btn': 'Get in Touch',
        'donate_title': 'Support Our Mission',
        'donate_choose_amount': 'Choose Amount:',
        'other_amnt': 'Other',
        'donate_scan_qr': 'Scan the QR code below.',
        'donate_open_upi': 'Open in UPI App',
        'donate_upi_id_label': 'UPI ID:',
        'donate_copy_upi': 'Copy UPI ID',
        'donate_note': 'Your generous contribution directly funds our science popularization and community projects.',
        'book_type_magazine': 'Type: Recurring Magazine',
        'book_type_standard': 'Type: Standard Publication',
        'book_no_description': 'No description available for this publication.',
        'book_btn_buy': 'Buy Now',
        'book_btn_subscribe': 'Subscribe',
        'book_btn_download': 'Download / Read More',
        'msg_purchase_dev': 'Purchase/Download feature is under development.',
        'msg_subscribe_dev': 'Subscription feature is under development. Thank you for your interest!',
        'msg_upi_copied': 'UPI ID copied to clipboard!',
        'msg_upi_fail': 'Failed to copy UPI ID.',
        'pub_subscribe_prompt': 'Want to enjoy our regular magazines? Subscribe today!',
        'pub_subscribe_btn': 'Become a Subscriber',
        'pub_featured_title': 'Featured Publications',
        'pub_error_loading': 'Error loading publications. Please check your connection and try again.'
    },
    'bn': {
        'nav_menu': 'মেনু',
        'nav_home': 'হোম',
        'nav_about': 'আমাদের কথা',
        'nav_projects': 'প্রকল্প',
        'nav_publications': 'প্রকাশনা',
        'nav_download': 'ডাউনলোড',
        'nav_contact': 'যোগাযোগ',
        'carousel_home_name': 'অভিনন্দন',
        'carousel_home_des': 'উলুবেড়িয়া বিজ্ঞান কেন্দ্র',
        'carousel_home_btn': 'নতুন কি দেখুন',
        'carousel_donate_btn': 'অনুদান',
        'carousel_about_name': 'আমাদের কথা',
        'carousel_about_des': 'আমাদের সম্পর্কে এখানে জানুন।',
        'carousel_about_btn': 'আমাদের সম্পর্কে জানুন',
        'carousel_projects_name': 'কর্মলাপ',
        'carousel_projects_des': 'আমাদের চলমান এবং অতীত কর্মকলাপ সমুহ।',
        'carousel_projects_btn': 'কর্মলাপ সম্পর্কে জানুন',
        'carousel_publications_name': 'প্রকাশনা',
        'carousel_publications_des': 'আমাদের প্রকাশনাগুলি পড়ুন।',
        'carousel_publications_btn': 'প্রকাশনা পড়ুন',
        'carousel_download_name': 'ডাউনলোড',
        'carousel_download_des': 'ডাউনলোডযোগ্য নথিগুলি এখানে পান।',
        'carousel_download_btn': 'বিস্তারিত দেখুন',
        'carousel_contact_name': 'যোগাযোগ',
        'carousel_contact_des': 'যেকোনো সময় আমাদের সাথে যোগাযোগ করুন।',
        'carousel_contact_btn': 'যোগাযোগ করুন',
        'donate_title': 'আমাদের পাশে দাঁড়ান',
        'donate_choose_amount': 'পরিমাণ চয়ন করুন:',
        'other_amnt': 'পছন্দসই',
        'donate_scan_qr': 'নীচের QR কোড স্ক্যান করুন।',
        'donate_open_upi': 'UPI অ্যাপে খুলুন',
        'donate_upi_id_label': 'UPI ID:',
        'donate_copy_upi': 'UPI ID কপি করুন',
        'donate_note': 'আপনার সহযোগীতা সরাসরি আমাদের বিজ্ঞান জনপ্রিয়করণ এবং কার্যকলাপগুলিকে অর্থায়ন করে।',
        'book_type_magazine': 'ধরন: ধারাবাহিক পত্রিকা',
        'book_type_standard': 'ধরন: বই',
        'book_no_description': 'এই প্রকাশনার জন্য কোন বিবরণ উপলব্ধ নেই।',
        'book_btn_buy': 'এখনই কিনুন',
        'book_btn_subscribe': 'গ্রাহক হন',
        'book_btn_download': 'ডাউনলোড / আরও পড়ুন',
        'msg_purchase_dev': 'ক্রয়/ডাউনলোড বৈশিষ্ট্যটি নির্মাণাধীন।',
        'msg_subscribe_dev': 'সাবস্ক্রিপশন বৈশিষ্ট্যটি নির্মাণাধীন। আপনার আগ্রহের জন্য ধন্যবাদ!',
        'msg_upi_copied': 'UPI ID ক্লিপবোর্ডে কপি করা হয়েছে!',
        'msg_upi_fail': 'UPI ID কপি করতে ব্যর্থ।',
        'pub_subscribe_prompt': ' আপনি কি আমাদের নিয়মিত পত্রিকা উপভোগ করতে চান? আজই গ্রাহক হন!',
        'pub_subscribe_btn': 'গ্রাহক হন',
        'pub_featured_title': ' পত্রিকা ও বই',
        'pub_error_loading': 'প্রকাশনা লোড করতে ত্রুটি। অনুগ্রহ করে আপনার সংযোগ পরীক্ষা করুন এবং আবার চেষ্টা করুন।'
    }
};

const JSON_URL_EN = "https://gist.githubusercontent.com/pbvmuluberia/b6bf520cce8c1b0167a6657b2c60e4d2/raw/eb327ee9d32d9f3e57f45c4dd0c6c2ec16c4d895/book.json";
const JSON_URL_BN = "https://gist.githubusercontent.com/pbvmuluberia/e5e2122ddf3ac7489e61be9f81e475fd/raw/211d2029afbc4e1785f7bc22e552f459493b64e1/book_bn.json";

window.bookData = { en: null, bn: null };
const UPI_ID = '9433361030@ucobank';
const VPA_NAME = 'Paschim Banga Vigyan Mancha (Uluberia Vigyan Kendra)'; 
let currentDonationAmount = 100;
let isInitialized = false;

// Helper to get language, defaults to 'bn'
function getLang() { 
    return localStorage.getItem('language') || 'bn'; 
}

function applyTranslations() {
    const lang = getLang();
    const langDict = translations[lang] || translations['bn']; // Fallback to BN
    
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

/* script.js (Modified function) */

function generateBookCardsHtml(bookArray) {
    const containerId = 'book-covers-carousel-1';
    let cardsHtml = '';
    if (!bookArray) return '';
    bookArray.forEach(book => {
        const bookJsonString = JSON.stringify(book).replace(/"/g, '&quot;');
        const fallbackUrl = `https://placehold.co/150x225/d79921/3c3836?text=Book+Cover`;
        const badgeHtml = book.isMagazine ? '<span class="magazine-badge">MAGAZINE</span>' : '';
        
        // --- START MODIFICATION ---
        const borderColor = stringToHslColor(book.title, 70, 40); // S=70, L=40 gives vibrant colors
        
        // ADDED: Setting the CSS variable --card-border-color in the inline style
        cardsHtml += `<div class="book-card" style="--card-border-color: ${borderColor}; border: 2px solid var(--card-border-color);" onclick="window.showBookDetails(this)" data-book-json="${bookJsonString}">${badgeHtml}<img src="${book.url}" alt="Cover of ${book.title}" onerror="this.onerror=null;this.src='${fallbackUrl}';"><h3>${book.title}</h3></div>`;
        // --- END MODIFICATION ---
    });
    return `<div class="book-carousel-wrapper"><button class="carousel-arrow left-arrow" onclick="window.scrollCarousel('${containerId}', 'left')"><i class="fa-solid fa-chevron-left"></i></button><div class="book-covers-container" id="${containerId}">${cardsHtml}</div><button class="carousel-arrow right-arrow" onclick="window.scrollCarousel('${containerId}', 'right')"><i class="fa-solid fa-chevron-right"></i></button></div>`;
}

function generatePublicationsContent(bookArray) {
    const lang = getLang();
    const langDict = translations[lang];
    const hasMagazines = bookArray.some(book => book.isMagazine);
    let subscribeButtonHtml = hasMagazines ? `<div class="subscribe-button-container"><p class="subscribe-text">${langDict.pub_subscribe_prompt}</p><button class="subscribe-button" onclick="window.showSubscriptionMessage('msg_subscribe_dev')"><i class="fa-solid fa-bell"></i> ${langDict.pub_subscribe_btn}</button></div>` : '';
    const bookCardsHtml = generateBookCardsHtml(bookArray);
    return `<h2>${langDict.pub_featured_title}</h2>${bookCardsHtml}${subscribeButtonHtml}`;
}

function scrollCarousel(containerId, direction) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
}

function showSubscriptionMessage(messageKey) {
    const messageBox = document.getElementById('messageBox');
    const lang = getLang();
    const message = translations[lang][messageKey] || translations['en'][messageKey] || messageKey;
    messageBox.textContent = message;
    messageBox.classList.add('show');
    setTimeout(() => messageBox.classList.remove('show'), 3000);
}

function generateTransactionReference() {
    const now = new Date();
    const pad = (num) => num.toString().padStart(2, '0');
    return now.getFullYear().toString() + pad(now.getMonth() + 1) + pad(now.getDate()) + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
}

function generateUpiLink(amount) {
    const encodedVpaName = encodeURIComponent(VPA_NAME);
    let upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodedVpaName}&cu=INR&tr=${generateTransactionReference()}`;
    const amountFloat = parseFloat(amount);
    if (!isNaN(amountFloat) && amountFloat > 0) upiLink += `&am=${amountFloat.toFixed(2)}`;
    return upiLink;
}

function updateQrCode(amount) {
    const qrContainer = document.getElementById('upiQrCodeContainer');
    const deepLinkBtn = document.getElementById('deepLinkBtn');
    if (typeof QRCode === 'undefined') { if (qrContainer) qrContainer.innerHTML = 'Error'; return; }
    const upiLink = generateUpiLink(amount);
    if (qrContainer) {
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, { text: upiLink, width: 250, height: 250 });
    }
    if (deepLinkBtn) deepLinkBtn.href = upiLink;
}

function selectAmount(amount) {
    const amountButtons = document.querySelectorAll('#donationAmountSelectors .amount-btn');
    currentDonationAmount = amount;
    amountButtons.forEach(btn => btn.classList.remove('active'));
    const selectedButton = document.querySelector(`.amount-btn[data-amount="${amount}"]`);
    if (selectedButton) selectedButton.classList.add('active');
    updateQrCode(amount);
}

function showDonationPopup() {
    const overlay = document.getElementById('donationOverlay');
    const card = document.getElementById('donationCard');
    if (overlay && card) { selectAmount(currentDonationAmount || 100); overlay.classList.add('show'); card.classList.add('show'); document.body.style.overflow = 'hidden'; }
}

function hideDonationPopup() {
    const overlay = document.getElementById('donationOverlay');
    const card = document.getElementById('donationCard');
    if (overlay && card) { overlay.classList.remove('show'); card.classList.remove('show'); document.body.style.overflow = ''; }
}

function copyUpiId() {
    navigator.clipboard.writeText(UPI_ID).then(() => showSubscriptionMessage('msg_upi_copied')).catch(() => showSubscriptionMessage('msg_upi_fail'));
}

function showBookDetails(cardElement) {
    hideDonationPopup();
    const overlay = document.getElementById('bookDetailOverlay');
    const detailCard = document.getElementById('bookDetailCard');
    const lang = getLang();
    const langDict = translations[lang];
    const book = JSON.parse(cardElement.getAttribute('data-book-json').replace(/&quot;/g, '"'));
    
    const badgeElement = document.getElementById('detailBookBadge');
    
    // --- MODIFIED: Ensure new badge styles are applied ---
    if (book.price) { 
        // Use a generic price format, as the badge is no longer just for 'magazine'
        badgeElement.textContent = book.price; 
        badgeElement.style.display = 'inline-block'; 
        badgeElement.style.position = 'static'; // Ensure it adheres to new flexbox layout
    } else { 
        badgeElement.style.display = 'none'; 
    }
    // --- END MODIFIED ---
    
    const actionBtn = document.getElementById('detailActionBtn');
    if (book.price) actionBtn.textContent = langDict.book_btn_buy;
    else if (book.isMagazine) actionBtn.textContent = langDict.book_btn_subscribe;
    else actionBtn.textContent = langDict.book_btn_download;
    document.getElementById('detailBookCover').src = book.url;
    document.getElementById('detailBookType').textContent = book.isMagazine ? langDict.book_type_magazine : langDict.book_type_standard;
    document.getElementById('detailBookDescription').textContent = book.description || langDict.book_no_description;
    overlay.classList.add('show'); detailCard.classList.add('show'); document.body.style.overflow = 'hidden';
}

function hideBookDetails() {
    document.getElementById('bookDetailOverlay').classList.remove('show');
    document.getElementById('bookDetailCard').classList.remove('show');
    document.body.style.overflow = '';
}

function scrollToContent() {
    const nav = document.querySelector('nav.menu');
    const navHeight = nav ? nav.offsetHeight : 0;
    
    // 1. Try to find the specific language title (works for Home/About)
    // 2. Fallback to the main content container (works for Publications/others)
    const targetElement = document.querySelector('h1.lang-content.active');
    
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    } else {
        console.warn("scrollToContent: No target element found to scroll to.");
    }
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
window.addEventListener('scroll', () => { 
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) scrollToTopBtn.classList.toggle('show', window.scrollY > 300); 
});

// CORE LOGIC FOR PERSISTENCE & SYNC

// 1. Update UI visually without affecting storage (Internal helper)
async function switchVisuals(lang) {
    // START: MODIFICATION FOR CONSISTENCY
    document.documentElement.lang = lang; 
    // END: MODIFICATION FOR CONSISTENCY
    
    // Button States
    document.getElementById('langEn').classList.remove('active');
    document.getElementById('langBn').classList.remove('active');
    const langElement = document.getElementById('lang' + lang.charAt(0).toUpperCase() + lang.slice(1));
    if (langElement) langElement.classList.add('active');

    // Text Content
    applyTranslations();

    // Dynamic Content (Publications)
    if(document.body.id === 'publications') {
        await updatePublicationsContent(lang);
    }
}

// 2. Set Language (Triggered by User Click)
async function setLang(lang) {
    localStorage.setItem('language', lang); // Save preference
    await switchVisuals(lang); // Update UI
}

// 3. Toggle Theme (Triggered by User Click)
function toggleTheme() {
    const htmlEl = document.documentElement;
    htmlEl.classList.toggle('dark-theme');
    
    const isDark = htmlEl.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 4. Update Publications Content logic
async function updatePublicationsContent(lang) {
    const contentBody = document.getElementById('content-body');
    if(!contentBody) return;

    const langDict = translations[lang];
    let htmlContent = '';

    if (window.bookData[lang]) {
        htmlContent = generatePublicationsContent(window.bookData[lang]);
    } else {
        const url = (lang === 'bn') ? JSON_URL_BN : JSON_URL_EN;
        try {
            const response = await fetch(url);
            window.bookData[lang] = await response.json();
            htmlContent = generatePublicationsContent(window.bookData[lang]);
        } catch (error) {
            htmlContent = `<p>${langDict.pub_error_loading}</p>`;
        }
    }
    contentBody.innerHTML = htmlContent;
}

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    navLinks.classList.toggle('open');
    const isExpanded = navLinks.classList.contains('open');
    hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    hamburgerBtn.querySelector('i').className = isExpanded ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

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
        if (e.newValue === 'dark') document.body.classList.add('dark-theme');
        else document.body.classList.remove('dark-theme');
    }
    if (e.key === 'language') {
        // Just update visuals, don't set storage again to avoid loops
        switchVisuals(e.newValue);
    }
});


// Explicitly attach to window for inline HTML handlers
window.toggleMenu = toggleMenu;
window.setLang = setLang;
window.scrollToContent = scrollToContent;
window.showDonationPopup = showDonationPopup;
window.hideDonationPopup = hideDonationPopup;
window.selectAmount = selectAmount;
window.copyUpiId = copyUpiId;
window.showBookDetails = showBookDetails;
window.hideBookDetails = hideBookDetails;
window.toggleTheme = toggleTheme;
window.scrollCarousel = scrollCarousel;
window.showSubscriptionMessage = showSubscriptionMessage;

async function loadDataAndInit() {
    if (isInitialized) return;
    isInitialized = true;
    
    // 1. Initialize Theme
    init();
    
    // 2. Initialize Language (Defaults to BN)
    const savedLang = getLang();
    await switchVisuals(savedLang); 
    
    // 3. Background Data Fetch
    try {
        const response = await fetch(JSON_URL_EN);
        window.bookData.en = await response.json();
    } catch (e) { console.error(e); }
}
window.loadDataAndInit = loadDataAndInit;

document.addEventListener('DOMContentLoaded', () => {
   loadDataAndInit();
    document.addEventListener('click', (event) => {
    const navLinks = document.getElementById('navLinks');
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    // Check if the menu is currently open
    const isOpen = navLinks.classList.contains('open');

    // Check if the click happened OUTSIDE the menu and OUTSIDE the button
    const isClickInsideMenu = navLinks.contains(event.target);
    const isClickOnButton = hamburgerBtn.contains(event.target);

    if (isOpen && !isClickInsideMenu && !isClickOnButton) {
        toggleMenu(); // Close the menu
    }
  });
});


// Simple string hash function to generate a consistent HSL color based on the title
function stringToHslColor(str, s, l) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    // Use the color only if it contrasts well with the card background (surface-color)
    // The saturation (s) and lightness (l) values are fixed here for theme consistency.
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'; 
}

// Attach to window if needed, but we'll call it internally
// window.stringToHslColor = stringToHslColor;
