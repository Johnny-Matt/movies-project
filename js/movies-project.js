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

//     function movieArray() {
//         fetch(movieUrl)
//             .then(response => {
//                 console.log('response, woo')
//                 return response.json();
//             })
//             .then(movieData => {
//                 //document.querySelector(".preload").style.display = "none"; //stop the load
//                 console.log(movieData);
//
// // ---------------Button and input search functionality
// //                 $('#search-movie').on('click', (e) => {
// //                     let searchTitle = $('#search-title').val();
// //                     console.log(searchTitle)
// //                     getMovies(searchTitle);
// //                     e.preventDefault();
// //                 });
//
//
//
//                 // Be able to search all movies with title/ display
//                 function getMovies(searchTitle) {
//                     fetch("https://grey-yellow-bonnet.glitch.me/movies/")
//                         .then((response) => {
//                             console.log(response);
//
//                             let mainContainer = document.getElementById("container");
//                             mainContainer.innerHTML = "";
//                             for (let i = 0; i < movieData.length; i++) {
//                                 console.log(movieData[i].title);
//                                 let movieTitleCall = (movieData[i]);
//
//                                 let d = document.createElement("div");
//                                 d.classList.add("card", "col-4", "m-1");
//
//
//                                 let dateOfWeather = document.createElement("div");
//                                 dateOfWeather.classList.add("card-header");
//                                 dateOfWeather.innerHTML = movieTitleCall;
//
//                                 // Create Div with added attributes below
//                                 function appendingAttribute(parent, content) {
//                                     let div = document.createElement("div");
//                                     div.innerHTML = content;
//                                     parent.appendChild(div);
//                                 }
//
//                                 appendingAttribute(d, "Title: " + movieTitleCall.title);
//
//                                 mainContainer.appendChild(d);
//
//
//                                 /* TODO: Print each movie
//                                 $.each(m => { //, (index, movie)
//                                     output += `<h3>${movieTitleCall}</h3>`;
//                                 });
//                                 //$(``);
//                                  */
//                             }
//                         })
//                 }
//             })
//
//     }
//
//     movieArray();

    function movieArray() {
        fetch(movieUrl)
            .then(response => {
                console.log('response, woo')
                return response.json();
            })
            .then(movieData => {
                //document.querySelector(".preload").style.display = "none"; //stop the load
                console.log(movieData);

     // ----------------forEach that may be useful later----------------------

               // let moviesTest = movieData.forEach( function output(index){
               //      console.log(index.id);
               //      let movieIndex = index
               //      return movieIndex
               //  });
                $("#movieCard").html(buildMovieCardContent(movieData))



            })}

    movieArray()





    
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
        console.log("build movie cards")
        for (let i = 0; i < movieArr.length; i++) {
            html += buildMovieCard(movieArr[i]);
        }
        html += '</div>';
        return html;
    }

    // ---------------Button and input search functionality-----------------------

    $('#search-movie').on('click', (e) => {
        let searchTitle = $('#search-title').val();
        console.log(searchTitle)
       movieArray(searchTitle);

        e.preventDefault();
    });



    //-------------------Add Movie Event Listener-----------------------------------

    document.getElementById("add-movie-button").addEventListener('click', function () {
        addMovie()

    })
    // ----------------------Add A Movie Function-----------------------------------
    // let movieTitle = document.getElementById("add-title").value
    // let movieRating = document.getElementById("add-rating").value

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
    }

    // -------------------------Delete A Movie Function-----------------------------
   // whatever param entered into deleteMovie is what identifies the movie ID and what will be deleted

    // document.getElementById("delete-button").addEventListener('click', function () {
    //     deleteMovie(257)
    //     console.log("button was clicked")
    //
    // })
       //TODO add param to associated each Delete Button with whatever movie ID like example "281" below


       // e.preventDefault();

    //movieId just a placeholder parameter for function
    function deleteMovie(movieId) {
        let movie = {title: movieTitle, body: movieRating};
        let id = movieId;
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        console.log(movie)
        fetch(`https://grey-yellow-bonnet.glitch.me/movies/${id}`, options)
            .then(response => console.log(response))
    }


    /*

    // Edit a movie
    function editMovie () {
        let movie = {title: movieTitle, body: rating};
        let id = '';
        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        console.log(movie)
        fetch(`movieUrl${id}`, options) // TODO
            .then(response => console.log(response))
    }
 */



    //-----------------Builds/Populates the actual movie card--------------

    function buildMovieCard(movie) {
        let html = ""
        let movieDetails = extractMovieData(movie);

        //language=HTML
        html += `
      
        <section class="col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mx-auto mt-2">
            
            <div id="movie-info-card" class="card border-5 px-0">
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
                <button id="delete-button">Delete</button>
               
                
            </div>
        </section>`
        return html


    }

})
