const inventoryPage =
document.getElementById(
  "inventoryPage"
);

async function loadInventory(){

  const player =
  window.gameState.player;

  if(!player){
    return;
  }

  let { data: items } =
  await window.supabaseClient
    .from("inventory")
    .select("*")
    .eq("player_id", player.id);

  renderInventory(items || []);
}

function renderInventory(items){

  inventoryPage.innerHTML = `

    <div class="section-title">
      🎒 Инвентарь
    </div>

    <div id="inventoryList"></div>

  `;

  const list =
  document.getElementById(
    "inventoryList"
  );

  // EMPTY

  if(items.length === 0){

    list.innerHTML = `

      <div class="glass card">
        Инвентарь пуст
      </div>

    `;

    return;
  }

  // ITEMS

  items.forEach(item => {

    const card =
    document.createElement("div");

    card.className =
    "glass inventory-card";

    card.innerHTML = `

      <div class="inventory-left">

        <div class="inventory-icon">
          🌾
        </div>

        <div>

          <div class="inventory-name">
            ${item.item}
          </div>

          <div class="inventory-count">
            Количество:
            ${item.amount}
          </div>

        </div>

      </div>

      <button
        class="sell-btn"
        onclick="sellItem('${item.item}')"
      >
        Продать
      </button>

    `;

    list.appendChild(card);

  });

}

async function addItem(itemName, amount){

  const player =
  window.gameState.player;

  let { data: existing } =
  await window.supabaseClient
    .from("inventory")
    .select("*")
    .eq("player_id", player.id)
    .eq("item", itemName)
    .single();

  // UPDATE

  if(existing){

    await window.supabaseClient
      .from("inventory")
      .update({
        amount:
          existing.amount + amount
      })
      .eq("id", existing.id);

  }else{

    // CREATE

    await window.supabaseClient
      .from("inventory")
      .insert({
        player_id: player.id,
        item: itemName,
        amount: amount
      });

  }

  loadInventory();
}

async function sellItem(itemName){

  const player =
  window.gameState.player;

  let { data: item } =
  await window.supabaseClient
    .from("inventory")
    .select("*")
    .eq("player_id", player.id)
    .eq("item", itemName)
    .single();

  if(!item){
    return;
  }

  // PRICE

  const sellPrice =
  item.amount * 15;

  // DELETE ITEM

  await window.supabaseClient
    .from("inventory")
    .delete()
    .eq("id", item.id);

  // UPDATE PLAYER

  const newCoins =
  player.coins + sellPrice;

  await window.supabaseClient
    .from("players")
    .update({
      coins: newCoins
    })
    .eq("id", player.id);

  player.coins =
  newCoins;

  updatePlayerUI(player);

  loadInventory();
}
