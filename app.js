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
  stars: 240,
  energy: 84
};

/* =========================================
   DOM
========================================= */

const username =
  document.getElementById("username");

const xpFill =
  document.querySelector(".xp-fill");

const energyFill =
  document.querySelector(".energy-fill");

const moneyText =
  document.querySelector(".money");

const starsText =
  document.querySelector(".stars");

const openCaseBtn =
  document.getElementById("openCase");

const navButtons =
  document.querySelectorAll(".nav-btn");

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

  "Животные":
    document.getElementById("animalsPage"),

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

  energyFill.style.width =
    player.energy + "%";

  moneyText.textContent =
    `💰 ${player.money.toLocaleString()}`;

  starsText.textContent =
    `⭐ ${player.stars}`;

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

    if (pages[pageName]) {

      pages[pageName]
        .classList.add("active");

    }

    tg.HapticFeedback
      .impactOccurred("light");

  });

});

/* =========================================
   CASE OPEN
========================================= */

openCaseBtn.addEventListener("click", () => {

  tg.HapticFeedback
    .notificationOccurred("success");

  const rewards = [
    "💰 500 монет",
    "⭐ 15 Stars",
    "🥕 Морковь x10",
    "🐔 Курица",
    "⚡ Энергия +20",
    "🎁 Редкий предмет"
  ];

  const reward =
    rewards[
      Math.floor(
        Math.random() * rewards.length
      )
    ];

  tg.showPopup({
    title: "🎁 Кейс открыт",
    message: `Вы получили:\n${reward}`,
    buttons: [
      {
        type: "ok"
      }
    ]
  });

});

/* =========================================
   TILE EVENTS
========================================= */

function setupTiles(){

  tiles =
    document.querySelectorAll(".tile");

  tiles.forEach(tile => {

    tile.addEventListener("click", () => {

      tg.HapticFeedback
        .impactOccurred("medium");

      if (
        tile.classList.contains("ready")
      ){

        collectCrop(tile);

      }

      else if (
        tile.classList.contains("empty")
      ){

        plantCrop(tile);

      }

      else{

        tg.showPopup({
          title: "🌾 HUTOR",
          message: "Объект выбран",
          buttons: [
            {
              type: "ok"
            }
          ]
        });

      }

    });

  });

}

setupTiles();

/* =========================================
   PLANT
========================================= */

function plantCrop(tile){

  if(player.money < 50){

    tg.showPopup({
      title: "❌ Ошибка",
      message: "Недостаточно монет",
      buttons: [
        {
          type:"ok"
        }
      ]
    });

    return;

  }

  tile.classList.remove("empty");

  tile.classList.add("planted");

  tile.innerHTML = `
    🌽
    <span>15м</span>
  `;

  player.money -= 50;

  updateMoney();

  tg.showPopup({
    title: "🌱 Посадка",
    message: "Кукуруза посажена",
    buttons: [
      {
        type:"ok"
      }
    ]
  });

}

/* =========================================
   COLLECT
========================================= */

function collectCrop(tile){

  tile.classList.remove("ready");

  tile.classList.add("empty");

  tile.innerHTML = `+`;

  player.money += 120;

  player.xp += 4;

  if(player.xp > 100){
    player.xp = 100;
  }

  updateMoney();
  updateXP();

  tg.showPopup({
    title: "🌽 Урожай собран",
    message: "+120 монет\n+4 XP",
    buttons: [
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
    `💰 ${player.money.toLocaleString()}`;

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
    document.querySelectorAll(".planted");

  plantedTiles.forEach(tile => {

    const span =
      tile.querySelector("span");

    if(!span) return;

    let time =
      parseInt(span.textContent);

    time--;

    if(time <= 0){

      tile.classList.remove("planted");

      tile.classList.add("ready");

      tile.innerHTML = `🥕`;

      tg.HapticFeedback
        .notificationOccurred("success");

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
    title:"HUTOR 10.0",
    message:"Добро пожаловать на ферму",
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

console.log("HUTOR 10.0 LOADED");
