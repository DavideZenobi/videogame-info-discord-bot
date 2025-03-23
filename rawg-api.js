const API_URL = 'https://api.rawg.io/api/games/';
const RAWG_API_TOKEN = process.env.RAWG_API_TOKEN;

function queryGame(gameName) {
    return fetch(API_URL + `${gameName}` + `?key=${RAWG_API_TOKEN}`)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => console.error(error));
}