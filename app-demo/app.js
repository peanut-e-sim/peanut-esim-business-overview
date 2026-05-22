/* =========================================================
   Peanut eSIM — App Demo v3
   Vanilla JS routing + interactions for the SPA prototype.
   ========================================================= */

(function () {
  'use strict';

  const screens = document.querySelectorAll('.screen');
  const bottomNav = document.getElementById('bottom-nav');
  const tabs = document.querySelectorAll('.bottom-nav .tab');
  const loader = document.getElementById('loader-overlay');
  const loaderText = document.getElementById('loader-text');
  const toast = document.getElementById('toast');

  // Tabs that show the global bottom nav (true = show; false = hide)
  const NAV_VISIBLE = {
    splash: false,
    home: true,
    plans: true,
    'smart-plan-result': false,
    'plan-detail': false,
    checkout: false,
    'purchase-success': false,
    'my-esims': true,
    'esim-detail': false,
    'crew-recs': true,
    'place-detail': true,
    'add-place': false,
    'my-places': true,
    'my-places-2': true,
    rewards: true,
    'ai-chat-1': true,
    'ai-chat-2': true,
    hotels: true,
    'hotel-detail': true,
    'style-guide': false,
  };

  // Which bottom-nav tab is the "current" tab for each screen
  const ACTIVE_TAB = {
    home: 'home',
    plans: 'plans',
    'smart-plan-result': null,
    'plan-detail': null,
    checkout: null,
    'purchase-success': null,
    'my-esims': 'esims',
    'esim-detail': null,
    'crew-recs': 'home',
    'place-detail': 'home',
    'my-places': 'profile',
    'my-places-2': 'profile',
    rewards: 'profile',
    'ai-chat-1': 'profile',
    'ai-chat-2': 'profile',
    hotels: 'hotels',
    'hotel-detail': 'hotels',
  };

  // ---- Routing ----
  let currentScreen = null;
  let backStack = [];

  function show(screen, pushHistory = true) {
    if (!screen || screen === currentScreen) return;
    screens.forEach(s => s.classList.remove('is-active'));
    const el = document.querySelector(`[data-screen="${screen}"]`);
    if (!el) {
      console.warn('Screen not found:', screen);
      return;
    }
    el.classList.add('is-active');
    el.querySelectorAll('.screen-scroll').forEach(c => { c.scrollTop = 0; });

    // Bottom nav visibility
    bottomNav.classList.toggle('is-hidden', !NAV_VISIBLE[screen]);

    // Active tab state
    const tab = ACTIVE_TAB[screen];
    tabs.forEach(t => t.classList.toggle('is-active', tab && t.dataset.tab === tab));

    if (pushHistory && currentScreen && currentScreen !== screen) backStack.push(currentScreen);
    currentScreen = screen;

    // Mirror in URL hash for dev navigation only
    if (history.replaceState) history.replaceState(null, '', `#/${screen}`);
  }

  function back() {
    const prev = backStack.pop();
    if (prev) show(prev, false);
  }

  function showLoader(text, ms, next) {
    loaderText.textContent = text || 'Loading…';
    loader.classList.add('is-active');
    setTimeout(() => {
      loader.classList.remove('is-active');
      if (next) next();
    }, ms);
  }

  let toastTimer = null;
  function showToast(text, ms = 1800) {
    toast.textContent = text;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), ms);
  }

  // ---- Splash auto-advance (only if user landed on splash) ----
  function maybeAdvanceSplash() {
    if (currentScreen === 'splash') setTimeout(() => { if (currentScreen === 'splash') show('home'); }, 1800);
  }

  // ---- Bottom nav handlers ----
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      if (target) show(target);
    });
  });

  // ---- Global delegated click handler (data-go="screen-id") ----
  document.addEventListener('click', (e) => {
    const goEl = e.target.closest('[data-go]');
    if (goEl) {
      e.preventDefault();
      const target = goEl.dataset.go;
      const loaderMs = parseInt(goEl.dataset.loader || '0', 10);
      const loaderTxt = goEl.dataset.loaderText || 'Loading…';
      if (loaderMs > 0) {
        showLoader(loaderTxt, loaderMs, () => show(target));
      } else {
        show(target);
      }
      return;
    }

    const backEl = e.target.closest('[data-back]');
    if (backEl) {
      e.preventDefault();
      back();
      return;
    }

    const toastEl = e.target.closest('[data-toast]');
    if (toastEl) {
      e.preventDefault();
      showToast(toastEl.dataset.toast);
      const after = toastEl.dataset.after;
      if (after) setTimeout(() => show(after), 900);
      return;
    }
  });

  // ---- Plan Detail: data option selection updates CTA ----
  document.querySelectorAll('[data-screen="plan-detail"] .plan-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const all = btn.parentElement.querySelectorAll('.plan-option');
      all.forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      const data = btn.dataset.data || '5GB';
      const price = btn.dataset.price || '$14';
      const cta = document.getElementById('plan-buy-cta');
      if (cta) cta.textContent = `Buy ${data} · ${price}`;
      const checkoutTotal = document.getElementById('checkout-total');
      const checkoutItem  = document.getElementById('checkout-item');
      const checkoutPay   = document.getElementById('checkout-pay');
      if (checkoutTotal && checkoutItem && checkoutPay) {
        const num = parseFloat(price.replace('$','')) || 14;
        const discounted = (num - 1.5).toFixed(2);
        checkoutItem.textContent = `Japan · ${data} · 14 days`;
        checkoutTotal.textContent = `$${discounted}`;
        checkoutPay.textContent  = `Pay $${discounted}`;
      }
    });
  });

  // ---- Top-up sheet (eSIM Detail) ----
  const topUpOpenBtn = document.getElementById('topup-open');
  const topUpSheet = document.getElementById('topup-sheet');
  if (topUpOpenBtn && topUpSheet) {
    topUpOpenBtn.addEventListener('click', () => topUpSheet.classList.add('is-open'));
    topUpSheet.querySelector('.sheet-backdrop').addEventListener('click', () => topUpSheet.classList.remove('is-open'));
    topUpSheet.querySelector('.sheet-close')?.addEventListener('click', () => topUpSheet.classList.remove('is-open'));
  }

  // ---- Rewards: redeem buttons ----
  document.querySelectorAll('.reward-redeem').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Redeemed! Added to My eSIMs');
      const balanceEl = document.getElementById('rewards-balance');
      if (balanceEl) {
        const cost = parseInt(btn.dataset.cost || '100', 10);
        const current = parseInt(balanceEl.textContent.replace(/[^\d]/g,''),10) || 1890;
        balanceEl.textContent = (current - cost).toLocaleString();
      }
    });
  });

  // ---- Add-a-place chip selection ----
  document.querySelectorAll('.chip-group').forEach(group => {
    group.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.chip').forEach(c => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
      });
    });
  });

  // ---- Aviation rating: 5 flight icons ----
  document.querySelectorAll('.aviation-rating').forEach(group => {
    const icons = group.querySelectorAll('.material-symbols-outlined');
    icons.forEach((icon, idx) => {
      icon.addEventListener('click', () => {
        icons.forEach((ic, j) => {
          if (j <= idx) { ic.style.color = '#B47A48'; ic.style.fontVariationSettings = "'FILL' 1"; }
          else { ic.style.color = '#bdc9c5'; ic.style.fontVariationSettings = "'FILL' 0"; }
        });
      });
    });
  });

  // ---- My Places page toggle ----
  document.querySelectorAll('[data-places-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const which = btn.dataset.placesPage;
      show(which === '2' ? 'my-places-2' : 'my-places');
    });
  });

  // ---- AI chat input demo: each send swaps between chat-1 and chat-2 ----
  const chatForms = document.querySelectorAll('.ai-chat-form');
  chatForms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (!input.value.trim()) return;
      input.value = '';
      // toggle between the two prebuilt chat screens
      show(currentScreen === 'ai-chat-1' ? 'ai-chat-2' : 'ai-chat-1');
    });
  });

  // ---- Rewards tab switch (Redeem / History / How to earn) ----
  document.querySelectorAll('.rewards-tab').forEach(t => {
    t.addEventListener('click', () => {
      const id = t.dataset.rewardsTab;
      document.querySelectorAll('.rewards-tab').forEach(x => x.classList.toggle('is-active', x === t));
      document.querySelectorAll('.rewards-panel').forEach(p => p.classList.toggle('is-active', p.dataset.rewardsPanel === id));
    });
  });

  // ---- Hero parallax-ish on crew-recs ----
  // (subtle — keeps it cheap)
  document.querySelectorAll('.screen-scroll').forEach(s => {
    s.addEventListener('scroll', () => {
      const hero = s.querySelector('[data-parallax]');
      if (hero) hero.style.transform = `translateY(${s.scrollTop * 0.12}px)`;
    });
  });

  // ---- Initial route: respect hash on load, else splash ----
  const hash = window.location.hash.replace('#/','');
  if (hash && document.querySelector(`[data-screen="${hash}"]`)) {
    show(hash, false);
  } else {
    show('splash', false);
    maybeAdvanceSplash();
  }
})();
