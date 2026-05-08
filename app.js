document.addEventListener("DOMContentLoaded", () => {

  const tg = window.Telegram.WebApp;

  tg.expand();

  // ===== PLAYER =====
  let player = {
    money: 500,
    level: 1,
    xp: 0
  };

  // ===== ELEMENTS =====
  const moneyEl = document.getElementById("money");
  const levelEl = document.getElementById("level");
  const xpFill = document.getElementById("xpFill");

  const farmBtn = document.getElementById("farmBtn");
  const caseBtn = document.getElementById("caseBtn");

  // ===== UPDATE UI =====
  function updateUI() {

    moneyEl.innerText = player.money;

    levelEl.innerText = player.level;

    xpFill.style.width = player.xp + "%";
  }

  // ===== FARM =====
  farmBtn.addEventListener("click", () => {

    tg.HapticFeedback.impactOccurred("light");

    player.money += 10;
    player.xp += 10;

    // LEVEL UP
    if (player.xp >= 100) {

      player.level += 1;
      player.xp = 0;

      alert("🎉 Новый уровень!");
    }

    updateUI();
  });

  // ===== CASE =====
  caseBtn.addEventListener("click", () => {

    tg.HapticFeedback.notificationOccurred("success");

    const reward = Math.floor(Math.random() * 100) + 50;

    player.money += reward;

    alert("🎁 +" + reward + " монет");

    updateUI();
  });

  // ===== START =====
  updateUI();

});
