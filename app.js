document.addEventListener("DOMContentLoaded", () => {

  const tg = window.Telegram.WebApp;

  tg.expand();

  let money = 500;
  let level = 1;
  let xp = 0;

  const moneyEl = document.getElementById("money");
  const levelEl = document.getElementById("level");
  const xpFill = document.getElementById("xpFill");

  const farmBtn = document.getElementById("farmBtn");
  const caseBtn = document.getElementById("caseBtn");

  function updateUI() {

    moneyEl.innerText = money;
    levelEl.innerText = level;

    xpFill.style.width = xp + "%";
  }

  farmBtn.addEventListener("click", () => {

    tg.HapticFeedback.impactOccurred("light");

    money += 10;
    xp += 10;

    if (xp >= 100) {
      level++;
      xp = 0;

      alert("🎉 Новый уровень!");
    }

    updateUI();
  });

  caseBtn.addEventListener("click", () => {

    tg.HapticFeedback.notificationOccurred("success");

    const reward = Math.floor(Math.random() * 100) + 50;

    money += reward;

    alert("🎁 +" + reward + " монет");

    updateUI();
  });

  updateUI();

});
