window.updateWeather =
function() {

  const weather =
  [
    "☀️ Солнечно",
    "🌧 Дождь",
    "⛈ Шторм"
  ];

  const random =
  weather[
    Math.floor(
      Math.random() *
      weather.length
    )
  ];

  document.getElementById(
    "weatherBar"
  ).innerHTML = random;

};
