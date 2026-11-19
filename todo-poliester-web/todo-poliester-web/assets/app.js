/* Todo Poliéster — sitio web. Datos + router por hash + vistas.

   CONFIGURACIÓN RÁPIDA
   - TEMPORADA: 'verano' pone exterior primero; 'invierno' pone interior primero.
   - PALETA: 'piedra' (verde grisáceo) o 'grafito' (pizarra).
*/
const CONFIG = { TEMPORADA: 'verano', PALETA: 'piedra' };
document.documentElement.dataset.pal = CONFIG.PALETA;
const WA = '5493516271738';
const WA_TXT = '351 627 1738';
const waLink = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const CATS = [
  { id: 'exterior', nombre: 'Exterior y pileta', corto: 'Exterior', img: 'patio', lead: 'Colchonetas, almohadones y puffs con telas que aguantan sol y agua.', temporada: 'verano' },
  { id: 'interior', nombre: 'Living y dormitorio', corto: 'Interior', img: 'living', lead: 'Futones, kit de diván y sillones hechos a la medida de tu espacio.', temporada: 'invierno' },
  { id: 'tapiceria', nombre: 'Almohadones y tapicería', corto: 'Tapicería', img: 'capitone', lead: 'La base de nuestro taller: almohadones a medida para sillones, sillas y bancos.', temporada: 'todo' },
  { id: 'cortineria', nombre: 'Cortinería', corto: 'Cortinas', img: null, lead: 'Cortinas a medida para casas, oficinas y comercios.', temporada: 'invierno' },
  { id: 'cerramientos', nombre: 'Toldos y cerramientos', corto: 'Cerramientos', img: 'cerramiento', lead: 'Toldos, cerramientos de lona y cristal, carpas y coberturas.', temporada: 'verano' },
  { id: 'insumos', nombre: 'Media sombra e insumos', corto: 'Insumos', img: 'telas', lead: 'Media sombra, goma espuma, guata, vellón y telgopor, por metro o en plancha.', temporada: 'todo' },
];

const PRODS = [
  { id: 'colchoneta-reposera', cat: 'exterior', nombre: 'Colchonetas para reposera', imgs: ['reposeras', 'patio', 'colchoneta-gris'], dest: true,
    desc: 'Colchonetas de una pieza o articuladas para reposeras de madera, hierro o aluminio. Las hacemos a la medida exacta de tu reposera, con tela de exterior y goma espuma que no se deforma con el uso.',
    medidas: ['Largo total', 'Ancho', 'Espesor (lo común es 5 a 8 cm)', 'Si es articulada: largo del respaldo'],
    telas: ['lona', 'exterior', 'panama'], rellenos: ['D20', 'D24', 'D28'], forma: 'rect' },
  { id: 'camastro', cat: 'exterior', nombre: 'Colchonetas para camastros y sillones de exterior', imgs: ['sillones-ext', 'camastros'], dest: true,
    desc: 'Asientos y respaldos para juegos de jardín, camastros circulares y sillones de galería. Reponemos los almohadones de tu juego aunque no tengas el modelo original.',
    medidas: ['Ancho y profundidad del asiento', 'Alto del respaldo', 'Espesor', 'Si es redondo: diámetro'],
    telas: ['lona', 'exterior'], rellenos: ['D24', 'D28', 'Vellón'], forma: 'rect' },
  { id: 'almohadon-jardin', cat: 'exterior', nombre: 'Almohadones de reposición para juegos de jardín', imgs: ['jardin2'],
    desc: 'Almohadones para muebles de diseño y juegos de exterior. Copiamos la medida y la forma del almohadón original y lo hacemos en la tela que elijas.',
    medidas: ['Medidas del almohadón original', 'Foto del mueble'], telas: ['lona', 'exterior', 'panama'], rellenos: ['Vellón', 'D24'], forma: 'rect' },
  { id: 'puff', cat: 'exterior', nombre: 'Puffs y almohadones de piso', imgs: ['puff'],
    desc: 'Puffs tipo pera, cilindros y almohadones de piso para galerías, quinchos y cuartos de chicos.',
    medidas: ['Forma (pera, cilindro, cuadrado)', 'Medida aproximada'], telas: ['lona', 'tusor'], rellenos: ['Telgopor', 'Vellón'], forma: 'rect' },
  { id: 'futon', cat: 'interior', nombre: 'Colchones de futón', imgs: ['futon', 'futon-ia', 'futon-mostaza'], dest: true,
    desc: 'Colchones de futón de 1, 1½ y 2 plazas con capitoné, para usar como sillón y como cama. También hacemos la funda sola para renovar el que ya tenés.',
    medidas: ['Plazas: 1 (190 × 80), 1½ (190 × 100) o 2 (190 × 140)', 'Espesor (lo común es 15 cm)'], telas: ['chenille', 'panama', 'tusor'], rellenos: ['D24', 'D28', 'Guata'], forma: 'rect' },
  { id: 'kit-divan', cat: 'interior', nombre: 'Kit de diván', imgs: ['divan', 'divan-rojo'], dest: true,
    desc: 'Juego de colchón, respaldos y cilindros para convertir una cama en diván. Lo armamos a la medida de tu cama, en la tela y el color que quieras.',
    medidas: ['Largo y ancho de la cama', 'Cantidad de respaldos', 'Espesor del colchón'], telas: ['chenille', 'panama', 'tusor'], rellenos: ['D24', 'Vellón'], forma: 'rect' },
  { id: 'sillon', cat: 'interior', nombre: 'Sillones y retapizados', imgs: ['living'],
    desc: 'Almohadones de asiento y respaldo para sillones de madera, y retapizado de los que ya tenés. Te asesoramos en la tela según el uso.',
    medidas: ['Medida de cada asiento y respaldo', 'Foto del sillón'], telas: ['chenille', 'panama', 'lino'], rellenos: ['D24', 'Vellón'], forma: 'rect' },
  { id: 'cama-mascota', cat: 'interior', nombre: 'Colchonetas redondas y camas para mascotas', imgs: ['redonda'],
    desc: 'Colchonetas redondas y camas para perros y gatos, con funda que se saca para lavar.',
    medidas: ['Diámetro o largo × ancho', 'Espesor'], telas: ['lona', 'tusor'], rellenos: ['D20', 'Vellón'], forma: 'redondo' },
  { id: 'almohadon-sillon', cat: 'tapiceria', nombre: 'Almohadones para sillón', imgs: ['capitone', 'living'], dest: true,
    desc: 'Almohadones de asiento y respaldo, lisos o con capitoné, para cualquier sillón. Es lo que más hacemos: medida exacta, tela a elección y relleno según el uso.',
    medidas: ['Ancho', 'Profundidad', 'Espesor (10 a 12 cm para asientos)'], telas: ['chenille', 'panama', 'tusor', 'lona'], rellenos: ['Vellón', 'D20', 'D24', 'Solo funda'], forma: 'rect' },
  { id: 'almohadon-silla', cat: 'tapiceria', nombre: 'Almohadones para sillas y bancos', imgs: ['estampados'],
    desc: 'Almohadones finos con tiras para atar, para sillas de comedor, banquetas y bancos de cocina.',
    medidas: ['Ancho', 'Profundidad', 'Espesor (lo común es 4 a 5 cm)', 'Si llevan tiras'], telas: ['tusor', 'panama', 'lona'], rellenos: ['D20', 'Vellón'], forma: 'rect' },
  { id: 'almohadon-redondo', cat: 'tapiceria', nombre: 'Almohadones redondos', imgs: ['redonda'],
    desc: 'Almohadones redondos para sillas, banquetas y sillones de mimbre.', medidas: ['Diámetro', 'Espesor'], telas: ['tusor', 'panama', 'lona'], rellenos: ['Vellón', 'D20'], forma: 'redondo' },
  { id: 'colchoneta-gimnasio', cat: 'tapiceria', nombre: 'Colchonetas para gimnasio', imgs: ['gimnasio'],
    desc: 'Colchonetas plegables y de una pieza para gimnasios, escuelas y consultorios, con cuerina lavable.', medidas: ['Largo', 'Ancho', 'Espesor', 'Cantidad'], telas: ['cuerina', 'lona'], rellenos: ['D24', 'D28'], forma: 'rect' },
  { id: 'cortinas', cat: 'cortineria', nombre: 'Cortinas a medida', imgs: [],
    desc: 'Cortinas para ventanas y puertas de casas, oficinas y comercios. Te ayudamos a elegir la tela según la luz que necesites.', medidas: ['Ancho de la ventana', 'Alto', 'Tipo de barral o riel'], telas: ['lino', 'tusor', 'blackout'], rellenos: [], forma: 'cortina' },
  { id: 'toldos', cat: 'cerramientos', nombre: 'Toldos', imgs: [],
    desc: 'Toldos para patios, galerías y frentes de comercio, en lona de exterior.', medidas: ['Ancho', 'Salida', 'Foto del lugar'], telas: ['lona'], rellenos: [], forma: 'otro' },
  { id: 'cerramiento', cat: 'cerramientos', nombre: 'Cerramientos de lona y cristal', imgs: ['cerramiento'], dest: true,
    desc: 'Cerramientos con lona y ventanas de cristal flexible para galerías, quinchos y locales gastronómicos. Se enrollan cuando no hacen falta.', medidas: ['Ancho total', 'Alto', 'Foto del lugar'], telas: ['lona', 'cristal'], rellenos: [], forma: 'otro' },
  { id: 'carpas', cat: 'cerramientos', nombre: 'Carpas y coberturas', imgs: ['carpa-evento', 'carpa', 'estructura'],
    desc: 'Carpas para eventos, coberturas para obras y lonas industriales. Trabajamos con empresas e instituciones.', medidas: ['Superficie a cubrir', 'Uso', 'Fecha estimada'], telas: ['lona'], rellenos: [], forma: 'otro' },
  { id: 'media-sombra', cat: 'insumos', nombre: 'Media sombra', imgs: [], desc: 'Media sombra por metro o confeccionada con ojales y refuerzos, para cocheras, viveros y patios.', medidas: ['Metros o medida terminada', 'Porcentaje de sombra'], telas: [], rellenos: [], forma: 'otro' },
  { id: 'goma-espuma', cat: 'insumos', nombre: 'Goma espuma', imgs: ['colchoneta-gris'], desc: 'Planchas de goma espuma en distintas densidades y cortes a medida.', medidas: ['Densidad', 'Medida de la plancha o del corte'], telas: [], rellenos: ['D20', 'D24', 'D28'], forma: 'rect' },
  { id: 'guata-vellon', cat: 'insumos', nombre: 'Guata, vellón y telgopor', imgs: ['telas'], desc: 'Guata por metro, vellón siliconado por kilo y telgopor en perlas para puffs.', medidas: ['Producto', 'Cantidad'], telas: [], rellenos: [], forma: 'otro' },
];

