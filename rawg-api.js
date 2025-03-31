require('dotenv').config();

const API_URL = 'https://api.rawg.io/api/games/';
const RAWG_API_TOKEN = process.env.RAWG_API_TOKEN;

console.log(getGamesByString("world of warcraft"));

function getGamesByString(input) {
    const params = new URLSearchParams({
        key: API_URL,
        search: input,
        page: 1,
        page_size: 10,
    });

    return fetch(API_URL + params)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => console.error(error));
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