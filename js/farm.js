const CROPS = {

  wheat: {

    emoji: "🌾",

    growTime: 10000,

    reward: 20
  }
};

async function loadFarm() {

  const tg = window.Telegram.WebApp;

  const user = tg.initDataUnsafe.user;

  if (!user) return;

  const telegramId = user.id;

  const { data, error } =
    await window.supabaseClient
      .from("farm_tiles")
      .select("*")
      .eq("telegram_id", telegramId);

  if (error) {

    console.error(error);

    return;
  }

  // СОЗДАНИЕ ГРЯДОК

  if (!data || data.length === 0) {

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

function renderFarm(data) {

  data.forEach(tile => {

    const oldTile =
      document.querySelector(
        `.farm-tile[data-id="${tile.tile_id}"]`
      );

    if (!oldTile) return;

    const newTile =
      oldTile.cloneNode(true);

    updateTile(newTile, tile);

    oldTile.parentNode.replaceChild(
      newTile,
      oldTile
    );

    newTile.addEventListener(
      "click",
      async () => {

        await handleTileClick(tile);
      }
    );

  });

}

function updateTile(element, tile) {

  const now = Date.now();

  // ПУСТО

  if (tile.state === "empty") {

    element.innerHTML = "🟫";

    return;
  }

  const finish =
    tile.planted_at + tile.grow_time;

  // ГОТОВО

  if (now >= finish) {

    element.innerHTML = "🌾";
  }

  // РАСТЕТ

  else {

    const left =
      Math.ceil((finish - now) / 1000);

    element.innerHTML = `
      <div style="
        text-align:center;
      ">
        🌱

        <div style="
          font-size:14px;
          margin-top:4px;
        ">
          ${left}с
        </div>
      </div>
    `;
  }

}

async function handleTileClick(tile) {

  const tg = window.Telegram.WebApp;

  const user = tg.initDataUnsafe.user;

  if (!user) return;

  const telegramId = user.id;

  // ПОСАДКА

  if (tile.state === "empty") {

    const crop = CROPS.wheat;

    await window.supabaseClient
      .from("farm_tiles")
      .update({

        state: "growing",

        planted_at: Date.now(),

        grow_time: crop.growTime

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

    const coinsElement =
      document.getElementById("coins");

    let coins =
      Number(coinsElement.innerText);

    coins += 20;

    coinsElement.innerText = coins;

    // СОХРАНЯЕМ МОНЕТЫ

    await window.supabaseClient
      .from("players")
      .update({
        coins: coins
      })
      .eq("telegram_id", telegramId);

    // ОЧИЩАЕМ ГРЯДКУ

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

// ОБНОВЛЕНИЕ ТАЙМЕРОВ

setInterval(async () => {

  const tg = window.Telegram.WebApp;

  const user = tg.initDataUnsafe.user;

  if (!user) return;

  const { data } =
    await window.supabaseClient
      .from("farm_tiles")
      .select("*")
      .eq("telegram_id", user.id);

  renderFarm(data);

}, 1000);

// СТАРТ

loadFarm();
