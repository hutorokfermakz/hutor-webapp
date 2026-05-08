document.addEventListener("DOMContentLoaded", () => {

  // ===== TELEGRAM =====
  const tg = window.Telegram.WebApp;
  tg.expand();

  // ===== SUPABASE =====
  const SUPABASE_URL = "https://gihybzpefojxiyyxheks.supabase.co";
  const SUPABASE_KEY = "sb_publishable_epzMrCasnlXMmAENesXgTw_dkRzwBag";

  // ===== TELEGRAM USER =====
  const telegramId = tg.initDataUnsafe?.user?.id || null;

  // ===== PLAYER =====
  let player = {
    name: "Фермер",
    money: 500,
    stars: 0,
    level: 1,
    xp: 0,
    avatar: "",
    background: "bg1"
  };

  // ===== ELEMENTS =====
  const playerName = document.getElementById("playerName");
  const moneyEl = document.getElementById("money");
  const starsEl = document.getElementById("stars");
  const levelEl = document.getElementById("level");
  const xpFill = document.getElementById("xpFill");
  const avatar = document.getElementById("avatar");
  const profileCard = document.getElementById("profileCard");

  const farmBtn = document.getElementById("farmBtn");
  const caseBtn = document.getElementById("caseBtn");
  const avatarInput = document.getElementById("avatarInput");

  // ===== UPDATE UI =====
  function updateUI() {

    playerName.innerText = player.name;
    moneyEl.innerText = player.money;
    starsEl.innerText = player.stars;
    levelEl.innerText = player.level;

    // XP
    const xpPercent = Math.min(player.xp, 100);

    xpFill.style.width = xpPercent + "%";

    // Avatar
    if (player.avatar) {
      avatar.src = player.avatar;
    }

    // Background
    profileCard.className = "";
    profileCard.classList.add("profile-card");
    profileCard.classList.add(player.background);
  }

  // ===== SAVE =====
  async function savePlayer() {

    if (!telegramId) return;

    const playerData = {
      telegram_id: telegramId.toString(),
      name: player.name,
      money: player.money,
      stars: player.stars,
      level: player.level,
      xp: player.xp,
      avatar: player.avatar,
      background: player.background
    };

    try {

      await fetch(`${SUPABASE_URL}/rest/v1/players`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=merge-duplicates"
        },
        body: JSON.stringify(playerData)
      });

      console.log("Сохранено");

    } catch (err) {

      console.error(err);

    }
  }

  // ===== LOAD =====
  async function loadPlayer() {

    if (!telegramId) return;

    try {

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/players?telegram_id=eq.${telegramId}`,
        {
          headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
          }
        }
      );

      const data = await response.json();

      // ===== NEW PLAYER =====
      if (!data || data.length === 0) {

        player = {
          name: tg.initDataUnsafe.user?.first_name || "Фермер",
          money: 500,
          stars: 0,
          level: 1,
          xp: 0,
          avatar: "",
          background: "bg1"
        };

        await savePlayer();

      } else {

        // ===== EXISTING PLAYER =====
        player = {
          name: data[0].name || "Фермер",
          money: data[0].money || 500,
          stars: data[0].stars || 0,
          level: data[0].level || 1,
          xp: data[0].xp || 0,
          avatar: data[0].avatar || "",
          background: data[0].background || "bg1"
        };

      }

      updateUI();

    } catch (err) {

      console.error(err);

    }
  }

  // ===== CHANGE NAME =====
  playerName.addEventListener("click", () => {

    const newName = prompt("Введите имя");

    if (!newName) return;

    player.name = newName;

    updateUI();
    savePlayer();

    tg.HapticFeedback.notificationOccurred("success");
  });

  // ===== CHANGE AVATAR =====
  avatarInput.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {

      player.avatar = event.target.result;

      updateUI();
      savePlayer();

      tg.HapticFeedback.notificationOccurred("success");
    };

    reader.readAsDataURL(file);
  });

  // ===== FARM BUTTON =====
  farmBtn.addEventListener("click", () => {

    tg.HapticFeedback.impactOccurred("light");

    player.money += 10;
    player.xp += 5;

    // LEVEL UP
    if (player.xp >= 100) {

      player.level += 1;
      player.xp = 0;

      alert("🎉 Новый уровень!");
    }

    updateUI();
    savePlayer();
  });

  // ===== CASE BUTTON =====
  caseBtn.addEventListener("click", () => {

    tg.HapticFeedback.impactOccurred("medium");

    const reward = Math.floor(Math.random() * 200) + 50;

    player.money += reward;
    player.xp += 15;

    // LEVEL UP
    if (player.xp >= 100) {

      player.level += 1;
      player.xp = 0;

      alert("🎉 Новый уровень!");
    }

    updateUI();
    savePlayer();

    alert(`🎁 Вы получили ${reward} монет!`);
  });

  // ===== BACKGROUNDS =====
  const bgButtons = document.querySelectorAll(".bg-select");

  bgButtons.forEach(btn => {

    btn.addEventListener("click", () => {

      const bg = btn.dataset.bg;

      player.background = bg;

      updateUI();
      savePlayer();

      tg.HapticFeedback.selectionChanged();
    });

  });

  // ===== START =====
  loadPlayer();

});
