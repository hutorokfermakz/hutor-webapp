const tg = window.Telegram.WebApp
tg.expand()

async function loadPlayer() {

  const user = tg.initDataUnsafe.user

  if (!user) {
    alert("Telegram user not found")
    return
  }

  console.log(user)

  let { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("telegram_id", user.id)
    .single()

  console.log(data, error)

  if (!data) {

    const { data: newPlayer, error: insertError } = await supabase
      .from("players")
      .insert([
        {
          telegram_id: user.id,
          name: user.first_name,
          coins: 500,
          level: 1,
          xp: 0
        }
      ])
      .select()

    console.log(newPlayer, insertError)

    data = newPlayer[0]
  }

  document.getElementById("playerName").innerText = data.name
  document.getElementById("coins").innerText = data.coins
  document.getElementById("level").innerText = data.level
}

loadPlayer()
