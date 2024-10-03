import './App.css';
import Chat from './components/Chat';
import Input from './components/Input';

function App() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#DBDCFF] h-screen">
      <Chat />
      <Input />
    </div>
  );
}

export default App;
