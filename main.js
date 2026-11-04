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
  document.querySelector('#enquiry-submit').hidden = false;
  const preview = document.querySelector('#email-preview');
  const fallback = document.querySelector('#email-fallback');
  const openEmail = document.querySelector('#open-email');
  const copyStatus = document.querySelector('#copy-status');
  const copyButton = document.querySelector('#copy-message');
  const sendButton = document.querySelector('#send-enquiry');
  const draftButton = document.querySelector('#enquiry-submit');
  let config;
  let requestId = crypto.randomUUID();
  let accepted = false;
  async function loadDelivery() {
    try {
      const response = await fetch('/api/contact', { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error('The delivery settings could not be loaded.');
      config = await response.json();
      if (config.enabled === true && typeof config.token === 'string') {
        sendButton.hidden = false;
        document.querySelector('#delivery-disclosure').textContent = 'Send enquiry delivers your message straight to our team. Prefer your own email app? Prepare a draft instead; nothing is sent until you send it.';
      } else if (config.enabled === false) {
        document.querySelector('#delivery-disclosure').textContent = 'Prepare a draft below and send it from your email app. Nothing is sent until you do.';
      } else throw new Error('The delivery settings were not recognised.');
    } catch (error) {
      console.error('Unable to load enquiry delivery settings:', error.name);
      document.querySelector('#delivery-disclosure').textContent = 'Prepare a draft below and send it from your email app. Nothing is sent until you do.';
    }
  }
  loadDelivery();

  form.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      event.target.setCustomValidity('');
    }
    if (!fallback.hidden && event.target !== preview) {
      fallback.hidden = true;
      status.textContent = 'Your details changed. Prepare the email again to update the draft.';
      copyStatus.textContent = '';
    }
    if (event.target !== preview) {
      requestId = crypto.randomUUID();
      accepted = false;
    }
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = form.elements.namedItem('name');
    const challenge = form.elements.namedItem('challenge');
    name.setCustomValidity(name.value.trim() ? '' : 'Please enter your name.');
    challenge.setCustomValidity(challenge.value.trim().length >= 10 ? '' : 'Please describe the project in at least 10 characters.');
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    if (event.submitter === sendButton && !sendButton.hidden) {
      if (accepted) {
        status.textContent = 'This enquiry has already been accepted. Change the details to start a new enquiry.';
        return;
      }
      sendButton.disabled = true;
      draftButton.disabled = true;
      form.setAttribute('aria-busy', 'true');
      const originalLabel = sendButton.textContent;
      sendButton.textContent = 'Sending…';
      status.textContent = 'Waiting for the email service to accept your enquiry…';
      // Keep the submitted snapshot stable until the request resolves.
      const fields = [...form.querySelectorAll('input, select, textarea')];
      fields.forEach((field) => { field.disabled = true; });
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...Object.fromEntries(data), token: config.token, requestId }),
          signal: AbortSignal.timeout(15000),
        });
        const result = await response.json();
        if (!response.ok || result.accepted !== true || typeof result.reference !== 'string') throw new Error(result.error || 'The email service did not confirm acceptance.');
        accepted = true;
        fallback.hidden = true;
        status.textContent = 'The email service accepted your enquiry. Thank you. This confirms acceptance for sending, not guaranteed inbox delivery.';
      } catch (error) {
        console.error('Enquiry submission failed:', error.name);
        status.textContent = error.name === 'TimeoutError' || error.name === 'TypeError'
          ? 'We could not confirm acceptance. Your details are still here. Retry with the same details or prepare an email draft.'
          : error.message;
      } finally {
        fields.forEach((field) => { field.disabled = false; });
        sendButton.disabled = false;
        draftButton.disabled = false;
        sendButton.textContent = originalLabel;
        form.removeAttribute('aria-busy');
      }
      return;
    }
    const serviceName = interest.selectedOptions[0].textContent;
    const industryName = industry.value ? industry.selectedOptions[0].textContent : 'Not specified';
    const subject = `Project enquiry: ${serviceName}`;
    const body = `Hello Cognitron,\n\n${String(data.get('challenge')).trim()}\n\nService: ${serviceName}\nIndustry / context: ${industryName}\nName: ${String(data.get('name')).trim()}\nEmail: ${String(data.get('email')).trim()}\nOrganisation: ${String(data.get('organisation')).trim() || 'Not specified'}`;
    preview.value = `To: dickson@cognitron.tech\nSubject: ${subject}\n\n${body}`;
    openEmail.href = `mailto:dickson@cognitron.tech?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    fallback.hidden = false;
    copyStatus.textContent = '';
    status.textContent = 'Draft prepared on your device. Nothing has been sent. Choose an option below to send it yourself.';
    preview.focus();
  });
  copyButton.addEventListener('click', async () => {
    copyButton.disabled = true;
    try {
      if (!navigator.clipboard) throw new Error('Clipboard access is unavailable.');
      await navigator.clipboard.writeText(preview.value);
      copyStatus.textContent = 'Message copied. Paste it into your email app and send it when you are ready.';
    } catch (error) {
      console.error('Unable to copy the prepared enquiry:', error);
      preview.focus();
      preview.select();
      copyStatus.textContent = 'Automatic copying is unavailable. The message is selected; copy it manually and paste it into your email app.';
    } finally {
      copyButton.disabled = false;
    }
  });
}
