// app.js

document.addEventListener("DOMContentLoaded", () => {

  // ===== TELEGRAM =====
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

  const avatar = document.getElementById("avatar");
  const avatarInput = document.getElementById("avatarInput");

  // ===== FARM SLOTS =====
  const slots = [];

  for (let i = 1; i <= 9; i++) {

    slots.push(
      document.getElementById(`slot${i}`)
    );

  }

  // ===== UPDATE UI =====
  function updateUI() {

    moneyEl.innerText = player.money;

    levelEl.innerText = player.level;

    xpFill.style.width = player.xp + "%";

    // BUTTON TEXT
    if (!wheatGrowing && !wheatReady) {
      farmBtn.innerText = "🌾 Посадить пшеницу";
    }

    if (wheatGrowing) {
      farmBtn.innerText = "⏳ Пшеница растет...";
    }

    if (wheatReady) {
      farmBtn.innerText = "🌾 Собрать урожай";
    }
  }

  // ===== XP =====
  function addXP(amount) {

    player.xp += amount;

    if (player.xp >= 100) {

      player.level += 1;

      player.xp = 0;

      tg.HapticFeedback.notificationOccurred("success");

      alert("🎉 Новый уровень!");

    }
  }

  // ===== FARM =====
  farmBtn.addEventListener("click", () => {

    tg.HapticFeedback.impactOccurred("light");

    // ===== PLANT =====
    if (!wheatGrowing && !wheatReady) {

      wheatGrowing = true;

      slots.forEach(slot => {
        slot.innerText = "🌱";
      });

      updateUI();

      // GROW TIMER
      setTimeout(() => {

        wheatGrowing = false;
        wheatReady = true;

        slots.forEach(slot => {
          slot.innerText = "🌾";
        });

        updateUI();

        tg.HapticFeedback.notificationOccurred("success");

      }, 5000);

      return;
    }

    // ===== COLLECT =====
    if (wheatReady) {

      wheatReady = false;

      slots.forEach(slot => {
        slot.innerText = "🟫";
      });

      const reward = 150;

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

  // ===== AVATAR =====
  avatarInput.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {

      avatar.src = event.target.result;

      tg.HapticFeedback.notificationOccurred("success");

    };

    reader.readAsDataURL(file);
  });

  // ===== START =====
  updateUI();

});
