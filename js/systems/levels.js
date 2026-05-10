function getLevelXp(level){

  return level * 100;

}

async function checkLevelUp(){

  const player =
  window.gameState.player;

  let neededXp =
  getLevelXp(player.level);

  // LEVEL UP

  while(player.xp >= neededXp){

    player.xp -= neededXp;

    player.level += 1;

    neededXp =
    getLevelXp(player.level);

    showNotification(
      "🎉 Новый уровень: " +
      player.level
    );

  }

  // SAVE

  await window.supabaseClient
    .from("players")
    .update({
      level: player.level,
      xp: player.xp
    })
    .eq("id", player.id);

  updatePlayerUI(player);

}
