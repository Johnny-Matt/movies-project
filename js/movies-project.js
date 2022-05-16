"use strict";

// Website to Help https://javascript.plainenglish.io/adding-loader-to-your-deployed-projects-d8f389e8c928

// const movieUrl = "https://grey-yellow-bonnet.glitch.me/movies"
const movieUrl = "http://localhost:8080/api/movies/all"
const postMovieUrl = "http://localhost:8080/api/movies"

function loadSpinner () {
    const loader = document.querySelector('.asteroid-preloader');
    const spin = loader.querySelector('.the-spinner');
    const movieHello = document.querySelector('.asteroid');
    const interval = 500;

    const loadDisc = (arr) => {
        setInterval(() => {
            spin.innerText = arr;
        }, interval);
    }
    const init = () => {
        loadDisc(movieHello);
    }
    init();
}

$(document).ready(function () {
    // Glitch Movie API
    loadSpinner()
    getWrecked();
    function movieArray() {

        fetch(movieUrl)
            .then(response => {
                return response.json()
            })
            .then(movieData => {
                console.log(movieData);

                $("#movieCard").html(buildMovieCardContent(movieData));
                //getMoviesById(movieData);

                $("#dropItLikeItsHot").html(addMovieToUl(movieData));
                //$("#testPlace").html(addPlace(movieData))
            })

    }
    movieArray()
    //getWrecked()

    //    Extracts movie index from fetch data.
    // function getMoviesById(movIndex) {
    //     movIndex.forEach(function output(index) {
    //         // let movieId = index.id
    //         // console.log(movieId)
    //     })
    // }

    //------------------Obj of Extracted Movie Data---------------------
    // function extractMovieData(movie) {
    //     return {
    //         title: movie.title,
    //         director: movie.director,
    //         year: movie.year,
    //         genre: movie.genre,
    //         actors: movie.actors,
    //         plot: movie.plot,
    //         rating: movie.rating,
    //         poster: movie.poster,
    //         id: movie.id,
    //         url: movie.url
    //     }
    // }

    //-----------------Gathers actual card contents---------------------
    function buildMovieCardContent(movieArr) {
        let html = '<div class="row">'
        for (let i = 0; i < movieArr.length; i++) {
            html += buildMovieCard(movieArr[i]);
        }
        html += '</div>';
        return html;
    }

    //-----------------Edit button with movie titles---------------------
    function addMovieToUl(movie) {
        let html = '<ul>';
        for (let i = 0; i < movie.length; i++) {
            html += addLi(movie[i]);
        }
        html += '</ul>'
        return html;
    }

    function addLi(movie) {
        let html = "";
        //let movieTitle = extractMovieData(movie);
        //language=HTML
        html += `<option value="${movie.id}">${movie.title}</option>`
        return html;
    }

    //--------------------Add Movie data to Edit form --------------------------
    // function addPlace(movie) {
    //     for (let i = 0; i < movie.length; i++) {
    //         let html = "";
    //         var movieT = movie[i];
    //         //language=HTML
    //         html += `<label for="userTitle" class="form-label" style="color: white">Title</label>
    //                 <input type="text" class="form-control" id="userTitle" value="${movieT.title}"/>`
    //         return html;
    //     }
    // }

    document.querySelector('#dropItLikeItsHot').addEventListener("change", function (e) {
        console.log(e.target.value);
        fetch("https://grey-yellow-bonnet.glitch.me/movies")
            .then(response => response.json())
            .then(movieData => {
                console.log(movieData);
                movieData.forEach(movie => {
                    if (e.target.value === movie.id.toString()) {
                        document.getElementById('userTitle').value = movie.title;
                        document.getElementById('userDirector').value = movie.director;
                        document.getElementById('userGenre').value = movie.genre;
                        document.getElementById('userActor').value = movie.actor;
                        document.getElementById('userRating').value = movie.rating;
                        document.getElementById('userUrl').value = movie.url;
                    }
                })
            });
    })

    //-----------------Builds/Populates the actual movie card--------------

    function buildMovieCard(movie) {
        let html = ""

        //language=HTML
        html += `
                <section class="col-12 col-sm-6 col-lg-4 col-xl-4 mx-auto mt-2">
                    <div id="${movie.id}" class="card border-5 px-0">
                        <div>
                            <img src="${movie.url}" alt="user movie art" style="width: 100%; height: 100%" />
                        </div>
                        <p style="color: white">Movie Title:</p>
                        <p id="userInput"><b style="color: #EA9215">${movie.title}</b></p>
                        <p style="color: white">Director:</p>
                        <p><b style="color: #EA9215">${movie.director}</b></p>
                        <p style="color: white">Year:</p>
                        <p><b style="color: #EA9215">${movie.year}</b></p>
                        <p style="color: white">Genre:</p>
                        <p><b style="color: #EA9215">${movie.genre}</b></p>
                        <p style="color: white">Actors:</p>
                        <p><b style="color: #EA9215">${movie.actor}</b></p>
                        <p style="color: white">Rating:</p>
                        <p><b style="color: #EA9215">${movie.rating}</b></p>
                        <button type="button" class="delete-button btn-outline-danger">Delete</button>
                    </div>
                </section>`
        return html
    }

    // ---------------Button and input search functionality-----------------------
    $('#search-movie').on('click', (e) => {
        let searchTitle = $('#search-title').val();
        console.log(searchTitle)
        movieArray(searchTitle);
        e.preventDefault();
    });
    document.querySelector('#search-title').value = "";


    //-------------------Add Movie Event Listener----------------------------------
    document.getElementById("add-movie-button").addEventListener('click', function () {
        addMovie();
        let movieTitleReset = document.getElementById("add-title");
        let movieDirectorReset = document.getElementById("add-director").value
        let movieYearReset = document.getElementById("add-year").value
        let moviePlotReset = document.getElementById("add-plot").value
        let movieGenreReset = document.getElementById("add-genre").value
        // let movieActorReset = document.getElementById("add-add-actor").value
        let movieRatingReset = document.getElementById("add-rating");
        // let movieUrlReset = document.getElementById("add-url");

        //--------This clears input fields after submit---------
        movieTitleReset.value = "";
        movieDirectorReset.value = "";
        movieYearReset.value = "";
        moviePlotReset.value = "";
        movieGenreReset.value = "";
        // movieActorReset.value = "";
        movieRatingReset.value = "";
        // movieUrlReset.value = "";
    })

    // ----------------------Add A Movie Function-----------------------------------
    //5/16/2022 ------ADDED USER INPUTS FOR DIRECTOR, YEAR, GENRE, AND PLOT.
    function addMovie() {
        let movieTitle = document.getElementById("add-title").value
        let movieDirector = document.getElementById("add-director").value
        let movieYear = document.getElementById("add-year").value
        let moviePlot = document.getElementById("add-plot").value
        let movieGenre = document.getElementById("add-genre").value
        // let movieActor = document.getElementById("add-add-actor").value
        let movieRating = document.getElementById("add-rating").value
        // let moviePosterUrl = document.getElementById("add-url").value

        let movie = {title: movieTitle, director: movieDirector, year:movieYear, plot:moviePlot, genre:movieGenre, /*actor:movieActor,*/ rating: movieRating, /*url: moviePosterUrl*/};
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        console.log(movie)
        fetch(postMovieUrl, options)
            .then(response => console.log(response))
            .then(() => movieArray())
            .catch(error => console.log('Movie not added ', error))
    }

    //-----------------------------Delete Movie--------------------------
    $(document).on("click", "button.delete-button", function () {
        let deleteMovieId = $(this).parent("div").attr("id");
        let options = {
            method: 'DELETE'
        };
        fetch(`https://grey-yellow-bonnet.glitch.me/movies/${deleteMovieId}`, options)
            .then(response => console.log(response.json()))
            .then((response) => movieArray())
            .catch(error => console.log('Movie not deleted', error))
        console.log(deleteMovieId)
    })

    //-------------------------------Edit Movie-----------------------------
    //------Event Listener to show form on dropdown click-------
    let toggleBtn = document.getElementById("dropItLikeItsHot")
    // console.log(toggleBtn);

    toggleBtn.addEventListener("click", function () {

        let name = document.getElementById("formPopulate");
        name.classList.remove("visibleForm");

    })

    //------Event Listener to hide form on edit btn click-------
    document.getElementById("edit-button").addEventListener("click", function (){
        let name = document.getElementById("formPopulate");
        name.classList.add("visibleForm");

    })

    //------Event Listener to edit movie-------
    document.querySelector('#edit-button').addEventListener("click", function (e) {
        e.preventDefault();
        var end = $(dropItLikeItsHot).val();
        let dropDownValue = document.querySelector('#userTitle').value;
        console.log(dropDownValue)

        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: document.querySelector('#userTitle').value,
                year: document.querySelector('#userYear').value,
                director: document.querySelector('#userDirector').value,
                genre: document.querySelector('#userGenre').value,
                actor: document.querySelector('#userActor').value,
                rating: document.querySelector('#userRating').value,
                url: document.querySelector('#userUrl').value
            })
        };

        fetch(`https://grey-yellow-bonnet.glitch.me/movies/${end}`, options)
            .then(response => response.json())
            .then(response => movieArray())

        //--------This clears input fields after submit---------
        let titleReset = document.querySelector('#userTitle');
        let yearReset = document.querySelector('#userYear');
        let directorReset = document.querySelector('#userDirector');
        let genreReset = document.querySelector('#userGenre');
        let actorReset = document.querySelector('#userActor');
        let ratingReset = document.querySelector('#userRating');
        let URLReset = document.querySelector('#userUrl');

        titleReset.value = "";
        yearReset.value = "";
        directorReset.value = "";
        genreReset.value = "";
        actorReset.value = "";
        ratingReset.value = "";
        URLReset.value = "";
    })
})