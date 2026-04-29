import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import mentorsData from '../data/mentors.json';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAppStore();

  const handleAiCardClick = (id) => {
    navigate('/chat', { state: { mentorId: id } });
  };

  return (
    <>
      <div className="welc">
        <div className="hd-top">
          <div>
            <div className="hl">Hola{user?.name ? `, ${user.name}` : ''}</div>
            <div className="ht">Hoy es tu día 1</div>
          </div>
          <div className="trial-badge" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
            <span className="trial-dot"></span>
            <span>23 d</span>
          </div>
        </div>
        <div className="welc-msg">El primer paso para llegar a cualquier parte es decidir que no vas a quedarte donde estás.</div>
        <div className="welc-sign">- 5 Seconds</div>
      </div>

      <div className="pad">
        <div className="slbl">
          <span>Tus Mentores Destacados</span>
          <span className="more" onClick={() => navigate('/mentors')}>Ver todos</span>
        </div>
        
        <div className="ai-trio">
          {mentorsData.slice(0, 3).map(mentor => (
            <div key={mentor.id} className="ai-card" onClick={() => handleAiCardClick(mentor.id)}>
              <div className={`ai-av-wrap ${mentor.avatarClass}`}>
                <div className={`ai-av-ini ${mentor.avatarClass}`}>
                  {mentor.name.substring(0, 1)}
                </div>
              </div>
              <div className={`type-badge ${mentor.type}`}>
                {mentor.type === 'real' ? 'Humano' : mentor.type === 'ia' ? 'AI' : 'Hybrid'}
              </div>
              <div className="ai-name" style={{ marginTop: '12px' }}>{mentor.name}</div>
            </div>
          ))}
        </div>

        <div className="slbl" style={{ marginTop: '20px' }}>
          <span>Tu Respiro de Hoy</span>
        </div>

        <div className="five-cta" onClick={() => navigate('/session')}>
          <div className="five-ico">🌿</div>
          <div className="five-txt">
            <div className="five-k">Sesión Guiada</div>
            <div className="five-h">5 Segundos para ti</div>
            <div className="five-s">Reconecta con tu respiración</div>
          </div>
          <div className="five-arrow">→</div>
        </div>

        <div className="mini-prog" onClick={() => navigate('/progress')}>
          <div className="mini-ring">
            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(58,125,107,0.2)" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3A7D6B" strokeWidth="3" strokeDasharray="14, 100" />
            </svg>
            <div className="mini-num">1</div>
          </div>
          <div className="mini-t">
            <div className="mini-t">Racha Actual</div>
            <div className="mini-s">1 día consecutivo. ¡Sigue así!</div>
          </div>
        </div>

      </div>
    </>
  );
}
