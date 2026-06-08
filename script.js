/* ============================================================
   CDCA — Civil Dialogue Clubs of America
   script.js — Vanilla JS, no build step required
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile Navigation ---- */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Active Nav Link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__mobile .nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Scroll Fade-In Animation ---- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Directory Filter (directory.html) ---- */
  const filterBtns = document.querySelectorAll('.directory__filter-btn');
  const clubCards = document.querySelectorAll('.club-card[data-state]');

  if (filterBtns.length && clubCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        clubCards.forEach(card => {
          if (filter === 'all' || card.dataset.state === filter) {
            card.style.display = '';
            card.classList.add('fade-in', 'visible');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---- Form: Simple Client-Side Validation ---- */
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#c0392b';
          field.focus();
        }
      });

      // Basic email validation
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          valid = false;
          emailField.style.borderColor = '#c0392b';
          emailField.focus();
        }
      }

      if (!valid) {
        e.preventDefault();
        const errorMsg = form.querySelector('.form__error') ||
          (() => {
            const el = document.createElement('p');
            el.className = 'form__error';
            el.style.cssText = 'color:#c0392b;font-family:var(--font-ui);font-size:0.85rem;margin-top:12px;';
            el.textContent = 'Please fill in all required fields correctly.';
            form.appendChild(el);
            return el;
          })();
      }
    });
  });

  /* ---- Stats Counter Animation (Home Hero) ---- */
  const statNums = document.querySelectorAll('[data-count]');

  if (statNums.length && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => countObserver.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target) || target === 0) return;
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ---- Sticky Nav Shadow on Scroll ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 20
        ? '0 2px 20px rgba(0,0,0,0.35)'
        : '0 2px 16px rgba(0,0,0,0.25)';
    }, { passive: true });
  }

});
