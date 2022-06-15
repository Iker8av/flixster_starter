const imageBaseUrl = 'https://image.tmdb.org/t/p'
let forRange = 12;

const movies = [
   {
   id: 338953,
   posterPath: "/8ZbybiGYe8XM4WGmGlhF0ec5R7u.jpg",
   title: "Fantastic Beasts: The Secrets of Dumbledore",
   voteAverage: 6.9
   },
   {
   id: 526896,
   posterPath: "/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
   title: "Morbius",
   voteAverage: 6.4
   },
   {
   id: 752623,
   posterPath: "/neMZH82Stu91d3iqvLdNQfqPPyl.jpg",
   title: "The Lost City",
   voteAverage: 6.8
   },
   {
   id: 675353,
   posterPath: "/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
   title: "Sonic the Hedgehog 2",
   voteAverage: 7.7
   },
   {
   id: 639933,
   posterPath: "/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg",
   title: "The Northman",
   voteAverage: 7.3
   },
   {
   id: 818397,
   posterPath: "/QaNLpq3Wuu2yp5ESsXYcQCOpUk.jpg",
   title: "Memory",
   voteAverage: 7.3
   },
   {
   id: 507086,
   posterPath: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
   title: "Jurassic World Dominion",
   voteAverage: 6.7
   },
   {
   id: 453395,
   posterPath: "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
   title: "Doctor Strange in the Multiverse of Madness",
   voteAverage: 7.4
   },
   {
   id: 831946,
   posterPath: "/cpWUtkcgRKeauhTyVMjYHxAutp4.jpg",
   title: "Interceptor",
   voteAverage: 6.3
   },
   {
   id: 610150,
   posterPath: "/rugyJdeoJm7cSJL1q4jBpTNbxyU.jpg",
   title: "Dragon Ball Super: Super Hero",
   voteAverage: 6.8
   },
   {
   id: 414906,
   posterPath: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
   title: "The Batman",
   voteAverage: 7.8
   },
   {
   id: 628900,
   posterPath: "/rJPGPZ5soaG27MK90oKpioSiJE2.jpg",
   title: "The Contractor",
   voteAverage: 6.6
   },
   {
   id: 629542,
   posterPath: "/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg",
   title: "The Bad Guys",
   voteAverage: 7.8
   },
   {
   id: 825808,
   posterPath: "/g2n1lFIFXC0lpG32ysUhFi0Uz61.jpg",
   title: "See for Me",
   voteAverage: 6
   },
   {
   id: 763285,
   posterPath: "/zT5ynZ0UR6HFfWQSRf2uKtqCyWD.jpg",
   title: "Ambulance",
   voteAverage: 7
   },
   {
   id: 648579,
   posterPath: "/bmxCAO0tz79xn40swJAEIJPRnC1.jpg",
   title: "The Unbearable Weight of Massive Talent",
   voteAverage: 7.3
   },
   {
   id: 361743,
   posterPath: "/wxP2Mzv9CdjOK6t4dNnFGqIQl0V.jpg",
   title: "Top Gun: Maverick",
   voteAverage: 8.3
   }
];

const searchInput = document.querySelector(".search-input")

function showMovies() {
    const gridEl = document.getElementById("movies-grid")

    gridEl.innerHTML = ``

    for (let i = 0; i < forRange; i++)  {
        gridEl.innerHTML += `
    <article class="movie-card">
        <img class="movie-poster" src="${imageBaseUrl}/w342${movies[i].posterPath}" alt="${movies[i].title}" title="${movies[i].title}">
        <div>
            <p class="movie-title">${movies[i].title}</p>
            <p>Rating: <span class="movie-votes">${movies[i].voteAverage}</span></p>
        </div>
    </article>
    `
    }
}

function showMore(){
    forRange += 6

    if (forRange > movies.length){
        forRange = movies.length
    }

    showMovies()
}

function searchMovie(){
    console.log("Typing...")
}

window.onload = function () {
    showMovies()
    searchInput.addEventListener('input', searchMovie)

}
