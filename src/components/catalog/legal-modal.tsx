'use client';

import { useCatalogStore } from '@/lib/catalog-store';

export function LegalModal() {
  const modal = useCatalogStore((s) => s.modal);
  const close = useCatalogStore((s) => s.closeModal);
  if (modal !== 'legal') return null;

  return (
    <div
      className="dm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="dm-modal">
        <div className="dm-modal-head">
          <h3>⚖ Condiciones de uso</h3>
          <button className="dm-modal-x" onClick={close} aria-label="Cerrar">
            ×
          </button>
        </div>
        <div className="dm-modal-body">
          <h4 style={{ marginTop: 0, fontSize: 16, color: '#1c2330' }}>
            Declaración de carácter no lucrativo y condiciones de uso
          </h4>
          <p>
            Este sitio es un <strong>clon no oficial</strong> que rinde homenaje a
            online.dinamicmultimedia.es con finalidad exclusivamente cultural,
            histórica y de entretenimiento, sin ánimo de lucro. Su objetivo es
            facilitar el acceso y la difusión de títulos que forman parte de la
            historia del videojuego en España.
          </p>
          <p>
            La marca <em>Dinamic Multimedia</em> y los títulos originales (PC
            Fútbol, PC Basket, Premier Manager, Igor, etc.) pertenecen a sus
            respectivos titulares. Esta página es un proyecto de demostración
            técnica y no aloja los juegos originales: los mini-juegos son
            recreaciones HTML5 originales inspiradas en el espíritu de los
            clásicos.
          </p>
          <h4 style={{ fontSize: 16, color: '#1c2330', marginTop: 20 }}>
            Limitación de responsabilidad
          </h4>
          <p>
            Todo el contenido y funcionalidades ofrecidos en este clon se
            proporcionan «tal cual» («as is»), sin garantías de ningún tipo,
            expresas o implícitas.
          </p>
          <p>
            La plataforma se encuentra en constante evolución. Aunque se realizan
            esfuerzos para mejorar su estabilidad, rendimiento y compatibilidad,
            no se garantiza el correcto funcionamiento de todos los mini-juegos en
            todos los navegadores y dispositivos.
          </p>
          <h4 style={{ fontSize: 16, color: '#1c2330', marginTop: 20 }}>
            Sobre las recreaciones
          </h4>
          <p>
            Los mini-juegos disponibles en esta plataforma son recreaciones HTML5
            originales que se inspiran en el espíritu de los clásicos. No son los
            juegos originales, no contienen sus assets (gráficos, sonidos o
            música) y no intentan reproducirlos fielmente.
          </p>
          <h4 style={{ fontSize: 16, color: '#1c2330', marginTop: 20 }}>
            Aceptación de las condiciones
          </h4>
          <p>
            El acceso y utilización de este clon implica la aceptación expresa de
            las presentes condiciones de uso. Si tienes los derechos de algún
            título y quieres que retiremos cualquier referencia, escríbenos y lo
            retiraremos de inmediato.
          </p>
          <div
            style={{
              marginTop: 18,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={close}
              style={{
                background: 'var(--dm-accent)',
                color: '#fff',
                border: 'none',
                padding: '11px 28px',
                borderRadius: 10,
                fontWeight: 800,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: '0 4px 12px #1f8a4c44',
              }}
            >
              ACEPTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
