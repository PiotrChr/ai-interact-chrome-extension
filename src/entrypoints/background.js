chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "interact",
        title: "Interact",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'interact') {
      chrome.tabs.sendMessage(tab.id, {
        action: 'interact',
        text: info.selectionText,
      });
    }
  });