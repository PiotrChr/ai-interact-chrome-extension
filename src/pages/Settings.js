import React, { useState, useEffect } from 'react';
import {
  saveApiKey,
  getSavedApiKey,
  getSavedConversations,
  setConversations as setSavedConversations,
  getSavedOrgId,
  saveOrgId,
} from '../conversationManager'

const Settings = () => {
  const [apiKey, setApiKey] = useState('');
  const [orgId, setOrgId] = useState('');
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      setConversations(await getSavedConversations());
    };

    const fetchOrgId = async () => {
      setOrgId(await getSavedOrgId());
    }

    const fetchApiKey = async () => {
      setApiKey(await getSavedApiKey());
    };

    fetchAll()
      .catch((err) => {
        console.error(err);
      });

    fetchApiKey()
      .catch((err) => {
        console.error(err);
      });
      
    fetchOrgId()
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const removeConversation = (index) => {
    const updatedConversations = conversations.filter((_, i) => i !== index);
    setConversations(updatedConversations);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleOrgIdChange = (event) => {
    setOrgId(event.target.value);
  };

  const handleSaveApiKey = async () => {
    await saveApiKey(apiKey);
  };

  const handleSaveOrgId = async () => {
    await saveOrgId(orgId);
  };

  const handleRemoveConversation = async (index) => {
    const updatedConversations = conversations.filter((_, i) => i !== index);
    setConversations(updatedConversations);
    await setSavedConversations(updatedConversations);
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
      <div className="ai-interact-chrome-extension-orgId">
        <label htmlFor="ai-interact-chrome-extension-orgId-input">OpenAI Org ID</label>
        <input
          id="ai-interact-chrome-extension-apikey-input"
          type="text"
          value={orgId}
          onChange={handleOrgIdChange}
        />
        <button onClick={handleSaveOrgId}>Save Org Id</button>
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