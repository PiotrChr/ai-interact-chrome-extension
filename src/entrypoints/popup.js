console.log(chrome.runtime.id);
document.getElementById('settings-link').href = `chrome-extension://${chrome.runtime.id}/html/settings.html`;