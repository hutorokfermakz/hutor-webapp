const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

/* =========================================
   PLAYER
========================================= */

const player = {
  name: "Фермер",
  level: 12,
  xp: 62,
  money: 12450,
  stars: 240
};

/* =========================================
   DOM
========================================= */

const username =
  document.getElementById("username");

const avatarInput =
  document.getElementById("avatarInput");

const avatarImage =
  document.getElementById("avatarImage");

const xpFill =
  document.querySelector(".xp-fill");

const moneyText =
  document.querySelector(".money");

const starsText =
  document.querySelector(".stars");

const openCaseBtn =
  document.getElementById("openCase");

const navButtons =
  document.querySelectorAll(".nav-btn");

const backgroundCards =
  document.querySelectorAll(".bg-card");

const background =
  document.querySelector(".background");

let tiles =
  document.querySelectorAll(".tile");

/* =========================================
   PAGES
========================================= */

const pages = {

  "Ферма":
    document.getElementById("farmPage"),

  "Магазин":
    document.getElementById("shopPage"),

  "Кланы":
    document.getElementById("clansPage"),

  "Топ":
    document.getElementById("topPage")

};

/* =========================================
   LOAD PROFILE
========================================= */

function loadProfile(){

  username.textContent =
    player.name;

  xpFill.style.width =
    player.xp + "%";

  moneyText.textContent =
    player.money.toLocaleString();

  starsText.textContent =
    player.stars;

}

loadProfile();

/* =========================================
   NAVIGATION
========================================= */

navButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    navButtons.forEach(b =>
      b.classList.remove("active")
    );

    btn.classList.add("active");

    document
      .querySelectorAll(".page")
      .forEach(page =>
        page.classList.remove("active")
      );

    const pageName =
      btn.querySelector("span")
      .textContent;

    if(pages[pageName]){

      pages[pageName]
        .classList.add("active");

    }

    tg.HapticFeedback
      .impactOccurred("light");

  });

});

/* =========================================
   CHANGE NAME
========================================= */

username.addEventListener("click", () => {

  const newName =
    prompt("Введите название фермы");

  if(!newName) return;

  username.textContent =
    newName;

  localStorage.setItem(
    "farm_name",
    newName
  );

});

/* =========================================
   LOAD SAVED NAME
========================================= */

const savedName =
  localStorage.getItem("farm_name");

if(savedName){

  username.textContent =
    savedName;

}

/* =========================================
   CHANGE AVATAR
========================================= */

avatarInput.addEventListener(
  "change",
  (event) => {

    const file =
      event.target.files[0];

    if(!file) return;

    const reader =
      new FileReader();

    reader.onload = function(e){

      avatarImage.src =
        e.target.result;

      localStorage.setItem(
        "farm_avatar",
        e.target.result
      );

    };

    reader.readAsDataURL(file);

});

/* =========================================
   LOAD SAVED AVATAR
========================================= */

const savedAvatar =
  localStorage.getItem("farm_avatar");

if(savedAvatar){

  avatarImage.src =
    savedAvatar;

}

/* =========================================
   BACKGROUNDS
========================================= */

backgroundCards.forEach(card => {

  card.addEventListener("click", () => {

    backgroundCards.forEach(c =>
      c.classList.remove("active-bg")
    );

    card.classList.add("active-bg");

    background.className =
      "background";

    const bg =
      card.dataset.bg;

    if(bg !== "default"){

      background.classList.add(bg);

    }

    localStorage.setItem(
      "farm_background",
      bg
    );

    tg.HapticFeedback
      .impactOccurred("medium");

  });

});

/* =========================================
   LOAD BACKGROUND
========================================= */

const savedBackground =
  localStorage.getItem(
    "farm_background"
  );

if(savedBackground){

  backgroundCards.forEach(card => {

    card.classList.remove(
      "active-bg"
    );

    if(
      card.dataset.bg ===
      savedBackground
    ){

      card.classList.add(
        "active-bg"
      );

    }

  });

  if(savedBackground !== "default"){

    background.classList.add(
      savedBackground
    );

  }

}

