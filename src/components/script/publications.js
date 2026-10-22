// publications.js

/**
- --- Publication/Book Management ---
 */

"use strict";

function generateBookCardsHtml(bookArray, containerId = 'book-covers-carousel-1') {
    let cardsHtml = '';
    if (!bookArray) return '';
    bookArray.forEach(book => {
        const bookJsonString = JSON.stringify(book).replace(/"/g, '&quot;');
        const fallbackUrl = `https://placehold.co/150x225/d79921/3c3836?text=Book+Cover`;
        const badgeHtml = book.isMagazine ? '<span class="magazine-badge">MAGAZINE</span>' : book.isQBank ? '<span class="qbank-badge">Question Bank</span>' : '';

        // stringToHslColor is available via window (from utils.js)
        const borderColor = window.stringToHslColor(book.title, 70, 40);

        cardsHtml += `<div class="book-card" style="--card-border-color: ${borderColor}; border: 2px solid var(--card-border-color);" onclick="window.showBookDetails(this)" data-book-json="${bookJsonString}">${badgeHtml}<img src="${book.url}" alt="Cover of ${book.title}" onerror="this.onerror=null;this.src='${fallbackUrl}';"><h3>${book.title}</h3></div>`;
    });
    return `<div class="book-carousel-wrapper"><button class="carousel-arrow left-arrow" onclick="window.scrollCarousel('${containerId}', 'left')"><i class="fa-solid fa-chevron-left"></i></button><div class="book-covers-container" id="${containerId}">${cardsHtml}</div><button class="carousel-arrow right-arrow" onclick="window.scrollCarousel('${containerId}', 'right')"><i class="fa-solid fa-chevron-right"></i></button></div>`;
}

function generatePublicationsContent(bookArray) {
    const lang = window.getLang();
    const langDict = window.translations[lang];

    // Group 1: Magazines and Question Banks together in carousel-1
    const magazinesAndQBanks = bookArray.filter(book => book.isMagazine || book.isQBank);

    // Group 2: All other books in carousel-2
    const otherBooks = bookArray.filter(book => !book.isMagazine && !book.isQBank);

    const hasMagazines = magazinesAndQBanks.some(book => book.isMagazine);
    let subscribeButtonHtml = hasMagazines ? `<div class="subscribe-button-container"><p class="subscribe-text">${langDict.pub_subscribe_prompt}</p><button class="subscribe-button" onclick="window.showSubscriptionMessage('msg_subscription')"><i class="fa-solid fa-bell"></i> ${langDict.pub_subscribe_btn}</button></div>` : '';

    // Generate carousels based on the new grouping
    const magAndQBankCarouselHtml = magazinesAndQBanks.length > 0 ? generateBookCardsHtml(magazinesAndQBanks, 'book-covers-carousel-1') : '';
    const otherBooksCarouselHtml = otherBooks.length > 0 ? generateBookCardsHtml(otherBooks, 'book-covers-carousel-2') : '';

    let magAndQBankSection = '';
    if (magazinesAndQBanks.length > 0) {
        magAndQBankSection = `<h2>${langDict.pub_mag_qbank_title || 'Magazines & Question Banks'}</h2>${magAndQBankCarouselHtml}`;
    }

    let otherBooksSection = '';
    if (otherBooks.length > 0) {
        otherBooksSection = `<h2>${langDict.pub_featured_title || 'Books'}</h2>${otherBooksCarouselHtml}`;
    }

    return `${magAndQBankSection}${otherBooksSection}${subscribeButtonHtml}`;
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
    if (!contentBody) return;

    const langDict = window.translations[lang];
    let htmlContent = '';

    if (window.bookData[lang]) {
        htmlContent = generatePublicationsContent(window.bookData[lang]);
    } else {
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

    // Enable mouse wheel scroll for both carousels
    window.enableMouseWheelScroll('book-covers-carousel-1');
    window.enableMouseWheelScroll('book-covers-carousel-2');
}

// Tracks the card <img> that has view-transition-name so we can clean it up
let _lastTransitionCardImg = null;

function _clearBookCardTransitionName() {
    if (_lastTransitionCardImg) {
        _lastTransitionCardImg.style.viewTransitionName = '';
        _lastTransitionCardImg = null;
    }
}

function showBookDetails(cardElement) {
    window.hideDonationPopup();
    const overlay = document.getElementById('bookDetailOverlay');
    const detailCard = document.getElementById('bookDetailCard');
    const detailCoverImg = document.getElementById('detailBookCover');
    const lang = window.getLang();
    const langDict = window.translations[lang];
    const book = JSON.parse(cardElement.getAttribute('data-book-json').replace(/&quot;/g, '"'));

    const badgeElement = document.getElementById('detailBookBadge');
    const actionBtn = document.getElementById('detailActionBtn');

    badgeElement.textContent = book.price;
    badgeElement.style.display = 'inline-block';
    badgeElement.style.position = 'static';

    if (book.isMagazine) {
        actionBtn.textContent = langDict.book_btn_subscribe;
        actionBtn.onclick = () => showSubscriptionMessage('msg_subscription');
    } else if (book.isQBank) {
        actionBtn.textContent = langDict.book_btn_buy_qbank;
        actionBtn.onclick = () => showSubscriptionMessage('msg_qbank_purchase');
    } else {
        actionBtn.textContent = langDict.book_btn_download;
        actionBtn.onclick = () => showSubscriptionMessage('msg_purchase_dev');
    }

    document.getElementById('detailBookType').textContent = book.isMagazine ? langDict.book_type_magazine : langDict.book_type_standard;
    document.getElementById('detailBookDescription').textContent = book.description || langDict.book_no_description;

    const cardImg = cardElement.querySelector('img');

    if (document.startViewTransition && cardImg) {
        // Clear any stale name from a previous card first
        _clearBookCardTransitionName();

        // ── OLD STATE snapshot ──────────────────────────────────────────────
        // Set the transition-name on the CARD image BEFORE startViewTransition
        // so the browser captures it in the "old" snapshot.
        cardImg.style.viewTransitionName = 'book-cover-hero';
        _lastTransitionCardImg = cardImg;

        const transition = document.startViewTransition(() => {
            // ── NEW STATE snapshot ──────────────────────────────────────────
            // Transfer the name to the MODAL image, remove it from the card.
            // Browser will now see: old=card-img, new=modal-img → morphs between them.
            cardImg.style.viewTransitionName = '';
            detailCoverImg.style.viewTransitionName = 'book-cover-hero';
            detailCoverImg.src = book.url;

            // Show the modal. vt-active only on overlay (suppresses its own
            // opacity/visibility CSS transition; the card's expand + description
            // fade-in animations are left intact so they play as designed).
            overlay.classList.add('show', 'vt-active');
            detailCard.classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        transition.finished.finally(() => {
            overlay.classList.remove('vt-active');
            // Keep view-transition-name on modal img so close can transition back
        });
    } else {
        // Fallback: no View Transition API support
        detailCoverImg.src = book.url;
        overlay.classList.add('show');
        detailCard.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideBookDetails() {
    const overlay = document.getElementById('bookDetailOverlay');
    const detailCard = document.getElementById('bookDetailCard');
    const detailCoverImg = document.getElementById('detailBookCover');

    if (document.startViewTransition && _lastTransitionCardImg) {
        // ── OLD STATE snapshot ──────────────────────────────────────────────
        // detailCoverImg already has viewTransitionName = 'book-cover-hero'
        // _lastTransitionCardImg is where we want to morph back to.

        const cardImg = _lastTransitionCardImg;

        const transition = document.startViewTransition(() => {
            // ── NEW STATE snapshot ──────────────────────────────────────────
            // Transfer name back to the card image so browser can morph back.
            detailCoverImg.style.viewTransitionName = '';
            cardImg.style.viewTransitionName = 'book-cover-hero';

            overlay.classList.remove('show');
            overlay.classList.add('vt-active');
            detailCard.classList.remove('show');
            document.body.style.overflow = '';
        });

        transition.finished.finally(() => {
            overlay.classList.remove('vt-active');
            _clearBookCardTransitionName();
            detailCoverImg.style.viewTransitionName = '';
        });
    } else {
        overlay.classList.remove('show');
        detailCard.classList.remove('show');
        document.body.style.overflow = '';
        detailCoverImg.style.viewTransitionName = '';
        _clearBookCardTransitionName();
    }
}

// Attach to window for external/inline access
window.generateBookCardsHtml = generateBookCardsHtml;
window.generatePublicationsContent = generatePublicationsContent;
window.scrollCarousel = scrollCarousel;
window.updatePublicationsContent = updatePublicationsContent;
window.showBookDetails = showBookDetails;
window.hideBookDetails = hideBookDetails;