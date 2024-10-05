import { useState } from 'react';
import './App.css';

import Chat from './components/Chat';
import Input from './components/Input';

import { Message } from './types';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'system',
      message: 'You are a helpful assistant.'
    }
  ] as Message[]);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const sendMessage = async (inputValue: string) => {
    const newMessage = {
      message: inputValue,
      role: 'user'
    };

    setMessages((prevMessages) => [...prevMessages, newMessage] as Message[]);
    setInputValue('');
    await fetchResponse([...messages, newMessage] as Message[]);
  };

  const fetchResponse = async (updatedMessages: Message[]) => {
    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      setIsTyping(true);
      const response = await axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
          model: 'gpt-4o',
          messages: updatedMessages.map((message) => ({
            role: message.role,
            content: message.message
          })),
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
    <>
      <div className="flex flex-col items-center justify-center bg-[#DBDCFF] h-screen">
        <Chat messages={messages} isTyping={isTyping} />
        <Input value={inputValue} setValue={setInputValue} handleSend={sendMessage} />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
