function updatePlayerUI(player){

  document.getElementById(
    "playerName"
  ).innerText =
  player.username || "Игрок";

  document.getElementById(
    "coins"
  ).innerText =
  player.coins;

  document.getElementById(
    "level"
  ).innerText =
  player.level;

  // XP BAR

  const neededXp =
  player.level * 100;

  const percent =
  (player.xp / neededXp) * 100;

  document.getElementById(
    "xpFill"
  ).style.width =
  percent + "%";

}
