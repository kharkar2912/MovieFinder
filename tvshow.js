const baseurl = "https://api.themoviedb.org/3"
const api = "c2b2450a7d2e59a0d4e951029f99dd83"
const url ="https://api.themoviedb.org/3/tv/popular?api_key=";
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

let popularShow = [];
let pages = 1
let lastShowName = "";
let lastYear = "";
let lastGenre = "";

let current = "popular"

next.addEventListener('click', () => {
    pages++;
    window.history.pushState({}, "", `?page=${pages}`);
    if(current === "popular"){
      getShow()
    } else if(current === "search"){
        performSearch(lastShowName, lastYear, lastGenre);
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
            getShow()
        } else if(current === "search"){
            performSearch(lastShowName, lastYear, lastGenre);
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
});


async function getShow(){
    try{
        const response = await fetch(`${url}${api}&page=${pages}`);
        const data =  await response.json();
        popularShow =  data.results.slice(0,20)
        renderUi()
        
    }
    catch(error){
        console.log(error);
        
    }
}


getShow()


function renderUi(){
    const tvshowContainer = document.querySelector('.tvshow-container');
    tvshowContainer.innerHTML = ""
    
    if (popularShow.length === 0) {
        tvshowContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #aaa;">No TV shows found. Try different search criteria.</p>';
        return;
    }

    popularShow.forEach(show =>{
        const tvCard = document.createElement('div');
         tvCard.classList.add('tvCard');
        tvCard.innerHTML = `
         <div class="card-img-wrapper" onclick="openMovie(${show.id})">
  
         <img src="https://image.tmdb.org/t/p/w500/${show.poster_path}" alt="moviePoster" class="card-img">
        </div>
                    <div class="card-info">
                        <p>${show.name}</p>
                        <div class="rating">
                            <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#FFD700" /></svg>
                            <span id="rate">${show.vote_average}</span>
                            <span>|</span>
                            <span id="year">${show.first_air_date}</span>
                        </div>
                          <div class="about">Science Fiction, Adventure, Fantasy</div>
                    </div>`

     tvshowContainer.appendChild(tvCard);
    })
}

const searchForm = document.querySelector('.serach_form');

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    pages = 1;

    const showInput = document.querySelector('#show_input').value.trim();
    const year = document.querySelector('#yearSearch').value;
    const genre = document.querySelector('#genre').value;

    popularShow.length = 0;
    current = "search";

    performSearch(showInput, year, genre);
});

async function performSearch(showName, year, genreId) {
    try {
        // Store search values for pagination
        lastShowName = showName;
        lastYear = year;
        lastGenre = genreId;
        
        let url = `https://api.themoviedb.org/3/discover/tv?api_key=c2b2450a7d2e59a0d4e951029f99dd83&page=${pages}`;
        
        // Add year filter if selected (not "All year")
        if (year && year !== "All year") {
            url += `&first_air_date_year=${year}`;
        }
        
        // Add genre filter if selected
        if (genreId && genreId !== "") {
            url += `&with_genres=${genreId}`;
        }
        
        // If show name is provided, search by name
        if (showName !== "") {
            url = `https://api.themoviedb.org/3/search/tv?api_key=c2b2450a7d2e59a0d4e951029f99dd83&query=${encodeURIComponent(showName)}&page=${pages}`;
            // Add year filter to name search if selected
            if (year && year !== "All year") {
                url += `&first_air_date_year=${year}`;
            }
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            popularShow = data.results.slice(0, 20);
        } else {
            popularShow = [];
        }
        
        renderUi();
        
    } catch (error) {
        console.log(error);
        popularShow = [];
        renderUi();
    }
}

//  years creating for option 

const yearSelect = document.getElementById('yearSearch');

for (let year = 2026; year >= 1970; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}

function openMovie(id) {
    window.location.href = `tvShow-detail.html?id=${id}`;
}   

