console.log("HUTOROK v7 STARTED");

/* ---------------- */
/* DATA */
/* ---------------- */

const SEEDS = {

  wheat: {
    name: "Пшеница",
    price: 25,
    growTime: 2500,
    reward: 60
  },

  corn: {
    name: "Кукуруза",
    price: 40,
    growTime: 3000,
    reward: 90
  },

  carrot: {
    name: "Морковь",
    price: 60,
    growTime: 3500,
    reward: 140
  }

};

/* ---------------- */
/* GAME STATE */
/* ---------------- */

const gameState = {

  coins: 500,

  crystals: 0,

  selectedSeed: null,

  weather: "rain",

  time: "night",

  inventory: [],

  plots: [
    null,
    null,
    null,
    null,

    null,
    null,
    null,
    null
  ]

};

/* ---------------- */
/* UI */
/* ---------------- */

const farmGrid =
  document.getElementById(
    "farm-grid"
  );

const inventoryGrid =
  document.getElementById(
    "inventory-grid"
  );

const inventoryCount =
  document.getElementById(
    "inventory-count"
  );

const coinsElement =
  document.getElementById(
    "coins"
  );

/* ---------------- */
/* SCREEN ROUTER */
/* ---------------- */

const navButtons =
  document.querySelectorAll(
    ".nav-btn"
  );

const screens =
  document.querySelectorAll(
    ".screen"
  );

navButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      const target =
        button.dataset.screen;

      /* NAV ACTIVE */

      navButtons.forEach((btn) => {
        btn.classList.remove(
          "active"
        );
      });

      button.classList.add(
        "active"
      );

      /* SCREEN ACTIVE */

      screens.forEach((screen) => {
        screen.classList.remove(
          "active"
        );
      });

      const activeScreen =
        document.getElementById(
          `${target}-screen`
        );

      if (activeScreen) {

        activeScreen.classList.add(
          "active"
        );

      }

    }
  );

});

/* ---------------- */
/* UPDATE UI */
/* ---------------- */

function updateUI() {

  coinsElement.innerText =
    gameState.coins;

  inventoryCount.innerText =
    `${gameState.inventory.length} предметов`;

}

/* ---------------- */
/* INVENTORY */
/* ---------------- */

function renderInventory() {

  inventoryGrid.innerHTML = "";

  if (
    gameState.inventory.length === 0
  ) {

    inventoryGrid.innerHTML = `
      <div class="inventory-item">
        <span>Пусто</span>
      </div>
    `;

    return;

  }

  gameState.inventory.forEach(
    (item) => {

      const itemElement =
        document.createElement("div");

      itemElement.className =
        "inventory-item";

      itemElement.innerHTML = `
        <span>${item.name}</span>
        <small>x${item.amount}</small>
      `;

      itemElement.addEventListener(
        "click",
        () => {

          gameState.selectedSeed =
            item.type;

          document
            .querySelectorAll(
              ".inventory-item"
            )
            .forEach((el) => {

              el.style.border =
                "1px solid rgba(255,255,255,0.05)";

            });

          itemElement.style.border =
            "1px solid rgba(47,255,149,0.5)";

        }
      );

      inventoryGrid.appendChild(
        itemElement
      );

    }
  );

}

/* ---------------- */
/* SHOP */
/* ---------------- */

const shopButtons =
  document.querySelectorAll(
    ".shop-item"
  );

shopButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      const seedType =
        button.dataset.seed;

      buySeed(seedType);

    }
  );

});

function buySeed(seedType) {

  const seed =
    SEEDS[seedType];

  if (
    gameState.coins <
    seed.price
  ) {
    return;
  }

  gameState.coins -=
    seed.price;

  const existing =
    gameState.inventory.find(
      (item) =>
        item.type === seedType
    );

  if (existing) {

    existing.amount++;

  } else {

    gameState.inventory.push({

      type: seedType,

      name: seed.name,

      amount: 1

    });

  }

  updateUI();

  renderInventory();

}

/* ---------------- */
/* FARM */
/* ---------------- */

function renderFarm() {

  farmGrid.innerHTML = "";

  gameState.plots.forEach(
    (plotData, index) => {

      const plot =
        document.createElement(
          "div"
        );

      plot.className = "plot";

      if (!plotData) {

        plot.classList.add(
          "empty"
        );

        plot.addEventListener(
          "click",
          () => {
            plantCrop(index);
          }
        );

      } else {

        const crop =
          document.createElement(
            "div"
          );

        crop.className =
          `crop ${plotData.stage}`;

        plot.appendChild(crop);

      }

      farmGrid.appendChild(plot);

    }
  );

}

/* ---------------- */
/* PLANT */
/* ---------------- */

function plantCrop(plotIndex) {

  if (
    !gameState.selectedSeed
  ) {
    return;
  }

  const inventoryItem =
    gameState.inventory.find(
      (item) =>
        item.type ===
        gameState.selectedSeed
    );

  if (
    !inventoryItem ||
    inventoryItem.amount <= 0
  ) {
    return;
  }

  inventoryItem.amount--;

  if (
    inventoryItem.amount <= 0
  ) {

    gameState.inventory =
      gameState.inventory.filter(
        (item) =>
          item.amount > 0
      );

  }

  gameState.plots[plotIndex] = {

    type:
      gameState.selectedSeed,

    stage: "seed"

  };

  renderFarm();

  renderInventory();

  updateUI();

  growCrop(plotIndex);

}

/* ---------------- */
/* GROW */
/* ---------------- */

function growCrop(plotIndex) {

  const stages = [
    "seed",
    "sprout",
    "growing",
    "mature"
  ];

  let currentStage = 0;

  const cropData =
    gameState.plots[plotIndex];

  const seedData =
    SEEDS[cropData.type];

  const interval =
    setInterval(() => {

      currentStage++;

      if (
        currentStage >=
        stages.length
      ) {

        clearInterval(interval);

        makeHarvestable(
          plotIndex
        );

        return;

      }

      cropData.stage =
        stages[currentStage];

      renderFarm();

    }, seedData.growTime);

}

/* ---------------- */
/* HARVEST */
/* ---------------- */

function makeHarvestable(
  plotIndex
) {

  const plots =
    document.querySelectorAll(
      ".plot"
    );

  const plot =
    plots[plotIndex];

  plot.addEventListener(
    "click",
    () => {

      harvestCrop(plotIndex);

    },
    { once: true }
  );

}

function harvestCrop(
  plotIndex
) {

  const crop =
    gameState.plots[plotIndex];

  const seedData =
    SEEDS[crop.type];

  gameState.coins +=
    seedData.reward;

  gameState.plots[plotIndex] =
    null;

  renderFarm();

  updateUI();

}

/* ---------------- */
/* WEATHER */
/* ---------------- */

const farmScene =
  document.querySelector(
    ".farm-scene"
  );

function applyWeather() {

  farmScene.classList.remove(
    "rain",
    "night"
  );

  if (
    gameState.weather === "rain"
  ) {

    farmScene.classList.add(
      "rain"
    );

  }

  if (
    gameState.time === "night"
  ) {

    farmScene.classList.add(
      "night"
    );

  }

}

applyWeather();

/* ---------------- */
/* START */
/* ---------------- */

updateUI();

renderInventory();

renderFarm();
