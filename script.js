const I5_WHATSAPP = '5511998290083';
const I5_PHONE = '11 99829-0083';
document.querySelectorAll('a[href*="wa.me/"], a[href^="tel:"]').forEach((link) => {
  if (link.href.includes('wa.me/')) {
    const query = link.href.includes('?') ? link.href.slice(link.href.indexOf('?')) : '';
    link.href = `https://wa.me/${I5_WHATSAPP}${query}`;
  } else {
    link.href = `tel:+${I5_WHATSAPP}`;
  }
});
const oldPhones = ['11 99893-97691','11 99893 97691','119989397691','11 99893-9769','11998939769','55119989397691'];
const phoneWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let phoneNode;
while ((phoneNode = phoneWalker.nextNode())) {
  oldPhones.forEach((oldPhone) => { if (phoneNode.nodeValue.includes(oldPhone)) phoneNode.nodeValue = phoneNode.nodeValue.split(oldPhone).join(I5_PHONE); });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const mainNav = document.querySelector('.nav');
if (mainNav && !mainNav.querySelector('[data-layout-switch]')) {
  const layout2Link = document.createElement('a');
  layout2Link.href = 'layout2.html';
  layout2Link.textContent = 'Layout 2';
  layout2Link.dataset.layoutSwitch = 'true';
  layout2Link.style.color = '#8ab7ff';
  layout2Link.style.fontWeight = '700';
  mainNav.appendChild(layout2Link);
}

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealEls.forEach(el => observer.observe(el));

const cursor = document.querySelector('.cursor-glow');
if (!reduceMotion && window.innerWidth > 900) {
  window.addEventListener('pointermove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

const parallaxEls = document.querySelectorAll('[data-depth]');
if (!reduceMotion) {
  window.addEventListener('pointermove', e => {
    const x = (e.clientX / window.innerWidth - .5);
    const y = (e.clientY / window.innerHeight - .5);
    parallaxEls.forEach(el => {
      const d = Number(el.dataset.depth || .1);
      el.style.transform = `translate3d(${x * d * 140}px, ${y * d * 140}px, 0)`;
    });
  });
}

document.querySelectorAll('.magnetic').forEach(el => {
  if (reduceMotion) return;
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * .12}px, ${y * .12}px)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});

document.querySelectorAll('.tilt').forEach(card => {
  if (reduceMotion || window.innerWidth < 900) return;
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-2px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

const countEls = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const duration = 1000;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: .7 });
countEls.forEach(el => countObserver.observe(el));

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  createParticles();
}

function createParticles() {
  const amount = Math.min(95, Math.floor(innerWidth / 14));
  particles = Array.from({length: amount}, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.25 + .25,
    vx: (Math.random() - .5) * .12,
    vy: (Math.random() - .5) * .12,
    a: Math.random() * .5 + .12
  }));
}

function drawParticles() {
  ctx.clearRect(0,0,innerWidth,innerHeight);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < -10) p.x = innerWidth + 10;
    if (p.x > innerWidth + 10) p.x = -10;
    if (p.y < -10) p.y = innerHeight + 10;
    if (p.y > innerHeight + 10) p.y = -10;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(132,183,255,${p.a})`;
    ctx.fill();
  });
  if (!reduceMotion) requestAnimationFrame(drawParticles);
}

resizeCanvas();
if (!reduceMotion) drawParticles();
window.addEventListener('resize', resizeCanvas);

const header = document.querySelector('.site-header');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.style.background = y > 40 ? 'rgba(5,9,20,.82)' : 'rgba(5,9,20,.68)';
  header.style.transform = `translateX(-50%) translateY(${y > lastY && y > 180 ? '-95px' : '0'})`;
  lastY = y;
}, { passive: true });