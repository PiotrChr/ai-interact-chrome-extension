import React from 'react';
import PropTypes from 'prop-types';

const Conversation = ({ title, onClick, onDelete }) => {
    return (
        <div className="ai-interact-chrome-extension-conversation ai-interact-bulma  box">
          <div
            className="ai-interact-chrome-extension-conversation-name ai-interact-bulma  has-text-weight-bold"
            onClick={onClick}>
            {title}
          </div>
          <button
            className="ai-interact-chrome-extension-conversation-remove ai-interact-bulma  button ai-interact-bulma  is-danger ai-interact-bulma  is-light ai-interact-bulma  is-small"
            onClick={onDelete}>
            Remove
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