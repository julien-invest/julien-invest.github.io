/* ── Marqueur JS : posé immédiatement pour que le CSS puisse masquer
   les éléments à révéler. Sans JS, la classe est absente et tout le
   contenu reste visible. ── */
(function () {
  var r = document.documentElement;
  if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    r.classList.add('has-js');
  }
})();

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

    // ── ACCORDIONS (Outils, Parrainages…) ────────────────────
    mobileMenu.querySelectorAll('.mob-accordion').forEach((accordion) => {
      const trigger = accordion.querySelector('.mob-accordion-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        accordion.classList.toggle('open');
      });
    });
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

/* ══════════════════════════════════════════════════════════
   ANIMATIONS — ajouté le 12/08/2026
   Barre de progression, cascade des grilles, révélation des
   éléments ajoutés après coup. Rien ne s'exécute si l'utilisateur
   a demandé à réduire les animations.
   ══════════════════════════════════════════════════════════ */
(function () {
  if (!document.documentElement.classList.contains('has-js')) return;

  function init() {
    /* ── 1. Barre de progression, uniquement sur les pages longues ── */
    if (document.querySelector('.article-body, .guide-article')) {
      var bar = document.createElement('div');
      bar.className = 'reading-progress';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
      var ticking = false;
      function update() {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
        ticking = false;
      }
      window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      }, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      update();
    }

    /* ── 2. Cascade sur les grilles : on numérote les enfants, le CSS
           transforme l'indice en délai. ── */
    var GRILLES = [
      '.article-related-grid', '.livret-cards-grid', '.broker-cards',
      '.community-stats-grid', '.footer-socials'
    ];
    document.querySelectorAll(GRILLES.join(',')).forEach(function (grille) {
      var enfants = grille.children;
      if (enfants.length < 2) return;
      grille.classList.add('ji-stagger');
      for (var i = 0; i < enfants.length; i++) {
        enfants[i].style.setProperty('--ji-i', i);
      }
    });

    /* ── 3. Observer commun : révèle .reveal et .ji-stagger.
           L'observer historique ne voyait pas les grilles ajoutées ici. ── */
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .ji-stagger').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.ji-stagger, .reveal:not(.visible)').forEach(function (el) {
      io.observe(el);
    });

    /* ── 4. Filet de sécurité : si un élément à révéler n'a jamais été
           vu par l'observer au bout de 3 s, on l'affiche quand même.
           Évite tout contenu invisible en cas de mise en page inattendue. ── */
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.visible), .ji-stagger:not(.visible)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
      });
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ══════════════════════════════════════════════════════════
   SUIVI DES CONVERSIONS — ajouté le 13/08/2026
   Envoie des événements GA4 pour savoir ce qui rapporte vraiment.
   Tout passe par la délégation d'événements : aucune page HTML
   n'a besoin d'être modifiée. Rien n'est envoyé si le visiteur
   a refusé les cookies (gtag n'existe alors pas).
   ══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function envoyer(nom, params) {
    if (typeof window.gtag !== 'function') return;   // consentement refusé
    params = params || {};
    params.page_source = location.pathname.replace(/^\//, '') || 'index.html';
    params.transport_type = 'beacon';                 // survit à la navigation
    window.gtag('event', nom, params);
  }

  /* Nom lisible du partenaire, déduit du domaine de destination. */
  function partenaire(url) {
    try {
      var h = new URL(url, location.href).hostname.replace(/^www\./, '');
      var map = {
        'refnocode.trade.re': 'Trade Republic', 'degiro.fr': 'DEGIRO',
        'fortuneo.fr': 'Fortuneo', 'boursobank.com': 'BoursoBank',
        'boursedirect.fr': 'Bourse Direct', 'linxea.mention-me.com': 'Linxea',
        'revolut.com': 'Revolut', 'wise.com': 'Wise', 'shop.ledger.com': 'Ledger',
        'trezorio.refr.cc': 'Trezor', 'accounts.binance.com': 'Binance',
        'coinbase.com': 'Coinbase', 'swissborg.com': 'SwissBorg',
        'deblock.com': 'Deblock', 'bitstack-app.com': 'Bitstack',
        'crypto.com': 'Crypto.com', 'app.bricks.co': 'Bricks',
        'app.lapremierebrique.fr': 'La Première Brique',
        'invest.fundora.fr': 'Fundora', 'clubfunding.eu': 'ClubFunding',
        'meria.onelink.me': 'Meria', 'kucoin.com': 'KuCoin',
        'americanexpress.com': 'Amex', 'xport.al': 'XExchange', 'xtb.com': 'XTB'
      };
      return map[h] || h;
    } catch (e) { return 'inconnu'; }
  }

  /* Où se trouve l'élément cliqué : répond à « quel emplacement convertit ». */
  function emplacement(el) {
    if (el.closest('.avis-cta-box'))       return 'encadre_avis';
    if (el.closest('.broker-cards'))       return 'cartes_courtiers';
    if (el.closest('.cc-table, .cc-card')) return 'comparateur';
    if (el.closest('.article-cta'))        return 'cta_fin_article';
    if (el.closest('.article-related'))    return 'articles_lies';
    if (el.closest('.p-card'))             return 'page_parrainage';
    if (el.closest('.article-body'))       return 'corps_article';
    if (el.closest('.page-hero, .article-hero, .cc-hero')) return 'haut_de_page';
    if (el.closest('.nav'))                return 'navigation';
    if (el.closest('.footer'))             return 'pied_de_page';
    return 'autre';
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';

    /* 1. Clic sur un lien partenaire : le cœur du revenu affilié. */
    if (a.rel && a.rel.indexOf('sponsored') !== -1) {
      envoyer('clic_affilie', {
        partenaire: partenaire(href),
        emplacement: emplacement(a),
        lien_url: href.slice(0, 120)
      });
      return;
    }

    /* 2. Clic vers la page de paiement de la formation. */
    if (href.indexOf('systeme.io') !== -1) {
      envoyer('clic_paiement_formation', { emplacement: emplacement(a) });
      return;
    }

    /* 3. Clic vers la page formation : mesure quel article y envoie. */
    if (/(^|\/)formation\.html/.test(href)) {
      envoyer('clic_cta_formation', { emplacement: emplacement(a) });
      return;
    }

    /* 4. Réservation de coaching. */
    if (href.indexOf('calendly.com') !== -1) {
      envoyer('clic_reservation_coaching', { emplacement: emplacement(a) });
      return;
    }
  }, true);

  /* 5. Capture d'email : toute soumission de formulaire du site. */
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || f.tagName !== 'FORM') return;
    var type = 'autre';
    if (f.id === 'contact-form')                type = 'contact';
    else if (f.id === 'quiz-gate-form')         type = 'quiz';
    else if (f.id === 'res-ebook-form')         type = 'ebook_quiz';
    else if (f.id === 'aud-gate-form')          type = 'audit';
    envoyer('capture_email', { type_formulaire: type, emplacement: emplacement(f) });
  }, true);

  /* 6. Téléchargement de l'ebook, y compris quand il part automatiquement. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href$=".pdf"]');
    if (a) envoyer('telechargement_pdf', { fichier: (a.getAttribute('href') || '').split('/').pop() });
  }, true);

  /* 7. Profondeur de lecture des articles : distingue le trafic qui lit
        vraiment de celui qui rebondit. Un seul envoi par palier. */
  if (document.querySelector('.article-body, .guide-article')) {
    var paliers = [25, 50, 75, 100], vus = {};
    var enCours = false;
    window.addEventListener('scroll', function () {
      if (enCours) return;
      enCours = true;
      requestAnimationFrame(function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var pct = max > 0 ? (window.scrollY / max) * 100 : 100;
        paliers.forEach(function (p) {
          if (pct >= p && !vus[p]) { vus[p] = true; envoyer('lecture_article', { palier: p + '%' }); }
        });
        enCours = false;
      });
    }, { passive: true });
  }
})();
