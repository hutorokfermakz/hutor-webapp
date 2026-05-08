window.Auth = {

  async login() {

    const tg = window.Telegram.WebApp;

    const user = tg.initDataUnsafe.user;

    if (!user) {
      alert("Telegram user not found");
      return;
    }

    let player = await DB.getPlayer(user.id);

    if (!player) {

      player = {
        telegram_id: user.id,
        name: user.first_name,
        coins: 500,
        level: 1,
        xp: 0
      };

      await DB.createPlayer(player);
    }

    window.PLAYER = player;

    console.log("PLAYER:", player);
  }

};

Auth.login();
