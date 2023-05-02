import React, { useEffect, useState } from 'react';
import { initiateConversation, saveConversation, continueConversation } from '../conversationManager'
import classNames from 'classnames';
import propTypes from 'prop-types';


const Modal = ({ conversation, isLoading, handleClose, handleSave, handleSend, handleCompressAndSave, isOpen, name, url }) => {
    const [inputText, setInputText] = useState('');
    
    const close = () => {
        handleClose();
        setInputText('');
    };

    const save = () => {
        handleSave();
    };

    const send = () => {
        handleSend(inputText);
        setInputText('');
    };

    const handleTextChange = (event) => {
        setInputText(event.target.value);
    };

    const compressAndSave = () => {
        handleCompressAndSave();
        close();
    };
      
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
            <div className="ai-interact-chrome-extension-modal-overlay ai-interact-bulma  modal ai-interact-bulma  is-active" onClick={handleClose}>
                <div className="ai-interact-chrome-extension-modal ai-interact-bulma  modal-dialog" onClick={(e) => e.stopPropagation()}>
                    <button className="ai-interact-chrome-extension-closeButton ai-interact-bulma  delete" onClick={handleClose}></button>
                    <div className="ai-interact-bulma modal-content ai-interact-chrome-extension-modal-content">
                        <div className="ai-interact-chrome-extension-modal-body ai-interact-bulma  modal-card">
                            <div className=" ai-interact-bulma  modal-card-body">
                                <h3 className="ai-interact-bulma title is-4">{name}</h3>
                                <p className="ai-interact-bulma-subtitle is-6"><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
                                {renderConversation()}
                                {renderLoading()}
                                <textarea
                                    id="ai-interact-chrome-extension-textarea"
                                    className="ai-interact-bulma  textarea"
                                    value={inputText}
                                    onChange={handleTextChange}
                                    readOnly={false}
                                />
                                <div className="ai-interact-bulma field  is-grouped">
                                    <p className="ai-interact-bulma control">
                                        <button className="ai-interact-bulma button  is-primary" onClick={send}>Send</button>
                                    </p>
                                    <p className="control">
                                        <button className="ai-interact-bulma button  is-warning" onClick={close}>Close</button>
                                    </p>
                                    <p className="control">
                                        <button className="ai-interact-bulma button  is-info" onClick={save}>Save conversation</button>
                                    </p>
                                    <p className="control">
                                        <button className="ai-interact-bulma button  is-info" onClick={compressAndSave}>Compress & Save</button>
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

Modal.propTypes = {
    conversation: propTypes.array,
    isLoading: propTypes.bool,
    handleClose: propTypes.func,
    handleSave: propTypes.func,
    handleSend: propTypes.func,
    handleCompressAndSave: propTypes.func,
    isOpen: propTypes.bool,
    name: propTypes.string,
    url: propTypes.string
};

Modal.defaultProps = {
    conversation: [],
    isLoading: false,
    handleClose: () => {},
    handleSave: () => {},
    handleSend: () => {},
    handleCompressAndSave: () => {},
    isOpen: false,
    name: '',
    url: ''
};


export default Modal;