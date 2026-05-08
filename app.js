document.addEventListener("DOMContentLoaded", () => {

  const tg = window.Telegram.WebApp;

  tg.expand();

  // ===== PLAYER =====
  let player = {
    money: 500,
    level: 1,
    xp: 0
  };

  // ===== FARM =====
  let wheatGrowing = false;
  let wheatReady = false;

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

    // FARM BUTTON
    if (!wheatGrowing && !wheatReady) {
      farmBtn.innerText = "🌱 Посадить пшеницу";
    }

    if (wheatGrowing) {
      farmBtn.innerText = "⏳ Пшеница растет...";
    }

    if (wheatReady) {
      farmBtn.innerText = "🌾 Собрать урожай";
    }
  }

  // ===== LEVEL SYSTEM =====
  function addXP(amount) {

    player.xp += amount;

    if (player.xp >= 100) {

      player.level += 1;
      player.xp = 0;

      alert("🎉 Новый уровень!");
    }
  }

  // ===== FARM =====
  farmBtn.addEventListener("click", () => {

    tg.HapticFeedback.impactOccurred("light");

    // ===== PLANT =====
    if (!wheatGrowing && !wheatReady) {

      wheatGrowing = true;

      updateUI();

      // GROW TIMER
      setTimeout(() => {

        wheatGrowing = false;
        wheatReady = true;

        updateUI();

        tg.HapticFeedback.notificationOccurred("success");

      }, 5000);

      return;
    }

    // ===== COLLECT =====
    if (wheatReady) {

      wheatReady = false;

      const reward = 50;

      player.money += reward;

      addXP(20);

      alert("🌾 Урожай собран! +" + reward);

      updateUI();
    }

  });

  // ===== CASE =====
  caseBtn.addEventListener("click", () => {

    tg.HapticFeedback.notificationOccurred("success");

    const reward = Math.floor(Math.random() * 100) + 50;

    player.money += reward;

    addXP(15);

    alert("🎁 +" + reward + " монет");

    updateUI();
  });

  // ===== START =====
  updateUI();

});
