// Sample dictionary data - replace with your actual words
const dictionaryData = [
  {
    word: "اللّه ﷻ",
    definition:
      "في الإصطلاح الكركري هو إسم الذات المقدسة الأزلية, وهو الإسم الأعظم الجامع",
  },
  {
    word: "سيدنا محمد ﷺ",
    definition: "صوت التنفس مع صفير في الحلق",
    example: "خرخرة القطة تدل على سعادتها",
  },
  {
    word: "الإسلام",
    definition: "الضحك بصوت عالٍ ومتقطع",
    example: "ملأت قهقهته المكان",
  },
  {
    word: "الإيمان",
    definition: "الكلام بصوت منخفض وغير واضح",
    example: "سمعت همهمة الحضور في القاعة",
  },
  {
    word: "الإحسان",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "النور",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "القوس العلوي",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الملك ",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الملكوت",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الجبروت",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الخمرة الأزلية",
    definition: "إسم الذات المقدسة الأزلية, وهو الإسم الأعظم الجامع",
    example: "سمعت كركرة الماء في الجدول",
  },
  {
    word: "اللمحة",
    definition: "صوت التنفس مع صفير في الحلق",
    example: "خرخرة القطة تدل على سعادتها",
  },
  {
    word: "السر",
    definition: "الضحك بصوت عالٍ ومتقطع",
    example: "ملأت قهقهته المكان",
  },
  {
    word: "سر السر",
    definition: "الكلام بصوت منخفض وغير واضح",
    example: "سمعت همهمة الحضور في القاعة",
  },
  {
    word: "المعرفة",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الإخلاص",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الوصل",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الفصل ",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الجمع",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الفرق",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الحس",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "المعنى",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الشريعة ",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الطريقة",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
  {
    word: "الحقيقة",
    definition: "الكلام بصوت خافت في السر",
    example: "وشوشة الأصدقاء في المكتبة",
  },
];

// Elements
const wordsContainer = document.getElementById("wordsContainer");
const searchInput = document.getElementById("searchInput");
const wordModal = document.getElementById("wordModal");
const modalClose = document.getElementById("modalClose");
const modalWord = document.getElementById("modalWord");
const modalDefinition = document.getElementById("modalDefinition");
const modalExample = document.getElementById("modalExample");

// Photo modal elements
const circlePhoto = document.getElementById("circlePhoto");
const photoModal = document.getElementById("photoModal");
const photoModalClose = document.getElementById("photoModalClose");
const photoModalBackdrop = photoModal?.querySelector(".photo-modal-backdrop");

// Render word cards
function renderWords(words) {
  wordsContainer.innerHTML = "";

  words.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <div class="word-card-title">${item.word}</div>
      <div class="word-card-preview">${item.definition.substring(
        0,
        60
      )}...</div>
    `;

    card.addEventListener("click", () => openModal(item));
    wordsContainer.appendChild(card);
  });
}

// Open modal
function openModal(item) {
  modalWord.textContent = item.word;
  modalDefinition.textContent = item.definition;
  modalExample.textContent = item.example ? `مثال: ${item.example}` : "";
  wordModal.classList.add("active");
}

// Close modal
function closeModal() {
  wordModal.classList.remove("active");
}

// Search functionality WITH DEBOUNCING (OPTIMIZED)
let searchTimeout;
searchInput.addEventListener("input", (e) => {
  // Clear previous timeout
  clearTimeout(searchTimeout);

  // Set new timeout - waits 150ms after user stops typing
  searchTimeout = setTimeout(() => {
    const searchTerm = e.target.value.trim();

    if (searchTerm === "") {
      renderWords(dictionaryData);
    } else {
      const filtered = dictionaryData.filter(
        (item) =>
          item.word.includes(searchTerm) || item.definition.includes(searchTerm)
      );
      renderWords(filtered);
    }
  }, 150); // 150ms debounce delay
});

// Event listeners
modalClose.addEventListener("click", closeModal);
wordModal.addEventListener("click", (e) => {
  if (e.target === wordModal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (wordModal.classList.contains("active")) {
      closeModal();
    }
    if (photoModal?.classList.contains("active")) {
      closePhotoModal();
    }
  }
});

// Photo modal functions
function openPhotoModal() {
  photoModal?.classList.add("active");
}

function closePhotoModal() {
  photoModal?.classList.remove("active");
}

// Photo modal event listeners
circlePhoto?.addEventListener("click", openPhotoModal);
photoModalClose?.addEventListener("click", closePhotoModal);
photoModalBackdrop?.addEventListener("click", closePhotoModal);

// Cleanup on page unload (prevent memory leaks)
window.addEventListener("beforeunload", () => {
  clearTimeout(searchTimeout);
});

// Initial render
renderWords(dictionaryData);
