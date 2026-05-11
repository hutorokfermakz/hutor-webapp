import { initRouter }
from "./core/router.js";

import { renderApp }
from "./core/renderer.js";

import { initFarmSystem }
from "./systems/farm/farmSystem.js";

function bootGame() {

  initRouter();

  initFarmSystem();

  renderApp();

  console.log(
    "HUTOROK v7 STARTED"
  );

}

bootGame();
