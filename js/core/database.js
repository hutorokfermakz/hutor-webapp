async function loadPlayer(){

  const tg =
  window.Telegram.WebApp;

  const user =
  tg.initDataUnsafe.user;

  if(!user){
    return;
  }

  // Ищем игрока

  let { data: player } =
  await window.supabaseClient
    .from("players")
    .select("*")
    .eq("telegram_id", user.id)
    .single();

  // Если нет игрока → создаём

  if(!player){

    const { data: created } =
    await window.supabaseClient
      .from("players")
      .insert({
        telegram_id: user.id,
        username:
          user.first_name || "Игрок",

        coins: 500,
        level: 1,
        xp: 0
      })
      .select()
      .single();

    player = created;
  }

  // SAVE STATE

  window.gameState.player =
  player;

  // UI

  updatePlayerUI(player);
}

function updatePlayerUI(player){

  document.getElementById(
    "playerName"
  ).innerText =
  player.username;

  document.getElementById(
    "coins"
  ).innerText =
  player.coins;

  document.getElementById(
    "level"
  ).innerText =
  player.level;

  document.getElementById(
    "xp"
  ).innerText =
  player.xp;

  document.getElementById(
    "profileName"
  ).innerText =
  player.username;

  document.getElementById(
    "profileLevel"
  ).innerText =
  player.level;

  document.getElementById(
    "profileCoins"
  ).innerText =
  player.coins;

  // XP BAR

  const percent =
  Math.min(player.xp,100);

  document.getElementById(
    "xpFill"
  ).style.width =
  percent + "%";
}
