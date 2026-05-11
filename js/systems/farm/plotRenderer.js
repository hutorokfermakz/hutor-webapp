import { plots }
from "./plotData.js";

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

    plotElement.innerHTML = `

      <div class="plot-glow"></div>

      <div class="plot-content">

        <div class="plot-title">
          Грядка #${plot.id}
        </div>

        <div class="plot-status">
          ${
            plot.planted
              ? "Растет культура"
              : "Пустая грядка"
          }
        </div>

      </div>

    `;

    farmGrid.appendChild(
      plotElement
    );

  });

}
