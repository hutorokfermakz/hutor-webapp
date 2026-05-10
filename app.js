createFarm();

gameState.player =
createPlayer();

document.getElementById(
  "playerName"
).innerText =
gameState.player.username;

document.getElementById(
  "coins"
).innerText =
gameState.player.coins;

renderFarm();

updateWeather();

console.log(
  "HUTOROK STARTED"
);
