(() => {
  const hero = document.querySelector('.hero');
  const card = document.querySelector('[data-story-card]');
  if (!hero || !card) return;

  hero.classList.add('story-enabled');
  const slides = [...card.querySelectorAll('.story-slide')];
  const steps = [...card.querySelectorAll('.story-progress i')];
  const counter = card.querySelector('[data-story-counter]');
  let active = -1;

  const setActive = (index) => {
    if (index === active) return;
    active = index;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    steps.forEach((step, i) => step.classList.toggle('is-active', i <= index));
    if (counter) counter.textContent = `0${index + 1} / 03`;
  };

  const update = () => {
    if (window.innerWidth <= 900) {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * .2)));
      setActive(Math.min(2, Math.floor(progress * 3)));
      return;
    }
    const start = hero.offsetTop;
    const range = Math.max(1, hero.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, (window.scrollY - start) / range));
    setActive(Math.min(2, Math.floor(progress * 3)));
  };

  let ticking = false;
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  };

  setActive(0);
  update();
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
})();