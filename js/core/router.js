export function initRouter() {

  const navButtons =
    document.querySelectorAll(".nav-btn");

  navButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const target =
        button.dataset.screen;

      switchScreen(target);

    });

  });

}

export function switchScreen(screen) {

  document
    .querySelectorAll(".screen")
    .forEach((screenEl) => {

      screenEl.classList.remove(
        "active"
      );

    });

  document
    .getElementById(
      `${screen}-screen`
    )
    .classList.add("active");

}
