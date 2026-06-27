/**
 * events.js
 * Handles fetching data from Google Apps Script and implementing Bi-Directional Pagination.
 * Updated to support real-time translation for status messages.
 */

const CONFIG = {
    scriptUrl: 'https://script.google.com/macros/s/AKfycbwP8cx8eoCJ7A5oSIX-7x5rW-C2ww6nq1OGvJuJ4HgvEVtih_gdu8CJ6oEV_iN4hHAk1A/exec',
    itemsPerPage: 2
};

const TAG_STORAGE_KEY = 'blog_current_tag';

let currentTag = '';
let lastFetchedRows = [];
let fetchedPosts = [];
let totalDataRows = 0;

/**
 * Helper to get the current active language.
 * Prioritizes window state, then localStorage, then defaults to Bengali.
 */
function getCurrentLang() {
    return window.savedLang || localStorage.getItem('language') || 'bn';
}

/**
 * Helper to get a translated string by key.
 */
function getT(key) {
    const lang = getCurrentLang();
    return (window.translations[lang] && window.translations[lang][key]) || window.translations['en'][key] || key;
}

/**
 * Returns HTML containing BOTH languages wrapped in the correct classes.
 * This allows the language switcher to hide/show the correct text instantly
 * without needing a page refresh.
 */
function getDualLangHTML(key) {
    const enText = window.translations['en'][key] || key;
    const bnText = window.translations['bn'][key] || key;

    // Determine which one should be visible right now
    const currentLang = getCurrentLang();
    const enActive = currentLang === 'en' ? 'active' : '';
    const bnActive = currentLang === 'bn' ? 'active' : '';

    return `
        <span class="lang-content en ${enActive}">${enText}</span>
        <span class="lang-content bn ${bnActive}">${bnText}</span>
    `;
}

// 1. Fetch Data
async function fetchBlogData(tag, anchorRow, direction) {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    // Show translated loading state
    container.innerHTML = `<p>${getDualLangHTML('loading_blog_posts')}</p>`;

    const separator = CONFIG.scriptUrl.includes('?') ? '&' : '?';
    let url = `${CONFIG.scriptUrl}${separator}tag=${encodeURIComponent(tag)}`;
    url += `&row=${anchorRow}&direction=${direction}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Network response was not ok. Status: ${response.status}`);

        const rawData = await response.json();
        const { results, totalDataRows: newTotalDataRows } = rawData;

        currentTag = tag;
        totalDataRows = newTotalDataRows;
        fetchedPosts = results;

        if (!Array.isArray(fetchedPosts) || fetchedPosts.length === 0) {
            // Show translated 'no more posts' message
            container.innerHTML = `<p>${getDualLangHTML('no_more_posts')}</p>`;
            const isAtStart = (anchorRow === 0 && direction === 0);
            updateButtons(!isAtStart, false, totalDataRows);
            return;
        }

        lastFetchedRows = fetchedPosts.map(post => post["Row Number"]);
        renderPosts();
    } catch (error) {
        console.error('Error fetching blog data:', error);
        // Show translated error message
        container.innerHTML = `<p>${getDualLangHTML('pub_error_loading')}</p>`;
        updateButtons(false, false, totalDataRows);
    }
}

/**
 * Maps the flat key-value pairs from Google Sheets to the nested structure.
 */
function mapSheetDataToBlogFormat(row) {
    return {
        rowNumber: row["Row Number"],
        image: row.image || 'https://via.placeholder.com/800x400',
        alt: row.alt || '',
        en: {
            title: row.title || '',
            date: row.date || '',
            description: row.description || '',
            text: row.summary || '',
            author: row.author || ''
        },
        bn: {
            title: row.title_bn || '',
            date: row.date_bn || '',
            description: row.description_bn || '',
            text: row.summary_bn || '',
            author: row.author_bn || ''
        }
    };
}

