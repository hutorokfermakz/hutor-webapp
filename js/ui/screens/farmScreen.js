export function renderFarmScreen() {
  return `
    <main class="screen farm-screen">

      <h1 class="farm-title">
        HUTOROK
      </h1>

      <p class="farm-subtitle">
        Premium cinematic farming MMO
      </p>

      <section class="hero-card glass">
        <span>Баланс</span>

        <div class="hero-value">
          25 000
        </div>
      </section>

      <section class="plot-grid">

        <div class="plot glass">
          <div class="plot-name">
            Картофель
          </div>

          <div class="plot-time">
            12м
          </div>
        </div>

        <div class="plot glass">
          <div class="plot-name">
            Морковь
          </div>

          <div class="plot-time">
            7м
          </div>
        </div>

        <div class="plot glass">
          <div class="plot-name">
            Клубника
          </div>

          <div class="plot-time">
            28м
          </div>
        </div>

        <div class="plot glass">
          <div class="plot-name">
            Кукуруза
          </div>

          <div class="plot-time">
            1ч
          </div>
        </div>

      </section>

    </main>
  `;
}
