const imageBaseUrl = 'https://image.tmdb.org/t/p'
let forRange = 10;
let movieCards = document.getElementsByClassName("movie-card");

let searchInputValue;
const searchInput = document.querySelector(".search-input")
const searchInfo = document.querySelector(".searchInfo")
const searchRequest = document.querySelector(".searchRequest")
const showMoreButton = document.querySelector(".load-more-movies-btn")

let moviesList;

const getData = async () => {

    let res = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=3569880a85d6d569cc2dad2e4ce9a58c");
    let data = await res.json()
    // return data.results
    showMovies(data.results)
}

async function showMovies(moviesList) {
    const gridEl = document.getElementById("movies-grid")

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

            showDetails(moviesList[i])
        })
    }
}

async function showMore(){
    forRange += 5

    if (forRange >= moviesList.length){
        forRange = moviesList.length
        showMoreButton.style.display = "none"
    }
    if (searchInputValue != ""){
        showMovies(moviesList)
    }
}

async function searchFilter(){
    const gridEl = document.getElementById("movies-grid")

    searchInputValue = searchInput.value
    const url = `https://api.themoviedb.org/3/search/movie?api_key=3569880a85d6d569cc2dad2e4ce9a58c&query=${searchInputValue}`
    let res = await fetch(url);
    let data = await res.json()
    moviesList = data.results
    showMovies(moviesList)

    console.log(moviesList);

    // gridEl.innerHTML = ``

    // for (let i = 0; i < forRange; i++)  {
    //     console.log('newListMov: ', newListMov);
    //     gridEl.innerHTML += `
    // <article class="movie-card">
    //     <img class="movie-poster" src="${imageBaseUrl}/w342${newListMov[i].poster_path}" alt="${newListMov[i].title}" title="${newListMov[i].title}">
    //     <div class="movieInfo">
    //         <p class="movie-title">${newListMov[i].title}</p>
    //         <p>Rating: <span class="movie-votes">${newListMov[i].vote_average}</span></p>
    //     </div>
    // </article>
    // `
    // }

    // movieCards = document.getElementsByClassName("movie-card")

    // for (let i = 0; i < newListMov.length; i++) {
    //     movieCards[i].addEventListener('click', function() {

    //         showDetails(newListMov[i])
    //     })
    // }
}

function enterKeyPressed(event) {
    if (event.keyCode == 13) {

        searchFilter()

        searchInfo.style.display = "block"

        searchRequest.innerHTML = ``
        searchRequest.innerHTML = `Results of: <h2 class="searchRequest">"${searchInputValue}"</h2>`

        event.preventDefault()
    }
 }

 function clearSearch(){

    searchInfo.style.display = "none"
    getData()
 }

 function showDetails(movieInfo){


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

    document.querySelector(".background").style.display = "none";
    document.querySelector(".movie-card-open").style.display = "none";
    document.querySelector(".movieDetails").remove()
 }

window.onload = function () {

    // showMovies()
    getData()
}
