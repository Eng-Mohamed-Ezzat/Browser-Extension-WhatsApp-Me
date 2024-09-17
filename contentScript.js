// contentScript.js

// Function to show WhatsApp icon on hover over phone numbers
document.addEventListener('mouseover', function (event) {
    // Check if the extension is enabled before doing anything
    chrome.storage.sync.get(['extensionEnabled'], function (result) {
        if (result.extensionEnabled !== true) {
            // If extension is disabled, return early
            return;
        }

        // Get the hovered element's text content
        const hoveredText = event.target.textContent.trim();
        // Try to extract the phone number from the text
        const phoneNumber = extractPhoneNumber(hoveredText);

        if (phoneNumber) {
            chrome.storage.sync.get(['countryCode', 'defaultMessage'], function (result) {
                if (chrome.runtime.lastError) {
                    console.error('Error accessing Chrome storage:', chrome.runtime.lastError);
                    return;
                }

                const countryCode = result.countryCode || '+20'; // Default to Egypt if not set
                const defaultMessage = result.defaultMessage || ''; // Default message if not set
                const fullPhoneNumber = `${countryCode}${phoneNumber}`;

                // Check if the icon is already present to avoid duplicates
                const existingIcon = document.querySelector(`#whatsapp-icon-${phoneNumber}`);
                if (!existingIcon) {
                    const whatsappIcon = document.createElement('img');
                    whatsappIcon.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg';
                    whatsappIcon.id = `whatsapp-icon-${phoneNumber}`;
                    whatsappIcon.style.cursor = 'pointer';
                    whatsappIcon.style.marginLeft = '5px'; // Space between phone number and icon
                    whatsappIcon.style.width = '16px';
                    whatsappIcon.style.height = '16px';
                    whatsappIcon.style.verticalAlign = 'middle'; // Align with the middle of the text
                    whatsappIcon.style.display = 'inline'; // Make sure it's inline with the text
                    whatsappIcon.style.position = 'relative'; // Ensure it's aligned relative to the text

                    event.target.appendChild(whatsappIcon);

                    // Add click event to open WhatsApp using the whatsapp:// scheme
                    whatsappIcon.addEventListener('click', function () {
                        // First, open WhatsApp with just the phone number (no message)
                        const whatsappUrlPhoneOnly = `whatsapp://send?phone=${fullPhoneNumber}`;
                        window.open(whatsappUrlPhoneOnly);

                        // Then, after a delay, open WhatsApp again with the message
                        setTimeout(function () {
                            const whatsappUrlWithMessage = `whatsapp://send?phone=${fullPhoneNumber}&text=${encodeURIComponent(defaultMessage)}`;
                            window.open(whatsappUrlWithMessage);
                        }, 500); // Delay of 500ms before opening WhatsApp with the message
                    });
                }
            });
        }
    });
});

// Function to extract a valid phone number from the given text
function extractPhoneNumber(text) {
    // Remove any non-numeric characters, except the leading '+' (for country codes)
    let cleanedText = text.replace(/[^\d+]/g, '');  // Keep only numbers and '+'

    // Remove leading zero if present
    if (cleanedText.startsWith('0') && cleanedText.length >= 10) {
        cleanedText = cleanedText.substring(1);
    }

    // Match phone numbers of 7 to 15 digits, with optional '+' at the start
    const phoneRegex = /^\+?\d{7,15}$/;
    
    if (phoneRegex.test(cleanedText)) {
        return cleanedText;  // Valid number found
    } else {
        return null;  // No valid number found
    }
}
