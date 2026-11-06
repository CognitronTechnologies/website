const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = matchMedia('(max-width: 900px)');

if (toggle && navigation) {
  toggle.hidden = false;
  const reset = () => {
    navigation.hidden = mobile.matches;
    toggle.setAttribute('aria-expanded', 'false');
  };
  reset();
  mobile.addEventListener('change', reset);
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(expanded));
    navigation.hidden = !expanded;
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobile.matches) reset();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobile.matches && !navigation.hidden && !navigation.querySelector('.nav-toggle[aria-expanded="true"]')) {
      reset();
      toggle.focus();
    }
  });
}

const navToggles = [...document.querySelectorAll('.nav-toggle')];
const closePanels = (except) => navToggles.forEach((button) => { if (button !== except) button.setAttribute('aria-expanded', 'false'); });
navToggles.forEach((button) => {
  button.hidden = false;
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    closePanels(button);
    button.setAttribute('aria-expanded', String(open));
  });
});
if (navToggles.length) {
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-group')) closePanels();
  });
  document.addEventListener('keydown', (event) => {
    const open = navToggles.find((button) => button.getAttribute('aria-expanded') === 'true');
    if (event.key === 'Escape' && open) {
      closePanels();
      open.focus();
    }
  });
  document.addEventListener('focusin', (event) => {
    if (!event.target.closest('.nav-group')) closePanels();
  });
}

const legacyInterests = {
  'Streamline operations': 'integration-automation',
  'Improve customer experiences': 'software-development',
  'Turn information into action': 'several',
  'Keep systems dependable': 'modernisation-support',
};

const globe = document.querySelector('#hero-globe');
const globeContext = globe && globe.getContext('2d');
if (globeContext) {
  const ctx = globeContext;
  const palette = getComputedStyle(document.documentElement);
  const violet = palette.getPropertyValue('--action').trim();
  const lavender = palette.getPropertyValue('--volt').trim();
  const highlight = palette.getPropertyValue('--volt-hover').trim();
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  // Fixed directions give the planet the same "landmasses" on every visit.
  const seeds = [[0.8, 0.3, 0.5, 1], [-0.4, 0.9, 0.1, 0.7], [0.2, -0.6, 0.77, 0.9], [-0.7, -0.2, -0.68, 0.8], [0.5, 0.5, -0.7, 0.6], [-0.1, 0.2, 0.97, 1.1]];
  const field = (x, y, z) => seeds.reduce((sum, [a, b, c, f]) => sum + Math.sin((a * x + b * y + c * z) * 4.2 * f + f * 3), 0);
  const points = [];
  const count = 6500;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const x = Math.cos(golden * i) * radius;
    const z = Math.sin(golden * i) * radius;
    const land = field(x, y, z) > 0.55;
    points.push([x, y, z, land ? (field(z, x, y) > 1.5 ? 2 : 1) : 0]);
  }
  let width = 0;
  let height = 0;
  let angle = 0.6;
  let tilt = 0.32;
  let turn = 0;
  let targetTilt = 0.32;
  let targetTurn = 0;
  let running = false;
  let visible = true;
  let frame = 0;
  let last = 0;
  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const cy = height / 2;
    const r = width * 0.42;
    // Fine orbital strands frame the sphere without adding a background glow.
    for (let strand = 0; strand < 24; strand++) {
      ctx.globalAlpha = 0.12 + (strand % 6) * 0.035;
      ctx.strokeStyle = strand % 7 === 0 ? highlight : strand % 3 === 0 ? lavender : violet;
      ctx.lineWidth = strand % 7 === 0 ? 1.2 : 0.7;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * (1.04 + strand * 0.009), r * (0.48 + strand * 0.006), -0.48 + turn * 0.15, 0, Math.PI * 2);
      ctx.stroke();
    }
    const body = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
    body.addColorStop(0, '#25212f');
    body.addColorStop(0.7, '#17151c');
    body.addColorStop(1, '#111110');
    ctx.globalAlpha = 1;
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    const cosA = Math.cos(angle + turn);
    const sinA = Math.sin(angle + turn);
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    for (const [x, y, z, type] of points) {
      const x1 = x * cosA - z * sinA;
      const z1 = x * sinA + z * cosA;
      const y1 = y * cosT - z1 * sinT;
      const depth = y * sinT + z1 * cosT;
      if (depth < -0.05) continue;
      // Light falls from the upper left, so that side of the planet reads brighter.
      const light = Math.min(1, Math.max(0, (depth + 0.05) / 1.05) * (1.05 - x1 * 0.3 - y1 * 0.25));
      const px = cx + x1 * r;
      const py = cy + y1 * r;
      if (type === 2) {
        ctx.fillStyle = highlight;
        ctx.globalAlpha = 0.45 + light * 0.55;
        ctx.fillRect(px - 2, py - 2, 4, 4);
      } else if (type === 1) {
        ctx.fillStyle = lavender;
        ctx.globalAlpha = 0.18 + light * 0.82;
        ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
      } else {
        ctx.fillStyle = violet;
        ctx.globalAlpha = 0.05 + light * 0.14;
        ctx.fillRect(px - 0.7, py - 0.7, 1.4, 1.4);
      }
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = lavender;
    ctx.globalAlpha = 0.18;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  };
  const tick = (time) => {
    if (!running) return;
    const elapsed = Math.min(time - (last || time), 50);
    last = time;
    angle += elapsed * 0.00008;
    tilt += (targetTilt - tilt) * 0.05;
    turn += (targetTurn - turn) * 0.05;
    draw();
    frame = requestAnimationFrame(tick);
  };
  const start = () => {
    if (running || still.matches || !visible || document.hidden) return;
    running = true;
    last = 0;
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };
  new ResizeObserver(() => {
    const rect = globe.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    globe.width = Math.round(width * ratio);
    globe.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }).observe(globe);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start(); else stop();
  }).observe(globe);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  still.addEventListener('change', () => (still.matches ? (stop(), draw()) : start()));
  const hero = globe.closest('.home-hero');
  hero.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    const box = hero.getBoundingClientRect();
    targetTurn = ((event.clientX - box.left) / box.width - 0.5) * 0.5;
    targetTilt = 0.32 + ((event.clientY - box.top) / box.height - 0.5) * 0.25;
  });
  hero.addEventListener('pointerleave', () => {
    targetTilt = 0.32;
    targetTurn = 0;
  });
}
const query = new URLSearchParams(location.search);
const legacyInterest = query.get('interest');
if (location.pathname === '/' && legacyInterest) {
  const contact = new URL('/contact/', location.origin);
  contact.searchParams.set('interest', legacyInterests[legacyInterest] || legacyInterest);
  location.replace(contact.href);
}

