# Deployment Atlas: ocho páginas, light/dark y acceso para agentes

La web necesita expresar la dirección profesional de Santiago mediante trabajo
real y una arquitectura que permita explorar su experiencia. Esta propuesta
implementa la dirección A elegida: un mapa asimétrico conectado con páginas
completas de cada caso.

- Reorganiza el sitio en ocho páginas y conserva el copy original, el Sol de
  Mayo y la frase del himno.
- Incorpora conexiones Three.js sobre geometría compartida con SVG. Las líneas
  respetan los límites de las etiquetas. El mapa sigue disponible en móvil;
  la vista de lista requiere una elección explícita.
- Implementa light/dark en todo el sitio, detección del sistema, preferencia
  persistente, sincronización entre pestañas y soporte para almacenamiento
  bloqueado durante la navegación. Cambiar el tema recolorea la escena sin
  reiniciar su animación.
- Mantiene el contenido completo en HTML y Markdown, descubre los recursos en
  llms.txt y sitemap, y conserva las respuestas RSC y prefetch.
- Documenta el producto y sus reglas de mantenimiento para otros agentes.

Validación local: lint, TypeScript, formato y build aprobados; 10 ejecuciones
HTTP aprobadas y seis comprobaciones aisladas de preferencias de tema. Se
revisaron ambos temas, teclado, navegación, recarga y sincronización entre
pestañas en el navegador. El HTML/CSS generado de la portada no presenta
desbordes ni cruces de etiquetas a 320 px con texto al 200 %, en ambos temas.

La suite ampliada tiene 64 ejecuciones. La parte de navegador quedó bloqueada
por la ausencia de Chromium en el entorno; la descarga previa fue denegada.
La animación con GPU también sigue pendiente de validación. CI debe ejecutar
la suite antes del merge. El informe completo está en
`docs/design/2026-09-11-deployment-atlas.md`.

La paleta blanco/cobalto y azul noche/celeste, junto con Instrument Sans y Source
Sans 3, sigue siendo la base provisoria. Verificar la negociación HTTP en el
preview de Vercel antes de producción. Este cambio conserva el hosting actual.
