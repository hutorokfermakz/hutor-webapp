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

const savedData = loadGame();

if (savedData) {

    Object.assign(gameState, savedData);

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
            button.dataset.screen ===
            screenId
        ) {

            button.classList.add("active");

        }

    });

}

navButtons.forEach(button => {

    button.onclick = () => {

        openScreen(
            button.dataset.screen
        );

    };

});

/* =========================================
   MODAL
========================================= */

const plantModal =
    document.getElementById(
        "plant-modal"
    );

const closeModalBtn =
    document.getElementById(
        "close-modal"
    );

let currentSlotIndex = null;

if (closeModalBtn) {

    closeModalBtn.onclick = () => {

        if (plantModal) {

            plantModal.classList.remove(
                "active"
            );

        }

        currentSlotIndex = null;

    };

}

if (plantModal) {

    plantModal.addEventListener(
        "click",
        e => {

            if (
                e.target === plantModal
            ) {

                plantModal.classList.remove(
                    "active"
                );

                currentSlotIndex = null;

            }

        }
    );

}

/* =========================================
   CROPS
========================================= */

const crops = {

    wheat: {

        name: "Пшеница",
        emoji: "🌾",
        growTime: 120,
        sellPrice: 25

    },

    carrot: {

        name: "Морковь",
        emoji: "🥕",
        growTime: 300,
        sellPrice: 40

    },

    strawberry: {

        name: "Клубника",
        emoji: "🍓",
        growTime: 480,
        sellPrice: 70

    }

};

/* =========================================
   SHOP PRICES
========================================= */

const shopPrices = {

    wheat: 25,

    carrot: 45,

    strawberry: 80

};

/* =========================================
   INVENTORY UI
========================================= */

function updateInventoryUI() {

    const wheatEl =
        document.getElementById(
            "inv-wheat"
        );

    const carrotEl =
        document.getElementById(
            "inv-carrot"
        );

    const strawberryEl =
        document.getElementById(
            "inv-strawberry"
        );

    const coinsEl =
        document.getElementById(
            "coins-value"
        );

    const wheatSeedEl =
        document.getElementById(
            "seed-wheat"
        );

    const carrotSeedEl =
        document.getElementById(
            "seed-carrot"
        );

    const strawberrySeedEl =
        document.getElementById(
            "seed-strawberry"
        );

    if (wheatEl) {

        wheatEl.textContent =
            gameState.inventory.wheat;

    }

    if (carrotEl) {

        carrotEl.textContent =
            gameState.inventory.carrot;

    }

    if (strawberryEl) {

        strawberryEl.textContent =
            gameState.inventory
            .strawberry;

    }

    if (coinsEl) {

        coinsEl.textContent =
            gameState.coins;

    }

    if (wheatSeedEl) {

        wheatSeedEl.textContent =
            gameState.seeds.wheat;

    }

    if (carrotSeedEl) {

        carrotSeedEl.textContent =
            gameState.seeds.carrot;

    }

    if (strawberrySeedEl) {

        strawberrySeedEl.textContent =
            gameState.seeds.strawberry;

    }

}

/* =========================================
   SHOP UI
========================================= */

function updateShopCoins() {

    const shopCoins =
        document.getElementById(
            "shop-coins-value"
        );

    if (shopCoins) {

        shopCoins.textContent =
            gameState.coins;

    }

}

/* =========================================
   TIME FORMAT
========================================= */

function formatTime(seconds) {

    const mins =
        Math.floor(seconds / 60);

    const secs =
        seconds % 60;

    return `${mins}:${secs
        .toString()
        .padStart(2, "0")}`;

}

/* =========================================
   EMPTY SLOT
========================================= */

function createEmptySlot(index) {

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

    const button =
        slot.querySelector(
            ".add-crop-btn"
        );

    button.onclick = () => {

        currentSlotIndex = index;

        if (plantModal) {

            plantModal.classList.add(
                "active"
            );

        }

    };

    return slot;

}

/* =========================================
   GROWING SLOT
========================================= */

