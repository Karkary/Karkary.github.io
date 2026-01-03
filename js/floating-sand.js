// floating-sand.js - Optimized dreamy floating sand particle effect

(function () {
  "use strict";

  // Performance-aware settings
  const MAX_PARTICLES = 30; // Reduced from 50 for better performance
  let activeParticles = 0;
  let animationFrameId = null;
  let lastParticleTime = 0;
  const PARTICLE_INTERVAL = 1200; // Increased from 800ms

  // Create sand particle
  function createSandParticle() {
    // Don't create if we're at max capacity
    if (activeParticles >= MAX_PARTICLES) {
      return;
    }

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
    activeParticles++;

    // Remove particle after animation completes
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
        activeParticles--;
      }
    }, (duration + delay) * 1000);
  }

  // Throttled particle creation
  function scheduleParticleCreation() {
    const now = Date.now();
    if (now - lastParticleTime >= PARTICLE_INTERVAL) {
      createSandParticle();
      lastParticleTime = now;
    }
    animationFrameId = requestAnimationFrame(scheduleParticleCreation);
  }

  // Check if user prefers reduced motion
  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // Initialize sand particles
  function initSandParticles() {
    // Respect user's motion preferences
    if (prefersReducedMotion()) {
      console.log("Sand particles disabled: user prefers reduced motion");
      return;
    }

    // Create initial batch of particles with staggered timing
    const initialBatch = 20; // Reduced from 50
    for (let i = 0; i < initialBatch; i++) {
      setTimeout(() => createSandParticle(), i * 300);
    }

    // Start continuous particle creation using RAF
    scheduleParticleCreation();
  }

  // Cleanup on page unload
  function cleanup() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }

  // Pause particles when tab is hidden (performance optimization)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    } else {
      if (!animationFrameId) {
        scheduleParticleCreation();
      }
    }
  });

  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSandParticles);
  } else {
    initSandParticles();
  }

  // Cleanup on unload
  window.addEventListener("beforeunload", cleanup);
})();
