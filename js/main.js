/* =========================================
   HUTOROK v7
========================================= */

const navButtons =
  document.querySelectorAll(".nav-btn");

const screens =
  document.querySelectorAll(".screen");

/* =========================================
   SCREEN SWITCH
========================================= */

function switchScreen(screenId) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  navButtons.forEach(btn => {
    btn.classList.remove("active");
  });

  const target =
    document.getElementById(screenId);

  if (target) {
    target.classList.add("active");
  }

  const activeBtn =
    document.querySelector(
      `.nav-btn[data-screen="${screenId}"]`
    );

  if (activeBtn) {
    activeBtn.classList.add("active");
  }
}

navButtons.forEach(button => {

  button.addEventListener("click", () => {

    switchScreen(
      button.dataset.screen
    );

  });

});

/* =========================================
   FARM SYSTEM
========================================= */

const modal =
  document.getElementById("plant-modal");

const closeModal =
  document.getElementById("close-modal");

const seedCards =
  document.querySelectorAll(".seed-card");

let currentEmptySlot = null;

/* OPEN MODAL */

document.addEventListener("click", e => {

  const emptySlot =
    e.target.closest(".farm-slot.empty");

  if (!emptySlot) return;

  currentEmptySlot = emptySlot;

  modal.classList.add("active");
});

/* CLOSE */

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

/* PLANT */

const crops = {

  wheat: {
    name: "Пшеница",
    emoji: "🌾",
    time: 120
  },

  carrot: {
    name: "Морковь",
    emoji: "🥕",
    time: 300
  },

  strawberry: {
    name: "Клубника",
    emoji: "🍓",
    time: 480
  },

  corn: {
    name: "Кукуруза",
    emoji: "🌽",
    time: 720
  }

};

seedCards.forEach(card => {

  card.addEventListener("click", () => {

    if (!currentEmptySlot) return;

    const cropType =
      card.dataset.crop;

    const crop =
      crops[cropType];

    startGrowing(
      currentEmptySlot,
      crop
    );

    modal.classList.remove("active");

  });

});

/* =========================================
   START GROWING
========================================= */

function startGrowing(slot, crop) {

  const endTime =
    Date.now() + crop.time * 1000;

  slot.classList.remove("empty");

  slot.innerHTML = `
  
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
      <span class="timer">
        ${formatTime(crop.time)}
      </span>
    </div>

    <div class="progress-bar">
      <div
        class="progress-fill"
        style="width:0%"
      ></div>
    </div>

    <button class="farm-action-btn">
      Полить
    </button>

  `;

  const timer =
    slot.querySelector(".timer");

  const progress =
    slot.querySelector(".progress-fill");

  const interval =
    setInterval(() => {

      const left =
        Math.floor(
          (endTime - Date.now()) / 1000
        );

      const percent =
        100 -
        (left / crop.time) * 100;

      progress.style.width =
        `${percent}%`;

      if (left <= 0) {

        clearInterval(interval);

        makeReady(slot, crop);

        return;
      }

      timer.textContent =
        formatTime(left);

    }, 1000);
}

/* =========================================
   READY
========================================= */

function makeReady(slot, crop) {

  slot.classList.add("ready");

  slot.innerHTML = `

    <div class="slot-top">
      <h4>${crop.name}</h4>

      <span class="slot-badge ready-badge">
        ГОТОВО
      </span>
    </div>

    <div class="crop-stage ready-crop">
      ${crop.emoji}
    </div>

    <div class="slot-progress-info">
      <span>Урожай созрел</span>
      <span>+24</span>
    </div>

    <button class="harvest-btn">
      Собрать урожай
    </button>

  `;

  const harvestBtn =
    slot.querySelector(".harvest-btn");

  harvestBtn.addEventListener("click", () => {

    slot.className =
      "farm-slot empty";

    slot.innerHTML = `
    
      <div class="empty-content">

        <div class="empty-plus">
          +
        </div>

        <span>
          Посадить культуру
        </span>

      </div>

    `;

  });

}

/* =========================================
   TIME
========================================= */

function formatTime(seconds) {

  const min =
    Math.floor(seconds / 60);

  const sec =
    seconds % 60;

  return `${min}м ${sec}с`;
}

/* =========================================
   INIT
========================================= */

switchScreen("farm-screen");
