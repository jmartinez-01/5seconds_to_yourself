import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import { supabase } from '../lib/supabase';

export default function Onboarding() {
  const navigate = useNavigate();
  const { onboardingData, setOnboardingData } = useAppStore();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setError(null);
      // Finish onboarding with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: onboardingData.name || 'Sara',
          }
        }
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Create initial session score in background
        if (onboardingData.mood) {
          const moodScores = { low: 1, foggy: 2, ok: 3, good: 4, great: 5 };
          supabase.from('sessions').insert({
            user_id: data.user.id,
            duration: 0,
            mood_score: moodScores[onboardingData.mood] || null
          }).then();
        }
        navigate('/');
      }
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      setError(null);
    }
  };

  const handleGoalToggle = (goal) => {
    const goals = onboardingData.goals.includes(goal)
      ? onboardingData.goals.filter(g => g !== goal)
      : [...onboardingData.goals, goal];
    setOnboardingData({ goals });
  };

  const handleMoodSelect = (mood) => {
    setOnboardingData({ mood });
  };

  return (
    <div className="onb">
      {/* Progreso del onboarding */}
      <div className="onb-prog">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className={`onb-prog-d ${step >= i ? 'on' : ''}`} data-step={i}></div>
        ))}
      </div>

      {/* STEP 0: intro */}
      {step === 0 && (
        <div className="onb-step on" data-step="0">
          <div className="onb-logo-wrap">
            <div style={{ fontSize: '64px', marginBottom: '14px', filter: 'drop-shadow(0 8px 24px rgba(58,125,107,.25))' }}>🌿</div>
            <div className="onb-t">5 Seconds to Yourself</div>
            <div className="onb-s">Una app para acompañarte a vivir tu vida. Con mentores reales. Apoyados por IA.</div>
          </div>
          <div className="onb-body">
            <div className="onb-disclaim">No somos terapia ni médicos. Somos presencia. Un respiro al día, una mentoría cuando la necesites, y una comunidad de mujeres reales.</div>
          </div>
          <div className="onb-ctas">
            <button className="onb-btn prim" onClick={handleNext}>Empezar</button>
          </div>
        </div>
      )}

      {/* STEP 1: nombre */}
      {step === 1 && (
        <div className="onb-step on" data-step="1">
          <div className="onb-body">
            <div className="onb-q">¿Cómo te llamamos?</div>
            <div className="onb-sub">Tu nombre aparece en los mensajes de cada día.</div>
            <input 
              className="onb-inp" 
              type="text" 
              placeholder="Tu nombre" 
              value={onboardingData.name || ''}
              onChange={(e) => setOnboardingData({ name: e.target.value })}
            />
          </div>
          <div className="onb-ctas">
            <button className="onb-btn sec" onClick={handlePrev}>←</button>
            <button className="onb-btn prim" onClick={handleNext}>Continuar</button>
          </div>
        </div>
      )}

      {/* STEP 2: qué te trae */}
      {step === 2 && (
        <div className="onb-step on" data-step="2">
          <div className="onb-body">
            <div className="onb-q">¿Qué te trae aquí?</div>
            <div className="onb-sub">Marca lo que resuene. Puede cambiar.</div>
            <div className="onb-chips">
              {[
                { id: 'calm', label: 'Necesito calma' },
                { id: 'self', label: 'Recuperar mi autoestima' },
                { id: 'love', label: 'Algo con mi relación' },
                { id: 'body', label: 'Cuidar mi cuerpo' },
                { id: 'food', label: 'Mejorar cómo como' },
                { id: 'safe', label: 'Sentirme más segura' },
                { id: 'restart', label: 'Empezar de nuevo' },
                { id: 'drive', label: 'Recuperar ganas' },
                { id: 'loneliness', label: 'Me siento sola' }
              ].map(chip => (
                <div 
                  key={chip.id} 
                  className={`onb-chip ${onboardingData.goals.includes(chip.id) ? 'on' : ''}`} 
                  onClick={() => handleGoalToggle(chip.id)}
                >
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
          <div className="onb-ctas">
            <button className="onb-btn sec" onClick={handlePrev}>←</button>
            <button className="onb-btn prim" onClick={handleNext}>Continuar</button>
          </div>
        </div>
      )}

      {/* STEP 3: cómo estás */}
      {step === 3 && (
        <div className="onb-step on" data-step="3">
          <div className="onb-body">
            <div className="onb-q">¿Cómo estás esta semana?</div>
            <div className="onb-sub">No hay respuestas malas. Solo verdad.</div>
            <div className="onb-moods">
              {[
                { id: 'low', emoji: '🌧️', label: 'Bajón' },
                { id: 'foggy', emoji: '🌫️', label: 'Confusa' },
                { id: 'ok', emoji: '🌿', label: 'Va' },
                { id: 'good', emoji: '💛', label: 'Bien' },
                { id: 'great', emoji: '✨', label: 'Genial' }
              ].map(mood => (
                <div 
                  key={mood.id} 
                  className={`onb-mood ${onboardingData.mood === mood.id ? 'on' : ''}`} 
                  onClick={() => handleMoodSelect(mood.id)}
                >
                  <div className="onb-mood-e">{mood.emoji}</div>
                  <div className="onb-mood-l">{mood.label}</div>
                </div>
              ))}
            </div>
            <div className="onb-disclaim">Esto nos ayuda a elegir qué mentora te saluda primero. No lo verá nadie más.</div>
          </div>
          <div className="onb-ctas">
            <button className="onb-btn sec" onClick={handlePrev}>←</button>
            <button className="onb-btn prim" onClick={handleNext}>Continuar</button>
          </div>
        </div>
      )}

      {/* STEP 4: Registro */}
      {step === 4 && (
        <div className="onb-step on" data-step="4">
          <div className="onb-body">
            <div className="onb-q">Último paso</div>
            <div className="onb-sub">Crea tu cuenta para guardar tu progreso de forma segura.</div>
            {error && <div style={{ color: 'var(--mar)', marginBottom: '12px', fontSize: '13px', fontWeight: 'bold' }}>{error}</div>}
            <input 
              className="onb-inp" 
              type="email" 
              placeholder="Tu correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              className="onb-inp" 
              type="password" 
              placeholder="Crea una contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="onb-ctas">
            <button className="onb-btn sec" onClick={handlePrev} disabled={loading}>←</button>
            <button className="onb-btn prim" onClick={handleNext} disabled={loading}>
              {loading ? 'Cargando...' : 'Entrar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
