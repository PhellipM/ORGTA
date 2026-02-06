import Header from '../components/Header';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOnlineUsers, useChat } from '../hooks/useSocket';
import { emitMessage, connectSocket } from '../services/socket';
import { Send, Users } from 'lucide-react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { pt } from 'date-fns/locale';

export default function Chat() {
  const { user } = useAuth();
  const onlineUsers = useOnlineUsers();
  const { messages, setMessages } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      connectSocket(user);
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setIsSending(true);
    try {
      const messageData = {
        sender: user,
        content: newMessage,
        timestamp: new Date(),
      };

      emitMessage(messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Sidebar - Online Users */}
        <aside className="hidden lg:block w-64">
          <div className="glass rounded-lg p-6 sticky top-24">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Online ({onlineUsers.length})
              </h2>
            </div>

            <div className="space-y-3">
              {onlineUsers.length > 0 ? (
                onlineUsers.map((onlineUser) => (
                  <div key={onlineUser._id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="relative">
                      <img
                        src={onlineUser.picture}
                        alt={onlineUser.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {onlineUser.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {onlineUser.department}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">Ninguém online</p>
              )}
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-h-screen max-w-4xl">
          {/* Chat Header */}
          <div className="glass rounded-t-lg p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Bate-papo ao Vivo
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Converse com sua equipe em tempo real
            </p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 glass overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-800">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender._id === user?._id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex space-x-3 max-w-xs ${
                      message.sender._id === user?._id ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <img
                      src={message.sender.picture}
                      alt={message.sender.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.sender._id === user?._id
                            ? 'bg-sky-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="font-medium text-sm">
                          {message.sender._id !== user?._id && message.sender.name}
                        </p>
                        <p className="text-sm break-words">{message.content}</p>
                      </div>
                      <p
                        className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                          message.sender._id === user?._id ? 'text-right' : ''
                        }`}
                      >
                        {formatDistanceToNow(new Date(message.timestamp), {
                          addSuffix: true,
                          locale: pt,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Nenhuma mensagem ainda. Comece uma conversa!
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form
            onSubmit={handleSendMessage}
            className="glass rounded-b-lg p-4 border-t border-gray-200 dark:border-gray-700 flex space-x-4"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite uma mensagem..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={isSending || !newMessage.trim()}
              className="bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
