// --- View Transition Image Modal Logic ---

const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
let currentActiveThumbnail = null;

// Use event delegation to catch clicks on any student image
document.addEventListener('click', (e) => {
    // Check if clicked element is an image inside a student-entry
    if (e.target.tagName === 'IMG' && e.target.closest('.student-entry')) {
        const clickedImg = e.target;

        // Fallback for browsers that don't support View Transitions
        if (!document.startViewTransition) {
            modalImage.src = clickedImg.src;
            menu.classList.add('nav-hidden');
            modal.showModal();
            return;
        }

        // Assign the transition name to the clicked thumbnail
        clickedImg.classList.add('expanding-image');
        currentActiveThumbnail = clickedImg;
        setTimeout(() => {
            // Start the view transition
            document.startViewTransition(() => {
                modalImage.src = clickedImg.src;

                // Move transition name to modal image and display dialog
                clickedImg.classList.remove('expanding-image');
                modalImage.classList.add('expanding-image');
                menu.classList.add('nav-hidden');
                modal.showModal();
            });
        }, 300);
    }
});

function hideImgModal() {
    if (!modal.open) return;

    // Fallback
    if (!document.startViewTransition) {
        modal.close();
        modalImage.src = "";
        menu.classList.remove('nav-hidden');
        return;
    }
    document.documentElement.classList.add('modal-is-closing');

    document.startViewTransition(() => {
        // Close dialog and move transition name back to thumbnail
        modal.close();
        if (currentActiveThumbnail) {
            currentActiveThumbnail.classList.add('expanding-image');
        }
    }).finished.then(() => {
        // Clean up state
        if (currentActiveThumbnail) {
            currentActiveThumbnail.classList.remove('expanding-image');
            currentActiveThumbnail = null;
        }
        modalImage.src = "";
        document.documentElement.classList.remove('modal-is-closing');
        menu.classList.remove('nav-hidden');
    });

}

// Close modal when clicking the image/backdrop
modal.addEventListener('click', hideImgModal);

// Intercept native Escape key press to use View Transitions for closing
modal.addEventListener('cancel', (e) => {
    e.preventDefault();
    hideImgModal();
});