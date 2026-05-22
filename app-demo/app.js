/* ============================================================
   PEANUT eSIM — Prototype app logic
   Pure vanilla JS. No framework. RN-portable patterns.
   ============================================================ */

(function () {
  'use strict';

  // ---------- Screen routing ----------

  const SCREENS = [
    'splash',
    'onboarding',
    'signin',
    'verify',
    'home',
    'upload-loading',
    'result',
    'plans',
    'plan-detail',
    'checkout',
    'success',
    'my-esims',
    'esim-detail',
    'profile'
  ];

  const NAV_SCREENS = ['home', 'plans', 'my-esims', 'profile', 'result', 'esim-detail'];

  let history = ['splash'];
  let currentScreen = 'splash';

  const stack = document.getElementById('screen-stack');
  const bottomNav = document.getElementById('bottom-nav');

  function getScreen(name) {
    return stack.querySelector('.screen[data-screen="' + name + '"]');
  }

  function setActive(name, opts) {
    opts = opts || {};
    const prevName = currentScreen;
    if (prevName === name) return;

    const next = getScreen(name);
    const prev = getScreen(prevName);
    if (!next) return;

    const isBack = !!opts.back;

    if (prev) {
      if (isBack) {
        prev.style.transition = 'transform 320ms cubic-bezier(0.32, 0.72, 0.16, 1)';
        prev.style.transform = 'translateX(100%)';
      } else {
        prev.classList.remove('active');
        prev.classList.add('prev');
      }
    }
    next.style.transform = isBack ? 'translateX(-30%)' : 'translateX(100%)';
    next.style.visibility = 'visible';

    requestAnimationFrame(() => requestAnimationFrame(() => {
      next.style.transition = 'transform 360ms cubic-bezier(0.32, 0.72, 0.16, 1)';
      next.style.transform = 'translateX(0)';
      next.classList.add('active');
      next.classList.remove('prev');
    }));

    setTimeout(() => {
      if (prev && prev !== next) {
        prev.classList.remove('prev');
        prev.style.transform = '';
        prev.style.transition = '';
        prev.style.visibility = '';
      }
      next.style.transform = '';
      next.style.transition = '';
    }, 380);

    currentScreen = name;

    if (!isBack) {
      history.push(name);
    } else {
      history.pop();
    }

    updateNav();
    window.location.hash = name;
    const sb = next.querySelector('.scroll-body, .screen-body');
    if (sb) sb.scrollTop = 0;
  }

  function goBack() {
    if (history.length < 2) return;
    const prev = history[history.length - 2];
    setActive(prev, { back: true });
  }

  function updateNav() {
    if (NAV_SCREENS.indexOf(currentScreen) !== -1) {
      bottomNav.classList.add('show');
    } else {
      bottomNav.classList.remove('show');
    }
    bottomNav.querySelectorAll('.nav-item').forEach(item => {
      const target = item.dataset.target;
      const navName = item.dataset.nav;
      let active = false;
      if (target === currentScreen) active = true;
      if (navName === 'home' && currentScreen === 'result') active = true;
      if (navName === 'my-esims' && currentScreen === 'esim-detail') active = true;
      if (navName === 'plans' && currentScreen === 'plan-detail') active = true;
      item.classList.toggle('active', active);
    });
  }

  // ---------- Generic actions ----------

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-action]');
    if (!a) return;
    const action = a.dataset.action;
    if (action === 'goto') {
      const target = a.dataset.target;
      if (target) setActive(target);
    } else if (action === 'back') {
      goBack();
    }
  });

  bottomNav.addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item');
    if (!item) return;
    const target = item.dataset.target;
    if (target && target !== currentScreen) setActive(target);
  });

  // ---------- Splash auto-advance ----------

  setTimeout(() => {
    if (currentScreen === 'splash') setActive('onboarding');
  }, 1700);

  // ---------- Onboarding slides ----------

  const onbSlides = document.querySelectorAll('.onb-slide');
  const onbDots = document.querySelectorAll('#onb-dots .dot');
  const onbNext = document.getElementById('onb-next');
  let onbIdx = 0;

  function setOnbSlide(idx) {
    onbIdx = idx;
    onbSlides.forEach(s => s.classList.toggle('active', Number(s.dataset.idx) === idx));
    onbDots.forEach((d, i) => d.classList.toggle('active', i === idx));
    onbNext.textContent = idx === onbSlides.length - 1 ? 'Get started' : 'Next';
  }

  onbNext.addEventListener('click', () => {
    if (onbIdx < onbSlides.length - 1) {
      setOnbSlide(onbIdx + 1);
    } else {
      setActive('signin');
    }
  });

  let touchStartX = 0;
  const onbSlidesContainer = document.getElementById('onb-slides');
  onbSlidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  onbSlidesContainer.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0 && onbIdx < onbSlides.length - 1) setOnbSlide(onbIdx + 1);
    if (dx > 0 && onbIdx > 0) setOnbSlide(onbIdx - 1);
  }, { passive: true });

  // ---------- Tabs ----------

  document.querySelectorAll('[data-tabs]').forEach(group => {
    group.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      const name = tab.dataset.tab;
      const parent = group.parentElement;
      group.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === tab));
      parent.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.panel === name);
      });
    });
  });

  // ---------- Verify steps ----------

  const verifyNext = document.getElementById('verify-next');
  const verifySteps = document.querySelectorAll('.verify-step');
  const verifyStepLabel = document.getElementById('verify-step-label');
  const verifyEmailEcho = document.getElementById('verify-email-echo');
  const airlineEmail = document.getElementById('airline-email');

  function setVerifyStep(n) {
    verifySteps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === n));
    verifyStepLabel.textContent = n + ' of 2';
  }

  verifyNext.addEventListener('click', () => {
    if (airlineEmail.value) verifyEmailEcho.textContent = airlineEmail.value;
    setVerifyStep(2);
  });

  const otpBoxes = document.querySelectorAll('.otp-box');
  otpBoxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      if (box.value && i < otpBoxes.length - 1) otpBoxes[i + 1].focus();
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && i > 0) otpBoxes[i - 1].focus();
    });
  });

  // ---------- Upload loading sequence ----------

  const loadingStatus = document.getElementById('loading-status');
  const loadingStepsCopy = [
    'Reading your roster…',
    'Matching destinations…',
    'Optimising data plan…'
  ];

  function runLoadingSequence() {
    let i = 0;
    loadingStatus.textContent = loadingStepsCopy[0];
    const id = setInterval(() => {
      i++;
      if (i >= loadingStepsCopy.length) {
        clearInterval(id);
        setTimeout(() => {
          if (currentScreen === 'upload-loading') setActive('result');
        }, 400);
        return;
      }
      loadingStatus.textContent = loadingStepsCopy[i];
    }, 700);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-target="upload-loading"]');
    if (a) setTimeout(runLoadingSequence, 200);
  });

  // ---------- Plan option selection ----------

  document.querySelectorAll('.plan-options .plan-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.plan-options .plan-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const price = opt.querySelector('.plan-option-price').textContent;
      const cta = document.querySelector('.screen-plan-detail .floating-cta .btn');
      if (cta) cta.textContent = 'Buy now — ' + price;
    });
  });

  // ---------- Pay options ----------

  const payOptions = document.querySelectorAll('.pay-options .pay-option');
  const cardForm = document.getElementById('card-form');
  const payBtn = document.getElementById('pay-btn');

  // Build a reusable Apple icon SVG node (avoid innerHTML)
  function buildAppleIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '14');
    svg.setAttribute('height', '14');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', 'M17.05 20.28c-.98.95-2.05.88-3.08.4-1.07-.5-2.06-.52-3.18 0-1.43.7-2.18.5-3.04-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.07.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.52 4.09zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z');
    svg.appendChild(p);
    return svg;
  }
  function buildCheckIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '14');
    svg.setAttribute('height', '14');
    svg.setAttribute('viewBox', '0 0 14 14');
    svg.setAttribute('fill', 'none');
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', 'M3 7l3 3 5-6');
    p.setAttribute('stroke', 'currentColor');
    p.setAttribute('stroke-width', '2');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(p);
    return svg;
  }
  function setPayBtnContent(withApple, label) {
    while (payBtn.firstChild) payBtn.removeChild(payBtn.firstChild);
    if (withApple) payBtn.appendChild(buildAppleIcon());
    const s = document.createElement('span');
    s.textContent = label;
    payBtn.appendChild(s);
  }

  payOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      payOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const isCard = opt.dataset.pay === 'card';
      cardForm.style.display = isCard ? 'block' : 'none';
      if (isCard) {
        payBtn.classList.remove('btn-apple');
        payBtn.classList.add('btn-primary');
        setPayBtnContent(false, 'Pay $11.60');
      } else {
        payBtn.classList.add('btn-apple');
        payBtn.classList.remove('btn-primary');
        setPayBtnContent(true, 'Pay $11.60');
      }
    });
  });

  // ---------- Install button (Success) ----------

  const installBtn = document.getElementById('install-btn');
  if (installBtn) {
    installBtn.addEventListener('click', () => {
      while (installBtn.firstChild) installBtn.removeChild(installBtn.firstChild);
      installBtn.appendChild(buildCheckIcon());
      installBtn.appendChild(document.createTextNode(' Installed'));
      installBtn.style.background = '#4ba99a';
      setTimeout(() => setActive('my-esims'), 900);
    });
  }

  // ---------- Top-up sheet ----------

  const topupTrigger = document.getElementById('topup-trigger');
  const topupSheet = document.getElementById('topup-sheet');
  const topupBackdrop = document.getElementById('topup-backdrop');
  const topupCancel = document.getElementById('topup-cancel');
  const topupConfirm = document.getElementById('topup-confirm');

  function openSheet() {
    topupSheet.classList.add('show');
    topupBackdrop.classList.add('show');
  }
  function closeSheet() {
    topupSheet.classList.remove('show');
    topupBackdrop.classList.remove('show');
  }

  topupTrigger.addEventListener('click', openSheet);
  topupCancel.addEventListener('click', closeSheet);
  topupBackdrop.addEventListener('click', closeSheet);

  document.querySelectorAll('.topup-option').forEach(o => {
    o.addEventListener('click', () => {
      document.querySelectorAll('.topup-option').forEach(x => x.classList.remove('selected'));
      o.classList.add('selected');
      const price = o.querySelector('.topup-price').textContent;
      topupConfirm.textContent = 'Confirm — ' + price;
    });
  });

  topupConfirm.addEventListener('click', () => {
    topupConfirm.textContent = 'Topped up ✓';
    topupConfirm.style.background = '#4ba99a';
    setTimeout(() => {
      closeSheet();
      setTimeout(() => {
        topupConfirm.textContent = 'Confirm — $11.90';
        topupConfirm.style.background = '';
      }, 400);
    }, 800);
  });

  // ---------- Demo reset ----------

  document.getElementById('demo-reset').addEventListener('click', () => {
    setOnbSlide(0);
    otpBoxes.forEach(b => b.value = '');
    setVerifyStep(1);
    history = [];
    currentScreen = '';
    setActive('splash');
    history = ['splash'];
  });

  // ---------- Initial route ----------

  function bootRoute() {
    const initial = (window.location.hash || '').replace('#', '');
    if (initial && SCREENS.indexOf(initial) !== -1) {
      const target = getScreen(initial);
      target.style.transition = 'none';
      target.style.transform = 'translateX(0)';
      target.classList.add('active');
      target.style.visibility = 'visible';
      const splash = getScreen('splash');
      if (splash && initial !== 'splash') {
        splash.classList.remove('active');
        splash.style.visibility = '';
      }
      currentScreen = initial;
      history = [initial];
      updateNav();
      requestAnimationFrame(() => { target.style.transition = ''; });
    } else {
      const splash = getScreen('splash');
      splash.classList.add('active');
      splash.style.transform = 'translateX(0)';
      splash.style.visibility = 'visible';
    }
  }

  bootRoute();

})();
