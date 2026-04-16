import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';


const ChatBot = () => {
  const { token, admin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: `Bonjour ${admin?.nom || ''} ! Je suis l'assistant Red Product. Comment puis-je vous aider avec nos hôtels aujourd'hui ?`, isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!token) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chatbot/ask/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
      } else {
        // Affiche l'erreur réelle renvoyée 
        const errorMsg = data.error || "Erreur technique.";
        setMessages(prev => [...prev, { text: `Erreur : ${errorMsg}`, isBot: true }]);
      }
    } catch (error) {
      console.error("Erreur Chatbot:", error);
      setMessages(prev => [...prev, { text: "Impossible de joindre le serveur. Vérifiez que le backend Django tourne sur le port 8000.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000] font-sans">
      {/* Bouton Toggle */}
      <div 
        className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-400 text-white flex items-center justify-center cursor-pointer shadow-[0_4px_15px_rgba(255,56,92,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </div>

      {/* Fenêtre de Chat */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[70vh] max-h-[600px] bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="p-6 bg-yellow-400 text-white flex items-center gap-4 shadow-md">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-yellow-500 font-bold shadow-sm">
              RP
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Assistant Red Product</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <p className="text-xs text-white/80">En ligne</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-gray-50/50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`max-w-[85%] p-4 text-xs leading-relaxed shadow-sm ${
                  msg.isBot 
                    ? 'self-start bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-100' 
                    : 'self-end bg-yellow-400 text-white rounded-2xl rounded-br-none'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="self-start bg-white text-gray-400 rounded-2xl rounded-bl-none p-4 text-xs italic shadow-sm border border-gray-100 animate-pulse">
                chargement...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          
          <form className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center" onSubmit={handleSend}>
            <input 
              type="text" 
              className="flex-1 bg-gray-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-yellow-400/50 transition-all outline-none"
              placeholder="Posez votre question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                isLoading || !inputValue.trim() 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-yellow-400 text-white shadow-md hover:bg-yellow-500'
              }`}
              disabled={isLoading || !inputValue.trim()}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={isLoading ? '' : 'translate-x-0.5'}>
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
