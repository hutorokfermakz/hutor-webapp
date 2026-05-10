window.Telegram.WebApp.expand();

console.log("Хуторок 🍃 запущен");

async function startGame(){

  await loadPlayer();

  await loadFarm();

  await loadInventory();

  console.log("Игра загружена");

}

startGame();
