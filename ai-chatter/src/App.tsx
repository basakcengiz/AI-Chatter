import { useRef, useState } from 'react';
import './App.css';

import Chat from './components/Chat';
import Input from './components/Input';

import { Message } from './types';

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
  const abortControllerRef = useRef<AbortController | null>(null);

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
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      setIsTyping(true);
      const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: updatedMessages.map((message) => ({
            role: message.role,
            content: message.message
          })),
          temperature: 0.7,
          stream: true
        }),
        signal
      });

      if (!response || !response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let streamingMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        const parsedLines = lines
          .map((line) => line.replace(/^data: /, '').trim())
          .filter((line) => line !== '' && line !== '[DONE]')
          .map((line) => JSON.parse(line));

        for (const parsedLine of parsedLines) {
          const content = parsedLine.choices[0].delta.content;
          if (content) {
            streamingMessage += content;

            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages];
              if (updatedMessages[updatedMessages.length - 1].role === 'user') {
                updatedMessages.push({
                  message: '',
                  role: 'assistant'
                });
              }
              updatedMessages[updatedMessages.length - 1] = {
                message: streamingMessage,
                role: 'assistant'
              };
              return updatedMessages;
            });
          }
        }
      }

      setIsTyping(false);
    } catch (error) {
      setIsTyping(false);
      if (error instanceof DOMException && error.name === 'AbortError') {
        toast.success('Request cancelled');
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  const stopRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsTyping(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-[#DBDCFF] h-screen">
      <Chat messages={messages} isTyping={isTyping} />
      <Input value={inputValue} setValue={setInputValue} handleSend={sendMessage} isTyping={isTyping} handleStop={stopRequest} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
