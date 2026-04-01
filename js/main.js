// ═══════════════════════════════════════
// Navigation — hidden by default, reveals on scroll
// ═══════════════════════════════════════

const nav = document.getElementById('nav');
const navToggle = document.querySelector('.nav-toggle');
let lastScrollY = 0;

function updateNav() {
  const scrollY = window.scrollY;
  const heroHeight = window.innerHeight * 0.6;

  if (scrollY > heroHeight) {
    nav.classList.add('nav-visible');
  } else {
    nav.classList.remove('nav-visible');
  }

  lastScrollY = scrollY;
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Mobile nav toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    document.body.style.overflow = nav.classList.contains('nav-open') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      document.body.style.overflow = '';
    });
  });
}

// ═══════════════════════════════════════
// FAQ Accordion
// ═══════════════════════════════════════

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const chevron = button.querySelector('.faq-chevron');
    const isActive = item.classList.contains('active');

    // Close others
    document.querySelectorAll('.faq-item.active').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('active');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
        openItem.querySelector('.faq-chevron').textContent = '+';
      }
    });

    // Toggle
    item.classList.toggle('active');
    if (!isActive) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      chevron.textContent = '\u2212'; // minus sign
    } else {
      answer.style.maxHeight = null;
      chevron.textContent = '+';
    }
  });
});

// ═══════════════════════════════════════
// Reveal animation — ONLY on hero content
// (Sparingly applied — most content is immediately visible)
// ═══════════════════════════════════════

const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}
