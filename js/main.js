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

const tg =
    window.Telegram.WebApp;

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

        screen.classList.remove(
            "active"
        );

    });

    const targetScreen =
        document.getElementById(
            screenId
        );

    if (targetScreen) {

        targetScreen.classList.add(
            "active"
        );

    }

    navButtons.forEach(button => {

        button.classList.remove(
            "active"
        );

        if (
            button.getAttribute(
                "data-screen"
            ) === screenId
        ) {

            button.classList.add(
                "active"
            );

        }

    });

}

navButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const screenId =
                button.getAttribute(
                    "data-screen"
                );

            if (!screenId) return;

            openScreen(screenId);

        }
    );

});

/* =========================================
   MODALS
========================================= */

const plantModal =
    document.getElementById(
        "plant-modal"
    );

const closeModalBtn =
    document.getElementById(
        "close-modal"
    );

let currentSlot = null;

if (
    closeModalBtn &&
    plantModal
) {

    closeModalBtn.addEventListener(
        "click",
        () => {

            plantModal.classList.remove(
                "active"
            );

            currentSlot = null;

        }
    );

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

                currentSlot = null;

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

        stages: [
            "🌱",
            "🌿",
            "🌾"
        ],

        growTime: 120,

        reward: 25,

        xp: 25,

        sellPrice: 12

    },

    carrot: {

        name: "Морковь",

        stages: [
            "🌱",
            "🥬",
            "🥕"
        ],

        growTime: 300,

        reward: 40,

        xp: 35,

        sellPrice: 22

    },

    strawberry: {

        name: "Клубника",

        stages: [
            "🌱",
            "🍃",
            "🍓"
        ],

        growTime: 480,

        reward: 65,

        xp: 50,

        sellPrice: 40

    }

};

/* =========================================
   GAME STATE
========================================= */

const inventory =
    gameState.inventory;

/* =========================================
   UI UPDATE
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

    const levelEl =
        document.getElementById(
            "level-value"
        );

    const xpEl =
        document.getElementById(
            "xp-value"
        );

    const coinsStatEl =
        document.getElementById(
            "coins-stat"
        );

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

    if (levelEl) {

        levelEl.textContent =
            gameState.level;

    }

    if (xpEl) {

        xpEl.textContent =
            gameState.xp;

    }

    if (coinsStatEl) {

        coinsStatEl.textContent =
            gameState.coins;

    }

    const xpFill =
        document.getElementById(
            "xp-fill"
        );

    const xpProgressText =
        document.getElementById(
            "xp-progress-text"
        );

    const nextLevelXP =
        gameState.level * 100;

    const progressPercent =
        (
            gameState.xp /
            nextLevelXP
        ) * 100;

    if (xpFill) {

        xpFill.style.width =
            `${progressPercent}%`;

    }

    if (xpProgressText) {

        xpProgressText.textContent =
            `${gameState.xp} / ${nextLevelXP} XP`;

    }

}

/* =========================================
   XP SYSTEM
========================================= */

function addXP(amount) {

    gameState.xp += amount;

    const nextLevelXP =
        gameState.level * 100;

    if (
        gameState.xp >=
        nextLevelXP
    ) {

        gameState.xp = 0;

        gameState.level++;

    }

    updateInventoryUI();

    saveGame(gameState);

}

/* =========================================
   TIME FORMAT
========================================= */

