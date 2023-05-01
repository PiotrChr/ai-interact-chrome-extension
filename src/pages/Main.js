import React from 'react';
import Modal from './../component/Modal';

const Main = () => {
  const [selectedText, setSelectedText] = useState(null);

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'interact') {
      setSelectedText(request.text);
    }
  });

  return (
    <div>
      <Modal selectedText={selectedText}/>
    </div>
  );
};

export default App;