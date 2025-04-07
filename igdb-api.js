import "dotenv/config";

const IGDB_BASE_API_URL = "https://api.igdb.com/v4/games";
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const API_TOKEN = process.env.IGDB_ACCESS_API_TOKEN;


export async function getGame() {
    try {
        const response = await fetch(IGDB_BASE_API_URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Client-ID": `${CLIENT_ID}`,
                "Authorization": `Bearer ${API_TOKEN}`
            },
            body: `
                fields game_type, genres, name;
                limit 1;
                where id=984;
            `
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        return console.error(error);
    }
}