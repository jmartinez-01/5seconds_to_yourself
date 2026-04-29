import React from 'react';
import useAppStore from '../store/useAppStore';

export default function Profile() {
  const { user, setUser } = useAppStore();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <div className="hdr">
        <div className="hd-top">
          <div>
            <div className="ht">Tu Perfil</div>
          </div>
        </div>
      </div>

      <div className="pad">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0 30px' }}>
          <div className="ment-av-wrap ia" style={{ width: '80px', height: '80px', fontSize: '32px' }}>
            <div className="ment-av-ini ia">
              {user?.name ? user.name.substring(0, 1).toUpperCase() : 'U'}
            </div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '600', marginTop: '15px' }}>
            {user?.name || 'Usuario'}
          </div>
          <div style={{ color: 'var(--mut)', marginTop: '5px' }}>
            {user?.email || 'usuario@example.com'}
          </div>
        </div>

        <div className="slbl">
          <span>Ajustes de la Cuenta</span>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', overflow: 'hidden', marginTop: '10px' }}>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Notificaciones</span>
            <span style={{ color: 'var(--tl)' }}>Activadas</span>
          </div>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Suscripción</span>
            <span style={{ color: 'var(--tl)' }}>Prueba (23 días)</span>
          </div>
          <div style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Idioma</span>
            <span>Español</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          style={{ 
            width: '100%', 
            padding: '16px', 
            marginTop: '30px', 
            background: 'rgba(255,59,48,0.1)', 
            color: '#ff3b30', 
            border: 'none', 
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </>
  );
}