// 2. Create HTML Template
function createCardHTML(post) {
    const mappedPost = mapSheetDataToBlogFormat(post);
    // Use the helper to get both languages for the button
    const readMoreHTML = getDualLangHTML('btn_read_more');

    // 1. Create a variable to hold the button HTML
    let buttonHTML = '';

    // 2. Check if alt exists and is not an empty string
    if (mappedPost.alt && mappedPost.alt.trim() !== "") {
        buttonHTML = `
            <div class="row">
                <div class="col-main">
                    <button class="action-btn" style="margin-bottom: var(--space-sm);" onclick="window.open('${mappedPost.alt}', '_self')">
                        <b>${readMoreHTML}</b>
                    </button>
                </div>
            </div>
        `;
    }

    return `
        <div class="card fade-in" data-row-number="${mappedPost.rowNumber}">
            <img src="${mappedPost.image}" alt="" class="card-header-image">
            <div class="card-content">
                <div class="lang-content en">
                    <h2><b>${mappedPost.en.title}</b></h2>
                    <h3>${mappedPost.en.description} <span class="text-opacity">${mappedPost.en.date}</span></h3>
                    <p style="text-align:right"><br> - ${mappedPost.en.author}</p>
                    <p><br>${mappedPost.en.text}</p>
                </div>
                <div class="lang-content bn">
                    <h2><b>${mappedPost.bn.title}</b></h2>
                    <h3>${mappedPost.bn.description} <span class="text-opacity">${mappedPost.bn.date}</span></h3>
                    <p style="text-align:right"><br> - ${mappedPost.bn.author}</p>
                    <p><br>${mappedPost.bn.text}</p>
                </div>
                
                ${buttonHTML}
                
            </div>
        </div>
    `;
}

// 3. Render Posts
function renderPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container || fetchedPosts.length === 0) return;

    container.innerHTML = fetchedPosts.map(createCardHTML).join('');


    // Re-apply language visibility after rendering
    if (typeof window.switchVisuals === 'function') {
        window.switchVisuals(getCurrentLang());
    }

    checkPaginationStatus();
}

// 4. Pagination Helpers
async function checkPaginationStatus() {
    if (fetchedPosts.length === 0) {
        updateButtons(false, false, totalDataRows);
        return;
    }
    const hasNext = await checkNeighboringPage(lastFetchedRows[lastFetchedRows.length - 1], 0);
    const hasPrevious = await checkNeighboringPage(lastFetchedRows[0], 1);
    updateButtons(hasPrevious, hasNext, totalDataRows);
}

async function checkNeighboringPage(anchorRow, direction) {
    if (anchorRow <= 0) return false;
    const separator = CONFIG.scriptUrl.includes('?') ? '&' : '?';
    const url = `${CONFIG.scriptUrl}${separator}tag=${encodeURIComponent(currentTag)}&row=${anchorRow}&direction=${direction}`;
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        return Array.isArray(rawData.results) && rawData.results.length > 0;
    } catch (e) {
        return false;
    }
}

function updateButtons(hasPrevious, hasNext, total) {
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    if (!prevBtn || !nextBtn) return;

    prevBtn.disabled = !hasPrevious;
    prevBtn.classList.toggle('disabled', !hasPrevious);
    nextBtn.disabled = !hasNext;
    nextBtn.classList.toggle('disabled', !hasNext);
}

function nextPage() {
    if (fetchedPosts.length === 0) return;
    fetchBlogData(currentTag, lastFetchedRows[lastFetchedRows.length - 1], 0);
    scrollToTop();
}

function prevPage() {
    if (fetchedPosts.length === 0) return;
    fetchBlogData(currentTag, lastFetchedRows[0], 1);
    scrollToTop();
}

function scrollToTop() {
    const container = document.getElementById('main-content');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 5. Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('blog-posts-container')) {
        let initialTag = localStorage.getItem(TAG_STORAGE_KEY) || '';
        const tagRadios = document.querySelectorAll('input[name="blog_tag"]');

        tagRadios.forEach(radio => {
            if (radio.value === initialTag) radio.checked = true;
            radio.addEventListener('change', (e) => {
                const selectedTag = e.target.value;
                localStorage.setItem(TAG_STORAGE_KEY, selectedTag);
                lastFetchedRows = [];
                fetchBlogData(selectedTag, 0, 0);
            });
        });

        fetchBlogData(initialTag, 0, 0);

        window.nextPage = nextPage;
        window.prevPage = prevPage;
        document.getElementById('btn-prev')?.addEventListener('click', prevPage);
        document.getElementById('btn-next')?.addEventListener('click', nextPage);
    }
});
