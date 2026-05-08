let save = JSON.parse(localStorage.getItem("hutor_save"));

if (!save) {

  save = {
    coins: 100,
    xp: 0,
    energy: 20,

    wheatSeeds: 5,
    cornSeeds: 3,

    lastEnergyTime: Date.now(),

    plots: [
      null,
      null,
      null,
      null
    ]
  };

}

let coins = save.coins;
let xp = save.xp;
let energy = save.energy;

const MAX_ENERGY = 20;
const ENERGY_REGEN_TIME = 30000;

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

const wheatSeedsText =
  document.getElementById("wheatSeeds");

const cornSeedsText =
  document.getElementById("cornSeeds");

const plots = document.querySelectorAll(".plot");
const seedButtons = document.querySelectorAll(".seed-btn");

function saveGame() {

  save.coins = coins;
  save.xp = xp;
  save.energy = energy;

  localStorage.setItem(
    "hutor_save",
    JSON.stringify(save)
  );

}

function updateStats() {

  coinsText.innerText = coins;
  xpText.innerText = xp;
  energyText.innerText = energy;

  wheatSeedsText.innerText =
    save.wheatSeeds;

  cornSeedsText.innerText =
    save.cornSeeds;

}

function regenEnergy() {

  let now = Date.now();

  if (energy < MAX_ENERGY) {

    let passed =
      now - save.lastEnergyTime;

    if (passed >= ENERGY_REGEN_TIME) {

      let restored =
        Math.floor(
          passed / ENERGY_REGEN_TIME
        );

      energy += restored;

      if (energy > MAX_ENERGY) {
        energy = MAX_ENERGY;
      }

      save.lastEnergyTime = now;

      saveGame();

      updateStats();

    }

  }

}

regenEnergy();

setInterval(() => {

  regenEnergy();

}, 5000);

updateStats();

seedButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    currentSeed = btn.dataset.seed;

  });

});

plots.forEach((plot, index) => {

  let data = save.plots[index];

  if (data) {

    let crop = seeds[data.seed];

    let remaining =
      data.finishTime - Date.now();

    if (remaining > 0) {

      plot.classList.add("growing");

      plot.innerText =
        crop.name + "\n⏳ Растет";

      setTimeout(() => {

        plot.classList.remove("growing");

        plot.classList.add("ready");

        plot.innerText =
          crop.name + "\n🌾 Готово";

        save.plots[index].ready = true;

        saveGame();

      }, remaining);

    }

    else {

      plot.classList.add("ready");

      plot.innerText =
        crop.name + "\n🌾 Готово";

      save.plots[index].ready = true;

    }

  }

  plot.addEventListener("click", () => {

    let plotData = save.plots[index];

    // Сбор
    if (plotData && plotData.ready) {

      let crop = seeds[plotData.seed];

      coins += crop.reward;

      xp += crop.xp;

      updateStats();

      save.plots[index] = null;

      plot.classList.remove("ready");

      plot.innerText = "Пусто";

      saveGame();

      return;

    }

    // Посадка
    if (!plotData) {

      if (energy <= 0) {

        alert("⚡ Нет энергии");

        return;

      }

      // Проверка семян
      if (
        currentSeed === "wheat" &&
        save.wheatSeeds <= 0
      ) {

        alert("🌾 Нет семян пшеницы");

        return;

      }

      if (
        currentSeed === "corn" &&
        save.cornSeeds <= 0
      ) {

        alert("🌽 Нет семян кукурузы");

        return;

      }

      // Тратим семена
      if (currentSeed === "wheat") {
        save.wheatSeeds -= 1;
      }

      if (currentSeed === "corn") {
        save.cornSeeds -= 1;
      }

      energy -= 1;

      save.lastEnergyTime = Date.now();

      updateStats();

      let crop = seeds[currentSeed];

      let finishTime =
        Date.now() + crop.growTime;

      save.plots[index] = {

        seed: currentSeed,
        finishTime,
        ready: false

      };

      saveGame();

      plot.classList.add("growing");

      plot.innerText =
        crop.name + "\n⏳ Растет";

      setTimeout(() => {

        plot.classList.remove("growing");

        plot.classList.add("ready");

        plot.innerText =
          crop.name + "\n🌾 Готово";

        save.plots[index].ready = true;

        saveGame();

      }, crop.growTime);

    }

  });

});
