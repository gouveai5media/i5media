(() => {
  document.querySelectorAll('a[href="#projetos"]').forEach((link) => link.remove());
  const projectsSection = document.querySelector('.projects');
  if (projectsSection) projectsSection.remove();

  const nav = document.querySelector('.header nav');
  if (nav && !nav.querySelector('a[href="briefing.html"]')) {
    const link = document.createElement('a');
    link.href = 'briefing.html';
    link.textContent = 'Briefing';
    link.style.fontWeight = '700';
    link.style.color = '#155cff';
    nav.appendChild(link);
  }

  const hero = document.querySelector('.hero');
  const card = document.querySelector('[data-story-card]');
  if (hero && card) {
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
  }

  if (!document.querySelector('link[data-clients-style]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'clients.css?v=20260814-2';
    css.dataset.clientsStyle = 'true';
    document.head.appendChild(css);
  }

  const trust = document.querySelector('.trust-strip');
  if (trust && !document.querySelector('.clients-showcase')) {
    const section = document.createElement('section');
    section.className = 'clients-showcase section';
    section.id = 'clientes';
    section.innerHTML = `
      <div class="clients-glow clients-glow-a" aria-hidden="true"></div>
      <div class="clients-glow clients-glow-b" aria-hidden="true"></div>
      <div class="clients-head reveal">
        <div>
          <span class="section-label">CLIENTES / PROVA SOCIAL</span>
          <span class="eyebrow">CLIENTES QUE CONFIARAM NA I5MEDIA</span>
          <h2>Confiança que se transforma <span>em entrega.</span></h2>
        </div>
        <p>Cada logo representa um projeto, uma relação e um resultado construído com propósito.</p>
      </div>
      <div class="clients-grid reveal">
        <article class="client-logo-card"><img src="assets/clients/jbs.webp?v=2" alt="JBS" loading="lazy"></article>
        <article class="client-logo-card"><img src="assets/clients/super-muffato.webp?v=2" alt="Muffato" loading="lazy"></article>
        <article class="client-logo-card"><img src="assets/clients/chute-inicial.webp?v=2" alt="Chute Inicial Corinthians" loading="lazy"></article>
        <article class="client-logo-card"><img src="assets/clients/soccer-grass.webp?v=2" alt="Soccer Grass" loading="lazy"></article>
        <article class="client-logo-card"><img src="assets/clients/all-parmegiana.webp?v=2" alt="All Parmegiana" loading="lazy"></article>
        <article class="client-logo-card"><img src="assets/clients/xp-investimentos.svg?v=2" alt="XP Investimentos" loading="lazy"></article>
        <article class="client-logo-card"><img src="assets/clients/abracon.webp?v=2" alt="Abracon" loading="lazy"></article>
        <article class="client-logo-card"><img src="assets/clients/nutricar.webp?v=2" alt="Nutricar" loading="lazy"></article>
        <article class="client-logo-card"><img src="assets/clients/mundo-verde.webp?v=2" alt="Mundo Verde" loading="lazy"></article>
      </div>
      <div class="clients-proof reveal">
        <span>ESTRATÉGIA • DESIGN • TECNOLOGIA • PERFORMANCE</span>
        <strong>Marcas diferentes. Um mesmo compromisso: fazer o digital valer a pena.</strong>
      </div>`;
    trust.insertAdjacentElement('afterend', section);

    const clientsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          clientsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    section.querySelectorAll('.reveal').forEach((el) => clientsObserver.observe(el));
  }
})();