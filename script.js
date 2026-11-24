(function () {
  /* slideshow (home page only) */
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.dot');
  var cur = 0, timer = null;
  function show(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach(function (el, n) { el.style.opacity = n === cur ? 1 : 0; });
    dots.forEach(function (el, n) { el.style.background = n === cur ? '#E2BE6A' : 'rgba(255,255,255,0.45)'; });
  }
  function start() {
    if (!slides.length) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(timer);
    timer = setInterval(function () { show(cur + 1); }, 5000);
  }
  document.querySelectorAll('[data-act]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var a = btn.getAttribute('data-act');
      if (a === 'prev') show(cur - 1);
      else if (a === 'next') show(cur + 1);
      else show(parseInt(btn.getAttribute('data-i'), 10));
      start();
    });
  });
  start();

  /* menu button (phones and iPads) */
  var nav = document.querySelector('nav');
  var mb = document.querySelector('.menu-btn');
  if (nav && mb) {
    mb.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* scroll reveal */
  var items = document.querySelectorAll('.rise, .wipe');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { var t = e.target; if (t.classList.contains('wipe-host')) { t.querySelector('.wipe').classList.add('in'); } else { t.classList.add('in'); } io.unobserve(t); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { if (el.classList.contains('wipe')) { el.parentElement.classList.add('wipe-host'); io.observe(el.parentElement); } else { io.observe(el); } });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
  /* back to top */
  var tt = document.querySelector('.to-top');
  if (tt) {
    window.addEventListener('scroll', function () { tt.classList.toggle('show', window.scrollY > 600); }, { passive: true });
    tt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
})();
