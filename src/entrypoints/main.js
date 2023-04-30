import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/Main';

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

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);
