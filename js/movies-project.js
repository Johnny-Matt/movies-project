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
$(document).ready( function(){

    // Glitch Movie API
    const movieUrl = "https://grey-yellow-bonnet.glitch.me/movies"

    function movieArray () {
        fetch(movieUrl)
            .then(response => {
                console.log('response, woo')
                return response.json();
            })
            .then(movieData => {
                //document.querySelector(".preload").style.display = "none"; //stop the load
                console.log(movieData);

                // Button and input search functionality
                $('#search-movie').on('click', (e) => {
                    let searchTitle = $('#search-title').val();
                    console.log(searchTitle)
                    getMovies(searchTitle);
                    e.preventDefault();
                });

                // Be able to search all movies with title/ display
                function getMovies(searchTitle) {
                    fetch("https://grey-yellow-bonnet.glitch.me/movies/")
                        .then((response) => {
                            console.log(response);

                            let mainContainer = document.getElementById("container");
                            mainContainer.innerHTML = "";
                            for (let i = 0; i < movieData.length; i++) {
                                console.log(movieData[i].title);
                                let movieTitleCall = (movieData[i]);

                                let d = document.createElement("div");
                                d.classList.add("card", "col-4", "m-1");


                                let dateOfWeather = document.createElement("div");
                                dateOfWeather.classList.add("card-header");
                                dateOfWeather.innerHTML = movieTitleCall;

                                // Create Div with added attributes below
                                function appendingAttribute(parent, content) {
                                    let div = document.createElement("div");
                                    div.innerHTML = content;
                                    parent.appendChild(div);
                                }

                                appendingAttribute(d, "Title: " + movieTitleCall.title);

                                mainContainer.appendChild(d);


                                /* TODO: Print each movie
                                $.each(m => { //, (index, movie)
                                    output += `<h3>${movieTitleCall}</h3>`;
                                });
                                //$(``);
                                 */
                            }
                        })
                }
            })

    }
    movieArray();

    // let movieTitle = document.getElementById("add-title").value
    // let rating = document.getElementById("add-rating").value

    // function addMovie() {
    //     console.log(title)
    //     console.log(rating)
    //
    // }

    document.getElementById("add-movie-button").addEventListener('click', function(){
            addMovie()
    })
    let movieTitle = document.getElementById("add-title").value
    let rating = document.getElementById("add-rating").value

    // Add a movie
    function addMovie () {
        let movie = {title: movieTitle, body: rating};
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
/*
    // Delete a movie
    function deleteMovie () {
        let movie = {title: movieTitle, body: rating};
        let id = '';
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        console.log(movie)
        fetch(`'https://grey-yellow-bonnet.glitch.me/movies/' + ${id}`, options) // TODO
            .then(response => console.log(response))
    }

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
})
