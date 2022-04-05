"use strict";

//export function movieArray() {}
//import {getWrecked} from 'js/tmdb-project';

// Website to Help https://javascript.plainenglish.io/adding-loader-to-your-deployed-projects-d8f389e8c928

function loadSpinner() {
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
    const movieUrl = "https://grey-yellow-bonnet.glitch.me/movies"
    loadSpinner()

    function movieArray() {

        fetch(movieUrl)
            .then(response => {
                return response.json()
            })
            .then(movieData => {
                console.log(movieData);

                $("#movieCard").html(buildMovieCardContent(movieData));
                getMoviesById(movieData);

                $("#dropItLikeItsHot").html(addMovieToUl(movieData));
                $("#testPlace").html(addPlace(movieData))
            })

    }

    movieArray()
    //getWrecked()

    //    Extracts movie index from fetch data.
    function getMoviesById(movIndex) {
        movIndex.forEach(function output(index) {
            // let movieId = index.id
            // console.log(movieId)
        })
    }

    //------------------Obj of Extracted Movie Data---------------------
    function extractMovieData(movieProp) {
        return {
            title: movieProp.title,
            director: movieProp.director,
            year: movieProp.year,
            genre: movieProp.genre,
            actors: movieProp.actors,
            plot: movieProp.plot,
            rating: movieProp.rating,
            poster: movieProp.poster,
            id: movieProp.id
        }
    }

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
            let oh = movie[i];
            // console.log(oh.title);

            html += addLi(movie[i]);
        }
        html += '</ul>'
        return html;
    }

    function addLi(movie) {
        let html = "";
        let movieTitle = extractMovieData(movie);
        //language=HTML
        html += `
            <option value="${movieTitle.id}">${movieTitle.title}</option>`
        return html;
    }


    //--------------------Add Movie data to Edit form --------------------------

    function addPlace(movie) {
        for (let i = 0; i < movie.length; i++) {
            let html = "";
            var movieT = movie[i];
            //language=HTML

            html += `<label for="userTitle" class="form-label" style="color: white">Title</label>
            <input type="text" class="form-control" id="userTitle" value="${movieT.title}"/>`

            return html;
        }
    }


    document.querySelector('#dropItLikeItsHot').addEventListener("click", function () {

        document.querySelector('#dropItLikeItsHot').addEventListener("click", function () {

            let dropDownYee = document.querySelector("#dropItLikeItsHot").value;
            console.log("droppedIt")
            fetch("https://grey-yellow-bonnet.glitch.me/movies")
                .then(response => response.json())
                .then(movieData => {
                    movieData.forEach(({id, title, director, genre, actors, rating}) => {
                        if (dropDownYee === title) {
                            document.querySelector('#userInput').innerHTML = id;
                            document.querySelector('#userInput').style.visibility = 'hidden';
                            document.querySelector('#userTitle').value = dropDownYee;
                            document.querySelector('#userDirector').value = director;
                            document.querySelector('#userGenre').value = genre;
                            document.querySelector('#userActor').value = actors;
                            document.querySelector('#userRating').value = rating;
                        }
                    })
                });
        })
    })

    //-----------------Builds/Populates the actual movie card--------------

    function buildMovieCard(movie) {
        let html = ""
        let movieDetails = extractMovieData(movie);

        //language=HTML
        html += `
            <section class="col-12 col-sm-6 col-lg-4 col-xl-4 mx-auto mt-2">
                <div id="${movieDetails.id}" class="card border-5 px-0">
                    <div>
                        <img src="/img/interstellar_2014_film_art.webp"
                             alt="interstellar movie art" style="width: 100%" height="80%">
                    </div>
                    <p style="color: white">Movie Title:</p>
                    <p id="userInput"><b style="color: #EA9215">${movieDetails.title}</b></p>
                    <p style="color: white">Director:</p>
                    <p><b style="color: #EA9215">${movieDetails.director}</b></p>
                    <p style="color: white">Year:</p>
                    <p><b style="color: #EA9215">${movieDetails.year}</b></p>
                    <p style="color: white">Genre:</p>
                    <p><b style="color: #EA9215">${movieDetails.genre}</b></p>
                    <p style="color: white">Actors:</p>
                    <p><b style="color: #EA9215">${movieDetails.actors}</b></p>
                    <p style="color: white">Rating:</p>
                    <p><b style="color: #EA9215">${movieDetails.rating}</b></p>
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

    //-------------------Add Movie Event Listener----------------------------------
    document.getElementById("add-movie-button").addEventListener('click', function () {
        addMovie();
        let movieTitleReset = document.getElementById("add-title");
        let movieRatingReset = document.getElementById("add-rating");

        //--------This clears input fields after submit---------
        movieTitleReset.value = "";
        movieRatingReset.value = "";
    })

    // ----------------------Add A Movie Function-----------------------------------
    function addMovie() {
        let movieTitle = document.getElementById("add-title").value
        let movieRating = document.getElementById("add-rating").value
        console.log(movieTitle)
        console.log(movieRating)

        let movie = {title: movieTitle, rating: movieRating};
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        console.log(movie)
        fetch(movieUrl, options)
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
    console.log(toggleBtn);

    toggleBtn.addEventListener("click", function () {

        let name = document.getElementById("formPopulate");
        name.classList.remove("visibleForm");

    })


    //document.getElementById('userTitle').innerHTML += '<input placeholder="hello"/>'

    // function addPlaceholder() {
    //     let moviePlaceholder = extractMovieData(movieData);
    //     $('#userTitle').attr('placeholder', `${moviePlaceholder.title}`);
    // }


    //------Event Listener to hide form on edit btn click-------
    document.getElementById("edit-button").addEventListener("click", function () {
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
                rating: document.querySelector('#userRating').value
            })
        };

        fetch(`https://grey-yellow-bonnet.glitch.me/movies/${end}`, options)
            .then(response => response.json())
            .then(response => movieArray())

        //--------This clears input fields after submit---------
        let titleReset = document.querySelector('#userTitle')
        let yearReset = document.querySelector('#userYear')
        let directorReset = document.querySelector('#userDirector')
        let genreReset = document.querySelector('#userGenre')
        let actorReset = document.querySelector('#userActor')
        let ratingReset = document.querySelector('#userRating')

        titleReset.value = ""
        yearReset.value = ""
        directorReset.value = ""
        genreReset.value = ""
        actorReset.value = ""
        ratingReset.value = ""
    })
})