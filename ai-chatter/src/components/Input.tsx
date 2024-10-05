import { Send2 } from 'iconsax-react';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSend: (inputValue: string) => void;
};

const Input = ({ value, setValue, handleSend }: Props) => {
  return (
    <div className="w-4/5 relative mt-2">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSend(value);
        }}
      >
        <input
          className="focus:outline-none rounded-lg w-full h-20 pl-6 bg-[#EEEEF8] placeholder-gray-600 "
          placeholder="Ask ChatGPT..."
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
        />
        <button className="absolute right-6 top-6 text-gray-600 hover:text-[#7678ED]">
          <Send2 size="32" color="currentColor" />
        </button>
      </form>
    </div>
  );
};
export default Input;
