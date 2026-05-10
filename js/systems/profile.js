window.createPlayer =
function() {

  return {

    telegram_id:
      tg.initDataUnsafe.user?.id || 0,

    username:
      tg.initDataUnsafe.user?.first_name || "Игрок",

    coins:
      CONFIG.START_COINS,

    level:
      CONFIG.START_LEVEL,

    xp: 0

  };

};
