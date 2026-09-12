/**
 * Hamza Aqeel portfolio interactions.
 * Standalone browser JavaScript; no framework, API, build step or backend.
 */
(() => {
  'use strict';

  const root = document.querySelector('.site-root');
  if (!root) return;

  const burstLayer = root.querySelector('.cyber-pop-layer');
  const popColors = ['#2de2e6', '#ff4f87', '#ffd166', '#7f5cff'];
  const revealElements = root.querySelectorAll('[data-reveal]');

  // Match the original scroll reveal timing and viewport threshold.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-visible', 'true');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.setAttribute('data-visible', 'true'));
  }

  let scrollFrame = 0;

  /** Updates the progress bar and the three original hero parallax layers. */
  function updateScroll() {
    scrollFrame = 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const heroProgress = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
    root.style.setProperty('--scroll-progress', String(progress));
    root.style.setProperty('--hero-copy-y', `${heroProgress * 42}px`);
    root.style.setProperty('--hero-stage-y', `${heroProgress * -34}px`);
    root.style.setProperty('--hero-grid-y', `${heroProgress * 58}px`);
  }

  function requestScrollUpdate() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
  }

  updateScroll();
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  window.addEventListener('load', requestScrollUpdate, { once: true });
  if (document.fonts) document.fonts.ready.then(requestScrollUpdate);

  root.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    root.style.setProperty('--cursor-x', `${event.clientX / window.innerWidth * 100}%`);
    root.style.setProperty('--cursor-y', `${event.clientY / window.innerHeight * 100}%`);
  }, { passive: true });

  /** Applies the original perspective and highlight position to a card. */
  function applyTilt(event, strength) {
    if (event.pointerType === 'touch') return;
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    element.style.setProperty('--tilt-x', `${((0.5 - y) * strength).toFixed(2)}deg`);
    element.style.setProperty('--tilt-y', `${((x - 0.5) * strength).toFixed(2)}deg`);
    element.style.setProperty('--shine-x', `${(x * 100).toFixed(1)}%`);
    element.style.setProperty('--shine-y', `${(y * 100).toFixed(1)}%`);
  }

  function clearTilt(event) {
    const style = event.currentTarget.style;
    style.setProperty('--tilt-x', '0deg');
    style.setProperty('--tilt-y', '0deg');
    style.setProperty('--shine-x', '50%');
    style.setProperty('--shine-y', '50%');
  }

  root.querySelectorAll('.project-card, .hero-stage').forEach((element) => {
    const strength = element.classList.contains('hero-stage') ? 5 : 8;
    element.addEventListener('pointermove', (event) => applyTilt(event, strength), { passive: true });
    element.addEventListener('pointerleave', clearTilt, { passive: true });
    element.addEventListener('pointercancel', clearTilt, { passive: true });
  });

  /** Recreates the neon rings and ten colored shards on clicks and taps. */
  function cyberPop(event) {
    if (!burstLayer) return;
    let x = event.clientX;
    let y = event.clientY;
    if (event.detail === 0) {
      const target = event.target instanceof Element ? event.target : root;
      const bounds = target.getBoundingClientRect();
      x = bounds.left + bounds.width / 2;
      y = bounds.top + bounds.height / 2;
    }

    // Keep rapid clicking from accumulating effect nodes.
    if (burstLayer.childElementCount >= 8) burstLayer.firstElementChild.remove();
    const burst = document.createElement('span');
    burst.className = 'cyber-pop-burst';
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    burst.setAttribute('aria-hidden', 'true');

    const ring = document.createElement('i');
    ring.className = 'cyber-pop-ring';
    const secondaryRing = document.createElement('i');
    secondaryRing.className = 'cyber-pop-ring cyber-pop-ring-secondary';
    burst.append(ring, secondaryRing);

    for (let index = 0; index < 10; index += 1) {
      const angle = Math.PI * 2 * index / 10;
      const distance = 42 + index % 3 * 12;
      const shard = document.createElement('i');
      shard.className = 'cyber-pop-shard';
      shard.style.setProperty('--pop-dx', `${Math.cos(angle) * distance}px`);
      shard.style.setProperty('--pop-dy', `${Math.sin(angle) * distance}px`);
      shard.style.setProperty('--pop-rotation', `${angle * 180 / Math.PI + 90}deg`);
      shard.style.setProperty('--pop-delay', `${index % 2 * 18}ms`);
      shard.style.setProperty('--pop-color', popColors[index % popColors.length]);
      burst.appendChild(shard);
    }

    burstLayer.appendChild(burst);
    window.setTimeout(() => burst.remove(), 900);
  }

  // Native navigation, controls and form actions continue normally.
  root.addEventListener('click', cyberPop, { passive: true });

  // Explicitly retain muted inline playback when no framework hydrates the video.
  root.querySelectorAll('video[autoplay]').forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    const playback = video.play();
    if (playback) playback.catch(() => { /* Native controls remain available. */ });
  });

  const form = root.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      if (String(data.get('_honey') || '').trim()) return;
      const subject = `Portfolio enquiry: ${String(data.get('subject') || '').trim()}`;
      const body = [
        String(data.get('message') || '').trim(),
        '',
        `From: ${String(data.get('name') || '').trim()}`,
        `Reply to: ${String(data.get('email') || '').trim()}`,
      ].join('\r\n');
      const mailto = `mailto:hamzaaaqeeel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      const status = form.querySelector('[role="status"]');
      if (status) {
        status.textContent = 'Finish sending in your email app. If it did not open, use the email link.';
        status.className = 'form-status status-idle';
      }
      // Retain the entered message in case no mail application is configured.
    });
  }
})();
