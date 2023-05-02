import React, { useState, useEffect } from 'react';
import { ModalContainer } from '../component/ModalContainer';
import { Navbar } from '../component/Navbar';
import Conversation from '../component/Conversation';
import { getAllSavedConversations, removeConversation } from '../conversationManager';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setConversations(await getAllSavedConversations());
    };

    fetchAll();
  }, []);

  const handleClick = (conversation) => {
    setSelectedConversation(conversation);
    // open modal and pass conversation as prop
  };

  const handleCloseModal = () => {
    setSelectedConversation(null);
  };

  const handleRemoveConversation = async (url) => {
    await removeConversation(url);
    setConversations(await getAllSavedConversations());
  };

  return (
    <div className="ai-interact-bulma container">
      <Navbar />
      <div className="ai-interact-chrome-extension-conversations">
        <h1 className="ai-interact-bulma title">Conversations</h1>
        <div className="ai-interact-chrome-extension-conversation-list ai-interact-bulma column columns is-multiline">
          {conversations.map((conversation, index) => (
            <div className="ai-interact-bulma  column is-one-third" key={index}>
              <Conversation
                title={conversation.title}
                url={conversation.url}
                onClick={() => handleClick(conversation)}
                onDelete={() => {handleRemoveConversation(conversation.url)}}
              />
            </div>
          ))}
        </div>
        { <ModalContainer _conversation={selectedConversation} /> }
      </div>
    </div>
  );
};

export default Conversations;