import { renderPlots }
from "./plotRenderer.js";

export function growCrop(plot) {

  plot.stage = 1;

  renderPlots();

  setTimeout(() => {

    plot.stage = 2;

    renderPlots();

  }, 2500);

  setTimeout(() => {

    plot.stage = 3;

    plot.ready = true;

    renderPlots();

  }, 5000);

}
