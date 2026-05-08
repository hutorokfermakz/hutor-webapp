// ===== PLAYER DATA =====
let player = {
  name: "Фермер",
  coins: 500,
  level: 1,
  xp: 0,
  clan: null,
  inventory: []
};

// ===== SAVE =====
function savePlayer() {
  localStorage.setItem("hutor_player", JSON.stringify(player));
}

function loadPlayer() {
  const data = localStorage.getItem("hutor_player");

  if (data) {
    player = JSON.parse(data);
  }
}

// ===== UPDATE UI =====
function updateUI() {
  const coins = document.getElementById("coins");
  const level = document.getElementById("level");
  const xpBar = document.getElementById("xpFill");
  const playerName = document.getElementById("playerName");

  if (coins) {
    coins.innerText = player.coins;
  }

  if (level) {
    level.innerText = player.level;
  }

  if (playerName) {
    playerName.innerText = player.name;
  }

  if (xpBar) {
    xpBar.style.width = player.xp + "%";
  }
}

// ===== FARM =====
function collectFarm() {
  const reward = Math.floor(Math.random() * 50) + 20;

  player.coins += reward;
  player.xp += 10;

  if (player.xp >= 100) {
    player.level += 1;
    player.xp = 0;
  }

  savePlayer();
  updateUI();

  alert("🌾 Урожай собран +" + reward);
}

// ===== CASE =====
function openCase() {
  if (player.coins < 100) {
    alert("❌ Нужно 100 монет");
    return;
  }

  player.coins -= 100;

  const reward = Math.floor(Math.random() * 300) + 50;

  player.coins += reward;

  savePlayer();
  updateUI();

  alert("🎁 Выпало " + reward + " монет");
}

// ===== SHOP =====
function openShop() {
  alert("🛒 Магазин скоро будет");
}

// ===== CLANS =====
function openClans() {
  alert("🛡 Кланы скоро будут");
}

// ===== BUTTONS =====
window.onload = () => {
  loadPlayer();
  updateUI();

  const farmBtn = document.getElementById("farmBtn");
  const caseBtn = document.getElementById("caseBtn");
  const shopBtn = document.getElementById("shopBtn");
  const clanBtn = document.getElementById("clanBtn");

  if (farmBtn) {
    farmBtn.onclick = collectFarm;
  }

  if (caseBtn) {
    caseBtn.onclick = openCase;
  }

  if (shopBtn) {
    shopBtn.onclick = openShop;
  }

  if (clanBtn) {
    clanBtn.onclick = openClans;
  }
};
