import "dotenv/config";

const IGDB_BASE_API_URL = "https://api.igdb.com/v4/games";
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const API_TOKEN = process.env.IGDB_ACCESS_API_TOKEN;

// Query para sacar información de un juego en concreto
export async function getGameById(id) {
    try {
        const response = await fetch(IGDB_BASE_API_URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Client-ID": `${CLIENT_ID}`,
                "Authorization": `Bearer ${API_TOKEN}`
            },
            body: `
                fields game_type, genres, name, summary, slug;
                limit 1;
                where id = ${id};
            `
        });
        const data = await response.json();
        console.log(data);
        return data[0];
    } catch (error) {
        return console.error(error);
    }
}

export async function getGameByName(gameName) {
    try {
        const response = await fetch(IGDB_BASE_API_URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Client-ID": `${CLIENT_ID}`,
                "Authorization": `Bearer ${API_TOKEN}`
            },
            body: `
                fields game_type, genres, name, summary, slug;
                limit 1;
                where name = "${gameName}";
            `
        });
        const data = await response.json();
        console.log(data);
        return data[0];
    } catch (error) {
        return console.error(error);
    }
}

export async function getGamesForAutocomplete(input) {
    try {
        const response = await fetch(IGDB_BASE_API_URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Client-ID": `${CLIENT_ID}`,
                "Authorization": `Bearer ${API_TOKEN}`
            },
            body: `
                fields name;
                where name ~ *"${input}"*;
                limit 25;
            `
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return console.error(error);
    }
}