import React, { useState } from 'react';

const Modal = ({ selectedText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    if (selectedText) {
      setInputText(selectedText);
      setIsOpen(true);
    }
  }, [selectedText]);

  const handleOpen = (selectedText) => {
    setInputText(selectedText);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAPIRequest = async () => {
    // Your logic to make API call and handle response
    console.log('API request made');
  };

  return (
    isOpen && (
        <div className="ai-interact-chrome-extension-modal-overlay" onClick={handleClose}>
          <div className="ai-interact-chrome-extension-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-interact-chrome-extension-modal-content">
              <button className="ai-interact-chrome-extension-closeButton" onClick={handleClose}>
                &times;
              </button>
              <textarea id="ai-interact-chrome-extension-textarea" value={inputText} readOnly />
              <button onClick={handleAPIRequest}>Get Response</button>
              <div>{responseText}</div>
            </div>
          </div>
        </div>
      )
    );
};

export default Modal;