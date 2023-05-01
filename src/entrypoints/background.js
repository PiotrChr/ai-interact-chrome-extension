chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "interact",
        title: "Interact",
        contexts: ["selection", "page"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'interact') {
      const selectedText = info.selectionText || ""; 
      chrome.tabs.sendMessage(tab.id, {
        action: 'interact',
        text: selectedText,
      });
    }
  });