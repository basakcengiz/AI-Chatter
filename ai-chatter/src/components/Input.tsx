import { Send2 } from 'iconsax-react';

type Props = {};

const Input = (props: Props) => {
  return (
    <div className="w-4/5 relative mt-2">
      <input className="focus:outline-none rounded-lg w-full h-20 pl-6 bg-[#EEEEF8] placeholder-gray-600 " placeholder="Ask ChatGPT..." />
      <button className="absolute right-6 top-6 text-gray-600 hover:text-[#7678ED]">
        <Send2 size="32" color="currentColor" />
      </button>
    </div>
  );
};
export default Input;
