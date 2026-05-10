const navButtons =
document.querySelectorAll(".nav-btn");

const pages =
document.querySelectorAll(".page");

navButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    // ACTIVE BUTTON

    navButtons.forEach(b => {
      b.classList.remove("active");
    });

    btn.classList.add("active");

    // ACTIVE PAGE

    const pageId =
    btn.dataset.page;

    pages.forEach(page => {
      page.classList.remove("active");
    });

    document
      .getElementById(pageId)
      .classList.add("active");

  });

});
