// options.js

document.getElementById('countryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const countryCode = document.getElementById('countryCode').value;

    // Save the country code to Chrome's storage
    chrome.storage.sync.set({ countryCode: countryCode }, function() {
        alert('Country code saved!');
    });
});

// Load the saved country code when the options page is opened
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['countryCode'], function(result) {
        if (result.countryCode) {
            document.getElementById('countryCode').value = result.countryCode;
        }
    });
});
