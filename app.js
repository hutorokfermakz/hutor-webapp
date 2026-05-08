const tg = window.Telegram?.WebApp;

if (tg) {
  tg.expand();
}

const SUPABASE_URL =
"https://gihybzpefojxiyyxheks.supabase.co";

const SUPABASE_KEY =
"sb_publishable_epzMrCasnlXMmAENesXgTw_dkRzwBag";

const telegramId =
tg?.initDataUnsafe?.user?.id || "guest";

let player = {
  telegram_id: telegramId,
  name: "Фермер",
  money: 500,
  stars: 0,
  level: 1,
  xp: 25,
  avatar: "https://i.imgur.com/9Xn4F6L.png",
  background: "default"
};

const farmGrid =
document.getElementById("farmGrid");

const crops = [
  "🌾",
  "🥕",
  "🍅",
  "🌽"
];

async function loadPlayer() {

  try {

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/players?telegram_id=eq.${telegramId}`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    const data = await response.json();

    if (data && data.length > 0) {

      player = {
        ...player,
        ...data[0]
      };

    } else {

      await savePlayer();

    }

  } catch (err) {

    console.log("Load Error:", err);

  }

  updateUI();

}

async function savePlayer() {

  try {

    await fetch(
      `${SUPABASE_URL}/rest/v1/players`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "resolution=merge-duplicates"
        },
        body: JSON.stringify(player)
      }
    );

  } catch (err) {

    console.log("Save Error:", err);

  }

}

function updateUI() {

  const money =
  document.getElementById("money");

  const stars =
  document.getElementById("stars");

  const level =
  document.getElementById("level");

  const playerName =
  document.getElementById("playerName");

  const nameInput =
  document.getElementById("nameInput");

  const avatar =
  document.getElementById("avatar");

  const bigAvatar =
  document.getElementById("bigAvatar");

  const xpFill =
  document.getElementById("xpFill");

  if (money)
    money.innerText = player.money;

  if (stars)
    stars.innerText = player.stars;

  if (level)
    level.innerText = player.level;

  if (playerName)
    playerName.innerText = player.name;

  if (nameInput)
    nameInput.value = player.name;

  if (avatar)
    avatar.src = player.avatar;

  if (bigAvatar)
    bigAvatar.src = player.avatar;

  if (xpFill) {

    const percent =
    player.xp % 100;

    xpFill.style.width =
    percent + "%";

  }

}

function createFarm() {

  if (!farmGrid) return;

  farmGrid.innerHTML = "";

  for (let i = 0; i < 9; i++) {

    const tile =
    document.createElement("div");

    tile.className =
    "farm-tile";

    tile.innerHTML = "🌱";

    tile.onclick = () =>
    growCrop(tile);

    farmGrid.appendChild(tile);

  }

}

function growCrop(tile) {

  if (tg) {
    tg.HapticFeedback
    .impactOccurred("light");
  }

  tile.innerHTML = "⏳";

  setTimeout(() => {

    tile.innerHTML =
    crops[
      Math.floor(
        Math.random() *
        crops.length
      )
    ];

    const reward =
    Math.floor(
      Math.random() * 80
    ) + 20;

    player.money += reward;

    player.xp += 15;

    if (
      player.xp >=
      player.level * 100
    ) {

      player.level++;
      player.stars++;

      if (tg) {

        tg.HapticFeedback
        .notificationOccurred(
          "success"
        );

      }

    }

    updateUI();

    savePlayer();

  }, 3000);

}

function changeAvatar() {

  const input =
  document.getElementById(
    "avatarInput"
  );

  if (input) {
    input.click();
  }

}

const avatarInput =
document.getElementById(
  "avatarInput"
);

if (avatarInput) {

  avatarInput.addEventListener(
    "change",
    (e) => {

      const file =
      e.target.files[0];

      if (!file) return;

      const reader =
      new FileReader();

      reader.onload =
      function(event) {

        player.avatar =
        event.target.result;

        updateUI();

        savePlayer();

      };

      reader.readAsDataURL(file);

    }
  );

}

function saveProfile() {

  const input =
  document.getElementById(
    "nameInput"
  );

  if (input) {

    player.name =
    input.value;

  }

  updateUI();

  savePlayer();

  if (tg) {

    tg.HapticFeedback
    .notificationOccurred(
      "success"
    );

  }

}

function createInventory() {

  const inventory =
  document.getElementById(
    "inventory"
  );

  if (!inventory) return;

  inventory.innerHTML = "";

  const items = [
    "🌾",
    "🥕",
    "🍅",
    "💎",
    "🎁",
    "⭐",
    "🪙",
    "🖼️"
  ];

  items.forEach(item => {

    const div =
    document.createElement("div");

    div.className =
    "inventory-item";

    div.innerHTML = item;

    inventory.appendChild(div);

  });

}

function createOnlinePlayers() {

  const online =
  document.getElementById(
    "onlinePlayers"
  );

  if (!online) return;

  online.innerHTML = "";

  const players = [
    "FarmerPro",
    "HayDayKing",
    "ClashFarmer",
    "HutorMaster"
  ];

  players.forEach(name => {

    const div =
    document.createElement("div");

    div.className =
    "online-player";

    div.innerHTML = `
      <span>🟢 ${name}</span>
      <span>Онлайн</span>
    `;

    online.appendChild(div);

  });

}

loadPlayer();

createFarm();

createInventory();

createOnlinePlayers();
