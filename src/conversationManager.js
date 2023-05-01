
import { setApiKey, chatCompletion } from './repository/openApiRepository.js';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_PREFIX = 'ai_interact_';

const PART_END = 'Part-done';
const CONVERSATION_END = 'Done-Done';
const MAX_WORD_LENGTH = 100; // or any value you prefer

const INITIALIZING_PROMPT = {
    role: "user",
    content: "I'll now input consecutive parts of the article/documentation I'd like you to learn it and provive me guidance on it. I'll start with the first part and later proceed with remaning. After each part I'll say 'Part-done'. I'll then proceed with the next part. After and only after I'm done with inserting the whole text we can start the conversation, You'll know this because I'll say 'Done-Done'. I'll start with the first part now. Reply only with OK.",
  };
const FINAL_PROMPT = {
    role: "user",
    content: CONVERSATION_END + "\n I'm done with inserting the whole text. \n We can start the conversation now. Don't confirm anything but reply by quickly summarizing what you've read in a few bullet points and then ask me what I'd like to know more about the contents. Start with 'From the text you provided...'",
};

const createPrompt = (text, index, final = false) => {
    return {
      role: "user",
      content: `Part ${index + 1} of ${final ? "final" : ""} text: ${text}\nPart-done\n`,
    };
};
  

export const saveApiKey = async (apiKey) => {
    await new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_PREFIX + 'apiKey']: apiKey }, resolve);
    });
};

export const saveOrgId = async (orgId) => {
    await new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_PREFIX + 'orgId']: orgId }, resolve);
    });
};

export const getSavedOrgId = async () => {
    return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_PREFIX + 'orgId'], (result) => {
        resolve(result[STORAGE_PREFIX + 'orgId']);
        });
    });
};

export const getSavedApiKey = async () => {
    return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_PREFIX + 'apiKey'], (result) => {
        resolve(result[STORAGE_PREFIX + 'apiKey']);
        });
    });
};

export const getSavedConversations = async (conversationName) => {
    return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_PREFIX + conversationName + '_conversations'], (result) => {
            console.log(result)
            resolve(result[STORAGE_PREFIX + conversationName + '_conversations'] || []);
        });
    });
};

export const getAllSavedConversations = async () => {
}        

export const createRandomUuidConversationName = () => {
    return uuidv4();
}

export const saveConversation = async (conversation, conversationName) => {
    const savedConversations = await getSavedConversations(conversationName);
    const updatedConversations = [...savedConversations, conversation];
    await setConversations(updatedConversations);
};

export const setConversations = async (updatedConversations, conversationName) => {
    await new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_PREFIX + conversationName + '_conversations']: updatedConversations }, resolve);
    });
};

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

export const continueConversation = async (text, conversation) => {
    // Set the API key before making requests
    const apiKey = await getSavedApiKey();
    if (!apiKey) {
        console.error('API key not found. Please set the API key.');
        return;
    }
    setApiKey(apiKey);
        
    try {
        conversation.push({ role: "user", content: text });
        const response = await chatCompletion(conversation);
        conversation.push({ role: "assistant", content: response });
        return conversation;
    } catch (error) {
        console.error('Error in sending last message:', error);
        return;
    }
}

export const initiateConversation = async (text, conversationName) => {
    const parts = divideText(text);
    const prompts = parts.map((part, index) => createPrompt(part, index, index === parts.length - 1));
    
    let savedConversation = await getSavedConversations(conversationName);
    console.log('savedConversation', savedConversation);

    // Set the API key before making requests
    const apiKey = await getSavedApiKey();
    if (!apiKey) {
        console.error('API key not found. Please set the API key.');
        return;
    }
    setApiKey(apiKey);
    
    const conversation = [];
    conversation.push(...savedConversation);

    if (conversation.length > 0) {
        try {
            const response = await chatCompletion(conversation);
            conversation.push({ role: "assistant", content: response });
            return conversation;
        } catch (error) {
            console.error('Error in sending last message:', error);
            return;
        }
    }

    // Send the initializing prompt first
    try {
        conversation.push(INITIALIZING_PROMPT);
        const initializingResponse = await chatCompletion(conversation);
        conversation.push({ role: "assistant", content: initializingResponse });
        
    } catch (error) {
        console.error('Error in sending initializing prompt:', error);
        return;
    }

    // Iterate through prompts and send them one by one
    for (let i = 0; i < prompts.length; i++) {
        try {
            conversation.push(prompts[i]);
            const response = await chatCompletion(conversation);
            conversation.push({ role: "assistant", content: response });
        } catch (error) {
            console.error(`Error in sending prompt ${i + 1}:`, error);
            break;
        }
    }

    // Send the final prompt
    try {
        conversation.push(FINAL_PROMPT);
        const finalResponse = await chatCompletion(conversation);
        conversation.push({ role: "assistant", content: finalResponse });
        
    } catch (error) {
        console.error('Error in sending final prompt:', error);
    }

    return [conversation[conversation.length - 1]];
}