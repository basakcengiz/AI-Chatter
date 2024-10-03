import chatGPTLogo from '@assets/chatGPT.svg';
import { User } from 'iconsax-react';

const Chat = () => {
  return (
    <div className="bg-white w-4/5 h-3/5 rounded-lg overflow-scroll">
      <div className="flex items-end p-2">
        <img src={chatGPTLogo} width={36} height={36} style={{ margin: '5px' }}></img>
        <div className="bg-[#EEEEF8] w-3/5 p-4  rounded-tl-2xl rounded-br-2xl rounded-tr-2xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas iste asperiores cupiditate quae ex, pariatur id amet nemo voluptatem quod culpa
          maxime, neque facere iure consequuntur et. Assumenda illum inventore atque ea adipisci id doloribus quaerat possimus iste, ipsam dolor velit
          laudantium, magni in perspiciatis fugit quas distinctio? Corporis, ea!
        </div>
      </div>

      <div className="flex items-end justify-end p-2 ">
        <div className="bg-[#7678ED] w-3/5 p-4 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl text-white ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati aut nemo natus, magni praesentium nostrum laudantium temporibus saepe vel commodi
          maxime dolore nisi aliquam fugiat impedit cumque tempore? Molestias officiis, eos dolorum saepe delectus ullam error atque voluptatem alias porro
          adipisci itaque accusantium nulla voluptate. Iusto quaerat odit eum autem?
        </div>
        <User size="30" color="#555555" style={{ margin: '5px' }} />
      </div>
      <div className="flex items-end p-2">
        <img src={chatGPTLogo} width={36} height={36} style={{ margin: '5px' }}></img>
        <div className="bg-[#EEEEF8] w-3/5 p-4  rounded-tl-2xl rounded-br-2xl rounded-tr-2xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas iste asperiores cupiditate quae ex, pariatur id amet nemo voluptatem quod culpa
          maxime, neque facere iure consequuntur et. Assumenda illum inventore atque ea adipisci id doloribus quaerat possimus iste, ipsam dolor velit
          laudantium, magni in perspiciatis fugit quas distinctio? Corporis, ea!
        </div>
      </div>

      <div className="flex items-end justify-end p-2 ">
        <div className="bg-[#7678ED] w-3/5 p-4 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl text-white ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati aut nemo natus, magni praesentium nostrum laudantium temporibus saepe vel commodi
          maxime dolore nisi aliquam fugiat impedit cumque tempore? Molestias officiis, eos dolorum saepe delectus ullam error atque voluptatem alias porro
          adipisci itaque accusantium nulla voluptate. Iusto quaerat odit eum autem?
        </div>
        <User size="30" color="#555555" style={{ margin: '5px' }} />
      </div>

      <div className="flex items-end p-2">
        <img src={chatGPTLogo} width={36} height={36} style={{ margin: '5px' }}></img>
        <div className="bg-[#EEEEF8] p-3 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl ">Typing...</div>
      </div>
    </div>
  );
};

export default Chat;
