console.log("HUTOROK v7 STARTED");

/* ---------------- */
/* GAME STATE */
/* ---------------- */

const gameState = {

  weather: "rain",

  time: "night",

  plots: [
    { stage: "seed" },
    { stage: "sprout" },
    { stage: "growing" },
    { stage: "mature" },

    null,
    null,
    null,
    null
  ]

};

/* ---------------- */
/* NAVIGATION */
/* ---------------- */

const navButtons =
  document.querySelectorAll(".nav-btn");

navButtons.forEach((button) => {

  button.addEventListener("click", () => {

    navButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

  });

});

/* ---------------- */
/* FARM */
/* ---------------- */

const farmGrid =
  document.getElementById("farm-grid");

function renderFarm() {

  farmGrid.innerHTML = "";

  gameState.plots.forEach((plotData) => {

    const plot =
      document.createElement("div");

    plot.className = "plot";

    if (!plotData) {

      plot.classList.add("empty");

      plot.addEventListener("click", () => {
        plantCrop(plot);
      });

    } else {

      const crop =
        document.createElement("div");

      crop.className =
        `crop ${plotData.stage}`;

      plot.appendChild(crop);

    }

    farmGrid.appendChild(plot);

  });

}

/* ---------------- */
/* PLANTING */
/* ---------------- */

function plantCrop(plotElement) {

  const crop =
    document.createElement("div");

  crop.className = "crop seed";

  plotElement.classList.remove("empty");

  plotElement.appendChild(crop);

  growCrop(crop);

}

/* ---------------- */
/* GROWTH */
/* ---------------- */

function growCrop(crop) {

  const stages = [
    "seed",
    "sprout",
    "growing",
    "mature"
  ];

  let currentStage = 0;

  const interval = setInterval(() => {

    currentStage++;

    if (currentStage >= stages.length) {

      clearInterval(interval);

      return;

    }

    crop.className =
      `crop ${stages[currentStage]}`;

  }, 2500);

}

/* ---------------- */
/* WEATHER */
/* ---------------- */

const farmScene =
  document.querySelector(".farm-scene");

function applyWeather() {

  farmScene.classList.remove(
    "rain",
    "night"
  );

  if (gameState.weather === "rain") {
    farmScene.classList.add("rain");
  }

  if (gameState.time === "night") {
    farmScene.classList.add("night");
  }

}

applyWeather();

/* ---------------- */
/* START */
/* ---------------- */

renderFarm();
