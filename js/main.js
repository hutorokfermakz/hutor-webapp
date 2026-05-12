/* =========================================================
   HUTOROK v7
   FULL WORKING MAIN.JS
========================================================= */

/* =========================================================
   TELEGRAM
========================================================= */

const tg = window.Telegram.WebApp;

tg.expand();

/* =========================================================
   SCREENS
========================================================= */

const screens = document.querySelectorAll(".screen");

function openScreen(screenId) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const targetScreen = document.getElementById(screenId);

    if (targetScreen) {
        targetScreen.classList.add("active");
    }

}

/* =========================================================
   NAVIGATION
========================================================= */

const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        navButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const screenId = button.dataset.screen;

        openScreen(screenId);

    });

});

/* =========================================================
   PLANT MODAL
========================================================= */

const plantModal = document.getElementById("plant-modal");

const closeModal = document.getElementById("close-modal");

let currentSlot = null;

/* =========================================================
   OPEN MODAL
========================================================= */

function bindEmptySlots() {

    const emptySlots = document.querySelectorAll(".farm-slot.empty");

    emptySlots.forEach(slot => {

        slot.onclick = () => {

            currentSlot = slot;

            plantModal.classList.add("active");

        };

    });

}

bindEmptySlots();

/* =========================================================
   CLOSE MODAL
========================================================= */

if (closeModal) {

    closeModal.addEventListener("click", () => {

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

/* =========================================================
   CROPS
========================================================= */

const crops = {

    wheat: {

        name: "Пшеница",

        emoji: "🌾",

        time: "2м 14с"

    },

    carrot: {

        name: "Морковь",

        emoji: "🥕",

        time: "5м 10с"

    },

    strawberry: {

        name: "Клубника",

        emoji: "🍓",

        time: "8м 42с"

    }

};

/* =========================================================
   PLANTING SYSTEM
========================================================= */

const seedCards = document.querySelectorAll(".seed-card");

seedCards.forEach(card => {

    card.addEventListener("click", () => {

        if (!currentSlot) return;

        const cropKey = card.dataset.crop;

        const crop = crops[cropKey];

        if (!crop) return;

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

                <span>До урожая</span>

                <span>${crop.time}</span>

            </div>

            <div class="slot-progress">
                <div class="slot-progress-bar"></div>
            </div>

            <button class="slot-action">
                Ускорить
            </button>

        `;

        plantModal.classList.remove("active");

        currentSlot = null;

    });

});

/* =========================================================
   PROFILE
========================================================= */

const profileName = document.getElementById("profile-name");

if (profileName && tg.initDataUnsafe.user) {

    profileName.textContent =
        tg.initDataUnsafe.user.first_name || "Player";

}

/* =========================================================
   SAFE TOUCH SUPPORT
========================================================= */

document.addEventListener(
    "touchstart",
    () => {},
    { passive: true }
);

/* =========================================================
   START SCREEN
========================================================= */

openScreen("farm-screen");
