// 1. Define Color Palettes
const THEME_COLORS = {
    light: {
        background: "#F9E9D2",
        theme: "#bf530c"
    },
    dark: {
        background: "#262626",
        theme: "#B8BA26"
    }
};

// 2. Function to Update Colors Dynamically
window.updatePwaTheme = async function(mode) {
    const colors = THEME_COLORS[mode] || THEME_COLORS.light;
    
    // A. Update Browser UI (Meta Tags)
    const themeMeta = document.getElementById('meta-theme-color');
    const statusMeta = document.getElementById('meta-apple-status-bar');
    
    if (themeMeta) themeMeta.setAttribute('content', colors.theme);
    if (statusMeta) statusMeta.setAttribute('content', colors.theme);

    // B. Update Manifest (Splash Screen & Install Color)
    const manifestElement = document.getElementById('app-manifest');
    if (manifestElement) {
        try {
            const response = await fetch('./manifest.json');
            const manifest = await response.json();

            manifest.background_color = colors.background;
            manifest.theme_color = colors.theme;

            const stringManifest = JSON.stringify(manifest);
            const blob = new Blob([stringManifest], {type: 'application/json'});
            const manifestURL = URL.createObjectURL(blob);
            
            manifestElement.setAttribute('href', manifestURL);
        } catch (error) {
            console.log('Could not update dynamic manifest:', error);
        }
    }
};

// 3. Initialize Theme & Language
function initThemeAndPwa() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply CSS class immediately
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    }

    // Apply Dynamic Colors
    window.updatePwaTheme(savedTheme);

    // Restore Language
    window.savedLang = localStorage.getItem('language') || 'bn';
}

// Run initialization immediately
initThemeAndPwa();

// 4. Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => console.log('SW Registered:', registration.scope))
            .catch(err => console.log('SW Failed:', err));
    });
}
