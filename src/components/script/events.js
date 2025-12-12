/**
 * blog.js
 * Handles fetching data from Google Apps Script and implementing Bi-Directional Pagination.
 */

const CONFIG = {
    // !!! IMPORTANT: REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL !!!
    // The URL should point to the script supporting 'row', 'tag', and 'direction' inputs.
    scriptUrl: 'https://script.google.com/macros/s/AKfycbwP8cx8eoCJ7A5oSIX-7x5rW-C2ww6nq1OGvJuJ4HgvEVtih_gdu8CJ6oEV_iN4hHAk1A/exec',
    itemsPerPage: 2 // Server is hardcoded to 2, but kept for clarity.
};

const TAG_STORAGE_KEY = 'blog_current_tag'; // Key for localStorage

let currentTag = '';       // Stores the currently active filter tag
let lastFetchedRows = [];  // Stores the two row numbers currently displayed (for 'Prev' logic)
let fetchedPosts = [];     // Stores the posts currently on the page (max 2)
let totalDataRows = 0;     // Stores the total number of data rows in the sheet (from server)

// 1. Fetch Data
// This function fetches the next block of 2 results based on the current state.
// @param {string} tag - The tag filter to use.
// @param {number} anchorRow - The row number used as the starting point for the search.
// @param {number} direction - 0 for NEXT (search starts AFTER anchorRow), 1 for PREVIOUS.
async function fetchBlogData(tag, anchorRow, direction) {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    // Show loading state
    container.innerHTML = '<p data-translate-key="loading_blog_posts">Loading posts...</p>';

    // Build URL with 'tag', 'row', and 'direction' parameters
    const separator = CONFIG.scriptUrl.includes('?') ? '&' : '?';
    let url = `${CONFIG.scriptUrl}${separator}tag=${encodeURIComponent(tag)}`;
    url += `&row=${anchorRow}`;
    url += `&direction=${direction}`;

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error(`Network response was not ok. Status: ${response.status}`);

        const rawData = await response.json();

        // Server response is now an object: { results: [], totalDataRows: 0, totalMatchingRows: 0 }
        const { results, totalDataRows: newTotalDataRows } = rawData;

        // Update global state
        currentTag = tag;
        totalDataRows = newTotalDataRows;
        fetchedPosts = results;

        if (!Array.isArray(fetchedPosts) || fetchedPosts.length === 0) {
            container.innerHTML = '<p data-translate-key="no_more_posts">No more blog posts found with the current tag.</p>';

            // Check if we are at the beginning (anchorRow was 0) to determine button state
            const isAtStart = (anchorRow === 0 && direction === 0);
            updateButtons(!isAtStart, false, totalDataRows); // Has Prev is based on where we are, Has Next is false
            return;
        }

        // Store the row numbers of the currently displayed posts
        lastFetchedRows = fetchedPosts.map(post => post["Row Number"]);

        // Render the fetched posts
        renderPosts();
    } catch (error) {
        console.error('Error fetching blog data:', error);
        container.innerHTML = '<p>Error loading posts. Please try again later.</p>';
        updateButtons(false, false, totalDataRows);
    }
}

/**
 * Maps the flat key-value pairs from Google Sheets to the nested structure
 * expected by createCardHTML.
 */
function mapSheetDataToBlogFormat(row) {
    return {
        // Persist the Row Number
        rowNumber: row["Row Number"],

        image: row.image || 'https://via.placeholder.com/800x400',
        alt: row.alt || 'Blog Image',

        en: {
            title: row.title || 'Untitled',
            date: row.date || 'Recently',
            description: row.description || '',
            text: row.summary || '',
            author: row.author || ''
        },
        bn: {
            title: row.title_bn || 'শিরোনাম নেই',
            date: row.date_bn || 'সাম্প্রতিক',
            description: row.description_bn || '',
            text: row.summary_bn || '',
            author: row.author_bn || ''
        }
    };
}

