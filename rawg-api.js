import "dotenv/config";

const API_URL = 'https://api.rawg.io/api/games/';
const RAWG_API_TOKEN = process.env.RAWG_API_TOKEN;

export async function getGamesByString(input) {
    //console.log("hola");
    const params = new URLSearchParams({
        key: RAWG_API_TOKEN,
        search: input,
        page: 1,
        page_size: 10,
    });

    try {
        const response = await fetch(API_URL + params);
        const data = await response.json();
        console.log(data);
        return data.results;
    } catch (error) {
        return console.error(error);
    }
}


function queryGame(gameName) {
    return fetch(API_URL + `${gameName}` + `?key=${RAWG_API_TOKEN}`)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => console.error(error));
}

async function query() {
    try {
        const response = await fetch(API_URL + `2` + `?key=${RAWG_API_TOKEN}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        return console.error(error);
    }
}