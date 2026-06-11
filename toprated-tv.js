const baseurl = "https://api.themoviedb.org/3"
const api = "c2b2450a7d2e59a0d4e951029f99dd83"
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

let topRatedShows = [];
let pages = 1;

next.addEventListener('click', () => {
    pages++;
    window.history.pushState({}, "", `?page=${pages}`);
    fetchTopRatedShows();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

prev.addEventListener("click", () => {
    if (pages > 1) {
        pages--;
        window.history.pushState({}, "", `?page=${pages}`);
        fetchTopRatedShows();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
});

async function fetchTopRatedShows() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${api}&page=${pages}`);
        const data = await response.json();
        topRatedShows = data.results.slice(0, 20);
        renderShows();
    } catch (error) {
        console.log(error);
    }
}

function renderShows() {
    const showContainer = document.querySelector('.tvshow-container');
    showContainer.innerHTML = "";

    if (topRatedShows.length === 0) {
        showContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #aaa;">No TV shows found</p>';
        return;
    }

    topRatedShows.forEach(show => {
        const card = document.createElement('div')
        card.classList.add('tvCard');

        card.innerHTML = `
         <div class="card-img-wrapper" onclick="openShow(${show.id})">
         <img src="https://image.tmdb.org/t/p/w500/${show.poster_path}" alt="tvPoster" class="card-img">
         </div>
                    <div class="card-info">
                        <p>${show.name}</p>
                        <div class="rating">
                            <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="20" height="20">
                                <path
                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                    fill="#FFD700" />
                            </svg>
                            <span id="rate">${show.vote_average}</span>
                            <span>|</span>
                            <span id="year">${show.first_air_date}</span>
                        </div>
                        <div class="about">Top Rated TV Show</div>
         </div>
        `
        showContainer.appendChild(card)
    })
}

function openShow(id) {
    window.location.href = `tvshow-detail.html?id=${id}`;
}

fetchTopRatedShows();
