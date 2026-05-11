import { plots }
from "./plotData.js";

import { growCrop }
from "./growthSystem.js";

export function renderPlots() {

  const farmGrid =
    document.querySelector(".farm-grid");

  if (!farmGrid) return;

  farmGrid.innerHTML = "";

  plots.forEach((plot) => {

    const plotElement =
      document.createElement("div");

    plotElement.className =
      "farm-plot";

    if (plot.planted) {

      plotElement.classList.add(
        "planted"
      );

    }

    if (plot.ready) {

      plotElement.classList.add(
        "ready"
      );

    }

    let plantEmoji = "🟫";
    let plantStatus =
      "Нажми чтобы посадить";

    if (plot.stage === 1) {

      plantEmoji = "🌱";
      plantStatus =
        "Росток развивается";

    }

    if (plot.stage === 2) {

      plantEmoji = "🌿";
      plantStatus =
        "Культура растет";

    }

    if (plot.stage === 3) {

      plantEmoji = "🌾";
      plantStatus =
        "Урожай готов";

    }

    plotElement.innerHTML = `

      <div class="plot-glow"></div>

      <div class="plot-content">

        <div class="plot-plant">
          ${plantEmoji}
        </div>

        <div class="plot-title">
          Грядка #${plot.id}
        </div>

        <div class="plot-status">
          ${plantStatus}
        </div>

      </div>

    `;

    plotElement.addEventListener(
      "click",
      () => {

        if (!plot.planted) {

          plot.planted = true;

          growCrop(plot);

        }

        else if (plot.ready) {

          plot.planted = false;

          plot.ready = false;

          plot.stage = 0;

          renderPlots();

        }

      }
    );

    farmGrid.appendChild(
      plotElement
    );

  });

}
