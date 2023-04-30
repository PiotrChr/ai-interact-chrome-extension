import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const axiosInstance = axios.create({
    baseURL: OPENAI_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const setApiKey = (apiKey) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
}

const chatCompletion = async (messages) => {
    const data = {
        model: 'gpt-3.5-turbo',
        messages,
    };

    try {
        const response = await axiosInstance.post('', data);
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error in chatCompletion:', error);
        throw error;
    }
};


export default {
    setApiKey,
    chatCompletion,
};