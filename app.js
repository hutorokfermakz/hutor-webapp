let coins = 100;
let xp = 0;
let energy = 20;

const coinsText = document.getElementById("coins");
const xpText = document.getElementById("xp");
const energyText = document.getElementById("energy");

const plots = document.querySelectorAll(".plot");

function updateStats() {
  coinsText.innerText = coins;
  xpText.innerText = xp;
  energyText.innerText = energy;
}

updateStats();

plots.forEach(plot => {

  let state = "empty";

  plot.addEventListener("click", () => {

    // Пустая грядка
    if (state === "empty") {

      if (energy <= 0) {
        alert("⚡ Недостаточно энергии");
        return;
      }

      energy -= 1;

      updateStats();

      state = "growing";

      plot.classList.add("growing");

      plot.innerText = "🌱 Растет...";

      // Таймер роста
      setTimeout(() => {

        state = "ready";

        plot.classList.remove("growing");

        plot.classList.add("ready");

        plot.innerText = "🌾 Собрать";

      }, 10000);

    }

    // Готово к сбору
    else if (state === "ready") {

      coins += 25;

      xp += 10;

      updateStats();

      state = "empty";

      plot.classList.remove("ready");

      plot.innerText = "Пусто";

    }

  });

});
