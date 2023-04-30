
import { setApiKey, chatCompletion } from '../repository/conversationRepository';

const PART_END = 'Part-done';
const CONVERSATION_END = 'Done-Done';
const MAX_WORD_LENGTH = 100; // or any value you prefer

const INITIALIZING_PROMPT = "I'll now input consecutive parts of the article/documentation I'd like you to learn theb and provive me guidance on. I'll start with the first part and later proceed with remaning. After each part I'll say 'Part-done'. I'll then proceed with the next part. After and only after I'm done with inserting the whole text we can start the conversation, You'll know this because I'll say 'Done-Done'. I'll start with the first part now. Reply only with OK."
const FINAL_PROMPT = CONVERSATION_END + "\n I'm done with inserting the whole text. We can start the conversation now. Reply only with OK."

const createPrompt = (text, index, final=false) => {
    return `Part ${index+1} of ${final ? 'final' : ''} text: ${text}\nPart-done\n`;
};

export const saveApiKey = () => {
    localStorage.setItem('apiKey', apiKey);
  };

export const getSavedApiKey = () => {
    return localStorage.getItem('apiKey');
}

export const getSavedConversations = () => {
    return JSON.parse(localStorage.getItem('conversations')) || [];
}

export const saveConversation = (conversation) => {
    const updatedConversations = [...getSavedConversations(), conversation];
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
}

export const setConversations = (updatedConversations) => {
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
}

const divideText = (text) => {
  const words = text.split(' ');
  const parts = [];

  let currentPart = '';

  words.forEach((word) => {
    if (currentPart.split(' ').length + word.split(' ').length <= MAX_WORD_LENGTH) {
      currentPart += ' ' + word;
    } else {
      parts.push(currentPart.trim());
      currentPart = word;
    }
  });

  if (currentPart) {
    parts.push(currentPart.trim());
  }

  return parts;
};