// 2. Create HTML Template (The Card)
function createCardHTML(post) {
    const mappedPost = mapSheetDataToBlogFormat(post);

    // Use optional chaining just in case data is missing
    const enTitle = mappedPost.en?.title || '';
    const enDesc = mappedPost.en?.description || '';
    const enText = mappedPost.en?.text || '';
    const enAuthor = mappedPost.en?.author || '';

    const bnTitle = mappedPost.bn?.title || '';
    const bnDesc = mappedPost.bn?.description || '';
    const bnText = mappedPost.bn?.text || '';
    const bnAuthor = mappedPost.bn?.author || '';

    return `
        <div class="card fade-in" data-row-number="${mappedPost.rowNumber}">
            <img src="${mappedPost.image}" alt="" class="card-header-image">
            <div class="card-content">
            <div class="lang-content en">
                <h2><b>${enTitle}</b></h2>
                <h3>${enDesc} <span class="text-opacity">${mappedPost.en?.date}</span></h3>
                <p style="text-align:right"><br> - ${enAuthor}</p>
            </div>
            <div class="lang-content bn">
                <h2><b>${bnTitle}</b></h2>
                <h3>${bnDesc} <span class="text-opacity">${mappedPost.bn?.date}</span></h3>
                <p style="text-align:right"><br> - ${bnAuthor}</p>
            </div>
            <div class="lang-content en">
                <p><br>${enText}</p>
            </div>
            <div class="lang-content bn">
                <p><br>${bnText}</p>
            </div>
                <div class="row">
                    <div class="col-main">
                        <button data-translate-key="btn_read_more" class="action-btn" style="margin-bottom: var(--space-sm);" onclick="window.open('${mappedPost.alt}', '_self')"><b>READ MORE »</b></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 3. Render Posts
function renderPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container || fetchedPosts.length === 0) return;

    // Clear previous content and inject new content
    container.innerHTML = fetchedPosts.map(createCardHTML).join('');

    // Re-apply language visibility
    if (typeof window.switchVisuals === 'function') {
        window.switchVisuals(window.savedLang || localStorage.getItem('language') || 'bn');
    }

    // Check pagination status
    checkPaginationStatus();
}

// Helper function to check if 'next' and 'previous' pages exist
async function checkPaginationStatus() {
    if (fetchedPosts.length === 0) {
        updateButtons(false, false, totalDataRows);
        return;
    }

    // A. Check for NEXT page
    const lastRowOnPage = lastFetchedRows[lastFetchedRows.length - 1];
    // Check if the next page returns any results
    let hasNext = await checkNeighboringPage(lastRowOnPage, 0);

    // B. Check for PREVIOUS page
    const firstRowOnPage = lastFetchedRows[0];
    // Check if the previous page returns any results
    let hasPrevious = await checkNeighboringPage(firstRowOnPage, 1);

    updateButtons(hasPrevious, hasNext, totalDataRows);
}

// Helper to check if a single neighboring row exists without changing the current view
async function checkNeighboringPage(anchorRow, direction) {
    if (anchorRow <= 0) return false;

    // Attempt to fetch results for the next/previous block
    const separator = CONFIG.scriptUrl.includes('?') ? '&' : '?';
    const url = `${CONFIG.scriptUrl}${separator}tag=${encodeURIComponent(currentTag)}&row=${anchorRow}&direction=${direction}`;

    try {
        const response = await fetch(url);
        const rawData = await response.json();

        // If the server returns one or more results, that direction is available.
        return Array.isArray(rawData.results) && rawData.results.length > 0;

    } catch (e) {
        console.error(`Failed to check neighbor (dir: ${direction}):`, e);
        return false;
    }
}


// Helper to update button states
function updateButtons(hasPrevious, hasNext, total) {
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');

    if (!prevBtn || !nextBtn) return;

    prevBtn.disabled = !hasPrevious;
    prevBtn.classList.toggle('disabled', !hasPrevious);

    nextBtn.disabled = !hasNext;
    nextBtn.classList.toggle('disabled', !hasNext);

    console.log(`Pagination: Prev=${hasPrevious}, Next=${hasNext}. Total Rows=${total}`);
}


// 4. Button Handlers

function nextPage() {
    if (fetchedPosts.length === 0) return;

    // The anchorRow for 'NEXT' is the last row number currently displayed.
    const anchorRow = lastFetchedRows[lastFetchedRows.length - 1];

    fetchBlogData(currentTag, anchorRow, 0); // Direction 0 (NEXT)
    scrollToTopBlogContainer();
}

function prevPage() {
    if (fetchedPosts.length === 0) return;

    // The anchorRow for 'PREVIOUS' is the first row number currently displayed.
    const anchorRow = lastFetchedRows[0];

    fetchBlogData(currentTag, anchorRow, 1); // Direction 1 (PREVIOUS)
    scrollToTopBlogContainer();
}


function scrollToTopBlogContainer() {
    const container = document.getElementById('main-content');
    if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


// 5. Initialization and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Only run if the main blog container is present
    if (document.getElementById('blog-posts-container')) {

        // --- Persistence Logic ---

        // 1. Read saved tag from localStorage, default to '' (all)
        let initialTag = localStorage.getItem(TAG_STORAGE_KEY) || '';

        // 2. Set the global currentTag and check the corresponding radio button
        const tagRadios = document.querySelectorAll('input[name="blog_tag"]');
        tagRadios.forEach(radio => {
            if (radio.value === initialTag) {
                radio.checked = true;
            }

            // C. Attach Tag Filter Handlers (Radio Buttons)
            radio.addEventListener('change', (e) => {
                const selectedTag = e.target.value;
                console.log('Filtering by tag:', selectedTag);

                // --- SAVE TO LOCAL STORAGE ---
                localStorage.setItem(TAG_STORAGE_KEY, selectedTag);

                // Reset pagination state when a new tag is selected: Start at the beginning (row=0, direction=NEXT)
                lastFetchedRows = [];
                fetchBlogData(selectedTag, 0, 0);
            });
        });

        // A. Initial Fetch (Use the persisted tag, start at the beginning)
        fetchBlogData(initialTag, 0, 0);


        // B. Attach Pagination Handlers (Assign to window for access from HTML)
        window.nextPage = nextPage;
        window.prevPage = prevPage;

        const prevBtn = document.getElementById('btn-prev');
        const nextBtn = document.getElementById('btn-next');
        if (prevBtn) prevBtn.addEventListener('click', prevPage);
        if (nextBtn) nextBtn.addEventListener('click', nextPage);

    }
});