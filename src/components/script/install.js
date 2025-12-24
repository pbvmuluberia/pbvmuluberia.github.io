document.addEventListener('DOMContentLoaded', () => {
    let deferredPrompt;
    const installBtn = document.getElementById('installBtn');

    // 1. Listen for the 'beforeinstallprompt' event
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        // Check if button exists to avoid errors
        if (installBtn) {
            installBtn.style.display = 'flex'; // Using flex to keep the icon aligned
        }
    });

    // 2. Handle the click event
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                // Show the install prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                
                // We've used the prompt, and can't use it again, throw it away
                deferredPrompt = null;
                // Hide the button
                installBtn.style.display = 'none';
            }
        });
    }

    // 3. Hide button if app is already installed
    window.addEventListener('appinstalled', () => {
        if (installBtn) {
            installBtn.style.display = 'none';
        }
        console.log('PWA was installed');
    });
});
