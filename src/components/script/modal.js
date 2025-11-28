// modal.js

/**
 * --- Popup/Modal Management (Donation and Notices) ---
 */

"use strict";

function generateTransactionReference() {
    const now = new Date();
    const pad = (num) => num.toString().padStart(2, '0');
    return now.getFullYear().toString() + pad(now.getMonth() + 1) + pad(now.getDate()) + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
}

function generateUpiLink(amount) {
    // Use constants from data.js via window
    const encodedVpaName = encodeURIComponent(window.VPA_NAME); 
    let upiLink = `upi://pay?pa=${window.UPI_ID}&pn=${encodedVpaName}&cu=INR&tr=${generateTransactionReference()}`;
    const amountFloat = parseFloat(amount);
    if (!isNaN(amountFloat) && amountFloat > 0) upiLink += `&am=${amountFloat.toFixed(2)}`;
    return upiLink;
}

function updateQrCode(amount) {
    const qrContainer = document.getElementById('upiQrCodeContainer');
    const deepLinkBtn = document.getElementById('deepLinkBtn');
    if (typeof QRCode === 'undefined') { if (qrContainer) qrContainer.innerHTML = 'Error'; return; }
    const upiLink = generateUpiLink(amount);
    if (qrContainer) {
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, { text: upiLink, width: 250, height: 250 });
    }
    if (deepLinkBtn) deepLinkBtn.href = upiLink;
}

function selectAmount(amount) {
    const amountButtons = document.querySelectorAll('#donationAmountSelectors .amount-btn');
    // Update global state
    window.currentDonationAmount = amount; 
    amountButtons.forEach(btn => btn.classList.remove('active'));
    const selectedButton = document.querySelector(`.amount-btn[data-amount="${amount}"]`);
    if (selectedButton) selectedButton.classList.add('active');
    updateQrCode(amount);
}

function showDonationPopup() {
    const donationCard = document.getElementById('donationCard');
    if (donationCard) { 
        // Use global state
        selectAmount(window.currentDonationAmount || 100); 
        donationCard.showModal();
    }
}

function hideDonationPopup() {
    const donationCard = document.getElementById('donationCard');
    if (donationCard) {
        donationCard.close();
    }
}

function showNoticePopup() {
    const noticeCard = document.getElementById('noticeCard');
    if (noticeCard) {
        noticeCard.showModal();
    }
}
        

function hideNoticePopup() {
    const noticeCard = document.getElementById('noticeCard');
    if (noticeCard) {
        noticeCard.close();
    }
}

function copyUpiId() {
    // Use global constant UPI_ID and window.showSubscriptionMessage
    navigator.clipboard.writeText(window.UPI_ID)
        .then(() => window.showSubscriptionMessage('msg_upi_copied')) 
        .catch(() => window.showSubscriptionMessage('msg_upi_fail'));
}

// Attach to window for external/inline access
window.selectAmount = selectAmount;
window.showDonationPopup = showDonationPopup;
window.hideDonationPopup = hideDonationPopup;
window.showNoticePopup = showNoticePopup;
window.hideNoticePopup = hideNoticePopup;
window.copyUpiId = copyUpiId;
