import { gameState }
from "../../core/state.js";

import { CONFIG }
from "../../core/config.js";

import { renderPlots }
from "./plotRenderer.js";

export function harvestCrop(
  plotIndex
) {

  const plot =
    gameState.farm.plots[
      plotIndex
    ];

  if (!plot) return;

  if (plot.stage !== "mature")
    return;

  const cropData =
    CONFIG.crops[
      plot.cropId
    ];

  gameState.player.coins +=
    cropData.reward;

  gameState.farm.plots[
    plotIndex
  ] = null;

  renderPlots();

}
