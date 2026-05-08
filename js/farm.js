const tiles = document.querySelectorAll(".farm-tile")

tiles.forEach(tile => {

  tile.addEventListener("click", async () => {

    const tileIndex = tile.dataset.tile

    console.log("Tile:", tileIndex)

    tile.innerHTML = "🌾"

  })

})
