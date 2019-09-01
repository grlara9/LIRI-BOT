require ("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var commands = process.argv[2];
var search = process.argv[3];

if(commands === "spotify-this-song"){
    console.log("Search For Song In Spotify");
    spotify_search(search);
}
if(commands === "movie-this"){
    console.log("Search For Movie in OMDB");
    movie_this(search);
}
if(commands === "do-what-it-says"){
    console.log("Do What it Says");
    do_what_it_says();
}

function spotify_search(){
    if(!search){
        search = "The Sign";
    }
    
    spotify.search({
    type: "track", query: search
}).then(function(response){
    //Loop through the artists array and get artist name
    
    for(var i = 0; i < response.tracks.items[0].artists.length; i++ ){

        console.log(response.tracks.items[0].artists[i].name);
    }
    //Song name
    console.log("Name of song: " + response.tracks.items[0].name);
    //Preview link of song 
    console.log(response.tracks.items[0].preview_url);
    //Album song is from
    console.log("Name of Album: " + response.tracks.items[0].album.name);
}).catch(function(err){
    console.log(err);
});
}

function movie_this(){
    var axios = require("axios");
    if(!search){
        search = "Mr. Nobody";
    }

    var queryURL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
        function(response){
            //* Title of the movie.
            console.log("Title of movie: " + response.data.Title);
            //* Year the movie came out.
            console.log("Year of release: " + response.data.Year);
            //* IMDB Rating of the movie.
            console.log("Rating:" + response.data.Ratings[0].Value);
            //* Rotten Tomatoes Rating of the movie.
            console.log("Rating from Rotten Tomatoes: " + response.data.Ratings[1].Value);
            //* Country where the movie was produced.
            console.log("Country of production: " + response.data.Country);
            //* Language of the movie.
            console.log("Language: " + response.data.Language);
            //* Plot of the movie.
            console.log("Plot: " + response.data.Plot);
            //* Actors in the movie.
            console.log("Actos: " + response.data.Actors);
         })
         .catch(function(error){
             if(error.response){

                 console.log(error.response.data);
                 console.log(error.response.status);
                 console.log(error.response.headers);
                
         } else if(error.request){
             //Request made but no response was received
             console.log(error.request);
         }else{
             //something happened in setting up the request
             console.log("Error ",  error.message);
         }
         console.log(error.config);
        })

}

function do_what_it_says(){
    fs.readFile("random.txt", "utf-8", function(error, data){
        if(error){
            return console.log(error);
        }
        console.log(data);

        var dataArr = data.split(",");

        //console.log(dataArr);
        commands = dataArr[0];
        search = dataArr[1];
        spotify_search(search);
    })
}
function concert_this(){
    //search the Bands in Town Artist Events API 

    //Name of the venue
    //Venue location
    //Date of the Event (use moment to format this as "MM/DD/YYYY")
}

