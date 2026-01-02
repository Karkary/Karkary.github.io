const audio = document.getElementById("ambientAudio");
const toggle = document.getElementById("soundToggle");

const TARGET_VOLUME = 0.1; // 10%
const FADE_DURATION = 4000; // ms

let isPlaying = false;
let fadeAnimationId = null;

// Smooth fade-in using requestAnimationFrame (OPTIMIZED)
function fadeIn(audio, targetVolume, duration) {
  audio.volume = 0;
  audio.muted = false;

  const startTime = performance.now();

  function fade() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-in-out for smoother feel
    const easeProgress =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    audio.volume = targetVolume * easeProgress;

    if (progress < 1) {
      fadeAnimationId = requestAnimationFrame(fade);
    } else {
      fadeAnimationId = null;
    }
  }

  fadeAnimationId = requestAnimationFrame(fade);
}

// Smooth fade-out (ADDED FOR COMPLETENESS)
function fadeOut(audio, duration) {
  const startVolume = audio.volume;
  const startTime = performance.now();

  function fade() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    audio.volume = startVolume * (1 - progress);

    if (progress < 1) {
      fadeAnimationId = requestAnimationFrame(fade);
    } else {
      audio.muted = true;
      audio.volume = startVolume; // Reset for next play
      fadeAnimationId = null;
    }
  }

  fadeAnimationId = requestAnimationFrame(fade);
}

toggle.addEventListener("click", async () => {
  // Cancel any ongoing fade animation
  if (fadeAnimationId) {
    cancelAnimationFrame(fadeAnimationId);
    fadeAnimationId = null;
  }

  if (!isPlaying) {
    try {
      await audio.play();
      fadeIn(audio, TARGET_VOLUME, FADE_DURATION);
      toggle.textContent = "🔊";
      isPlaying = true;
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  } else {
    fadeOut(audio, 1000); // 1 second fade out
    toggle.textContent = "🔈";
    isPlaying = false;
  }
});

// Cleanup on page unload (prevent memory leaks)
window.addEventListener("beforeunload", () => {
  if (fadeAnimationId) {
    cancelAnimationFrame(fadeAnimationId);
  }
});
