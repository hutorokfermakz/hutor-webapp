const tg = window.Telegram.WebApp;

tg.expand();

const SUPABASE_URL =
"https://gihybzpefojxiyyxheks.supabase.co";

const SUPABASE_KEY =
"sb_publishable_epzMrCasnlXMmAENesXgTw_dkRzwBag";

const telegramId =
tg.initDataUnsafe?.user?.id || "guest";

let player = {
  telegram_id: telegramId,
  name: "Фермер",
  money: 500,
  stars: 0,
  level: 1,
  xp: 0,
  avatar: "https://i.imgur.com/9Xn4F6L.png",
  background: "default"
};

const farmGrid = document.getElementById("farmGrid");

const crops = [
  "🌱","🌾","🥕","🍅"
];

async function loadPlayer(){

  try{

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/players?telegram_id=eq.${telegramId}`,
      {
        headers:{
          apikey:SUPABASE_KEY,
          Authorization:`Bearer ${SUPABASE_KEY}`
        }
      }
    );

    const data = await response.json();

    if(data.length > 0){
      player = data[0];
    }else{
      await savePlayer();
    }

    updateUI();

  }catch(err){
    console.log(err);
  }

}

async function savePlayer(){

  try{

    await fetch(
      `${SUPABASE_URL}/rest/v1/players`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          apikey:SUPABASE_KEY,
          Authorization:`Bearer ${SUPABASE_KEY}`,
          Prefer:"resolution=merge-duplicates"
        },
        body:JSON.stringify(player)
      }
    );

  }catch(err){
    console.log(err);
  }

}

function updateUI(){

  document.getElementById("money").innerText =
  player.money;

  document.getElementById("stars").innerText =
  player.stars;

  document.getElementById("level").innerText =
  player.level;

  document.getElementById("playerName").innerText =
  player.name;

  document.getElementById("nameInput").value =
  player.name;

  document.getElementById("avatar").src =
  player.avatar;

  document.getElementById("bigAvatar").src =
  player.avatar;

  const percent =
  (player.xp % 100);

  document.getElementById("xpFill").style.width =
  percent + "%";

}

function createFarm(){

  farmGrid.innerHTML = "";

  for(let i = 0; i < 9; i++){

    const tile =
    document.createElement("div");

    tile.className = "farm-tile";

    tile.innerHTML = "🌱";

    tile.onclick = () => growCrop(tile);

    farmGrid.appendChild(tile);

  }

}

function growCrop(tile){

  tg.HapticFeedback.impactOccurred("light");

  tile.innerHTML = "⏳";

  setTimeout(()=>{

    tile.innerHTML =
    crops[
      Math.floor(Math.random()*crops.length)
    ];

    player.money +=
    Math.floor(Math.random()*80)+20;

    player.xp += 15;

    if(player.xp >= player.level*100){

      player.level++;
      player.stars++;

      tg.HapticFeedback.notificationOccurred(
        "success"
      );

    }

    updateUI();

    savePlayer();

  },3000);

}

function changeAvatar(){

  document
  .getElementById("avatarInput")
  .click();

}

document
.getElementById("avatarInput")
.addEventListener("change",(e)=>{

  const file = e.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = function(event){

    player.avatar =
    event.target.result;

    updateUI();

    savePlayer();

  };

  reader.readAsDataURL(file);

});

function saveProfile(){

  player.name =
  document.getElementById("nameInput").value;

  updateUI();

  savePlayer();

  tg.HapticFeedback.notificationOccurred(
    "success"
  );

}

function createInventory(){

  const inventory =
  document.getElementById("inventory");

  inventory.innerHTML = "";

  const items = [
    "🌾","🥕","🍅","💎",
    "🎁","🪙","⭐","🖼️"
  ];

  items.forEach(item=>{

    const div =
    document.createElement("div");

    div.className =
    "inventory-item";

    div.innerHTML = item;

    inventory.appendChild(div);

  });

}

function createOnlinePlayers(){

  const online =
  document.getElementById("onlinePlayers");

  online.innerHTML = "";

  const players = [
    "FarmerPro",
    "HayMaster",
    "ClashFarmer",
    "HutorKing"
  ];

  players.forEach(name=>{

    const div =
    document.createElement("div");

    div.className =
    "online-player";

    div.innerHTML = `
      <span>🟢 ${name}</span>
      <span>🌾 Онлайн</span>
    `;

    online.appendChild(div);

  });

}

loadPlayer();

createFarm();

createInventory();

createOnlinePlayers();
