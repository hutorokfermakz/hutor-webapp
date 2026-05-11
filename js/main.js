/* =========================================
   HUTOROK v7
   SCREEN NAVIGATION
========================================= */

const navButtons = document.querySelectorAll(".nav-btn");
const screens = document.querySelectorAll(".screen");

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
   NAV EVENTS
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
