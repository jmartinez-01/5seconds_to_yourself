import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SessionPlayer() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('inhala');
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute session
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setPhase('completado');
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    let phaseInterval;
    if (isPlaying) {
      phaseInterval = setInterval(() => {
        setPhase(prev => {
          if (prev === 'inhala') return 'exhala';
          if (prev === 'exhala') return 'inhala';
          return 'inhala';
        });
      }, 3000); // 3 seconds inhale, 3 seconds exhale
    }
    return () => clearInterval(phaseInterval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="session" style={{ height: '100%', flex: 1 }}>
      <div className="session-hdr">
        <div className="session-close" onClick={() => navigate(-1)}>✕</div>
        <div className="session-who">
          <div className="session-av" style={{ background: 'var(--tl)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
            5
          </div>
          <div className="session-nm">5 Seconds</div>
        </div>
        <div style={{ width: '34px' }}></div> {/* spacer for centering */}
      </div>

      <div className="session-prog">
        <div className="session-fil" style={{ width: `${((60 - timeLeft) / 60) * 100}%` }}></div>
      </div>

      <div className="session-circle-wrap">
        <div className="breath" onClick={togglePlay} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
          <div className="breath-n">{formatTime(timeLeft)}</div>
          <div className="breath-msg">
            {timeLeft === 0 ? 'Sesión completada.' : isPlaying ? (phase === 'inhala' ? 'Inhala profundamente...' : 'Exhala lentamente...') : 'Toca para iniciar'}
          </div>
        </div>
      </div>

      <div className="session-feat">
        <span>Respiración Guiada</span>
        <span className="session-dot"></span>
        <span>1 Minuto</span>
      </div>

      <div className="session-ctas">
        <button className="session-btn nav" onClick={() => setTimeLeft(prev => Math.max(0, prev - 15))}>-15s</button>
        <button className="session-btn play" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="session-btn nav" onClick={() => setTimeLeft(prev => prev + 15)}>+15s</button>
      </div>
      
      <div className="session-end-hint">
        Tómate este tiempo solo para ti.
      </div>
    </div>
  );
}
