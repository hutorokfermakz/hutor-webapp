/* =========================================
   HUTOROK v7
   SCREEN NAVIGATION
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
   NAVIGATION EVENTS
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

const emptySlots =
  document.querySelectorAll(".farm-slot.empty");

const plantModal =
  document.getElementById("plant-modal");

const closeModal =
  document.getElementById("close-modal");

/* =========================================
   OPEN MODAL
========================================= */

emptySlots.forEach(slot => {

  slot.addEventListener("click", () => {

    plantModal.classList.add("active");

  });

});

/* =========================================
   CLOSE MODAL
========================================= */

closeModal.addEventListener("click", () => {

  plantModal.classList.remove("active");

});

plantModal.addEventListener("click", (e) => {

  if (e.target === plantModal) {

    plantModal.classList.remove("active");

  }

});

/* =========================================
   PLANT SYSTEM
========================================= */

const plantModal =
  document.getElementById("plant-modal");

const closeModalBtn =
  document.getElementById("close-modal");

const seedCards =
  document.querySelectorAll(".seed-card");

const emptySlots =
  document.querySelectorAll(".farm-slot.empty");

let currentSlot = null;

/* =========================================
   OPEN MODAL
========================================= */

emptySlots.forEach(slot => {

  slot.addEventListener("click", () => {

    currentSlot = slot;

    plantModal.classList.add("active");

  });

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
   SEED DATA
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

/* =========================================
   PLANT CROP
========================================= */

seedCards.forEach(card => {

  card.addEventListener("click", () => {

    if (!currentSlot) return;

    const cropKey =
      card.dataset.crop;

    const crop =
      crops[cropKey];

    currentSlot.classList.remove("empty");

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

      <div class="progress-bar">

        <div class="progress-fill"></div>

      </div>

      <button class="primary-btn">
        Ускорить
      </button>

    `;

    plantModal.classList.remove("active");

    currentSlot = null;

  });

});
