const baseurl = "https://api.themoviedb.org/3"
const api = "c2b2450a7d2e59a0d4e951029f99dd83"
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

let topRatedMovies = [];
let pages = 1;

next.addEventListener('click', () => {
    pages++;
    window.history.pushState({}, "", `?page=${pages}`);
    fetchTopRatedMovies();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

prev.addEventListener("click", () => {
    if (pages > 1) {
        pages--;
        window.history.pushState({}, "", `?page=${pages}`);
        fetchTopRatedMovies();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
});

async function fetchTopRatedMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api}&page=${pages}`);
        const data = await response.json();
        topRatedMovies = data.results.slice(0, 20);
        renderMovies();
    } catch (error) {
        console.log(error);
    }
}

function renderMovies() {
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = "";

    if (topRatedMovies.length === 0) {
        movieContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #aaa;">No movies found</p>';
        return;
    }

    topRatedMovies.forEach(movie => {
        const card = document.createElement('div')
        card.classList.add('card');

        card.innerHTML = `
         <div class="card-img-wrapper" onclick="openMovie(${movie.id})">
         <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="moviePoster" class="card-img">
         </div>
                    <div class="card-info">
                        <p>${movie.title}</p>
                        <div class="rating">
                            <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="20" height="20">
                                <path
                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    fill="#FFD700" />
                            </svg>
                            <span id="rate">${movie.vote_average}</span>
                            <span>|</span>
                            <span id="year">${movie.release_date}</span>
                        </div>
                        <div class="about">Top Rated Movie</div>
         </div>
        `
        movieContainer.appendChild(card)
    })
}

function openMovie(id) {
    window.location.href = `movie-details.html?id=${id}`;
}

fetchTopRatedMovies();
