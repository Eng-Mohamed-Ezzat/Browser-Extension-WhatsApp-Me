// options.js

// List of countries with country codes and flags (URLs to flag images)
const countries = [
    { name: "Egypt", code: "+20", flag: "https://flagcdn.com/w40/eg.png" },
    { name: "United States", code: "+1", flag: "https://flagcdn.com/w40/us.png" },
    { name: "United Kingdom", code: "+44", flag: "https://flagcdn.com/w40/gb.png" },
    { name: "Canada", code: "+1", flag: "https://flagcdn.com/w40/ca.png" },
    { name: "Australia", code: "+61", flag: "https://flagcdn.com/w40/au.png" },
    { name: "Germany", code: "+49", flag: "https://flagcdn.com/w40/de.png" },
    { name: "France", code: "+33", flag: "https://flagcdn.com/w40/fr.png" },
    { name: "India", code: "+91", flag: "https://flagcdn.com/w40/in.png" },
    { name: "Japan", code: "+81", flag: "https://flagcdn.com/w40/jp.png" },
];

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('countrySelect');
    const defaultMessageInput = document.getElementById('defaultMessage');

    // Populate the country select options
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.innerHTML = `${country.name} (${country.code})`;
        countrySelect.add(option);
    });

    // Retrieve and display the saved country code and default message
    chrome.storage.sync.get(['countryCode', 'defaultMessage'], function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving stored configurations:', chrome.runtime.lastError);
            return;
        }

        // Set the saved country code as the selected option
        if (result.countryCode) {
            countrySelect.value = result.countryCode;
        } else {
            countrySelect.value = '+20'; // Default to Egypt if no value is saved
        }

        // Set the saved default message
        if (result.defaultMessage) {
            defaultMessageInput.value = result.defaultMessage;
        }
    });

    // Save the selected country code and default message
    document.getElementById('countryForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const selectedCountryCode = countrySelect.value;
        const defaultMessage = defaultMessageInput.value;

        // Save the country code and default message in Chrome's sync storage
        chrome.storage.sync.set({ countryCode: selectedCountryCode, defaultMessage: defaultMessage }, function () {
            alert('Country code and default message saved successfully!');
        });
    });
});
