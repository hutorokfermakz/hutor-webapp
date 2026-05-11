import { plots } from "./plotData.js";

import { harvestCrop }
from "./farmSystem.js";

import { openCropModal }
from "../../ui/cropModal.js";

const PLOT_STAGES = {
  0: "Пустая грядка",
  1: "Посажено",
  2: "Рост",
  3: "Созревание",
  4: "Готово"
};

function getPlotClass(plot) {
  if (plot.ready) {
    return "farm-plot ready";
  }

  if (plot.planted) {
    return "farm-plot planted";
  }

  return "farm-plot";
}

function getPlantVisual(stage) {
  switch (stage) {
    case 1:
      return `
        <div class="plot-plant stage-1"></div>
      `;

    case 2:
      return `
        <div class="plot-plant stage-2"></div>
      `;

    case 3:
      return `
        <div class="plot-plant stage-3"></div>
      `;

    case 4:
      return `
        <div class="plot-plant stage-4"></div>
      `;

    default:
      return "";
  }
}

export function renderPlots() {
  const farmGrid =
    document.querySelector(".farm-grid");

  if (!farmGrid) return;

  farmGrid.innerHTML = "";

  plots.forEach((plot) => {
    const plotElement =
      document.createElement("div");

    plotElement.className =
      getPlotClass(plot);

    plotElement.innerHTML = `
      <div class="plot-glow"></div>

      <div class="plot-content">

        <div class="plot-header">
          <div class="plot-title">
            Грядка #${plot.id}
          </div>

          <div class="plot-status">
            ${PLOT_STAGES[plot.stage]}
          </div>
        </div>

        <div class="plot-center">
          ${getPlantVisual(plot.stage)}
        </div>

        <div class="plot-footer">
          ${
            plot.ready
              ? `
                <button
                  class="glass-btn emerald plot-action"
                >
                  Собрать
                </button>
              `
              : plot.planted
              ? `
                <button
                  class="glass-btn disabled plot-action"
                  disabled
                >
                  Растёт...
                </button>
              `
              : `
                <button
                  class="glass-btn plot-action"
                >
                  Посадить
                </button>
              `
          }
        </div>

      </div>
    `;

    const actionButton =
      plotElement.querySelector(".plot-action");

    if (actionButton) {
      if (plot.ready) {
        actionButton.addEventListener(
          "click",
          () => {
            harvestCrop(plot.id);
          }
        );
      }

      else if (!plot.planted) {
        actionButton.addEventListener(
          "click",
          () => {
            openCropModal(plot.id);
          }
        );
      }
    }

    farmGrid.appendChild(plotElement);
  });
}
