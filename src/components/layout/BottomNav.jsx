import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRoute = (path) => location.pathname === path;

  // Do not show bottom nav on onboarding
  if (location.pathname === '/onboarding') return null;

  return (
    <div className="bn">
      <button className={`nb ${isRoute('/') ? 'on' : ''}`} onClick={() => navigate('/')}>
        <div className="ni">🌿</div>
        <span>Hoy</span>
        <div className="nd"></div>
      </button>
      <button className={`nb ${isRoute('/mentors') ? 'on' : ''}`} onClick={() => navigate('/mentors')}>
        <div className="ni">💬</div>
        <span>Mentores</span>
        <div className="nd"></div>
      </button>
      <button className="nb nb-ai" onClick={() => navigate('/chat')}>
        <div className="ni">AI</div>
      </button>
      <button className={`nb ${isRoute('/progress') ? 'on' : ''}`} onClick={() => navigate('/progress')}>
        <div className="ni">📈</div>
        <span>Progreso</span>
        <div className="nd"></div>
      </button>
      <button className={`nb ${isRoute('/profile') ? 'on' : ''}`} onClick={() => navigate('/profile')}>
        <div className="ni">👤</div>
        <span>Perfil</span>
        <div className="nd"></div>
      </button>
    </div>
  );
}
