import React from 'react';
import PropTypes from 'prop-types';
import './Conversation.css';

const Conversation = ({ title, onClick, onDelete }) => {
  return (
    <div className="ai-interact-chrome-extension-conversation">
      <button className="ai-interact-chrome-extension-conversation-title" onClick={onClick}>
        {title}
      </button>
      <button className="ai-interact-chrome-extension-conversation-delete" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

Conversation.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Conversation;