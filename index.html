const farmTiles = document.querySelectorAll(".farm-tile");

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

  const { data, error } = await window.supabaseClient
    .from("farm_tiles")
    .select("*")
    .eq("telegram_id", telegramId);

  if (error) {
    console.error(error);
    return;
  }

  // если грядок нет — создаём
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
    const tileElement = document.querySelector(
      `.farm-tile[data-id="${tile.tile_id}"]`
    );

    if (!tileElement) return;

    updateTile(tileElement, tile);

    tileElement.onclick = async () => {
      await handleTileClick(tile);
    };
  });
}

function updateTile(element, tile) {
  const now = Date.now();

  if (tile.state === "empty") {
    element.innerHTML = "🟫";
    return;
  }

  const finish = tile.planted_at + tile.grow_time;

  if (now >= finish) {
    element.innerHTML = "🌾";
  } else {
    element.innerHTML = "🌱";
  }
}

async function handleTileClick(tile) {
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe.user;

  const telegramId = user.id;

  // пустая грядка → посадка
  if (tile.state === "empty") {
    const crop = CROPS.wheat;

    const plantedAt = Date.now();

    await window.supabaseClient
      .from("farm_tiles")
      .update({
        state: "growing",
        planted_at: plantedAt,
        grow_time: crop.growTime
      })
      .eq("telegram_id", telegramId)
      .eq("tile_id", tile.tile_id);

    loadFarm();
    return;
  }

  // сбор
  const finish = tile.planted_at + tile.grow_time;

  if (Date.now() >= finish) {
    // обновляем монеты
    const coinsElement = document.getElementById("coins");

    let coins = Number(coinsElement.innerText);
    coins += 20;

    coinsElement.innerText = coins;

    await window.supabaseClient
      .from("players")
      .update({
        coins: coins
      })
      .eq("telegram_id", telegramId);

    // очищаем грядку
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

// автообновление таймеров
setInterval(async () => {
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe.user;

  if (!user) return;

  const { data } = await window.supabaseClient
    .from("farm_tiles")
    .select("*")
    .eq("telegram_id", user.id);

  renderFarm(data);
}, 1000);

loadFarm();
