import { gameState }
from "../../core/state.js";

import { renderPlots }
from "./plotRenderer.js";

export function startCropGrowth(
  plotIndex
) {

  const plot =
    gameState.farm.plots[
      plotIndex
    ];

  if (!plot) return;

  setTimeout(() => {

    plot.stage = "sprout";
    renderPlots();

  }, 800);

  setTimeout(() => {

    plot.stage = "growing";
    renderPlots();

  }, 1600);

  setTimeout(() => {

    plot.stage = "mature";
    renderPlots();

  }, plot.growTime);

}
