"use strict";

// Website to Help https://javascript.plainenglish.io/adding-loader-to-your-deployed-projects-d8f389e8c928

let loader = document.querySelector('.preloader');
let disc = loader.querySelector('.spinner');

const moviearr = document.querySelector('.hello');
const interval = 125;

console.log("Loading");
const loadDisc = (arr) => {
    setInterval(() => {
        disc.innerText = arr; //[Math.floor(Math.random() * arr.length)];
    }, interval);
}
const init = () => {
    loadDisc(moviearr);
}
init();

// Call Movie API
$(document).ready(function () {

    // Glitch Movie API
    const movieUrl = "https://grey-yellow-bonnet.glitch.me/movies"

    function movieArray() {
        fetch(movieUrl)
            .then(response => {
                console.log('response, woo')
                return response.json();
            })
            .then(movieData => {
                console.log(movieData);

                $("#movieCard").html(buildMovieCardContent(movieData));
                getMoviesById(movieData);

                $("#dropItLikeItsHot").html(addMovieToUl(movieData));
                //$("#formPopulate").html(addFormToDiv(movieData));
            })
    }

    movieArray()

    //    Extracts movie index from fetch data.
    function getMoviesById(movIndex) {
        movIndex.forEach(function output(index) {
            let movieId = index.id
            console.log(movieId)
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
            console.log(oh.title);
            html += addLi(movie[i]);
        }
        html += '</ul>'
        return html;
    }

    // $("#dropItLikeItsHot").change(function () {
    //     var end = $(dropItLikeItsHot).val();
    //     //$(this).attr("title", $(this).find("option:selected").attr("id"));
    //     console.log(end);
    //     // let hello = document.getElementById("inputTitle").innerHTML(end);
    //     // console.log(hello);
    //     //language=HTML
    //     //html += `<option value="${movieTitle.title}
    //     let hello = extractMovieData(title)
    //     console.log(hello);
    //     if(hello.id === yellow){
    //
    //     } else (hello.id !== yellow) {
    //         .innerHTML = userInput
    // }

    // alert(end);
    // let name = prompt("please enter name", "");
    // document.getElementById("inputTitle").innerHTML
    //});

    //<button onclick="getOption()"> Check option </button>

    // function getOption() {
    //     let selectElement = document.querySelector('#inputTitle').value;
    //     document.querySelector('.form-control').textContent = selectElement;
    // }

    // function addFormToDiv() {
    //     let html = '<div>';
    //     html += extractMovieData();  // Wont build card without a loop - We tried movie.length
    //     html += '</div>'
    //     return html;
    // }

    function addLi(movie) {
        let html = "";
        let movieTitle = extractMovieData(movie);
        //language=HTML
        html += `
            <option value="${movieTitle.id}">${movieTitle.title}</option>`
        return html;
    }

    document.querySelector('#dropItLikeItsHot').addEventListener("click", function () {
        let dropDownYee = document.querySelector("#dropItLikeItsHot").value;
        fetch("https://grey-yellow-bonnet.glitch.me/movies")
            .then(response => response.json())
            .then(movieData => {
                movieData.forEach(({id, title, director, genre, rating}) => {
                    if (dropDownYee === title) {
                        document.querySelector('#userInput').innerHTML = id;
                        document.querySelector('#userInput').style.visibility = 'hidden';
                        document.querySelector('#userTitle').value = dropDownYee;
                        document.querySelector('#userDirector').value = director;
                        document.querySelector('#userGenre').value = genre;
                        document.querySelector('#userRating').value = rating;
                    }
                })
            });
    })

    //-----------------Builds/Populates the actual movie card--------------

    function buildMovieCard(movie) {
        let html = ""
        let movieDetails = extractMovieData(movie);

        //language=HTML
        html += `
                <section class="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mx-auto mt-2">
                    <div id="${movieDetails.id}" class="card border-5 px-0">
                        <p>Movie Title:</p>
                        <p id="userInput"><b style="color: #0fb784">${movieDetails.title}</b></p>
                        <p>Director:</p>
                        <p><b style="color: #0fb784">${movieDetails.director}</b></p>
                        <p>Year:</p>
                        <p><b style="color: #0fb784">${movieDetails.year}</b></p>
                        <p>Genre:</p>
                        <p><b style="color: #0fb784">${movieDetails.genre}</b></p>
                        <p>Actors:</p>
                        <p><b style="color: #0fb784">${movieDetails.actors}</b></p>
                        <p>Rating:</p>
                        <p><b style="color: #0fb784">${movieDetails.rating}</b></p>
                        <button type="button" class="delete-button btn-outline-danger">Delete</button>
                    </div>
                </section>`
        return html
    }

    // function buildFormCard (e) {
    //     let html = ""
    //     let movieDetails = extractMovieData(e);
    //     console.log(movieDetails);
    //     //language=HTML
    //     html += `
    //
    //         `
    //     return html;
    // }
    // console.log(buildFormCard());

    // ---------------Button and input search functionality-----------------------
    $('#search-movie').on('click', (e) => {
        let searchTitle = $('#search-title').val();
        console.log(searchTitle)
        movieArray(searchTitle);
        e.preventDefault();
    });

    //-------------------Add Movie Event Listener----------------------------------
    document.getElementById("add-movie-button").addEventListener('click', function () {
        addMovie()
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
                rating: document.querySelector('#userRating').value
            })
        };

        fetch(`https://grey-yellow-bonnet.glitch.me/movies/${end}`, options)
            .then(response => response.json())
            .then(response => movieArray())
        //addMovie();
    })

})
// -------------------------Edit Movie--------------------------------
// $(document).on("click", "button.edit-button", function (e) {
//     //buildFormCard().innerText = "";
//     let editMovieTitle = $(this).parent("div").attr("id");
//     let movieDetails = extractMovieData(e);
//     let userTitle = document.getElementById('inputTitle').value;
//     //userTitle = movieDetails.title.innerHTML
//
//     console.log(userTitle);
//
//     //let userDirector = document.getElementById("add-rating").value
//     let options = {
//         method: 'PATCH',
//         body: JSON.stringify({
//             title: movieDetails.title,
//             year: movieDetails.year,
//         })
//     };
//
//     fetch(`https://grey-yellow-bonnet.glitch.me/movies/${editMovieTitle}`, options)
//         .then(response => response.json())
//         .then(data => data)
// })
// -------------------------Delete A Movie Function-----------------------------
// whatever param entered into deleteMovie is what identifies the movie ID and what will be deleted

// document.getElementsByClassName("delete-button").addEventListener('click', function () {
//     deleteMovie(257);
//     console.log("button was clicked");
//
// })

//------------------------Possible solution to delete button-----------------
// for(let movieDetails of movieData) {
//     $(`#delete-btn${movieDetails.id}`).click(function () {
//         $(`#delete-btn${movieDetails.id}`).attr('disabled')
//         let userDelete = confirm(`Are you sure you want to delete ${movieDetails.title}?`)
//         // DELETE FETCH
//         if (userDelete) {
//             fetch(`${movieUrl}/${movieDetails.id}`, deleteOptions)
//                 .then(res => res.json())
//                 .then(movieData => console.log(movieData))
//                 .then(fetchData(2000))
//                 .then($(`#delete-btn${movieDetails.id}`).removeAttr('disabled'))
//                 .catch(error => console.error(error))
//         } else {
//             $(`#delete-btn${movieDetails.id}`).removeAttr('disabled')
//         }
//     })
// }