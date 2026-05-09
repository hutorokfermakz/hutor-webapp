console.log("farm.js loaded");

const CROPS = {
  wheat: {
    growTime: 10000,
    reward: 20
  }
};

// ЗАГРУЗКА ФЕРМЫ

async function loadFarm() {

  const tg = window.Telegram.WebApp;

  if (!tg.initDataUnsafe.user) {
    console.log("Telegram user not found");
    return;
  }

  const telegramId =
    tg.initDataUnsafe.user.id;

  console.log("USER ID:", telegramId);

  // ЗАГРУЖАЕМ ГРЯДКИ

  let { data, error } =
    await window.supabaseClient
      .from("farm_tiles")
      .select("*")
      .eq("telegram_id", telegramId);

  if (error) {
    console.error(error);
    return;
  }

  // СОЗДАЕМ ГРЯДКИ

  if (!data || data.length === 0) {

    console.log("Creating tiles...");

    for (let i = 1; i <= 6; i++) {

      await window.supabaseClient
        .from("farm_tiles")
        .insert({
          telegram_id: telegramId,
          tile_id: i,
          state: "empty",
          planted_at: 0,
          grow_time: 0
        });

    }

    return loadFarm();
  }

  renderFarm(data);
}

// ОТРИСОВКА

function renderFarm(data) {

  console.log("Rendering farm");

  data.forEach(tile => {

    const element =
      document.querySelector(
        `.farm-tile[data-id="${tile.tile_id}"]`
      );

    if (!element) {
      console.log("Tile not found");
      return;
    }

    // ОЧИЩАЕМ СТАРЫЕ СОБЫТИЯ

    const newElement =
      element.cloneNode(true);

    element.parentNode.replaceChild(
      newElement,
      element
    );

    // ПУСТО

    if (tile.state === "empty") {

      newElement.innerHTML = "🟫";
    }

    // РАСТЕТ

    else {

      const finish =
        tile.planted_at + tile.grow_time;

      const now = Date.now();

      if (now >= finish) {

        newElement.innerHTML = "🌾";
      }

      else {

        const left =
          Math.ceil((finish - now) / 1000);

        newElement.innerHTML = `
          <div style="text-align:center;">
            🌱
            <div style="font-size:14px;">
              ${left}с
            </div>
          </div>
        `;
      }
    }

    // CLICK

    newElement.addEventListener(
      "click",
      async () => {

        console.log(
          "CLICK TILE",
          tile.tile_id
        );

        await onTileClick(tile);
      }
    );

  });

}

// КЛИК ПО ГРЯДКЕ

async function onTileClick(tile) {

  const tg = window.Telegram.WebApp;

  const telegramId =
    tg.initDataUnsafe.user.id;

  // ПОСАДКА

  if (tile.state === "empty") {

    console.log("PLANT");

    await window.supabaseClient
      .from("farm_tiles")
      .update({
        state: "growing",
        planted_at: Date.now(),
        grow_time: CROPS.wheat.growTime
      })
      .eq("telegram_id", telegramId)
      .eq("tile_id", tile.tile_id);

    loadFarm();

    return;
  }

  // СБОР

  const finish =
    tile.planted_at + tile.grow_time;

  if (Date.now() >= finish) {

    console.log("HARVEST");

    // МОНЕТЫ

    const coinsEl =
      document.getElementById("coins");

    let coins =
      Number(coinsEl.innerText);

    coins += CROPS.wheat.reward;

    coinsEl.innerText = coins;

    // СОХРАНЯЕМ

    await window.supabaseClient
      .from("players")
      .update({
        coins: coins
      })
      .eq("telegram_id", telegramId);

    // ЧИСТИМ ГРЯДКУ

    await window.supabaseClient
      .from("farm_tiles")
      .update({
        state: "empty",
        planted_at: 0,
        grow_time: 0
      })
      .eq("telegram_id", telegramId)
      .eq("tile_id", tile.tile_id);

    loadFarm();
  }

}

// АВТООБНОВЛЕНИЕ

setInterval(loadFarm, 1000);

// START

loadFarm();
