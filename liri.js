var dotenv = require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");

// 

// Taking in manual commands from user
// =========================================================================================================================================================================================
var command = process.argv[2];
console.log("command entered: " + command);

switch (command) {
    case "my-tweets":
        twitter();
        break;
    
    case "spotify-this-song":
        console.log("this should run the spotify function, but it hasn't been created yet");
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        console.log("this should run the random.txt file action function, but it hasn't been created yet");
        break;
}

// TWITTER
// =========================================================================================================================================================================================
function twitter() {
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'noblebot5000'};
    
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }
        }

        else {
            console.log("Error!! " + error);
        }
    });


    // client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
    //     console.log(tweets);
    // });
}
    


// OMDB
// =========================================================================================================================================================================================
function movieThis() {
    var nodeArgs = process.argv;
    var movieName = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        // if (i < 3 && i < nodeArgs.length) {
        //     movieName = "Mr+Nobody";
        // }
        if (i > 3 && i < nodeArgs.length) {
            movieName += "+" + nodeArgs[i];
        }

        else {
            movieName += nodeArgs[i];
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // console.log(queryUrl);

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Date: " + JSON.parse(body).Released);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Directed by: " + JSON.parse(body).Director);
            console.log("Produced by: " + JSON.parse(body).Production + " in " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Total Box Office: " + JSON.parse(body).BoxOffice);
            
            fs.appendFile("log.txt", "Movie Title: " + JSON.parse(body).Title + ", Release Date: " + JSON.parse(body).Released + ", IMDB Rating: " + JSON.parse(body).imdbRating + ", Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value + ", Plot: " + JSON.parse(body).Plot + ", Actors: " + JSON.parse(body).Actors + ", Directed by: " + JSON.parse(body).Director + ", Produced by: " + JSON.parse(body).Production + " in " + JSON.parse(body).Country + ", Language: " + JSON.parse(body).Language + ", Total Box Office: " + JSON.parse(body).BoxOffice + "   //////////////////   ", function (error) {
        });
        if (error) {
            return console.log("Error!!" + error);
        }
            console.log("Info has been added to log.txt file.");
        }
    });
}

// Spotify
// =========================================================================================================================================================================================



