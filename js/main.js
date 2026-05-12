/* ======================================================
   HUTOROK v7
   FULL MAIN.JS
====================================================== */

/* ======================================================
   TELEGRAM
====================================================== */

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.expand();
    tg.ready();
}

/* ======================================================
   NAVIGATION
====================================================== */

const navButtons =
    document.querySelectorAll(".nav-btn");

const screens =
    document.querySelectorAll(".screen");

function openScreen(screenId) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const targetScreen =
        document.getElementById(screenId);

    if (targetScreen) {
        targetScreen.classList.add("active");
    }

}

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        navButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const screenId =
            button.dataset.screen;

        openScreen(screenId);

    });

});

/* ======================================================
   MODAL
====================================================== */

const plantModal =
    document.getElementById("plant-modal");

const closeModal =
    document.getElementById("close-modal");

let currentSlot = null;

/* ======================================================
   INVENTORY
====================================================== */

const inventory = {

    wheat: 0,

    carrot: 0,

    strawberry: 0

};

let coins = 250;

/* ======================================================
   UPDATE INVENTORY UI
====================================================== */

function updateInventoryUI() {

    const wheatCount =
        document.getElementById("inv-wheat");

    const carrotCount =
        document.getElementById("inv-carrot");

    const strawberryCount =
        document.getElementById("inv-strawberry");

    const coinsValue =
        document.getElementById("coins-value");

    if (wheatCount) {
        wheatCount.textContent =
            inventory.wheat;
    }

    if (carrotCount) {
        carrotCount.textContent =
            inventory.carrot;
    }

    if (strawberryCount) {
        strawberryCount.textContent =
            inventory.strawberry;
    }

    if (coinsValue) {
        coinsValue.textContent =
            coins;
    }

}

/* ======================================================
   CROPS
====================================================== */

const crops = {

    wheat: {

        name: "Пшеница",

        emoji: "🌾",

        growTime: 120,

        reward: 12

    },

    carrot: {

        name: "Морковь",

        emoji: "🥕",

        growTime: 300,

        reward: 28

    },

    strawberry: {

        name: "Клубника",

        emoji: "🍓",

        growTime: 480,

        reward: 55

    }

};

/* ======================================================
   FORMAT TIME
====================================================== */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        seconds % 60;

    return `${minutes}м ${secs}с`;

}

/* ======================================================
   BIND FARM SLOTS
====================================================== */

function bindFarmSlots() {

    const emptySlots =
        document.querySelectorAll(".farm-slot.empty");

    emptySlots.forEach(slot => {

        slot.onclick = () => {

            currentSlot = slot;

            if (plantModal) {
                plantModal.classList.add("active");
            }

        };

    });

}

bindFarmSlots();

/* ======================================================
   CLOSE MODAL
====================================================== */

if (closeModal) {

    closeModal.addEventListener("click", () => {

        plantModal.classList.remove("active");

    });

}

if (plantModal) {

    plantModal.addEventListener("click", (e) => {

        if (e.target === plantModal) {

            plantModal.classList.remove("active");

        }

    });

}

/* ======================================================
   PLANTING SYSTEM
====================================================== */

const seedCards =
    document.querySelectorAll(".seed-card");

seedCards.forEach(card => {

    card.addEventListener("click", () => {

        if (!currentSlot) return;

        const cropKey =
            card.dataset.crop;

        const crop =
            crops[cropKey];

        if (!crop) return;

        let remaining =
            crop.growTime;

        currentSlot.classList.remove("empty");

        currentSlot.classList.add("growing");

        currentSlot.innerHTML = `

            <div class="slot-top">

                <h4>${crop.name}</h4>

                <span class="slot-badge">
                    РОСТ
                </span>

            </div>

            <div class="crop-stage">
                ${crop.emoji}
            </div>

            <div class="slot-progress-info">

                <span>
                    До урожая
                </span>

                <span class="grow-timer">
                    ${formatTime(remaining)}
                </span>

            </div>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width: 0%"
                ></div>

            </div>

            <button class="farm-action-btn">
                Полить
            </button>

        `;

        const timerElement =
            currentSlot.querySelector(".grow-timer");

        const progressFill =
            currentSlot.querySelector(".progress-fill");

        const interval = setInterval(() => {

            remaining--;

            const progress =
                (
                    (crop.growTime - remaining)
                    / crop.growTime
                ) * 100;

            progressFill.style.width =
                `${progress}%`;

            timerElement.textContent =
                formatTime(remaining);

            if (remaining <= 0) {

                clearInterval(interval);

                currentSlot.classList.remove("growing");

                currentSlot.classList.add("ready");

                currentSlot.innerHTML = `

                    <div class="slot-top">

                        <h4>${crop.name}</h4>

                        <span class="slot-badge ready-badge">
                            ГОТОВО
                        </span>

                    </div>

                    <div class="crop-stage ready-crop">
                        ${crop.emoji}
                    </div>

                    <div class="slot-progress-info">

                        <span>
                            Урожай созрел
                        </span>

                        <span>
                            +${crop.reward}
                        </span>

                    </div>

                    <button class="harvest-btn">
                        Собрать урожай
                    </button>

                `;

                const harvestBtn =
                    currentSlot.querySelector(".harvest-btn");

                harvestBtn.addEventListener("click", () => {

                    inventory[cropKey] +=
                        crop.reward;

                    coins += crop.coins;

                    updateInventoryUI();

                    currentSlot.className =
                        "farm-slot empty";

                    currentSlot.innerHTML = `

                        <div class="empty-content">

                            <div class="empty-plus">
                                +
                            </div>

                            <span>
                                Посадить культуру
                            </span>

                        </div>

                    `;

                    bindFarmSlots();

                });

            }

        }, 1000);

        plantModal.classList.remove("active");

        currentSlot = null;

    });

});

/* ======================================================
   SIMPLE ANIMATIONS
====================================================== */

const animatedCards =
    document.querySelectorAll(
        ".farm-slot, .seed-card, .stat-card"
    );

animatedCards.forEach((card, index) => {

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

/* ======================================================
   START
====================================================== */

updateInventoryUI();

openScreen("farm-screen");
