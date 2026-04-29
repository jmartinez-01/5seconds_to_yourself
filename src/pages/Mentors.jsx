import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mentorsData from '../data/mentors.json';

export default function Mentors() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const handleMentorClick = (id) => {
    navigate('/chat', { state: { mentorId: id } });
  };

  const filteredMentors = mentorsData.filter(mentor => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ia') return mentor.type === 'ia' || mentor.type === 'hybrid';
    if (activeTab === 'real') return mentor.type === 'real' || mentor.type === 'hybrid';
    return true;
  });

  return (
    <>
      <div className="hdr">
        <div className="hd-top">
          <div>
            <div className="ht">Mentores</div>
            <div className="hs">Encuentra a tu guía ideal</div>
          </div>
        </div>
      </div>

      <div className="ment-tabs">
        <div className={`ment-tab ${activeTab === 'all' ? 'on' : ''}`} onClick={() => setActiveTab('all')}>Todos</div>
        <div className={`ment-tab ${activeTab === 'ia' ? 'on' : ''}`} onClick={() => setActiveTab('ia')}>Solo IA</div>
        <div className={`ment-tab ${activeTab === 'real' ? 'on' : ''}`} onClick={() => setActiveTab('real')}>Humanos</div>
      </div>

      <div className="pad" style={{ paddingTop: '8px' }}>
        {filteredMentors.map(mentor => (
          <div key={mentor.id} className="ment-card" onClick={() => handleMentorClick(mentor.id)}>
            <div className={`ment-av-wrap ${mentor.avatarClass}`}>
              <div className={`ment-av-ini ${mentor.avatarClass}`}>
                {mentor.name.substring(0, 1)}
              </div>
            </div>
            <div className="ment-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="ment-name">{mentor.name}</div>
                  <div className="ment-tag">{mentor.role}</div>
                </div>
                <div className={`type-badge ${mentor.type}`}>
                  {mentor.type === 'real' ? 'HUMANO' : mentor.type === 'ia' ? 'IA' : 'HÍBRIDO'}
                </div>
              </div>
              <div className="ment-desc">{mentor.description}</div>
              <div className="ment-feat">
                {mentor.tags.map((tag, index) => (
                  <div key={index} className={`ment-pill ${mentor.avatarClass}`}>{tag}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
