/* =========================================================
   HUTOROK v7
   MAIN.JS
========================================================= */

/* =========================================================
   TELEGRAM
========================================================= */

const tg = window.Telegram.WebApp;

tg.expand();

/* =========================================================
   NAVIGATION
========================================================= */

const navButtons = document.querySelectorAll(".nav-btn");

const screens = document.querySelectorAll(".screen");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target = button.dataset.screen;

        navButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        screens.forEach(screen => {

            screen.classList.remove("active");

            if (screen.id === target) {
                screen.classList.add("active");
            }

        });

    });

});

/* =========================================================
   PLANT MODAL
========================================================= */

const plantModal = document.getElementById("plant-modal");

const closeModal = document.getElementById("close-modal");

const emptySlots = document.querySelectorAll(".farm-slot.empty");

let currentSlot = null;

emptySlots.forEach(slot => {

    slot.addEventListener("click", () => {

        currentSlot = slot;

        plantModal.classList.add("active");

    });

});

closeModal.addEventListener("click", () => {

    plantModal.classList.remove("active");

});

plantModal.addEventListener("click", e => {

    if (e.target === plantModal) {

        plantModal.classList.remove("active");

    }

});

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
   PLANTING
========================================================= */

const seedCards = document.querySelectorAll(".seed-card");

seedCards.forEach(card => {

    card.addEventListener("click", () => {

        if (!currentSlot) return;

        const cropKey = card.dataset.crop;

        const crop = crops[cropKey];

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

        currentSlot.classList.remove("empty");

        currentSlot.classList.add("growing");

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
   PREMIUM ANIMATIONS
========================================================= */

document.addEventListener("touchstart", () => {}, {
    passive: true
});