const TELAS = {
  lona: { n: 'Lona náutica', t: 'ext', c: ['#E9E6DD', '#2D4463', '#8E3B33', '#3E5C49'] },
  exterior: { n: 'Tela de exterior con UV', t: 'ext', c: ['#8D9192', '#CBB892', '#2E2E2E'] },
  panama: { n: 'Panamá', t: 'int', c: ['#D9CDB4', '#C2AE8A', '#9DB8A6', '#4C4F52'] },
  chenille: { n: 'Chenille', t: 'int', c: ['#CDB99C', '#355A48', '#B0863A', '#7D7268'] },
  tusor: { n: 'Tusor', t: 'int', c: ['#E6DCC8', '#9A9C98', '#3A5378', '#A85F40'] },
  lino: { n: 'Lino', t: 'int', c: ['#E3DDD0', '#BFB5A2', '#8A8273'] },
  blackout: { n: 'Blackout', t: 'int', c: ['#EDEBE6', '#6D6A64', '#2B2B2B'] },
  cuerina: { n: 'Cuerina', t: 'int', c: ['#2E6F64', '#2B3A55', '#1F1F1F'] },
  cristal: { n: 'Cristal flexible', t: 'ext', c: ['#DCE6E8'] },
};

const TRABAJOS = [
  { img: 'living', cat: 'interior', t: 'Sillón con almohadones a medida' }, { img: 'reposeras', cat: 'exterior', t: 'Colchonetas para reposeras' },
  { img: 'futon', cat: 'interior', t: 'Futón de 2 plazas con banqueta' }, { img: 'cerramiento', cat: 'cerramientos', t: 'Cerramiento de lona y cristal' },
  { img: 'capitone', cat: 'tapiceria', t: 'Almohadones con capitoné' }, { img: 'sillones-ext', cat: 'exterior', t: 'Juego de galería' },
  { img: 'carpa-evento', cat: 'cerramientos', t: 'Carpa para evento' }, { img: 'divan', cat: 'interior', t: 'Kit de diván' },
  { img: 'gimnasio', cat: 'tapiceria', t: 'Colchonetas de gimnasio' }, { img: 'estampados', cat: 'tapiceria', t: 'Almohadones estampados' },
  { img: 'camastros', cat: 'exterior', t: 'Camastros circulares' }, { img: 'redonda', cat: 'interior', t: 'Colchoneta redonda' },
];

