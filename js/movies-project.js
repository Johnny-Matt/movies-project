"use strict";

// TODO: Add to ADD, DELETE, and EDIT Functions (ADD Loading GIF)
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

                // ----------------forEach that may be useful later----------------------

                // let moviesTest = movieData.forEach( function output(index){
                //      console.log(index.id);
                //      let movieIndex = index
                //      return movieIndex
                //  });
                $("#movieCard").html(buildMovieCardContent(movieData));
                getMoviesById(movieData);
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

    function buildMovieCardModal(modal) {
        let html = '<div class="row">'
        for (let i = 0; i < modal.length; i++) {
            html += buildMovieCard(modal[i]);
        }
        html += '</div>';
        return html;
    }

    //-----------------Builds/Populates the actual movie card--------------

    function buildMovieCard(movie) {
        let html = ""
        let movieDetails = extractMovieData(movie);

        //language=HTML
        html += `

            <section class="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mx-auto mt-2">

                <div id="${movieDetails.id}" class="card border-5 px-0">
                    <p>Movie Title:</p>
                    <p><b style="color: #0fb784">${movieDetails.title}</b></p>
                    <p>Director:</p>
                    <p><b style="color: #0fb784">${movieDetails.director}</b></p>
                    <p>Year:</p>
                    <p><b style="color: #0fb784">${movieDetails.year}</b></p>
                    <p>Genre:</p>
                    <p><b style="color: #0fb784">${movieDetails.genre}</b></p>
                    <p>Actors:</p>
                    <p><b style="color: #0fb784">${movieDetails.actors}</b></p>

                    <!--                <button type="button" id="delete-button" class="btn btn-outline-danger">Delete</button>-->
                    <button type="button" class="delete-button">Delete</button>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary edit-button" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">
                        Edit ${movieDetails.title}
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                         tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <input type="text" class="modal-title" id="staticBackdropLabel"
                                           placeholder="${movieDetails.title}">
                                    <button id="modalTitle">Submit</button>
                                    </input>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    ...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                    <button type="button" class="btn btn-primary">Understood</button>
                                </div>
                            </div>
                        </div>
                    </div>

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
    $(document).on("click","button.delete-button", function (){
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

    // Edit Movie()
    $(document).on("click", "button.edit-button", function(e) {

        let editMovieId = $(this).parent("div").attr("id");
        let movieDetails = extractMovieData(e);

        let options = {
            method: 'PATCH',
            body: JSON.stringify({
                title: movieDetails.title,
                year: movieDetails.year,
                rating: movieDetails.rating
            })
        };
        console.log(movieDetails);
        fetch(`https://grey-yellow-bonnet.glitch.me/movies/${editMovieId}`, options)
            .then(response => response.json())
            .then(data => data)
        createModal();
    })

    //create Modal
    function createModal() {
        let userTitle = document.getElementById("modalTitle").value
        console.log(userTitle);
    }

})
    // -------------------------Delete A Movie Function-----------------------------
   // whatever param entered into deleteMovie is what identifies the movie ID and what will be deleted

    // document.getElementsByClassName("delete-button").addEventListener('click', function () {
    //     deleteMovie(257);
    //     console.log("button was clicked");
    //
    // })

    //------------------------Possible solution to delete button-----------------
    // const deleteOptions = {
    //     method: 'DELETE',
    //     headers: {    'Content-Type': 'application/json'    }
    // }
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


    // var delBtn = document.getElementsByClassName("delete-button")
    //
    // addEventListener('click', function () {
    //     deleteMovie(272)
    //     console.log("delete button was click");
    // })


    // $(document).on("click","button.delete-button", function (e){
    //     let deleteMovieId = $(this).parent("div").attr("id");
    //     let options = {
    //         method: 'DELETE'
    //     };
    //     fetch(`https://grey-yellow-bonnet.glitch.me/movies/${deleteMovieId}`, options)
    //         .then(response => console.log(response))
    //     console.log(deleteMovieId)
    //     movieArray()
    //
    // })





    // document.getElementById("edit-button").addEventListener('click', function () {
    //     editMovie(1);
    //     console.log("button click");
    // })


    // //movieId just a placeholder parameter for function
    // function deleteMovie(movieId) {
    //     // let movieDetails = extractMovieData(movieId)
    //     // let movie = {title: movieDetails.title, body: movieDetails.rating};
    //     let deleteMovieId = $(this).parent("div").attr("id");
    //     console.log(deleteMovieId)
    //     let id = movieId;
    //     let options = {
    //         method: 'DELETE'
    //     };
    //     fetch(`https://grey-yellow-bonnet.glitch.me/movies/${deleteMovieId}`, options)
    //         .then(response => console.log(response))
    // }