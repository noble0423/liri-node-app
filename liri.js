var dotenv = require("dotenv").config();

var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

// 

// Taking in manual commands from user
// =========================================================================================================================================================================================
var command = process.argv[2];
fs.appendFile("log.txt", "COMMAND ENTERED: " + command, function(error) {
    if (error) {
        return console.log ("Error!!" + error);
    }
});

switch (command) {
    case "my-tweets":
        twitter();
        break;
    
    case "spotify-this-song":
        spotifyThis();
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
            console.log("//////////////////////////////////////////////////////");
            console.log("Most recent tweets from " + params.screen_name + " are listed below (starting w/ most recent):");
            for (var i = 0; i < tweets.length; i++) {
                console.log("Tweet: " + tweets[i].text);
                console.log("Created: " + tweets[i].created_at);
                
            }
            console.log("//////////////////////////////////////////////////////");

            // fs.appendFile("log.txt", "Most recent tweets from: " + params.screen_name + ", Tweet: " + tweets[i].text + ", Created: " + tweets[i].created_at, function(error) {
                
            //     if (error) {
            //         return console.log("Error!!" + error);
            //     }
            //         console.log("Info has been added to log.txt file.");
            // });
        }

        else {
            console.log("Error!! " + error);
        }
    });
};


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
            console.log("//////////////////////////////////////////////////////");
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
            console.log("//////////////////////////////////////////////////////");
            
            fs.appendFile("log.txt", "   //////////////////   " + "Movie Title: " + JSON.parse(body).Title + ", Release Date: " + JSON.parse(body).Released + ", IMDB Rating: " + JSON.parse(body).imdbRating + ", Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value + ", Plot: " + JSON.parse(body).Plot + ", Actors: " + JSON.parse(body).Actors + ", Directed by: " + JSON.parse(body).Director + ", Produced by: " + JSON.parse(body).Production + " in " + JSON.parse(body).Country + ", Language: " + JSON.parse(body).Language + ", Total Box Office: " + JSON.parse(body).BoxOffice + "   //////////////////   ", function (error) {
                if (error) {
                    return console.log("Error!!" + error);
                }
                console.log("Info has been added to log.txt file.");

            });
        }
    });
};

// Spotify
// =========================================================================================================================================================================================
function spotifyThis() {
    var spotify = new Spotify(keys.spotify);
    var nodeArgs = process.argv;
    var songName = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songName += "+" + nodeArgs[i];
        }

        else {
            songName += nodeArgs[i];
        }
    }

    spotify.search({type: 'track', query: songName, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    
        console.log("//////////////////////////////////////////////////////");
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
        console.log("Artist URL: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
        console.log("Album Title: " + data.tracks.items[0].album.name);
        console.log("Released: " + data.tracks.items[0].album.release_date);    
        console.log("Preview URL: " + data.tracks.items[0].preview_url); 
        console.log("//////////////////////////////////////////////////////");

        fs.appendFile("log.txt", "   //////////////////   " + "Song Title: " + data.tracks.items[0].name + "Artist: " + data.tracks.items[0].album.artists[0].name + "Artist URL: " + data.tracks.items[0].album.artists[0].external_urls.spotify + "Album Title: " + data.tracks.items[0].album.name + "Released: " + data.tracks.items[0].album.release_date + "Preview URL: " + data.tracks.items[0].preview_url + "   //////////////////   ", function(error) {
            if (error) {
                return console.log("Error!!" + error);
            }
            console.log("Info has been added to log.txt file.");   
        })
    });
};