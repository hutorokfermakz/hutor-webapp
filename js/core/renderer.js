import { state } from "./state.js";

export function renderApp() {
  renderTopbar();
}

export function renderTopbar() {
  const coinsElement = document.querySelector(".coins-value");
  const crystalsElement = document.querySelector(".crystals-value");
  const levelElement = document.querySelector(".level-value");

  if (coinsElement) {
    coinsElement.textContent = state.player.coins;
  }

  if (crystalsElement) {
    crystalsElement.textContent = state.player.crystals;
  }

  if (levelElement) {
    levelElement.textContent = state.player.level;
  }
}
