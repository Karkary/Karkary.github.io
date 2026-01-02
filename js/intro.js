// Introduction page animation - OPTIMIZED
(function () {
  const introPage = document.getElementById("introPage");
  if (!introPage) return;

  const INTRO_DISPLAY_TIME = 3500; // Total time before fade starts
  const FADE_DURATION = 800; // Fade out duration

  let startTime = null;
  let fadeStartTime = null;
  let animationId = null;

  function animate(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    const elapsed = currentTime - startTime;

    // Wait for intro display time
    if (elapsed >= INTRO_DISPLAY_TIME && !fadeStartTime) {
      fadeStartTime = currentTime;
      introPage.classList.add("fade-out");
    }

    // Handle fade out
    if (fadeStartTime) {
      const fadeElapsed = currentTime - fadeStartTime;

      if (fadeElapsed >= FADE_DURATION) {
        // Fade complete, remove from DOM
        introPage.style.display = "none";
        cancelAnimationFrame(animationId);
        return;
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  // Start animation loop
  animationId = requestAnimationFrame(animate);

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
})();
