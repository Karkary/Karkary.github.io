// Octagram Animation with Anime.js - OPTIMIZED
(function () {
  const star = document.getElementById("octagramStar");
  if (!star) return;

  const gridSize = 30;
  const dots = [];

  // Pre-create DocumentFragment for batch insertion (OPTIMIZED)
  const fragment = document.createDocumentFragment();

  // Octagram (8-pointed star) shape function
  function isInOctagram(x, y, size) {
    const centerX = size / 2;
    const centerY = size / 2;
    const dx = x - centerX;
    const dy = y - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const numPoints = 8;
    const anglePerPoint = (Math.PI * 2) / numPoints;

    const normalizedAngle = (angle + Math.PI) % (Math.PI * 2);
    const segment = Math.floor(normalizedAngle / anglePerPoint);
    const segmentAngle = normalizedAngle % anglePerPoint;
    const segmentProgress = segmentAngle / anglePerPoint;

    const innerRadius = size * 0.2;
    const outerRadius = size * 0.44;

    let radiusAtAngle;
    if (segmentProgress < 0.5) {
      const t = segmentProgress * 2;
      radiusAtAngle = innerRadius + (outerRadius - innerRadius) * t;
    } else {
      const t = (segmentProgress - 0.5) * 2;
      radiusAtAngle = outerRadius - (outerRadius - innerRadius) * t;
    }

    return distance < radiusAtAngle && distance > innerRadius * 0.3;
  }

  // OPTIMIZED: Pre-calculate all valid positions first
  const validPositions = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const x = (i / (gridSize - 1)) * 300;
      const y = (j / (gridSize - 1)) * 300;

      if (isInOctagram(x, y, 300)) {
        validPositions.push({ x, y });
      }
    }
  }

  // OPTIMIZED: Create dots only for valid positions and batch insert
  validPositions.forEach((pos, index) => {
    const dot = document.createElement("div");
    dot.className = "octagram-dot";
    dot.style.left = pos.x + "px";
    dot.style.top = pos.y + "px";

    // Pre-calculate metadata
    const centerX = 150;
    const centerY = 150;
    const dx = pos.x - centerX;
    const dy = pos.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    dot.dataset.index = index;
    dot.dataset.distance = distance;
    dot.dataset.angle = angle;

    fragment.appendChild(dot);
    dots.push(dot);
  });

  // OPTIMIZED: Single DOM insertion instead of multiple
  star.appendChild(fragment);

  // Wait for page load and intro, then start animation
  setTimeout(() => {
    createContinuousAnimation();
  }, 3500);

  // Continuous animation sequence
  function createContinuousAnimation() {
    const timeline = anime.timeline({
      loop: true,
      easing: "easeInOutQuad",
    });

    // Animation 1: Appear from center
    timeline.add({
      targets: ".octagram-dot",
      scale: [0, 1],
      opacity: [0, 1],
      delay: function (el, i) {
        const distance = parseFloat(el.dataset.distance);
        return distance * 2;
      },
      duration: 800,
      easing: "easeOutElastic(1, .6)",
    });

    // Animation 4: Spiral effect
    timeline.add(
      {
        targets: ".octagram-dot",
        rotate: [0, 360],
        scale: [1, 1.4, 1],
        delay: function (el, i) {
          const distance = parseFloat(el.dataset.distance);
          const angle = parseFloat(el.dataset.angle);
          return distance * 1.5 + (angle + Math.PI) * 30;
        },
        duration: 1400,
        easing: "easeInOutBack",
      },
      "+=400"
    );

    // Animation 5: Points pulse individually
    timeline.add(
      {
        targets: ".octagram-dot",
        scale: [1, 1.6, 1],
        opacity: [1, 0.7, 1],
        delay: function (el, i) {
          const angle = parseFloat(el.dataset.angle);
          const pointGroup = Math.floor(
            ((angle + Math.PI) / (2 * Math.PI)) * 8
          );
          return pointGroup * 120;
        },
        duration: 800,
        easing: "easeInOutQuad",
      },
      "+=500"
    );

    // Animation 8: Reset
    timeline.add(
      {
        targets: ".octagram-dot",
        translateX: 0,
        translateY: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        backgroundColor: "#7cff00",
        delay: function (el, i) {
          const distance = parseFloat(el.dataset.distance);
          return (120 - distance) * 1.5;
        },
        duration: 800,
        easing: "easeInOutQuad",
      },
      "+=800"
    );
  }
})();
