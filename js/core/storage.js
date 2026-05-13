/* =========================================
   STORAGE SYSTEM
========================================= */

const STORAGE_KEY =
    "hutorok_save";

/* SAVE GAME */

export function saveGame(data) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}

/* LOAD GAME */

export function loadGame() {

    const save =
        localStorage.getItem(STORAGE_KEY);

    if (!save) {

        return null;

    }

    try {

        return JSON.parse(save);

    } catch {

        return null;

    }

}

/* CLEAR SAVE */

export function clearSave() {

    localStorage.removeItem(
        STORAGE_KEY
    );

}
