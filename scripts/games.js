// Registro de juegos. Añadir un juego = una entrada aquí + sus imágenes/snapshot.
const GAMES = {
  pm99: {
    name: "Premier Manager 99",
    year: "1999",
    publisher: "Dinamic Multimedia",
    color: "#1b2a6b",
    logo: "/assets/pm99-logo.png?v=1",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pm99.bin",      size: 523837440 },
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pm99_data.bin", size: 644244992 },
    cdrom: { url: "https://discos.dinamicmultimedia.es/PM99.bin",            size: 617578496 },
    state: { url: "/pm99_state.bin" },
    gameDir: "PM99",
    saveWholeDir: true,
    desc: `
<p>Premier Manager 99 is one of the most complete entries in the classic football management series developed by Dinamic Multimedia for the international market. Building on the foundations of previous releases, the game delivers a deeper and more immersive management experience, featuring updated squads, improved match simulation and expanded tactical and financial options.</p>
<p>As manager, coach and club chairman, you are responsible for every aspect of your team's success. Sign new players, develop winning tactics, manage the club's finances and lead your squad through an entire season in pursuit of domestic and European glory.</p>
<h3>Main Features</h3>
<ul>
<li>Complete football club management.</li>
<li>Based on the enhanced PC Fútbol 7.0 engine.</li>
<li>Updated database with clubs and players from the 1998/99 season.</li>
<li>Real-time match simulation.</li>
<li>Dynamic transfer market with contract negotiations.</li>
<li>Full control over tactics, formations and training.</li>
<li>Advanced financial and budget management.</li>
<li>Detailed player, team and competition statistics.</li>
<li>League, domestic cup and European competitions.</li>
<li>Intuitive interface designed for quick and efficient management.</li>
</ul>
<h3>What's New</h3>
<ul>
<li>Updated squads and player database.</li>
<li>Improved match engine with more realistic gameplay.</li>
<li>Smarter artificial intelligence.</li>
<li>Expanded tactical options and team instructions.</li>
<li>Enhanced transfer market and contract management.</li>
<li>More comprehensive financial management.</li>
<li>Improved statistics and player information.</li>
<li>Better performance and overall stability.</li>
</ul>
<h3>Game Modes</h3>
<p><strong>Total Manager.</strong> Take complete control of every aspect of your club, from transfers and finances to youth development and long-term planning.</p>
<p><strong>Coach.</strong> Choose your tactics, prepare your squad and make the key decisions that will lead your team to victory.</p>
<p><strong>Club Chairman.</strong> Oversee the club's financial health, approve investments and build a sustainable future for your organisation.</p>
<p><strong>Match Simulation.</strong> Experience every match through the series' classic real-time simulator, where tactical decisions and player performances determine the outcome.</p>
<h3>The Challenge of English Football</h3>
<p>Premier Manager 99 captures the intensity and competitiveness of English football, giving players the opportunity to manage top clubs and guide them through demanding league campaigns, domestic cup competitions and European tournaments.</p>
<h3>A Memorable Football Management Classic</h3>
<p>Premier Manager 99 represents the culmination of years of refinement within the series, combining accessible gameplay with impressive strategic depth. For many football management fans, it remains one of the standout titles of the late 1990s and an important chapter in Dinamic Multimedia's international football management legacy.</p>
`,
  },
  pm98: {
    name: "Premier Manager 98",
    year: "1998",
    publisher: "Dinamic Multimedia",
    color: "#1b2a6b",
    logo: "/assets/pm98-logo.png?v=1",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pm98.bin",      size: 523837440 },
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pm98_data.bin", size: 322122240 },
    cdrom: { url: "https://discos.dinamicmultimedia.es/PM98.bin",            size: 566358016 },
    state: { url: "/pm98_state.bin" },
    gameDir: "PM98",
    saveWholeDir: true,
    desc: `
<p>Premier Manager 98 is the next evolution of the popular football management series, offering a deeper and more realistic experience for fans of the beautiful game. Developed by Dinamic Multimedia for the international market, the game builds upon the successful foundations of its predecessor, introducing updated squads, enhanced management features and an improved match simulation engine.</p>
<p>Take control of your favourite club as manager, coach and chairman, making every important decision both on and off the pitch. From signing players and developing tactics to balancing the club's finances, every choice will shape your team's future.</p>
<h3>Main Features</h3>
<ul>
<li>Complete football club management.</li>
<li>Based on the enhanced PC Fútbol 6.0 engine.</li>
<li>Updated database with clubs and players from the 1997/98 season.</li>
<li>Real-time match simulation.</li>
<li>Dynamic transfer market and contract negotiations.</li>
<li>Full tactical control with advanced formations and strategies.</li>
<li>Financial and budget management.</li>
<li>Detailed player, club and competition statistics.</li>
<li>League, domestic cup and European competitions.</li>
<li>Easy-to-use interface with comprehensive management tools.</li>
</ul>
<h3>What's New</h3>
<ul>
<li>Updated squads and player database.</li>
<li>Improved match simulation with enhanced realism.</li>
<li>Smarter artificial intelligence.</li>
<li>More advanced transfer and contract system.</li>
<li>Expanded tactical options.</li>
<li>Improved financial management.</li>
<li>More detailed statistics and player information.</li>
<li>Better overall performance and stability.</li>
</ul>
<h3>Game Modes</h3>
<p><strong>Total Manager.</strong> Take full control of every aspect of your club, including transfers, finances, training and long-term planning.</p>
<p><strong>Coach.</strong> Prepare your squad for every match by selecting formations, tactics and the starting eleven.</p>
<p><strong>Club Chairman.</strong> Manage the club's finances, approve investments and make strategic decisions to ensure future success.</p>
<p><strong>Match Simulation.</strong> Watch every game unfold through the classic real-time match simulator, where your tactical decisions can make the difference between victory and defeat.</p>
<h3>The Ultimate English Football Challenge</h3>
<p>Premier Manager 98 delivers an authentic football management experience inspired by the excitement of English football. Build a competitive squad, develop your own tactical style and fight for league titles, domestic cups and European glory.</p>
<h3>A Football Management Classic</h3>
<p>Premier Manager 98 refined the successful formula established by earlier entries in the series, offering greater depth and realism while remaining accessible to newcomers. Its combination of strategy, club management and match simulation has earned it a lasting place among the memorable football management games of the late 1990s.</p>
`,
  },
  pm97: {
    name: "Premier Manager 97",
    year: "1997",
    publisher: "Dinamic Multimedia",
    color: "#1b2a6b",
    logo: "/assets/pm97-logo.png?v=2",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pm97.bin",      size: 523837440 },
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pm97_data.bin", size: 322122240 },
    cdrom: { url: "https://discos.dinamicmultimedia.es/PM97.bin",            size: 433385472 },
    state: { url: "/pm97_state.bin" },
    gameDir: "PM97",
    saveWholeDir: true,
    desc: `
<p>Premier Manager 97 is a football management simulation that puts you in charge of every aspect of running a professional football club. Developed by Dinamic Multimedia for the international market, the game combines tactical decision-making, financial management and squad building, allowing players to experience the challenges of leading a team throughout an entire season.</p>
<p>As manager, coach and club director, you are responsible for signing new players, selecting line-ups, planning training sessions, managing the club's finances and guiding your team to success in domestic and international competitions.</p>
<h3>Main Features</h3>
<ul>
<li>Complete football club management.</li>
<li>Based on the successful PC Fútbol management engine.</li>
<li>Updated database featuring clubs and players of the season.</li>
<li>Real-time match simulation.</li>
<li>Detailed transfer market and contract negotiations.</li>
<li>Full control over tactics, formations and training.</li>
<li>Financial and budget management.</li>
<li>Comprehensive player and competition statistics.</li>
<li>Participation in league, cup and European competitions.</li>
<li>User-friendly interface with extensive management options.</li>
</ul>
<h3>What's New</h3>
<ul>
<li>Updated squads and player database.</li>
<li>Improved match simulation engine.</li>
<li>More realistic transfer and negotiation system.</li>
<li>Enhanced tactical options.</li>
<li>Expanded financial management.</li>
<li>Improved artificial intelligence.</li>
<li>More detailed player statistics.</li>
<li>Performance and stability improvements.</li>
</ul>
<h3>Game Modes</h3>
<p><strong>Total Manager.</strong> Take complete control of every area of the club, from transfers and finances to long-term planning.</p>
<p><strong>Coach.</strong> Prepare your team for every match by choosing formations, tactics and starting line-ups.</p>
<p><strong>Club Chairman.</strong> Manage the club's budget, make strategic investments and ensure long-term financial stability.</p>
<p><strong>Match Simulation.</strong> Watch matches unfold through the classic real-time simulator, where every tactical decision can influence the outcome.</p>
<h3>Experience English Football</h3>
<p>Premier Manager 97 captures the excitement and competitiveness of English football, allowing players to build a winning squad and compete for the biggest domestic and European honours. Every decision, both on and off the pitch, plays a crucial role in the club's success.</p>
<h3>A Classic Football Management Game</h3>
<p>With its balance of accessibility and depth, Premier Manager 97 became one of the standout football management titles of its era. Its engaging gameplay, strategic depth and comprehensive club management continue to make it a memorable classic for fans of football management games.</p>
`,
  },
  pccalcio6es: {
    name: "PC Calcio 6.0 (Versión Española)",
    year: "1998",
    publisher: "Dinamic Multimedia",
    color: "#c9a227",
    logo: "/assets/pccalcio6-logo.png?v=2",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pccalcio6es.bin",      size: 523837440 },   // Win98 motor PCF6 (CALCIO6.EXE -> MANAGER.EXE)
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pccalcio6es_data.bin", size: 429496320 },   // slim 0.4GB: D:\CALCIO6
    cdrom: { url: "https://discos.dinamicmultimedia.es/pccalcio6es_cd.bin",         size: 384614400 },   // CD montado runtime (E:)
    state: { url: "/pccalcio6es_state.bin" },                         // PENDIENTE capturar (sin kiosk.bat)
    gameDir: "CALCIO6",           // 8.3 OK, en D:
    saveWholeDir: true,           // persistir TODA la carpeta D:\CALCIO6 (evita bug timing motor PCF6)
    desc: `
<p>PC Calcio 6 supuso un importante salto adelante para la saga de gestión futbolística de Dinamic Multimedia en el mercado italiano. Basado en el exitoso motor de PC Fútbol 6.0, el juego ofrecía una experiencia más completa, profunda y realista, permitiendo a los aficionados al calcio tomar el control absoluto de su club favorito.</p>
<p>Como presidente, entrenador y director deportivo, el jugador debía gestionar todos los aspectos de la entidad: fichajes, tácticas, entrenamientos, contratos, economía y planificación deportiva. El objetivo era construir un proyecto ganador capaz de conquistar los principales títulos nacionales e internacionales.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión completa de clubes del fútbol italiano.</li>
<li>Basado en el motor de juego de PC Fútbol 6.0.</li>
<li>Base de datos actualizada con equipos y jugadores de la temporada.</li>
<li>Simulación de partidos en tiempo real.</li>
<li>Mercado de fichajes más dinámico y realista.</li>
<li>Gestión de contratos, renovaciones y traspasos.</li>
<li>Control total de tácticas, alineaciones y entrenamientos.</li>
<li>Gestión económica y financiera avanzada.</li>
<li>Estadísticas detalladas de jugadores y competiciones.</li>
<li>Participación en ligas, copas nacionales y torneos europeos.</li>
</ul>
<h3>Novedades principales</h3>
<ul>
<li>Simulador de partidos mejorado con mayor realismo.</li>
<li>Base de datos ampliada y actualizada.</li>
<li>Nuevas opciones tácticas para entrenadores.</li>
<li>Gestión financiera más completa.</li>
<li>Mejoras en la inteligencia artificial de los equipos.</li>
<li>Sistema de fichajes más profundo y flexible.</li>
<li>Estadísticas ampliadas y más detalladas.</li>
<li>Interfaz renovada y más intuitiva.</li>
</ul>
<h3>Modos de juego</h3>
<ul>
<li><b>Mánager Total</b> — controla todos los aspectos del club, desde la planificación deportiva hasta la gestión económica.</li>
<li><b>Entrenador</b> — prepara los partidos, define las tácticas y toma decisiones desde el banquillo para llevar a tu equipo a la victoria.</li>
<li><b>Presidente</b> — administra los recursos del club, realiza inversiones y toma decisiones estratégicas para garantizar el crecimiento de la institución.</li>
<li><b>Simulación de Partidos</b> — sigue los encuentros mediante el clásico simulador gráfico de la saga, observando en tiempo real el desarrollo de las jugadas y el rendimiento de los futbolistas.</li>
</ul>
<h3>Vive toda la pasión del calcio</h3>
<p>PC Calcio 6 permitía experimentar la intensidad y la competitividad del fútbol italiano desde una perspectiva única. Cada temporada suponía un desafío en el que la gestión deportiva, la planificación económica y las decisiones tácticas eran fundamentales para alcanzar el éxito.</p>
<h3>Un referente del manager futbolístico</h3>
<p>Considerado por muchos aficionados como uno de los mejores títulos de la serie, PC Calcio 6 consolidó la presencia de Dinamic Multimedia en Italia gracias a una combinación perfecta de estrategia, simulación y gestión deportiva. Su profundidad, accesibilidad y capacidad para enganchar durante horas lo convierten en uno de los clásicos más recordados de la saga internacional PC Calcio.</p>
`,
  },
  pccalcio5es: {
    name: "PC Calcio 5.0 (Versión Española)",
    year: "1997",
    publisher: "Dinamic Multimedia",
    color: "#2e7d32",
    logo: "/assets/pccalcio5-logo.png?v=4",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pccalcio5es.bin",      size: 523837440 },   // Win98 motor PCF5 (FUT5WIN.EXE -> MANAGER.EXE)
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pccalcio5es_data.bin", size: 214748160 },   // slim 0.2GB: D:\CALCIO5
    cdrom: { url: "https://discos.dinamicmultimedia.es/pccalcio5es_cd.bin",         size: 441139200 },   // CD montado runtime (E:)
    state: { url: "/pccalcio5es_state.bin" },                         // PENDIENTE capturar (sin kiosk.bat)
    gameDir: "CALCIO5",           // 8.3 OK, en D:
    saveWholeDir: true,           // persistir TODA la carpeta D:\CALCIO5
    desc: `
<p>PC Calcio 5.0 fue la evolución de la exitosa saga de gestión futbolística de Dinamic Multimedia para el mercado italiano. Basado en el motor de PC Fútbol 5.0, el juego permitía a los aficionados al calcio asumir el control total de un club y gestionar todos los aspectos relacionados con su crecimiento deportivo y económico.</p>
<p>El jugador podía ejercer como presidente, entrenador y director deportivo, tomando decisiones sobre fichajes, alineaciones, tácticas, entrenamientos y finanzas. Gracias a una base de datos actualizada y a un simulador mejorado, PC Calcio 5.0 ofrecía una experiencia más completa y realista que sus predecesores.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión completa de clubes del fútbol italiano.</li>
<li>Basado en el motor de juego de PC Fútbol 5.0.</li>
<li>Base de datos actualizada con equipos y jugadores de la época.</li>
<li>Simulación de partidos en tiempo real.</li>
<li>Mercado de fichajes y traspasos.</li>
<li>Gestión de contratos y renovaciones.</li>
<li>Control total de tácticas, alineaciones y entrenamientos.</li>
<li>Gestión económica y financiera del club.</li>
<li>Estadísticas detalladas de jugadores y competiciones.</li>
<li>Participación en ligas y copas nacionales e internacionales.</li>
</ul>
<h3>Novedades principales</h3>
<ul>
<li>Plantillas actualizadas para la nueva temporada.</li>
<li>Mejoras en el simulador de partidos.</li>
<li>Sistema de fichajes más completo y dinámico.</li>
<li>Nuevas opciones tácticas para los entrenadores.</li>
<li>Estadísticas ampliadas y mejor organizadas.</li>
<li>Mayor profundidad en la gestión económica.</li>
<li>Interfaz más intuitiva y accesible.</li>
<li>Rendimiento optimizado respecto a versiones anteriores.</li>
</ul>
<h3>Modos de juego</h3>
<ul>
<li><b>Mánager Total</b> — controla todos los aspectos del club, desde la confección de la plantilla hasta la gestión financiera.</li>
<li><b>Entrenador</b> — diseña las tácticas, prepara los encuentros y dirige al equipo durante toda la temporada.</li>
<li><b>Presidente</b> — administra el presupuesto, realiza inversiones y toma decisiones estratégicas para el futuro de la entidad.</li>
<li><b>Simulación de Partidos</b> — sigue los encuentros mediante el clásico simulador gráfico de la saga y observa cómo tus decisiones afectan al desarrollo del juego.</li>
</ul>
<h3>La pasión del calcio</h3>
<p>PC Calcio 5.0 permitía vivir toda la emoción del fútbol italiano desde una perspectiva única. Cada decisión podía marcar la diferencia entre luchar por el título o quedarse fuera de los objetivos marcados al inicio de la temporada.</p>
<h3>Un referente entre los managers futbolísticos</h3>
<p>Gracias a su equilibrio entre profundidad y facilidad de uso, PC Calcio 5.0 se convirtió en una de las adaptaciones internacionales más exitosas de la saga. Su combinación de estrategia, gestión y simulación deportiva ofrecía cientos de horas de juego a los aficionados al calcio y consolidó el nombre de Dinamic Multimedia en el mercado italiano.</p>
`,
  },
  pccalcio4es: {
    name: "PC Calcio 4.0 (Edición Española)",
    year: "1996",
    publisher: "Dinamic Multimedia",
    color: "#c60b1e",
    logo: "/assets/pccalcio-logo.png?v=2",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/calcio4es_boot.bin", size: 523837440 },   // MS-DOS DOS/4GW, juego en C:\CALCIO4 (motor PC Fútbol 4.0)
    cdrom: { url: "https://discos.dinamicmultimedia.es/calcio4es_cd.bin",   size: 41299968 },    // CD en D: en runtime (instalado con CD en D:, MSCDEX /L:D)
    state: { url: "/pccalcio4es_state.bin" },                 // PENDIENTE capturar (sin kiosk.bat)
    gameDir: "CALCIO4",          // 8.3 OK, en C: (lanzador CALCIO4.EXE, DOS4GW)
    saveDisk: "hda",             // juego y partidas en C: (hda)
    fat: "fat16",                // C: es FAT16
    saveWholeDir: true,          // persistir toda la carpeta CALCIO4
    dosKiosk: true,              // al salir vuelve al prompt DOS -> recargar snapshot
    desc: `
<p>PC Calcio 4 fue una de las primeras adaptaciones internacionales de la legendaria saga PC Fútbol desarrollada por Dinamic Multimedia. Dirigido al mercado italiano, el juego permitía a los aficionados vivir la experiencia completa de gestionar un club de fútbol profesional, combinando estrategia, gestión económica y dirección deportiva en un único título.</p>
<p>El jugador podía asumir los papeles de presidente, entrenador y director deportivo, tomando decisiones sobre fichajes, tácticas, alineaciones, entrenamientos y finanzas. Gracias a su completa base de datos y a su profundidad de gestión, PC Calcio 4 se convirtió en una referencia para los amantes del fútbol y los managers deportivos.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión completa de clubes de fútbol.</li>
<li>Base de datos con equipos y jugadores de la época.</li>
<li>Simulación de partidos en tiempo real.</li>
<li>Mercado de fichajes y traspasos.</li>
<li>Gestión de contratos y renovaciones.</li>
<li>Control total de tácticas, alineaciones y entrenamientos.</li>
<li>Administración económica y financiera del club.</li>
<li>Estadísticas detalladas de jugadores y competiciones.</li>
<li>Participación en ligas y copas nacionales.</li>
<li>Interfaz sencilla y fácil de utilizar.</li>
</ul>
<h3>Novedades principales</h3>
<ul>
<li>Adaptación de la exitosa fórmula de PC Fútbol al mercado italiano.</li>
<li>Base de datos actualizada para la temporada correspondiente.</li>
<li>Mejoras en la simulación de partidos.</li>
<li>Más opciones tácticas para entrenadores.</li>
<li>Estadísticas ampliadas y mejor organizadas.</li>
<li>Gestión económica más completa.</li>
<li>Interfaz optimizada para facilitar la navegación.</li>
<li>Mayor estabilidad y rendimiento general.</li>
</ul>
<h3>Modos de juego</h3>
<ul>
<li><b>Mánager</b> — controla todos los aspectos deportivos y económicos del club para construir un proyecto ganador.</li>
<li><b>Entrenador</b> — diseña tácticas, prepara los encuentros y toma las decisiones clave durante la temporada.</li>
<li><b>Presidente</b> — gestiona el presupuesto, realiza inversiones y marca el rumbo de la entidad.</li>
<li><b>Simulación de Partidos</b> — sigue los encuentros mediante el clásico simulador gráfico de la saga y observa cómo tus decisiones influyen en el resultado final.</li>
</ul>
<h3>Vive la emoción del fútbol desde los despachos</h3>
<p>PC Calcio 4 ofrecía una experiencia completa para quienes soñaban con dirigir un equipo profesional. La combinación de gestión deportiva, estrategia y simulación permitía afrontar todos los desafíos de una temporada, desde la confección de la plantilla hasta la lucha por los títulos.</p>
<h3>Un clásico de la saga internacional</h3>
<p>Considerado uno de los títulos que ayudaron a expandir el éxito de PC Fútbol fuera de España, PC Calcio 4 logró acercar la fórmula de Dinamic Multimedia al público italiano. Su profundidad, accesibilidad y capacidad para enganchar durante horas lo convirtieron en un referente de los managers futbolísticos de mediados de los años noventa.</p>
`,
  },
  combatchess: {
    name: "Combat Chess",
    year: "1997",
    publisher: "Empire Interactive / Dinamic",
    color: "#7a1620",
    logo: "/assets/combatchess-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_combatchess.bin", size: 523837440 },   // Win98 + juego en C:\CCHESS (Win98/DirectX)
    cdrom: { url: "https://discos.dinamicmultimedia.es/combatchess_cd.bin",    size: 639590400 },   // CD montado en E: en runtime (instalación compacta -> datos en el CD)
    state: { url: "/combatchess_state.bin" },                    // PENDIENTE capturar (sin kiosk.bat)
    gameDir: "CCHESS",            // 8.3 OK, en C: (lanzador CCHESS.EXE -> CHESS.EXE)
    saveDisk: "hda",             // juego y partidas en C: (un solo disco duro)
    fat: "fat16",                // C: es FAT16
    saveWholeDir: true,          // persistir TODA la carpeta C:\CCHESS (las partidas van a CCHESS\GAMES)
    desc: `
<p>Combat Chess es una original reinterpretación del clásico juego de ajedrez que combina la estrategia tradicional con espectaculares secuencias de combate animadas. El juego transforma cada captura en un enfrentamiento entre las piezas, aportando una dimensión visual y divertida a uno de los juegos de mesa más populares de la historia.</p>
<p>Manteniendo intactas las reglas del ajedrez, Combat Chess ofrece una experiencia única en la que reyes, reinas, caballeros, alfiles y peones cobran vida para luchar entre sí cuando una pieza captura a otra sobre el tablero.</p>
<h3>Características principales</h3>
<ul>
<li>Juego de ajedrez completo con reglas oficiales.</li>
<li>Animaciones de combate para cada captura.</li>
<li>Piezas representadas por personajes medievales.</li>
<li>Diferentes secuencias de lucha según las piezas implicadas.</li>
<li>Modo para un jugador contra la inteligencia artificial.</li>
<li>Posibilidad de jugar partidas entre dos jugadores.</li>
<li>Interfaz sencilla e intuitiva.</li>
<li>Ambientación inspirada en la fantasía medieval.</li>
<li>Amplia variedad de animaciones y efectos visuales.</li>
<li>Compatible con diferentes niveles de dificultad.</li>
</ul>
<h3>Modos de juego</h3>
<ul>
<li><b>Partida Individual</b> — enfréntate a la inteligencia artificial y pon a prueba tus habilidades estratégicas en el tablero.</li>
<li><b>Dos Jugadores</b> — compite contra un amigo alternando los movimientos en el mismo ordenador.</li>
<li><b>Visualización de Combates</b> — cada vez que una pieza captura a otra, se reproduce una animación exclusiva que representa el enfrentamiento entre ambas.</li>
</ul>
<h3>Un ajedrez diferente</h3>
<p>La gran innovación de Combat Chess fue convertir las capturas en auténticos duelos animados. Cada pieza cuenta con su propia personalidad y estilo de combate, haciendo que cada partida resulte mucho más entretenida y espectacular que una partida de ajedrez convencional. Aunque el juego mantiene intacta la profundidad estratégica del ajedrez clásico, las animaciones aportan un componente visual que lo hizo muy popular entre los jugadores de la época.</p>
<h3>Un clásico de los años noventa</h3>
<p>Combat Chess se convirtió rápidamente en uno de los títulos más reconocidos dentro de las adaptaciones digitales del ajedrez. Su mezcla de estrategia y espectáculo lo diferenciaba claramente de otros juegos del género y contribuyó a acercar el ajedrez a un público más amplio. Todavía hoy es recordado como una de las versiones más originales y divertidas del ajedrez para ordenador.</p>
`,
  },
  eurotour: {
    name: "EuroTour Cycling",
    year: "2001",
    publisher: "Dinamic Multimedia",
    color: "#1aa64b",
    logo: "/assets/eurotour-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_eurotour.bin",      size: 523837440 },
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_eurotour_data.bin", size: 536870912 },
    cdrom: { url: "https://discos.dinamicmultimedia.es/EUROTOUR.bin",            size: 281292800 },
    state: { url: "/eurotour_state.bin?v=5" },
    gameDir: "EURO",
    saveWholeDir: true,
    desc: `
<p>EuroTour Cycling es un simulador de gestión ciclista desarrollado por Dinamic Multimedia que permite al jugador ponerse al frente de un equipo profesional y afrontar los desafíos del ciclismo de competición. El juego combina estrategia, planificación y gestión deportiva, ofreciendo la posibilidad de dirigir todos los aspectos de una escuadra ciclista durante una temporada completa.</p>
<p>Como director deportivo, el jugador debe gestionar corredores, planificar entrenamientos, diseñar estrategias para cada carrera y administrar los recursos del equipo con el objetivo de alcanzar la victoria en las pruebas más prestigiosas del calendario internacional.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión completa de un equipo ciclista profesional.</li>
<li>Amplia base de datos de corredores y equipos.</li>
<li>Participación en competiciones y vueltas por etapas.</li>
<li>Planificación de calendarios y objetivos deportivos.</li>
<li>Gestión de entrenamientos y preparación física.</li>
<li>Control de tácticas y estrategias durante las carreras.</li>
<li>Estadísticas detalladas de ciclistas y competiciones.</li>
<li>Evolución y progresión de los corredores.</li>
<li>Gestión económica y deportiva del equipo.</li>
<li>Simulación detallada de las pruebas ciclistas.</li>
</ul>
<h3>Modos de juego</h3>
<p><strong>Director Deportivo.</strong> Toma el control total del equipo y decide la estrategia a seguir durante toda la temporada.</p>
<p><strong>Gestión de Plantilla.</strong> Selecciona corredores, organiza convocatorias y planifica la participación en las distintas competiciones.</p>
<p><strong>Simulación de Carreras.</strong> Sigue el desarrollo de las pruebas, controla ataques, escapadas, relevos y estrategias de equipo para intentar alcanzar la victoria.</p>
<h3>Novedades y aspectos destacados</h3>
<ul>
<li>Gestión integral del ciclismo profesional.</li>
<li>Amplio calendario de competiciones internacionales.</li>
<li>Simulación estratégica de etapas y carreras.</li>
<li>Estadísticas detalladas y seguimiento de resultados.</li>
<li>Sistema de progresión de corredores.</li>
<li>Gestión táctica adaptada a cada tipo de etapa.</li>
<li>Gran profundidad estratégica para los aficionados al ciclismo.</li>
</ul>
<h3>Vive una temporada sobre dos ruedas</h3>
<p>EuroTour Cycling permite experimentar el ciclismo profesional desde una perspectiva única, donde cada decisión puede marcar la diferencia entre la victoria y la derrota. La planificación de la temporada, la gestión del equipo y la estrategia en carrera son elementos fundamentales para alcanzar el éxito.</p>
<h3>Un título diferente dentro del catálogo de Dinamic Multimedia</h3>
<p>Alejado del fútbol y el baloncesto, EuroTour Cycling apostó por trasladar la experiencia de gestión deportiva al mundo del ciclismo. Gracias a su enfoque estratégico y a su detallada simulación, el juego se convirtió en una propuesta original para los aficionados a este deporte y en una curiosidad muy apreciada dentro del catálogo de Dinamic Multimedia.</p>
`,
  },
  pcpremier5: {
    name: "PC Premier 5.0",
    year: "1997",
    publisher: "Dinamic Multimedia",
    color: "#c9a227",
    logo: "/assets/pcpremier5-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcpremier5.bin",      size: 523837440 },   // Win98 motor PCF5 (FUT5WIN.EXE -> MANAGER.EXE)
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pcpremier5_data.bin", size: 322122240 },   // slim 0.3GB: juego en D:\PCP5
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCPREMIER5.bin",            size: 429424640 },   // CD 5.0 montado runtime (E:); aporta PCF5DAT.PKF (sin DISK.ID)
    state: { url: "/pcpremier5_state.bin" },                         // snapshot en origen (gz)
    gameDir: "PCP5",              // 8.3 OK
    saveWholeDir: true,           // persistir TODA la carpeta D:\PCP5
    desc: `
<p>PC Premier 5.0 fue la adaptación para el mercado británico de la exitosa saga de gestión futbolística desarrollada por Dinamic Multimedia. Basado en el motor de PC Fútbol 5.0, el juego trasladaba toda la emoción y profundidad de la serie al fútbol inglés, permitiendo a los jugadores tomar el control de sus clubes favoritos y gestionar todos los aspectos de la entidad.</p>
<p>Como presidente, entrenador y director deportivo, el jugador debía tomar decisiones clave sobre fichajes, tácticas, entrenamientos, contratos y finanzas. El objetivo era construir un equipo competitivo capaz de conquistar la liga y triunfar tanto a nivel nacional como europeo.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión completa de clubes del fútbol inglés.</li>
<li>Basado en el motor de juego de PC Fútbol 5.0.</li>
<li>Base de datos con equipos y jugadores de Inglaterra.</li>
<li>Simulación de partidos en tiempo real con el clásico simulador gráfico de la saga.</li>
<li>Gestión de fichajes, contratos y renovaciones.</li>
<li>Control total de tácticas, alineaciones y entrenamientos.</li>
<li>Gestión económica y financiera del club.</li>
<li>Estadísticas detalladas de jugadores y competiciones.</li>
</ul>
<h3>Modos de juego</h3>
<p><strong>Manager Total.</strong> Controla todos los aspectos del club, desde la planificación deportiva hasta la gestión financiera.</p>
<p><strong>Entrenador.</strong> Diseña las tácticas, prepara los encuentros y dirige al equipo desde el banquillo.</p>
<p><strong>Presidente.</strong> Administra el presupuesto, realiza inversiones y toma decisiones estratégicas para el crecimiento de la entidad.</p>
<h3>Un clásico de los managers futbolísticos</h3>
<p>PC Premier 5.0 fue una de las primeras adaptaciones internacionales de la saga PC Fútbol, llevando la fórmula de éxito de Dinamic Multimedia al apasionante mundo del fútbol británico. Hoy sigue siendo recordado como una curiosa y valiosa edición internacional de uno de los managers deportivos más importantes de los años noventa.</p>
`,
  },
  pcfrance: {
    name: "PC France 5.0",
    year: "1997",
    publisher: "Dinamic Multimedia",
    color: "#0055a4",
    logo: "/assets/pcfrance-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcfrance.bin", size: 523837440 },   // Win98 motor PCF5, juego en C:\PCFR5 (FUT5WIN.EXE -> MANAGER.EXE)
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCFRANCE.bin",       size: 607614976 },   // CD montado runtime (E:); motor valida raíz CD DISK.ID = "PFR5 00"
    state: { url: "/pcfrance_state.bin" },                    // snapshot capturado (install en C:)
    gameDir: "PCFR5",               // juego en C:\PCFR5 (8.3 OK)
    saveDisk: "hda",                // juego y partidas en C: (hda)
    fat: "fat16",                   // C: es FAT16
    saveWholeDir: true,             // persistir TODA la carpeta C:\PCFR5 (TACTICS/PLAYERS/NOTAS + raíz)
    desc: `
<p>PC France 5.0 fue la adaptación para el mercado francés de la exitosa saga de gestión futbolística desarrollada por Dinamic Multimedia. Basado en el motor de PC Fútbol 5.0, el juego trasladaba toda la emoción y profundidad de la serie al fútbol francés, permitiendo a los jugadores tomar el control de sus clubes favoritos y gestionar todos los aspectos de la entidad.</p>
<p>Como presidente, entrenador y director deportivo, el jugador debía tomar decisiones clave sobre fichajes, tácticas, entrenamientos, contratos y finanzas. El objetivo era construir un equipo competitivo capaz de conquistar la liga y alcanzar el éxito tanto a nivel nacional como internacional.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión completa de clubes del fútbol francés.</li>
<li>Basado en el motor de juego de PC Fútbol 5.0.</li>
<li>Base de datos actualizada con equipos y jugadores de Francia.</li>
<li>Simulación de partidos en tiempo real.</li>
<li>Gestión de fichajes, contratos y renovaciones.</li>
<li>Control total de tácticas, alineaciones y entrenamientos.</li>
<li>Gestión económica y financiera del club.</li>
<li>Estadísticas detalladas de jugadores y competiciones.</li>
<li>Participación en ligas y copas nacionales.</li>
<li>Amplias opciones de gestión deportiva.</li>
</ul>
<h3>Novedades principales</h3>
<ul>
<li>Plantillas actualizadas para la temporada correspondiente.</li>
<li>Mejoras en el simulador de partidos.</li>
<li>Sistema de fichajes más completo y realista.</li>
<li>Nuevas opciones tácticas para los entrenadores.</li>
<li>Gestión económica más detallada.</li>
<li>Estadísticas ampliadas y mejor organizadas.</li>
<li>Interfaz más intuitiva y accesible.</li>
<li>Mejor rendimiento general respecto a versiones anteriores.</li>
</ul>
<h3>Modos de juego</h3>
<p><strong>Manager Total.</strong> Controla todos los aspectos del club, desde la planificación deportiva hasta la gestión financiera.</p>
<p><strong>Entrenador.</strong> Diseña las tácticas, prepara los encuentros y dirige al equipo desde el banquillo.</p>
<p><strong>Presidente.</strong> Administra el presupuesto, realiza inversiones y toma decisiones estratégicas para el crecimiento de la entidad.</p>
<p><strong>Simulación de Partidos.</strong> Sigue los encuentros mediante el clásico simulador gráfico de la saga, observando el desarrollo de las jugadas en tiempo real.</p>
<h3>El fútbol francés como protagonista</h3>
<p>PC France 5.0 permitía disfrutar de la emoción de dirigir equipos del fútbol francés con una profundidad de gestión pocas veces vista en la época. La combinación de estrategia, simulación y administración convertía cada temporada en un desafío único.</p>
<h3>Un clásico de los managers futbolísticos</h3>
<p>Gracias a su equilibrio entre sencillez y profundidad, PC France 5.0 se convirtió en una de las adaptaciones internacionales más destacadas de la saga PC Fútbol. A día de hoy sigue siendo recordado por los aficionados como una curiosa y valiosa edición internacional de uno de los managers deportivos más importantes de los años noventa.</p>
`,
  },
  pcpremier: {
    name: "PC Premier 6.0",
    year: "1998",
    publisher: "Dinamic Multimedia",
    color: "#c9a227",
    logo: "/assets/pcpremier-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcpremier.bin",      size: 523837440 },   // Win98 motor PCF6 (PREMIER6.EXE -> MANAGPRE.EXE)
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pcpremier_data.bin", size: 322122240 },   // slim 0.3GB: D:\PREMIER6
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCPREMIER.bin",            size: 607614976 },   // CD montado runtime (E:); motor valida E:\PREMIER6\DISK.ID = "PCP6 00"
    state: { url: "/pcpremier_state.bin" },                         // snapshot capturado (sin kiosk.bat)
    gameDir: "PREMIER6",          // 8.3 OK
    saveWholeDir: true,           // persistir TODA la carpeta D:\PREMIER6
    desc: `
<p>PC Premier 6.0 fue la adaptación para el mercado británico del exitoso manager futbolístico desarrollado por Dinamic Multimedia. Basado en el motor de PC Fútbol 6.0, el juego trasladaba toda la profundidad de gestión y simulación de la saga al apasionante mundo del fútbol inglés, permitiendo a los jugadores dirigir clubes de las principales categorías del país.</p>
<p>El jugador podía asumir los roles de presidente, entrenador y director deportivo, controlando todos los aspectos del club: fichajes, tácticas, entrenamientos, contratos, finanzas e infraestructuras. El objetivo era construir un equipo competitivo capaz de alcanzar el éxito en las competiciones nacionales y europeas.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión completa de clubes del fútbol inglés.</li>
<li>Basado en el motor de juego de PC Fútbol 6.0.</li>
<li>Base de datos con equipos y jugadores de las ligas inglesas.</li>
<li>Simulación de partidos en tiempo real.</li>
<li>Mercado de fichajes dinámico y detallado.</li>
<li>Gestión de contratos, renovaciones y traspasos.</li>
<li>Control total de tácticas, alineaciones y entrenamientos.</li>
<li>Gestión económica y financiera del club.</li>
<li>Estadísticas detalladas de jugadores y competiciones.</li>
<li>Participación en ligas, copas nacionales y torneos europeos.</li>
</ul>
<h3>Novedades principales</h3>
<ul>
<li>Adaptación completa al fútbol británico.</li>
<li>Plantillas y competiciones actualizadas.</li>
<li>Mejoras en el sistema de simulación de partidos.</li>
<li>Inteligencia artificial más avanzada.</li>
<li>Sistema de fichajes más realista.</li>
<li>Estadísticas ampliadas y más detalladas.</li>
<li>Interfaz optimizada para el mercado internacional.</li>
<li>Mayor profundidad en la gestión deportiva y económica.</li>
</ul>
<h3>Modos de juego</h3>
<p><strong>Manager Total.</strong> Permite controlar todos los aspectos del club, desde la planificación deportiva hasta la gestión financiera.</p>
<p><strong>Entrenador.</strong> Modo centrado en la preparación de los partidos, la elección de tácticas y la gestión de la plantilla.</p>
<p><strong>Presidente.</strong> Gestiona la economía del club, realiza inversiones y toma decisiones estratégicas para asegurar el crecimiento de la entidad.</p>
<p><strong>Simulación de Partidos.</strong> Los encuentros pueden seguirse mediante el clásico simulador gráfico de la saga, observando en tiempo real el desarrollo de las jugadas y el rendimiento de los futbolistas.</p>
<h3>El fútbol inglés como protagonista</h3>
<p>PC Premier 6.0 ofrecía a los aficionados la posibilidad de experimentar toda la emoción del fútbol británico desde los despachos y los banquillos. Con una amplia base de datos y un sistema de gestión muy completo, el juego permitía afrontar los desafíos de una temporada completa al frente de algunos de los clubes más prestigiosos de Inglaterra.</p>
<h3>Un clásico de los managers futbolísticos</h3>
<p>Gracias a la combinación de estrategia, simulación y gestión deportiva, PC Premier 6.0 logró trasladar la fórmula de éxito de PC Fútbol al mercado internacional. A día de hoy sigue siendo recordado por los aficionados como una de las versiones más curiosas y exclusivas de la saga desarrollada por Dinamic Multimedia, y como una muestra de la expansión internacional de una de las franquicias más importantes de la historia del videojuego español.</p>
`,
  },
  pcriver: {
    name: "PC River",
    year: "2000",
    publisher: "Dinamic Multimedia",
    color: "#d42a2a",
    logo: "/assets/pcriver-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcriver.bin",      size: 523837440 },   // Win98 motor PCF6 (disk.id PCR 20; binario usa ddraw/FUT6WIN/pcf6_m*.s3m)
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pcriver_data.bin", size: 429496320 },   // slim 0.4GB: D:\PCRV2000 (lanzador PCRV2000.EXE -> MANAGRIVER.EXE)
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCRIVER.bin",            size: 374956032 },   // CD montado runtime (E:) -- chequeo disk.id
    state: { url: "/pcriver_state.bin" },                         // PENDIENTE capturar (sin kiosk.bat)
    gameDir: "PCRV2000",          // 8.3 OK
    saveWholeDir: true,           // persistir TODA la carpeta D:\PCRV2000 (evita bug timing TACTICS motor PCF6)
    desc: `
<p>PC River fue una edición especial pensada para todos los hinchas de River Plate que soñaban con ponerse al frente del club y tomar las decisiones más importantes de su futuro. Basado en el exitoso motor de la saga PC Fútbol, el juego permitía vivir la experiencia de manejar al Millonario desde adentro, controlando cada aspecto deportivo, económico e institucional.</p>
<p>Como presidente, director técnico y mánager, el jugador debía armar el plantel, definir tácticas, negociar incorporaciones, administrar las finanzas y llevar a River a pelear por todos los títulos. La misión era clara: mantener al Más Grande en lo más alto del fútbol argentino y continental.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión exclusiva de River Plate.</li>
<li>Basado en el motor de juego de la saga PC Fútbol.</li>
<li>Plantel actualizado con jugadores y estadísticas de la época.</li>
<li>Simulación de partidos en tiempo real.</li>
<li>Mercado de pases completo y dinámico.</li>
<li>Manejo de contratos, renovaciones y transferencias.</li>
<li>Control total de tácticas, entrenamientos y alineaciones.</li>
<li>Gestión económica y financiera del club.</li>
<li>Estadísticas detalladas de jugadores y competiciones.</li>
<li>Participación en torneos nacionales e internacionales.</li>
</ul>
<h3>Modos de juego</h3>
<ul>
<li><b>Mánager Total</b> — tomá el control absoluto de River Plate y ocupate de todos los aspectos del club, desde los fichajes hasta las finanzas.</li>
<li><b>Director Técnico</b> — elegí la formación, prepará los partidos, diseñá las tácticas y llevá al equipo a la victoria.</li>
<li><b>Presidente</b> — administrá el presupuesto, realizá inversiones y tomá las decisiones estratégicas que marcarán el futuro de la institución.</li>
<li><b>Simulación de Partidos</b> — viví cada encuentro a través del clásico simulador gráfico de la saga, siguiendo las jugadas y el rendimiento de tus jugadores en tiempo real.</li>
</ul>
<h3>Contenido exclusivo de River Plate</h3>
<ul>
<li>Historia de River Plate.</li>
<li>Datos completos del plantel profesional.</li>
<li>Estadísticas de jugadores y competiciones.</li>
<li>Fotografías del equipo y cuerpo técnico.</li>
<li>Diseño personalizado con los colores y símbolos del club.</li>
<li>Información sobre los principales torneos nacionales e internacionales.</li>
</ul>
<h3>Novedades y aspectos destacados</h3>
<ul>
<li>Edición especial dedicada a los hinchas de River.</li>
<li>Base de datos centrada en el fútbol argentino.</li>
<li>Estadísticas ampliadas y actualizadas.</li>
<li>Simulación de partidos más completa.</li>
<li>Amplias opciones de gestión deportiva y económica.</li>
<li>Interfaz personalizada con la identidad del club.</li>
<li>Gran cantidad de contenido exclusivo relacionado con River Plate.</li>
</ul>
<h3>El sueño de dirigir al Millonario</h3>
<p>PC River permitía a los hinchas cumplir el sueño de ponerse al mando de una de las instituciones más grandes del fútbol mundial. Desde el banco de suplentes hasta los despachos del club, cada decisión estaba en manos del jugador.</p>
<p>Con una combinación perfecta de estrategia, gestión y pasión futbolera, esta edición especial se convirtió en una experiencia única para todos los riverplatenses que querían demostrar que también podían llevar la banda roja a la gloria.</p>
<p><i>Porque River no se explica... se siente. Y en PC River, el destino del Millonario estaba en tus manos.</i></p>
`,
  },
  pccalcio5: {
    name: "PC Calcio 5 (Italia)",
    year: "1997",
    publisher: "Dinamic Multimedia",
    color: "#2e7d32",
    logo: "/assets/pccalcio5-logo.png?v=4",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pccalcio5.bin",      size: 523837440 },   // Win98 motor PC Futbol 5 (FUT5WIN.EXE -> MANAGER.EXE)
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pccalcio5_data.bin", size: 214748160 },   // slim 0.2GB: D:\CALCIO5
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCCALCIO5.bin",            size: 429889536 },   // CD montado runtime (E:)
    state: { url: "/pccalcio5_state.bin" },                         // PENDIENTE capturar (sin kiosk.bat)
    gameDir: "CALCIO5",           // 8.3 OK
    saveWholeDir: true,           // persistir TODA la carpeta D:\CALCIO5
    desc: `
<p>PC Calcio 5.0 Italia rappresenta una delle edizioni più amate della storica serie manageriale calcistica sviluppata da Dinamic Multimedia. Pubblicato per il mercato italiano nella stagione 1997/98, il gioco permetteva agli appassionati di vivere l'esperienza completa della gestione di una squadra di calcio, assumendo contemporaneamente i ruoli di presidente, allenatore e direttore sportivo.</p>
<p>Grazie a un vasto database aggiornato con squadre e giocatori del calcio italiano, PC Calcio 5.0 offriva una combinazione perfetta tra strategia, simulazione e gestione economica, consolidando il successo della saga anche fuori dalla Spagna.</p>
<h3>Caratteristiche principali</h3>
<ul>
<li>Gestione completa di club e società calcistiche.</li>
<li>Database aggiornato con squadre e giocatori dei campionati italiani.</li>
<li>Simulazione delle partite in tempo reale.</li>
<li>Gestione del mercato dei trasferimenti.</li>
<li>Controllo di formazioni, tattiche e allenamenti.</li>
<li>Gestione economica e finanziaria della società.</li>
<li>Statistiche dettagliate di giocatori e competizioni.</li>
<li>Partecipazione a campionati e coppe nazionali.</li>
<li>Interfaccia intuitiva e ricca di informazioni.</li>
<li>Ampia libertà decisionale per il manager.</li>
</ul>
<h3>Novità principali</h3>
<ul>
<li>Database completamente aggiornato per la nuova stagione.</li>
<li>Miglioramenti al motore di simulazione delle partite.</li>
<li>Sistema di trasferimenti più realistico.</li>
<li>Nuove opzioni tattiche e strategiche.</li>
<li>Maggiore quantità di statistiche disponibili.</li>
<li>Gestione finanziaria più approfondita.</li>
<li>Interfaccia migliorata rispetto alle versioni precedenti.</li>
<li>Prestazioni generali ottimizzate.</li>
</ul>
<h3>Modalità di gioco</h3>
<ul>
<li><b>Manager Totale</b> — controlla ogni aspetto della società, dalla costruzione della rosa alla gestione delle finanze.</li>
<li><b>Allenatore</b> — preparazione delle partite, scelta delle tattiche e gestione tecnica della squadra.</li>
<li><b>Presidente</b> — decisioni economiche e strategiche per garantire la crescita e il successo del club.</li>
<li><b>Simulazione delle Partite</b> — segui le gare con il simulatore grafico della serie, osservando in tempo reale lo sviluppo delle azioni.</li>
</ul>
<h3>Il calcio italiano come protagonista</h3>
<p>PC Calcio 5.0 permetteva di affrontare tutte le sfide del calcio professionistico italiano, dalla lotta per lo scudetto alla conquista delle coppe nazionali. La profondità gestionale e l'ampia quantità di dati disponibili rendevano ogni stagione unica e ricca di possibilità.</p>
<h3>Un classico del calcio manageriale</h3>
<p>Grazie al suo equilibrio tra accessibilità e profondità, PC Calcio 5.0 è ancora oggi ricordato come uno dei capitoli più importanti della serie. Per molti appassionati italiani rappresenta uno dei migliori manager calcistici degli anni Novanta, capace di offrire centinaia di ore di gioco e una simulazione coinvolgente del mondo del calcio professionistico.</p>
`,
  },
  pccalcio7: {
    name: "PC Calcio 7 (Italia)",
    year: "1999",
    publisher: "Dinamic Multimedia",
    color: "#1a6fb0",
    logo: "/assets/pccalcio7-logo.png?v=2",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pccalcio7.bin",      size: 523837440 },   // Win98 motor PC Futbol 7 (disk.id PCC7 00)
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pccalcio7_data.bin", size: 858993152 },   // slim 0.8GB: D:\CALCIO7 (base + Plus, lanzador CALCIO7.EXE -> MANAGCAL.EXE)
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCCALCIO7.bin",            size: 691337216 },   // CD base montado runtime (E:) -- chequeo disk.id
    state: { url: "/pccalcio7_state.bin" },                         // PENDIENTE capturar (sin kiosk.bat)
    gameDir: "CALCIO7",           // 8.3 OK
    saveWholeDir: true,           // persistir TODA la carpeta D:\CALCIO7 (evita bug timing TACTICS motor PCF7)
    desc: `
<p>PC Calcio 7 Italia è una delle edizioni più apprezzate della celebre serie manageriale calcistica sviluppata da Dinamic Multimedia. Pubblicato sul mercato italiano alla fine degli anni Novanta, il gioco rappresentava l'evoluzione naturale di PC Calcio 6, introducendo importanti miglioramenti nella simulazione, nella gestione sportiva e nell'esperienza complessiva di gioco.</p>
<p>Grazie a un database aggiornato con squadre e giocatori del calcio italiano, il giocatore poteva assumere contemporaneamente i ruoli di presidente, allenatore e direttore sportivo, prendendo decisioni fondamentali per il futuro della propria società.</p>
<h3>Caratteristiche principali</h3>
<ul>
<li>Gestione completa di squadre e società calcistiche.</li>
<li>Database aggiornato con i principali campionati italiani.</li>
<li>Simulazione delle partite in tempo reale.</li>
<li>Gestione avanzata del mercato dei trasferimenti.</li>
<li>Controllo totale di formazioni, tattiche e allenamenti.</li>
<li>Gestione economica e finanziaria del club.</li>
<li>Statistiche dettagliate di giocatori e competizioni.</li>
<li>Partecipazione a campionati, coppe nazionali e tornei internazionali.</li>
<li>Interfaccia intuitiva e ricca di informazioni.</li>
<li>Elevata libertà gestionale.</li>
</ul>
<h3>Novità principali</h3>
<ul>
<li>Nuovo motore di simulazione più realistico.</li>
<li>Intelligenza artificiale migliorata.</li>
<li>Sistema di trasferimenti più dinamico e competitivo.</li>
<li>Maggiore profondità nella gestione economica.</li>
<li>Nuove opzioni tattiche e strategiche.</li>
<li>Statistiche ampliate e più dettagliate.</li>
<li>Miglioramenti grafici nell'interfaccia e nelle schermate di gioco.</li>
<li>Prestazioni e stabilità ottimizzate.</li>
</ul>
<h3>Modalità di gioco</h3>
<ul>
<li><b>Manager Totale</b> — controlla ogni aspetto della società, dalla gestione finanziaria alla pianificazione sportiva.</li>
<li><b>Allenatore</b> — preparazione delle partite, scelta delle tattiche e gestione della squadra.</li>
<li><b>Presidente</b> — amministra il club dal punto di vista economico, decidendo investimenti, infrastrutture e obiettivi stagionali.</li>
<li><b>Simulazione delle Partite</b> — segui le gare con il celebre simulatore grafico della serie, osservando in tempo reale le azioni dei giocatori sul campo.</li>
</ul>
<h3>Un punto di riferimento per gli appassionati</h3>
<p>PC Calcio 7 Italia riusciva a combinare perfettamente gestione sportiva, strategia ed economia, offrendo un'esperienza profonda ma accessibile. Le numerose opzioni disponibili permettevano di costruire la propria squadra ideale e di affrontare le sfide del calcio professionistico stagione dopo stagione.</p>
<p>Grazie alle sue innovazioni e alla sua completezza, viene ancora oggi ricordato come uno dei migliori manager calcistici della sua generazione e come una delle versioni internazionali più riuscite della leggendaria saga PC Fútbol.</p>
<h3>Un classico del calcio manageriale</h3>
<p>Per molti appassionati italiani, PC Calcio 7 rappresenta l'apice della serie nel mercato nazionale. La combinazione di un vasto database, una simulazione migliorata e una gestione sempre più realistica lo ha reso un titolo capace di lasciare il segno nella storia dei videogiochi sportivi e manageriali.</p>
`,
  },
  pccalcio6: {
    name: "PC Calcio 6 (Italia)",
    year: "1998",
    publisher: "Dinamic Multimedia",
    color: "#c9a227",
    logo: "/assets/pccalcio6-logo.png?v=2",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pccalcio6.bin",      size: 523837440 },   // Win98 motor PCF6 (disk.id PCC6 00)
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pccalcio6_data.bin", size: 429496320 },   // slim 0.4GB: D:\CALCIO6 (base + Plus, lanzador CALCIO6.EXE -> MANAGCAL.EXE)
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCCALCIO6.bin",            size: 476594176 },   // CD base montado runtime (E:) -- chequeo disk.id
    state: { url: "/pccalcio6_state.bin" },                         // PENDIENTE capturar (sin kiosk.bat)
    gameDir: "CALCIO6",            // 8.3 OK
    saveWholeDir: true,           // persistir TODA la carpeta D:\CALCIO6 (evita bug timing TACTICS motor PCF6)
    desc: `
<p>PC Calcio 6 rappresenta una delle edizioni più complete e apprezzate della celebre serie manageriale calcistica sviluppata da Dinamic Multimedia. Pubblicato in Italia alla fine degli anni Novanta, il gioco portava tutta l'esperienza di PC Fútbol 6.0 nel campionato italiano, permettendo ai tifosi di vivere ogni aspetto della gestione di una squadra di calcio.</p>
<p>Il giocatore poteva assumere contemporaneamente i ruoli di presidente, allenatore e direttore sportivo, controllando il mercato dei trasferimenti, le finanze del club, gli allenamenti e le tattiche di gioco. L'obiettivo era costruire una squadra vincente e conquistare i principali trofei nazionali e internazionali.</p>
<h3>Caratteristiche principali</h3>
<ul>
<li>Gestione completa di squadre e società calcistiche.</li>
<li>Database aggiornato con club e giocatori del calcio italiano.</li>
<li>Simulazione delle partite in tempo reale.</li>
<li>Gestione di trasferimenti, contratti e rinnovi.</li>
<li>Controllo totale di tattiche, formazioni e allenamenti.</li>
<li>Gestione economica e finanziaria del club.</li>
<li>Statistiche dettagliate di giocatori e competizioni.</li>
<li>Partecipazione a campionati e coppe nazionali.</li>
<li>Interfaccia intuitiva e facile da utilizzare.</li>
<li>Ampie opzioni di personalizzazione manageriale.</li>
</ul>
<h3>Novità principali</h3>
<ul>
<li>Nuovo motore di simulazione delle partite.</li>
<li>Intelligenza artificiale migliorata.</li>
<li>Sistema di trasferimenti più realistico.</li>
<li>Maggiore profondità nella gestione economica.</li>
<li>Statistiche ampliate e più dettagliate.</li>
<li>Miglioramenti nelle tattiche e nelle strategie di gioco.</li>
<li>Interfaccia grafica rinnovata.</li>
<li>Prestazioni generali ottimizzate.</li>
</ul>
<h3>Modalità di gioco</h3>
<ul>
<li><b>Manager</b> — permette di controllare ogni aspetto della società, dalla pianificazione sportiva alla gestione finanziaria.</li>
<li><b>Allenatore</b> — modalità dedicata alla preparazione delle partite, alle tattiche e alla gestione della rosa.</li>
<li><b>Simulazione delle Partite</b> — le gare possono essere seguite attraverso il celebre simulatore grafico della serie, osservando in tempo reale le azioni e il comportamento dei giocatori sul campo.</li>
</ul>
<h3>Il calcio italiano protagonista</h3>
<p>PC Calcio 6 offriva agli appassionati la possibilità di vivere l'emozione del calcio italiano con una profondità gestionale raramente vista all'epoca. Grazie a un vasto database, a un sistema di gestione completo e a un simulatore di partite evoluto, il gioco riusciva a ricreare fedelmente le sfide del mondo calcistico professionistico.</p>
<p>Ancora oggi viene ricordato come una delle migliori versioni internazionali della saga PC Fútbol e come uno dei manager calcistici più completi della sua generazione.</p>
`,
  },
  pcrmbasket99: {
    name: "PC Real Madrid Basket '99",
    year: "1999",
    publisher: "Dinamic Multimedia",
    color: "#0a2463",
    logo: "/assets/pcrmbasket99-logo.png?v=3",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcrmbasket99.bin", size: 523837440 },   // Win98 + juego en C:\PCRMB99 (motor PC Real Madrid Basket 6.0, fam. PCF6) -- va en v86
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCRMB99.bin",            size: 434548736 },   // CD en runtime, lector = D: (MSCDEX /L:D, disco unico)
    state: { url: "/pcrmbasket99_state.bin" },                    // PENDIENTE capturar (sin kiosk.bat)
    gameDir: "PCRMB99",            // 8.3 OK, en C: (lanzador PCBMAD.EXE -> MANAGER.EXE)
    saveDisk: "hda",              // juego y partidas en C: (un solo disco duro)
    fat: "fat16",                 // C: es FAT16
    saveWholeDir: true,           // persistir TODA la carpeta C:\PCRMB99
    desc: `
<p>PC Real Madrid Basket '99 fue una edición especial desarrollada por Dinamic Multimedia en 1999, dedicada exclusivamente a la sección de baloncesto del Real Madrid. Basado en el motor de la saga PC Basket, permitía a los aficionados madridistas tomar el control total del equipo y gestionar todos los aspectos deportivos y económicos del club.</p>
<p>El jugador podía asumir los roles de presidente, entrenador y director deportivo, tomando decisiones sobre fichajes, tácticas, entrenamientos y finanzas con el objetivo de conquistar la Liga ACB, la Copa del Rey y las principales competiciones europeas.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión exclusiva del Real Madrid de baloncesto.</li>
<li>Basado en el motor de la saga PC Basket.</li>
<li>Plantilla oficial del Real Madrid Basket de la temporada 1998/99.</li>
<li>Simulación de partidos de baloncesto en tiempo real.</li>
<li>Gestión de fichajes, contratos y renovaciones.</li>
<li>Control completo de tácticas, sistemas de juego y rotaciones.</li>
<li>Gestión económica y deportiva del club.</li>
<li>Estadísticas detalladas de jugadores y competiciones.</li>
<li>Participación en la Liga ACB, la Copa del Rey y las competiciones europeas.</li>
<li>Contenido exclusivo dedicado a los aficionados madridistas.</li>
</ul>
<h3>Modos de juego</h3>
<ul>
<li><b>Manager Total</b> — controla todos los aspectos del equipo, de la planificación deportiva a la gestión económica.</li>
<li><b>Entrenador</b> — preparación de los partidos, tácticas, quintetos y rotaciones.</li>
<li><b>Simulación de Partidos</b> — sigue los encuentros con el simulador gráfico característico de PC Basket.</li>
</ul>
<h3>Contenido exclusivo del Real Madrid Basket</h3>
<ul>
<li>Historia de la sección de baloncesto del Real Madrid.</li>
<li>Datos y estadísticas de la plantilla oficial.</li>
<li>Fotografías de jugadores y cuerpo técnico.</li>
<li>Información sobre competiciones nacionales e internacionales.</li>
<li>Diseño visual personalizado con la imagen corporativa del club.</li>
</ul>
<p>Una de las ediciones especiales más curiosas y difíciles de encontrar de Dinamic Multimedia, muy apreciada por coleccionistas y aficionados al baloncesto y a las históricas sagas PC Basket y PC Fútbol.</p>
`,
  },
  pcbarcabasket99: {
    name: "PC Barça Basket '99",
    year: "1999",
    publisher: "Dinamic Multimedia",
    color: "#004d98",
    logo: "/assets/pcbarcabasket99-logo.png?v=2",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcbarcabasket99.bin", size: 523837440 },   // Win98 + juego en C:\PCBB99 (motor PC Basket 6.0, fam. PCF6) -- va en v86
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCBB99.bin",                size: 626370560 },   // CD en runtime, lector = D: (MSCDEX /L:D, disco unico)
    state: { url: "/pcbarcabasket99_state.bin" },                         // PENDIENTE capturar (sin kiosk.bat)
    gameDir: "PCBB99",              // 8.3 OK, en C:
    saveDisk: "hda",               // juego y partidas en C: (un solo disco duro)
    fat: "fat16",                  // C: es FAT16
    saveWholeDir: true,            // persistir TODA la carpeta C:\PCBB99 (evita bug timing TACTICS del motor PCF6)
    desc: `
<p>PC Barça Basket '99 va ser una edició especial desenvolupada per Dinamic Multimedia i publicada l'any 1999, dedicada exclusivament a la secció de bàsquet del Futbol Club Barcelona. Basat en el motor de la saga PC Basket, permetia als aficionats blaugrana posar-se al capdavant de l'equip i gestionar tots els aspectes esportius i econòmics del club.</p>
<p>El jugador podia assumir els rols de president, entrenador i director esportiu, prenent decisions sobre fitxatges, alineacions, tàctiques, entrenaments i finances amb l'objectiu de conquerir la Lliga ACB, la Copa del Rei i les principals competicions europees.</p>
<h3>Característiques principals</h3>
<ul>
<li>Gestió exclusiva del FC Barcelona de bàsquet.</li>
<li>Basat en les mecàniques de la saga PC Basket.</li>
<li>Plantilla oficial del Barça Basket de la temporada 1998/99.</li>
<li>Simulació de partits de bàsquet en temps real.</li>
<li>Gestió de fitxatges, contractes i renovacions.</li>
<li>Control complet de tàctiques, sistemes de joc i rotacions.</li>
<li>Gestió econòmica i esportiva del club.</li>
<li>Estadístiques detallades de jugadors i competicions.</li>
<li>Participació a la Lliga ACB, la Copa del Rei i les competicions europees.</li>
<li>Contingut exclusiu dedicat als aficionats blaugrana.</li>
</ul>
<h3>Modes de joc</h3>
<ul>
<li><b>Manager Total</b> — controla tots els aspectes de l'equip, de la planificació esportiva a la gestió econòmica.</li>
<li><b>Entrenador</b> — preparació dels partits, tàctiques, quintets i rotacions.</li>
<li><b>Simulació de Partits</b> — segueix els enfrontaments amb el simulador gràfic característic de PC Basket.</li>
</ul>
<h3>Contingut exclusiu del Barça Basket</h3>
<ul>
<li>Història de la secció de bàsquet del FC Barcelona.</li>
<li>Dades i estadístiques de la plantilla oficial.</li>
<li>Fotografies dels jugadors i del cos tècnic.</li>
<li>Informació sobre competicions nacionals i internacionals.</li>
<li>Disseny visual personalitzat amb la imatge corporativa del club.</li>
</ul>
<p>Una de les edicions especials més curioses i difícils de trobar de Dinamic Multimedia, molt apreciada pels col·leccionistes i pels aficionats al bàsquet i a les mítiques sagues PC Basket i PC Fútbol.</p>
`,
  },
  igor: {
    name: "Igor: Objetivo Uikokahonia",
    year: "1994",
    publisher: "Dinamic Multimedia",
    color: "#f2c200",
    logo: "/assets/igor-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/igor_boot.bin", size: 523837440 },   // MS-DOS (DOS/16M), juego en C:/IGOR
    cdrom: { url: "https://discos.dinamicmultimedia.es/igor_cd.bin", size: 264189952 },     // Igor comprueba el CD en runtime (E:)
    state: { url: "/igor_state.bin" },
    gameDir: "IGOR",
    saveDisk: "hda",
    fat: "fat16",
    saveWholeDir: true,
    dosKiosk: true,
    desc: `
<p>Igor: Objetivo Uikokahonia es una de las aventuras gráficas más importantes de la historia del videojuego español. Desarrollado por el equipo que posteriormente fundaría Pendulo Studios y publicado por Dinamic Multimedia en 1994 para PC, el juego marcó el inicio de una nueva generación de aventuras gráficas creadas en España.</p>
<p>La historia sigue las desventuras de Igor, un tímido estudiante universitario enamorado de su compañera Laura. Cuando ella se apunta a un viaje de fin de semana al misterioso destino de Uikokahonia acompañada por el popular Philip, Igor decide embarcarse en una divertida aventura para conquistar su corazón y demostrar que él también puede ser el protagonista de la historia.</p>
<h3>Características principales</h3>
<ul>
<li>Aventura gráfica clásica de apuntar y hacer clic.</li>
<li>Historia repleta de humor y situaciones disparatadas.</li>
<li>Ambientación universitaria con personajes muy carismáticos.</li>
<li>Gráficos dibujados a mano con gran nivel de detalle.</li>
<li>Numerosos puzles y desafíos de lógica.</li>
<li>Diálogos llenos de humor y referencias culturales.</li>
<li>Banda sonora original.</li>
<li>Gran variedad de escenarios y personajes.</li>
<li>Uno de los títulos pioneros de la aventura gráfica española.</li>
<li>Predecesor espiritual de clásicos como Hollywood Monsters.</li>
</ul>
<h3>Una aventura llena de humor</h3>
<p>A lo largo de la partida, Igor deberá superar numerosos obstáculos para acercarse a Laura. Para ello recorrerá la universidad, resolverá puzles, interactuará con estudiantes y profesores, y viajará hasta el peculiar destino de Uikokahonia, donde le esperan nuevas situaciones tan absurdas como divertidas.</p>
<p>El juego destaca por su tono desenfadado, sus diálogos ingeniosos y una gran cantidad de situaciones cómicas que acompañan al jugador durante toda la aventura.</p>
<h3>Un referente de las aventuras gráficas españolas</h3>
<p>Igor: Objetivo Uikokahonia supuso el debut de un equipo de desarrolladores que años más tarde alcanzaría fama internacional bajo el nombre de Pendulo Studios. A pesar de tratarse de su primera gran producción, el juego ya mostraba una notable calidad artística, una cuidada narrativa y una personalidad propia que lo diferenciaban de otras aventuras gráficas de la época.</p>
<p>Su éxito ayudó a consolidar el género en España y abrió el camino a futuras producciones que se convertirían en auténticos clásicos.</p>
<h3>Un clásico inolvidable</h3>
<p>Considerado una obra pionera dentro del panorama nacional, Igor: Objetivo Uikokahonia sigue siendo recordado como una de las aventuras gráficas más queridas de los años noventa. Su mezcla de humor, personajes memorables y puzles bien diseñados lo convierten en una pieza fundamental de la historia del videojuego español y en el punto de partida de una de las trayectorias más exitosas del género en España.</p>
`,
  },

  pcbarca99: {
    name: "PC Barça '99",
    year: "1999",
    publisher: "Dinamic Multimedia",
    color: "#004d98",
    logo: "/assets/pcbarca99-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcbarca99.bin", size: 523837440 },   // Win98 motor PCB6/PCF6
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pcbarca99_data.bin", size: 429496320 },   // disco slim 410MB: D:\PCB99
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCBARCA99.bin",       size: 675543040 },   // CD montado en runtime (E:)
    state: { url: "/pcbarca99_state.bin" },                         // PENDIENTE capturar
    gameDir: "PCB99",               // 8.3 OK (≤8 chars)
    saveWholeDir: true,             // persistir TODA la carpeta PCB99
    desc: `
<p>PC Barça '99 va ser la segona entrega de la sèrie dedicada exclusivament al Futbol Club Barcelona, desenvolupada per Dinamic Multimedia i publicada l'any 1999. Permetia als aficionats blaugrana posar-se al capdavant del seu club preferit i gestionar tots els aspectes de l'entitat per assolir l'èxit tant a nivell nacional com europeu.</p>
<p>El joc oferia la possibilitat d'assumir els rols de president, entrenador i director esportiu, prenent decisions sobre fitxatges, alineacions, tàctiques, entrenaments i finances, amb una gran quantitat de contingut exclusiu del FC Barcelona.</p>
<h3>Característiques principals</h3>
<ul>
<li>Gestió exclusiva del Futbol Club Barcelona.</li>
<li>Plantilla oficial del FC Barcelona de la temporada 1999/2000.</li>
<li>Simulació de partits més avançada i realista.</li>
<li>Gestió de fitxatges, contractes i renovacions.</li>
<li>Control complet de tàctiques, alineacions i entrenaments.</li>
<li>Gestió econòmica del club.</li>
<li>Estadístiques detallades de jugadors i competicions.</li>
<li>Participació a la Lliga, la Copa i les competicions europees.</li>
<li>Contingut exclusiu dedicat als aficionats blaugrana.</li>
</ul>
<h3>Novetats respecte a PC Barça</h3>
<ul>
<li>Actualització completa de la plantilla i del cos tècnic.</li>
<li>Millores en el simulador de partits.</li>
<li>Intel·ligència artificial més avançada.</li>
<li>Sistema de fitxatges més realista.</li>
<li>Estadístiques ampliades i més detallades.</li>
<li>Interfície renovada i més intuïtiva.</li>
<li>Millores en la gestió esportiva i financera.</li>
</ul>
<h3>Modes de joc</h3>
<p><b>Manager Total:</b> permet controlar totes les àrees del club, des de la gestió econòmica fins a la planificació esportiva.</p>
<p><b>Entrenador:</b> mode centrat en la preparació dels partits, les alineacions i les decisions tàctiques.</p>
<p><b>Simulació de partits:</b> els enfrontaments es poden seguir mitjançant el simulador gràfic.</p>
<h3>Contingut exclusiu del FC Barcelona</h3>
<p>Història del club, dades i estadístiques de la plantilla oficial, fotografies dels jugadors i del cos tècnic, informació sobre les competicions i un disseny visual personalitzat amb la imatge corporativa blaugrana.</p>
<h3>L'experiència definitiva per als culers</h3>
<p>PC Barça '99 va permetre als aficionats viure el somni de dirigir el FC Barcelona des de dins. Gràcies a les millores respecte a la primera entrega i al seu complet contingut exclusiu, es va convertir en una de les edicions especials més destacades de Dinamic Multimedia, recordada amb estima pels seguidors de la saga PC Fútbol i pels col·leccionistes.</p>
`,
  },

  pcrm: {
    name: "PC Real Madrid 99",
    year: "1999",
    publisher: "Dinamic Multimedia",
    color: "#febe10",
    logo: "/assets/pcrm-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcrm.bin",      size: 523837440 },   // Win98 motor PCF6 (la caja dice PCF2000 pero el binario es PCF6)
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pcrm_data.bin", size: 322122240 },   // disco slim 307MB: D:\PCRM99
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCRM.bin",            size: 437626880 },   // CD montado en runtime (E:) — chequeo disk.id
    state: { url: "/pcrm_state.bin" },                         // PENDIENTE capturar
    gameDir: "PCRM99",              // 8.3 OK (≤8 chars)
    saveWholeDir: true,            // persistir TODA la carpeta PCRM99
    desc: `
<p>PC Real Madrid 99 fue una edición especial desarrollada por Dinamic Multimedia y lanzada en 1999, dedicada exclusivamente al Real Madrid Club de Fútbol. Basado en el motor de juego de PC Fútbol 2000, este título permitía a los aficionados madridistas tomar el control total del club y gestionar todos los aspectos deportivos y económicos de la entidad.</p>
<p>El juego ofrecía la posibilidad de asumir los roles de presidente, entrenador y director deportivo, tomando decisiones sobre fichajes, alineaciones, tácticas, entrenamientos y finanzas con el objetivo de conquistar la Liga, la Copa y las competiciones europeas.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión exclusiva del Real Madrid CF.</li>
<li>Basado en el motor de juego de PC Fútbol 2000.</li>
<li>Plantilla oficial del Real Madrid para la temporada 1999/2000.</li>
<li>Simulación de partidos avanzada y realista.</li>
<li>Gestión de fichajes, contratos y renovaciones.</li>
<li>Control completo de tácticas y alineaciones.</li>
<li>Gestión económica y financiera del club.</li>
<li>Estadísticas detalladas de jugadores y competiciones.</li>
<li>Participación en Liga, Copa y competiciones europeas.</li>
<li>Contenido exclusivo relacionado con el club blanco.</li>
</ul>
<h3>Novedades principales</h3>
<ul>
<li>Actualización completa de la plantilla y del cuerpo técnico.</li>
<li>Simulador de partidos mejorado respecto a versiones anteriores.</li>
<li>Inteligencia artificial más avanzada.</li>
<li>Sistema de fichajes más completo y realista.</li>
<li>Estadísticas ampliadas y más detalladas.</li>
<li>Interfaz renovada y más intuitiva.</li>
<li>Mejoras en la gestión deportiva y financiera.</li>
<li>Mayor estabilidad y rendimiento general.</li>
</ul>
<h3>Modos de juego</h3>
<p><b>Manager Total:</b> permite controlar todos los aspectos del club, desde la planificación deportiva hasta la gestión económica.</p>
<p><b>Entrenador:</b> modo centrado en la preparación de los partidos, las tácticas y las alineaciones del equipo.</p>
<p><b>Simulación de partidos:</b> los encuentros pueden seguirse mediante el simulador gráfico característico de la saga, observando el desarrollo de cada jugada y el rendimiento de los futbolistas.</p>
<h3>Contenido exclusivo del Real Madrid</h3>
<p>Historia del Real Madrid, información detallada de la plantilla oficial, fotografías de jugadores y entrenadores, estadísticas completas de la temporada y un diseño visual personalizado con la imagen corporativa del club.</p>
<h3>El juego definitivo para los madridistas</h3>
<p>PC Real Madrid 99 permitió a los seguidores del conjunto blanco vivir la experiencia de dirigir uno de los clubes más prestigiosos del mundo. Gracias a la combinación del potente motor de PC Fútbol 2000 y del contenido exclusivo dedicado al Real Madrid, se convirtió en una de las ediciones especiales más destacadas de Dinamic Multimedia, hoy muy apreciada por coleccionistas y aficionados a los videojuegos de gestión deportiva.</p>
`,
  },

  atm2000: {
    name: "PC Atlético de Madrid 2000",
    year: "2000",
    publisher: "Dinamic Multimedia",
    color: "#cb3524",
    logo: "/assets/atm2000-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_atm2000.bin",      size: 523837440 },   // Win98 motor PC Fútbol 2000 (DM Loader / manager.exe) — ¡SÍ va en v86!
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_atm2000_data.bin", size: 536870912 },   // disco slim 512MB: D:\PCATMA (393MB)
    cdrom: { url: "https://discos.dinamicmultimedia.es/ATM2000.bin",            size: 690270208 },   // CD montado en runtime (E:) — chequeo disk.id "PCAT 20"
    state: { url: "/atm2000_state.bin" },                         // PENDIENTE capturar
    gameDir: "PCATMA",             // 8.3 OK (≤8 chars)
    saveWholeDir: true,            // persistir TODA la carpeta PCATMA (SAVE/TACTICS/manager.ini/sip.ini)
    desc: `
<p>PC Atlético de Madrid 2000 fue una edición especial desarrollada por Dinamic Multimedia y lanzada en el año 2000, dedicada exclusivamente al Atlético de Madrid. Basado en el motor de juego de PC Fútbol 2000, este título permitía a los aficionados rojiblancos ponerse al mando de su equipo y gestionar todos los aspectos deportivos y económicos del club.</p>
<p>El jugador podía asumir los roles de presidente, entrenador y director deportivo, tomando decisiones sobre fichajes, alineaciones, tácticas, entrenamientos y finanzas con el objetivo de llevar al Atlético de Madrid a conquistar títulos nacionales e internacionales.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión exclusiva del Atlético de Madrid.</li>
<li>Basado en el motor de juego de PC Fútbol 2000.</li>
<li>Plantilla oficial del Atlético de Madrid de la temporada 1999/2000.</li>
<li>Simulación de partidos avanzada y realista.</li>
<li>Gestión de fichajes, contratos y renovaciones.</li>
<li>Control total de tácticas, alineaciones y entrenamientos.</li>
<li>Gestión económica completa del club.</li>
<li>Estadísticas detalladas de jugadores y competiciones.</li>
<li>Participación en Liga, Copa y torneos europeos.</li>
<li>Contenido exclusivo dedicado al conjunto rojiblanco.</li>
</ul>
<h3>Novedades principales</h3>
<ul>
<li>Actualización completa de la plantilla y cuerpo técnico.</li>
<li>Simulador de partidos mejorado.</li>
<li>Inteligencia artificial más avanzada.</li>
<li>Sistema de fichajes más realista y competitivo.</li>
<li>Estadísticas ampliadas para un análisis más profundo.</li>
<li>Interfaz renovada y más intuitiva.</li>
<li>Mejoras en la gestión financiera y deportiva.</li>
<li>Mayor estabilidad y rendimiento general.</li>
</ul>
<h3>Modos de juego</h3>
<p><b>Manager Total:</b> permite controlar todos los aspectos del club, desde la planificación deportiva hasta la gestión económica, con total libertad para construir un proyecto ganador.</p>
<p><b>Entrenador:</b> modo centrado en la preparación de los partidos, la estrategia táctica y la gestión de la plantilla.</p>
<p><b>Simulación de partidos:</b> los encuentros pueden seguirse mediante el tradicional simulador gráfico de la saga PC Fútbol, observando el desarrollo de las jugadas y el rendimiento de los jugadores.</p>
<h3>Contenido exclusivo del Atlético de Madrid</h3>
<p>Historia del Atlético de Madrid, información detallada de la plantilla oficial, fotografías de jugadores y cuerpo técnico, estadísticas completas de la temporada y un diseño visual personalizado con los colores y símbolos rojiblancos.</p>
<h3>Una experiencia única para los atléticos</h3>
<p>PC Atlético de Madrid 2000 ofrecía a los seguidores colchoneros la oportunidad de dirigir uno de los clubes más históricos del fútbol español utilizando el potente motor de gestión de PC Fútbol 2000. Su combinación de simulación, estrategia y contenido exclusivo lo convirtió en una propuesta muy atractiva para los aficionados del Atlético, y hoy sigue siendo una de las ediciones especiales más curiosas y buscadas por coleccionistas de la saga.</p>
`,
  },

  monsters: {
    name: "Hollywood Monsters",
    year: "1997",
    publisher: "Dinamic Multimedia",
    color: "#c0392b",
    logo: "/assets/monsters-logo.png",
    player: "doswasmx",            // PLATAFORMA DosWasmX (DOSBox-X WASM) - Windows 98
    app: "/doswasmx/index.html",   // app DosWasmX en kiosko; disco+CD en R2 (settings.js)
    desc: `
<p>Hollywood Monsters es una de las aventuras gráficas más emblemáticas de la historia del videojuego español. Desarrollado por Dinamic Multimedia y lanzado en 1997 para PC, el juego se convirtió en una obra de culto gracias a su brillante sentido del humor, sus ingeniosos puzles y una ambientación inspirada en los grandes monstruos del cine clásico.</p>
<p>La aventura comienza durante una convención secreta celebrada en Hollywood, donde los monstruos más famosos del cine se reúnen para debatir su futuro. Lo que parece una tranquila gala pronto se transforma en una compleja conspiración que amenaza a toda la comunidad monstruosa, dando inicio a una historia llena de misterio, humor y personajes inolvidables.</p>
<h3>Características principales</h3>
<ul>
<li>Aventura gráfica clásica de apuntar y hacer clic.</li>
<li>Más de 100 escenarios cuidadosamente ilustrados.</li>
<li>Decenas de personajes inspirados en los monstruos clásicos del cine.</li>
<li>Historia repleta de humor, misterio y referencias cinematográficas.</li>
<li>Puzles variados y desafiantes.</li>
<li>Gráficos dibujados completamente a mano.</li>
<li>Animaciones de gran calidad para la época.</li>
<li>Voces digitalizadas y doblaje en castellano.</li>
<li>Banda sonora original con ambientación cinematográfica.</li>
<li>Gran cantidad de diálogos y situaciones memorables.</li>
</ul>
<h3>Una aventura monstruosamente divertida</h3>
<p>El jugador controla inicialmente a la periodista Sue Bergman, enviada para cubrir una importante reunión de monstruos en Hollywood. Tras una serie de acontecimientos inesperados, la investigación pasa a manos del reportero Ron Ashman, que deberá recorrer multitud de escenarios para descubrir quién se esconde detrás de una peligrosa conspiración.</p>
<p>Durante la aventura se visitan castillos, mansiones encantadas, laboratorios secretos, estudios cinematográficos y muchos otros lugares inspirados en las películas de terror clásicas.</p>
<h3>Un apartado artístico excepcional</h3>
<p>Uno de los mayores atractivos de Hollywood Monsters es su extraordinaria dirección artística. Los escenarios presentan un nivel de detalle sobresaliente y están repletos de pequeños guiños al cine clásico. Las animaciones y el diseño de personajes contribuyen a crear un universo único, lleno de personalidad y humor.</p>
<p>La combinación entre terror clásico, parodia cinematográfica y aventura gráfica dio lugar a una experiencia que todavía hoy mantiene intacto gran parte de su encanto.</p>
<h3>Un clásico imprescindible</h3>
<p>Hollywood Monsters está considerado como una de las mejores aventuras gráficas desarrolladas en España. Su combinación de humor, misterio, personajes inolvidables y una cuidada ambientación lo convirtió en un referente del género y en uno de los mayores éxitos de Dinamic Multimedia.</p>
<p>Más de dos décadas después de su lanzamiento, sigue siendo recordado por miles de jugadores como una obra maestra de la aventura gráfica y uno de los títulos más queridos de la historia del videojuego español.</p>
`,
  },
  justic: {
    name: "Los Justicieros",
    year: "1996",
    publisher: "Dinamic Multimedia",
    color: "#8a5a2b",
    logo: "/assets/justic-logo.png?v=2",
    player: "dosbox",              // PLATAFORMA DOSBOX (js-dos), NO el kiosk v86
    jsdos: "https://discos.dinamicmultimedia.es/justic.bin",        // bundle: JUSTIC/ (install) + CD/ (montado -t cdrom en E:) + .jsdos/dosbox.conf (SB16 IRQ7, machine svga_s3)
    desc: `
<p>Los Justicieros es uno de los videojuegos más originales y recordados de Dinamic Multimedia. Lanzado para PC en 1996, este título de acción trasladaba a los jugadores al Salvaje Oeste mediante una innovadora combinación de vídeo digital con actores reales, ofreciendo una experiencia similar a las máquinas recreativas de disparos de la época.</p>
<p>Inspirado en la recreativa española del mismo nombre, el juego pone al jugador en la piel de un valiente pistolero que deberá enfrentarse a la peligrosa banda de los hermanos Zorton para liberar a un pequeño pueblo de sus abusos. A lo largo de la aventura, se suceden duelos, persecuciones, emboscadas y tiroteos que pondrán a prueba la rapidez y precisión del jugador.</p>
<h3>Características principales</h3>
<ul>
<li>Juego de acción ambientado en el Salvaje Oeste.</li>
<li>Escenas grabadas con actores reales.</li>
<li>Tecnología de vídeo digital a pantalla completa.</li>
<li>Jugabilidad inspirada en las recreativas de pistola.</li>
<li>Duelos y tiroteos en primera persona.</li>
<li>Numerosas secuencias cinematográficas.</li>
<li>Escenarios basados en auténticos decorados del oeste.</li>
<li>Minijuegos adicionales exclusivos para PC.</li>
<li>Ambientación cargada de humor y acción.</li>
<li>Uno de los títulos más singulares de Dinamic Multimedia.</li>
</ul>
<h3>Jugabilidad</h3>
<p>La mecánica principal consiste en disparar a los enemigos antes de que ellos consigan abatir al jugador. Cada escenario presenta diferentes desafíos, obligando a reaccionar rápidamente ante la aparición de forajidos, pistoleros y otros peligros. Además de los enfrentamientos directos, el juego incluye diversas secuencias interactivas y minijuegos que aportan variedad al desarrollo de la aventura.</p>
<h3>Una producción cinematográfica</h3>
<p>Uno de los aspectos más llamativos de Los Justicieros fue su producción. Las escenas fueron rodadas con actores reales en los famosos decorados del desierto de Tabernas, en Almería, localización utilizada durante décadas para numerosas películas del oeste. Gracias a esta apuesta por el vídeo digital, el juego ofrecía una experiencia visual muy avanzada para su época y diferente a la mayoría de títulos disponibles en PC durante los años noventa.</p>
<h3>Novedades y aspectos destacados</h3>
<ul>
<li>Uso de actores reales en todas las secuencias del juego.</li>
<li>Gran cantidad de vídeo digitalizado.</li>
<li>Escenarios inspirados en el cine western clásico.</li>
<li>Animaciones y efectos especiales poco habituales en la época.</li>
<li>Combinación de acción arcade y aventura interactiva.</li>
<li>Adaptación para PC de una popular recreativa española.</li>
<li>Desarrollo sencillo y accesible para todo tipo de jugadores.</li>
</ul>
<h3>Un clásico del videojuego español</h3>
<p>Los Justicieros se convirtió en una de las propuestas más originales de Dinamic Multimedia gracias a su mezcla de cine interactivo, humor y acción del Oeste. Aunque muy diferente de las exitosas sagas deportivas de la compañía, el juego logró hacerse un hueco entre los aficionados al software español y hoy es considerado una pieza de culto dentro de la historia de los videojuegos desarrollados en España. Su innovadora utilización de actores reales y su peculiar ambientación hacen que continúe siendo recordado como uno de los títulos más singulares de los años noventa.</p>
`,
  },

  pcf6arg: {
    name: "PC Fútbol 6.0 · Apertura '98 (Argentina)",
    year: "1998",
    publisher: "Dinamic Multimedia",
    color: "#75aadb",
    logo: "/assets/pcf6arg-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcf6arg.bin", size: 523837440 },   // Win98 motor PCF6
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pcf6arg_data.bin", size: 429496320 },   // disco slim 410MB: D:\PCF6A
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCF6ARG.bin",       size: 690288640 },   // CD montado en runtime (E:)
    state: { url: "/pcf6arg_state.bin?v=5" },                         // PENDIENTE capturar
    gameDir: "PCF6A",               // 8.3 OK (≤8 chars)
    saveWholeDir: true,             // persistir TODA la carpeta PCF6A (TACTICS + ACTLIGA + raíz)
    desc: `
<p>PC Fútbol 6.0 Apertura '98 fue la adaptación argentina de PC Fútbol 6.0, con equipos, jugadores y competiciones del fútbol argentino. Lanzado en 1998, incorporó importantes mejoras y aprovechó la evolución técnica de la saga para ofrecer una experiencia más completa y realista.</p>
<p>El jugador asumía el control total de su club como presidente, entrenador y director deportivo: fichajes, planificación económica, tácticas y desarrollo de la plantilla, en una de las ligas más competitivas del mundo.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión integral de clubes del fútbol argentino.</li>
<li>Plantillas y datos actualizados para la temporada 1998.</li>
<li>Simulación de partidos mejorada y más realista.</li>
<li>Mercado de fichajes con negociaciones avanzadas.</li>
<li>Control completo de tácticas, alineaciones y entrenamientos.</li>
<li>Gestión económica detallada del club.</li>
<li>Amplia base de datos de jugadores y equipos argentinos.</li>
<li>Estadísticas avanzadas de futbolistas y competiciones.</li>
<li>Seguimiento completo de resultados, clasificaciones y calendarios.</li>
<li>Interfaz renovada y más intuitiva.</li>
</ul>
<h3>Novedades principales</h3>
<ul>
<li>Nuevo motor de simulación de partidos respecto a la versión anterior.</li>
<li>Inteligencia artificial mejorada para equipos y jugadores.</li>
<li>Sistema de fichajes más profundo y competitivo.</li>
<li>Mayor realismo en la evolución y rendimiento de los futbolistas.</li>
<li>Estadísticas más completas para el análisis deportivo.</li>
<li>Mejoras en la gestión económica y financiera.</li>
<li>Interfaz modernizada y optimización general del rendimiento.</li>
<li>Actualización de plantillas, equipos y competiciones argentinas.</li>
</ul>
<h3>Modos de juego</h3>
<p><b>Manager:</b> controla todos los aspectos del club, de la economía a la planificación deportiva.</p>
<p><b>Entrenador:</b> centrado en la preparación de los encuentros, la estrategia táctica y la dirección del equipo.</p>
<p><b>Temporada completa:</b> disputa el campeonato completo gestionando la plantilla jornada tras jornada.</p>
<p><b>Simulación de partidos:</b> sigue los encuentros con el simulador gráfico.</p>
<h3>La evolución definitiva del PC Fútbol argentino</h3>
<p>PC Fútbol 6.0 Apertura '98 representó la madurez de la saga en Argentina, con una experiencia de gestión más profunda y realista que nunca. Para muchos aficionados, una de las mejores versiones argentinas de la serie, combinando la pasión del fútbol local con la fórmula que convirtió a PC Fútbol en un fenómeno internacional.</p>
`,
  },

  pcf5arg: {
    name: "PC Fútbol 5.0 · Apertura '97 (Argentina)",
    year: "1997",
    publisher: "Dinamic Multimedia",
    color: "#75aadb",
    logo: "/assets/pcf5-logo.png?v=2",   // reutiliza el logo de PC Fútbol 5.0
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcf5arg.bin", size: 523837440 },   // Win98 motor PCF5, juego en C:\PCF5A
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCF5ARG.bin",       size: 401160192 },   // CD montado en runtime (E:)
    state: { url: "/pcf5arg_state.bin" },                         // PENDIENTE capturar (install en C:)
    gameDir: "PCF5A",               // juego en C:\PCF5A (nombre 8.3, sin LFN)
    saveDisk: "hda",                // juego y partidas en C: (hda)
    fat: "fat16",                   // C: es FAT16
    saveWholeDir: true,             // persistir TODA la carpeta PCF5A (TACTICS + ACTLIGA + raíz)
    desc: `
<p>PC Fútbol 5.0 Apertura '97 fue la adaptación argentina del exitoso PC Fútbol 5.0 de Dinamic Multimedia. Lanzado en 1997, el juego trasladó al fútbol argentino todas las mejoras introducidas en la quinta entrega de la saga, permitiendo a los aficionados gestionar sus equipos favoritos y competir en uno de los campeonatos más apasionantes del mundo.</p>
<p>Basado en el motor de PC Fútbol 5.0, esta edición incorporaba los clubes, jugadores y competiciones argentinas de la temporada 1997/98, ofreciendo una experiencia completamente localizada. El jugador podía asumir el papel de presidente, entrenador y director deportivo, tomando todas las decisiones para llevar a su equipo a la gloria.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión completa de clubes del fútbol argentino.</li>
<li>Plantillas y datos actualizados para el Torneo Apertura 1997.</li>
<li>Simulación de partidos en tiempo real.</li>
<li>Mercado de fichajes y negociaciones entre clubes.</li>
<li>Gestión económica y deportiva del equipo.</li>
<li>Control total sobre alineaciones, tácticas y entrenamientos.</li>
<li>Amplia base de datos de jugadores argentinos.</li>
<li>Estadísticas detalladas de futbolistas y competiciones.</li>
<li>Seguimiento de resultados, clasificaciones y calendarios.</li>
<li>Interfaz adaptada al público argentino.</li>
</ul>
<h3>Novedades respecto a Apertura '96</h3>
<ul>
<li>Motor de simulación mejorado.</li>
<li>Mayor profundidad táctica durante los encuentros.</li>
<li>Sistema de fichajes más completo y realista.</li>
<li>Mejoras en la inteligencia artificial de los equipos rivales.</li>
<li>Estadísticas ampliadas y más detalladas.</li>
<li>Interfaz más moderna y fácil de utilizar.</li>
<li>Optimización general del rendimiento del juego.</li>
<li>Base de datos actualizada con los movimientos de mercado de la temporada.</li>
</ul>
<h3>Modos de juego</h3>
<p><b>Manager:</b> permite gestionar todos los aspectos del club, desde la planificación deportiva hasta la economía de la institución.</p>
<p><b>Entrenador:</b> modo centrado en la preparación de los partidos, las tácticas y la dirección del equipo durante la temporada.</p>
<p><b>Temporada completa:</b> disputa el campeonato completo, luchando por el título y mejorando progresivamente la plantilla.</p>
<h3>El fútbol argentino en estado puro</h3>
<p>PC Fútbol 5.0 Apertura '97 supuso una evolución importante respecto a la edición Apertura '96, incorporando muchas de las mejoras que habían convertido a PC Fútbol 5.0 en un éxito en España. La pasión de las hinchadas, la competitividad de los clubes argentinos y una completa base de datos hicieron de esta versión una de las más apreciadas por los aficionados sudamericanos. Hoy sigue siendo una de las ediciones internacionales más recordadas de la saga PC Fútbol.</p>
`,
  },

  pcfa96: {
    name: "PC Fútbol 4.0 · Apertura '96 (Argentina)",
    year: "1996",
    publisher: "Dinamic Multimedia",
    color: "#75aadb",
    logo: "/assets/pcfa96-logo.png?v=3",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/pcfa96_boot.bin", size: 523837440 },   // MS-DOS DOS/4GW, juego en C:\FUTBOL4A
    state: { url: "/pcfa96_state.bin" },                   // PENDIENTE capturar
    gameDir: "FUTBOL4A",
    saveDisk: "hda",
    fat: "fat16",
    saveWholeDir: true,
    dosKiosk: true,
    desc: `
<p>PC Fútbol 4.0 Apertura '96 Argentina fue la adaptación oficial para el mercado argentino del exitoso PC Fútbol 4.0 de Dinamic Multimedia. Lanzado en 1996, el juego trasladó la reconocida fórmula de gestión futbolística al apasionante fútbol argentino, permitiendo a los aficionados dirigir clubes de Primera División y competir por el Torneo Apertura y las principales competiciones nacionales.</p>
<p>Manteniendo la esencia que había convertido a PC Fútbol en un fenómeno en España, esta edición incorporó equipos, jugadores, estadios y competiciones del fútbol argentino, ofreciendo una experiencia especialmente diseñada para los seguidores del deporte en el país.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión completa de clubes del fútbol argentino.</li>
<li>Plantillas y datos actualizados para la temporada Apertura 1996.</li>
<li>Simulación de partidos en tiempo real.</li>
<li>Control de alineaciones, tácticas y estrategias.</li>
<li>Mercado de fichajes y negociaciones entre clubes.</li>
<li>Gestión económica de la institución.</li>
<li>Estadísticas detalladas de jugadores y equipos.</li>
<li>Clasificaciones, calendarios y resultados actualizados.</li>
<li>Participación en competiciones nacionales.</li>
<li>Interfaz adaptada al mercado argentino.</li>
</ul>
<h3>Modos de juego</h3>
<p><b>Manager:</b> permite asumir el control total de un club, tomando decisiones deportivas y económicas para llevar al equipo a la conquista del campeonato.</p>
<p><b>Simulación de partidos:</b> los encuentros pueden seguirse mediante el simulador gráfico, observando el desarrollo de las jugadas y el rendimiento de los futbolistas.</p>
<p><b>Temporada completa:</b> el jugador puede disputar el campeonato completo gestionando todos los aspectos de su equipo a lo largo de la temporada.</p>
<h3>Novedades y adaptación argentina</h3>
<ul>
<li>Inclusión de los principales clubes del fútbol argentino.</li>
<li>Base de datos adaptada a los jugadores y plantillas de la época.</li>
<li>Competiciones y formato de campeonato propios de Argentina.</li>
<li>Estadísticas y rendimiento ajustados al fútbol local.</li>
<li>Localización completa para el público argentino.</li>
<li>Conservación de todas las mejoras introducidas en PC Fútbol 4.0.</li>
</ul>
<h3>La llegada de PC Fútbol a Argentina</h3>
<p>PC Fútbol 4.0 Apertura '96 Argentina representó uno de los proyectos internacionales más destacados de Dinamic Multimedia. Gracias a la enorme pasión que despierta el fútbol en Argentina, esta edición permitió a miles de aficionados disfrutar de la experiencia de gestionar sus clubes favoritos utilizando el motor de juego que había triunfado en España. Hoy en día es una de las versiones más curiosas y buscadas por coleccionistas de la saga PC Fútbol.</p>
`,
  },

  pccalcio: {
    name: "PC Calcio 4.0",
    year: "1996",
    publisher: "Dinamic Multimedia",
    color: "#0064a8",
    logo: "/assets/pccalcio-logo.png?v=2",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/pccalcio_boot.bin", size: 523837440 },   // MS-DOS DOS/4GW, juego en C:\CALCIO4
    state: { url: "/pccalcio_state.bin" },                   // PENDIENTE capturar
    gameDir: "CALCIO4",
    saveDisk: "hda",                 // juego y partidas en C: (hda)
    fat: "fat16",                    // C: es FAT16
    saveWholeDir: true,              // persistir toda la carpeta CALCIO4 (como PCF4)
    dosKiosk: true,                  // al salir vuelve al prompt DOS -> recargar snapshot
    desc: `
<p>PC Calcio 4.0 è la versione italiana della celebre serie spagnola PC Fútbol, sviluppata da Dinamic Multimedia per il mercato italiano. Pubblicato a metà degli anni '90, il gioco portò in Italia una delle esperienze di gestione calcistica più complete e apprezzate dell'epoca, consentendo ai giocatori di prendere il controllo di squadre appartenenti alle principali categorie del calcio italiano.</p>
<p>Grazie alla combinazione di gestione sportiva, strategia e simulazione delle partite, PC Calcio 4.0 permetteva di assumere il ruolo di presidente, allenatore e direttore sportivo, occupandosi di trasferimenti, tattiche, allenamenti, finanze e sviluppo della squadra.</p>
<h3>Caratteristiche principali</h3>
<ul>
<li>Gestione completa di club calcistici italiani.</li>
<li>Ampio database con squadre e giocatori aggiornati.</li>
<li>Simulazione delle partite in tempo reale.</li>
<li>Mercato dei trasferimenti con trattative tra club.</li>
<li>Controllo delle formazioni e delle tattiche.</li>
<li>Gestione economica della società.</li>
<li>Statistiche dettagliate di giocatori e competizioni.</li>
<li>Classifiche, calendari e risultati aggiornati.</li>
<li>Partecipazione a campionati e coppe nazionali e internazionali.</li>
<li>Interfaccia completamente adattata al pubblico italiano.</li>
</ul>
<h3>Modalità di gioco</h3>
<p><b>Manager:</b> la modalità principale consente di gestire ogni aspetto del club, dalle decisioni sportive a quelle economiche, con l'obiettivo di costruire una squadra vincente.</p>
<p><b>Simulazione delle partite:</b> le partite possono essere seguite attraverso un simulatore grafico che mostra l'andamento degli incontri e le prestazioni dei giocatori.</p>
<p><b>Campionati e Coppe:</b> è possibile disputare stagioni complete nelle principali categorie del calcio italiano e competere nei più prestigiosi tornei nazionali e internazionali.</p>
<h3>Novità di PC Calcio 4.0</h3>
<ul>
<li>Simulatore di partite migliorato rispetto alle versioni precedenti.</li>
<li>Interfaccia grafica più moderna e intuitiva.</li>
<li>Database ampliato con un maggior numero di squadre e giocatori.</li>
<li>Statistiche più complete e dettagliate.</li>
<li>Intelligenza artificiale degli avversari migliorata.</li>
<li>Maggiore profondità nella gestione sportiva ed economica.</li>
<li>Prestazioni generali e stabilità del gioco ottimizzate.</li>
</ul>
<h3>Un classico del calcio manageriale</h3>
<p>PC Calcio 4.0 rappresentò uno dei più importanti tentativi di Dinamic Multimedia di espandere il successo di PC Fútbol oltre i confini spagnoli. Grazie alla sua profondità gestionale, all'ampio database e alla passione che gli italiani nutrono per il calcio, il gioco conquistò numerosi appassionati del genere manageriale. Ancora oggi è ricordato come uno dei titoli più interessanti della storia dei manager calcistici degli anni '90 e come una curiosa ma importante parte dell'eredità lasciata da Dinamic Multimedia.</p>
`,
  },

  pcbasket: {
    name: "PC Basket 4.0",
    year: "1996",
    publisher: "Dinamic Multimedia",
    color: "#d35400",
    logo: "/assets/pcbasket-logo.png?v=2",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/pcbasket45_boot.bin", size: 523837440 },   // MS-DOS puro (DOS/4GW) + juego en C:\BASKET45 (sin hdb/cdrom, sin protección de CD)
    state: { url: "/pcbasket_state.bin?v=2" },                 // ?v=N para saltar la caché immutable de Cloudflare al recapturar
    gameDir: "BASKET45",
    saveDisk: "hda",                 // el juego y sus partidas viven en C: (hda)
    fat: "fat16",                    // C: es FAT16
    saveWholeDir: true,              // persistir toda la carpeta BASKET45 (guarda en SAVE/SAVE1-4/TACTICS/NOTAS)
    dosKiosk: true,                  // al salir vuelve al prompt DOS (modo texto) -> recargar snapshot
    desc: `
<p>PC Basket 4.0 fue una de las entregas más exitosas de la saga de baloncesto de Dinamic Multimedia. Lanzado en 1996 para PC, el juego supuso un importante salto adelante en la simulación y gestión deportiva, consolidando a la franquicia como una de las referencias del baloncesto en el software español.</p>
<p>El jugador podía asumir el control total de un equipo, gestionando fichajes, tácticas, alineaciones y economía mientras competía en las principales ligas nacionales e internacionales. Gracias a su extensa base de datos y a sus completas estadísticas, PC Basket 4.0 ofrecía una experiencia profunda tanto para aficionados al baloncesto como para amantes de los juegos de estrategia deportiva.</p>
<h3>Características principales</h3>
<ul>
<li>Gestión completa de equipos de baloncesto.</li>
<li>Amplia base de datos de jugadores, clubes y competiciones.</li>
<li>Simulación gráfica de los partidos en tiempo real.</li>
<li>Control de fichajes, renovaciones y planificación deportiva.</li>
<li>Estadísticas detalladas de jugadores y equipos.</li>
<li>Gestión de plantillas, quintetos y rotaciones.</li>
<li>Participación en competiciones nacionales e internacionales.</li>
<li>Seguimiento de clasificaciones, resultados y récords.</li>
<li>Interfaz renovada respecto a entregas anteriores.</li>
<li>Mayor profundidad táctica y estratégica.</li>
</ul>
<h3>Modos de juego</h3>
<p><b>Manager:</b> el modo principal permite dirigir todos los aspectos de un club de baloncesto, desde la confección de la plantilla hasta la gestión deportiva y económica de la entidad.</p>
<p><b>Simulación de partidos:</b> los encuentros pueden seguirse mediante un simulador gráfico que muestra el desarrollo de las jugadas y permite observar el rendimiento de los jugadores durante el partido.</p>
<p><b>Competiciones:</b> incluye las principales ligas y torneos de la época, ofreciendo la posibilidad de disputar temporadas completas y luchar por los títulos más importantes.</p>
<h3>Un referente del baloncesto de los años 90</h3>
<p>PC Basket 4.0 representó la madurez de una saga que había logrado trasladar con éxito la emoción del baloncesto profesional al ordenador. Su combinación de gestión, estrategia y simulación deportiva conquistó a miles de jugadores y lo convirtió en uno de los títulos más recordados de Dinamic Multimedia. A día de hoy sigue siendo considerado uno de los grandes clásicos del baloncesto para PC y una pieza fundamental en la historia del videojuego deportivo español.</p>
`,
  },

  pcbasket65: {
    name: "PC Basket 6.5",
    year: "1999",
    publisher: "Dinamic Multimedia",
    color: "#5b7089",
    logo: "/assets/pcbasket65-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcb65.bin",      size: 523837440 },   // Win98 (motor PC Fútbol 6.0, ddraw)
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pcb65_data.bin", size: 536870912 },   // disco slim 512MB: juego en D:\PCB65
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCB65.bin",            size: 691337216 },   // CD montado en runtime (E:)
    state: { url: "/pcbasket65_state.bin" },                  // en el ORIGEN (servido gzip)
    gameDir: "PCB65",                       // carpeta del juego en D: (lanzador PCB6.EXE)
    saveDirs: ["TACTICS", "NOTAS", "PLAYERS", "DBDAT"],   // motor PCF6: refinar tras ver dónde escribe la partida
    desc: `
<p>PC Basket 6.0 fue la última gran entrega de la histórica saga de baloncesto de Dinamic Multimedia. Lanzado en 1998 para PC, el juego llevó la gestión deportiva y la simulación de baloncesto a un nuevo nivel, ofreciendo una experiencia más completa, profunda y realista que sus predecesores. Esta es la actualización <b>PC Basket 6.5</b> (temporada 1998/99), que mantiene intacto el motor pero pone al día plantillas, fichajes, estadísticas y competiciones.</p>
<p>El jugador podía asumir el control total de un club, gestionando fichajes, tácticas, entrenamientos, economía y cantera mientras competía en las principales ligas nacionales e internacionales. Gracias a una base de datos ampliada y a importantes mejoras técnicas, está considerada por muchos aficionados como la versión más completa y madura de la saga.</p>
<h3>Novedades principales</h3>
<ul>
<li>Nuevo motor de simulación de partidos con animaciones más fluidas.</li>
<li>Mejora significativa de la inteligencia artificial de jugadores y equipos.</li>
<li>Base de datos ampliada con cientos de equipos y miles de jugadores.</li>
<li>Estadísticas mucho más completas y detalladas.</li>
<li>Gestión económica más profunda y realista.</li>
<li>Mayor control sobre entrenamientos, tácticas y rotaciones.</li>
<li>Simulación más precisa del rendimiento de los jugadores.</li>
<li>Interfaz renovada y más intuitiva.</li>
<li>Mejoras gráficas en los partidos y en las pantallas de gestión.</li>
<li>Participación en competiciones nacionales e internacionales.</li>
</ul>
<h3>Modos de juego</h3>
<p><b>Manager:</b> permite controlar todos los aspectos de un club de baloncesto, desde la planificación deportiva hasta la gestión económica.</p>
<p><b>Simulación de partidos:</b> los encuentros pueden seguirse mediante un simulador visual mejorado que muestra las jugadas y acciones de los jugadores en tiempo real.</p>
<p><b>Competiciones:</b> incluye las principales ligas y torneos de la época, permitiendo disputar temporadas completas y competir por los títulos más importantes.</p>
<h3>El punto culminante de la saga</h3>
<p>PC Basket 6.0 y su actualización 6.5 representaron el momento de máxima madurez de la franquicia. Su combinación de gestión profunda, simulación avanzada y una enorme base de datos los convirtió en una referencia para los aficionados al baloncesto durante los años noventa, y siguen siendo recordados como las entregas más completas de la saga y como algunos de los mejores juegos de gestión deportiva desarrollados en España.</p>
`,
  },

  pcf4: {
    name: "PC Fútbol 4.0",
    year: "1995",
    publisher: "Dinamic Multimedia",
    color: "#0f3a5f",
    logo: "/assets/pcf4-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/pcf4_disq.bin", size: 523837440 },   // MS-DOS puro + juego en C:\FUTBOL4 (sin hdb/cdrom)
    state: { url: "/pcf4_state.bin?v=2" },
    gameDir: "FUTBOL4",
    saveDisk: "hda",                 // el juego (y sus partidas) viven en C: (hda), no en D:
    fat: "fat16",                    // C: es FAT16 (parser distinto a FAT32)
    saveWholeDir: true,              // PCF4 guarda en varios .DAT de su carpeta -> persistir todo C:\FUTBOL4
    dosKiosk: true,                  // al salir vuelve al prompt DOS (modo texto) -> detectar por graphical_mode y recargar snapshot
    desc: `
<p>PC Fútbol 4.0 es una de las entregas más importantes en la evolución de la legendaria saga de gestión futbolística de Dinamic Multimedia. Lanzado en 1995 para PC, supuso un gran avance respecto a sus predecesores y ayudó a establecer las bases que convertirían a PC Fútbol en un fenómeno entre los aficionados al deporte rey.</p>
<p>La combinación de simulación deportiva, gestión económica y estrategia permitió a los jugadores tomar el control de un club de fútbol y dirigirlo hacia el éxito, gestionando fichajes, alineaciones, tácticas y recursos económicos mientras competían en las distintas competiciones nacionales.</p>
<h3>Novedades principales de PC Fútbol 4.0</h3>
<ul>
<li>Importante renovación de la interfaz gráfica respecto a versiones anteriores.</li>
<li>Sistema de gestión más completo y accesible para los usuarios.</li>
<li>Mejora del simulador de partidos, con encuentros más realistas y variados.</li>
<li>Base de datos ampliada con más equipos, jugadores y estadísticas.</li>
<li>Nuevas opciones tácticas para personalizar el estilo de juego del equipo.</li>
<li>Mayor profundidad en la gestión económica del club.</li>
<li>Estadísticas detalladas de jugadores, plantillas y competiciones.</li>
<li>Mejoras en el mercado de fichajes y en las negociaciones.</li>
<li>Mayor estabilidad y rendimiento general del juego.</li>
<li>Actualización de equipos y plantillas para la temporada 1995/96.</li>
</ul>
<h3>Modos de juego</h3>
<ul>
<li>Gestión completa de un club como mánager y presidente.</li>
<li>Participación en ligas y competiciones nacionales.</li>
<li>Simulación de temporadas completas.</li>
<li>Partidos amistosos y desafíos personalizados.</li>
</ul>
<p>El jugador podía asumir el control de equipos de distintas categorías y tratar de llevarlos a lo más alto mediante una correcta planificación deportiva y económica.</p>
<h3>El nacimiento de un referente</h3>
<p>PC Fútbol 4.0 marcó el inicio de la etapa dorada de la saga. Gracias a sus mejoras jugables, su enorme base de datos y su innovadora combinación de gestión y simulación, consiguió atraer a miles de aficionados y consolidó a PC Fútbol como la referencia de los managers futbolísticos en España durante la década de los 90. Muchos de los elementos que hicieron famosa a la saga en sus versiones posteriores tuvieron su origen en esta entrega, que sigue siendo recordada como uno de los clásicos imprescindibles del fútbol para PC.</p>
`,
  },

  pcf5: {
    name: "PC Fútbol 5.0",
    year: "1996",
    publisher: "Dinamic Multimedia",
    color: "#16466e",
    logo: "/assets/pcf5-logo.png?v=2",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcf5.bin",      size: 523837440 },
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pcf5_data.bin", size: 536870912 },
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCF5.bin",            size: 447692800 },
    state: { url: "/pcf5_state.bin" },
    gameDir: "FUT5ORO",                          // carpeta del juego en D: (nombre corto 8.3)
    saveDirs: ["TACTICS", "NOTAS", "PLAYERS", "DBDAT"],  // a refinar tras probar dónde escribe la partida
    desc: `
<p>PC Fútbol 5.0 es una de las entregas más influyentes y queridas de la histórica saga de simulación y gestión futbolística creada por Dinamic Multimedia. Lanzado en 1996 para PC, el juego consolidó definitivamente el éxito de la franquicia al combinar estrategia, gestión deportiva y simulación de partidos en una experiencia accesible y tremendamente adictiva.</p>
<p>En PC Fútbol 5.0 el jugador podía convertirse en presidente, entrenador y mánager de un club de fútbol, tomando decisiones sobre fichajes, tácticas, entrenamientos, economía y planificación deportiva mientras competía en ligas y torneos nacionales e internacionales.</p>
<h3>Novedades principales de PC Fútbol 5.0</h3>
<ul>
<li>Motor de partidos mejorado, con una simulación de encuentros más dinámica y realista que en entregas anteriores.</li>
<li>Gestión económica más profunda: equilibrar ingresos, gastos, fichajes y salarios para mantener saneado el club.</li>
<li>Sistema de fichajes ampliado, con negociaciones más complejas y mayor variedad de jugadores en el mercado.</li>
<li>Nuevas opciones tácticas: más control sobre alineaciones, estrategias y estilo de juego del equipo.</li>
<li>Base de datos actualizada con equipos, plantillas y competiciones de la temporada 1996/97.</li>
<li>Interfaz renovada, con menús más claros e intuitivos para acceder a toda la información del club.</li>
<li>Mayor profundidad estadística sobre jugadores, equipos y competiciones.</li>
<li>Mejoras gráficas y sonoras, con una presentación más cuidada y atractiva para la época.</li>
</ul>
<h3>Modos de juego</h3>
<ul>
<li><b>Liga Manager</b>, con la gestión completa de un club.</li>
<li><b>Pro Manager</b>, enfocado en la faceta deportiva y táctica.</li>
<li>Competiciones nacionales e internacionales.</li>
<li>Partidos amistosos y simulaciones rápidas.</li>
</ul>
<p>El juego permitía dirigir equipos de las principales ligas europeas, ofreciendo una experiencia muy completa para los aficionados al fútbol.</p>
<h3>Un clásico que marcó época</h3>
<p>PC Fútbol 5.0 fue el título que convirtió a la saga en un fenómeno cultural en España. Su mezcla de profundidad estratégica, facilidad de uso y pasión por el fútbol enganchó a miles de jugadores y sentó las bases de las entregas posteriores. A día de hoy sigue siendo recordado como uno de los grandes clásicos de los managers de fútbol para PC.</p>
`,
  },

  pcf7: {
    name: "PC Fútbol 7.0",
    year: "1998",
    publisher: "Dinamic Multimedia",
    color: "#0a3d62",
    logo: "/assets/pcf7-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcf7.bin?v=2",  size: 523837440 },
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pcf7_data.bin", size: 1073741824 },
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCF7.bin",            size: 691337216 },
    state: { url: "/pcf7_state.bin?v=4" },
    gameDir: "FUTBOL7",              // carpeta del juego en D:
    saveDirs: ["SAVE", "TACTICS"],   // carpetas (bajo FUTBOL7) que persistimos: partidas y tácticas
    desc: `
<p>PC Fútbol 7.0 es uno de los videojuegos de gestión futbolística más emblemáticos de la historia del software español. Desarrollado por Dinamic Multimedia y lanzado en 1998 para PC, permitió a los aficionados asumir el control total de un club de fútbol, gestionando fichajes, tácticas, economía, cantera, estadio y competiciones nacionales e internacionales.</p>
<p>Considerado por muchos como la entrega más exitosa de la saga, PC Fútbol 7.0 supuso una importante evolución respecto a versiones anteriores gracias a numerosas mejoras técnicas y jugables que ampliaron la experiencia de gestión deportiva.</p>
<h3>Novedades principales de PC Fútbol 7.0</h3>
<ul>
<li>Nuevo simulador de partidos con una representación más dinámica y detallada de los encuentros.</li>
<li>Sistema de construcción y ampliación de estadios mediante módulos, permitiendo personalizar las instalaciones del club.</li>
<li>Evolución de los jugadores a lo largo de las temporadas, mejorando o empeorando según su rendimiento y edad.</li>
<li>Inteligencia artificial mejorada para los equipos controlados por la CPU.</li>
<li>Base de datos completamente actualizada para la temporada 1998/99.</li>
<li>Mayor profundidad en la gestión económica, incluyendo patrocinadores, ingresos y gastos del club.</li>
<li>Mercado de fichajes más realista y competitivo.</li>
<li>Nuevas opciones tácticas y estratégicas para adaptar el estilo de juego del equipo.</li>
<li>Mejoras gráficas en menús, estadísticas y simulaciones de partidos.</li>
<li>Mayor estabilidad y rendimiento general respecto a entregas anteriores.</li>
</ul>
<h3>Modos de juego</h3>
<p>PC Fútbol 7.0 ofrecía varios modos de juego para adaptarse a todo tipo de jugadores:</p>
<ul>
<li><b>Liga Manager</b>, donde el usuario gestionaba todos los aspectos de un club.</li>
<li><b>Pro Manager</b>, centrado en la figura del entrenador.</li>
<li><b>Euro PC Fútbol</b>, para competir a nivel continental.</li>
<li>Competiciones personalizadas y desafíos especiales.</li>
</ul>
<p>Además, permitía dirigir equipos de las principales ligas europeas, incluyendo España, Inglaterra, Italia, Francia y Alemania.</p>
<h3>Un clásico de los managers de fútbol</h3>
<p>Gracias a su equilibrio entre profundidad, accesibilidad y enorme base de datos, PC Fútbol 7.0 se convirtió en un fenómeno de ventas y en un referente para toda una generación de aficionados al fútbol. Más de dos décadas después de su lanzamiento, sigue siendo recordado como una de las mejores entregas de la saga y uno de los videojuegos de gestión deportiva más influyentes jamás desarrollados en España.</p>
`,
  },

  pcf6: {
    name: "PC Fútbol 6.0",
    year: "1997",
    publisher: "Dinamic Multimedia",
    color: "#123c6b",
    logo: "/assets/pcf6-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_pcf6.bin",      size: 523837440 },
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_pcf6_data.bin", size: 751619072 },
    cdrom: { url: "https://discos.dinamicmultimedia.es/PCF6.bin",        size: 671795200 },
    state: { url: "/pcf6_state.bin?v=2" },
    gameDir: "FUTBOL6",
    saveDirs: ["TACTICS", "ACTLIGA", "NOTAS", "SAVE"],   // PCF6 guarda en TACTICS\manager.000 (+ manager.ini/sip.ini en la raíz, capturados aparte)
    desc: `
<p>PC Fútbol 6.0 es uno de los títulos más recordados de la histórica saga de simulación y gestión futbolística desarrollada por Dinamic Multimedia. Lanzado en 1997 para PC, el juego consolidó la fórmula que convertiría a la serie en un fenómeno de masas, permitiendo al jugador gestionar todos los aspectos de un club de fútbol mientras compite en las principales ligas nacionales e internacionales.</p>
<p>Con una combinación única de estrategia, gestión deportiva y simulación de partidos, PC Fútbol 6.0 ofrecía la posibilidad de dirigir equipos de distintas categorías, controlar fichajes, entrenamientos, finanzas, alineaciones y tácticas, además de disputar las competiciones más importantes del panorama futbolístico.</p>
<h3>Novedades principales de PC Fútbol 6.0</h3>
<ul>
<li>Nuevo motor de simulación de partidos más avanzado y realista.</li>
<li>Incorporación de la gestión detallada de las instalaciones del club.</li>
<li>Mejoras significativas en la inteligencia artificial de los equipos rivales.</li>
<li>Base de datos ampliada con miles de jugadores y equipos actualizados para la temporada 1997/98.</li>
<li>Sistema de fichajes y negociaciones más completo.</li>
<li>Mayor control sobre la economía del club y la planificación a largo plazo.</li>
<li>Interfaz renovada, más intuitiva y accesible para nuevos jugadores.</li>
<li>Estadísticas más completas de jugadores, equipos y competiciones.</li>
<li>Mejoras gráficas en la visualización de los encuentros y en los menús del juego.</li>
<li>Optimización general del rendimiento y la estabilidad.</li>
</ul>
<h3>Modos de juego</h3>
<p>PC Fútbol 6.0 incluía diferentes formas de disfrutar de la experiencia futbolística:</p>
<ul>
<li><b>Liga Manager</b>, donde el jugador controlaba todos los aspectos de un club.</li>
<li><b>Pro Manager</b>, enfocado principalmente en la faceta deportiva y táctica.</li>
<li>Competiciones nacionales e internacionales.</li>
<li>Partidos amistosos y modos de simulación rápida.</li>
</ul>
<p>Además, permitía gestionar equipos de las principales ligas europeas, ofreciendo una experiencia muy completa para los aficionados al fútbol y a la estrategia.</p>
<h3>Un paso decisivo para la saga</h3>
<p>PC Fútbol 6.0 supuso un importante salto de calidad dentro de la franquicia y sentó muchas de las bases que posteriormente perfeccionaría PC Fútbol 7.0. Su equilibrio entre profundidad de gestión, facilidad de uso y diversión lo convirtió en uno de los juegos más populares de su época y en un clásico imprescindible para los amantes de los managers de fútbol.</p>
`,
  },

  euro96: {
    name: "PC Selección Española de Fútbol Eurocopa '96",
    year: "1996",
    publisher: "Dinamic Multimedia",
    color: "#c1121f",
    logo: "/assets/euro96-logo.png?v=3",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/euro96_boot.bin", size: 523837440 },   // MS-DOS puro (DOS/4GW) + juego en C:\EURO96 (sin hdb/cdrom)
    state: { url: "/euro96_state.bin" },
    gameDir: "EURO96",
    saveDisk: "hda",                 // el juego y sus partidas viven en C: (hda)
    fat: "fat16",                    // C: es FAT16
    saveWholeDir: true,              // persistir toda la carpeta EURO96 (no hay subcarpeta SAVE clara)
    dosKiosk: true,                  // al salir vuelve al prompt DOS (modo texto) -> recargar snapshot
    desc: `
<p>PC Selección Española de Fútbol Eurocopa '96 fue un videojuego desarrollado por Dinamic Multimedia con motivo de la participación de España en la Eurocopa de Inglaterra 1996. Lanzado para PC, este título permitía a los aficionados ponerse al mando de la Selección Española y competir en el prestigioso torneo continental, reviviendo la emoción de una de las grandes citas futbolísticas de la época.</p>
<p>Basado en el motor de la saga PC Fútbol, el juego estaba centrado exclusivamente en la selección nacional y ofrecía una experiencia más directa y accesible, orientada a disputar partidos y gestionar convocatorias, alineaciones y tácticas.</p>
<h3>Características principales</h3>
<ul>
<li>Control total de la Selección Española durante la Eurocopa de 1996.</li>
<li>Plantilla oficial de España con los jugadores convocados para el torneo.</li>
<li>Simulación de los partidos del campeonato europeo.</li>
<li>Posibilidad de modificar alineaciones y planteamientos tácticos.</li>
<li>Estadísticas detalladas de jugadores y encuentros.</li>
<li>Interfaz basada en la exitosa fórmula de la saga PC Fútbol.</li>
<li>Recreación de los grupos y eliminatorias de la Eurocopa.</li>
<li>Diferentes niveles de dificultad para adaptarse a todo tipo de jugadores.</li>
</ul>
<h3>Vive la Eurocopa desde el banquillo</h3>
<p>El objetivo del juego era llevar a España hasta la conquista del campeonato europeo, tomando decisiones antes y durante los encuentros para superar a las mejores selecciones del continente. Cada partido exigía una buena preparación táctica y una correcta gestión de la plantilla para avanzar en el torneo.</p>
<p>Los aficionados podían revivir el ambiente de la Eurocopa de Inglaterra 1996 y cambiar la historia intentando mejorar la actuación real de la selección española.</p>
<h3>Un título especial para los aficionados a La Roja</h3>
<p>Aunque menos conocido que las entregas principales de PC Fútbol, PC Selección Española de Fútbol Eurocopa '96 es una pieza muy apreciada por los coleccionistas y seguidores de Dinamic Multimedia. Su enfoque exclusivo en la Selección Española y en uno de los torneos más importantes del fútbol europeo lo convierten en un título único dentro de la historia de los videojuegos deportivos españoles.</p>
<p>Una oportunidad perfecta para volver a ponerse al frente de La Roja y luchar por un título que hizo soñar a toda una generación de aficionados.</p>
`,
  },

  wc98: {
    name: "PC Selección Española de Fútbol Mundial '98",
    year: "1998",
    publisher: "Dinamic Multimedia",
    color: "#9d0208",
    logo: "/assets/wc98-logo.png",
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 32 * 1024 * 1024,
    hda:   { url: "https://discos.dinamicmultimedia.es/win98_wc98.bin",      size: 523837440 },   // Win98 (motor PC Fútbol 6.0)
    hdb:   { url: "https://discos.dinamicmultimedia.es/win98_wc98_data.bin", size: 268435456 },   // disco slim 256MB: juego en D:\PCFSEL98 (+ D:\CAMACHO con el parche)
    cdrom: { url: "https://discos.dinamicmultimedia.es/WC98.bin",            size: 569686016 },   // CD montado en runtime (SIMULDAT.PKF + vídeos opcionales)
    state: { url: "/wc98_state.bin" },                          // PENDIENTE: capturar snapshot tras instalar + parchear
    gameDir: "PCFSEL98",            // carpeta de instalación en D: (lanzador PCSEL98.EXE -> managsel.exe)
    saveDirs: ["TACTICS", "NOTAS", "SAVE"],   // motor PCF6: a refinar tras ver dónde escribe la partida
    desc: `
<p>PC Selección Española de Fútbol Mundial '98 fue una edición especial de la saga PC Fútbol desarrollada por Dinamic Multimedia y lanzada en 1998 con motivo de la Copa del Mundo de Francia. A diferencia de las entregas tradicionales centradas en la gestión de clubes, este título estaba dedicado exclusivamente al fútbol de selecciones nacionales, permitiendo vivir toda la emoción del Mundial desde el banquillo.</p>
<p>El juego incluía una amplia base de datos internacional con jugadores, selecciones, entrenadores y estadios oficiales del torneo. Los jugadores podían disputar el Mundial completo, organizar partidos amistosos o asumir el papel de seleccionador nacional para dirigir a España durante toda la competición.</p>
<h3>Características principales</h3>
<ul>
<li>Recreación de la Copa del Mundo de Francia 1998.</li>
<li>Más de 30 selecciones nacionales con sus plantillas y estadísticas.</li>
<li>Amplia base de datos de jugadores internacionales.</li>
<li>Estadios oficiales del Mundial.</li>
<li>Gestión de convocatorias y alineaciones.</li>
<li>Simulación de partidos con el estilo clásico de la saga PC Fútbol.</li>
<li>Estadísticas detalladas de equipos y futbolistas.</li>
<li>Diferentes niveles de simulación para los encuentros.</li>
<li>Interfaz adaptada al fútbol de selecciones nacionales.</li>
</ul>
<h3>Modos de juego</h3>
<p><b>Mundial 98</b> — Permite disputar la Copa del Mundo completa, desde la fase de grupos hasta la final, eligiendo cualquiera de las selecciones participantes.</p>
<p><b>Seleccionador Nacional</b> — El jugador se convierte en seleccionador de España y puede confeccionar sus propias convocatorias, elegir alineaciones, definir tácticas y dirigir al equipo durante el torneo.</p>
<p><b>Partido Amistoso</b> — Modo rápido para disputar encuentros entre selecciones sin necesidad de jugar una competición completa.</p>
<h3>Una edición especial para los aficionados al Mundial</h3>
<p>PC Selección Española de Fútbol Mundial '98 trasladó la exitosa fórmula de gestión y simulación de PC Fútbol al ámbito de las selecciones nacionales. Gracias a su extensa base de datos internacional y a la posibilidad de disputar el Mundial de Francia 1998 desde diferentes perspectivas, se convirtió en una propuesta muy atractiva para los seguidores de la selección española y de los torneos internacionales.</p>
<p>Aunque fue una edición independiente y más especializada que los títulos principales de la saga, sigue siendo recordada como una de las entregas más curiosas y coleccionables de la época dorada de Dinamic Multimedia.</p>
`,
  },
};
if (typeof module !== "undefined") module.exports = { GAMES };


