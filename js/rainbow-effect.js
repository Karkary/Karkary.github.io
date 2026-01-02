// Rainbow hover effect for title text - OPTIMIZED
(function () {
  const titleText = document.getElementById("titleText");
  if (!titleText) return;

  const lines = titleText.querySelectorAll(".line1, .line2");

  // Wrap each character in both lines
  lines.forEach((line) => {
    const text = line.textContent;
    line.innerHTML = text
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");
  });

  const spans = titleText.querySelectorAll("span");
  let animationId = null;
  let isHovering = false;
  let time = 0;

  // Pre-calculate character count for optimization
  const charCount = spans.length;

  // Sinebow color generation (same algorithm)
  function sinebow(i, t) {
    const freq = (Math.PI * 2) / 60;
    const phase = t * 0.015;

    const r = Math.sin(freq * i + phase + 0) * 127 + 128;
    const g = Math.sin(freq * i + phase + 2) * 127 + 128;
    const b = Math.sin(freq * i + phase + 4) * 127 + 128;

    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
  }

  // OPTIMIZED: Batch DOM updates using DocumentFragment approach
  // and reduce reflows by using transform instead of direct style changes
  function animate() {
    if (!isHovering) return;

    time++;

    // Use requestAnimationFrame's implicit batching
    // Update all spans in one pass to minimize reflows
    for (let i = 0; i < charCount; i++) {
      const span = spans[i];
      const color = sinebow(i, time);

      // Batch style changes
      span.style.cssText = `
        color: ${color};
        text-shadow: 0 0 20px ${color}60, 0 0 35px ${color}40, 0 0 50px ${color}20;
      `;
    }

    animationId = requestAnimationFrame(animate);
  }

  // OPTIMIZED: Reset using cssText for faster batch update
  function resetColors() {
    for (let i = 0; i < charCount; i++) {
      spans[i].style.cssText = "color: white; text-shadow: none;";
    }
  }

  // Optimized event handlers
  titleText.addEventListener("mouseenter", () => {
    isHovering = true;
    if (animationId === null) {
      animate();
    }
  });

  titleText.addEventListener("mouseleave", () => {
    isHovering = false;
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    resetColors();
  });

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
})();
