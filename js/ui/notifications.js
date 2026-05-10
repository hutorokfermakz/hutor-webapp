function showNotification(text){

  const div =
  document.createElement("div");

  div.className =
  "game-notification";

  div.innerText = text;

  document.body.appendChild(div);

  setTimeout(()=>{

    div.classList.add("show");

  },100);

  setTimeout(()=>{

    div.classList.remove("show");

    setTimeout(()=>{

      div.remove();

    },300);

  },2500);

}
