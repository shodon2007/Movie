const API_KEY = "43437f96-2c13-4cae-af86-96ad63fbf88f";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": 'application/json',
            "X-API-KEY": API_KEY,
        }
    });
    const respData = await resp.json();

    respData.films.forEach(movie => {
        document.querySelector('.films').innerHTML +=
            `
        <div class="film">
            <div class="film__poster">
                <img src="${movie.posterUrl}">
            </div>
            <div class="film__hover"> ${movie.nameRu}</div>

        </div>
        `;
        console.log(movie)
    });
}