function createGrowingSlot(
    cropKey,
    index,
    remainingTime = null
) {

    const crop =
        crops[cropKey];

    const slot =
        document.createElement("div");

    slot.className =
        "farm-slot growing";

    let seconds =
        remainingTime ??
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
        slot.querySelector(
            ".grow-timer"
        );

    const interval =
        setInterval(() => {

            seconds--;

            if (
                gameState.farmSlots[index]
            ) {

                gameState.farmSlots[index]
                    .remainingTime =
                    seconds;

            }

            saveGame(gameState);

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
                    slot.querySelector(
                        ".harvest-btn"
                    );

                harvestBtn.onclick =
                    () => {

                    gameState.inventory[
                        cropKey
                    ]++;

                    gameState.coins +=
                        crop.sellPrice;

                    gameState.farmSlots[
                        index
                    ] = null;

                    updateInventoryUI();

                    updateShopCoins();

                    renderFarm();

                    saveGame(gameState);

                };

            } else {

                timer.textContent =
                    formatTime(seconds);

            }

        }, 1000);

    return slot;

}

/* =========================================
   RENDER FARM
========================================= */

function renderFarm() {

    const farmGrid =
        document.querySelector(
            ".farm-grid"
        );

    if (!farmGrid) return;

    farmGrid.innerHTML = "";

    gameState.farmSlots.forEach(
        (slotData, index) => {

            if (!slotData) {

                farmGrid.appendChild(
                    createEmptySlot(index)
                );

            } else {

                farmGrid.appendChild(
                    createGrowingSlot(
                        slotData.crop,
                        index,
                        slotData.remainingTime
                    )
                );

            }

        }
    );

}

/* =========================================
   SEED CARDS
========================================= */

const seedCards =
    document.querySelectorAll(
        ".seed-card"
    );

seedCards.forEach(card => {

    card.onclick = () => {

        if (
            currentSlotIndex === null
        ) return;

        const cropKey =
            card.dataset.crop;

        if (!cropKey) return;

        if (
            gameState.seeds[cropKey]
            <= 0
        ) {

            return;

        }

        gameState.seeds[cropKey]--;

        gameState.farmSlots[
            currentSlotIndex
        ] = {

            crop: cropKey,

            remainingTime:
                crops[cropKey]
                .growTime

        };

        if (plantModal) {

            plantModal.classList.remove(
                "active"
            );

        }

        renderFarm();

        updateInventoryUI();

        saveGame(gameState);

        currentSlotIndex = null;

    };

});

/* =========================================
   SHOP SYSTEM
========================================= */

const buyButtons =
    document.querySelectorAll(
        ".buy-btn"
    );

buyButtons.forEach(button => {

    button.onclick = () => {

        const cropKey =
            button.dataset.buy;

        const price =
            shopPrices[cropKey];

        if (
            gameState.coins < price
        ) {

            return;

        }

        gameState.coins -= price;

        gameState.seeds[cropKey]++;

        updateInventoryUI();

        updateShopCoins();

        saveGame(gameState);

    };

});

/* =========================================
   SELL SYSTEM
========================================= */

const sellButtons =
    document.querySelectorAll(
        ".sell-btn"
    );

sellButtons.forEach(button => {

    button.onclick = () => {

        const cropKey =
            button.dataset.sell;

        if (
            gameState.inventory[
                cropKey
            ] <= 0
        ) return;

        gameState.inventory[
            cropKey
        ]--;

        gameState.coins +=
            crops[cropKey]
            .sellPrice;

        updateInventoryUI();

        updateShopCoins();

        saveGame(gameState);

    };

});

/* =========================================
   INVENTORY ANIMATION
========================================= */

const inventoryCards =
    document.querySelectorAll(
        ".inventory-card"
    );

inventoryCards.forEach(
    (card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(20px)";

        setTimeout(() => {

            card.style.transition =
                "0.45s ease";

            card.style.opacity =
                "1";

            card.style.transform =
                "translateY(0px)";

        }, index * 60);

    }
);

/* =========================================
   START
========================================= */

updateInventoryUI();

updateShopCoins();

renderFarm();

openScreen("farm-screen");
