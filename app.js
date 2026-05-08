alert("JS WORKING");

document.addEventListener("DOMContentLoaded", () => {

  alert("DOM LOADED");

  const farmBtn = document.getElementById("farmBtn");

  if (!farmBtn) {
    alert("Кнопка не найдена");
    return;
  }

  alert("Кнопка найдена");

  farmBtn.addEventListener("click", () => {
    alert("КНОПКА РАБОТАЕТ");
  });

});
