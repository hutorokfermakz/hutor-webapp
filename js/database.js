alert("database loaded")

const tg = window.Telegram.WebApp
tg.expand()

const supabase = window.supabaseClient

async function loadPlayer() {

  try {

    const user = tg.initDataUnsafe.user

    console.log("TG USER:", user)

    if (!user) {
      alert("Telegram user not found")
      return
    }

    let { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("telegram_id", user.id)
      .maybeSingle()

    console.log("SELECT:", data, error)

    if (!data) {

      const result = await supabase
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

      console.log("INSERT:", result)

      data = result.data[0]
    }

    document.getElementById("playerName").innerText = data.name
    document.getElementById("coins").innerText = data.coins
    document.getElementById("level").innerText = data.level

  } catch(err) {

    console.log(err)
    alert(err.message)

  }

}

loadPlayer()
