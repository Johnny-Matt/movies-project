"use strict";

// TODO: Add to ADD, DELETE, and EDIT Functions (ADD Loading GIF)

// https://javascript.plainenglish.io/adding-loader-to-your-deployed-projects-d8f389e8c928
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

                for (let movie of movieData) {

                }
            })

    }
    movieArray();

    /*
    function searchMovies(m) {
        let i;
        for (i = 0; i < m.length; i++) {
            console.log(i);
        }
    }
    searchMovies(m);
    */
    
    function addMovie() {
        console.log("button was clicked")
        let title = document.getElementById("add-title").value
        let rating = document.getElementById("add-rating").value
        console.log(title)
        console.log(rating)

    }


    document.getElementById("add-movie-button").addEventListener('click', function(){
            addMovie()
    })


    // Add a movie
    const movie = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'};
    // const url = '/posts';
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


// //    Delete a movie
//
//     const movie, id = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'};
//     // const url = '/posts';
//     options = {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(movie),
//     };
//     console.log(movie)
//     fetch(`movieUrl${id}`, options)
//         .then(response => console.log(response))
//    
// //    Edit a movie
//
//     const movie, id = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'};
//     options = {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(movie),
//     };
//     console.log(movie)
//     fetch(`movieUrl${id}`, options)
//         .then(response => console.log(response))
//


})
