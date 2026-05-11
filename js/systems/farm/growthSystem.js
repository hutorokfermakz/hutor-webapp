import { renderPlots } from "./plotRenderer.js";

export function growCrop(plot, crop) {
  if (!plot || !crop) return;

  plot.growing = true;

  const total = crop.growTime;

  const stageOne = total * 0.3;
  const stageTwo = total * 0.65;

  plot.stage = 1;

  renderPlots();

  setTimeout(() => {
    plot.stage = 2;
    renderPlots();
  }, stageOne);

  setTimeout(() => {
    plot.stage = 3;
    renderPlots();
  }, stageTwo);

  setTimeout(() => {
    plot.stage = 4;

    plot.ready = true;
    plot.growing = false;

    renderPlots();
  }, total);
}
