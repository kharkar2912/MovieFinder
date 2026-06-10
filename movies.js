const baseurl = "https://api.themoviedb.org/3"
const api = "c2b2450a7d2e59a0d4e951029f99dd83"
const url = "https://api.themoviedb.org/3/movie/popular?api_key=";
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
let movieName

let pages = 1

let current = "popular"

next.addEventListener('click', () => {
    pages++;
    window.history.pushState({}, "", `?page=${pages}`);
    if(current === "popular"){
      fetchMovies();
    }else{
        getMovies()
        getByYear()
    }
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

})

prev.addEventListener("click", () => {
    if (pages > 1) {
        pages--;
        window.history.pushState({}, "", `?page=${pages}`);
  if(current === "popular"){
      fetchMovies();
    }else{
        getMovies()
        getByYear()
    }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
});




let popularMovies = []

async function fetchMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=c2b2450a7d2e59a0d4e951029f99dd83&page=${pages}`);
        const data = await response.json();
        popularMovies = data.results.slice(0, 20)
        renderUi()

    }
    catch (error) {
        console.log(error);

    }
}


fetchMovies()



function renderUi() {

    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = "";
    popularMovies.forEach(movie => {

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
                        <div class="about">Science Fiction, Adventure, Fantasy</div>
         </div>
        
        `
        movieContainer.appendChild(card)

    })



}

const searchForm = document.querySelector('.serach_form');

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const movieInput = document.querySelector('#movie_input').value
    const yearSearch = document.querySelector('#yearSearch').value
    const genre = document.querySelector('#genre').value
    movieName = movieInput.trim();
    popularMovies.length = 0
    current = "search"

    if (movieName !== "") {

        getMovies()

    } else if (movieName === "") {
        async function getByYear() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=c2b2450a7d2e59a0d4e951029f99dd83&primary_release_year=${yearSearch}&with_genres=${genre}&page=${pages}`);
                const data = await response.json();
                popularMovies = data.results.slice(0, 20)
                renderUi()
            
            }

            catch (error) {
                console.log(error);

            }
        }
        getByYear()

    }

})


// serch movie  
 async function getMovies() {
            
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c2b2450a7d2e59a0d4e951029f99dd83&query=${movieName}&page=${pages}`);
                const data = await response.json();
                popularMovies = data.results.slice(0, 20)
                renderUi()
            }
            catch (error) {
                console.log(error);

            }
        }

const yearSelect = document.getElementById('yearSearch');

for (let year = 2026; year >= 1970; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}


function openMovie(id) {
    window.location.href = `movie-details.html?id=${id}`;
}   