import { plots } from "./plotData.js";
import { growCrop } from "./growthSystem.js";
import { renderPlots } from "./plotRenderer.js";

import { state } from "../../core/state.js";
import { CROPS } from "../../core/config.js";

export function initFarmSystem() {
  renderPlots();
}

export function plantCrop(plotId, cropId = "wheat") {
  const plot = plots.find((item) => item.id === plotId);

  if (!plot) return;
  if (plot.planted) return;

  const crop = CROPS[cropId];

  if (!crop) return;

  const seeds = state.inventory.seeds[cropId];

  if (seeds <= 0) {
    alert("Недостаточно семян");
    return;
  }

  state.inventory.seeds[cropId]--;

  plot.planted = true;
  plot.ready = false;
  plot.crop = cropId;
  plot.stage = 1;

  renderPlots();

  growCrop(plot, crop);
}

export function harvestCrop(plotId) {
  const plot = plots.find((item) => item.id === plotId);

  if (!plot) return;
  if (!plot.ready) return;

  const crop = CROPS[plot.crop];

  if (!crop) return;

  state.player.coins += crop.reward;
  state.player.xp += crop.xp;

  state.inventory.crops[plot.crop]++;

  checkLevelUp();

  plot.planted = false;
  plot.ready = false;
  plot.growing = false;

  plot.crop = null;
  plot.stage = 0;

  renderPlots();
}

function checkLevelUp() {
  const neededXP = state.player.level * 100;

  if (state.player.xp >= neededXP) {
    state.player.level++;

    state.player.xp = 0;

    alert(`Новый уровень: ${state.player.level}`);
  }
}