/* ---------- utilidades ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const img = (n) => `assets/img/${n}.jpg`;
const cat = (id) => CATS.find((c) => c.id === id);
const prod = (id) => PRODS.find((p) => p.id === id);
let temporada = CONFIG.TEMPORADA;
const ordenCats = () => [...CATS].sort((a, b) => rank(a) - rank(b));
const rank = (c) => (c.temporada === temporada ? 0 : c.temporada === 'todo' ? 1 : 2);

function foto(name, alt = '', cls = '') {
  if (!name) return `<div class="ph ${cls}" role="img" aria-label="${esc(alt)}"><span>Foto pendiente</span></div>`;
  return `<img class="${cls}" src="${img(name)}" alt="${esc(alt)}">`;
}
const flecha = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const icoWA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3Z"/></svg>';

function card(p) {
  return `<a class="pcard" href="#p-${p.id}"><div class="pcard-img">${foto(p.imgs[0], p.nombre)}</div><div class="pcard-body"><span class="kicker">${esc(cat(p.cat).corto)}</span><h3>${esc(p.nombre)}</h3><span class="link">Ver detalle ${flecha}</span></div></a>`;
}
function crumbs(items) {
  return `<nav class="crumbs" aria-label="Ruta"><a href="#inicio">Inicio</a>${items.map(([h, t]) => h ? ` <span>/</span> <a href="${h}">${esc(t)}</a>` : ` <span>/</span> <b>${esc(t)}</b>`).join('')}</nav>`;
}
function pageHead(eyebrow, title, lead, items) {
  return `<header class="phead"><div class="w">${crumbs(items)}<div class="eyebrow">${eyebrow}</div><h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}<div class="ph-rule" aria-hidden="true">${Array.from({length:41},(_, i)=>`<i class="${i%10===0?'l':i%5===0?'m':''}"></i>`).join('')}</div></div></header>`;
}
function ctaBand() {
  return `<section class="cta-band"><div class="w"><div><div class="eyebrow">¿No encontrás lo que buscás?</div><h2>Si se cose, probablemente lo hacemos.</h2></div><div class="acts"><a class="btn light" href="#a-medida">Guía de medidas</a><a class="btn wa" href="${waLink('¡Hola Todo Poliéster! Quiero hacer una consulta.')}" target="_blank" rel="noopener">${icoWA}Escribinos</a></div></div></section>`;
}

/* ---------- vistas ---------- */
const V = {};

V.inicio = () => {
  const cats = ordenCats();
  const ver = temporada === 'verano';
  const dest = PRODS.filter((p) => p.dest).sort((a, b) => rank(cat(a.cat)) - rank(cat(b.cat)));
  const medidasDest = { 'colchoneta-reposera': '190 × 60 × 8', camastro: 'Ø 120 × 10', futon: '190 × 140 × 15', 'kit-divan': '190 × 90 × 12', 'almohadon-sillon': '60 × 60 × 12', cerramiento: '300 × 220' };
  const telasNom = Object.values(TELAS).map((t) => t.n);
  const ticks = (n) => Array.from({ length: n }, (_, i) => `<i class="${i % 10 === 0 ? 'l' : i % 5 === 0 ? 'm' : ''}">${i % 10 === 0 ? `<em>${i}</em>` : ''}</i>`).join('');
  return `
  <section class="h3ro">
    <div class="h3-rule" aria-hidden="true">${ticks(61)}</div>
    <div class="h3-in">
      <div class="h3-tag mono">${ver ? 'Temporada de verano · patio y pileta' : 'Temporada de invierno · living y dormitorio'}</div>
      <h1 class="h3-title"><span>Hecho</span><span class="it">a medida</span><span>en Córdoba</span></h1>
      <figure class="h3-a">${foto(ver ? 'patio' : 'living', '')}<figcaption class="mono">${ver ? '190 × 60 × 8 cm' : '200 × 90 × 12 cm'}</figcaption></figure>
      <figure class="h3-b">${foto(ver ? 'capitone' : 'futon', '')}<figcaption class="mono">${ver ? '60 × 60 × 12 cm' : '190 × 140 × 15 cm'}</figcaption></figure>
      <figure class="h3-c">${foto('telas', '')}</figure>
      <p class="h3-lead">Almohadones, colchonetas, futones, cortinas, toldos y cerramientos. Elegís la tela, nos pasás la medida y lo cosemos en nuestro taller.</p>
      <div class="h3-acts"><a class="btn pri" href="#a-medida">Pedí tu presupuesto</a><a class="btn sec" href="#productos">Ver productos</a></div>
      <svg class="h3-tape" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 90 C 220 20, 420 130, 620 60 S 900 30, 1040 70" /></svg>
    </div>
  </section>

  <div class="marquee" aria-label="Telas que trabajamos"><div class="mq-track">${[0, 1].map(() => `<span>${telasNom.map((n, i) => `${n}<b>${i % 2 ? '✕' : '·'}</b>`).join('')}</span>`).join('')}</div></div>

  <section class="s idx-s"><div class="w">
    <div class="center-head"><div class="eyebrow">Rubros</div><h2>Todo lo que <em>cosemos</em></h2><p>Ordenados según la temporada. Pasá el mouse para verlos.</p></div>
    <ol class="idx">${cats.map((c, i) => `<li><a href="#cat-${c.id}" data-img="${c.img || ''}"><span class="mono n">${String(i + 1).padStart(2, '0')}</span><span class="t">${c.nombre}</span><span class="d">${c.lead}</span><span class="mono c">${c.temporada === temporada ? 'De temporada' : PRODS.filter((p) => p.cat === c.id).length + ' productos'}</span><span class="ar">${flecha}</span></a>${foto(c.img, '', 'idx-thumb')}</li>`).join('')}</ol>
    <div class="idx-float" id="idx-float" aria-hidden="true"></div>
  </div></section>

  <section class="s alt pedidos"><div class="w">
    <div class="right-head"><div><div class="eyebrow">Más pedidos</div><h2>Lo que más nos piden<br><em>${ver ? 'este verano' : 'este invierno'}</em></h2></div><div class="rail-nav"><button class="rbtn" data-rail="-1" aria-label="Anterior">←</button><button class="rbtn" data-rail="1" aria-label="Siguiente">→</button></div></div>
    <div class="rail stag" id="rail">${dest.map((p, i) => `<a class="scard ${i % 2 ? 'down' : ''}" href="#p-${p.id}"><div class="scard-img">${foto(p.imgs[0], p.nombre)}<span class="cota mono">${medidasDest[p.id] || 'a medida'} cm</span></div><span class="kicker">${cat(p.cat).corto}</span><h3>${p.nombre}</h3></a>`).join('')}</div>
  </div></section>

  <section class="story"><div class="w story-in">
    <div class="story-vis"><div class="story-frame">${foto('patio', 'Colchonetas con medidas')}
      <svg viewBox="0 0 400 400" preserveAspectRatio="none" class="dims-svg" aria-hidden="true">
        <g class="dl d1"><line x1="40" y1="352" x2="360" y2="352"/><line x1="40" y1="342" x2="40" y2="362"/><line x1="360" y1="342" x2="360" y2="362"/></g>
        <g class="dl d2"><line x1="372" y1="40" x2="372" y2="340"/><line x1="362" y1="40" x2="382" y2="40"/><line x1="362" y1="340" x2="382" y2="340"/></g>
        <g class="dl d3"><line x1="22" y1="140" x2="22" y2="200"/><line x1="14" y1="140" x2="30" y2="140"/><line x1="14" y1="200" x2="30" y2="200"/></g>
      </svg>
      <span class="dlab mono l1">190 cm</span><span class="dlab mono l2">60 cm</span><span class="dlab mono l3">8 cm</span>
      <div class="story-swatch" id="story-swatch"><i style="--c:#CDB99C"></i><i style="--c:#355A48"></i><i style="--c:#B0863A"></i></div>
      <div class="story-ok mono" id="story-ok">Presupuesto enviado ✓</div>
    </div></div>
    <div class="story-steps">
      <div class="eyebrow">Cómo pedir a medida</div>
      <div class="st" data-st="1"><span class="mono">Paso 01</span><h3>Medí</h3><p>Ancho, largo y espesor en centímetros. Si no estás seguro, mandanos una foto con la cinta métrica.</p></div>
      <div class="st" data-st="2"><span class="mono">Paso 02</span><h3>Elegí la tela</h3><p>Interior o exterior, color y relleno según el uso. Te asesoramos en el local o por WhatsApp.</p></div>
      <div class="st" data-st="3"><span class="mono">Paso 03</span><h3>Recibí el precio</h3><p>Te respondemos por WhatsApp con el precio, el plazo y las opciones de envío o retiro.</p><a class="btn pri" href="#a-medida">Abrir la guía de medidas ${flecha}</a></div>
    </div>
  </div></section>

  <section class="s alt telas-s"><div class="w">
    <div class="center-head"><div class="eyebrow">Muestrario</div><h2>Una tela para <em>cada uso</em></h2>
      <div class="tabs" role="tablist"><button role="tab" class="tab on" data-tela="ext" aria-selected="true">Exterior</button><button role="tab" class="tab" data-tela="int" aria-selected="false">Interior</button></div></div>
    <div class="fan" id="telas">${fanHTML('ext')}</div>
    <p class="note center">Muestrario de ejemplo. En la web final van las telas reales con foto.</p>
  </div></section>

  <section class="emp3"><div class="w">
    <div class="eyebrow ondark">Empresas e instituciones</div>
    <h2>Confeccionamos en cantidad para<br><span class="rot" id="rot"><b class="on">hoteles</b><b>restaurantes</b><b>eventos</b><b>escuelas</b><b>organismos</b></span></h2>
    <div class="emp3-row"><span>Presupuesto formal</span><span>Muestras antes de producir</span><span>Entregas coordinadas</span></div>
    <a class="btn light" href="#empresas">Soluciones para empresas ${flecha}</a>
  </div></section>

  <section class="s collage-s"><div class="w">
    <div class="right-head"><div><div class="eyebrow">Trabajos</div><h2>Salido del <em>taller</em></h2></div><a class="more" href="#trabajos">Ver todos los trabajos ${flecha}</a></div>
    <div class="collage">${TRABAJOS.slice(0, 6).map((t, i) => `<button class="cl c${i}" data-lb="${i}">${foto(t.img, t.t)}<span>${esc(t.t)}</span></button>`).join('')}</div>
  </div></section>

  <section class="s alt cifras3"><div class="w">
    <div class="cif"><b>20</b><span class="mono">años en el rubro</span></div>
    <div class="cif-rule" aria-hidden="true">${ticks(21)}</div>
    <div class="cif"><b>10</b><span class="mono">años como empresa</span></div>
    <div class="cif-rule" aria-hidden="true">${ticks(21)}</div>
    <div class="cif"><b>2</b><span class="mono">locales en Córdoba</span></div>
  </div><div class="w center"><a class="btn sec" href="https://www.google.com/maps/search/Todo+Poliester+C%C3%B3rdoba" target="_blank" rel="noopener">Leé las reseñas en Google</a></div></section>

  <section class="cta3"><div class="w"><div class="stitch">
    <div class="eyebrow">¿No encontrás lo que buscás?</div><h2>Si se cose,<br><em>probablemente lo hacemos.</em></h2>
    <div class="acts"><a class="btn pri" href="#a-medida">Guía de medidas</a><a class="btn wa" href="${waLink('¡Hola Todo Poliéster! Quiero hacer una consulta.')}" target="_blank" rel="noopener">${icoWA}Escribinos</a></div>
  </div></div></section>`;
};

