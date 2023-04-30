import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Conversation from '../components/Conversation';
import { getSavedConversations } from '../conversationManager';
import './.Conversations.css';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    setConversations(getSavedConversations());
  }, []);

  const handleClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleCloseModal = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="my-extension-conversations">
      <h1>Conversations</h1>
      <div className="my-extension-conversation-list">
        {conversations.map((conversation, index) => (
          <Conversation
            key={index}
            title={conversation.title}
            onClick={() => handleClick(conversation)}
            onDelete={() => {}}
          />
        ))}
      </div>
      {selectedConversation && (
        <Modal
          selectedText={selectedConversation.text}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Conversations;