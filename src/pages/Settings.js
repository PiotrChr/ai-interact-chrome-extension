import React, { useState, useEffect } from 'react';
import {
  saveApiKey,
  getSavedApiKey,
  getSavedOrgId,
  saveOrgId,
} from '../conversationManager'
import { Navbar } from '../component/Navbar'

const Settings = () => {
  const [apiKey, setApiKey] = useState('');
  const [orgId, setOrgId] = useState('');
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchApiKey = async () => {
      setApiKey(await getSavedApiKey());
    };
    const fetchOrgId = async () => {
      setOrgId(await getSavedOrgId());
    }

    fetchApiKey()
      .catch((err) => {
        console.error(err);
      });
      
    fetchOrgId()
      .catch((err) => {
        console.error(err);
      });
  }, []);

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

  return (
    <div className="ai-interact-bulma container">
      <Navbar />
      <div className="ai-interact-chrome-extension-settings">
        <h1 className="ai-interact-bulma title">Settings</h1>
        <label htmlFor="ai-interact-chrome-extension-apikey-input" className="ai-interact-bulma label">OpenAI API Key</label>
        <div className="ai-interact-chrome-extension-apikey ai-interact-bulma field has-addons">
            <div className="ai-interact-bulma control">
              <input
                id="ai-interact-chrome-extension-apikey-input"
                className="ai-interact-bulma input"
                type="text"
                value={apiKey}
                onChange={handleApiKeyChange}
              />
            </div>
            <div className="ai-interact-bulma control">
              <a className="ai-interact-bulma button ai-interact-bulma is-primary" onClick={handleSaveApiKey}>Save</a>
            </div>
        </div>
        <label htmlFor="ai-interact-chrome-extension-orgId-input" className="ai-interact-bulma label">OpenAI Org ID</label>
        <div className="ai-interact-chrome-extension-orgId ai-interact-bulma field has-addons">
          <div className="ai-interact-bulma control">
            <input
              id="ai-interact-chrome-extension-orgId-input"
              className="ai-interact-bulma input"
              type="text"
              value={orgId}
              onChange={handleOrgIdChange}
            />
          </div>
          <div className="ai-interact-bulma control">
            <a className="button ai-interact-bulma is-primary" onClick={handleSaveOrgId}>Save</a>
          </div>
        </div>
      </div>
  </div>
  );
};

export default Settings;