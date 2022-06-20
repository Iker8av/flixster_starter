const imageBaseUrl = 'https://image.tmdb.org/t/p'
let forRange = 10;
let movieCards = document.getElementsByClassName("movie-card");

const searchInput = document.querySelector(".search-input")
const searchInfo = document.querySelector(".searchInfo")
const searchRequest = document.querySelector(".searchRequest")
const showMoreButton = document.querySelector(".load-more-movies-btn")

const getData = async () => {
    console.log('getData')
    let res = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=3569880a85d6d569cc2dad2e4ce9a58c");
    let data = await res.json()
    console.log(data)
    return data.results
}

async function showMovies() {
    console.log('showMovies')
    const gridEl = document.getElementById("movies-grid")

    moviesList = await getData()
    gridEl.innerHTML = ``

    for (let i = 0; i < forRange; i++)  {
        gridEl.innerHTML += `
    <article class="movie-card">
        <img class="movie-poster" src="${imageBaseUrl}/w342${moviesList[i].poster_path}" alt="${moviesList[i].title}" title="${moviesList[i].title}">
        <div>
            <p class="movie-title">${moviesList[i].title}</p>
            <p>Rating: <span class="movie-votes">${moviesList[i].vote_average}</span></p>
        </div>
    </article>
    `
    }

    movieCards = document.getElementsByClassName("movie-card")

    for (let i = 0; i < movieCards.length; i++) {
        movieCards[i].addEventListener('click', function() {
            console.log('click handler')
            showDetails(moviesList[i])
        })
    }
}

async function showMore(){
    forRange += 5

    moviesList = await getData()

    if (forRange >= moviesList.length){
        forRange = moviesList.length
        showMoreButton.style.display = "none"
    }

    showMovies()
}

async function searchFilter(){
    const gridEl = document.getElementById("movies-grid")

    const newListMov = []
    moviesList = await getData()

    for (let i = 0; i < forRange; i++)  {
        const initials = moviesList[i].title.slice(0, searchInput.value.length)

        if (searchInput.value.toLowerCase() === initials.toLowerCase()){
            newListMov.push(moviesList[i])
        }
    }

    gridEl.innerHTML = ``

    for (let i = 0; i < newListMov.length; i++)  {
        gridEl.innerHTML += `
    <article class="movie-card">
        <img class="movie-poster" src="${imageBaseUrl}/w342${newListMov[i].poster_path}" alt="${newListMov[i].title}" title="${newListMov[i].title}">
        <div class="movieInfo">
            <p class="movie-title">${newListMov[i].title}</p>
            <p>Rating: <span class="movie-votes">${newListMov[i].vote_average}</span></p>
        </div>
    </article>
    `
    }

    movieCards = document.getElementsByClassName("movie-card")

    for (let i = 0; i < newListMov.length; i++) {
        movieCards[i].addEventListener('click', function() {
            console.log('click handler')
            showDetails(newListMov[i])
        })
    }
}

function enterKeyPressed(event) {
    if (event.keyCode == 13) {
        console.log("Enter key is pressed");
        searchFilter()

        searchInfo.style.display = "block"

        searchRequest.innerHTML = ``
        searchRequest.innerHTML = `Results of: <h2 class="searchRequest">"${searchInput.value}"</h2>`

        event.preventDefault()
    }
 }

 function clearSearch(){
    console.log('clearSearch')
    searchInfo.style.display = "none"
    showMovies()
 }

 function showDetails(movieInfo){
    console.log('showDetails')
    console.log(movieInfo)
    document.querySelector(".background").style.display = "block";
    document.querySelector(".movie-card-open").style.display = "block";
    document.querySelector(".movie-card-open").innerHTML +=
        `
        <div class = "movieDetails">
            <img class="movie-poster" src="${imageBaseUrl}/w342${movieInfo.poster_path}" alt="${movieInfo.title}" title="${movieInfo.title}">
            <div class="movieInfo">
                <p class="movie-title">${movieInfo.title}</p>
                <p>Rating: <span class="movie-votes">${movieInfo.vote_average}</span></p>
                <p>${movieInfo.overview}</p>
                <button class="closePopup" onclick="hideDetails()">Close</button>
            </div>
        </div>
    `
 }

 function hideDetails(){
    console.log('hideDetails')
    document.querySelector(".background").style.display = "none";
    document.querySelector(".movie-card-open").style.display = "none";
    document.querySelector(".movieDetails").remove()
 }

window.onload = function () {
    console.log('onload')
    showMovies()
}
