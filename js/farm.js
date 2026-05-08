const farmBtn = document.getElementById("farmBtn")
const farmSection = document.getElementById("farmSection")

farmBtn.onclick = () => {
  farmSection.classList.toggle("show")
}

const tiles = document.querySelectorAll(".farm-tile")

tiles.forEach(tile => {

  tile.onclick = async () => {

    const tileId = tile.dataset.id

    const user = window.Telegram.WebApp.initDataUnsafe.user

    let { data } = await supabase
      .from("farm_tiles")
      .select("*")
      .eq("telegram_id", user.id)
      .eq("tile_id", tileId)
      .single()

    // ПУСТАЯ ГРЯДКА
    if (!data) {

      const now = Date.now()

      await supabase
        .from("farm_tiles")
        .insert([
          {
            telegram_id: user.id,
            tile_id: tileId,
            state: "growing",
            planted_at: now,
            grow_time: 10000
          }
        ])

      tile.innerHTML = "🌱"

      startGrowTimer(tile, tileId)

      return
    }

    // ГОТОВО
    if (data.state === "ready") {

      tile.innerHTML = "🟫"

      await supabase
        .from("farm_tiles")
        .delete()
        .eq("telegram_id", user.id)
        .eq("tile_id", tileId)

      let { data: player } = await supabase
        .from("players")
        .select("*")
        .eq("telegram_id", user.id)
        .single()

      const newCoins = player.coins + 50

      await supabase
        .from("players")
        .update({
          coins: newCoins
        })
        .eq("telegram_id", user.id)

      document.getElementById("coins").innerText = newCoins

      return
    }

  }

})

async function startGrowTimer(tile, tileId) {

  setTimeout(async () => {

    tile.innerHTML = "🌾"

    const user = window.Telegram.WebApp.initDataUnsafe.user

    await supabase
      .from("farm_tiles")
      .update({
        state: "ready"
      })
      .eq("telegram_id", user.id)
      .eq("tile_id", tileId)

  }, 10000)

}

async function loadFarm() {

  const user = window.Telegram.WebApp.initDataUnsafe.user

  let { data } = await supabase
    .from("farm_tiles")
    .select("*")
    .eq("telegram_id", user.id)

  data.forEach(tileData => {

    const tile = document.querySelector(
      `.farm-tile[data-id="${tileData.tile_id}"]`
    )

    if (!tile) return

    if (tileData.state === "growing") {

      tile.innerHTML = "🌱"

      const passed =
        Date.now() - tileData.planted_at

      const left =
        tileData.grow_time - passed

      if (left <= 0) {

        tile.innerHTML = "🌾"

      } else {

        setTimeout(async () => {

          tile.innerHTML = "🌾"

          await supabase
            .from("farm_tiles")
            .update({
              state: "ready"
            })
            .eq("telegram_id", user.id)
            .eq("tile_id", tileData.tile_id)

        }, left)

      }

    }

    if (tileData.state === "ready") {
      tile.innerHTML = "🌾"
    }

  })

}

loadFarm()
