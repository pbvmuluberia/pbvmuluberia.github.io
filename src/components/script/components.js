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
              
              <div Id="theme-container" class="theme-container">

                <!-- Selection State (Radio Buttons) -->
                <input type="radio" name="theme" id="light" value="light" class="theme-radio">
                <input type="radio" name="theme" id="dark" value="dark" class="theme-radio">
                <input type="radio" name="theme" id="system" value="system" class="theme-radio">

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
                                <li>Form Fill up of <b>Howrah Zilla Vigyan Manosikota-o-Medha Aviksha 2026</b> has been started. Please Contact your school or nearest commitee member.</li>
                                <a href="./src/components/pages/aviksha/checkR.html"><b>Check your registration status</b></a>
                                <p>&nbsp;</p>
                                <a href="./publications.html?scroll=main- content&openFirst=true">Buy Question Bank</a>
                                <p>&nbsp;</p>
                                <li>Cultural Competition 2026 has been successfully completed.</li>
                                <a href="./src/components/pages/programme/40_year_8_26.html">CheckResult.</a>
                            </ul>
                        </div>
                        <div class="lang-content bn">
                            <p class="notice-subtitle" data-translate-key="notice_subtitle_bn">বর্তমান ঘটনাবলী</p>
                            <ul>
                                <li><b>হাওড়া জেলা বিজ্ঞান মানসিকতা-ও-মেধা অভিক্ষা ২০২৬</b> এর ফর্ম দেওয়া শুরু হয়েছে। অনুগ্রহ করে বিদ্যালয় বা নিকটবর্তী বিজ্ঞান কর্মীদের সাথে যোগাযোগ করুন।</li> 
                                <a href="./src/components/pages/aviksha/checkR.html"><b>আপনার রেজিস্ট্রেশন তথ্য চেক করুন</b></a>
                                <p>&nbsp;</p> <a href = "./publications.html?scroll=main- content&openFirst=true" > প্রশ্ন বিচিত্রা কিনুন </a>
                                <p>&nbsp;</p>
                                <li>সাংস্কৃতিক প্রতিযোগীতা ২০২৬ সফলভাবে সম্পন্ন হয়েছে।</li>
                                <a href="./src/components/pages/programme/40_year_8_26.html">ফলাফল দেখুন।</a>
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
                <input type="radio" name="theme" id="system" class="theme-radio">

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
    },

    getSchoolList: function () {
        return `
            <option data-translate-key="school_placeholder" value="" disabled selected>Select school...</option>
    <hr>
    <option value="ADARSHA SHIKSHA NIKETAN">ADARSHA SHIKSHA NIKETAN</option>
    <hr>
    <option value="AL AMEEN MISSION HASNECHA">AL AMEEN MISSION HASNECHA</option>
    <hr>
    <option value="AMSHA PRIMARY SCHOOL">AMSHA PRIMARY SCHOOL</option>
    <hr>
    <option value="AMTA BALIKA VIDYALAYA">AMTA BALIKA VIDYALAYA</option>
    <hr>
    <option value="AMTA GIRLS SCHOOL">AMTA GIRLS SCHOOL</option>
    <hr>
    <option value="ASIAN INTERNATIONAL SCHOOL">ASIAN INTERNATIONAL SCHOOL</option>
    <hr>
    <option value="BAGANDA JATADHARI HIGH SCHOOL">BAGANDA JATADHARI HIGH SCHOOL</option>
    <hr>
    <option value="BAGNAN ADARSHA BALIKA VIDYALAY">BAGNAN ADARSHA BALIKA VIDYALAY</option>
    <hr>
    <option value="BAGNAN GIRLS' HIGH SCHOOL">BAGNAN GIRLS' HIGH SCHOOL</option>
    <hr>
    <option value="BAGNAN GIRLS' HIGH SCHOOL (H.S)">BAGNAN GIRLS' HIGH SCHOOL (H.S)</option>
    <hr>
    <option value="BAGNAN HIGH SCHOOL (H.S.)">BAGNAN HIGH SCHOOL (H.S.)</option>
    <hr>
    <option value="BAHIRA FREE PRIMARY SCHOOL">BAHIRA FREE PRIMARY SCHOOL</option>
    <hr>
    <option value="BAHIRA HIGH SCHOOL">BAHIRA HIGH SCHOOL</option>
    <hr>
    <option value="BALICHATURI JUNIOR BASIC SCHOOL">BALICHATURI JUNIOR BASIC SCHOOL</option>
    <hr>
    <option value="BANIBAN ADARSHA BALIKA VIDYALAY">BANIBAN ADARSHA BALIKA VIDYALAY</option>
    <hr>
    <option value="BANIBAN GIRLS' HIGH SCHOOL (H.S.)">BANIBAN GIRLS' HIGH SCHOOL (H.S.)</option>
    <hr>
    <option value="BANIBAN JADURBERIA VIDYAPITH">BANIBAN JADURBERIA VIDYAPITH</option>
    <hr>
    <option value="BAZARPARA PRIMARY SCHOOL">BAZARPARA PRIMARY SCHOOL</option>
    <hr>
    <option value="BELARI SARADAMONI BALIKA VIDYALAYA">BELARI SARADAMONI BALIKA VIDYALAYA</option>
    <hr>
    <option value="BELARI VIVEKANANDA VIDYAMANDIR">BELARI VIVEKANANDA VIDYAMANDIR</option>
    <hr>
    <option value="BELKULAI C.K.A.C. VIDYAPITH (H.S.)">BELKULAI C.K.A.C. VIDYAPITH (H.S.)</option>
    <hr>
    <option value="BENAPUR CHANDANAPARA HIGH SCHOOL">BENAPUR CHANDANAPARA HIGH SCHOOL</option>
    <hr>
    <option value="BHARAT ACADEMY & SCIENCE (ICSE)">BHARAT ACADEMY & SCIENCE (ICSE)</option>
    <hr>
    <option value="BIBEKANANDA MISSION HIGH SCHOOL">BIBEKANANDA MISSION HIGH SCHOOL</option>
    <hr>
    <option value="BINAPANI GIRLS' PRIMARY SCHOOL">BINAPANI GIRLS' PRIMARY SCHOOL</option>
    <hr>
    <option value="CHANDANAPARA CHILDREN'S ACADEMY">CHANDANAPARA CHILDREN'S ACADEMY</option>
    <hr>
    <option value="CHURCH OF GOD SCHOOL">CHURCH OF GOD SCHOOL</option>
    <hr>
    <option value="DAKSHIN RAMCHANDRAPUR HIGH SCHOOL">DAKSHIN RAMCHANDRAPUR HIGH SCHOOL</option>
    <hr>
    <option value="DIVINE MERCY SCHOOL">DIVINE MERCY SCHOOL</option>
    <hr>
    <option value="FATEPUR IQRA ACADEMY">FATEPUR IQRA ACADEMY</option>
    <hr>
    <option value="GANGARAMPUR HIGH SCHOOL (H.S.)">GANGARAMPUR HIGH SCHOOL (H.S.)</option>
    <hr>
    <option value="GOURIPUR SRI SRI RAMKRISHNA VIDYAPITH (H.S.)">GOURIPUR SRI SRI RAMKRISHNA VIDYAPITH (H.S.)</option>
    <hr>
    <option value="GRAMYA HITAKARI GIRLS SCHOOL">GRAMYA HITAKARI GIRLS SCHOOL</option>
    <hr>
    <option value="GUDAR NEW SET-UP UPPER PRIMARY SCHOOL">GUDAR NEW SET-UP UPPER PRIMARY SCHOOL</option>
    <hr>
    <option value="GUDAR PRIMARY SCHOOL">GUDAR PRIMARY SCHOOL</option>
    <hr>
    <option value="GUREPOLE HIGH SCHOOL">GUREPOLE HIGH SCHOOL</option>
    <hr>
    <option value="GURUNANAK PUBLIC SCHOOL">GURUNANAK PUBLIC SCHOOL</option>
    <hr>
    <option value="GUTINAGORI ALOKETIRTHA VIDYANIKETAN">GUTINAGORI ALOKETIRTHA VIDYANIKETAN</option>
    <hr>
    <option value="GUTINAGORI HAMIDIA PRIMARY SCHOOL">GUTINAGORI HAMIDIA PRIMARY SCHOOL</option>
    <hr>
    <option value="ICHHAPUR PRIMARY SCHOOL">ICHHAPUR PRIMARY SCHOOL</option>
    <hr>
    <option value="IDEAL PUBLIC SCHOOL">IDEAL PUBLIC SCHOOL</option>
    <hr>
    <option value="IDEAL PUBLIC SCHOOL (ICSE)">IDEAL PUBLIC SCHOOL (ICSE)</option>
    <hr>
    <option value="JADURBERIA BALIKA VIDYALAYA">JADURBERIA BALIKA VIDYALAYA</option>
    <hr>
    <option value="JADURBERIA NIMNA BUNIYADI VIDYALAYA">JADURBERIA NIMNA BUNIYADI VIDYALAYA</option>
    <hr>
    <option value="JAGANNATH PUR NO.2 PRIMARY SCHOOL">JAGANNATH PUR NO.2 PRIMARY SCHOOL</option>
    <hr>
    <option value="JAGANNATHPUR NO. PRIMARY SCHOOL">JAGANNATHPUR NO. PRIMARY SCHOOL</option>
    <hr>
    <option value="JAGATPUR ADARSHA BALIKA VIDYALAYA">JAGATPUR ADARSHA BALIKA VIDYALAYA</option>
    <hr>
    <option value="JAGATPUR ADARSHA VIDYALAYA">JAGATPUR ADARSHA VIDYALAYA</option>
    <hr>
    <option value="JAGATPUR EAST PRIMARY SCHOOL">JAGATPUR EAST PRIMARY SCHOOL</option>
    <hr>
    <option value="JAYNAGAR PALLI SHREE VIDYA NIKETAN">JAYNAGAR PALLI SHREE VIDYA NIKETAN</option>
    <hr>
    <option value="JOYNAGAR PALLISREE VIDYANIKETAN">JOYNAGAR PALLISREE VIDYANIKETAN</option>
    <hr>
    <option value="K.T.P.P.">K.T.P.P.</option>
    <hr>
    <option value="KAIJURI HIGH SCHOOL (H.S.)">KAIJURI HIGH SCHOOL (H.S.)</option>
    <hr>
    <option value="KALIDAHA AKSHAY KUMAR HIGH SCHOOL">KALIDAHA AKSHAY KUMAR HIGH SCHOOL</option>
    <hr>
    <option value="KAJIBERIA PRIMARY SCHOOL">KAJIBERIA PRIMARY SCHOOL</option>
    <hr>
    <option value="KALINAGAR HIGH SCHOOL (H.S.)">KALINAGAR HIGH SCHOOL (H.S.)</option>
    <hr>
    <option value="KALINAGAR JUNIOR NEW SETUP HIGH SCHOOL">KALINAGAR JUNIOR NEW SETUP HIGH SCHOOL</option>
    <hr>
    <option value="KALINAGAR WEST PRIMARY SCHOOL">KALINAGAR WEST PRIMARY SCHOOL</option>
    <hr>
    <option value="KANJIAKHALI SRI AUROBINDO VIDYAMANDIR">KANJIAKHALI SRI AUROBINDO VIDYAMANDIR</option>
    <hr>
    <option value="KASHMUL BOARD PRIMARY SCHOOL">KASHMUL BOARD PRIMARY SCHOOL</option>
    <hr>
    <option value="KASHMUL HIGH SCHOOL">KASHMUL HIGH SCHOOL</option>
    <hr>
    <option value="KASHPUR FREE PRIMARY SCHOOL">KASHPUR FREE PRIMARY SCHOOL</option>
    <hr>
    <option value="KAZI NAJRUL ISLAM PRIMARY SCHOOL">KAZI NAJRUL ISLAM PRIMARY SCHOOL</option>
    <hr>
    <option value="KHALISANI JATIYA VIDYAPITH HIGH SCHOOL (H.S.)">KHALISANI JATIYA VIDYAPITH HIGH SCHOOL (H.S.)</option>
    <hr>
    <option value="KHARDAH HIGH SCHOOL (H.S.)">KHARDAH HIGH SCHOOL (H.S.)</option>
    <hr>
    <option value="KOLKATA PUBLIC SCHOOL">KOLKATA PUBLIC SCHOOL</option>
    <hr>
    <option value="LINCOLN INTERNATIONAL SCHOOL">LINCOLN INTERNATIONAL SCHOOL</option>
    <hr>
    <option value="MAHESHPUR HIGH SCHOOL (H. S.)">MAHESHPUR HIGH SCHOOL (H. S.)</option>
    <hr>
    <option value="MAYRA PARA PRIMARY SCHOOL">MAYRA PARA PRIMARY SCHOOL</option>
    <hr>
    <option value="MIM ACADEMY">MIM ACADEMY</option>
    <hr>
    <option value="MOUBESHIA PASCHIMPARA PRIMARY SCHOOL">MOUBESHIA PASCHIMPARA PRIMARY SCHOOL</option>
    <hr>
    <option value="NARAYANA SCHOOL (ULUBERIA)">NARAYANA SCHOOL (ULUBERIA)</option>
    <hr>
    <option value="NATABAR MEMORIAL K. G. SCHOOL">NATABAR MEMORIAL K. G. SCHOOL</option>
    <hr>
    <option value="NATIBPUR HIGH SCHOOL (H.S.)">NATIBPUR HIGH SCHOOL (H.S.)</option>
    <hr>
    <option value="NETAJI COLLEGIATE SCHOOL">NETAJI COLLEGIATE SCHOOL</option>
    <hr>
    <option value="NEW ANDUL H.C. SCHOOL">NEW ANDUL H.C. SCHOOL</option>
    <hr>
    <option value="NONA HIGH SCHOOL (H.S.)">NONA HIGH SCHOOL (H.S.)</option>
    <hr>
    <option value="P.M. SHRI KENDRIYA VIDYALAYA SANTRAGACHI (CBSE)">P.M. SHRI KENDRIYA VIDYALAYA SANTRAGACHI (CBSE)</option>
    <hr>
    <option value="PALPARA GOBINDAJIU HIGH SCHOOL">PALPARA GOBINDAJIU HIGH SCHOOL</option>
    <hr>
    <option value="PM SRI KV SANTRAGACHI">PM SRI KV SANTRAGACHI</option>
    <hr>
    <option value="PRANAB VIDYAPITH">PRANAB VIDYAPITH</option>
    <hr>
    <option value="RANGMAHAL QUORANIA HIGH MADRASAH (H.S.)">RANGMAHAL QUORANIA HIGH MADRASAH (H.S.)</option>
    <hr>
    <option value="SAINI INTERNATIONAL SCHOOL (CBSE)">SAINI INTERNATIONAL SCHOOL (CBSE)</option>
    <hr>
    <option value="SAIYEDPUR PRIMARY SCHOOL">SAIYEDPUR PRIMARY SCHOOL</option>
    <hr>
    <option value="SANKRAIL GIRLS' HIGH SCHOOL">SANKRAIL GIRLS' HIGH SCHOOL</option>
    <hr>
    <option value="SARADA SISHU MANDIR">SARADA SISHU MANDIR</option>
    <hr>
    <option value="SARADA SISHU MANDIR (U)">SARADA SISHU MANDIR (U)</option>
    <hr>
    <option value="SHREE SHREE RAMKRISHNA VIDYAPITH">SHREE SHREE RAMKRISHNA VIDYAPITH</option>
    <hr>
    <option value="ST. AUGUSTIN'S DAY SCHOOL (ULUBERIA)">ST. AUGUSTIN'S DAY SCHOOL (ULUBERIA)</option>
    <hr>
    <option value="ST. PETER SCHOOL">ST. PETER SCHOOL</option>
    <hr>
    <option value="ST. XAVIER'S HIGH SCHOOL (CBSE)">ST. XAVIER'S HIGH SCHOOL (CBSE)</option>
    <hr>
    <option value="SURIKHALI PRIMARY SCHOOL">SURIKHALI PRIMARY SCHOOL</option>
    <hr>
    <option value="ULUBERIA BINAPANI GIRLS' HIGH SCHOOL (H.S.)">ULUBERIA BINAPANI GIRLS' HIGH SCHOOL (H.S.)</option>
    <hr>
    <option value="ULUBERIA HIGH MADRASAH (H.S.)">ULUBERIA HIGH MADRASAH (H.S.)</option>
    <hr>
    <option value="ULUBERIA HIGH SCHOOL (H.S.)">ULUBERIA HIGH SCHOOL (H.S.)</option>
    <hr>
    <option value="ULUBERIA TOWN MISSION SCHOOL">ULUBERIA TOWN MISSION SCHOOL</option>
    <hr>
    <option value="VIVEKANANDA CHILDREN CENTRE">VIVEKANANDA CHILDREN CENTRE</option>
    <hr>
    <option value="VIVEKANANDA MISSION HIGH SCHOOL (CBSE)">VIVEKANANDA MISSION HIGH SCHOOL (CBSE)</option>
        `;
    }
};

