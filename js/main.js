/* =========================================
   HUTOROK v7
   APP
========================================= */

const navButtons =
  document.querySelectorAll(".nav-btn");

const screens =
  document.querySelectorAll(".screen");

/* =========================================
   SWITCH SCREEN
========================================= */

function switchScreen(screenId) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  navButtons.forEach(button => {
    button.classList.remove("active");
  });

  const targetScreen =
    document.getElementById(screenId);

  if (targetScreen) {

    targetScreen.classList.add("active");

    targetScreen.scrollTop = 0;

  }

  const activeButton =
    document.querySelector(
      `.nav-btn[data-screen="${screenId}"]`
    );

  if (activeButton) {
    activeButton.classList.add("active");
  }

}

/* =========================================
   NAVIGATION
========================================= */

navButtons.forEach(button => {

  button.addEventListener("click", () => {

    const screenId =
      button.dataset.screen;

    switchScreen(screenId);

  });

});

/* =========================================
   DEFAULT SCREEN
========================================= */

switchScreen("farm-screen");

/* =========================================
   PLANT MODAL
========================================= */

const plantModal =
  document.getElementById("plant-modal");

const closeModalBtn =
  document.getElementById("close-modal");

let currentSlot = null;

/* =========================================
   OPEN EMPTY SLOT
========================================= */

document.addEventListener("click", (event) => {

  const emptySlot =
    event.target.closest(".farm-slot.empty");

  if (!emptySlot) return;

  currentSlot = emptySlot;

  plantModal.classList.add("active");

});

/* =========================================
   CLOSE MODAL
========================================= */

closeModalBtn.addEventListener("click", () => {

  plantModal.classList.remove("active");

});

plantModal.addEventListener("click", (event) => {

  if (event.target === plantModal) {

    plantModal.classList.remove("active");

  }

});

/* =========================================
   CROPS
========================================= */

const crops = {

  wheat: {
    name: "Пшеница",
    emoji: "🌾",
    time: "2м 14с"
  },

  carrot: {
    name: "Морковь",
    emoji: "🥕",
    time: "4м 10с"
  },

  strawberry: {
    name: "Клубника",
    emoji: "🍓",
    time: "6м 52с"
  }

};
/* =========================
   PLANTING
========================= */

const seedCards = document.querySelectorAll(".seed-card");

let currentSlot = null;

/* OPEN MODAL */

document.querySelectorAll(".farm-slot.empty").forEach((slot) => {

  slot.addEventListener("click", () => {

    currentSlot = slot;

    plantModal.classList.add("active");

  });

});

/* PLANT SEED */

seedCards.forEach((card) => {

  card.addEventListener("click", () => {

    if (!currentSlot) return;

    const cropKey = card.dataset.crop;

    const crop = crops[cropKey];

    currentSlot.classList.remove("empty");

    currentSlot.classList.add("growing");

    currentSlot.innerHTML = `
      <div class="slot-top">
        <h4>${crop.name}</h4>

        <span class="slot-badge">
          РОСТ
        </span>
      </div>

      <div class="crop-stage">
        ${crop.emoji}
      </div>

      <div class="slot-progress-info">
        <span>До урожая</span>
        <span>${crop.time}</span>
      </div>

      <div class="slot-progress">
        <div class="slot-progress-bar"></div>
      </div>

      <button class="slot-action">
        Ускорить
      </button>
    `;

    plantModal.classList.remove("active");

    currentSlot = null;

  });

});
