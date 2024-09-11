// contentScript.js

// Listen for user text selection (phone number) on the page
document.addEventListener('mouseup', function () {
    let selectedText = window.getSelection().toString().trim();

    if (selectedText) {
        // Check if the selected text is a valid phone number (basic regex validation)
        const phoneNumber = extractPhoneNumber(selectedText);

        if (phoneNumber) {
            // Get the saved country code from Chrome's storage
            chrome.storage.sync.get(['countryCode'], function (result) {
                const countryCode = result.countryCode || '+1'; // Default to +1 (USA) if no code is set

                // Ask the user for confirmation before sending to WhatsApp
                if (confirm(`Send this number: ${countryCode}${phoneNumber} to WhatsApp?`)) {
                    const whatsappUrl = `whatsapp://send?phone=${countryCode}${phoneNumber}`;
                    window.open(whatsappUrl);  // Open WhatsApp via the URL scheme
                }
            });
        }
    }
});

// Function to extract a valid phone number from selected text
function extractPhoneNumber(text) {
    // Basic phone number validation: remove non-numeric characters, allow "+" at the start
    const cleanedText = text.replace(/[^\d+]/g, '');

    // Check if the cleaned text looks like a phone number (length between 7 and 15 digits)
    if (/^\+?\d{7,15}$/.test(cleanedText)) {
        return cleanedText;
    } else {
        return null;
    }
}
