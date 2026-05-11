import { initRouter }
from "./core/router.js";

import { renderApp }
from "./core/renderer.js";

function bootGame() {

  initRouter();

  renderApp();

  console.log(
    "HUTOROK v7 STARTED"
  );

}

bootGame();