function fanHTML(tipo) {
  const ts = Object.entries(TELAS).filter(([, t]) => t.t === tipo);
  const n = ts.length;
  return ts.map(([k, t], i) => { const r = (i - (n - 1) / 2) * 7; return `<div class="fcard" style="--r:${r}deg;--i:${i}"><div class="fsw">${t.c.map((c) => `<i style="--c:${c}"></i>`).join('')}</div><b>${t.n}</b><span class="mono">${t.c.length} ${t.c.length === 1 ? 'color' : 'colores'} · ${t.t === 'ext' ? 'exterior' : 'interior'}</span></div>`; }).join('');
}

function homeFx() {
  // índice con imagen que sigue al mouse
  const fl = $('#idx-float');
  $$('.idx a').forEach((a) => {
    a.addEventListener('mouseenter', () => { const n = a.dataset.img; fl.innerHTML = n ? `<img src="${img(n)}" alt="">` : '<div class="ph"><span>Foto pendiente</span></div>'; fl.classList.add('on'); });
    a.addEventListener('mouseleave', () => fl.classList.remove('on'));
    a.addEventListener('mousemove', (e) => { const r = $('.idx-s .w').getBoundingClientRect(); fl.style.transform = `translate(${e.clientX - r.left + 24}px, ${e.clientY - r.top - 120}px) rotate(-3deg)`; });
  });
  // pasos del story
  const steps = $$('.st'), frame = $('.story-frame');
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { steps.forEach((s) => s.classList.toggle('on', s === en.target)); frame.dataset.st = en.target.dataset.st; } }), { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach((s) => io.observe(s));
  steps[0].classList.add('on'); frame.dataset.st = '1';
  // palabra que rota
  const ws = $$('#rot b'); let k = 0;
  heroTimer = setInterval(() => { ws[k].classList.remove('on'); k = (k + 1) % ws.length; ws[k].classList.add('on'); }, 2200);
}

function telasHTML(tipo) {
  return Object.entries(TELAS).filter(([, t]) => t.t === tipo).map(([k, t]) => `<div class="tela"><div class="sw">${t.c.map((c) => `<i style="--c:${c}"></i>`).join('')}</div><b>${t.n}</b><span>${t.c.length} colores</span></div>`).join('');
}

V.productos = () => `
  ${pageHead('Catálogo', 'Productos', 'Todo se hace a medida en nuestro taller. Elegí un rubro o buscá un producto.', [[null, 'Productos']])}
  <section class="s tight"><div class="w">
    <div class="filtros" role="tablist">${['todos', ...CATS.map((c) => c.id)].map((id) => `<button class="chip ${id === 'todos' ? 'on' : ''}" data-fcat="${id}">${id === 'todos' ? 'Todos' : cat(id).corto}</button>`).join('')}</div>
    <div class="grid" id="grid">${PRODS.map(card).join('')}</div>
  </div></section>${ctaBand()}`;

