import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { initiateConversation, saveConversation, continueConversation, getSavedConversation } from '../conversationManager'

export const ModalContainer = ({ _conversation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [conversation, setConversation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSelectedText, setCurrentSelectedText] = useState('');

    useEffect(() => {
        if (_conversation) {
            setConversation(_conversation);
            setIsOpen(true);
        }

        const checkExistingConversation = async () => {
            const existingConversation = await getSavedConversation(window.location.href);
            if (existingConversation) {
                setConversation(existingConversation);
                setIsOpen(true);
            }
        };
        
        const handleMessage = async (request, sender, sendResponse) => {
            if (request.action === 'interact') {
                setIsOpen(true);
                
                if (request.text !== currentSelectedText && request.text !== '') {
                    setCurrentSelectedText(request.text);
                }
                
                if (conversation === null && request.text !== '') {
                    setIsOpen(true);
                    await bootstrap(request.text);
                } else {
                    console.log('confused');
                }
            }
        };

        chrome.runtime.onMessage.addListener(handleMessage);

        if (conversation===null) {
            checkExistingConversation();
        }
        
        return () => {
            chrome.runtime.onMessage.removeListener(handleMessage);
        };
    }, [currentSelectedText, _conversation, conversation]);

    const bootstrap = async (selectedText) => {
        setIsLoading(true);
        if (selectedText) {
            let conversation = await initiateConversation(
                selectedText,
                window.location.href,
                document.title
            );
            setIsLoading(false);
            setConversation(conversation);
        }
      };


    const handleSave = async () => {
        setIsLoading(true);
        try {
            await saveConversation(conversation, window.location.href, false);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error in handleSave:', error);
        }
    }

    const handleCompressAndSave = async () => {
        setIsLoading(true);
        try {
            // TODO: compress conversation
            await saveConversation(conversation, window.location.href, true);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error in handleCompressAndSave:', error);
        }
    }

    const handleAPIRequest = async (inputText) => {
        setIsLoading(true);
        try {
            const updatedConversation = await continueConversation(inputText, conversation);
            setConversation(updatedConversation);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error in handleAPIRequest:', error);
        }
    };

    console.log('conversation', conversation);

    return (
        <div>
            <Modal
                conversation={conversation?.conversation}
                isLoading={isLoading}
                isOpen={isOpen}
                handleClose={() => setIsOpen(false)}
                handleSave={handleSave}
                handleSend={handleAPIRequest}
                handleCompressAndSave={handleCompressAndSave}
                url={conversation?.url}
                name={conversation?.title}
            />
        </div>
    );
}

ModalContainer.defaultProps = {
    _conversation: null

}