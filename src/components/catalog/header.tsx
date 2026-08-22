'use client';

export function Header() {
  return (
    <header className="dm-header">
      <div className="logo-box">
        {/* Logo clonado: tipografía blanca sobre banda verde, sustituyendo al SVG remoto */}
        <div
          className="logo-img"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: '14px 22px',
            background: 'linear-gradient(135deg,#0a3d62,#3c096c)',
            borderRadius: 18,
            boxShadow: '0 10px 30px #00000022',
            color: '#fff',
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: 1 }}>
            DINAMIC
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 4, color: '#7fffb4' }}>
            MULTIMEDIA
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#cdd3df', marginTop: 4 }}>
            ONLINE · CLON RETRO
          </span>
        </div>
      </div>
      <p>Juega a los clásicos de Dinamic Multimedia directamente en tu navegador</p>
    </header>
  );
}
