'use strict';

/* ====== EDIT YOUR CONTENT HERE ====== */
const CONFIG = {
  email: '', // Add a public inbox here to enable the email composer.
};

const PROJECTS = [
  {
    title: 'genzvibe',
    category: 'Web app',
    description: 'A JavaScript project exploring a modern, expressive web experience.',
    tags: ['JavaScript'],
    live: 'https://genzvibe.vercel.app',
    code: 'https://github.com/JeroGh/genzvibe',
  },
  {
    title: 'Schoolevent',
    category: 'Web app',
    description: 'An HTML project for organising and presenting school events.',
    tags: ['HTML'],
    live: '',
    code: 'https://github.com/JeroGh/Schoolevent',
  },
  {
    title: 'git-demo',
    category: 'Learning',
    description: 'A small repository for practising Git and GitHub workflows.',
    tags: ['Git'],
    live: '',
    code: 'https://github.com/JeroGh/git-demo',
  },
  {
    title: 'catchit',
    category: 'JavaScript',
    description: 'A JavaScript game project focused on interaction, timing and feedback.',
    tags: ['JavaScript'],
    live: '',
    code: 'https://github.com/JeroGh/catchit',
  },
  {
    title: 'game',
    category: 'JavaScript',
    description: 'A browser game experiment built with vanilla JavaScript.',
    tags: ['JavaScript'],
    live: '',
    code: 'https://github.com/JeroGh/game',
  },
  {
    title: 'EventManagement',
    category: 'Web app',
    description: 'An event management project for presenting and coordinating event information.',
    tags: ['HTML'],
    live: '',
    code: 'https://github.com/JeroGh/EventManagement',
  },
  {
    title: 'receipt',
    category: 'Tools',
    description: 'A lightweight receipt project with a clean, focused interface.',
    tags: ['CSS'],
    live: '',
    code: 'https://github.com/JeroGh/receipt',
  },
  {
    title: 'L.-Receipt',
    category: 'Tools',
    description: 'Another receipt interface experiment, focused on layout and presentation.',
    tags: ['HTML'],
    live: '',
    code: 'https://github.com/JeroGh/L.-Receipt',
  },
  {
    title: 'RealEstate',
    category: 'Web app',
    description: 'A JavaScript real estate project for showcasing property-focused web design.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://real-estate-nu-cyan.vercel.app',
    code: 'https://github.com/JeroGh/RealEstate',
  },
  {
    title: 'Me',
    category: 'Portfolio',
    description: 'This personal portfolio site, built by hand with HTML, CSS and JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: '',
    code: 'https://github.com/JeroGh/Me',
  },
];

const SKILLS = [
  { group: 'Front end', items: [['HTML & CSS', 90], ['JavaScript', 80], ['React', 55]] },
  { group: 'Back end', items: [['Node & Express', 60], ['PostgreSQL', 50], ['REST APIs', 65]] },
  { group: 'Tools', items: [['Git & GitHub', 75], ['Paystack', 60], ['Responsive design', 85]] },
];

/* ====== HELPERS ====== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const store = {
  get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
};

/* ====== THEME ====== */
const root = document.documentElement;
const themeBtn = $('#themeToggle');
function applyTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}
applyTheme(root.dataset.theme || 'light');
themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  store.set('theme', next);
});
// Follow the system setting until the visitor picks one manually
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!store.get('theme')) applyTheme(e.matches ? 'dark' : 'light');
});

/* ====== MOBILE MENU ====== */
const menuBtn = $('#menuToggle');
const nav = $('#nav');
function setMenu(open) {
  if (open === nav.classList.contains('open')) return;
  nav.classList.toggle('open', open);
  document.documentElement.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
// Block touch-scrolling anywhere (page and menu) while the menu is open
document.addEventListener('touchmove', e => {
  if (nav.classList.contains('open')) e.preventDefault();
}, { passive: false });
document.addEventListener('wheel', e => {
  if (nav.classList.contains('open')) e.preventDefault();
}, { passive: false });
menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', e => { if (!e.target.closest('.site-header')) setMenu(false); });
window.matchMedia('(min-width: 861px)').addEventListener('change', () => setMenu(false));

/* ====== PROJECTS + FILTERS ====== */
const projectList = $('#projects');
const orderedProjects = [...PROJECTS].sort((a, b) => Number(Boolean(b.live)) - Number(Boolean(a.live)));
projectList.innerHTML = orderedProjects.map(p => `
  <li class="project" data-cat="${p.category}">
    <div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>
    <div class="links">
      ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer">Live site</a>` : '<span class="link-muted">Coming soon</span>'}
      <a href="${p.code}" target="_blank" rel="noopener noreferrer">Code</a>
    </div>
  </li>`).join('');

const cats = ['All', ...new Set(PROJECTS.map(p => p.category))];
const filters = $('#filters');
filters.innerHTML = cats.map((c, i) => `<button type="button" aria-pressed="${i === 0}">${c}</button>`).join('');
filters.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  $$('button', filters).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
  $$('.project').forEach(el => { el.hidden = btn.textContent !== 'All' && el.dataset.cat !== btn.textContent; });
});

/* ====== SKILLS (bars animate when scrolled into view) ====== */
const skillsGrid = $('#skills-grid');
skillsGrid.innerHTML = SKILLS.map(g => `
  <div class="skill-group">
    <h3>${g.group}</h3>
    ${g.items.map(([name, pct]) => `
      <div class="bar">
        <div class="bar-label"><span>${name}</span><span>${pct}%</span></div>
        <div class="bar-track"><div class="bar-fill" data-pct="${pct}"></div></div>
      </div>`).join('')}
  </div>`).join('') + '';
const barObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      $$('.bar-fill', en.target).forEach(b => { b.style.width = b.dataset.pct + '%'; });
      barObserver.unobserve(en.target);
    }
  });
}, { threshold: 0.3 }) : null;
if (barObserver) {
  $$('.skill-group').forEach(g => barObserver.observe(g));
} else {
  $$('.bar-fill').forEach(b => { b.style.width = b.dataset.pct + '%'; });
}

/* ====== SCROLL-SPY NAV ====== */
const links = $$('.nav a');
const spy = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' }) : null;
if (spy) $$('main section[id]').forEach(s => spy.observe(s));

/* ====== CONTACT FORM (opens the visitor's email app) ====== */
$('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, err = $('#formError');
  const name = f.name.value.trim(), email = f.email.value.trim(), msg = f.message.value.trim();
  if (!name || !msg || !/^\S+@\S+\.\S+$/.test(email)) {
    err.textContent = 'Enter your name, a valid email and a message, then try again.';
    return;
  }
  if (!CONFIG.email) {
    err.textContent = 'The email form is not connected yet. Please reach out through GitHub for now.';
    return;
  }
  err.textContent = '';
  const body = `${msg}\n\nFrom: ${name} (${email})`;
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Website enquiry from ' + name)}&body=${encodeURIComponent(body)}`;
});

$('#year').textContent = new Date().getFullYear();