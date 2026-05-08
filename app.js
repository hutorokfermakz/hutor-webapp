let coins = 100;
let xp = 0;
let energy = 20;

let currentSeed = "wheat";

const seeds = {
  wheat: {
    name: "🌾 Пшеница",
    growTime: 10000,
    reward: 25,
    xp: 10
  },

  corn: {
    name: "🌽 Кукуруза",
    growTime: 20000,
    reward: 50,
    xp: 20
  }
};

const coinsText = document.getElementById("coins");
const xpText = document.getElementById("xp");
const energyText = document.getElementById("energy");

const plots = document.querySelectorAll(".plot");
const seedButtons = document.querySelectorAll(".seed-btn");

function updateStats() {
  coinsText.innerText = coins;
  xpText.innerText = xp;
  energyText.innerText = energy;
}

updateStats();

seedButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    currentSeed = btn.dataset.seed;

  });

});

plots.forEach(plot => {

  let state = "empty";

  let crop = null;

  plot.addEventListener("click", () => {

    if (state === "empty") {

      if (energy <= 0) {
        alert("⚡ Нет энергии");
        return;
      }

      energy -= 1;

      updateStats();

      crop = seeds[currentSeed];

      state = "growing";

      plot.classList.add("growing");

      plot.innerText =
        crop.name + "\n⏳ Растет";

      setTimeout(() => {

        state = "ready";

        plot.classList.remove("growing");

        plot.classList.add("ready");

        plot.innerText =
          crop.name + "\n🌾 Готово";

      }, crop.growTime);

    }

    else if (state === "ready") {

      coins += crop.reward;

      xp += crop.xp;

      updateStats();

      state = "empty";

      plot.classList.remove("ready");

      plot.innerText = "Пусто";

    }

  });

});
