require(".env").config();

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var Spotify = require('node-spotify-api');

var nodeArgs = process.argv;

var songName = process.argv[3];
 
// var spotify = new Spotify({
//   id: <>,
//   secret: <your spotify client secret>
// });
var spotifyRequest = function () {
spotify.search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

  spotify.search({
    type: "track",
    query: songName
  }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    // spotify URL + string from array + the api key
    var queryURL = 'https://api.spotify.com' + songName + '/v1/albums/{id}/tracks';
    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
      // If the request is successful
      if (!error && response.statusCode === 200) {
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log('Release Year: ' + JSON.parse(body).Year);
      }
    })  
    spotifyRequest();
})
};
