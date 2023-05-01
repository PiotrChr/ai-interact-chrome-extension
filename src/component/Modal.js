import React, { useEffect, useState } from 'react';
import { initiateConversation, createRandomUuidConversationName, continueConversation } from '../conversationManager'
import classNames from 'classnames';


const Modal = ({ selectedText, initialConversationName = null }) => {
    const [conversationName, setConversationName] = useState(initialConversationName);
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSelectedText, setCurrentSelectedText] = useState('');
  
  useEffect(() => {
    
    const handleMessage = async (request, sender, sendResponse) => {
        if (request.action === 'interact') {
            setIsOpen(true);

            if (request.text !== currentSelectedText && request.text !== '') {
                console.log('new text');
                setCurrentSelectedText(request.text);
            }
            console.log('conversation', conversation);
            console.log('conversation.length', conversation.length);
            if (conversation.length === 0 && request.text !== '') {
                console.log('bootstrap');
                await bootstrap(request.text);
            }
        }
    };

    chrome.runtime.onMessage.addListener(handleMessage);
    
    return () => {
        chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [selectedText]);

  const bootstrap = async (selectedText) => {
    setIsLoading(true);
    if (!initialConversationName) {
        setConversationName(createRandomUuidConversationName());
    }

    if (selectedText) {
        let conversation = await initiateConversation(selectedText, conversationName);
        setIsLoading(false);
        setConversation(conversation);
    }
  };

  const handleOpen = (selectedText) => {
    setInputText(selectedText);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAPIRequest = async () => {
    setIsLoading(true);
    try {
        const updatedConversation = await continueConversation(inputText, conversation);
        setConversation(updatedConversation);
        setIsLoading(false);
        setInputText(''); // Clear the textarea after sending the message
      } catch (error) {
        setIsLoading(false);
        console.error('Error in handleAPIRequest:', error);
      }
  };
3

  const renderConversation = () => {
    return (<div className="ai-interact-chrome-extension-modal-conversation">
        { conversation.map((item, index) => {
            return (<div key={index} className={classNames(item.role == 'user' ? 'ai-role-user' : 'ai-role-ai', 'ai-interact-chrome-extension-modal-message')}>
                <pre>{item.content}</pre>
            </div>);
         }) 
        }
    </div>);
  };

  const renderLoading = () => {
    return isLoading ? (
        <div className="ai-interact-chrome-extension-loading">
          <p>Just a moment, I'm thinking...</p>
          <div className="spinner"></div>
        </div>
      ) : null;
  };

  return (
    isOpen && (
        <div className="ai-interact-chrome-extension-modal-overlay ai-interact-bulma-modal ai-interact-bulma-is-active" onClick={handleClose}>
          <div className="ai-interact-chrome-extension-modal ai-interact-bulma-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <button className="ai-interact-chrome-extension-closeButton ai-interact-bulma-delete" onClick={handleClose}></button>
              <div className="ai-interact-chrome-extension-modal-body ai-interact-bulma-modal-card">
                <div className="ai-interact-chrome-extension-modal-content ai-interact-bulma-modal-card-body">
                  {renderConversation()}
                  {renderLoading()}
                  <textarea
                    id="ai-interact-chrome-extension-textarea"
                    className="ai-interact-bulma-textarea"
                    value={inputText}
                    onChange={handleTextChange}
                    readOnly={false}
                  />
                  <div className="ai-interact-bulma-field ai-interact-bulma-is-grouped">
                    <p className="ai-interact-bulma-control">
                      <button className="ai-interact-bulma-button ai-interact-bulma-is-primary" onClick={handleAPIRequest}>Send</button>
                    </p>
                    <p className="control">
                      <button className="ai-interact-bulma-button ai-interact-bulma-is-warning" onClick={handleClose}>Close</button>
                    </p>
                    <p className="control">
                      <button className="ai-interact-bulma-button ai-interact-bulma-is-info" onClick={handleClose}>Save conversation</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
};

export default Modal;