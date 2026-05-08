document.addEventListener("DOMContentLoaded", () => {

  // ===== TELEGRAM MINI APP =====
  const tg = window.Telegram.WebApp;
  tg.expand();

  // ===== SUPABASE =====
  const SUPABASE_URL = "https://gihybzpefojxiyyxheks.supabase.co";
  const SUPABASE_KEY = "sb_publishable_epzMrCasnlXMmAENesXgTw_dkRzwBag";

  // ===== TELEGRAM USER =====
  const telegramId = tg.initDataUnsafe?.user?.id || null;

  // ===== PLAYER DATA =====
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
  const nameEl = document.getElementById("playerName");
  const moneyEl = document.getElementById("money");
  const starsEl = document.getElementById("stars");
  const levelEl = document.getElementById("level");
  const xpBar = document.getElementById("xpFill");
  const avatarEl = document.getElementById("avatar");
  const profileCard = document.getElementById("profileCard");

  // ===== UPDATE UI =====
  function updateUI() {

    if (nameEl) {
      nameEl.innerText = player.name;
    }

    if (moneyEl) {
      moneyEl.innerText = player.money;
    }

    if (starsEl) {
      starsEl.innerText = player.stars;
    }

    if (levelEl) {
      levelEl.innerText = player.level;
    }

    // ===== XP BAR =====
    const percent = Math.min((player.xp / 100) * 100, 100);

    if (xpBar) {
      xpBar.style.width = percent + "%";
    }

    // ===== AVATAR =====
    if (avatarEl) {

      if (player.avatar) {
        avatarEl.src = player.avatar;
      } else {
        avatarEl.src =
          "https://cdn-icons-png.flaticon.com/512/149/149071.png";
      }
    }

    // ===== BACKGROUND =====
    if (profileCard) {
      profileCard.className = "";
      profileCard.classList.add(player.background);
    }
  }

  // ===== SAVE PLAYER =====
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

      console.log("Игрок сохранён");

    } catch (err) {

      console.error("Ошибка сохранения:", err);

    }
  }

  // ===== LOAD PLAYER =====
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
        updateUI();

        return;
      }

      // ===== LOAD EXISTING PLAYER =====
      player = {
        name: data[0].name || "Фермер",
        money: data[0].money || 500,
        stars: data[0].stars || 0,
        level: data[0].level || 1,
        xp: data[0].xp || 0,
        avatar: data[0].avatar || "",
        background: data[0].background || "bg1"
      };

      updateUI();

    } catch (err) {

      console.error("Ошибка загрузки:", err);

    }
  }

  // ===== CHANGE NAME =====
  if (nameEl) {

    nameEl.addEventListener("click", async () => {

      const newName = prompt("Введите новое имя");

      if (!newName) return;

      player.name = newName;

      updateUI();
      savePlayer();

      tg.HapticFeedback.notificationOccurred("success");

    });

  }

  // ===== CHANGE AVATAR =====
  const avatarInput = document.getElementById("avatarInput");

  if (avatarInput) {

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

  }

  // ===== CASE BUTTON =====
  const caseBtn = document.getElementById("caseBtn");

  if (caseBtn) {

    caseBtn.addEventListener("click", async () => {

      tg.HapticFeedback.impactOccurred("medium");

      const reward = Math.floor(Math.random() * 200) + 50;

      player.money += reward;
      player.xp += 15;

      // ===== LEVEL UP =====
      if (player.xp >= 100) {

        player.level += 1;
        player.xp = 0;

        tg.HapticFeedback.notificationOccurred("success");

        alert("🎉 Новый уровень!");

      }

      updateUI();
      savePlayer();

      alert(`🎁 Вы получили ${reward} монет!`);

    });

  }

  // ===== BACKGROUND BUTTONS =====
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

  // ===== FARM BUTTON =====
  const farmBtn = document.getElementById("farmBtn");

  if (farmBtn) {

    farmBtn.addEventListener("click", () => {

      tg.HapticFeedback.impactOccurred("light");

      player.money += 10;
      player.xp += 2;

      // ===== LEVEL UP =====
      if (player.xp >= 100) {

        player.level += 1;
        player.xp = 0;

      }

      updateUI();
      savePlayer();

    });

  }

  // ===== START =====
  loadPlayer();
  updateUI();

});
