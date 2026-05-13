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
   LOAD SAVE
========================================= */

const savedData =
    loadGame();

if (savedData) {

    Object.assign(
        gameState,
        savedData
    );

}

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

    if (targetScreen) {

        targetScreen.classList.add("active");

    }

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
   MODALS
========================================= */

const plantModal =
    document.getElementById("plant-modal");

const closeModalBtn =
    document.getElementById("close-modal");

if (closeModalBtn && plantModal) {

    closeModalBtn.addEventListener("click", () => {

        plantModal.classList.remove("active");

        currentSlot = null;

    });

}

if (plantModal) {

    plantModal.addEventListener("click", e => {

        if (e.target === plantModal) {

            plantModal.classList.remove("active");

            currentSlot = null;

        }

    });

}

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
   GAME STATE
========================================= */

const inventory =
    gameState.inventory;

/* =========================================
   INVENTORY UI
========================================= */

function updateInventoryUI() {

    const wheatEl =
        document.getElementById("inv-wheat");

    const carrotEl =
        document.getElementById("inv-carrot");

    const strawberryEl =
        document.getElementById("inv-strawberry");

    const coinsEl =
        document.getElementById("coins-value");

    if (wheatEl) {

        wheatEl.textContent =
            inventory.wheat;

    }

    if (carrotEl) {

        carrotEl.textContent =
            inventory.carrot;

    }

    if (strawberryEl) {

        strawberryEl.textContent =
            inventory.strawberry;

    }

    if (coinsEl) {

        coinsEl.textContent =
            gameState.coins;

    }

}

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

function createGrowingSlot(
    cropKey,
    slotIndex = null,
    savedFinishTime = null
) {

    const crop =
        crops[cropKey];

    if (!crop) return;

    const slot =
        document.createElement("div");

    slot.className =
        "farm-slot growing";

    const finishTime =
        savedFinishTime ||
        (Date.now() + crop.growTime * 1000);

    let seconds =
        Math.max(
            0,
            Math.floor(
                (finishTime - Date.now()) / 1000
            )
        );

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

    if (
        slotIndex !== null &&
        !savedFinishTime
    ) {

        gameState.farmSlots[slotIndex] = {

            cropKey,
            finishTime

        };

        saveGame(gameState);

    }
/* =========================================
   READY STATE
========================================= */

if (seconds <= 0) {

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
            >
                Собрать
            </button>

        </div>
    `;

    const harvestBtn =
        slot.querySelector(".harvest-btn");

    if (harvestBtn) {

        harvestBtn.onclick = () => {

            inventory[cropKey]++;

            gameState.coins += 25;

            gameState.farmSlots[
                slotIndex
            ] = null;

            updateInventoryUI();

            saveGame(gameState);

            const emptySlot =
                createEmptySlot();

            slot.replaceWith(
                emptySlot
            );

        };

    }

    return slot;

}
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
                        >
                            Собрать
                        </button>

                    </div>
                `;

                const harvestBtn =
                    slot.querySelector(".harvest-btn");

                if (harvestBtn) {

                    harvestBtn.onclick = () => {

                        inventory[cropKey]++;

                        gameState.coins += 25;

                        gameState.farmSlots[
                            slotIndex
                        ] = null;

                        updateInventoryUI();

                        saveGame(gameState);

                        const emptySlot =
                            createEmptySlot();

                        slot.replaceWith(
                            emptySlot
                        );

                    };

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

function attachAddButton(slot) {

    const button =
        slot.querySelector(".add-crop-btn");

    if (!button) return;

    button.onclick = () => {

        currentSlot = slot;

        if (plantModal) {

            plantModal.classList.add("active");

        }

    };

}

const farmGrid =
    document.querySelector(".farm-grid");

const allSlots =
    Array.from(
        document.querySelectorAll(".farm-slot")
    );

allSlots.forEach((slot, index) => {

    const savedSlot =
        gameState.farmSlots[index];

    /* RESTORE SLOT */

    if (savedSlot) {

        const restoredSlot =
            createGrowingSlot(

                savedSlot.cropKey,

                index,

                savedSlot.finishTime

            );

        farmGrid.replaceChild(
            restoredSlot,
            slot
        );

    } else {

        attachAddButton(slot);

    }

});

const seedCards =
    document.querySelectorAll(".seed-card");

seedCards.forEach(card => {

    card.onclick = () => {

        if (!currentSlot) return;

        const cropKey =
            card.dataset.crop;

        if (!cropKey) return;

        const slotIndex =
    Array.from(
        document.querySelectorAll(".farm-slot")
    ).indexOf(currentSlot);

const growingSlot =
    createGrowingSlot(
        cropKey,
        slotIndex
    );

currentSlot.replaceWith(
    growingSlot
);

        if (plantModal) {

            plantModal.classList.remove("active");

        }

        currentSlot = null;

        saveGame(gameState);

    };

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
