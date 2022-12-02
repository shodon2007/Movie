const API_KEY = "43437f96-2c13-4cae-af86-96ad63fbf88f";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";



getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": 'application/json',
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();

    respData.films.forEach(movie => {
        let rating = showRating(+movie.rating);

        renderMovies(movie, rating)
    });
}

function showRating(rating) {
    if (rating <= 7.7) {
        return "rgba(255, 0, 0, 0.5)";
    } else if (rating < 8) {
        return "rgba(255, 255, 0, 0.5)";
    } else if (rating >= 8) {
        return "rgba(0, 255, 0, 0.5)";
    }
}

function renderMovies(movie, rating) {
    document.querySelector('.films .body').innerHTML +=
        `
        <div class="film">
            <img class="film__img" src="${movie.posterUrl}">
            
            <div class="film__body">
                <div class="film__bottom">
                    <div class="film__rating" style="background-color: ${rating}">${movie.rating}</div>
                    <div class="film__year">${movie.year}</div>
                </div>
            </div>
        </div>
        `;
}

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');

    if (window.pageYOffset >= header.offsetHeight) {
        header.style.position = 'fixed';
    } else {
        header.style.position = 'relative';
    }
});