V.cat = (id) => {
  const c = cat(id); if (!c) return V.notfound();
  const ps = PRODS.filter((p) => p.cat === id);
  return `
  <header class="chead">${foto(c.img, c.nombre, 'chead-img')}<div class="chead-shade"></div><div class="w">${crumbs([['#productos', 'Productos'], [null, c.nombre]])}<div class="eyebrow ondark">${c.temporada === temporada ? 'De temporada' : 'Rubro'}</div><h1>${c.nombre}</h1><p class="lead">${c.lead}</p></div></header>
  <section class="s tight"><div class="w cat-layout">
    <aside class="side"><b>Rubros</b>${ordenCats().map((x) => `<a href="#cat-${x.id}" class="${x.id === id ? 'on' : ''}">${x.nombre}<span>${PRODS.filter((p) => p.cat === x.id).length}</span></a>`).join('')}
      <div class="side-cta"><p>¿Dudas con la medida?</p><a href="#a-medida">Guía de medidas ${flecha}</a></div></aside>
    <div class="grid two">${ps.map(card).join('')}</div>
  </div></section>${ctaBand()}`;
};

V.prod = (id) => {
  const p = prod(id); if (!p) return V.notfound();
  const c = cat(p.cat);
  const rel = PRODS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 3);
  const imgs = p.imgs.length ? p.imgs : [null];
  return `
  <section class="s tight"><div class="w">${crumbs([['#productos', 'Productos'], ['#cat-' + c.id, c.nombre], [null, p.nombre]])}
  <div class="pdet">
    <div class="pgal"><div class="pmain" id="pmain">${foto(imgs[0], p.nombre)}</div>${imgs.length > 1 ? `<div class="pthumbs">${imgs.map((n, i) => `<button class="${i === 0 ? 'on' : ''}" data-pimg="${n}" aria-label="Ver foto ${i + 1}">${foto(n)}</button>`).join('')}</div>` : ''}</div>
    <div class="pinfo">
      <span class="kicker">${esc(c.nombre)}</span><h1>${esc(p.nombre)}</h1><p class="pdesc">${esc(p.desc)}</p>
      <div class="pills"><span>Hecho a medida</span><span>Taller propio</span><span>Envíos a todo el país</span></div>
      ${p.telas.length ? `<div class="pblock"><b>Telas recomendadas</b><div class="ptelas">${p.telas.map((t) => `<span><i class="sw1">${TELAS[t].c.slice(0, 3).map((x) => `<em style="--c:${x}"></em>`).join('')}</i>${TELAS[t].n}</span>`).join('')}</div></div>` : ''}
      ${p.rellenos.length ? `<div class="pblock"><b>Relleno</b><div class="opts">${p.rellenos.map((r) => `<span>${r}</span>`).join('')}</div></div>` : ''}
      <div class="pblock"><b>Para presupuestarlo necesitamos</b><ul class="need">${p.medidas.map((m) => `<li>${esc(m)}</li>`).join('')}</ul></div>
      <form class="pform" data-prod="${p.id}">
        <label>Medidas<input name="med" placeholder="Ej.: 190 × 60 × 8 cm"></label>
        <label>Cantidad<input name="cant" type="number" min="1" value="1" inputmode="numeric"></label>
        <button class="btn wa" type="submit">${icoWA}Consultar por WhatsApp</button>
      </form>
      <a class="guide-link" href="#a-medida">¿Cómo medir? Abrí la guía ${flecha}</a>
    </div>
  </div></div></section>
  ${rel.length ? `<section class="s alt"><div class="w"><div class="s-head"><div><div class="eyebrow">Del mismo rubro</div><h2>También te puede servir</h2></div></div><div class="grid three">${rel.map(card).join('')}</div></div></section>` : ''}`;
};

V.medida = () => `
  ${pageHead('Pedidos a medida', 'Guía de medidas', 'Elegí qué querés hacer, cargá las medidas y te mandamos el presupuesto por WhatsApp.', [[null, 'A medida']])}
  <section class="s tight"><div class="w guia">
    <div class="g-left">
      <div class="g-step"><span>1</span><b>¿Qué querés hacer?</b></div>
      <div class="formas">${[['rect', 'Almohadón o colchoneta'], ['redondo', 'Almohadón redondo'], ['futon', 'Futón'], ['cortina', 'Cortina'], ['otro', 'Toldo, lona u otro']].map(([k, t], i) => `<button class="forma ${i === 0 ? 'on' : ''}" data-forma="${k}">${t}</button>`).join('')}</div>
      <div class="g-step"><span>2</span><b>Medidas en centímetros</b></div>
      <div class="dims" id="dims"></div>
      <div class="g-step"><span>3</span><b>Uso y tela</b></div>
      <div class="formas"><button class="forma on" data-uso="Exterior">Exterior</button><button class="forma" data-uso="Interior">Interior</button><button class="forma" data-uso="No sé, quiero asesoramiento">No sé</button></div>
      <div class="g-step"><span>4</span><b>Tus datos</b></div>
      <div class="dims"><label>Cantidad<input id="g-cant" type="number" min="1" value="2"></label><label>Nombre<input id="g-nom" placeholder="Tu nombre"></label><label class="full">Localidad<input id="g-loc" placeholder="Ej.: Villa Allende"></label><label class="full">Comentarios<textarea id="g-com" rows="2" placeholder="Color, foto, uso..."></textarea></label></div>
    </div>
    <aside class="g-right"><div class="g-card"><div class="g-vis" id="g-vis"></div><div class="g-tip" id="g-tip"></div><pre class="g-msg" id="g-msg"></pre><a class="btn wa full" id="g-wa" target="_blank" rel="noopener">${icoWA}Enviar por WhatsApp</a><small>Te respondemos de lunes a viernes de 9 a 18 h y sábados de 9 a 14 h.</small></div></aside>
  </div></section>`;

V.trabajos = () => `
  ${pageHead('Trabajos', 'Hecho en nuestro taller', 'Una selección de trabajos de los últimos años.', [[null, 'Trabajos']])}
  <section class="s tight"><div class="w">
    <div class="filtros">${['todos', 'exterior', 'interior', 'tapiceria', 'cerramientos'].map((id) => `<button class="chip ${id === 'todos' ? 'on' : ''}" data-ftrab="${id}">${id === 'todos' ? 'Todos' : cat(id).corto}</button>`).join('')}</div>
    <div class="masonry" id="masonry">${TRABAJOS.map((t, i) => `<button class="mitem" data-lb="${i}" data-c="${t.cat}">${foto(t.img, t.t)}<span>${esc(t.t)}</span></button>`).join('')}</div>
    <p class="note">Maqueta: las fotos se reemplazan por la selección que nos manden.</p>
  </div></section>${ctaBand()}`;

