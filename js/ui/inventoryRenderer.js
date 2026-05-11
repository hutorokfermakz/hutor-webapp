import { state } from "../core/state.js";

const tabs = [
  {
    id: "seeds",
    label: "Семена"
  },

  {
    id: "crops",
    label: "Урожай"
  }
];

let activeTab = "seeds";

export function renderInventory() {
  const screen =
    document.querySelector("#inventory-screen");

  if (!screen) return;

  screen.innerHTML = `
    <div class="inventory-wrapper">

      <div class="inventory-header">
        <div class="inventory-title">
          Инвентарь
        </div>

        <div class="inventory-subtitle">
          Храни свои ресурсы, урожай и семена.
        </div>
      </div>

      <div class="inventory-tabs">
        ${renderTabs()}
      </div>

      <div class="inventory-grid">
        ${renderItems()}
      </div>

    </div>
  `;

  bindTabEvents();
}

function renderTabs() {
  return tabs.map((tab) => `
    <button
      class="
        inventory-tab
        ${activeTab === tab.id ? "active" : ""}
      "
      data-tab="${tab.id}"
    >
      ${tab.label}
    </button>
  `).join("");
}

function renderItems() {
  const items = state.inventory[activeTab];

  return Object.entries(items)
    .map(([id, count]) => {
      return `
        <div class="inventory-item common">

          <div class="inventory-item-top">
            <div class="inventory-item-name">
              ${formatName(id)}
            </div>

            <div class="inventory-item-count">
              ×${count}
            </div>
          </div>

          <div class="inventory-item-info">
            <div class="inventory-item-meta">
              ${
                activeTab === "seeds"
                  ? "Семена для посадки"
                  : "Собранный урожай"
              }
            </div>
          </div>

        </div>
      `;
    })
    .join("");
}

function bindTabEvents() {
  const buttons =
    document.querySelectorAll(".inventory-tab");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTab =
        button.dataset.tab;

      renderInventory();
    });
  });
}

function formatName(id) {
  switch (id) {
    case "wheat":
      return "Пшеница";

    case "corn":
      return "Кукуруза";

    case "carrot":
      return "Морковь";

    default:
      return id;
  }
}
