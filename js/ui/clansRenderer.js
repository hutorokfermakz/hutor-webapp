export function renderClans() {

  const screen =
    document.getElementById("clans-screen");

  if (!screen) return;

  screen.innerHTML = `
    <div class="clans-wrapper">

      <div class="clans-header">

        <div class="clans-title">
          Кланы
        </div>

        <div class="clans-subtitle">
          Объединяйся с другими игроками.
        </div>

      </div>

      <div class="clans-season">
        Season Alpha
      </div>

      <div class="clans-grid">

        <div class="clan-card">

          <div class="clan-rank">
            TOP #1
          </div>

          <div class="clan-name">
            Emerald Syndicate
          </div>

          <div class="clan-level">
            LVL 18
          </div>

          <div class="clan-members">
            42 участников
          </div>

          <div class="clan-bonus">
            +12% урожай
          </div>

          <div class="clan-description">
            Элитный клан фермеров
            с высокой активностью.
          </div>

          <button class="clan-join-btn">
            Вступить
          </button>

        </div>

        <div class="clan-card">

          <div class="clan-rank">
            TOP #2
          </div>

          <div class="clan-name">
            Black Harvest
          </div>

          <div class="clan-level">
            LVL 12
          </div>

          <div class="clan-members">
            31 участников
          </div>

          <div class="clan-bonus">
            +8% рост
          </div>

          <div class="clan-description">
            Крупное farming-сообщество
            с торговым уклоном.
          </div>

          <button class="clan-join-btn">
            Вступить
          </button>

        </div>

        <div class="clan-card">

          <div class="clan-rank">
            TOP #3
          </div>

          <div class="clan-name">
            Nova Farmers
          </div>

          <div class="clan-level">
            LVL 9
          </div>

          <div class="clan-members">
            18 участников
          </div>

          <div class="clan-bonus">
            +5% монеты
          </div>

          <div class="clan-description">
            Новый клан
            для активных игроков.
          </div>

          <button class="clan-join-btn">
            Вступить
          </button>

        </div>

      </div>

    </div>
  `;
}
