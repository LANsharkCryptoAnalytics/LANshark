const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js');

const app = express(); // (2)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello World!'));

// helpers.getNeighborhoodMap(29.92878, -90.08422);
// helpers.searchByAddress('1403 Washington Ave');
// helpers.searchByTitle('Garden District, New Orleans');
helpers.getFullPage('Garden District, New Orleans');
app.listen( 8200, function() { 
    console.log('App listening on port 8200');
});