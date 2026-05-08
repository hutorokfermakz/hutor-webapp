let coins = 0;

const coinsText = document.getElementById("coins");
const farmBtn = document.getElementById("farmBtn");

farmBtn.onclick = () => {
  coins += 10;
  coinsText.innerText = coins + " монет";
};
