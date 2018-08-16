const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js');
const db = require('./database-mySql/index.js');

const app = express(); // (2)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    // res.send('LANSHARK');
    // helpers.getFullPage('Garden District, New Orleans', req, res);
    // helpers.getNeighborhood(29.92878, -90.08422, req, res);
});
// helpers.getPOINarrow(29.92878, -90.08422);


// helpers.searchByTitle('Garden District, New Orleans');
// helpers.getFullPage('Garden District, New Orleans');
app.listen( 8200, function() { 
    console.log('App listening on port 8200');
});

//This is what I had to do to get the Amazone EC2 instance to redirect
//from 8200 to 80. Works until we update the env file on the server or some
//other solution

//ec2 ip address: ec2-34-238-240-14.compute-1.amazonaws.com