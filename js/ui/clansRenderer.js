const clans = [
  {
    id: 1,
    name: "Emerald Syndicate",
    level: 18,
    members: 42,
    bonus: "+12% урожай",
    description:
      "Элитный клан фермеров с высокой активностью."
  },

  {
    id: 2,
    name: "Black Harvest",
    level: 12,
    members: 31,
    bonus: "+8% рост",
    description:
      "Крупное farming-сообщество с торговым уклоном."
  },

  {
    id: 3,
    name: "Nova Farmers",
    level: 9,
    members: 18,
    bonus: "+5% монеты",
    description:
      "Новый клан для активных игроков."
  }
];

let joinedClan = null;

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

      <div class="clans-topbar">

        <div class="clans-count">
          Кланов: ${clans.length}
        </div>

        <div class="clans-season">
          Season Alpha
        </div>

      </div>

      <div class="clans-list">
        ${renderClanCards()}
      </div>

    </div>
  `;

  bindClanEvents();
}

function renderClanCards() {
  return clans.map((clan, index) => `
    <div class="clan-card">

      <div class="clan-top">

        <div>

          <div class="clan-name">
            ${clan.name}
          </div>

          <div class="clan-rank">
            TOP #${index + 1}
          </div>

        </div>

        <div class="clan-level">
          LVL ${clan.level}
        </div>

      </div>

      <div class="clan-stats">

        <div class="clan-stat">
          ${clan.members} участников
        </div>

        <div class="clan-stat">
          ${clan.bonus}
        </div>

      </div>

      <div class="clan-description">
        ${clan.description}
      </div>

      <button
        class="
          glass-btn
          emerald
          clan-action
        "
        data-id="${clan.id}"
      >
        ${
          joinedClan === clan.id
            ? "Вы участник"
            : "Вступить"
        }
      </button>

    </div>
  `).join("");
}

function bindClanEvents() {
  const buttons =
    document.querySelectorAll(".clan-action");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const clanId =
        Number(button.dataset.id);

      joinedClan = clanId;

      renderClans();
    });
  });
}
