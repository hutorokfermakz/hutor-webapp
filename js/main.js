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

        if (button.dataset.screen === screenId) {

            button.classList.add("active");

        }

    });

}

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const screenId =
            button.dataset.screen;

        openScreen(screenId);

    });

});

/* =========================================
   MODALS
========================================= */

const plantModal =
    document.getElementById("plant-modal");

const closeModalBtn =
    document.getElementById("close-plant-modal");

if (closeModalBtn) {

    closeModalBtn.addEventListener("click", () => {

        plantModal.classList.remove("active");

    });

}

if (plantModal) {

    plantModal.addEventListener("click", e => {

        if (e.target === plantModal) {

            plantModal.classList.remove("active");

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
   INVENTORY
========================================= */

const inventory = {

    wheat: 0,
    carrot: 0,
    strawberry: 0

};

let coins = 250;

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
            coins;

    }

}

/* =========================================
   CREATE GROWING SLOT
========================================= */

function createGrowingSlot(cropKey) {

    const crop =
        crops[cropKey];

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

                harvestBtn.addEventListener("click", () => {

                    inventory[cropKey]++;

                    coins += 25;

                    updateInventoryUI();

                    const emptySlot =
                        createEmptySlot();

                    slot.replaceWith(emptySlot);

                    attachAddButton(emptySlot);

                });

            } else {

                timer.textContent =
                    formatTime(seconds);

            }

        }, 1000);

    return slot;

}

/* =========================================
   EMPTY SLOT
========================================= */

function createEmptySlot() {

    const slot =
        document.createElement("div");

    slot.className =
        "farm-slot";

    slot.innerHTML = `
        <button class="add-crop-btn">

            <span>+</span>

            <p>
                Посадить культуру
            </p>

        </button>
    `;

    return slot;

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
   PLANTING SYSTEM
========================================= */

let currentSlot = null;

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

const allSlots =
    document.querySelectorAll(".farm-slot");

allSlots.forEach(slot => {

    attachAddButton(slot);

});

const seedCards =
    document.querySelectorAll(".seed-card");

seedCards.forEach(card => {

    card.addEventListener("click", () => {

        if (!currentSlot) return;

        const cropKey =
            card.dataset.crop;

        const growingSlot =
            createGrowingSlot(cropKey);

        currentSlot.replaceWith(growingSlot);

        plantModal.classList.remove("active");

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
