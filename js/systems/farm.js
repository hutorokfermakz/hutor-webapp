let selectedCrop = "wheat";

const cropButtons =
document.querySelectorAll(".crop-btn");

cropButtons.forEach(btn => {

  btn.onclick = () => {

    cropButtons.forEach(b => {
      b.classList.remove("active-crop");
    });

    btn.classList.add("active-crop");

    selectedCrop =
    btn.dataset.crop;

  };

});

const farmGrid =
document.getElementById("farmGrid");

async function loadFarm(){

  const player =
  window.gameState.player;

  if(!player){
    return;
  }

  // LOAD FARM

  let { data: farmTiles } =
  await window.supabaseClient
    .from("farms")
    .select("*")
    .eq("player_id", player.id);

  // CREATE DEFAULT FARM

  if(!farmTiles || farmTiles.length === 0){

    const defaultTiles = [];

    for(let i = 0; i < 6; i++){

      defaultTiles.push({
        player_id: player.id,
        tile_index: i,
        crop: "empty"
      });

    }

    await window.supabaseClient
      .from("farms")
      .insert(defaultTiles);

    let result =
    await window.supabaseClient
      .from("farms")
      .select("*")
      .eq("player_id", player.id);

    farmTiles = result.data;
  }

  renderFarm(farmTiles);

}

function renderFarm(tiles){

  farmGrid.innerHTML = "";

  tiles.sort((a,b)=>
    a.tile_index - b.tile_index
  );

  tiles.forEach(tile => {

    const div =
    document.createElement("div");

    div.className =
    "farm-tile glass";

    updateTileVisual(div, tile);

    div.onclick = () =>
    handleTileClick(tile);

    farmGrid.appendChild(div);

  });

}

function updateTileVisual(div, tile){

  // EMPTY

  if(tile.crop === "empty"){

    div.innerHTML = "🟫";

    return;
  }

  // READY

  const now =
  new Date().getTime();

  const ready =
  new Date(tile.ready_at).getTime();

  if(now >= ready){

    const cropData =
    window.CROPS[tile.crop];

    div.innerHTML =
    cropData.icon;

  }else{

    const seconds =
    Math.ceil((ready-now)/1000);

    const cropData =
    window.CROPS[tile.crop];

    div.innerHTML =
    cropData.icon +
    "<br><small>" +
    seconds +
    "с</small>";

  }

}

async function handleTileClick(tile){

  // EMPTY → PLANT

  if(tile.crop === "empty"){

    const cropData =
    window.CROPS[selectedCrop];

    const now =
    new Date();

    const ready =
    new Date(
      now.getTime() +
      cropData.growTime
    );

    await window.supabaseClient
      .from("farms")
      .update({
        crop: selectedCrop,

        planted_at:
        now.toISOString(),

        ready_at:
        ready.toISOString()

      })
      .eq("id", tile.id);

    loadFarm();

    return;
  }

  // READY → HARVEST

  const now =
  new Date().getTime();

  const ready =
  new Date(tile.ready_at).getTime();

  if(now >= ready){

    const cropData =
    window.CROPS[tile.crop];

    // RESET TILE

    await window.supabaseClient
      .from("farms")
      .update({
        crop: "empty",

        planted_at: null,

        ready_at: null
      })
      .eq("id", tile.id);

    // REWARD

    const player =
    window.gameState.player;

    const newCoins =
    player.coins +
    cropData.reward;

    const newXp =
    player.xp +
    cropData.xp;

    await addItem(
      cropData.name,
      1
    );

    // SAVE PLAYER

    await window.supabaseClient
      .from("players")
      .update({
        coins: newCoins,
        xp: newXp
      })
      .eq("id", player.id);

    player.coins =
    newCoins;

    player.xp =
    newXp;

    updatePlayerUI(player);

    await checkLevelUp();

    loadFarm();

  }

}

// LIVE TIMER

setInterval(async ()=>{

  const player =
  window.gameState.player;

  if(!player){
    return;
  }

  let { data } =
  await window.supabaseClient
    .from("farms")
    .select("*")
    .eq("player_id", player.id);

  if(data){

    renderFarm(data);

  }

},1000);
