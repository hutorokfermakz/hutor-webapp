const navButtons = document.querySelectorAll(".nav-btn");
const screens = document.querySelectorAll(".screen");

function openScreen(screenId) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  navButtons.forEach(button => {
    button.classList.remove("active");
  });

  const targetScreen = document.getElementById(screenId);

  if (targetScreen) {
    targetScreen.classList.add("active");
  }

  const activeButton = document.querySelector(
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
