(function(){
  const slideshow = document.getElementById('slideshow');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const dotsContainer = document.getElementById('dots');

  let current = 0;
  const slideCount = slides.length;
  const AUTOPLAY_MS = 4000;
  let autoplayId = null;

  // build dots
  slides.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot';
    btn.setAttribute('aria-label', 'Go to slide ' + (i+1));
    btn.setAttribute('role','tab');
    btn.dataset.index = i;
    if(i === current) btn.setAttribute('aria-current','true');
    dotsContainer.appendChild(btn);
  });

  const dots = Array.from(dotsContainer.children);

  function updateSlides(newIndex) {
    if(newIndex === current) return;
    const prev = current;
    current = (newIndex + slideCount) % slideCount;

    slides[prev].dataset.active = "false";
    slides[prev].setAttribute('aria-hidden','true');
    slides[current].dataset.active = "true";
    slides[current].setAttribute('aria-hidden','false');

    dots[prev].removeAttribute('aria-current');
    dots[current].setAttribute('aria-current','true');
  }

  function next() { updateSlides(current + 1) }
  function prev() { updateSlides(current - 1) }

  // event listeners
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  dots.forEach(d => d.addEventListener('click', e => {
    const i = Number(e.currentTarget.dataset.index);
    updateSlides(i);
    resetAutoplay();
  }));

  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') { next(); resetAutoplay(); }
    if(e.key === 'ArrowLeft') { prev(); resetAutoplay(); }
  });

  // autoplay
  function startAutoplay(){
    stopAutoplay();
    autoplayId = setInterval(() => { next(); }, AUTOPLAY_MS);
  }
  function stopAutoplay(){
    if(autoplayId) { clearInterval(autoplayId); autoplayId = null; }
  }
  function resetAutoplay(){
    startAutoplay();
  }

  // pause on hover/focus
  slideshow.addEventListener('mouseenter', stopAutoplay);
  slideshow.addEventListener('mouseleave', startAutoplay);
  slideshow.addEventListener('focusin', stopAutoplay);
  slideshow.addEventListener('focusout', startAutoplay);

  // start
  startAutoplay();

  // accessibility: announce slide changes (optional, lightweight)
  const live = document.createElement('div');
  live.setAttribute('aria-live','polite');
  live.style.position = 'absolute';
  live.style.width = '1px';
  live.style.height = '1px';
  live.style.margin = '-1px';
  live.style.clip = 'rect(0 0 0 0)';
  live.style.overflow = 'hidden';
  document.body.appendChild(live);

  // update live region when slide changes
  const obs = new MutationObserver(() => {
    const caption = slides[current].querySelector('.caption h3')?.textContent || ('Slide ' + (current+1));
    live.textContent = caption + ' — ' + (current+1) + ' of ' + slideCount;
  });
  obs.observe(document.getElementById('slides'), { attributes: true, subtree: true, attributeFilter: ['data-active'] });

})();