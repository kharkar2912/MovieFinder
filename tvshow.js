const baseurl = "https://api.themoviedb.org/3"
const api = "c2b2450a7d2e59a0d4e951029f99dd83"
const url ="https://api.themoviedb.org/3/movie/popular?api_key=";

let popularShow = [];

async function getShow(){
    try{
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=c2b2450a7d2e59a0d4e951029f99dd83`);
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
    console.log(popularShow);
    

    const tvshowContainer = document.querySelector('.tvshow-container');

    

    popularShow.forEach(show =>{
        const tvCard = document.createElement('div');
         tvCard.classList.add('tvCard');
        tvCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${show.poster_path}" alt="moviePoster">
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