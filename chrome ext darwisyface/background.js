chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        name: "Jack"
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./foreground_styles.css"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND STYLES.");

                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./foreground.js"]
                })
                    .then(() => {
                        console.log("INJECTED THE FOREGROUND SCRIPT.");
                    });
            })
            .catch(err => console.log(err));
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_name') {
        chrome.storage.local.get('name', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });

                return;
            }

            sendResponse({
                message: 'success',
                payload: data.name
            });
        });

        return true;
    } else if (request.message === 'change_name') {
        chrome.storage.local.set({
            name: request.payload
        }, () => {
            if (chrome.runtime.lastError) {
                sendResponse({ message: 'fail' });
                return;
            }

            sendResponse({ message: 'success' });
        })

        return true;
    }
});

// Initialize an array to store visited URLs
const visitedURLs = [];

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "visitedURL") {
    const url = message.url;

    // Store the URL in your array or any desired storage
    visitedURLs.push(url);

    // You can also save this array to Chrome storage for persistence
    chrome.storage.local.set({ visitedURLs: visitedURLs });

    // Log the URL for demonstration
    console.log("Visited URL: " + url);
  }
});

function injectScript(tabId) {

    chrome.scripting.executeScript(
        {
            target: {tabId: tabId},
            files: ['inject.js'],
        }
    );

}

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // check for a URL in the changeInfo parameter (url is only added when it is changed)
    if (changeInfo.url) {
        
        // calls the inject function
        injectScript(tabId);

    }
});