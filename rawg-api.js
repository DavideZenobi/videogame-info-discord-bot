import "dotenv/config";

const API_GAMES_SEARCH_URL = 'https://api.rawg.io/api/games?';
const API_GAME_INFO_URL = "https://api.rawg.io/api/games/";
const RAWG_API_TOKEN = process.env.RAWG_API_TOKEN;

export async function getGamesByString(input) {
    const params = new URLSearchParams({
        key: RAWG_API_TOKEN,
        search: input,
        //page: 1,
        //page_size: 10,
    });

    try {
        const response = await fetch(API_GAMES_SEARCH_URL + params);
        const data = await response.json();
        return data.results;
    } catch (error) {
        return console.error(error);
    }
}

export async function getGame(gameName) {
    const params = new URLSearchParams({
        key: RAWG_API_TOKEN,
    });

    try {
        const response = await fetch(API_GAME_INFO_URL + gameName + "?" + params);
        const data = await response.json();
        return data;
    } catch (error) {
        return console.error(error);
    }
}