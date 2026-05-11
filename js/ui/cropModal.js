import { CROPS } from "../core/config.js";
import { state } from "../core/state.js";

import { plantCrop } from "../systems/farm/farmSystem.js";

let activePlotId = null;

export function openCropModal(plotId) {
  activePlotId = plotId;

  let modal = document.querySelector(".modal-overlay");

  if (!modal) {
    modal = createModal();
    document.body.appendChild(modal);
  }

  renderModalContent(modal);

  requestAnimationFrame(() => {
    modal.classList.add("active");
  });
}

export function closeCropModal() {
  const modal = document.querySelector(".modal-overlay");

  if (!modal) return;

  modal.classList.remove("active");
}

function createModal() {
  const overlay = document.createElement("div");

  overlay.className = "modal-overlay";

  overlay.innerHTML = `
    <div class="crop-modal">
      <div class="modal-header">
        <div class="modal-title">
          Выбор культуры
        </div>

        <button class="modal-close">
          ✕
        </button>
      </div>

      <div class="modal-content"></div>
    </div>
  `;

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeCropModal();
    }
  });

  const closeButton = overlay.querySelector(".modal-close");

  closeButton.addEventListener("click", closeCropModal);

  return overlay;
}

function renderModalContent(modal) {
  const content = modal.querySelector(".modal-content");

  content.innerHTML = "";

  Object.values(CROPS).forEach((crop) => {
    const seeds = state.inventory.seeds[crop.id];

    const card = document.createElement("div");

    card.className = `
      crop-card
      ${seeds > 0 ? "available" : "locked"}
    `;

    card.innerHTML = `
      <div class="crop-top">
        <div class="crop-name">
          ${crop.name}
        </div>

        <div class="crop-seeds">
          Семян: ${seeds}
        </div>
      </div>

      <div class="crop-stats">
        <div class="crop-stat">
          +${crop.reward} монет
        </div>

        <div class="crop-stat">
          +${crop.xp} XP
        </div>

        <div class="crop-stat">
          ${crop.growTime / 1000} сек
        </div>
      </div>

      <button
        class="glass-btn emerald crop-action"
        ${seeds <= 0 ? "disabled" : ""}
      >
        Посадить
      </button>
    `;

    const button = card.querySelector(".crop-action");

    if (seeds > 0) {
      button.addEventListener("click", () => {
        plantCrop(activePlotId, crop.id);

        closeCropModal();
      });
    }

    content.appendChild(card);
  });
}
