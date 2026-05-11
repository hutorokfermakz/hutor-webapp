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

    if (plot.planted) {

      plotElement.classList.add(
        "planted"
      );

    }

    plotElement.innerHTML = `

      <div class="plot-glow"></div>

      <div class="plot-content">

        <div class="plot-plant">

          ${
            plot.planted
              ? "🌾"
              : "🟫"
          }

        </div>

        <div class="plot-title">
          Грядка #${plot.id}
        </div>

        <div class="plot-status">

          ${
            plot.planted
              ? "Пшеница растет"
              : "Нажми чтобы посадить"
          }

        </div>

      </div>

    `;

    plotElement.addEventListener(
      "click",
      () => {

        if (!plot.planted) {

          plot.planted = true;

          renderPlots();

        }

      }
    );

    farmGrid.appendChild(
      plotElement
    );

  });

}
