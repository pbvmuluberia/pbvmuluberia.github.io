/* src/components/script/components.js */

const ComponentGenerator = {
    // 1. THE NAVBAR HTML
    getNavbar: function(activePageId) {
        // We determine which link is active based on the page ID
        const isActive = (id) => activePageId === id ? 'active-tab' : '';
        
        return `
        <nav class="menu">
          <img src="https://raw.githubusercontent.com/t4saha/PBVM-Uluberia-Vigyan-Kendra/main/Logo/pvbm_logo_gold.png" alt="Logo" class="nav-logo" onerror="this.onerror=null; this.src='https://placehold.co/50x50/d79921/3c3836?text=LOGO'">
          
          <div class="menu-controls-mobile">
              <span class="menu-label-text" data-translate-key="nav_menu">Menu</span>
              <button class="hamburger-menu" id="hamburgerBtn" onclick="toggleMenu()" aria-label="Toggle menu">
                  <i class="fa-solid fa-bars"></i>
              </button>
              <span class="menu-label-text current-menu-label" id="currentMenuLabel" data-translate-key="nav_${activePageId}">Menu</span>
          </div>
          
          <div class="nav-links" id="navLinks">
            <a href="index.html" class="${isActive('home')}" data-translate-key="nav_home">Home</a>
            <a href="about.html" class="${isActive('about')}" data-translate-key="nav_about">About</a>
            <a href="projects.html" class="${isActive('projects')}" data-translate-key="nav_projects">Projects</a>
            <a href="publications.html" class="${isActive('publications')}" data-translate-key="nav_publications">Publications</a>
            <a href="download.html" class="${isActive('download')}" data-translate-key="nav_download">Download</a>
            <a href="contact.html" class="${isActive('contact')}" data-translate-key="nav_contact">Contact</a>
          </div>
          
          <div class="header-controls">
              <button id="themeToggleIcon" onclick="toggleTheme()" class="theme-icon-button">
                  <i class="fa-solid fa-sun theme-icon sun-icon"></i>
                  <i class="fa-solid fa-moon theme-icon moon-icon"></i>
              </button>
              <div class="lang-toggle">
                  <span id="langEn" onclick="setLang('en')">EN</span>
                  <span id="langBn" onclick="setLang('bn')">বা</span>
              </div>
          </div>
        </nav>
        `;
    },

    // 2. THE DONATION MODAL HTML
    getDonationModal: function() {
        return `
        <div id="donationOverlay" class="donation-overlay" onclick="hideDonationPopup()">
            <div id="donationCard" class="donation-card" onclick="event.stopPropagation()">
                <button class="close-btn" onclick="hideDonationPopup()">&times;</button>
                <div class="donation-content">
                    <h2 data-translate-key="donate_title">Support Our Mission</h2>
                    <p class="upi-id-label" data-translate-key="donate_choose_amount">Choose Amount:</p>
                    <div id="donationAmountSelectors" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 15px;">
                        <button class="amount-btn active" data-amount="100" onclick="selectAmount(100)">₹100</button>
                        <button class="amount-btn" data-amount="500" onclick="selectAmount(500)">₹500</button>
                        <button class="amount-btn" data-amount="0" data-translate-key="other_amnt" onclick="selectAmount(0)">Other</button>
                    </div>
                    <p data-translate-key="donate_scan_qr" style="font-size: var(--font-size-p);">Scan the <b>QR code</b> below.</p>
                    <div id="upiQrCodeContainer" class="qr-code-container"></div>
                    <a id="deepLinkBtn" class="deep-link-btn" href="#" target="_blank" onclick="hideDonationPopup()"><i class="fa-solid fa-arrow-up-right-from-square"></i> <span data-translate-key="donate_open_upi">Open in UPI App</span></a>
                    <div><button class="copy-upi-btn" onclick="copyUpiId()" data-translate-key="donate_copy_upi">Copy UPI ID</button></div>
                    <p class="donation-note" data-translate-key="donate_note">Your generous contribution directly funds our science popularization and community projects.</p>
                </div>
            </div>
        </div>
        `;
    },

    // 3. THE NOTICE MODAL HTML
    getNoticeModal: function() {
        return `
        <div id="noticeOverlay" class="notice-overlay" onclick="hideNoticePopup()">
            <div id="noticeCard" class="notice-card" onclick="event.stopPropagation()">
                <button class="close-btn" onclick="hideNoticePopup()">&times;</button>
                <div class="notice-content">
                    <h2 data-translate-key="notice_title">Important Notice</h2>
                    <div id="notice-body">
                        <div class="banner">
                            <img class="img" src="https://raw.githubusercontent.com/pbvmuluberia/pbvmuluberia.github.io/refs/heads/main/src/banner/40 years.png">
                        </div>
                        <div class="lang-content en">
                            <p class="notice-subtitle" data-translate-key="notice_subtitle_en">Current Events</p>
                            <ul>
                                <li>On the occasion of our 40th anniversary on November 29th, a cultural program, constructive discussions, and adulteration tests have been organized at 2:00 PM at 58 Gate Shikshak Bhawan.</li>
                        <p></p>
                                <li>Howrah Zilla Vigyan Manosikota-o-Medha Aviksha 2025 has been successfully completed.</li>
                                <a href="https://www.w3schools.com">Result will be published Soon.</a>
                            </ul>
                        </div>
                        <div class="lang-content bn">
                            <p class="notice-subtitle" data-translate-key="notice_subtitle_bn">বর্তমান ঘটনাবলী</p>
                            <ul>
                                <li>আাগামী ২৯শে নভেম্বর আমাদের ৪০ বছর পূর্তি উপলক্ষে ৫৮গেট শিক্ষক ভবনে দুপুর ২টো থেকে একটি সাংস্কৃতিক অনুষ্ঠান সহ, গঠণমূলক আলোচনা ও ভেজাল পরীক্ষার আয়েজন করা হয়েছে।</li>
                                <p></p>
                                <li>হাওড়া জেলা বিজ্ঞান মানসিকতা-ও-মেধা অভিক্ষা ২০২৫ সফলভাবে সম্পন্ন হয়েছে।</li>
                                <a href="https://www.w3schools.com">ফলাফল শীঘ্রই প্রকাশিত হবে।</a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
};
