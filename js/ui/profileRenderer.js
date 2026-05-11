import { state }
from "../core/state.js";

export function renderProfile() {

  const screen =
    document.getElementById("profile-screen");

  if (!screen) return;

  screen.innerHTML = `
    <div class="profile-wrapper">

      <div class="profile-header">

        <div class="profile-title">
          Профиль
        </div>

        <div class="profile-subtitle">
          Ваш игровой прогресс в HUTOROK.
        </div>

      </div>

      <div class="player-card">

        <div class="player-top">

          <div class="player-avatar">
            H7
          </div>

          <div class="player-info">

            <div class="player-name">
              Farmer
            </div>

            <div class="player-title">
              Master Farmer
            </div>

          </div>

        </div>

        <div class="player-xp">

          <div class="player-level">

            <div>
              Уровень ${state.player.level}
            </div>

            <div>
              ${state.player.xp}/100 XP
            </div>

          </div>

          <div class="player-xp-bar">
            <div
              class="player-xp-fill"
              style="
                width:
                ${state.player.xp}%;
              "
            ></div>
          </div>

        </div>

      </div>

      <div class="profile-stats">

        <div class="profile-stat">

          <div class="profile-stat-label">
            Монеты
          </div>

          <div class="profile-stat-value">
            ${state.player.coins}
          </div>

        </div>

        <div class="profile-stat">

          <div class="profile-stat-label">
            Уровень
          </div>

          <div class="profile-stat-value">
            ${state.player.level}
          </div>

        </div>

        <div class="profile-stat">

          <div class="profile-stat-label">
            Клан
          </div>

          <div class="profile-stat-value">
            Emerald
          </div>

        </div>

        <div class="profile-stat">

          <div class="profile-stat-label">
            Урожай
          </div>

          <div class="profile-stat-value">
            248
          </div>

        </div>

      </div>

      <div class="profile-achievements">

        <div class="profile-achievements-title">
          Достижения
        </div>

        <div class="achievement-list">

          <div class="achievement">
            First Harvest
          </div>

          <div class="achievement">
            Emerald Farmer
          </div>

          <div class="achievement">
            Clan Member
          </div>

        </div>

      </div>

    </div>
  `;
}
