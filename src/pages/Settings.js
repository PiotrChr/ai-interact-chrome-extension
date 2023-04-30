import React, { useState, useEffect } from 'react';
import {
  saveApiKey,
  getSavedApiKey,
  getSavedConversations,
  setConversations as setSavedConversations,
} from '../conversationManager'

const Settings = () => {
  const [apiKey, setApiKey] = useState('');
  const [conversations, setConversations] = useState([]);

  // Load saved API key and conversations from local storage
  useEffect(() => {
    setApiKey(getSavedApiKey());
    setConversations(getSavedConversations());
  }, []);

  const removeConversation = (index) => {
    const updatedConversations = conversations.filter((_, i) => i !== index);
    setConversations(updatedConversations);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleSaveApiKey = () => {
    saveApiKey(apiKey);
  };

  const handleRemoveConversation = (index) => {
    const updatedConversations = conversations.filter((_, i) => i !== index);
    setConversations(updatedConversations);
    setSavedConversations(updatedConversations);
  };

  return (
    <div className="ai-interact-chrome-extension-settings">
      <h1>Settings</h1>
      <div className="ai-interact-chrome-extension-apikey">
        <label htmlFor="ai-interact-chrome-extension-apikey-input">OpenAI API Key</label>
        <input
          id="ai-interact-chrome-extension-apikey-input"
          type="text"
          value={apiKey}
          onChange={handleApiKeyChange}
        />
        <button onClick={handleSaveApiKey}>Save API Key</button>
      </div>
      <h2>Saved Conversations</h2>
      <ul className="ai-interact-chrome-extension-conversations">
        {conversations.map((conversation, index) => (
          <li key={index}>
            <span>{conversation.title}</span>
            <button onClick={() => handleRemoveConversation(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;