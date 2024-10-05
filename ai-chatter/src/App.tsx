import { useState } from 'react';
import './App.css';

import Chat from './components/Chat';
import Input from './components/Input';

import { Message } from './types';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([] as Message[]);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const sendMessage = async (inputValue: string) => {
    const newMessage = {
      message: inputValue,
      role: 'user'
    };
    const newMessages = [...messages, newMessage] as Message[];
    setMessages(newMessages);
    setInputValue('');
    await fetchResponse();
  };

  const fetchResponse = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      setIsTyping(true);
      const response = await axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.'
            },
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.message
            }))
          ],
          temperature: 0.7
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: response.data.choices[0].message.content,
          role: response.data.choices[0].message.role
        }
      ]);
      setIsTyping(false);
      console.log(response.data.choices[0].message);
    } catch (error) {
      setIsTyping(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error?.message || 'An error occurred');
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-[#DBDCFF] h-screen">
      <Chat messages={messages} isTyping={isTyping} />
      <Input value={inputValue} setValue={setInputValue} handleSend={sendMessage} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
