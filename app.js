const SUPABASE_URL =
  "https://gihybzpefojxiyyxheks.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_epzMrCasnlXMmAENesXgTw_dkRzwBag";

const tg = window.Telegram.WebApp;

tg.expand();

const telegramUser =
  tg.initDataUnsafe.user;

const telegramId =
  telegramUser?.id || "0";



// ===== PLAYER =====

let player = {

  money: 500,

  stars: 0,

  level: 1,

  xp: 0

};



// ===== ELEMENTS =====

const moneyEl =
  document.getElementById("money");

const starsEl =
  document.getElementById("stars");

const levelEl =
  document.getElementById("level");

const xpBar =
  document.getElementById("xp-bar");

const username =
  document.getElementById("username");

const avatarImage =
  document.getElementById("avatar-image");

const bonusBtn =
  document.getElementById("bonus-case");

const bonusTimer =
  document.getElementById("bonus-timer");



// ===== UPDATE UI =====

function updateUI(){

  moneyEl.textContent =
    player.money.toLocaleString();

  starsEl.textContent =
    player.stars;

  levelEl.textContent =
    `LVL ${player.level}`;

  xpBar.style.width =
    `${player.xp}%`;

}



// ===== SAVE PLAYER =====

async function savePlayer(){

  try{

    await fetch(
      `${SUPABASE_URL}/rest/v1/Players`,
      {

        method: "POST",

        headers: {

          "apikey":
            SUPABASE_KEY,

          "Authorization":
            `Bearer ${SUPABASE_KEY}`,

          "Content-Type":
            "application/json",

          "Prefer":
            "resolution=merge-duplicates"

        },

        body: JSON.stringify({

          telegram_id:
            String(telegramId),

          name:
            username.textContent,

          money:
            player.money,

          stars:
            player.stars,

          level:
            player.level,

          xp:
            player.xp,

          avatar:
            avatarImage.src,

          background:
            localStorage.getItem(
              "farm_background"
            ) || ""

        })

      }
    );

    console.log("PLAYER SAVED");

  }catch(err){

    console.log(err);

  }

}



// ===== LOAD PLAYER =====

async function loadPlayer(){

  try{

    const response =
      await fetch(

        `${SUPABASE_URL}/rest/v1/Players?telegram_id=eq.${telegramId}`,

        {

          headers:{

            "apikey":
              SUPABASE_KEY,

            "Authorization":
              `Bearer ${SUPABASE_KEY}`

          }

        }

      );

    const data =
      await response.json();

    if(data.length > 0){

      const dbPlayer =
        data[0];

      player.money =
        dbPlayer.money || 0;

      player.stars =
        dbPlayer.stars || 0;

      player.level =
        dbPlayer.level || 1;

      player.xp =
        dbPlayer.xp || 0;

      username.textContent =
        dbPlayer.name || "Фермер";

      if(dbPlayer.avatar){

        avatarImage.src =
          dbPlayer.avatar;

      }

      updateUI();

    }else{

      await savePlayer();

    }

  }catch(err){

    console.log(err);

  }

}



// ===== CHANGE NAME =====

username.onclick = async () => {

  const newName =
    prompt("Введите имя");

  if(!newName) return;

  username.textContent =
    newName;

  await savePlayer();

};



// ===== CHANGE AVATAR =====

avatarImage.onclick = () => {

  const input =
    document.createElement("input");

  input.type = "file";

  input.accept = "image/*";

  input.onchange = () => {

    const file =
      input.files[0];

    const reader =
      new FileReader();

    reader.onload = async () => {

      avatarImage.src =
        reader.result;

      await savePlayer();

    };

    reader.readAsDataURL(file);

  };

  input.click();

};



// ===== FARM =====

window.collectWheat = async function(){

  player.money += 120;

  player.xp += 5;

  if(player.xp >= 100){

    player.level += 1;

    player.xp = 0;

  }

  updateUI();

  await savePlayer();

};



// ===== BONUS CASE =====

function getRemainingTime(){

  const lastOpen =
    localStorage.getItem(
      "bonus_case_time"
    );

  if(!lastOpen) return 0;

  const now =
    Date.now();

  const diff =
    now - Number(lastOpen);

  const cooldown =
    1000 * 60 * 60 * 3;

  return cooldown - diff;

}



function updateBonusTimer(){

  const left =
    getRemainingTime();

  if(left <= 0){

    bonusBtn.disabled = false;

    bonusBtn.innerText =
      "🎁 Бесплатный кейс";

    bonusTimer.innerText =
      "";

    return;

  }

  bonusBtn.disabled = true;

  const hours =
    Math.floor(
      left / 1000 / 60 / 60
    );

  const minutes =
    Math.floor(
      (left / 1000 / 60) % 60
    );

  const seconds =
    Math.floor(
      (left / 1000) % 60
    );

  bonusTimer.innerText =
    `⏳ ${hours}ч ${minutes}м ${seconds}с`;

}



bonusBtn.onclick = async () => {

  const left =
    getRemainingTime();

  if(left > 0) return;

  const reward =
    Math.floor(
      Math.random() * 500
    ) + 100;

  player.money += reward;

  alert(
    `🎁 Вы получили ${reward} монет!`
  );

  localStorage.setItem(
    "bonus_case_time",
    Date.now()
  );

  updateUI();

  await savePlayer();

  updateBonusTimer();

};



setInterval(
  updateBonusTimer,
  1000
);



// ===== INIT =====

updateUI();

loadPlayer();

updateBonusTimer();
