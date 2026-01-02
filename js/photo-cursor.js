const photoContainer = document.getElementById("circlePhoto");
const customCursor = document.getElementById("photoCursor");

let rafId = null;
let lastX = 0;
let lastY = 0;

// Update cursor position using RAF (OPTIMIZED)
function updateCursorPosition() {
  customCursor.style.left = lastX + "px";
  customCursor.style.top = lastY + "px";
  rafId = null;
}

photoContainer.addEventListener("mousemove", (e) => {
  // Show cursor on first move
  if (!customCursor.classList.contains("visible")) {
    customCursor.classList.add("visible");
  }

  // Store the latest mouse position
  lastX = e.clientX;
  lastY = e.clientY;

  // Only schedule update if one isn't already pending
  if (!rafId) {
    rafId = requestAnimationFrame(updateCursorPosition);
  }
});

photoContainer.addEventListener("mouseleave", () => {
  customCursor.classList.remove("visible");

  // Cancel pending animation if user leaves quickly
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
});

// Hide the text if the user clicks the photo to open the modal
photoContainer.addEventListener("click", () => {
  customCursor.classList.remove("visible");

  // Cancel pending animation
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
});

// Cleanup on page unload (prevent memory leaks)
window.addEventListener("beforeunload", () => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
});
