// contentScript.js

document.addEventListener('mouseup', function () {
    let selectedText = window.getSelection().toString().trim();

    if (selectedText) {
        const phoneNumber = extractPhoneNumber(selectedText);

        if (phoneNumber) {
            chrome.storage.sync.get(['countryCode'], function (result) {
                if (chrome.runtime.lastError) {
                    console.error('Error accessing Chrome storage:', chrome.runtime.lastError);
                    return;
                }

                // Retrieve the country code or default to Egypt's code (+20)
                const countryCode = result.countryCode || '+2';

                // Clean phone number and prepend country code
                
                const fullPhoneNumber = `${countryCode}${phoneNumber}`;

                // Create and insert the WhatsApp icon next to the phone number
                if (!document.querySelector(`#whatsapp-icon-${phoneNumber}`)) {
                    const whatsappIcon = document.createElement('img');
                    whatsappIcon.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg';
                    whatsappIcon.id = `whatsapp-icon-${phoneNumber}`;
                    whatsappIcon.style.cursor = 'pointer';
                    whatsappIcon.style.marginLeft = '5px';
                    whatsappIcon.style.width = '16px';
                    whatsappIcon.style.height = '16px';

                    const selection = window.getSelection();
                    if (selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        range.collapse(false);
                        range.insertNode(whatsappIcon);
                    }

                    // Add click event to open WhatsApp
                    whatsappIcon.addEventListener('click', function () {
                        const whatsappUrl = `whatsapp://send?phone=${fullPhoneNumber}`;
                        window.open(whatsappUrl);
                    });
                }
            });
        }
    }
});

// Function to extract a valid phone number
function extractPhoneNumber(text) {
    const cleanedText = text.replace(/[^\d+]/g, '');  // Keep only numbers and '+'

    // Check if the cleaned text looks like a phone number (7-15 digits)
    if (/^\+?\d{7,15}$/.test(cleanedText)) {
        return cleanedText;
    } else {
        return null;
    }
}
