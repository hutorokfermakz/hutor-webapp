window.createFarm =
function() {

  gameState.farm = [];

  for(
    let i = 0;
    i < CONFIG.MAX_PLOTS;
    i++
  ) {

    gameState.farm.push({

      id: i,

      crop: null,

      plantedAt: 0,

      readyAt: 0,

      status: "empty"

    });

  }

};

window.renderFarm =
function() {

  let html =
  `<div class="farm-grid">`;

  gameState.farm.forEach(plot => {

    let icon = "🟫";

    if(
      plot.status === "growing"
    ) {
      icon = "🌱";
    }

    if(
      plot.status === "ready"
    ) {
      icon = "🌾";
    }

    html += `

      <div
        class="plot"
        onclick="plantCrop(${plot.id})"
      >

        ${icon}

      </div>

    `;

  });

  html += `</div>`;

  document.getElementById(
    "screen"
  ).innerHTML = html;

};

window.plantCrop =
function(id) {

  const plot =
  gameState.farm[id];

  if(
    plot.status !== "empty"
  ) return;

  playSound("plant");

  plot.crop = "wheat";

  plot.status = "growing";

  plot.plantedAt = Date.now();

  plot.readyAt =
    Date.now() +
    CROPS.wheat.growTime * 1000;

  renderFarm();

  setTimeout(() => {

    plot.status = "ready";

    renderFarm();

  }, CROPS.wheat.growTime * 1000);

};
