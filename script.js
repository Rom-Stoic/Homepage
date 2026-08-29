const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const storedTheme = localStorage.getItem("rom-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("rom-theme", theme);
  const icon = themeButton?.querySelector("i");
  if (icon) icon.setAttribute("data-lucide", theme === "dark" ? "moon" : "sun-medium");
  if (window.lucide) window.lucide.createIcons();
}

setTheme(storedTheme || (prefersDark ? "dark" : "light"));

themeButton?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

window.addEventListener("load", () => {
  if (window.lucide) window.lucide.createIcons();
});

const canvas = document.querySelector("#field-canvas");
const ctx = canvas?.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && ctx && !reduceMotion) {
  const nodes = Array.from({ length: 8 }, (_, index) => ({
    phase: index * 0.84,
    radius: 2 + (index % 3),
    speed: 0.00018 + index * 0.000012,
  }));

  function resize() {
    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * scale);
    canvas.height = Math.floor(window.innerHeight * scale);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
  }

  function nodePosition(node, time, index) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width * (0.52 + Math.sin(time * node.speed + node.phase) * 0.08);
    const centerY = height * (0.42 + Math.cos(time * node.speed * 1.2 + node.phase) * 0.1);
    const spreadX = width * (0.26 + (index % 2) * 0.06);
    const spreadY = height * 0.22;
    return {
      x: centerX + Math.cos(time * node.speed + node.phase) * spreadX,
      y: centerY + Math.sin(time * node.speed * 1.35 + node.phase) * spreadY,
    };
  }

  function draw(time = 0) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const dark = root.dataset.theme === "dark";
    const stroke = dark ? "rgba(246, 242, 231, 0.13)" : "rgba(23, 32, 24, 0.12)";
    const fill = dark ? "rgba(224, 189, 103, 0.45)" : "rgba(79, 112, 87, 0.32)";
    const positions = nodes.map((node, index) => nodePosition(node, time, index));

    ctx.lineWidth = 1;
    for (let i = 0; i < positions.length; i += 1) {
      for (let j = i + 1; j < positions.length; j += 1) {
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < 360) {
          ctx.globalAlpha = Math.max(0, 1 - distance / 360);
          ctx.strokeStyle = stroke;
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    ctx.font = "600 12px Inter, sans-serif";
    nodes.forEach((node, index) => {
      const point = positions[index];
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(point.x, point.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}
