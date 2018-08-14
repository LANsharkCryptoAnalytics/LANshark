const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js');

const app = express(); // (2)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello World!'));

// helpers.getNeighborhood(29.92878, -90.08422);
// helpers.searchByAddress('1403+Washington+Ave');

app.listen(8200 || process.env, function() { 
    console.log('App listening on port 8200');
});