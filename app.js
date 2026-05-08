let save = JSON.parse(localStorage.getItem("hutor_save"));

if (!save) {

  save = {
    coins: 100,
    xp: 0,
    energy: 20,
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

function saveGame() {

  localStorage.setItem("hutor_save", JSON.stringify({
    coins,
    xp,
    energy,
    plots: save.plots
  }));

}

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

plots.forEach((plot, index) => {

  let data = save.plots[index];

  // Восстановление
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

      energy -= 1;

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

      saveGame();

    }

  });

});