const form = document.querySelector('#enquiry-form');
if (form) {
  const interest = form.elements.namedItem('interest');
  const industry = form.elements.namedItem('industry');
  const status = document.querySelector('#form-status');
  const requested = legacyInterests[legacyInterest] || legacyInterest;
  const requestedIndustry = query.get('industry');
  const selectValue = (select, value) => {
    if (!value) return;
    if ([...select.options].some((option) => option.value === value)) select.value = value;
    else status.textContent = 'The linked selection is not available. Please choose the service or industry that fits your enquiry.';
  };
  selectValue(interest, requested);
  selectValue(industry, requestedIndustry);
  if (legacyInterest === 'Turn information into action') {
    status.textContent = 'Your previous selection covers both Data and AI. Choose either service, or leave “Several services” selected.';
  }
  const sendButton = document.querySelector('#send-enquiry');
  let requestId = crypto.randomUUID();
  let accepted = false;
  sendButton.disabled = false;

  form.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      event.target.setCustomValidity('');
    }
    requestId = crypto.randomUUID();
    accepted = false;
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = form.elements.namedItem('name');
    const challenge = form.elements.namedItem('challenge');
    name.setCustomValidity(name.value.trim() ? '' : 'Please enter your name.');
    challenge.setCustomValidity(challenge.value.trim().length >= 10 ? '' : 'Please describe the project in at least 10 characters.');
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    if (accepted) {
      status.textContent = 'This enquiry has already been accepted. Change the details to start a new enquiry.';
      return;
    }
    sendButton.disabled = true;
    form.setAttribute('aria-busy', 'true');
    const originalLabel = sendButton.textContent;
    sendButton.textContent = 'Sending…';
    status.textContent = 'Sending your enquiry…';
    // Keep the submitted snapshot stable until the request resolves.
    const fields = [...form.querySelectorAll('input, select, textarea')];
    fields.forEach((field) => { field.disabled = true; });
    try {
      const settingsResponse = await fetch('/api/contact', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) });
      if (!settingsResponse.ok) throw new Error('Unable to connect to the enquiry service. Please try again.');
      const config = await settingsResponse.json();
      if (config.enabled === false) throw new Error('Sending is not configured on this site. Please contact us by email.');
      if (config.enabled !== true || typeof config.token !== 'string') throw new Error('The enquiry service returned invalid settings. Please try again.');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(data), token: config.token, requestId }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.accepted !== true || typeof result.reference !== 'string') throw new Error(result.error || 'The email service did not confirm acceptance.');
      accepted = true;
      status.textContent = 'Thank you for reaching out. Your enquiry has been received and someone on our team will get back to you within one business day.';
    } catch (error) {
      console.error('Enquiry submission failed:', error.name);
      status.textContent = error.name === 'TimeoutError' || error.name === 'TypeError'
        ? 'We could not confirm acceptance. Your details are still here. Retry with the same details or contact us by email.'
        : error.message;
    } finally {
      fields.forEach((field) => { field.disabled = false; });
      sendButton.disabled = false;
      sendButton.textContent = originalLabel;
      form.removeAttribute('aria-busy');
    }
  });
}
