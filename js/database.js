async function loadPlayer() {
  const tg = window.Telegram.WebApp
  const user = tg.initDataUnsafe.user

  if (!user) return

  let { data } = await supabase
    .from("players")
    .select("*")
    .eq("telegram_id", user.id)
    .single()

  if (!data) {
    const { data: newPlayer } = await supabase
      .from("players")
      .insert({
        telegram_id: user.id,
        name: user.first_name,
        coins: 500,
        level: 1,
        xp: 0
      })
      .select()
      .single()

    data = newPlayer
  }

  document.getElementById("playerName").innerText = data.name
  document.getElementById("coins").innerText = data.coins
  document.getElementById("level").innerText = data.level
}

loadPlayer()
