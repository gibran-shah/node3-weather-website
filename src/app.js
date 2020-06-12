const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const hbs = require('hbs');

const express = require('express');
const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.use(express.static(path.join(__dirname, '../public/about.html')));
// app.use(express.static(path.join(__dirname, '../public/help.html')));

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, res) => {
//     res.send([
//         {name: 'Gibran', age: 43},
//         {name: 'Cassidy', age: 11}
//     ]);
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');
// });

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gibran Shah'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        image: 'img/amazon pool house.jpg' 
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'What do you need help with?'
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        });
        return;
    }

    res.send({
        products: []
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'There\'s no fucking address you retard.'
        });
    }

    const address = req.query.address;

    geocode(address, (error, {latitude, longitude, location}) => {
        if (error) return res.status(500).send(error);
        forecast(latitude, longitude, (err, forecastData) => {
            if (err) return res.status(500).send(error);    
            return res.status(200).send({
                'forecast': forecastData,
                'location': location,
                'address': address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Help topic not found.'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});