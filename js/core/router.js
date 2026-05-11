export function initRouter() {

  const navButtons =
    document.querySelectorAll(".nav-btn");

  const screens =
    document.querySelectorAll(".screen");

  if (!navButtons.length) {
    console.log("NAV NOT FOUND");
    return;
  }

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

      const targetScreen =
        document.getElementById(
          `${target}-screen`
        );

      if (targetScreen) {

        targetScreen.classList.add(
          "active"
        );

      }

      console.log(
        `SCREEN: ${target}`
      );

    });

  });

}
