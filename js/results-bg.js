// ══════════════════════════════════════════════════════════════════
// SUTRAM 2026 — Results Page Animated Background & Celebration
// Complete cyber ambient background:
//  - Subtle cyber grid
//  - Orbiting concentric pulsing cyber rings
//  - 80+ Floating data nodes, crosshairs, and glowing stars
//  - Dual side-popping celebratory confetti cannons (Left & Right)
// ══════════════════════════════════════════════════════════════════

(function () {
  const canvas = document.getElementById("resultsBgCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W, H, dpr;
  let particles = [];
  let rings = [];
  let grid = [];
  let confetti = [];
  let animTime = 0;

  const CONFETTI_COLORS = [
    "#ef4444", "#f59e0b", "#10b981", "#2563eb",
    "#8b5cf6", "#06b6d4", "#f97316", "#ec4899",
    "#ffd700", "#00e676", "#3b82f6"
  ];

  function rnd(min, max) {
    return min + Math.random() * (max - min);
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);
    initBackground();
  }

  function initBackground() {
    // 1. Floating star/data particles (crosshairs, rings, glowing dots)
    particles = [];
    for (let i = 0; i < 85; i++) {
      particles.push({
        x: rnd(0, W),
        y: rnd(0, H),
        vx: rnd(-0.25, 0.25),
        vy: rnd(-0.18, -0.05),
        r: rnd(0.8, 2.4),
        alpha: rnd(0.2, 0.7),
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        alphaSpeed: rnd(0.003, 0.009),
        type: Math.floor(rnd(0, 3)), // 0: dot, 1: ring, 2: crosshair
        color: ["#2563eb", "#06b6d4", "#10b981", "#8b5cf6", "#f59e0b"][Math.floor(rnd(0, 5))]
      });
    }

    // 2. Orbiting concentric cyber rings (ambient background)
    rings = [
      { cx: W * 0.15, cy: H * 0.22, radius: 180, speed: 0.0004, alpha: 0.065, color: "#2563eb" },
      { cx: W * 0.85, cy: H * 0.32, radius: 220, speed: 0.0006, alpha: 0.055, color: "#10b981" },
      { cx: W * 0.50, cy: H * 0.85, radius: 260, speed: 0.0003, alpha: 0.045, color: "#8b5cf6" },
      { cx: W * 0.72, cy: H * 0.62, radius: 140, speed: 0.0008, alpha: 0.070, color: "#06b6d4" }
    ];

    // 3. Subtle cyber grid
    grid = [];
    const cols = Math.ceil(W / 80);
    const rows = Math.ceil(H / 80);
    for (let r = 0; r <= rows; r++) {
      grid.push({ y: r * 80, horiz: true });
    }
    for (let c = 0; c <= cols; c++) {
      grid.push({ x: c * 80, horiz: false });
    }
  }

  // 4. Side-Popping Confetti Cannons (Left and Right sides)
  function fireSideCannon(side, count) {
    const isLeft = side === "left";
    const startX = isLeft ? rnd(-10, W * 0.06) : rnd(W * 0.94, W + 10);
    const startY = rnd(H * 0.55, H * 0.85);

    for (let i = 0; i < count; i++) {
      // Angle: Left cannon shoots up-right (48° to 74°); Right cannon shoots up-left (106° to 132°)
      const deg = isLeft ? rnd(48, 74) : rnd(106, 132);
      const rad = (deg * Math.PI) / 180;
      const speed = rnd(15, 30);

      const shape = Math.floor(rnd(0, 4)); // 0: ribbon, 1: square, 2: circle dot, 3: elongated streamer
      const size = rnd(7, 14);

      confetti.push({
        x: startX + rnd(-15, 15),
        y: startY + rnd(-15, 15),
        vx: (isLeft ? 1 : -1) * Math.abs(Math.cos(rad) * speed),
        vy: -Math.sin(rad) * speed,
        w: shape === 3 ? size * 0.5 : size,
        h: shape === 3 ? size * 2.2 : (shape === 0 ? size * 0.7 : size),
        color: CONFETTI_COLORS[Math.floor(rnd(0, CONFETTI_COLORS.length))],
        shape: shape,
        rotation: rnd(0, Math.PI * 2),
        rotSpeed: rnd(-0.12, 0.12),
        tilt: rnd(0, Math.PI * 2),
        tiltSpeed: rnd(0.08, 0.16),
        wobble: rnd(0, Math.PI * 2),
        wobbleSpeed: rnd(0.08, 0.16),
        gravity: rnd(0.28, 0.40),
        drag: rnd(0.965, 0.982),
        alpha: 1,
        decay: rnd(0.003, 0.006)
      });
    }
  }

  function triggerCelebration(leftCount = 75, rightCount = 75) {
    fireSideCannon("left", leftCount);
    fireSideCannon("right", rightCount);
  }

  function launchOpeningCelebration() {
    // Wave 1: Immediate dual pop from left and right
    triggerCelebration(75, 75);

    // Wave 2: Complementary pop at 300ms
    setTimeout(() => {
      triggerCelebration(55, 55);
    }, 300);

    // Wave 3: Final celebratory cascade at 700ms
    setTimeout(() => {
      triggerCelebration(40, 40);
    }, 700);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // A. Draw Subtle Cyber Grid
    ctx.save();
    ctx.strokeStyle = "rgba(37, 99, 235, 0.035)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < grid.length; i++) {
      const line = grid[i];
      ctx.beginPath();
      if (line.horiz) {
        ctx.moveTo(0, line.y);
        ctx.lineTo(W, line.y);
      } else {
        ctx.moveTo(line.x, 0);
        ctx.lineTo(line.x, H);
      }
      ctx.stroke();
    }
    ctx.restore();

    // B. Draw Pulsing Cyber Concentric Rings
    for (let idx = 0; idx < rings.length; idx++) {
      const ring = rings[idx];
      const t = animTime * ring.speed;
      const pulse = Math.sin(t * 2000 + idx) * 12;

      ctx.beginPath();
      ctx.arc(ring.cx, ring.cy, ring.radius + pulse, 0, Math.PI * 2);
      ctx.strokeStyle = ring.color + Math.round(ring.alpha * 255).toString(16).padStart(2, "0");
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner secondary concentric ring
      ctx.beginPath();
      ctx.arc(ring.cx, ring.cy, (ring.radius + pulse) * 0.62, 0, Math.PI * 2);
      ctx.strokeStyle = ring.color + Math.round(ring.alpha * 0.6 * 255).toString(16).padStart(2, "0");
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // C. Draw Floating Cyber Particles & Crosshairs
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;

      if (p.type === 0) {
        // Glowing dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 1) {
        // Mini data ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.lineWidth = 0.7;
        ctx.stroke();
      } else {
        // Tech crosshair
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p.x - p.r * 3, p.y);
        ctx.lineTo(p.x + p.r * 3, p.y);
        ctx.moveTo(p.x, p.y - p.r * 3);
        ctx.lineTo(p.x, p.y + p.r * 3);
        ctx.stroke();
      }
      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;
      p.alpha += p.alphaSpeed * p.alphaDir;
      if (p.alpha >= 0.7 || p.alpha <= 0.05) p.alphaDir *= -1;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
    }

    // D. Draw and Update Side-Popping Confetti (Physics & 3D flutter)
    for (let i = confetti.length - 1; i >= 0; i--) {
      const c = confetti[i];

      c.vx *= c.drag;
      c.vy *= c.drag;
      c.vy += c.gravity;

      c.wobble += c.wobbleSpeed;
      c.x += c.vx + Math.sin(c.wobble) * 1.2;
      c.y += c.vy;

      c.rotation += c.rotSpeed;
      c.tilt += c.tiltSpeed;

      if (c.vy > 1) {
        c.alpha -= c.decay;
      }

      if (c.alpha <= 0 || c.y > H + 50 || c.x < -80 || c.x > W + 80) {
        confetti.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, c.alpha));
      ctx.fillStyle = c.color;
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rotation);

      const tiltScaleX = Math.cos(c.tilt);

      if (c.shape === 2) {
        ctx.beginPath();
        ctx.arc(0, 0, c.w * 0.45, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        const halfW = (c.w * tiltScaleX) / 2;
        const halfH = c.h / 2;
        ctx.rect(-halfW, -halfH, halfW * 2, halfH * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    animTime++;
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  // Interactive re-trigger when clicking celebration area
  function attachInteractivity() {
    const targets = [
      document.querySelector(".results-hero"),
      document.querySelector(".results-headline"),
      document.querySelector(".results-celebration-pill")
    ];

    targets.forEach(el => {
      if (el) {
        el.style.cursor = "pointer";
        el.addEventListener("click", () => {
          triggerCelebration(60, 60);
        });
      }
    });
  }

  window.triggerResultsConfetti = triggerCelebration;
  window.addEventListener("resize", resize);

  resize();
  loop();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      launchOpeningCelebration();
      attachInteractivity();
    });
  } else {
    launchOpeningCelebration();
    attachInteractivity();
  }
})();
