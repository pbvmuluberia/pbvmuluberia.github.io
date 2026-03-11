/* src/components/script/components.js */

const ComponentGenerator = {
    // 1. THE NAVBAR HTML
    getNavbar: function (activePageId) {
        const isActive = (id) => activePageId === id ? 'active-tab' : '';

        // Define a map of page IDs to their FontAwesome icons
        const iconMap = {
            'home': '🏡',
            'about': '🙋🏾‍♀️',
            'projects': '🧪',
            'publications': '📚',
            'download': '📥',
            'events': '🗓️',
            'contact': '☎️'
        };

        return `
        <nav class="menu">
          <img src="https://raw.githubusercontent.com/t4saha/PBVM-Uluberia-Vigyan-Kendra/main/Logo/pvbm_logo_gold.png" alt="Logo" class="nav-logo" onerror="this.onerror=null; this.src='https://placehold.co/50x50/d79921/3c3836?text=LOGO'">
          
          <div class="menu-controls-mobile">
              <span class="menu-label-text" data-translate-key="nav_menu">Menu</span>
              <button class="hamburger-menu" id="hamburgerBtn" onclick="toggleMenu()" aria-label="Toggle menu">
                  <i class="fa-solid fa-bars"></i>
              </button>
              <span class="menu-label-text current-menu-label" id="currentMenuLabel">${iconMap[activePageId]}</i></span>
          </div>
          
          <div class="nav-links" id="navLinks">
            <a href="index.html" class="${isActive('home')}" data-translate-key="nav_home">Home</a>
            <a href="about.html" class="${isActive('about')}" data-translate-key="nav_about">About</a>
            <a href="projects.html" class="${isActive('projects')}" data-translate-key="nav_projects">Projects</a>
            <a href="publications.html" class="${isActive('publications')}" data-translate-key="nav_publications">Publications</a>
            <a href="download.html" class="${isActive('download')}" data-translate-key="nav_download">Download</a>
            <a href="events.html" class="${isActive('events')}" data-translate-key="nav_events">Events</a>
            <a href="contact.html" class="${isActive('contact')}" data-translate-key="nav_contact">Contact</a>
          </div>
          
          <div class="header-controls">
              
              <div class="theme-container">

                <!-- Selection State (Radio Buttons) -->
                <input type="radio" name="theme" id="light" class="theme-radio">
                <input type="radio" name="theme" id="dark" class="theme-radio">
                <input type="radio" name="theme" id="system" class="theme-radio" checked>

                <!-- The Checkbox Toggle -->
                <input type="checkbox" id="menu-toggle">
        
                <!-- The Overlay (allows clicking outside to close) -->
                <label for="menu-toggle" class="menu-overlay"></label>

                <!-- The Trigger -->
                <label for="menu-toggle" class="theme-btn-label">
                    <span class="selected-icon"></span>
                </label>

                <!-- The Menu -->
                <div class="dropdown-menu">
                    <label class="option-item" onclick="toggleTheme('light')">
                        <span class="icon">☀️</span>
                        <span class="label" data-translate-key="theme_light">Light Mode</span>
                    </label>

                    <label class="option-item" onclick="toggleTheme('dark')">
                        <span class="icon">🌖</span>
                        <span class="label" data-translate-key="theme_dark">Dark Mode</span>
                    </label>

                    <label class="option-item" onclick="toggleTheme('system')">
                        <span class="icon">🎴</span>
                        <span class="label" data-translate-key="theme_system">System</span>
                    </label>
                </div>
            </div>
              <div class="lang-toggle">
                  <span id="langEn" onclick="setLang('en')">EN</span>
                  <span id="langBn" onclick="setLang('bn')">বা</span>
              </div>
          </div>
        </nav>
        `;
    },

    // 2. THE HERO/CAROUSEL HTML (NEW COMPONENT)
    // Reduces repetition in Home, About, Projects, Publications, and Download pages
    getHero: function (titleKey, descKey, btnKey, bgImage) {
        return `
        
        <div class="head">
        <img src="https://raw.githubusercontent.com/t4saha/PBVM-Uluberia-Vigyan-Kendra/main/Logo/pvbm_logo_gold.png" alt="Logo" class="nav-logo" onerror="this.onerror=null; this.src='https://placehold.co/50x50/d79921/3c3836?text=LOGO'">
        <h1 data-translate-key="organisation">Paschim Banga Vigyan Mancha</h1>
        <h2 data-translate-key="carousel_home_des">Uluberia Vigyan Kendra</h2>
    </div>
    
        <div class="container" style="overflow: hidden;">
            <div class="slide">
                <div class="item"
                    style="--bg-image: url('${bgImage}'); position: relative; width: 100%; top: 0; left: 0; transform: none; border-radius: 0;">
                    <div class="content"
                        style="display: block; opacity: 1; transform: translate(0, -50%); padding-top: 0; top: 30%;">
                        <h2 class="name" data-translate-key="${titleKey}">Join the Revolution</h2>
                        <p class="des" data-translate-key="${descKey}">Description</p>
                        <button class="button action-btn" onclick="scrollToContent()"
                            data-translate-key="${btnKey}">Read More</button>
                        <button class="button donate-btn" onclick="showDonationPopup()"
                            data-translate-key="carousel_donate_btn">Donate to us</button>
                    </div>
                </div>
            </div>
        </div>`;
    },

    // 3. THE DONATION MODAL HTML
    getDonationModal: function () {
        return `
        <dialog id="donationCard" class="donation-card" closedby="any" onclick="event.stopPropagation()">
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
        </dialog>
        `;
    },

    // 4. THE NOTICE MODAL HTML
    getNoticeModal: function () {
        return `
        <dialog id="noticeCard" class="notice-card" closedby="any">
                <button class="close-btn" onclick="hideNoticePopup()">&times;</button>
                <div class="notice-content">
                    <h2 data-translate-key="notice_title">Important Notice</h2>
                    <div id="notice-body">
                        <div class="banner">
                            <img class="img" src="./src/banner/40 years.png">
                        </div>
                        <div class="lang-content en">
                            <p class="notice-subtitle" data-translate-key="notice_subtitle_en">Current Events</p>
                            <ul>
                                <li>🏆 <b>Save the Date!</b> The Prize Distribution Ceremony for the 2025 Howrah Zilla Vigyan Manosikota-o-Medha Aviksha is happening soon!<br><br>📅 <b>When:</b> March 14, 2026, at 1:30 PM<br><br>📍 <b>Where:</b> Jadurberia Girls High School (H.S.)</li>
                                <a href="./src/components/pages/aviksha/aviksha_25_rank.html">See Ranks</a>
                                <p>&nbsp;</p>
                                <li>Howrah Zilla Vigyan Manosikota-o-Medha Aviksha 2025 has been successfully completed.</li>
                                <a href="./src/components/pages/aviksha/results.html">CheckResult.</a>
                            </ul>
                        </div>
                        <div class="lang-content bn">
                            <p class="notice-subtitle" data-translate-key="notice_subtitle_bn">বর্তমান ঘটনাবলী</p>
                            <ul>
                            <li>🏆 <b>দিনটি মনে রাখুন!</b> ২০২৫ সালের হাওড়া জেলা বিজ্ঞান মানসিকতা ও মেধা অভীক্ষার পুরস্কার বিতরণী অনুষ্ঠান শীঘ্রই অনুষ্ঠিত হতে চলেছে!<br><br>📅 <b>কখন:</b> ১৪ মার্চ, ২০২৬, দুপুর ১:৩০ মিনিটে<br>📍 <b>কোথায়:</b> যদুরবেড়িয়া উচ্চ বালিকা বিদ্যালয় (উচ্চ মাধ্যমিক)</li>
                            <a href="./src/components/pages/aviksha/aviksha_25_rank.html">মেধাক্রম দেখুন</a>
                                <p>&nbsp;</p>
                                <li>হাওড়া জেলা বিজ্ঞান মানসিকতা-ও-মেধা অভিক্ষা ২০২৫ সফলভাবে সম্পন্ন হয়েছে।</li>
                                <a href="./src/components/pages/aviksha/results.html">ফলাফল দেখুন।</a>
                            </ul>
                        </div>
                    </div>
                </div>
        </dialog>
        `;
    },

    // 5. THE THEME TOGGLE HTML
    getThemeToggle: function () {

        return `
                <!-- Selection State (Radio Buttons) -->
                <input type="radio" name="theme" id="light" class="theme-radio">
                <input type="radio" name="theme" id="dark" class="theme-radio">
                <input type="radio" name="theme" id="system" class="theme-radio" checked>

                <!-- The Checkbox Toggle -->
                <input type="checkbox" id="menu-toggle">
        
                <!-- The Overlay (allows clicking outside to close) -->
                <label for="menu-toggle" class="menu-overlay"></label>

                <!-- The Trigger -->
                <label for="menu-toggle" class="theme-btn-label">
                    <span class="selected-icon"></span>
                </label>

                <!-- The Menu -->
                <div class="dropdown-menu">
                    <label class="option-item" onclick="toggleTheme('light')">
                        <span class="icon">☀️</span>
                        <span class="label" data-translate-key="theme_light">Light Mode</span>
                    </label>

                    <label class="option-item" onclick="toggleTheme('dark')">
                        <span class="icon">🌖</span>
                        <span class="label" data-translate-key="theme_dark">Dark Mode</span>
                    </label>

                    <label class="option-item" onclick="toggleTheme('system')">
                        <span class="icon">🎴</span>
                        <span class="label" data-translate-key="theme_system">System</span>
                    </label>
                </div>
        `;
    }
};

