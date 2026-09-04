/* Resq — KZ/RU switcher, shared by both landing pages.
   Any element with data-kz + data-ru gets its text swapped.
   The page's <title> comes from data-title-kz / data-title-ru on <body>. */
(function () {
  var STORE = 'resq-lang';
  var DEFAULT = 'ru';

  var buttons = document.querySelectorAll('.lang button');
  var nodes = document.querySelectorAll('[data-ru][data-kz]');
  var body = document.body;

  function apply(lang) {
    for (var i = 0; i < nodes.length; i++) {
      var t = nodes[i].getAttribute('data-' + lang);
      if (t !== null) nodes[i].textContent = t;
    }
    document.documentElement.lang = (lang === 'kz') ? 'kk' : 'ru';

    var title = body.getAttribute('data-title-' + lang);
    if (title) document.title = title;

    for (var j = 0; j < buttons.length; j++) {
      buttons[j].setAttribute('aria-pressed', String(buttons[j].dataset.lang === lang));
    }
    try { localStorage.setItem(STORE, lang); } catch (e) {}
  }

  for (var k = 0; k < buttons.length; k++) {
    buttons[k].addEventListener('click', function () { apply(this.dataset.lang); });
  }

  var saved = null;
  try { saved = localStorage.getItem(STORE); } catch (e) {}
  apply(saved === 'kz' || saved === 'ru' ? saved : DEFAULT);

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
