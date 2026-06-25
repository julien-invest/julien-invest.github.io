/* =============================================
   JULIEN INVEST — Main JS
   ============================================= */

/* ── GOOGLE ANALYTICS + CONSENTEMENT COOKIES (CNIL) ──
   Le suivi ne se déclenche qu'après acceptation explicite.
   Choix mémorisé dans localStorage (ji-consent: granted | denied). */
(function () {
  var GA_ID = 'G-VGHP5MBFBX';
  var KEY = 'ji-consent';

  function loadGA() {
    if (window.__jiGaLoaded) return;
    window.__jiGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}
  if (choice === 'granted') { loadGA(); return; }
  if (choice === 'denied') { return; }

  function buildBanner() {
    if (document.querySelector('.cookie-consent')) return;
    var bar = document.createElement('div');
    bar.className = 'cookie-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Consentement aux cookies de mesure d’audience');
    bar.innerHTML =
      '<p class="cookie-consent-text">Ce site utilise des cookies de mesure d’audience (Google Analytics) ' +
      'pour comprendre comment il est consulté et l’améliorer. Tu peux accepter ou refuser. ' +
      '<a href="mentions-legales.html">En savoir plus</a>.</p>' +
      '<div class="cookie-consent-actions">' +
      '<button type="button" class="cookie-consent-btn cookie-consent-refuse">Refuser</button>' +
      '<button type="button" class="cookie-consent-btn cookie-consent-accept">Accepter</button>' +
      '</div>';
    document.body.appendChild(bar);

    // Les guides sont dans /guides/ : corriger le lien "En savoir plus"
    if (/\/guides\//.test(window.location.pathname)) {
      var lnk = bar.querySelector('a');
      if (lnk) lnk.setAttribute('href', '../mentions-legales.html');
    }

    function close(decision) {
      try { localStorage.setItem(KEY, decision); } catch (e) {}
      bar.classList.remove('visible');
      setTimeout(function () { bar.remove(); }, 300);
    }
    bar.querySelector('.cookie-consent-accept').addEventListener('click', function () {
      loadGA();
      close('granted');
    });
    bar.querySelector('.cookie-consent-refuse').addEventListener('click', function () {
      close('denied');
    });
    requestAnimationFrame(function () { bar.classList.add('visible'); });
  }

  if (document.body) buildBanner();
  else document.addEventListener('DOMContentLoaded', buildBanner);
})();

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SCROLL ───────────────────────────────
  const nav = document.querySelector('.nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // ── ACTIVE NAV LINK ───────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── HAMBURGER MENU ────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });

    // ── ACCORDION CALCULATEURS ────────────────────
    const accordion = mobileMenu.querySelector('.mob-accordion');
    if (accordion) {
      const trigger = accordion.querySelector('.mob-accordion-trigger');
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        accordion.classList.toggle('open');
      });
    }
  }

  // ── STICKY CTA MOBILE (index, formation, blog, articles) ──────
  (function () {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const allowed = page === '' || page === 'index.html' || page === 'formation.html'
      || page === 'blog.html' || /^article-/.test(page);
    if (!allowed) return;
    const isFormation = page === 'formation.html';
    let dismissed = false; // état mémorisé pour la session courante uniquement (pas de stockage)
    const bar = document.createElement('div');
    bar.className = 'sticky-cta';
    bar.innerHTML =
      '<a class="sticky-cta-btn" href="' + (isFormation ? '#tarif' : 'formation.html') + '">Découvrir la formation</a>' +
      '<button class="sticky-cta-close" type="button" aria-label="Fermer">&times;</button>';
    document.body.appendChild(bar);
    bar.querySelector('.sticky-cta-close').addEventListener('click', () => {
      dismissed = true;
      bar.classList.remove('visible');
    });
    if (isFormation) {
      bar.querySelector('.sticky-cta-btn').addEventListener('click', (e) => {
        const target = document.getElementById('tarif');
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    }
    window.addEventListener('scroll', () => {
      if (dismissed) return;
      bar.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
  })();

  // ── SCROLL REVEAL ─────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));

  // ── COUNTER ANIMATION ─────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('fr-FR') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  // ── LEAD FORMS (index + ressources) ───────────
  document.querySelectorAll('form.lead-form').forEach(leadForm => {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = leadForm.querySelector('.form-submit');
      const initialLabel = btn ? btn.textContent : '';
      if (btn) { btn.textContent = 'Envoi en cours...'; btn.disabled = true; }
      try {
        const response = await fetch('https://formspree.io/f/mvznqwpd', {
          method: 'POST',
          body: new FormData(leadForm),
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error('formspree');
        leadForm.innerHTML = `
          <div style="text-align:center; padding: 40px 0;">
            <h3 style="color:white; font-family:var(--font-head); margin-bottom:8px;">Inscription confirmée</h3>
            <p style="color:rgba(255,255,255,0.7); font-size:14px;">Merci ! Tu recevras l'ebook par email prochainement.</p>
          </div>`;
      } catch {
        if (btn) { btn.textContent = 'Erreur, réessaie'; btn.disabled = false; setTimeout(() => { btn.textContent = initialLabel; }, 4000); }
      }
    });
  });

  // ── CONTACT FORM ──────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          contactForm.innerHTML = `
            <div style="text-align:center; padding:40px 0;">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--mint, #A0E7C5)" stroke-width="2" style="margin-bottom:16px;"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              <h3 style="font-family:var(--font-head); color:var(--navy); margin-bottom:8px;">Message envoyé !</h3>
              <p style="color:var(--grey-2); font-size:14px;">Je te réponds dans les 48h ouvrées.</p>
            </div>`;
        } else {
          btn.textContent = 'Erreur, réessaie';
          btn.disabled = false;
        }
      } catch {
        btn.textContent = 'Erreur, réessaie';
        btn.disabled = false;
      }
    });
  }

  // ── FAQ ACCORDION ─────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── SMOOTH ANCHOR SCROLL ──────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── CONTENT FILTERS ───────────────────────────
  const filterBtns = document.querySelectorAll('.content-filter');
  const contentCards = document.querySelectorAll('.content-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      contentCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          // Re-trigger reveal animation
          card.classList.remove('revealed');
          setTimeout(() => card.classList.add('revealed'), 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

});

// ── NEWSLETTER SUBMIT (global) ────────────────
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.newsletter-submit');
  const prenom = form.querySelector('#nl-prenom').value;

  btn.textContent = '✓ Inscription confirmée !';
  btn.style.background = 'linear-gradient(135deg, #34D399, #059669)';
  btn.disabled = true;

  form.querySelector('#nl-prenom').disabled = true;
  form.querySelector('#nl-email').disabled = true;

  // Small thank-you note
  const thanks = document.createElement('p');
  thanks.textContent = `Bienvenue ${prenom} ! Vérifie ta boîte mail pour confirmer ton inscription.`;
  thanks.style.cssText = 'margin-top:12px; color:var(--navy); font-weight:600; font-size:14px;';
  form.appendChild(thanks);
}

/* ── GUIDES ACCORDION ────────────────────────── */
document.querySelectorAll('.guide-card-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.guide-card');
    const isOpen = card.classList.contains('open');
    // Close all cards
    document.querySelectorAll('.guide-card').forEach(c => {
      c.classList.remove('open');
      c.querySelector('.guide-card-header').setAttribute('aria-expanded', 'false');
    });
    // Open clicked card (unless it was already open)
    if (!isOpen) {
      card.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
