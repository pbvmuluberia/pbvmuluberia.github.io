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
        _clearBookCardTransitionName();

        // ── OLD STATE: name on card img BEFORE startViewTransition ──────────
        cardImg.style.viewTransitionName = 'book-cover-hero';
        _lastTransitionCardImg = cardImg;

        const container = cardImg.closest('.book-covers-container');
        const card = cardImg.closest('.book-card');

        // Function to run the view transition once ready
        const startTransitionWhenReady = () => {
            // Updated to match your CSS class: 'nav-hidden'
            document.querySelector('.menu')?.classList.add('nav-hidden');

            const transition = document.startViewTransition(() => {
                // ── NEW STATE: transfer name to modal img ───────────────────────
                cardImg.style.viewTransitionName = '';
                detailCoverImg.style.viewTransitionName = 'book-cover-hero';
                detailCoverImg.src = book.url;

                // Show overlay (backdrop). Card expand plays AFTER view transition.
                overlay?.classList.add('show', 'vt-active');
                document.body.style.overflow = 'hidden';
            });

            transition.finished.finally(() => {
                overlay?.classList.remove('vt-active');
                detailCard?.classList.remove('vt-active');
                // ▶ Trigger height/width expand animation NOW, after cover has landed.
                detailCard?.classList.add('show');
            });
        };

        if (container && card) {
            const targetLeft = card.offsetLeft
                - (container.clientWidth / 2)
                + (card.offsetWidth / 2);

            // If we are already at the target position, start immediately!
            if (Math.abs(container.scrollLeft - targetLeft) < 1) {
                startTransitionWhenReady();
            } else {
                // Otherwise, scroll into view
                container.scrollTo({
                    left: targetLeft,
                    behavior: 'smooth',
                });

                let hasStarted = false;
                const triggerOnce = () => {
                    if (!hasStarted) {
                        hasStarted = true;
                        container.removeEventListener('scrollend', triggerOnce);
                        startTransitionWhenReady();
                    }
                };

                // Wait for smooth scroll to finish using 'scrollend' event
                if ('onscrollend' in window) {
                    container.addEventListener('scrollend', triggerOnce, { once: true });
                }
                
                // Safety fallback timeout in case scrollend is missed or doesn't fire
                setTimeout(triggerOnce, 400);
            }
        } else {
            // Fallback if container or card element is missing
            startTransitionWhenReady();
        }
    } else {
        // Fallback: no View Transition API support
        document.querySelector('.menu')?.classList.add('nav-hidden');
        detailCoverImg.src = book.url;
        overlay?.classList.add('show');
        detailCard?.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideBookDetails() {
    const overlay = document.getElementById('bookDetailOverlay');
    const detailCard = document.getElementById('bookDetailCard');
    const detailCoverImg = document.getElementById('detailBookCover');

    if (document.startViewTransition && _lastTransitionCardImg) {
        const cardImg = _lastTransitionCardImg;

        // ▶ Step 1: start the height/width collapse animation immediately.
        detailCard.classList.remove('show');
        document.body.style.overflow = '';

        // ▶ Step 2: once height (mobile) or width (desktop) finishes collapsing,
        //   kick off the view transition so the cover morphs back to the card.
        let vtStarted = false;

        const startCloseVT = () => {
            if (vtStarted) return;
            vtStarted = true;

            const transition = document.startViewTransition(() => {
                // ── OLD STATE already captured (card collapsed, overlay visible) ─
                // ── NEW STATE: transfer name back to card img, hide overlay ──────
                detailCoverImg.style.viewTransitionName = '';
                cardImg.style.viewTransitionName = 'book-cover-hero';

                overlay.classList.remove('show');
                overlay.classList.add('vt-active');
                // Freeze any remaining card CSS transitions during the morph.
                detailCard.classList.add('vt-active');
            });

            transition.finished.finally(() => {
                overlay.classList.remove('vt-active');
                detailCard.classList.remove('vt-active');
                document.querySelector('.menu')?.classList.remove('nav-hidden');
                _clearBookCardTransitionName();
                detailCoverImg.style.viewTransitionName = '';
            });
        };

        // Listen for the structural collapse (height on mobile, width on desktop).
        const onCollapse = (e) => {
            if (e.propertyName === 'height' || e.propertyName === 'width') {
                detailCard.removeEventListener('transitionend', onCollapse);
                startCloseVT();
            }
        };
        detailCard.addEventListener('transitionend', onCollapse);

        // Safety fallback in case transitionend never fires (reduced-motion etc).
        setTimeout(startCloseVT, 500);
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