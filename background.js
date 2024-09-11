// background.js

// Set default values for country code and default message when the extension is installed
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        // Set default country code (Egypt) and default message (Hello)
        chrome.storage.sync.set({
            countryCode: '+20',
            defaultMessage: 'Hello'
        }, function () {
            console.log('Default country set to Egypt (+20) and default message set to "Hello".');
        });
    }
});

// Listener for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        if (tab.url && tab.url.includes('facebook.com')) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['contentScript.js']
            }, () => {
                console.log('Content script re-injected due to page update.');
            });
        }
    }
});

// Optional: Listener for tab activations (e.g., switching between tabs)
chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        if (tab.url && tab.url.includes('facebook.com')) {
            chrome.scripting.executeScript({
                target: { tabId: activeInfo.tabId },
                files: ['contentScript.js']
            }, () => {
                console.log('Content script re-injected due to tab activation.');
            });
        }
    });
});