V.empresas = () => `
  <header class="chead">${foto('carpa-evento', 'Carpa para evento', 'chead-img')}<div class="chead-shade"></div><div class="w">${crumbs([[null, 'Empresas']])}<div class="eyebrow ondark">Empresas e instituciones</div><h1>Confección en cantidad, con presupuesto formal</h1><p class="lead">Trabajamos para hoteles, cabañas, restaurantes, productoras de eventos, escuelas y organismos públicos.</p></div></header>
  <section class="s"><div class="w">
    <div class="sect-grid">${[['Hotelería y cabañas', 'Almohadones, colchonetas de pileta, cortinas y fundas para habitaciones y áreas comunes.', 'reposeras'], ['Gastronomía', 'Cerramientos de lona y cristal, toldos y almohadones para terrazas y galerías.', 'cerramiento'], ['Eventos', 'Carpas, coberturas y lonas para eventos al aire libre.', 'carpa'], ['Instituciones', 'Colchonetas para gimnasios y escuelas, lonas y coberturas.', 'gimnasio']].map(([t, d, im]) => `<div class="sect">${foto(im, t)}<div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>
  </div></section>
  <section class="s alt"><div class="w split">
    <div><div class="eyebrow">Cómo trabajamos</div><h2>De la visita a la entrega</h2><ol class="steps"><li><b>Relevamiento</b><span>Vamos a medir o nos mandás planos y fotos.</span></li><li><b>Presupuesto formal</b><span>Con detalle de materiales, cantidades y plazo.</span></li><li><b>Muestras</b><span>Te mostramos telas y terminaciones antes de producir.</span></li><li><b>Producción y entrega</b><span>Coordinamos entregas parciales si hace falta.</span></li></ol></div>
    <form class="eform" id="eform"><h3>Pedí un presupuesto para tu empresa</h3>
      <label>Empresa<input name="emp" placeholder="Nombre de la empresa"></label><label>Rubro<select name="rub"><option>Hotelería y cabañas</option><option>Gastronomía</option><option>Eventos</option><option>Institución</option><option>Otro</option></select></label>
      <label class="full">¿Qué necesitás?<textarea name="det" rows="3" placeholder="Producto, cantidades, plazos..."></textarea></label><label>Contacto<input name="nom" placeholder="Nombre y apellido"></label><label>Ciudad<input name="loc" placeholder="Ciudad"></label>
      <button class="btn wa full" type="submit">${icoWA}Enviar por WhatsApp</button></form>
  </div></section>`;

V.nosotros = () => `
  ${pageHead('Nosotros', 'Veinte años cortando y cosiendo a medida', null, [[null, 'Nosotros']])}
  <section class="s tight"><div class="w split">
    <div class="split-img">${foto('taller', 'Taller de Todo Poliéster')}</div>
    <div><p class="big">Empezamos en el rubro hace 20 años y el 1 de diciembre cumplimos 10 como empresa. Cada pieza se corta y se cose en nuestro taller, y la atendemos en nuestros locales de Córdoba y Villa Allende.</p>
      <div class="tl"><div><b>Hace 20 años</b><span>Empezamos en el rubro de la confección textil.</span></div><div><b>1 de diciembre de 2016</b><span>Nace Todo Poliéster como empresa.</span></div><div><b>Hoy</b><span>Dos locales, taller propio y envíos a todo el país.</span></div></div></div>
  </div></section>
  <section class="s alt"><div class="w vals">${[['A medida', 'No trabajamos con medidas fijas: cada pedido se corta para su lugar.'], ['Asesoramiento', 'Te ayudamos a elegir tela y relleno según el uso real.'], ['Taller propio', 'Controlamos cada costura antes de entregar.']].map(([t, d]) => `<div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></section>${ctaBand()}`;

V.contacto = () => `
  ${pageHead('Contacto', 'Vení a ver las telas', 'Atendemos en los dos locales. Para pedidos y consultas online, escribinos al WhatsApp.', [[null, 'Contacto']])}
  <section class="s tight"><div class="w">
    <div class="locs">${[['Centro', 'Rivadavia 322, Córdoba', 'Rivadavia+322+C%C3%B3rdoba'], ['Villa Allende', 'Padre Mariani 85, local 4', 'Padre+Mariani+85+Villa+Allende']].map(([n, d, q]) => `<div class="loc"><span class="kicker">Local</span><h3>${n}</h3><p>${d}</p><p>Lunes a viernes de 9 a 18 h · Sábados de 9 a 14 h</p><a class="more" href="https://www.google.com/maps/search/${q}" target="_blank" rel="noopener">Cómo llegar ${flecha}</a></div>`).join('')}
      <div class="loc dark"><span class="kicker ondark">Ventas online</span><h3>${WA_TXT}</h3><p>Un solo WhatsApp para pedidos de todo el país.</p><a class="btn light" href="${waLink('¡Hola Todo Poliéster! Quiero hacer una consulta.')}" target="_blank" rel="noopener">${icoWA}Escribinos</a></div></div>
  </div></section>
  <section class="s alt"><div class="w faq-w"><div><div class="eyebrow">Preguntas frecuentes</div><h2>Lo que más nos preguntan</h2></div>
    <div class="faq">${[['¿Hacen envíos?', 'Sí, enviamos a todo el país. Te cotizamos el envío junto con el pedido.'], ['¿Cómo tomo las medidas?', 'Usá la <a href="#a-medida">guía de medidas</a>. Si tenés dudas, mandanos una foto con la cinta métrica.'], ['¿Qué tela me conviene para exterior?', 'Lona náutica o tela de exterior con protección UV. Repelen el agua y no se decoloran tan rápido.'], ['¿Puedo pedir solo la funda?', 'Sí, si ya tenés el relleno hacemos solo la funda a medida.'], ['¿Trabajan con empresas?', 'Sí, con hoteles, gastronomía, eventos e instituciones. Mirá la sección <a href="#empresas">Empresas</a>.']].map(([q, a], i) => `<details ${i === 0 ? 'open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></div></section>`;

V.notfound = () => `${pageHead('Error', 'No encontramos esa página', null, [[null, 'No encontrada']])}<section class="s tight"><div class="w"><a class="btn pri" href="#inicio">Volver al inicio</a></div></section>`;

/* ---------- guía de medidas ---------- */
const G = { forma: 'rect', uso: 'Exterior', d: { a: 190, b: 60, e: 8 } };
const GDIMS = { rect: [['a', 'Largo', 190], ['b', 'Ancho', 60], ['e', 'Espesor', 8]], redondo: [['a', 'Diámetro', 40], ['e', 'Espesor', 5]], futon: [['a', 'Largo', 190], ['b', 'Ancho', 140], ['e', 'Espesor', 15]], cortina: [['a', 'Ancho de ventana', 160], ['b', 'Alto', 220]], otro: [['a', 'Ancho', 300], ['b', 'Salida o alto', 250]] };
const GTIP = { rect: 'Medí de costura a costura el almohadón viejo, o el hueco del mueble donde va. Para asientos, 10 a 12 cm de espesor; para reposeras, 5 a 8 cm.', redondo: 'Medí el diámetro de lado a lado pasando por el centro.', futon: '1 plaza 190 × 80, 1½ plaza 190 × 100, 2 plazas 190 × 140. Lo común es 15 cm de espesor.', cortina: 'Medí el ancho del barral y el alto desde el barral hasta donde querés que llegue.', otro: 'Medidas aproximadas alcanzan. Si podés, mandanos una foto del lugar.' };
const GNOM = { rect: 'Almohadón o colchoneta', redondo: 'Almohadón redondo', futon: 'Colchón de futón', cortina: 'Cortina', otro: 'Toldo, lona u otro' };
function gRender() {
  $('#dims').innerHTML = GDIMS[G.forma].map(([k, l, v]) => `<label>${l}<span class="inp"><input data-g="${k}" type="number" inputmode="numeric" value="${G.d[k] ?? v}"><em>cm</em></span></label>`).join('');
  GDIMS[G.forma].forEach(([k, , v]) => { if (G.d[k] == null) G.d[k] = v; });
  gUpdate();
}
function gUpdate() {
  const d = G.d, f = G.forma;
  $('#g-tip').textContent = GTIP[f];
  const L = (x, y, t) => `<text x="${x}" y="${y}" text-anchor="middle">${t}</text>`;
  let svg = '';
  if (f === 'redondo') svg = `<ellipse cx="160" cy="80" rx="90" ry="34" class="sh"/><path d="M70 80v22a90 34 0 0 0 180 0V80" class="sd"/>${L(160, 150, 'Ø ' + d.a + ' cm · ' + d.e + ' cm')}`;
  else if (f === 'cortina') svg = `<line x1="80" y1="30" x2="240" y2="30" class="ln"/><path d="M90 32 q10 60 0 120 h140 q-10 -60 0 -120Z" class="sh"/>${L(160, 22, d.a + ' cm')}${L(270, 95, d.b + ' cm')}`;
  else if (f === 'otro') svg = `<path d="M60 60 h200 l-30 50 h-140Z" class="sh"/><line x1="60" y1="60" x2="60" y2="150" class="ln"/><line x1="260" y1="60" x2="260" y2="150" class="ln"/>${L(160, 50, d.a + ' cm')}${L(160, 130, 'salida ' + d.b + ' cm')}`;
  else { const A = d.a || 1, B = d.b || 1, s = Math.min(200 / A, 70 / B), w = A * s, dp = B * s, h = Math.max(8, Math.min(40, (d.e || 1) * 2)), x = 160 - w / 2 - dp * .3, y = 40;
    svg = `<path d="M${x} ${y + dp} l${dp * .6} -${dp} h${w} l-${dp * .6} ${dp}Z" class="sh"/><path d="M${x} ${y + dp} h${w} v${h} h-${w}Z" class="sd"/><path d="M${x + w} ${y + dp} l${dp * .6} -${dp} v${h} l-${dp * .6} ${dp}Z" class="sdd"/>${L(x + w / 2, y + dp + h + 18, A + ' cm')}${L(Math.min(300, x + w + dp * .6 + 26), y + dp / 2 + 4, B + ' cm')}${L(Math.max(18, x - 20), y + dp + h / 2 + 4, d.e + ' cm')}`; }
  $('#g-vis').innerHTML = `<svg viewBox="0 0 320 170" role="img" aria-label="Esquema de medidas">${svg}</svg>`;
  const dims = GDIMS[f].map(([k, l]) => `${l}: ${d[k]} cm`).join(', ');
  const v = (id) => ($('#' + id)?.value || '').trim();
  const msg = `¡Hola Todo Poliéster! Quiero pedir un presupuesto:\n• ${GNOM[f]}\n• ${dims}\n• Uso: ${G.uso}\n• Cantidad: ${v('g-cant') || 1}${v('g-com') ? '\n• Comentarios: ' + v('g-com') : ''}\nNombre: ${v('g-nom') || '-'} · Localidad: ${v('g-loc') || '-'}`;
  $('#g-msg').textContent = msg; $('#g-wa').href = waLink(msg);
}

/* ---------- lightbox ---------- */
let lbList = TRABAJOS, lbI = 0;
function lbOpen(i) { lbI = i; const lb = $('#lb'); lb.hidden = false; lbShow(); $('#lb-close').focus(); document.body.style.overflow = 'hidden'; }
function lbShow() { const t = lbList[lbI]; $('#lb-img').innerHTML = foto(t.img, t.t); $('#lb-cap').textContent = `${t.t} · ${lbI + 1} / ${lbList.length}`; }
function lbClose() { $('#lb').hidden = true; document.body.style.overflow = ''; }

/* ---------- router ---------- */
const ROUTES = { inicio: V.inicio, productos: V.productos, 'a-medida': V.medida, trabajos: V.trabajos, empresas: V.empresas, nosotros: V.nosotros, contacto: V.contacto };
let heroTimer = null;
function route() {
  const h = (location.hash || '#inicio').slice(1) || 'inicio';
  let html, key = h;
  if (h.startsWith('cat-')) { html = V.cat(h.slice(4)); key = 'productos'; }
  else if (h.startsWith('p-')) { html = V.prod(h.slice(2)); key = 'productos'; }
  else if (ROUTES[h]) html = ROUTES[h]();
  else if (['rubros', 'medida'].includes(h)) { location.replace('#' + (h === 'rubros' ? 'productos' : 'a-medida')); return; }
  else html = V.notfound();
  const app = $('#app');
  app.innerHTML = html; app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter');
  $$('.mainnav a[data-k]').forEach((a) => a.classList.toggle('on', a.dataset.k === key));
  closeMenus(); window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  clearInterval(heroTimer);
  if (h === 'inicio') homeFx();
  if (h === 'a-medida') gRender();
  const t = { inicio: '', productos: 'Productos', 'a-medida': 'Guía de medidas', trabajos: 'Trabajos', empresas: 'Empresas', nosotros: 'Nosotros', contacto: 'Contacto' }[key];
  document.title = 'Todo Poliéster' + (t ? ' · ' + t : '');
}
function startHero() {
  let i = 0; const n = $$('.slide').length;
  const go = (k) => { i = (k + n) % n; $$('.slide').forEach((s, j) => s.classList.toggle('on', j === i)); $$('.dot').forEach((d, j) => d.classList.toggle('on', j === i)); };
  heroTimer = setInterval(() => go(i + 1), 6000);
  $$('.dot').forEach((d) => d.addEventListener('click', () => { clearInterval(heroTimer); go(+d.dataset.go); heroTimer = setInterval(() => go(i + 1), 6000); }));
}

/* ---------- menús y buscador ---------- */
function closeMenus() { $('#mega').hidden = true; $('#btn-prod').setAttribute('aria-expanded', 'false'); $('#drawer').classList.remove('open'); $('#search-res').hidden = true; document.body.classList.remove('lock'); }
function megaHTML() {
  return `<div class="w mega-in">${ordenCats().map((c) => `<div class="mcol"><a class="mcol-h" href="#cat-${c.id}">${c.nombre}</a>${PRODS.filter((p) => p.cat === c.id).map((p) => `<a href="#p-${p.id}">${p.nombre}</a>`).join('')}</div>`).join('')}
    <a class="mega-feat" href="#a-medida">${foto('taller', '')}<span><b>Guía de medidas</b>Aprendé a medir y pedí tu presupuesto</span></a></div>`;
}
function drawerHTML() {
  return `<a href="#inicio">Inicio</a><details><summary>Productos</summary>${ordenCats().map((c) => `<a class="sub" href="#cat-${c.id}">${c.nombre}</a>`).join('')}<a class="sub" href="#productos">Ver todos</a></details><a href="#a-medida">Guía de medidas</a><a href="#trabajos">Trabajos</a><a href="#empresas">Empresas</a><a href="#nosotros">Nosotros</a><a href="#contacto">Contacto</a>
    <div class="drawer-foot"><p>Lun a vie 9 a 18 h · Sáb 9 a 14 h</p><a class="btn wa full" href="${waLink('¡Hola Todo Poliéster! Quiero hacer una consulta.')}" target="_blank" rel="noopener">${icoWA}${WA_TXT}</a></div>`;
}
function searchRun(q) {
  const box = $('#search-res'); q = q.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  if (q.length < 2) { box.hidden = true; return; }
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const res = PRODS.filter((p) => norm(p.nombre + ' ' + p.desc + ' ' + cat(p.cat).nombre).includes(q)).slice(0, 6);
  box.innerHTML = res.length ? res.map((p) => `<a href="#p-${p.id}">${foto(p.imgs[0], '')}<span><b>${esc(p.nombre)}</b>${esc(cat(p.cat).nombre)}</span></a>`).join('') : `<p>Sin resultados. <a href="${waLink('¡Hola! Busco: ' + q)}" target="_blank" rel="noopener">Consultanos por WhatsApp</a></p>`;
  box.hidden = false;
}

/* ---------- eventos globales ---------- */
document.addEventListener('click', (e) => {
  const t = e.target;
  const b = t.closest('button');
  if (t.closest('#btn-prod')) { const m = $('#mega'); const open = m.hidden; closeMenus(); m.hidden = !open; $('#btn-prod').setAttribute('aria-expanded', String(open)); return; }
  if (t.closest('#btn-menu')) { $('#drawer').classList.add('open'); document.body.classList.add('lock'); return; }
  if (t.closest('#drawer-close') || t.closest('#drawer .scrim') || t.closest('#drawer a')) { if (!t.closest('#drawer a[target]')) closeMenus(); }
  if (!t.closest('#mega') && !t.closest('#btn-prod')) { $('#mega').hidden = true; $('#btn-prod').setAttribute('aria-expanded', 'false'); }
  if (!t.closest('.search')) $('#search-res').hidden = true;
  if (!b) return;
  if (b.dataset.rail) { const r = $('#rail'); r.scrollBy({ left: +b.dataset.rail * r.clientWidth * .8, behavior: 'smooth' }); }
  if (b.dataset.tela) { $$('.tab').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); }); $('#telas').innerHTML = $('#telas').classList.contains('fan') ? fanHTML(b.dataset.tela) : telasHTML(b.dataset.tela); }
  if (b.dataset.fcat) { $$('[data-fcat]').forEach((x) => x.classList.toggle('on', x === b)); const id = b.dataset.fcat; $('#grid').innerHTML = PRODS.filter((p) => id === 'todos' || p.cat === id).map(card).join(''); }
  if (b.dataset.ftrab) { $$('[data-ftrab]').forEach((x) => x.classList.toggle('on', x === b)); const id = b.dataset.ftrab; $$('#masonry .mitem').forEach((m) => { m.hidden = !(id === 'todos' || m.dataset.c === id); }); lbList = TRABAJOS.filter((x) => id === 'todos' || x.cat === id); }
  if (b.dataset.lb != null) { const tr = TRABAJOS[+b.dataset.lb]; lbOpen(Math.max(0, lbList.indexOf(tr)) ); if (lbList.indexOf(tr) < 0) { lbList = TRABAJOS; lbOpen(+b.dataset.lb); } }
  if (b.dataset.pimg) { $$('.pthumbs button').forEach((x) => x.classList.toggle('on', x === b)); $('#pmain').innerHTML = foto(b.dataset.pimg); }
  if (b.dataset.forma) { $$('[data-forma]').forEach((x) => x.classList.toggle('on', x === b)); G.forma = b.dataset.forma; G.d = {}; gRender(); }
  if (b.dataset.uso) { $$('[data-uso]').forEach((x) => x.classList.toggle('on', x === b)); G.uso = b.dataset.uso; gUpdate(); }
  if (b.id === 'lb-close') lbClose();
  if (b.id === 'lb-prev') { lbI = (lbI - 1 + lbList.length) % lbList.length; lbShow(); }
  if (b.id === 'lb-next') { lbI = (lbI + 1) % lbList.length; lbShow(); }
  if (b.dataset.temp) { temporada = b.dataset.temp; $$('[data-temp]').forEach((x) => x.setAttribute('aria-pressed', x === b)); $('#mega').innerHTML = megaHTML(); route(); }
  if (b.dataset.pal) { document.documentElement.dataset.pal = b.dataset.pal; $$('[data-pal]').forEach((x) => x.setAttribute('aria-pressed', x === b)); }
});
document.addEventListener('input', (e) => {
  if (e.target.dataset.g) { G.d[e.target.dataset.g] = +e.target.value || 0; gUpdate(); }
  else if (['g-cant', 'g-nom', 'g-loc', 'g-com'].includes(e.target.id)) gUpdate();
  else if (e.target.id === 'q') searchRun(e.target.value);
});
document.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target; const fd = Object.fromEntries(new FormData(f));
  let msg;
  if (f.classList.contains('pform')) { const p = prod(f.dataset.prod); msg = `¡Hola Todo Poliéster! Quiero consultar por: ${p.nombre}\n• Medidas: ${fd.med || 'a definir'}\n• Cantidad: ${fd.cant || 1}`; }
  else if (f.id === 'eform') msg = `¡Hola Todo Poliéster! Pedido de presupuesto para empresa:\n• Empresa: ${fd.emp || '-'} (${fd.rub})\n• Necesidad: ${fd.det || '-'}\n• Contacto: ${fd.nom || '-'} · ${fd.loc || '-'}`;
  if (msg) { const a = document.createElement('a'); a.href = waLink(msg); a.target = '_blank'; a.rel = 'noopener'; document.body.append(a); a.click(); a.remove(); }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeMenus(); if (!$('#lb').hidden) lbClose(); }
  if (!$('#lb').hidden && e.key === 'ArrowRight') { lbI = (lbI + 1) % lbList.length; lbShow(); }
  if (!$('#lb').hidden && e.key === 'ArrowLeft') { lbI = (lbI - 1 + lbList.length) % lbList.length; lbShow(); }
});
let lastY = 0;
window.addEventListener('scroll', () => { const y = window.scrollY; $('#hdr').classList.toggle('scrolled', y > 40); const m = document.documentElement.scrollHeight - innerHeight; $('#tape').style.setProperty('--p', m > 0 ? (y / m) : 0); lastY = y; }, { passive: true });
window.addEventListener('hashchange', route);
$('#mega').innerHTML = megaHTML();
$('#drawer-body').innerHTML = drawerHTML();
route();
