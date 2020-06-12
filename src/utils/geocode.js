const request = require('request');
const mapboxToken = 'pk.eyJ1IjoiZ2licmFuLXNoYWgiLCJhIjoiY2s4ZHc4NW9hMHc0djNlbzFsZHpnNHdsMSJ9.0Umrh8TW_XpLg2PjUVBNPw';
const mapboxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const geocode = (address, callback) => {
    const mapboxUrl = `${mapboxBaseUrl}${encodeURIComponent(address)}.json?access_token=${mapboxToken}&limit=1`;
    request({url: mapboxUrl, json: true}, (error, {body}) => {
        if (body) {
            if (body.features && body.features.length > 0) {
                const feature = body.features[0];
                // const {label:productLabel, stock, rating = 5} = product;
                callback(undefined, {
                    longitude: feature.center[0],
                    latitude: feature.center[1],
                    location: feature.place_name
                });
            } else {
                callback('Unable to find location. Try another search.');
            }
        } else {
            callback('Unable to connect to location services.');
        }
    });
}

module.exports = geocode;