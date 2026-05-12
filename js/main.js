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
   SEED SYSTEM
========================================= */

const seedCards =
  document.querySelectorAll(".seed-card");

seedCards.forEach(card => {

  card.addEventListener("click", () => {

    plantModal.classList.remove("active");

    alert("Культура посажена");

  });

});
