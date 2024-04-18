import ChatReceiver from './components/chats/ChatReceiver';
import ChatSender from './components/chats/ChatSender';

export default function App() {
  return (
    <div className="w-full max-w-xl mx-auto p-2 md:p-3 ">
      <ChatReceiver />
      <ChatSender />
    </div>
  );
}
