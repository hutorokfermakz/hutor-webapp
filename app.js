let coins = 500;
let level = 1;
let xp = 10;

function updateUI() {
  document.getElementById("coins").innerText = coins;
  document.getElementById("level").innerText = level;
  document.getElementById("xpFill").style.width = xp + "%";
}

document.addEventListener("DOMContentLoaded", () => {

  updateUI();

  document.getElementById("farmBtn").onclick = () => {
    coins += 50;
    xp += 10;

    if (xp >= 100) {
      level += 1;
      xp = 0;
    }

    updateUI();

    alert("🌾 Урожай собран");
  };

  document.getElementById("caseBtn").onclick = () => {
    if (coins < 100) {
      alert("❌ Нужно 100 монет");
      return;
    }

    coins -= 100;

    const reward = Math.floor(Math.random() * 500);

    coins += reward;

    updateUI();

    alert("🎁 Выпало " + reward);
  };

  document.getElementById("shopBtn").onclick = () => {
    alert("🛒 Магазин скоро");
  };

  document.getElementById("clanBtn").onclick = () => {
    alert("🛡 Кланы скоро");
  };

});
