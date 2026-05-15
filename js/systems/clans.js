/* =========================================
   SUPABASE
========================================= */

import { supabase }
from "../core/supabase.js";

/* =========================================
   LOAD CLANS
========================================= */

export async function loadClans() {

    const clansList =
        document.getElementById("clans-list");

    if (!clansList) return;

    clansList.innerHTML =
        `<div class="loading-text">
            Загрузка кланов...
        </div>`;

    const { data, error } =
        await supabase
            .from("clans")
            .select("*")
            .order("power", {
                ascending: false
            });

    if (error) {

        clansList.innerHTML =
            `
                <div class="loading-text">
                    Ошибка загрузки
                </div>
            `;

        return;

    }

    if (!data || data.length === 0) {

        clansList.innerHTML =
            `
                <div class="loading-text">
                    Кланы отсутствуют
                </div>
            `;

        return;

    }

    clansList.innerHTML = "";

    data.forEach(clan => {

        const card =
            document.createElement("div");

        card.className =
            "clan-card";

        card.innerHTML = `

            <div class="clan-top">

                <div>

                    <h3>
                        ${clan.name}
                    </h3>

                    <span class="clan-tag">
                        [${clan.tag || "TAG"}]
                    </span>

                </div>

                <div class="clan-level">
                    LVL ${clan.level}
                </div>

            </div>

            <p class="clan-description">
                ${clan.description || "Нет описания"}
            </p>

            <div class="clan-stats">

                <div>
                    ⚡ ${clan.power}
                </div>

            </div>

            <button
                class="join-clan-btn"
                data-clan="${clan.id}"
            >
                Вступить
            </button>

        `;

        clansList.appendChild(card);

    });

}

/* =========================================
   CREATE CLAN
========================================= */

export async function createClan(
    name,
    tag,
    description
) {

    const { error } =
        await supabase
            .from("clans")
            .insert({

                name,
                tag,
                description,
                level: 1,
                power: 0

            });

    if (error) {

        alert("Ошибка создания");

        return;

    }

    await loadClans();

}
