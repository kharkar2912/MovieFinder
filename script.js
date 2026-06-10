const trendingUrl ="https://api.themoviedb.org/3/trending/movie/day?api_key=c2b2450a7d2e59a0d4e951029f99dd83";
const topRatedUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=c2b2450a7d2e59a0d4e951029f99dd83";
const popularUrl = "https://api.themoviedb.org/3/movie/popular?api_key=c2b2450a7d2e59a0d4e951029f99dd83";
const imageUrl = "https://image.tmdb.org/t/p/original";

let topMovies = [];
let topRated = [];
let popularMovies = [];
let teaser = []


async function getMovie() {
  try {
    const response = await fetch(trendingUrl);
    const data = await response.json();

    topMovies = data.results.slice(0, 20);

    renderUI();     
  } catch (error) {
    console.log(error);
  }
}

async function getTopRated() {
  try {
    const response = await fetch(topRatedUrl);
    const data = await response.json();

    topRated = data.results.slice(0, 20);

    renderTopRated();     
  } catch (error) {
    console.log(error);
  }
}

async function getPopular() {
  try {
    const response = await fetch(popularUrl);
    const data = await response.json();

    popularMovies = data.results.slice(0, 20);

    renderPopular();     
  } catch (error) {
    console.log(error);
  }
}

getMovie();
getTopRated();
getPopular();


function renderUI() {
  
  const heroSlider = document.querySelector(".hero-slider");  
  heroSlider.innerHTML = `
      <button class="btn prev">&#10094;</button>
      <button class="btn next">&#10095;</button>
  `

  topMovies.forEach((movie, index) => {
    getTrailer(movie.id); 

    const slide = document.createElement("div");
    slide.classList.add("slide");

    if (index === 0) {
      slide.classList.add("active");
    }

    slide.style.backgroundImage =
      `url(${imageUrl}${movie.backdrop_path})`;

    slide.innerHTML = `
    
    <div class="movie-title">
        <p id="trending">Trending Now 🔥</p>
        <h1 id="title"  onclick="openMovie(${movie.id})">${movie.title}</h1>
        <ul class="years">
            <li class="star"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                    fill="#fbff00" stroke="#fbff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-star-icon lucide-star">
                    <path
                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg><span id="rateing">${movie.vote_average}</span></li>
            <li>|</li>
            <li id="year"> ${new Date(movie.release_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}</li>
            
            <li>|</li>
            <li id="hours">2h 32m</li>
        </ul>
        <p id="movie-disc">${movie.overview}</p>
        <div class="buttons">
            <button id="trailer" onclick="watchTrailer(${movie.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-play-icon lucide-play">
                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
                Watch Trailer
            </button>
            <button id="mylist">
                <p style="font-size: 32px;">+</p>
                <p>My List</p>
            </button>
        </div>
    </div> 
    `;

    
    heroSlider.appendChild(slide);
  });



   const card_list = document.querySelector('.card_list');

    topMovies.forEach((movie, index) => {

      const card_itam = document.createElement('div')
      card_itam.classList.add('card_itam')


      card_itam.innerHTML = `
      <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" id="card-image" onclick="openMovie(${movie.id})">
                        <div class="movie-detail">
                            <h4 id="movie_name">${movie.title}</h4>
                            <div class="below">
                                <p id="movie-rating">⭐${movie.vote_average}</p>
                                <p class="Realseyear">${movie.release_date}</p>
                            </div>
                        </div>
      `
    card_list.appendChild(card_itam)  
    })

  startSlider();

}



async function getTrailer(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=c2b2450a7d2e59a0d4e951029f99dd83`
    );

    const data = await response.json();

    let selectedVideo = data.results.find(
      video => video.type === "Trailer" && video.site === "YouTube"
    );

    if (!selectedVideo) {
      selectedVideo = data.results.find(
        video => video.type === "Teaser" && video.site === "YouTube"
      );
    }

    if (selectedVideo) {
      return `https://www.youtube.com/watch?v=${selectedVideo.key}`;
    }

    return null;

  } catch (error) {
    console.log(error);
    return null;
  }
}


function renderTopRated() {
  const topCardList = document.querySelector('.top_card_list');

  topRated.forEach((movie) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card_itam');

    cardItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" id="card-image" onclick="openMovie(${movie.id})">
      <div class="movie-detail">
        <h4 id="movie_name">${movie.title}</h4>
        <div class="below">
          <p id="movie-rating">⭐${movie.vote_average}</p>
          <p class="Realseyear">${movie.release_date}</p>
        </div>
      </div>
    `;
    topCardList.appendChild(cardItem);
  });
}

function renderPopular() {
  const popularCardList = document.querySelector('.popular_card_list');

  popularMovies.forEach((movie) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card_itam');

    cardItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" id="card-image" onclick="openMovie(${movie.id})">
      <div class="movie-detail">
        <h4 id="movie_name">${movie.title}</h4>
        <div class="below">
          <p id="movie-rating">⭐${movie.vote_average}</p>
          <p class="Realseyear">${movie.release_date}</p>
        </div>
      </div>
    `;
    popularCardList.appendChild(cardItem);
  });
}

function openMovie(id) {
    window.location.href = `movie-details.html?id=${id}`;
}

function startSlider() {
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let current = 0;

  function showSlide(index) {
    slides.forEach((slide) =>
      slide.classList.remove("active")
    );

    slides[index].classList.add("active");
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  setInterval(nextSlide, 5000);
}   

async function watchTrailer(movieId) {
  const trailerUrl = await getTrailer(movieId);

  if (trailerUrl) {
    window.open(trailerUrl, "_blank");
  } else {
    alert("Trailer not available");
  }
}

function searchMovie(query) {
    window.location.href =
        `movies.html?search=${encodeURIComponent(query)}`;
}