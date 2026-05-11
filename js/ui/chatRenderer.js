const messages = [
  {
    user: "SYSTEM",
    text: "Добро пожаловать в HUTOROK v7",
    time: "18:42",
    system: true
  },

  {
    user: "FarmerMax",
    text: "Кто продаёт морковь?",
    time: "18:43"
  },

  {
    user: "EmeraldFox",
    text: "Скоро обновление теплиц?",
    time: "18:44"
  }
];

export function renderChat() {
  const screen =
    document.getElementById("chat-screen");

  if (!screen) return;

  screen.innerHTML = `
    <div class="chat-wrapper">

      <div class="chat-header">

        <div class="chat-title">
          Глобальный чат
        </div>

        <div class="chat-subtitle">
          Общайся с игроками HUTOROK.
        </div>

        <div class="chat-online">
          <div class="chat-online-dot"></div>
          Онлайн: 248
        </div>

      </div>

      <div class="chat-messages">
        ${renderMessages()}
      </div>

      <div class="chat-input-wrapper">

        <input
          class="chat-input"
          type="text"
          placeholder="Введите сообщение..."
        />

        <button class="chat-send">
          Отправить
        </button>

      </div>

    </div>
  `;

  bindChatEvents();
}

function renderMessages() {
  return messages.map((message) => `
    <div
      class="
        chat-message
        ${message.system ? "system" : ""}
      "
    >

      <div class="chat-message-top">

        <div class="chat-user">
          ${message.user}
        </div>

        <div class="chat-time">
          ${message.time}
        </div>

      </div>

      <div class="chat-text">
        ${message.text}
      </div>

    </div>
  `).join("");
}

function bindChatEvents() {
  const sendButton =
    document.querySelector(".chat-send");

  const input =
    document.querySelector(".chat-input");

  if (!sendButton || !input) return;

  sendButton.addEventListener(
    "click",
    () => {
      sendMessage();
    }
  );

  input.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        sendMessage();
      }
    }
  );

  function sendMessage() {
    const text =
      input.value.trim();

    if (!text) return;

    messages.push({
      user: "YOU",
      text,
      time: getCurrentTime()
    });

    input.value = "";

    renderChat();

    scrollToBottom();
  }
}

function scrollToBottom() {
  const container =
    document.querySelector(".chat-messages");

  if (!container) return;

  container.scrollTop =
    container.scrollHeight;
}

function getCurrentTime() {
  const date = new Date();

  return `${String(date.getHours())
    .padStart(2, "0")}:${String(date.getMinutes())
    .padStart(2, "0")}`;
}
