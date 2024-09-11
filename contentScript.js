let countryCode = null;  // This will store the selected country code

// Listen for messages from the popup (index.html) to get the selected country code
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'setCountryCode') {
        countryCode = message.countryCode;  // Store the country code
        console.log('Country code received:', countryCode);
    }
});

// Create the floating WhatsApp icon element
const icon = document.createElement('img');
icon.src = 'https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png';  // WhatsApp icon URL
icon.style.position = 'absolute';
icon.style.width = '30px';
icon.style.height = '30px';
icon.style.display = 'none';  // Initially hidden
icon.style.cursor = 'pointer';
icon.style.zIndex = '1000';
document.body.appendChild(icon);

// Function to get the selected phone number
function getSelectedText() {
    let selectedText = window.getSelection().toString().trim();
    return selectedText.replace(/[^\d]/g, '');  // Remove non-digit characters
}

// Event listener to show the WhatsApp icon when a number is selected
document.addEventListener('mouseup', function () {
    let selectedText = getSelectedText();

    // Check if the selected text is a valid number
    if (selectedText && !isNaN(selectedText)) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Show the WhatsApp icon near the selected text
        icon.style.top = `${window.scrollY + rect.bottom}px`;
        icon.style.left = `${window.scrollX + rect.right + 10}px`;
        icon.style.display = 'block';
    } else {
        icon.style.display = 'none';  // Hide the icon if no valid number is selected
    }
});

// Event listener to handle WhatsApp message sending when the icon is clicked
icon.addEventListener('click', function () {
    let selectedText = getSelectedText();
    let countryCodedefault = "2";
    if (selectedText && !isNaN(selectedText) && countryCodedefault) {
        // Format the phone number: combine the country code and selected number
        const formattedNumber = `${countryCodedefault}${selectedText}`;

        // Open WhatsApp Desktop or Web using the custom URL scheme
        const whatsappUrl = `whatsapp://send?phone=${formattedNumber}`;
        window.open(whatsappUrl, '_blank');
    } else {
        alert('Please select a valid phone number and ensure a country code is selected.');
    }

    icon.style.display = 'none';  // Hide the icon after clicking
});
