/* ============================================================
   Naushin Tabassum Portfolio — script.js
   ============================================================ */

// ── LOADER ──────────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 600);
});

// ── AOS INIT ─────────────────────────────────────────────────
AOS.init({
  duration: 700,
  once: true,
  offset: 60,
  easing: 'ease-out-cubic',
});

// ── SCROLL PROGRESS ──────────────────────────────────────────
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
});

// ── NAVBAR ───────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER ────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ── ACTIVE NAV LINK ──────────────────────────────────────────
const sections    = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ── DARK / LIGHT TOGGLE ───────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const html        = document.documentElement;

// Read saved preference
const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);
themeIcon.className = saved === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeIcon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', next);
});

// ── TYPED TEXT ───────────────────────────────────────────────
const roles = [
  'Computer Science & Engineering Student',
  'Aspiring Data Analyst',
  'Web Development Learner',
  'Problem Solver',
];

let roleIdx   = 0;
let charIdx   = 0;
let deleting  = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = roles[roleIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 50 : 80);
}
type();

// ── ANIMATED COUNTERS ────────────────────────────────────────
const counters = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = +el.dataset.target;
    let   count  = 0;
    const step   = Math.ceil(target / 40);
    const tick = () => {
      count = Math.min(count + step, target);
      el.textContent = count;
      if (count < target) requestAnimationFrame(tick);
    };
    tick();
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ── SKILL BAR ANIMATION ──────────────────────────────────────
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const bar = entry.target;
    bar.style.width = bar.dataset.width + '%';
    barObserver.unobserve(bar);
  });
}, { threshold: 0.3 });

barFills.forEach(b => barObserver.observe(b));

// ── PROJECT FILTER ───────────────────────────────────────────
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cats = card.dataset.category.split(' ');
      const show = filter === 'all' || cats.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

// ── CONTACT FORM VALIDATION ──────────────────────────────────
const form = document.getElementById('contact-form');

function showError(id, msg) {
  document.getElementById(id).textContent = msg;
}
function clearErrors() {
  ['name-error','email-error','subject-error','message-error'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}
function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();
  let valid = true;

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  if (!name)             { showError('name-error',    'Name is required.'); valid = false; }
  if (!email)            { showError('email-error',   'Email is required.'); valid = false; }
  else if (!validateEmail(email)) { showError('email-error', 'Enter a valid email.'); valid = false; }
  if (!subject)          { showError('subject-error', 'Subject is required.'); valid = false; }
  if (!message)          { showError('message-error', 'Message is required.'); valid = false; }

  if (!valid) return;

  // Simulate send
  const btn     = form.querySelector('.btn');
  const btnText = btn.querySelector('.btn-text');
  const btnOk   = btn.querySelector('.btn-success');

  btn.disabled = true;
  btnText.style.display = 'none';
  btnOk.style.display   = 'inline-flex';

  setTimeout(() => {
    form.reset();
    btn.disabled = false;
    btnText.style.display   = 'inline-flex';
    btnOk.style.display     = 'none';
  }, 3000);
});

// ── BACK TO TOP ──────────────────────────────────────────────
const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backBtn.classList.toggle('visible', window.scrollY > 400);
});
