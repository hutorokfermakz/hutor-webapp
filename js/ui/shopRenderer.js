import { state } from "../core/state.js";
import { CROPS } from "../core/config.js";

import { renderApp }
from "../core/renderer.js";

import { renderInventory }
from "./inventoryRenderer.js";

const tabs = [
  {
    id: "seeds",
    label: "Семена"
  },

  {
    id: "sell",
    label: "Продажа"
  },

  {
    id: "premium",
    label: "Premium"
  }
];

let activeTab = "seeds";

export function renderShop() {
  const screen =
    document.getElementById("shop-screen");

  if (!screen) return;

  screen.innerHTML = `
    <div class="shop-wrapper">

      <div class="shop-header">
        <div class="shop-title">
          Магазин
        </div>

        <div class="shop-subtitle">
          Покупай семена и продавай урожай.
        </div>
      </div>

      <div class="shop-tabs">
        ${renderTabs()}
      </div>

      <div class="shop-grid">
        ${renderItems()}
      </div>

    </div>
  `;

  bindEvents();
}

function renderTabs() {
  return tabs.map((tab) => `
    <button
      class="
        shop-tab
        ${activeTab === tab.id ? "active" : ""}
      "
      data-tab="${tab.id}"
    >
      ${tab.label}
    </button>
  `).join("");
}

function renderItems() {
  if (activeTab === "premium") {
    return renderPremium();
  }

  return Object.values(CROPS)
    .map((crop) => {
      return `
        <div class="shop-item">

          <div class="shop-item-top">

            <div class="shop-item-name">
              ${crop.name}
            </div>

            <div class="shop-item-price">
              ${
                activeTab === "seeds"
                  ? crop.seedCost
                  : crop.reward
              }
            </div>

          </div>

          <div class="shop-item-info">

            <div class="shop-item-meta">
              ${
                activeTab === "seeds"
                  ? "Семена для посадки"
                  : "Продажа урожая"
              }
            </div>

          </div>

          <button
            class="
              glass-btn
              emerald
              shop-action
            "
            data-action="${activeTab}"
            data-crop="${crop.id}"
          >
            ${
              activeTab === "seeds"
                ? "Купить"
                : "Продать"
            }
          </button>

        </div>
      `;
    })
    .join("");
}

function renderPremium() {
  return `
    <div class="shop-item">

      <div class="shop-item-top">

        <div class="shop-item-name">
          Crystals Pack
        </div>

        <div class="shop-item-price">
          Soon
        </div>

      </div>

      <div class="shop-item-info">

        <div class="shop-item-meta">
          Premium экономика появится позже.
        </div>

      </div>

      <button
        class="
          glass-btn
          shop-action
        "
        disabled
      >
        Скоро
      </button>

    </div>
  `;
}

function bindEvents() {
  const tabButtons =
    document.querySelectorAll(".shop-tab");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTab =
        button.dataset.tab;

      renderShop();
    });
  });

  const actionButtons =
    document.querySelectorAll(".shop-action");

  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cropId =
        button.dataset.crop;

      const action =
        button.dataset.action;

      if (!cropId) return;

      if (action === "seeds") {
        buySeeds(cropId);
      }

      if (action === "sell") {
        sellCrop(cropId);
      }
    });
  });
}

function buySeeds(cropId) {
  const crop = CROPS[cropId];

  if (!crop) return;

  if (
    state.player.coins <
    crop.seedCost
  ) {
    alert("Недостаточно монет");
    return;
  }

  state.player.coins -= crop.seedCost;

  state.inventory.seeds[cropId]++;

  renderAll();
}

function sellCrop(cropId) {
  const crop = CROPS[cropId];

  if (!crop) return;

  const amount =
    state.inventory.crops[cropId];

  if (amount <= 0) {
    alert("Нет урожая");
    return;
  }

  state.inventory.crops[cropId]--;

  state.player.coins += crop.reward;

  renderAll();
}

function renderAll() {
  renderShop();

  renderInventory();

  renderApp();
}
