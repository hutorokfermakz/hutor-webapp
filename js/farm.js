const farmTiles = document.querySelectorAll(".farm-tile")

farmTiles.forEach(tile => {

  tile.addEventListener("click", async () => {

    if (tile.innerText !== "🟫") return

    tile.innerText = "🌱"

    setTimeout(() => {
      tile.innerText = "🌾"
    }, 10000)

  })

})
