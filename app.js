const tg = window.Telegram.WebApp;

tg.expand();

console.log("APP START");

const SUPABASE_URL =
"https://gihybzpefojxiyyxheks.supabase.co";

const SUPABASE_KEY =
"sb_publishable_epzMrCasnlXMmAENesXgTw_dkRzwBag";

const user = tg.initDataUnsafe.user || {};

const telegramId = user.id || Math.floor(Math.random() * 999999);

async function loadPlayer() {

    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/players?telegram_id=eq.${telegramId}`,
            {
                headers:{
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`
                }
            }
        );

        const data = await response.json();

        console.log(data);

        if(data.length > 0){

            const player = data[0];

            document.getElementById("playerName").innerText =
                player.name || "Фермер";

            document.getElementById("money").innerText =
                player.money || 500;

            document.getElementById("stars").innerText =
                player.stars || 0;

        } else {

            createPlayer();

        }

    } catch(err){

        console.error(err);

    }

}

async function createPlayer(){

    try{

        await fetch(
            `${SUPABASE_URL}/rest/v1/players`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    apikey: SUPABASE_KEY,
                    Authorization:`Bearer ${SUPABASE_KEY}`
                },
                body:JSON.stringify({
                    telegram_id:String(telegramId),
                    name:"Фермер",
                    money:500,
                    stars:0,
                    level:1,
                    xp:0
                })
            }
        );

        console.log("PLAYER CREATED");

    } catch(err){

        console.error(err);

    }

}

document.getElementById("farmBtn").onclick = () => {

    tg.HapticFeedback.notificationOccurred("success");

    let money =
        parseInt(document.getElementById("money").innerText);

    money += 50;

    document.getElementById("money").innerText = money;

};

document.getElementById("shopBtn").onclick = () => {

    alert("🛒 Магазин скоро откроется");

};

document.getElementById("clanBtn").onclick = () => {

    alert("🛡 Кланы скоро откроются");

};

document.getElementById("caseBtn").onclick = () => {

    alert("🎁 Кейсы скоро откроются");

};

loadPlayer();
