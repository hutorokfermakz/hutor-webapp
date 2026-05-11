import { initRouter }
from "./core/router.js";

import { renderApp }
from "./core/renderer.js";

import { initFarmSystem }
from "./systems/farm/farmSystem.js";

import { renderPlots }
from "./systems/farm/plotRenderer.js";

import { renderInventory }
from "./ui/inventoryRenderer.js";

import { renderShop }
from "./ui/shopRenderer.js";

function bootGame() {
  initRouter();

  initFarmSystem();

  renderPlots();

  renderInventory();

  renderShop();

  renderApp();

  console.log("HUTOROK v7 STARTED");
}

bootGame();
