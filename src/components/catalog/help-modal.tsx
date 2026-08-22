'use client';

import { useCatalogStore } from '@/lib/catalog-store';

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: '¿Es normal que a veces funcione bien y otras no?',
    a: (
      <>
        Sí, puede pasar. Esta web no ejecuta los juegos originales de forma nativa:
        los <b>recrea</b> dentro de tu navegador mediante mini-juegos inspirados en
        los clásicos. Cada dispositivo, navegador y conexión es un mundo aparte,
        así que la experiencia puede variar. Si algo va raro, recargar la página o
        probar en otro navegador suele ayudar.
      </>
    ),
  },
  {
    q: '¿Necesito instalar algo?',
    a: (
      <>
        No, nada. Todo funciona dentro del navegador: no se instala ni se descarga
        ningún programa en tu equipo. Solo tienes que abrir el juego y jugar.
      </>
    ),
  },
  {
    q: 'La primera vez tarda en cargar, ¿es normal?',
    a: (
      <>
        Sí. La primera vez, el mini-juego puede tardar un instante en inicializar
        el canvas. Una vez cargado, las siguientes veces suele ir más rápido porque
        parte queda guardada en tu navegador.
      </>
    ),
  },
  {
    q: '¿Funciona en móviles y tablets?',
    a: (
      <>
        En principio sí, puedes jugar desde el móvil o la tablet. Pero al ser
        juegos de ordenador de la época (pensados para teclado y ratón), puede dar
        problemas en algunas situaciones: controles más incómodos, menos
        rendimiento o algún fallo puntual. Para la mejor experiencia, lo
        recomendable es jugar en un equipo de sobremesa o portátil con{' '}
        <b>Windows, Mac o Linux</b>.
      </>
    ),
  },
  {
    q: '¿Qué navegador me recomendáis?',
    a: (
      <>
        Para la mejor experiencia, usa <b>Chrome, Edge o Firefox</b> actualizados,
        en ordenador. En iPhone/iPad (Safari) puede dar más problemas, sobre todo
        con el guardado de partidas.
      </>
    ),
  },
  {
    q: '¿Cómo se guarda la partida?',
    a: (
      <>
        Como el original: dentro del propio juego. La web conserva automáticamente
        tus progresos en el navegador para la próxima vez. Aun así, te recomendamos
        hacer una <b>copia de seguridad</b> desde «Gestionar partidas».
      </>
    ),
  },
  {
    q: '¿Es seguro? ¿Hay virus?',
    a: (
      <>
        Sí, es seguro. Todo el contenido está <b>libre de virus</b>. El clon se
        ejecuta en un <b>entorno hermético</b> dentro de tu navegador y{' '}
        <b>nada entra ni sale</b> de tu ordenador. Aquí no se instala nada en tu
        equipo.
      </>
    ),
  },
  {
    q: '¿Esto es un producto oficial? ¿Hay soporte?',
    a: (
      <>
        No. Esta web es un <b>proyecto no oficial</b>, hecho por afición para que
        estos clásicos no caigan en el olvido. <b>No hay soporte oficial</b> ni
        garantía de funcionamiento. La marca y los títulos originales pertenecen a
        Dinamic Multimedia.
      </>
    ),
  },
];

export function HelpModal() {
  const modal = useCatalogStore((s) => s.modal);
  const close = useCatalogStore((s) => s.closeModal);
  if (modal !== 'help') return null;

  return (
    <div
      className="dm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="dm-modal">
        <div className="dm-modal-head">
          <h3>❓ Ayuda · Preguntas frecuentes</h3>
          <button className="dm-modal-x" onClick={close} aria-label="Cerrar">
            ×
          </button>
        </div>
        <div className="dm-modal-body dm-faq">
          {FAQS.map((f, i) => (
            <div key={i}>
              <p className="q">{f.q}</p>
              <p className="a">{f.a}</p>
            </div>
          ))}
          <p className="tip">
            💡 Si buscas una experiencia completa y 100&nbsp;% funcional, lo ideal
            es <b>conseguir un equipo compatible de la época y jugar los
            originales en formato físico</b>. Todavía se encuentran en las típicas
            webs de segunda mano (Wallapop, eBay, todocolección…).
          </p>
          <p className="legal">
            ¿Tienes los derechos de algún juego y quieres que lo retiremos?
            Escríbenos a{' '}
            <a href="mailto:info@dinamicmultimedia.es">
              info@dinamicmultimedia.es
            </a>{' '}
            y lo quitaremos de inmediato. (Esta es una página clon de demostración
            y no aloja los juegos originales.)
          </p>
        </div>
      </div>
    </div>
  );
}
