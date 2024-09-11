// options.js

// Example list of countries and their country codes
const countries = [
    { name: "Egypt", code: "+2" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "Canada", code: "+1" },
    { name: "Australia", code: "+61" },
    { name: "Germany", code: "+49" },
    { name: "France", code: "+33" },
    { name: "India", code: "+91" },
    { name: "Japan", code: "+81" },
];

// options.js

document.getElementById('countryForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const countryCode = document.getElementById('countrySelect').value;
    
    // Save the country code in Chrome's sync storage
    chrome.storage.sync.set({ countryCode: countryCode }, function () {
        console.log('Country code saved:', countryCode);
    });
});

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('countrySelect');

    if (countrySelect) {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.text = `${country.name} (${country.code})`;

            // Set Egypt as the default selected option
            if (country.name === "Egypt") {
                option.selected = true;
            }

            countrySelect.add(option);
        });
    }
});
