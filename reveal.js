// Scroll-reveal + nav elevation. No-ops under prefers-reduced-motion.
(function () {
  var nav = document.querySelector('.nav');
  if (nav) {
    addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', scrollY > 8);
    }, { passive: true });
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var els = document.querySelectorAll(
    '.hero-l > *, .hero-list a, .hero-field, .meta > div, .sec-head, .col, .row, .cell,' +
    '.band-l > *, .band-r .item, .contact-l > *, .contact-r, .page-hero-l > *, .page-hero-r'
  );

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
      // clear stagger delay so hover transitions stay snappy afterwards
      setTimeout(function () { e.target.style.transitionDelay = ''; }, 900);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

  var perParent = new Map();
  els.forEach(function (el) {
    el.classList.add('reveal');
    var p = el.parentElement;
    var i = perParent.get(p) || 0;
    el.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
    perParent.set(p, i + 1);
    io.observe(el);
  });
})();
