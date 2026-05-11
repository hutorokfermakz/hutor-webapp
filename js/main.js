const navButtons = document.querySelectorAll(".nav-btn");
const screens = document.querySelectorAll(".screen");

/* =========================
   SCREEN NAVIGATION
========================= */

function openScreen(screenId) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  navButtons.forEach(button => {
    button.classList.remove("active");
  });

  const targetScreen =
    document.getElementById(`${screenId}-screen`);

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

navButtons.forEach(button => {

  button.addEventListener("click", () => {

    const screenId = button.dataset.screen;

    openScreen(screenId);

  });

});

/* =========================
   LIVE FARM SYSTEM
========================= */

const wheatTimer =
  document.getElementById("timer-wheat");

const carrotTimer =
  document.getElementById("timer-carrot");

const wheatFill =
  document.querySelector(".wheat-fill");

const carrotFill =
  document.querySelector(".carrot-fill");

/* seconds */

let wheatTime = 134;
let carrotTime = 341;

function formatTime(seconds) {

  const mins = Math.floor(seconds / 60);

  const secs = seconds % 60;

  return `${mins}м ${secs}s`;
}

function updateFarmTimers() {

  /* WHEAT */

  if (wheatTime > 0) {

    wheatTime--;

    wheatTimer.textContent =
      formatTime(wheatTime);

    const wheatProgress =
      100 - (wheatTime / 134) * 100;

    wheatFill.style.width =
      `${wheatProgress}%`;

  } else {

    wheatTimer.textContent =
      "ГОТОВО";

  }

  /* CARROT */

  if (carrotTime > 0) {

    carrotTime--;

    carrotTimer.textContent =
      formatTime(carrotTime);

    const carrotProgress =
      100 - (carrotTime / 341) * 100;

    carrotFill.style.width =
      `${carrotProgress}%`;

  } else {

    carrotTimer.textContent =
      "ГОТОВО";

  }

}

setInterval(updateFarmTimers, 1000);

/* =========================
   HARVEST BUTTON
========================= */

const harvestBtn =
  document.querySelector(".harvest-btn");

if (harvestBtn) {

  harvestBtn.addEventListener("click", () => {

    harvestBtn.innerText =
      "Собрано";

    harvestBtn.style.opacity = "0.7";

    harvestBtn.style.pointerEvents =
      "none";

  });

}

/* =========================
   EMPTY SLOT
========================= */

const emptySlots =
  document.querySelectorAll(".farm-slot.empty");

emptySlots.forEach(slot => {

  slot.addEventListener("click", () => {

    alert("Система посадки скоро появится");

  });

});

/* =========================
   WATER / SPEED BUTTONS
========================= */

const actionButtons =
  document.querySelectorAll(".farm-action-btn");

actionButtons.forEach(button => {

  button.addEventListener("click", () => {

    button.innerText = "Активировано";

    button.style.opacity = "0.8";

  });

});