function formatTime(
    totalSeconds
) {

    const minutes =
        Math.floor(
            totalSeconds / 60
        );

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
        document.createElement(
            "div"
        );

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
        document.createElement(
            "div"
        );

    slot.className =
        "farm-slot growing";

    const finishTime =
        savedFinishTime ||
        (
            Date.now() +
            crop.growTime * 1000
        );

    let seconds =
        Math.max(
            0,
            Math.floor(
                (
                    finishTime -
                    Date.now()
                ) / 1000
            )
        );

    slot.innerHTML = `
        <div class="growing-content">

            <div class="growing-emoji">
                ${crop.stages[0]}
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

    const emojiEl =
        slot.querySelector(
            ".growing-emoji"
        );

    /* =========================================
       READY STATE
    ========================================= */

    if (seconds <= 0) {

        slot.innerHTML = `
            <div class="harvest-content">

                <div class="growing-emoji">
                    ${crop.stages[2]}
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

        if (harvestBtn) {

            harvestBtn.onclick =
                () => {

                    inventory[
                        cropKey
                    ]++;

                    addXP(
                        crop.xp
                    );

                    gameState.coins +=
                        crop.reward;

                    gameState.farmSlots[
                        slotIndex
                    ] = null;

                    updateInventoryUI();

                    saveGame(
                        gameState
                    );

                    const emptySlot =
                        createEmptySlot();

                    slot.replaceWith(
                        emptySlot
                    );

                };

        }

        return slot;

    }

    if (
        slotIndex !== null &&
        !savedFinishTime
    ) {

        gameState.farmSlots[
            slotIndex
        ] = {

            cropKey,
            finishTime

        };

        saveGame(
            gameState
        );

    }

    const interval =
        setInterval(() => {

            seconds--;

            const progress =
                1 - (
                    seconds /
                    crop.growTime
                );

            if (
                progress >= 0.66
            ) {

                emojiEl.textContent =
                    crop.stages[2];

            } else if (
                progress >= 0.33
            ) {

                emojiEl.textContent =
                    crop.stages[1];

            }

            if (
                seconds <= 0
            ) {

                clearInterval(
                    interval
                );

                slot.innerHTML = `
                    <div class="harvest-content">

                        <div class="growing-emoji">
                            ${crop.stages[2]}
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

                if (harvestBtn) {

                    harvestBtn.onclick =
                        () => {

                            inventory[
                                cropKey
                            ]++;

                            addXP(
                                crop.xp
                            );

                            gameState.coins +=
                                crop.reward;

                            gameState.farmSlots[
                                slotIndex
                            ] = null;

                            updateInventoryUI();

                            saveGame(
                                gameState
                            );

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
                        formatTime(
                            seconds
                        );

                }

            }

        }, 1000);

    return slot;

}

/* =========================================
   PLANTING SYSTEM
========================================= */

function attachAddButton(
    slot
) {

    const button =
        slot.querySelector(
            ".add-crop-btn"
        );

    if (!button) return;

    button.onclick = () => {

        currentSlot = slot;

        if (plantModal) {

            plantModal.classList.add(
                "active"
            );

        }

    };

}

/* =========================================
   RESTORE FARM
========================================= */

const farmGrid =
    document.querySelector(
        ".farm-grid"
    );

const allSlots =
    Array.from(
        document.querySelectorAll(
            ".farm-slot"
        )
    );

allSlots.forEach(
    (
        slot,
        index
    ) => {

        const savedSlot =
            gameState.farmSlots[
                index
            ];

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

            attachAddButton(
                slot
            );

        }

    }
);

/* =========================================
   SEED CARDS
========================================= */

const seedCards =
    document.querySelectorAll(
        ".seed-card"
    );

seedCards.forEach(card => {

    card.onclick = () => {

        if (!currentSlot)
            return;

        const cropKey =
            card.dataset.crop;

        if (!cropKey)
            return;

        const slotIndex =
            Array.from(
                document.querySelectorAll(
                    ".farm-slot"
                )
            ).indexOf(
                currentSlot
            );

        const growingSlot =
            createGrowingSlot(
                cropKey,
                slotIndex
            );

        currentSlot.replaceWith(
            growingSlot
        );

        if (plantModal) {

            plantModal.classList.remove(
                "active"
            );

        }

        currentSlot = null;

        saveGame(
            gameState
        );

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

        if (!cropKey) return;

        if (
            inventory[cropKey] <= 0
        ) {

            return;

        }

        inventory[cropKey]--;

        gameState.coins +=
            crops[cropKey]
            .sellPrice;

        updateInventoryUI();

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
    (
        card,
        index
    ) => {

        card.style.opacity =
            "0";

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

openScreen(
    "farm-screen"
);
