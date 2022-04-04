"use strict";

const tmdbUrl = `https://api.themoviedb.org/3/`

$(document).ready(function () {
    function tmdbArray() {
        document.getElementById("search-movie").addEventListener('click', function () {
            let userSearch = document.getElementById("search-title").value;
            let movietmdbUrl = "".concat(tmdbUrl, `search/movie?api_key=${TMDB_KEY}&language=en-US&query=`, userSearch);
            fetch(movietmdbUrl)
                .then(response => {
                    console.log('response, woo')
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    console.log(data.results[0].title);

                    $("#tmdbCard").html(buildtmdbMovieCardContent(data.results));
                    getData(data);

                    //console.log(extracttmdbMovieData(data.results[0]));

                })
        })
    }
    tmdbArray()

    function getData(data) {
        for (let m = 0; m < data.results.length; m++) {
            let movie = data.results[m];
            console.log(movie.title);
        }
    }

    function extracttmdbMovieData(movie) {
        return {
            poster: movie.poster_path,
            title: movie.title,
            overview: movie.overview,
            //year: movie.release_date,
            //genre: movie.genre_ids
            id: movie.id
        }
    }

    function buildtmdbMovieCardContent(movieArr) {
        let html = '<div class="row">'
        for (let i = 0; i < movieArr.length; i++) {
            html += buildtmdbMovieCard(movieArr[i]);
        }
        html += '</div>';
        return html;
    }

    function buildtmdbMovieCard(movie) {
        let html = ""
        let movieDetails = extracttmdbMovieData(movie);
        //language=HTML
        html += `
            <section class="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mx-auto mt-2">
                <div id="${movieDetails.title}" class="card border-5 px-0">
                    <div>
                        <img src="https://image.tmdb.org/t/p/w185${movieDetails.poster}" 
                               alt="movie art" style="width: 100%" height="80%" >
                    </div>
                    <p style="color: white">Movie Title:</p>
                    <p id="userInput"><b style="color: #EA9215">${movieDetails.title}</b></p>
                    <p style="color: white">Year:</p>
                    <p><b style="color: #EA9215">${movieDetails.year}</b></p>
                    <p style="color: white">Genre:</p>
                    <p><b style="color: #EA9215">${movieDetails.genre}</b></p>
                    <p style="color: white">Overview:</p>
                    <p><b style="color: #EA9215">${movieDetails.overview}</b></p>
                    <!-- <p style="color: white">Rating:</p>
                     <p><b style="color: #EA9215">${movieDetails.rating}</b></p> -->
                </div>
            </section>`
        return html
    }
})

