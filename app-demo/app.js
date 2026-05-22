/* =================================================================
   Peanut eSIM — App Demo
   Vanilla JS — no frameworks.
   ================================================================= */

(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const viewport     = $('#viewport');
  const bottomNav    = $('#bottom-nav');
  const loadingOver  = $('#loading-overlay');
  const loadingLabel = $('#loading-label');

  /* ----- 1.  SCREEN NAVIGATION ----- */
  function goTo(screenId) {
    const target = viewport.querySelector(`.screen[data-screen="${screenId}"]`);
    if (!target) return;

    // hide all
    $$('.screen', viewport).forEach(s => s.classList.remove('is-active'));
    // show target — scroll to top
    target.classList.add('is-active');
    target.scrollTop = 0;

    // Bottom nav visibility per screen
    const showsNav = target.dataset.showsBottomNav === 'true';
    bottomNav.classList.toggle('is-hidden', !showsNav);

    // Active tab
    const activeTab = target.dataset.navTab;
    $$('.nav-tab', bottomNav).forEach(t => {
      t.classList.toggle('is-active', activeTab && t.dataset.tab === activeTab);
    });
  }
  window.__goTo = goTo; // for debug

  /* ----- 2.  LOADING OVERLAY ----- */
  function showLoading(label = 'Reading your May roster…') {
    loadingLabel.textContent = label;
    loadingOver.classList.add('is-open');
  }
  function hideLoading() { loadingOver.classList.remove('is-open'); }

  /* ----- 3.  GLOBAL CLICK ROUTER ----- */
  document.addEventListener('click', (e) => {
    const goEl = e.target.closest('[data-go]');
    const actEl = e.target.closest('[data-action]');

    // navigation
    if (goEl && !actEl) {
      e.preventDefault();
      const dest = goEl.dataset.go;
      // Topup deep-link from My eSIMs row
      if (goEl.dataset.openTopup === '1') {
        goTo(dest);
        // open topup after the screen swap
        setTimeout(() => $('#topup-overlay').classList.add('is-open'), 250);
        return;
      }
      goTo(dest);
      return;
    }

    // actions
    if (actEl) {
      const action = actEl.dataset.action;
      e.preventDefault();
      handleAction(action, actEl);
    }
  });

  function handleAction(action, el) {
    switch (action) {

      case 'upload-roster': {
        showLoading('Reading your May roster…');
        setTimeout(() => {
          hideLoading();
          goTo('result');
        }, 2000);
        break;
      }

      case 'activate-plan': {
        showLoading('Activating your plan…');
        setTimeout(() => {
          hideLoading();
          goTo('esims');
        }, 1200);
        break;
      }

      case 'pay': {
        showLoading('Processing payment…');
        setTimeout(() => {
          hideLoading();
          goTo('esims');
        }, 1000);
        break;
      }

      case 'open-topup': {
        $('#topup-overlay').classList.add('is-open');
        break;
      }
      case 'close-topup': {
        $('#topup-overlay').classList.remove('is-open');
        break;
      }

      case 'reset-demo': {
        goTo('splash');
        setTimeout(() => goTo('home'), 1800);
        break;
      }
    }
  }

  /* ----- 4.  PLAN-DETAIL OPTION SELECTION ----- */
  const optionList = $('#plan-options');
  const buyLabel   = $('#buy-cta-label');
  if (optionList && buyLabel) {
    optionList.addEventListener('click', (e) => {
      const card = e.target.closest('.option-card');
      if (!card) return;
      $$('.option-card', optionList).forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');

      const gb    = card.dataset.gb;
      const price = card.dataset.price;
      buyLabel.textContent = `Buy ${gb}GB · $${price}`;

      // also reflect into checkout summary in case user navigates there
      const summaryPrice = $('#checkout-line-price');
      const totalPrice   = $('#checkout-total');
      const ctaTotal     = $('#checkout-cta-total');
      // crew discount 1.50 flat
      const total = (parseFloat(price) - 1.5).toFixed(2);
      if (summaryPrice) summaryPrice.textContent = `$${parseFloat(price).toFixed(2)}`;
      if (totalPrice)   totalPrice.textContent   = `$${total}`;
      if (ctaTotal)     ctaTotal.textContent     = `$${total}`;
    });
  }

  /* ----- 5.  TOGGLES (eSIM detail) ----- */
  $$('[data-toggle]').forEach(t => {
    t.addEventListener('click', () => t.classList.toggle('is-on'));
  });

  /* ----- 6.  TOPUP SHEET — opt selection ----- */
  const topupOpts = $$('#topup-overlay .opt');
  topupOpts.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      topupOpts.forEach(o => o.classList.remove('is-selected'));
      opt.classList.add('is-selected');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  /* ----- 7.  AUTO-ADVANCE FROM SPLASH ----- */
  // After 1.8s on splash, hop to home
  setTimeout(() => {
    if ($('.screen[data-screen="splash"]').classList.contains('is-active')) {
      goTo('home');
    }
  }, 1800);

  /* ----- 8.  DEFAULT NAV STATE ----- */
  bottomNav.classList.add('is-hidden'); // hidden while on splash

})();
