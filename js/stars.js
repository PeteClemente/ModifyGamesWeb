/* ================================================================
   STAR FIELD ANIMATION
   Creates an animated twinkling starfield on the fixed #stars canvas.
   Shared across all pages.
   ================================================================ */

(function () {
  const canvas = document.getElementById('stars');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars  = [];

  /* Resize canvas to fill the viewport */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /* Generate an array of star objects */
  function generateStars(count) {
    stars = Array.from({ length: count }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.65 + 0.15,
      speed: Math.random() * 0.4 + 0.06,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  /* Draw one frame */
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = performance.now() / 1000;

    for (const s of stars) {
      const a = s.alpha * (0.55 + 0.45 * Math.sin(now * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 230, 255, ${a})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    generateStars(220);
  });

  resize();
  generateStars(220);
  requestAnimationFrame(draw);
})();
