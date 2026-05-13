/* =========================================
   IMPORTS
========================================= */

import { gameState }
from "./core/state.js";

import {
    saveGame,
    loadGame
}
from "./core/storage.js";
/* =========================================
   TELEGRAM
========================================= */

const tg = window.Telegram.WebApp;

tg.ready();

tg.expand();

/* =========================================
   SCREENS
========================================= */

const screens =
    document.querySelectorAll(".screen");

const navButtons =
    document.querySelectorAll(".nav-btn");

function openScreen(screenId) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    const targetScreen =
        document.getElementById(screenId);

    if (!targetScreen) return;

    targetScreen.classList.add("active");

    navButtons.forEach(button => {

        button.classList.remove("active");

        if (
            button.getAttribute("data-screen")
            === screenId
        ) {

            button.classList.add("active");

        }

    });

}

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const screenId =
            button.getAttribute("data-screen");

        if (!screenId) return;

        openScreen(screenId);

    });

});

/* =========================================
   CROPS
========================================= */

const crops = {

    wheat: {

        name: "Пшеница",
        emoji: "🌾",
        growTime: 120

    },

    carrot: {

        name: "Морковь",
        emoji: "🥕",
        growTime: 300

    },

    strawberry: {

        name: "Клубника",
        emoji: "🍓",
        growTime: 480

    }

};

/* =========================================
   INVENTORY
========================================= */
const inventory =
    gameState.inventory;

let coins =
    gameState.coins;

/* =========================================
   TIME FORMAT
========================================= */

function formatTime(totalSeconds) {

    const minutes =
        Math.floor(totalSeconds / 60);

    const seconds =
        totalSeconds % 60;

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

}

/* =========================================
   EMPTY SLOT
========================================= */

function createEmptySlot() {

    const slot =
        document.createElement("div");

    slot.className =
        "farm-slot empty";

    slot.innerHTML = `
        <button
            type="button"
            class="add-crop-btn"
        >

            <span>+</span>

            <p>
                Посадить культуру
            </p>

        </button>
    `;

    attachAddButton(slot);

    return slot;

}

/* =========================================
   CREATE GROWING SLOT
========================================= */

function createGrowingSlot(cropKey) {

    const crop =
        crops[cropKey];

    if (!crop) return null;

    const slot =
        document.createElement("div");

    slot.className =
        "farm-slot growing";

    let seconds =
        crop.growTime;

    slot.innerHTML = `
        <div class="growing-content">

            <div class="growing-emoji">
                ${crop.emoji}
            </div>

            <h3>
                ${crop.name}
            </h3>

            <div class="grow-timer">
                ${formatTime(seconds)}
            </div>

        </div>
    `;

    const timer =
        slot.querySelector(".grow-timer");

    const interval =
        setInterval(() => {

            seconds--;

            if (seconds <= 0) {

                clearInterval(interval);

                slot.innerHTML = `
                    <div class="harvest-content">

                        <div class="growing-emoji">
                            ${crop.emoji}
                        </div>

                        <h3>
                            ${crop.name}
                        </h3>

                        <button
                            class="harvest-btn"
                            data-crop="${cropKey}"
                        >
                            Собрать
                        </button>

                    </div>
                `;

                const harvestBtn =
                    slot.querySelector(".harvest-btn");

                if (harvestBtn) {

                    harvestBtn.addEventListener("click", () => {

                        inventory[cropKey]++;

                        coins += 25;

                        updateInventoryUI();

                        const emptySlot =
                            createEmptySlot();

                        slot.replaceWith(emptySlot);

                    });

                }

            } else {

                if (timer) {

                    timer.textContent =
                        formatTime(seconds);

                }

            }

        }, 1000);

    return slot;

}

/* =========================================
   PLANTING SYSTEM
========================================= */

let currentSlot = null;

const plantModal =
    document.getElementById("plant-modal");

const closeModalBtn =
    document.getElementById("close-modal");

/* OPEN SLOT */

function attachAddButton(slot) {

    const button =
        slot.querySelector(".add-crop-btn");

    if (!button) return;

    button.addEventListener("click", () => {

        currentSlot = slot;

        if (plantModal) {

            plantModal.classList.add("active");

        }

    });

}

/* INIT EMPTY SLOTS */

const allSlots =
    document.querySelectorAll(".farm-slot.empty");

allSlots.forEach(slot => {

    attachAddButton(slot);

});

/* CLOSE MODAL */

if (closeModalBtn && plantModal) {

    closeModalBtn.addEventListener("click", () => {

        plantModal.classList.remove("active");

        currentSlot = null;

    });

    plantModal.addEventListener("click", e => {

        if (e.target === plantModal) {

            plantModal.classList.remove("active");

            currentSlot = null;

        }

    });

}

/* SEED CARDS */

const seedCards =
    document.querySelectorAll(".seed-card");

seedCards.forEach(card => {

    card.addEventListener("click", () => {

        if (!currentSlot) return;

        const cropKey =
            card.dataset.crop;

        if (!cropKey) return;

        const growingSlot =
            createGrowingSlot(cropKey);

        if (!growingSlot) return;

        currentSlot.replaceWith(growingSlot);

        if (plantModal) {

            plantModal.classList.remove("active");

        }

        currentSlot = null;

    });

});

/* =========================================
   INVENTORY ANIMATION
========================================= */

const inventoryCards =
    document.querySelectorAll(".inventory-card");

inventoryCards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(20px)";

    setTimeout(() => {

        card.style.transition =
            "0.45s ease";

        card.style.opacity = "1";

        card.style.transform =
            "translateY(0px)";

    }, index * 60);

});

/* =========================================
   START
========================================= */

updateInventoryUI();

openScreen("farm-screen");
