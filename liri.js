require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require("moment");
var request = require("request");
// Get my Spotify keys:
var spotify = new Spotify(keys.spotify);

// Required Spotify
// Load the fs package to read and write
var fs = require("fs");
var action = process.argv[2];
var bLiri = process.argv[3];

switch (action) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}


function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + bLiri + "/events?app_id=codingbootcamp";
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {

            //console.log(response.data)
            if (response.data.length !== 0) {


                var data = response.data;
                var name = data[0].venue.name;
                var city = data[0].venue.city;
                var date = data[0].datetime;
                console.log("Venue Name:", name);
                console.log("Location:", city);
                console.log("Date:", moment(date).format("MM/DD/YYYY"));
                fs.appendFile("log.txt", "," + data, (err) => {
                    if (err) throw err;
                });

            } else {
                console.log("Unfortunately, there was no event for " + bLiri);
            }

            // console.log(name, city, date)
            //console.log("Release Year: " + response.date.Year);
            // fs.appendFile('')
        }
    )
}

function spotifySong() {
    if (!bLiri) {
        bLiri = "the sign by ace of base"
    };

    spotify.search({ type: 'track', query: bLiri }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);

        };

        var data = data.tracks.items

        console.log("========================")
        console.log("The Artist is: " + data[0].artists[0].name);
        console.log("The song title is: " + data[0].name);
        console.log("Preview Link: " + data[0].preview_url);
        console.log("The album title is: " + data[0].album.name);
        //console.log(data);
        fs.appendFile("log.txt", "," + data, (err) => {
            if (err) throw err;
        });
    });
};
function movieThis() {
    if (!bLiri) {
        bLiri = "Mr. Nobody."
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + bLiri + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[2].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
        };
        fs.appendFile("log.txt", "," + body, (err) => {
            if (err) throw err;
        });

    });
};
function doWhatItSays() {
    //console.log("Are you calling this funtion")
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        data = data.split(",");
        action = data[0];
        bLiri = data[1];
console.log("Action received is:" , action)
        switch (action) {
            case "spotify-this-song":
                spotifySong()
                break;
        }
        //run();
    });
};