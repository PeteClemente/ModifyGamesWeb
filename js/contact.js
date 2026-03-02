/* ================================================================
   CONTACT FORM — Sends email via Formspree
   ================================================================

   SETUP (one-time, takes 2 minutes):
   1. Go to https://formspree.io and create a free account
   2. Click "New Form", set the notification email to pete@modifygames.com
   3. Copy the endpoint URL (looks like: https://formspree.io/f/xyzabc12)
   4. Replace the placeholder below with your actual endpoint URL

   ================================================================ */

const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // <-- Replace this


/* ── Form submission handler ── */
(function () {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const feedback   = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    /* Reset any previous feedback */
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    /* Disable button while sending */
    submitBtn.disabled     = true;
    submitBtn.textContent  = 'Sending…';

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        feedback.className   = 'form-feedback success';
        feedback.textContent = '✓ Message sent! We\'ll get back to you soon.';
        form.reset();
      } else {
        /* Formspree returns error details in JSON */
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || 'Server error');
      }
    } catch (err) {
      feedback.className   = 'form-feedback error';
      feedback.textContent = '✗ Something went wrong. Please try again or email us directly at pete@modifygames.com';
      console.error('Contact form error:', err);
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message';
    }
  });
})();
