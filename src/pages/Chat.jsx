import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import mentorsData from '../data/mentors.json';

export default function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Default to 'pablo' (IA) if no mentorId is provided
    const mentorId = location.state?.mentorId || 'pablo';
    const selectedMentor = mentorsData.find(m => m.id === mentorId);
    setMentor(selectedMentor);
    
    // Initial welcome message
    if (selectedMentor) {
      setMessages([
        {
          id: 1,
          sender: 'mentor',
          text: `Hola, soy ${selectedMentor.name}. ¿En qué te puedo ayudar hoy?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [location]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate typing delay for mentor response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'mentor',
        text: 'Te entiendo. Tómate un momento para respirar profundo.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  if (!mentor) return <div>Cargando...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
      <div className="chat-hdr">
        <div className="chat-x" onClick={() => navigate(-1)}>←</div>
        <div className={`chat-av-wrap ${mentor.avatarClass}`}>
          <div className={`ai-av-ini ${mentor.avatarClass}`}>
            {mentor.name.substring(0, 1)}
          </div>
        </div>
        <div className="chat-name-wrap">
          <div className="chat-name">{mentor.name}</div>
          <div className="chat-status">
            <span className="chat-dot"></span>
            <span>En línea</span>
          </div>
        </div>
        <div className="chat-x">⋮</div>
      </div>

      <div className="cmsg">
        <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--mut)', margin: '10px 0' }}>
          HOY
        </div>
        
        {messages.map(msg => (
          <div key={msg.id} className={`mrow ${msg.sender === 'user' ? 'self' : ''}`}>
            {msg.sender === 'mentor' && <div className="msndr">{mentor.name}</div>}
            <div className={`msg ${msg.sender === 'user' ? 'um' : 'am'}`}>
              {msg.text}
            </div>
            <div className="msg-time">{msg.time}</div>
          </div>
        ))}
      </div>

      <div className="csug">
        <div className="cp" onClick={() => setInputValue('Siento mucha ansiedad')}>Siento ansiedad</div>
        <div className="cp" onClick={() => setInputValue('No logro concentrarme')}>Falta de concentración</div>
      </div>

      <div className="cinbar">
        <div style={{ color: 'var(--mut)', fontSize: '20px', cursor: 'pointer', padding: '0 4px' }}>+</div>
        <input 
          type="text" 
          className="cinp" 
          placeholder="Escribe tu mensaje..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="csnd" onClick={handleSend}>↑</button>
      </div>
    </div>
  );
}
