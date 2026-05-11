const navButtons =
  document.querySelectorAll(".nav-btn");

const screens =
  document.querySelectorAll(".screen");

export function initRouter() {

  navButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const target =
        button.dataset.screen;

      navButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      screens.forEach((screen) => {
        screen.classList.remove("active");
      });

      const activeScreen =
        document.getElementById(
          `${target}-screen`
        );

      if (activeScreen) {
        activeScreen.classList.add("active");
      }

    });

  });

}
