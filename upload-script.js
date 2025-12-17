document.addEventListener('DOMContentLoaded', function() {
    initializeUploadPage();
});

function initializeUploadPage() {
    const processBtn = document.getElementById('processBtn');
    const rfpInput = document.getElementById('rfpInput');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const popupOverlay = document.getElementById('popupOverlay');

    if (processBtn) {
        processBtn.addEventListener('click', handleProcessRFP);
    }

    if (rfpInput) {
        rfpInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleProcessRFP();
            }
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closeConfirmationPopup);
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', closeConfirmationPopup);
    }
}

function handleProcessRFP() {
    const rfpInput = document.getElementById('rfpInput');
    const processBtn = document.getElementById('processBtn');
    const autoEmailToggle = document.getElementById('autoEmailToggle');

    const rfpUrl = rfpInput.value.trim();

    if (!rfpUrl) {
        alert('Please enter a tender/RFP link');
        rfpInput.focus();
        return;
    }

    if (!isValidUrl(rfpUrl)) {
        alert('Please enter a valid URL');
        rfpInput.focus();
        return;
    }

    startProcessing(processBtn, rfpUrl, autoEmailToggle.checked);
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function startProcessing(button, rfpUrl, autoEmail) {
    button.disabled = true;
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');

    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';

    setTimeout(() => {
        showConfirmationPopup(rfpUrl, autoEmail);
        button.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }, 2000);
}

function showConfirmationPopup(rfpUrl, autoEmail) {
    const popup = document.getElementById('confirmationPopup');
    const overlay = document.getElementById('popupOverlay');
    const popupUrl = document.getElementById('popupUrl');

    popupUrl.textContent = `URL: ${rfpUrl}`;
    if (autoEmail) {
        popupUrl.textContent += ' (Auto-Email Enabled)';
    }

    popup.classList.add('show');
    overlay.classList.add('show');

    document.body.style.overflow = 'hidden';
}

function closeConfirmationPopup() {
    const popup = document.getElementById('confirmationPopup');
    const overlay = document.getElementById('popupOverlay');

    popup.classList.remove('show');
    overlay.classList.remove('show');

    document.body.style.overflow = 'auto';

    document.getElementById('rfpInput').value = '';
    document.getElementById('rfpInput').focus();
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const popup = document.getElementById('confirmationPopup');
        if (popup.classList.contains('show')) {
            closeConfirmationPopup();
        }
    }
});
