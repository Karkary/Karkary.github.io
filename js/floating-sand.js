// floating-sand.js - Dreamy floating sand particle effect

(function () {
  "use strict";

  // Create sand particle
  function createSandParticle() {
    const particle = document.createElement("div");
    particle.className = "sand-particle";

    // Random size between 1-4px
    const size = Math.random() * 3 + 1;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // Random starting position (left side of screen)
    const startY = Math.random() * window.innerHeight;
    particle.style.left = "-10px";
    particle.style.top = startY + "px";

    // Random end position with dream-like float
    const endX = window.innerWidth + 100;
    const endY = startY + (Math.random() - 0.5) * 300; // Vertical drift

    particle.style.setProperty("--tx", endX + "px");
    particle.style.setProperty("--ty", endY - startY + "px");

    // Random duration for variety (15-30 seconds)
    const duration = 15 + Math.random() * 15;
    particle.style.animationDuration = duration + "s";

    // Random delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = delay + "s";

    document.body.appendChild(particle);

    // Remove particle after animation completes
    setTimeout(() => {
      particle.remove();
    }, (duration + delay) * 1000);
  }

  // Initialize sand particles
  function initSandParticles() {
    // Create initial batch of particles
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createSandParticle(), i * 200);
    }

    // Continuously create new particles
    setInterval(() => {
      createSandParticle();
    }, 800);
  }

  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSandParticles);
  } else {
    initSandParticles();
  }
})();
