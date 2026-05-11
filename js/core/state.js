export const gameState = {

  player: {
    coins: 500,
    crystals: 0,

    level: 1,
    xp: 0,
    xpToNext: 100
  },

  farm: {
    weather: "rain",
    time: "night",

    plots: Array(8).fill(null)
  },

  inventory: {
    selectedSeed: null,

    items: [
      {
        id: "wheat_seed",
        type: "seed",
        name: "Пшеница",
        amount: 5,
        rarity: "common"
      }
    ]
  }

};
