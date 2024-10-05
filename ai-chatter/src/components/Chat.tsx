import chatGPTLogo from '@assets/chatGPT.svg';
import { User } from 'iconsax-react';
import { Message } from '../types';
import { useEffect, useRef } from 'react';

type Props = {
  messages: Message[];
  isTyping: boolean;
};
const Chat = ({ messages, isTyping }: Props) => {
  const messageBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messageBox || !messageBox.current) return;
    messageBox.current.scrollTo(0, messageBox.current.scrollHeight);
  }, [messages]);

  return (
    <div className="bg-white w-4/5 h-3/5 rounded-lg overflow-scroll" ref={messageBox}>
      <div className="flex items-end p-2">
        <img alt="chatGPTLogo" src={chatGPTLogo} width={36} height={36} style={{ margin: '5px' }}></img>
        <div className="bg-[#EEEEF8] w-fit max-w-[60%] p-4 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl">Hello, I'm ChatGPT! Ask me anything!</div>
      </div>
      <>
        {messages.map((message, index) => {
          if (message.role === 'assistant') {
            return (
              <div key={index} className="flex items-end p-2">
                <img alt="chatGPTLogo" src={chatGPTLogo} width={36} height={36} style={{ margin: '5px' }}></img>
                <div className="bg-[#EEEEF8] w-fit max-w-[60%] p-4 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl">{message.message}</div>
              </div>
            );
          } else if (message.role === 'user') {
            return (
              <div key={index} className="flex items-end justify-end p-2">
                <div className="bg-[#7678ED] w-fit max-w-[60%] p-4 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl text-white">{message.message}</div>
                <User size="30" color="#555555" style={{ margin: '5px' }} />
              </div>
            );
          }
        })}
      </>

      {isTyping && (
        <div className="flex items-end p-2">
          <img src={chatGPTLogo} width={36} height={36} style={{ margin: '5px' }}></img>
          <div className="bg-[#EEEEF8] p-3 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl ">Typing...</div>
        </div>
      )}
    </div>
  );
};

export default Chat;
