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

    div.innerHTML = "🌾";

  }else{

    const seconds =
    Math.ceil((ready-now)/1000);

    div.innerHTML =
    "🌱<br><small>" +
    seconds +
    "с</small>";

  }

}

async function handleTileClick(tile){

  // EMPTY → PLANT

  if(tile.crop === "empty"){

    const now =
    new Date();

    const ready =
    new Date(
      now.getTime() + GROW_TIME
    );

    await window.supabaseClient
      .from("farms")
      .update({
        crop: "wheat",
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
    player.coins + 20;

    const newXp =
    player.xp + 10;
    
await addItem("Пшеница", 1);
    
    await window.supabaseClient
      .from("players")
      .update({
        coins: newCoins,
        xp: newXp
      })
      .eq("id", player.id);

    player.coins = newCoins;
    player.xp = newXp;

    updatePlayerUI(player);

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
