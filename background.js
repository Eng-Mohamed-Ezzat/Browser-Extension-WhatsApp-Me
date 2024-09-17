// background.js

// Set default values for country code and default message when the extension is installed
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        // Set default country code (Egypt), default message, and extension disabled by default
        chrome.storage.sync.set({
            countryCode: '+20',
            defaultMessage: 'Hello',
            extensionEnabled: false // Default state is disabled
        }, function () {
            console.log('Extension installed: Default country set to Egypt (+20) and extension is disabled.');
        });
    }
});

// Listener for tab updates (to re-inject content script if needed)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['contentScript.js']
        }, () => {
            console.log('Content script re-injected.');
        });
    }
});
