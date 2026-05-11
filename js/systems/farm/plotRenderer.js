import { gameState }
from "../../core/state.js";

export function renderPlots() {

  const farmGrid =
    document.getElementById(
      "farm-grid"
    );

  if (!farmGrid) return;

  farmGrid.innerHTML = "";

  gameState.farm.plots.forEach(
    (plot, index) => {

      const plotEl =
        document.createElement("div");

      plotEl.className = "plot";

      if (plot) {

        const crop =
          document.createElement("div");

        crop.className =
          `crop ${plot.stage}`;

        crop.innerText =
          plot.name;

        plotEl.appendChild(crop);

      }

      plotEl.addEventListener(
        "click",
        () => {

          window.handlePlotClick(
            index
          );

        }
      );

      farmGrid.appendChild(
        plotEl
      );

    }
  );

}
