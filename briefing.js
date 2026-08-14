(() => {
  const form = document.getElementById('briefingForm');
  if (!form) return;

  const serviceInputs = [...form.querySelectorAll('[data-service]')];
  const panels = [...form.querySelectorAll('[data-panel]')];
  const cards = [...form.querySelectorAll('.service-card')];

  function setService(service) {
    panels.forEach((panel) => {
      const active = panel.dataset.panel === service;
      panel.hidden = !active;
      panel.querySelectorAll('input, textarea, select').forEach((field) => {
        if (field.dataset.required === 'true') field.required = active;
        field.disabled = !active;
      });
    });
    cards.forEach((card) => {
      const input = card.querySelector('[data-service]');
      card.classList.toggle('is-selected', input && input.dataset.service === service);
    });
  }

  serviceInputs.forEach((input) => {
    input.addEventListener('change', () => {
      if (input.checked) setService(input.dataset.service);
    });
  });

  setService(serviceInputs.find((input) => input.checked)?.dataset.service || 'site');

  form.addEventListener('submit', (event) => {
    const files = [...form.querySelectorAll('input[type="file"]')].flatMap((input) => [...input.files]);
    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > 10 * 1024 * 1024) {
      event.preventDefault();
      alert('Os arquivos anexados ultrapassam 10 MB. Reduza o tamanho dos arquivos e tente novamente.');
      return;
    }

    const checkedService = serviceInputs.find((input) => input.checked);
    const subject = form.querySelector('input[name="_subject"]');
    const company = form.querySelector('input[name="Nome da empresa"]')?.value?.trim();
    if (subject && checkedService) {
      subject.value = `Novo briefing I5Media — ${checkedService.value}${company ? ` — ${company}` : ''}`;
    }
  });
})();