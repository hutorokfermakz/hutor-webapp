export const plots = [
  createPlot(1),
  createPlot(2),
  createPlot(3),
  createPlot(4),
  createPlot(5),
  createPlot(6)
];

function createPlot(id) {
  return {
    id,

    planted: false,
    ready: false,
    growing: false,

    crop: null,

    stage: 0
  };
}
