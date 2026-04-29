import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, setUser, onboardingData, setOnboardingData } = useAppStore();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finish onboarding
      setUser({
        id: 'user-1',
        name: onboardingData.name || 'Invitado',
        email: 'user@example.com'
      });
      navigate('/');
    }
  };

  const handleGoalToggle = (goal) => {
    const goals = onboardingData.goals.includes(goal)
      ? onboardingData.goals.filter(g => g !== goal)
      : [...onboardingData.goals, goal];
    setOnboardingData({ goals });
  };

  return (
    <div className="onb">
      <div className="onb-prog">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`onb-prog-d ${step >= i ? 'on' : ''}`}></div>
        ))}
      </div>

      {step === 0 && (
        <div className="onb-step on">
          <div className="onb-logo-wrap" style={{ marginTop: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌿</div>
            <div className="d-logo" style={{ fontSize: '28px' }}>5 Seconds <span>to Yourself</span></div>
            <div className="d-tag">UN RESPIRO CONTIGO MISMA · CADA DÍA</div>
          </div>
          <h1 className="onb-t">Bienvenida a tu espacio seguro</h1>
          <p className="onb-p">Un refugio diseñado para reconectar contigo misma a través de la IA y mentores humanos reales.</p>
        </div>
      )}

      {step === 1 && (
        <div className="onb-step on">
          <h1 className="onb-t">¿Cómo te llamas?</h1>
          <p className="onb-p">Queremos que esta experiencia sea personal para ti.</p>
          <input 
            type="text" 
            className="onb-inp" 
            placeholder="Tu nombre o apodo" 
            value={onboardingData.name}
            onChange={(e) => setOnboardingData({ name: e.target.value })}
            style={{ width: '100%', padding: '16px', background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '16px', marginTop: '30px' }}
          />
        </div>
      )}

      {step === 2 && (
        <div className="onb-step on">
          <h1 className="onb-t">¿Qué buscas hoy?</h1>
          <p className="onb-p">Puedes elegir varias opciones.</p>
          <div className="onb-opts" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Reducir estrés', 'Mejorar concentración', 'Hablar con alguien', 'Dormir mejor'].map(goal => (
              <div 
                key={goal} 
                className={`onb-opt ${onboardingData.goals.includes(goal) ? 'on' : ''}`}
                onClick={() => handleGoalToggle(goal)}
                style={{ 
                  padding: '16px', 
                  background: onboardingData.goals.includes(goal) ? 'var(--tl)' : 'var(--bg2)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '12px', 
                  color: '#fff', 
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: '0.3s'
                }}
              >
                {goal}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="onb-step on">
          <h1 className="onb-t">Todo listo para ti</h1>
          <p className="onb-p">Hemos adaptado tus mentores y sesiones a tus necesidades. Empieza cuando quieras.</p>
          <div style={{ fontSize: '64px', textAlign: 'center', marginTop: '40px' }}>✨</div>
        </div>
      )}

      <button className="onb-btn" onClick={handleNext}>
        {step === 3 ? 'Comenzar' : 'Siguiente'}
      </button>
    </div>
  );
}
