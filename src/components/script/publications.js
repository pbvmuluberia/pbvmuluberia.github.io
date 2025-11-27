// publications.js

/**
 * --- Publication/Book Management ---
 */

"use strict";

function generateBookCardsHtml(bookArray) {
    const containerId = 'book-covers-carousel-1';
    let cardsHtml = '';
    if (!bookArray) return '';
    bookArray.forEach(book => {
        const bookJsonString = JSON.stringify(book).replace(/"/g, '&quot;');
        const fallbackUrl = `https://placehold.co/150x225/d79921/3c3836?text=Book+Cover`;
        const badgeHtml = book.isMagazine ? '<span class="magazine-badge">MAGAZINE</span>' : '';
        
        // stringToHslColor is available via window (from utils.js)
        const borderColor = window.stringToHslColor(book.title, 70, 40); 
        
        cardsHtml += `<div class="book-card" style="--card-border-color: ${borderColor}; border: 2px solid var(--card-border-color);" onclick="window.showBookDetails(this)" data-book-json="${bookJsonString}">${badgeHtml}<img src="${book.url}" alt="Cover of ${book.title}" onerror="this.onerror=null;this.src='${fallbackUrl}';"><h3>${book.title}</h3></div>`;
    });
    return `<div class="book-carousel-wrapper"><button class="carousel-arrow left-arrow" onclick="window.scrollCarousel('${containerId}', 'left')"><i class="fa-solid fa-chevron-left"></i></button><div class="book-covers-container" id="${containerId}">${cardsHtml}</div><button class="carousel-arrow right-arrow" onclick="window.scrollCarousel('${containerId}', 'right')"><i class="fa-solid fa-chevron-right"></i></button></div>`;
}

function generatePublicationsContent(bookArray) {
    const lang = window.getLang();
    const langDict = window.translations[lang];
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

// Update Publications Content logic
async function updatePublicationsContent(lang) {
    const contentBody = document.getElementById('content-body');
    if(!contentBody) return;

    const langDict = window.translations[lang];
    let htmlContent = '';

    if (window.bookData[lang]) {
        htmlContent = generatePublicationsContent(window.bookData[lang]);
    } else {
        // Use window.JSON_URL_EN/BN
        const url = (lang === 'bn') ? window.JSON_URL_BN : window.JSON_URL_EN; 
        try {
            const response = await fetch(url);
            window.bookData[lang] = await response.json();
            htmlContent = generatePublicationsContent(window.bookData[lang]);
        } catch (error) {
            htmlContent = `<p>${langDict.pub_error_loading}</p>`;
        }
    }
    contentBody.innerHTML = htmlContent;
    // enableMouseWheelScroll is available via window (from utils.js)
    window.enableMouseWheelScroll('book-covers-carousel-1'); 
}

function showBookDetails(cardElement) {
    // hideDonationPopup is available via window (from modal.js)
    window.hideDonationPopup(); 
    const overlay = document.getElementById('bookDetailOverlay');
    const detailCard = document.getElementById('bookDetailCard');
    const lang = window.getLang();
    const langDict = window.translations[lang];
    const book = JSON.parse(cardElement.getAttribute('data-book-json').replace(/&quot;/g, '"'));
    
    const badgeElement = document.getElementById('detailBookBadge');
    
    // Use window.stringToHslColor
    const borderColor = window.stringToHslColor(book.title, 70, 40); 
    const actionBtn = document.getElementById('detailActionBtn');
    
    if (book.price) { 
        badgeElement.textContent = book.price; 
        badgeElement.style.display = 'inline-block'; 
        badgeElement.style.position = 'static';
        actionBtn.textContent = langDict.book_btn_buy;
    } else { 
        badgeElement.style.display = 'none'; 
        if (book.isMagazine) actionBtn.textContent = langDict.book_btn_subscribe;
        else actionBtn.textContent = langDict.book_btn_download;
    }
    
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

// Attach to window for external/inline access
window.generateBookCardsHtml = generateBookCardsHtml;
window.generatePublicationsContent = generatePublicationsContent;
window.scrollCarousel = scrollCarousel;
window.updatePublicationsContent = updatePublicationsContent;
window.showBookDetails = showBookDetails;
window.hideBookDetails = hideBookDetails;
