/* ======================================================
   HUTOROK v7
   MAIN.JS
   FULL WORKING VERSION
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

            if (screen.id === target) {
                screen.classList.add("active");
            } else {
                screen.classList.remove("active");
            }

        });

    });

});

/* ======================================================
   FARM SYSTEM
====================================================== */

const farmSlots = document.querySelectorAll(".farm-slot.empty");
const plantModal = document.getElementById("plant-modal");
const closeModal = document.getElementById("close-modal");

let currentSlot = null;

/* ---------- OPEN MODAL ---------- */

farmSlots.forEach(slot => {

    slot.addEventListener("click", () => {

        currentSlot = slot;

        if (plantModal) {
            plantModal.classList.add("active");
        }

    });

});

/* ---------- CLOSE MODAL ---------- */

if (closeModal) {

    closeModal.addEventListener("click", () => {

        plantModal.classList.remove("active");

    });

}

/* ---------- CLOSE ON BACKDROP ---------- */

if (plantModal) {

    plantModal.addEventListener("click", (e) => {

        if (e.target === plantModal) {
            plantModal.classList.remove("active");
        }

    });

}

/* ======================================================
   CROPS
====================================================== */

const crops = {

    wheat: {
        name: "Пшеница",
        emoji: "🌾",
        time: "2 мин",
        badge: "РОСТ"
    },

    carrot: {
        name: "Морковь",
        emoji: "🥕",
        time: "5 мин",
        badge: "РОСТ"
    },

    strawberry: {
        name: "Клубника",
        emoji: "🍓",
        time: "8 мин",
        badge: "РОСТ"
    }

};

/* ======================================================
   SEED CARDS
====================================================== */

const seedCards = document.querySelectorAll(".seed-card");

seedCards.forEach(card => {

    card.addEventListener("click", () => {

        if (!currentSlot) return;

        const cropKey = card.dataset.crop;
        const crop = crops[cropKey];

        if (!crop) return;

        currentSlot.classList.remove("empty");

        currentSlot.innerHTML = `

            <div class="slot-top">

                <h4>${crop.name}</h4>

                <span class="slot-badge">
                    ${crop.badge}
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

                <div class="slot-progress-fill"></div>

            </div>

            <button class="slot-action-btn">
                Ускорить
            </button>

        `;

        plantModal.classList.remove("active");

        currentSlot = null;

    });

});

/* ======================================================
   COUNTER ANIMATION
====================================================== */

const statNumbers = document.querySelectorAll(".stat-value");

statNumbers.forEach(stat => {

    const target = parseInt(stat.dataset.target || stat.textContent);

    let current = 0;

    const increment = Math.max(1, Math.floor(target / 40));

    const updateCounter = () => {

        current += increment;

        if (current >= target) {
            stat.textContent = target;
            return;
        }

        stat.textContent = current;

        requestAnimationFrame(updateCounter);

    };

    updateCounter();

});

/* ======================================================
   SIMPLE FADE-IN
====================================================== */

const animatedCards = document.querySelectorAll(
    ".glass-card, .farm-slot, .seed-card"
);

animatedCards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {

        card.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";

        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, index * 80);

});
