/* Demo separat: partea din modele/model.js (cristianweb.ro) de care pagina are nevoie, fără bara demonstrativă.
   1. Video-ul se încarcă după afișarea paginii (posterul apare imediat), pornește fără sunet, în buclă;
      pe telefon în portret se folosește varianta verticală 9:16, dacă există. Cu „reduce motion” rămâne posterul.
   2. Formularele pe care scriptul modelului nu le tratează nu reîncarcă pagina: arată mesajul.
   3. Linkurile demonstrative (href="#", WhatsApp, telefon) arată mesajul, cu „Aleg acest model”. */
(function () {
  'use strict';
  var note = document.querySelector('.cwm-note');
  var timer = 0;
  function show(message) {
    if (!note) return;
    note.querySelector('p').textContent = message;
    note.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(function () { note.hidden = true; }, 9000);
  }
  if (note) {
    note.querySelector('button').addEventListener('click', function () { note.hidden = true; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') note.hidden = true; });
  }

  document.addEventListener('submit', function (e) {
    if (e.defaultPrevented) return;
    e.preventDefault();
    show('Model demonstrativ: în site-ul tău, formularul trimite cererea pe e-mailul afacerii tale.');
  });

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    var a = e.target.closest && e.target.closest('a[href="#"]');
    if (!a) return;
    e.preventDefault();
    var label = (a.textContent || a.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim();
    if (/whatsapp/i.test(label)) show('Model demonstrativ: în site-ul tău, butonul deschide conversația WhatsApp cu afacerea ta.');
    else if (/sun[aă]|telefon/i.test(label)) show('Model demonstrativ: în site-ul tău, butonul „' + label.replace(/^\W+/, '') + '” apelează numărul afacerii tale.');
    else show('Model demonstrativ: în site-ul tău, „' + label + '” duce la formularul sau pagina afacerii tale.');
  });

  var portrait = window.matchMedia('(orientation: portrait) and (max-width: 900px)').matches;
  if (portrait) {
    var vids = document.querySelectorAll('video[data-poster-portrait]');
    for (var k = 0; k < vids.length; k++) vids[k].setAttribute('poster', vids[k].getAttribute('data-poster-portrait'));
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function start() {
    var videos = document.querySelectorAll('video');
    for (var i = 0; i < videos.length; i++) {
      var v = videos[i];
      var sources = v.querySelectorAll('source[data-src]');
      if (!sources.length) continue;
      for (var j = 0; j < sources.length; j++) sources[j].src = (portrait && sources[j].getAttribute('data-src-portrait')) || sources[j].getAttribute('data-src');
      v.muted = true;
      v.loop = true;
      v.autoplay = true;
      v.load();
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    }
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