/* =========================================
   CASE
========================================= */

openCaseBtn.addEventListener(
  "click",
  () => {

    tg.HapticFeedback
      .notificationOccurred(
        "success"
      );

    const rewards = [

      "💰 500 монет",

      "⭐ 15 Stars",

      "🎨 Новый фон",

      "🔥 Epic рамка",

      "🚜 Трактор",

      "👑 Legendary статус"

    ];

    const reward =
      rewards[
        Math.floor(
          Math.random() *
          rewards.length
        )
      ];

    tg.showPopup({

      title:"🎁 Кейс открыт",

      message:
        `Вы получили:\n${reward}`,

      buttons:[
        {
          type:"ok"
        }
      ]

    });

});

/* =========================================
   FARM TILES
========================================= */

function setupTiles(){

  tiles =
    document.querySelectorAll(
      ".tile"
    );

  tiles.forEach(tile => {

    tile.addEventListener(
      "click",
      () => {

        tg.HapticFeedback
          .impactOccurred(
            "medium"
          );

        if(
          tile.classList.contains(
            "ready"
          )
        ){

          collectCrop(tile);

        }

        else if(
          tile.classList.contains(
            "empty"
          )
        ){

          plantCrop(tile);

        }

        else{

          tg.showPopup({

            title:"🌾 Хуторок 🍃",

            message:
              "Объект выбран",

            buttons:[
              {
                type:"ok"
              }
            ]

          });

        }

      }
    );

  });

}

setupTiles();

/* =========================================
   PLANT
========================================= */

function plantCrop(tile){

  if(player.money < 50){

    tg.showPopup({

      title:"❌ Ошибка",

      message:
        "Недостаточно монет",

      buttons:[
        {
          type:"ok"
        }
      ]

    });

    return;

  }

  tile.classList.remove(
    "empty"
  );

  tile.classList.add(
    "planted"
  );

  tile.innerHTML = `
    🌽
    <span>15м</span>
  `;

  player.money -= 50;

  updateMoney();

}

/* =========================================
   COLLECT
========================================= */

function collectCrop(tile){

  tile.classList.remove(
    "ready"
  );

  tile.classList.add(
    "empty"
  );

  tile.innerHTML = `+`;

  player.money += 120;

  player.xp += 4;

  if(player.xp > 100){

    player.xp = 100;

  }

  updateMoney();
  updateXP();

  tg.showPopup({

    title:"🌽 Урожай",

    message:
      "+120 монет\n+4 XP",

    buttons:[
      {
        type:"ok"
      }
    ]

  });

}

/* =========================================
   UPDATE UI
========================================= */

function updateMoney(){

  moneyText.textContent =
    player.money.toLocaleString();

}

function updateXP(){

  xpFill.style.width =
    player.xp + "%";

}

/* =========================================
   GROW TIMER
========================================= */

setInterval(() => {

  const plantedTiles =
    document.querySelectorAll(
      ".planted"
    );

  plantedTiles.forEach(tile => {

    const span =
      tile.querySelector("span");

    if(!span) return;

    let time =
      parseInt(
        span.textContent
      );

    time--;

    if(time <= 0){

      tile.classList.remove(
        "planted"
      );

      tile.classList.add(
        "ready"
      );

      tile.innerHTML = `🥕`;

      tg.HapticFeedback
        .notificationOccurred(
          "success"
        );

    }

    else{

      span.textContent =
        `${time}м`;

    }

  });

},3000);

/* =========================================
   MAIN BUTTON
========================================= */

tg.MainButton.setText(
  "🚜 Открыть ферму"
);

tg.MainButton.show();

tg.MainButton.onClick(() => {

  tg.showPopup({

    title:"Хуторок 🍃",

    message:
      "Добро пожаловать",

    buttons:[
      {
        type:"ok"
      }
    ]

  });

});

/* =========================================
   START
========================================= */

console.log(
  "Хуторок 🍃 LOADED"
);
