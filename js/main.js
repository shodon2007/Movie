const API_KEY = "43437f96-2c13-4cae-af86-96ad63fbf88f";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
let page = 1;
let maxPages;
let URL = ``;
let searched = false;
let searchValue = '';

function setUrl() {
    URL = searched == false
        ? `${API_URL_POPULAR}&page=${page}`
        : `${API_URL_SEARCH}${searchValue}&page=${page}`;
}
setUrl();

getMovies(URL);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": 'application/json',
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    maxPages = respData.pagesCount;

    respData.films.forEach(movie => {
        let rating = showRating(+movie.rating);

        renderMovies(movie, rating)
    });
    ++page;
    allowed = true;
}





function showRating(rating) {
    if (rating <= 7.7) {
        return "rgba(255, 0, 0, 1)";
    } else if (rating < 8) {
        return "rgba(255, 255, 0, 1)";
    } else if (rating >= 8) {
        return "rgba(0, 255, 0, 1)";
    }
}


function renderMovies(movie, rating) {
    console.log(movie);
    document.querySelector('.films .body').innerHTML +=
        `
        <div class="film">
            <img class="film__img" src="${movie.posterUrl}">
            
            <div class="film__body">
                <div class="film__bottom" style="border: 3px solid ${rating}">
                    <div class="film__rating">${movie.rating}</div>
                    <div class="film__year">${movie.year}</div>
                </div>
            </div>
        </div>
        `;
}




let allowed = true;

window.addEventListener('scroll', function () {
    if ((document.querySelector('body').offsetHeight - window.innerHeight - 100 <= window.pageYOffset) && allowed == true) {
        if (page <= maxPages) {
            allowed = false;
            setUrl();
            console.log(page);
            getMovies(URL);
        }
    }
});




const form = document.querySelector(".header__search");
const searchButton = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    searched = true;
    page = 1;
    searchValue = searchInput.value;
    setUrl();
    getMovies(URL);
    console.log(document.querySelector('body').offsetHeight);
    document.querySelector('.films .body').innerHTML = "";
    getMovies(apiSearchUrl);
    searchInput.value = '';
})