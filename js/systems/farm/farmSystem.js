import { gameState }
from "../../core/state.js";

import { CONFIG }
from "../../core/config.js";

import { renderPlots }
from "./plotRenderer.js";

import { startCropGrowth }
from "./cropGrowth.js";

import { harvestCrop }
from "./harvestSystem.js";

export function initFarmSystem() {

  renderPlots();

  window.handlePlotClick =
    (plotIndex) => {

      const plot =
        gameState.farm.plots[
          plotIndex
        ];

      if (
        plot &&
        plot.stage === "mature"
      ) {

        harvestCrop(plotIndex);

        return;
      }

      if (
        gameState.inventory
          .selectedSeed === null
      ) return;

      const cropData =
        CONFIG.crops[
          gameState.inventory
            .selectedSeed
        ];

      gameState.farm.plots[
        plotIndex
      ] = {

        cropId: cropData.id,

        name: cropData.name,

        stage: "seed",

        growTime:
          cropData.growTime
      };

      renderPlots();

      startCropGrowth(
        plotIndex
      );

    };

}
