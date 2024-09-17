// popup_and_options.js

// When DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const toggleCheckbox = document.getElementById('extensionToggle');
    const countrySelect = document.getElementById('countrySelect');
    const defaultMessageInput = document.getElementById('defaultMessage');
    const statusLabel = document.createElement('p'); // To show messages
    document.body.appendChild(statusLabel);

    // Populate country dropdown
    const countries = [
        { name: "Egypt", code: "+20" },
        { name: "United States", code: "+1" },
        { name: "United Kingdom", code: "+44" },
        { name: "Canada", code: "+1" },
        { name: "Australia", code: "+61" },
        { name: "Germany", code: "+49" },
        { name: "France", code: "+33" },
        { name: "India", code: "+91" },
        { name: "Japan", code: "+81" }
    ];

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.name} (${country.code})`;
        countrySelect.appendChild(option);
    });

    // Fetch the current settings from storage and set the form fields
    chrome.storage.sync.get(['extensionEnabled', 'countryCode', 'defaultMessage'], function (result) {
        toggleCheckbox.checked = result.extensionEnabled === true; // Default disabled
        countrySelect.value = result.countryCode || '+20'; // Default to Egypt
        defaultMessageInput.value = result.defaultMessage || 'Hello';
    });

    // Enable/Disable extension toggle
    toggleCheckbox.addEventListener('change', function () {
        const isEnabled = toggleCheckbox.checked;
        chrome.storage.sync.set({ extensionEnabled: isEnabled }, function () {
            statusLabel.textContent = isEnabled ? 'Extension Enabled' : 'Extension Disabled';
        });
    });

    // Form submission for country and message saving
    document.getElementById('countryForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const selectedCountryCode = countrySelect.value;
        const defaultMessage = defaultMessageInput.value;

        // Save to Chrome storage
        chrome.storage.sync.set({
            countryCode: selectedCountryCode,
            defaultMessage: defaultMessage
        }, function () {
            statusLabel.textContent = 'Country code and message saved!';
        });
    });
});