/* === Anti-mirror Fase 2: firma de URLs de disco con el token rotativo ========
 * Pide a /papi/sign el token actual y reescribe las URLs de discos.dinamicmultimedia.es
 * del juego. v86 usa la URL verbatim (solo anade Range) -> el token llega al edge.
 * Degradacion elegante: si /papi/sign falla, deja las URLs como estan. */
window.DISCOS_BASE = "https://discos.dinamicmultimedia.es/";
window.signDiskURLs = async function (g) {
  try {
    if (!g) return g;
    var base = window.DISCOS_BASE, slots = [], k, d;
    for (k of ["hda", "hdb", "cdrom"]) {
      d = g[k];
      if (d && typeof d.url === "string" && d.url.indexOf(base) === 0)
        slots.push({ file: d.url.slice(base.length).split("?")[0], set: (function (o){ return function (u){ o.url = u; }; })(d) });
    }
    for (k of ["jsdos", "app"]) {
      if (typeof g[k] === "string" && g[k].indexOf(base) === 0)
        slots.push({ file: g[k].split("?")[0].slice(base.length), set: (function (key){ return function (u){ g[key] = u; }; })(k) });
    }
    if (!slots.length) return g;
    var files = Array.from(new Set(slots.map(function (s){ return s.file; })));
    var ctrl = new AbortController(), t = setTimeout(function(){ ctrl.abort(); }, 5000);
    var r = await fetch("/papi/sign?files=" + encodeURIComponent(files.join(",")), { credentials: "same-origin", signal: ctrl.signal });
    clearTimeout(t);
    if (!r.ok) return g;
    var map = await r.json();
    for (var s of slots) { var u = map[s.file]; if (u) s.set(u); }
  } catch (e) { /* deja las URLs originales */ }
  return g;
};

window.signGetToken = async function () {
  try {
    var ctrl = new AbortController(), t = setTimeout(function(){ ctrl.abort(); }, 5000);
    var r = await fetch("/papi/sign?token=1", { credentials: "same-origin", signal: ctrl.signal });
    clearTimeout(t);
    if (!r.ok) return "";
    var m = await r.json();
    return m.k || "";
  } catch (e) { return ""; }
};

window.startHeartbeat = function (gameId) {
  function beat() {
    if (document.visibilityState && document.visibilityState !== "visible") return;
    try {
      fetch("/papi/beat", { method: "POST", credentials: "same-origin", keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game: gameId || "" }) }).catch(function () {});
    } catch (e) {}
  }
  beat();
  setInterval(beat, 30000);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") beat();
  });
};
