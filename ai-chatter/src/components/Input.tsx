import { Send2, StopCircle } from 'iconsax-react';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSend: (inputValue: string) => void;
  isTyping: boolean;
  handleStop: () => void;
};

const Input = ({ value, setValue, handleSend, isTyping, handleStop }: Props) => {
  return (
    <div className="w-4/5 relative mt-2">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (value.trim() === '') return;
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
        {isTyping ? (
          <button onClick={handleStop} className="absolute right-6 top-6 text-gray-600">
            <StopCircle size="32" color="currentColor" />
          </button>
        ) : (
          <button className="absolute right-6 top-6 text-gray-600 hover:text-[#7678ED]">
            <Send2 type="submit" size="32" color="currentColor" />
          </button>
        )}
      </form>
    </div>
  );
};
export default Input;
