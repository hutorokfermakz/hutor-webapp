const shopContainer =
document.getElementById("shopItems");

function loadShop(){

  if(!shopContainer){
    return;
  }

  shopContainer.innerHTML = "";

  const player =
  window.gameState.player;

  Object.values(window.CROPS)
  .forEach(crop => {

    const locked =
    player.level <
    crop.unlockLevel;

    const div =
    document.createElement("div");

    div.className =
    "shop-card glass";

    div.innerHTML = `

      <div class="shop-top">

        <div class="shop-icon">
          ${crop.icon}
        </div>

        <div>

          <div class="shop-title">
            ${crop.name}
          </div>

          <div class="shop-time">
            ⏱ ${crop.growTime / 1000}с
          </div>

        </div>

      </div>

      <div class="shop-bottom">

        ${
          locked
          ? `
            <div class="locked-label">
              🔒 LVL ${crop.unlockLevel}
            </div>
          `
          : `
            <button
              class="buy-btn"
              onclick="buySeeds('${crop.id}')"
            >
              Купить • ${crop.seedPrice} 🪙
            </button>
          `
        }

      </div>

    `;

    shopContainer.appendChild(div);

  });

}

async function buySeeds(cropId){

  const crop =
  window.CROPS[cropId];

  const player =
  window.gameState.player;

  if(player.level < crop.unlockLevel){

    showNotification(
      "🔒 Нужен уровень " +
      crop.unlockLevel
    );

    return;
  }

  if(player.coins < crop.seedPrice){

    showNotification(
      "❌ Не хватает монет"
    );

    return;
  }

  const newCoins =
  player.coins -
  crop.seedPrice;

  await addItem(
    crop.name + " семена",
    1
  );

  await window.supabaseClient
    .from("players")
    .update({
      coins: newCoins
    })
    .eq("id", player.id);

  player.coins =
  newCoins;

  updatePlayerUI(player);

  showNotification(
    "✅ Куплены семена: " +
    crop.name
  );

}
