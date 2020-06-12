const request = require('request');

let darkskyUrl = 'https://api.darksky.net/forecast/0ac1fd45b0c66639a914a18ec827ba0f/';

const forecast = (lat, lon, callback) => {
    const url = darkskyUrl + lat + ',' + lon;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Could not connect to weather service.');
        } else if (body.error) {
            callback('Unable to find location.');
        } else {
            const weather = body.currently;
            callback(undefined, weather.summary + '. It is currently ' + weather.temperature + ' degrees. There is a ' + weather.precipProbability + '% chance of rain.');
        }
    });


}

module.exports = forecast;