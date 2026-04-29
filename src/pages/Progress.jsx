import React from 'react';
import useAppStore from '../store/useAppStore';

export default function Progress() {
  const { user } = useAppStore();

  return (
    <>
      <div className="hdr">
        <div className="hd-top">
          <div>
            <div className="ht">Tu Progreso</div>
            <div className="hs">Cada pequeño paso cuenta</div>
          </div>
        </div>
      </div>

      <div className="pad">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div className="stat-card">
            <div className="stat-v">1</div>
            <div className="stat-l">Racha (Días)</div>
          </div>
          <div className="stat-card">
            <div className="stat-v">1</div>
            <div className="stat-l">Sesiones</div>
          </div>
          <div className="stat-card">
            <div className="stat-v">1m</div>
            <div className="stat-l">Minutos Totales</div>
          </div>
          <div className="stat-card">
            <div className="stat-v">Calma</div>
            <div className="stat-l">Emoción Frecuente</div>
          </div>
        </div>

        <div className="slbl">
          <span>Últimas Sesiones</span>
        </div>

        <div className="ment-card" style={{ padding: '15px', marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '15px' }}>Respiro Rápido</div>
              <div style={{ color: 'var(--mut)', fontSize: '13px', marginTop: '4px' }}>Hoy, 12:30 PM</div>
            </div>
            <div className="type-badge real">Completada</div>
          </div>
        </div>
      </div>
    </>
  );
}
