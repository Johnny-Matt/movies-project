"use strict";

const tmdbUrl = `https://api.themoviedb.org/3/`
let lastSearchResults = [];

function getWrecked() {
    function tmdbArray() {
        document.getElementById("search-movie").addEventListener('click', function () {
            let userSearch = document.getElementById("search-title").value;
            let movietmdbUrl = "".concat(tmdbUrl, `search/movie?api_key=${TMDB_KEY}&language=en-US&query=`, userSearch);

            //displayLoader();
            fetch(movietmdbUrl)
                .then(response => {
                    console.log('response, woo')
                    return response.json();
                })
                .then(data => {
                    console.log(data.results[0].title);
                    lastSearchResults = data.results;

                    $("#tmdbCard").html(buildtmdbMovieCardContent(data.results));
                    $(".add-button").on('click', function (e) {
                        saveTMovie(e);
                    });
                    //getData(data);
                })
        })
    }
    tmdbArray()

    // function getData(data) {
    //     for (let m = 0; m < data.results.length; m++) {
    //         //let movie = data.results[m];
    //         //console.log(movie.title);
    //     }
    // }

    function extracttmdbMovieData(movie) {
        return {
            url: "https://image.tmdb.org/t/p/w185".concat(movie.poster_path),
            title: movie.title,
            overview: movie.overview,
            year: movie.release_date,
            genre: movie.genre_ids,
            rating: movie.vote_average,
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
                        <img src="${movieDetails.url}"
                             alt="movie art" style="width: 100%; height: 80%">
                    </div>
                    <p style="color: white">Movie Title:</p>
                    <p id="userInput"><b style="color: #EA9215">${movieDetails.title}</b></p>
                    <p style="color: white">Year:</p>
                    <p><b style="color: #EA9215">${movieDetails.year}</b></p>
                    <p style="color: white">Genre:</p>
                    <p><b style="color: #EA9215">${movieDetails.genre}</b></p>
                    <p style="color: white">Overview:</p>
                    <p><b style="color: #EA9215">${movieDetails.overview}</b></p>
                    <p style="color: white">Rating:</p>
                    <p><b style="color: #EA9215">${movieDetails.rating}</b></p>
                    <button type="button" class="add-button" data-id="${movieDetails.id}">Add</button>
                </div>
            </section>`
        return html
    }



    // ----------------------Add A Movie Function-----------------------------------
    function saveTMovie(e) {
        let tmdbID = e.target.getAttribute("data-id");
        let matched = lastSearchResults.filter(function(ele){
            if (tmdbID === ele.id.toString()){
                return true;
            } else {
                return false;
            }
        })
        let movieT = extracttmdbMovieData(matched[0]);

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieT),
        };
        console.log(movieT);
        fetch(movieUrl, options)
            .then(response => console.log(response))
            .then(() => alert("Its been saved"))
            .catch(error => console.log('Movie not added ', error))
    }
}