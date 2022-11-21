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
        movie.rating = +movie.rating;
        let type = "white";
        if (movie.rating <= 7.7) {
            type = "rgba(255, 0, 0, 0.5)";
            console.log("fined")
        } else if (movie.rating < 8) {
            type = "rgba(255, 255, 0, 0.5)";
        } else if (movie.rating >= 8) {
            type = "rgba(0, 255, 0, 0.5)";
        }
        document.querySelector('.films .body').innerHTML +=
            `
        <div class="film">
            <img class="film__img" src="${movie.posterUrl}">
            
            <div class="film__body">
                <div class="film__bottom">
                    <div class="film__rating" style="background-color: ${type}">${movie.rating}</div>
                    <div class="film__year">${movie.year}</div>
                </div>
            </div>
        </div>
        `;
    });
}


window.addEventListener('scroll', function () {
    if (window.pageYOffset >= 50) {
        document.querySelector('header').style.position = 'fixed';
    } else {
        document.querySelector('header').style.position = 'relative';
        document.querySelector('.films').style.marginTop = document.querySelector('header').offsetHeight;
        console.log(document.querySelector('header').offsetHeight);
    }
})