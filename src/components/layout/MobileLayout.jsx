import { useEffect, useState } from 'react';
import BottomNav from './BottomNav';

export default function MobileLayout({ children }) {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="desktop-bar">
        <div className="d-logo-wrap">
          <img className="d-logo-img" src="/hero.png" alt="5 Seconds to Yourself" />
          <div>
            <div className="d-logo">5 Seconds <span>to Yourself</span></div>
            <div className="d-tag">UN RESPIRO CONTIGO MISMA · CADA DÍA</div>
          </div>
        </div>
        <div className="d-right">
          <button className="lang-btn">🌐 EN</button>
          <div className="trial-badge">
            <span className="trial-dot"></span>
            <span>Prueba gratuita · 23 días</span>
          </div>
        </div>
      </div>

      <div className="phone-wrap">
        <div className="phone">
          <div className="sbar">
            <span>{time}</span>
            <div className="notch"></div>
            <span>●●● Wi-Fi 100%</span>
          </div>

          <div className="screens">
            <div className="sc on">
              {children}
            </div>
          </div>
          
          <BottomNav />
        </div>
      </div>
    </>
  );
}
