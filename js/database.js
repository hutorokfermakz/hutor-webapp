const tg = window.Telegram.WebApp
tg.expand()

async function loadPlayer() {

  try {

    const user = tg.initDataUnsafe.user

    console.log("USER:", user)

    if (!user) {
      alert("Telegram user not found")
      return
    }

    const { data, error } = await window.supabaseClient
      .from("players")
      .select("*")
      .eq("telegram_id", user.id)

    console.log("SELECT:", data)
    console.log("SELECT ERROR:", error)

    if (!data || data.length === 0) {

      const { data: newPlayer, error: insertError } =
        await window.supabaseClient
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

      console.log("INSERT:", newPlayer)
      console.log("INSERT ERROR:", insertError)

    }

  } catch (e) {
    console.log("FULL ERROR:", e)
  }

}

loadPlayer()
