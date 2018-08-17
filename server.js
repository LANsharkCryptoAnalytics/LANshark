const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js');
const db = require('./database-mySql/index.js');
require('dotenv').config();
const app = express(); // (2)
console.log(process.env.MAPQUESTKEY, 'MAPS');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('LANSHARK');


});
app.get('/broad', (req, res) => {
    // res.send('LANSHARK');
    //
    helpers.getNeighborhood(29.92878, -90.08422).then(body => body.json()).then((json)=>{  
        let place = helpers.formatNeighborhoodData(json)[0].title;
    helpers.getFullPage(`${place}, New Orleans`, req, res);
    }).catch(error => { console.error(error)});
    // console.log('neigh', helpers.getNeighborhood(29, -90, req, res));
//    helpers.getFullPage('Garden District, New Orleans', req, res);

    
});
app.get('/test', (req, res) => {
    
    helpers.getFullPage('Garden District, New Orleans', req, res);
    
});
// helpers.getPOINarrow(29.92878, -90.08422);

app.post('/login', (req, res) =>{
    console.log("server post login endpoint");
    helpers.loginUser(req, res).then( ()=> { console.log('login successfull, maybe...')}).catch((res)=>{console.log("failed to login")});
    // helpers.createUser(req, res).then(()=>{}).catch( ()=>{ console.log('failed to create');});
});

// helpers.searchByTitle('Garden District, New Orleans');
// helpers.getFullPage('Garden District, New Orleans');
app.listen( 8200, function() { 
    console.log('App listening on port 8200');
});


//This is what I had to do to get the Amazone EC2 instance to redirect
//from 8200 to 80. Works until we update the env file on the server or some
//other solution: something similar to this:
// https://forums.aws.amazon.com/thread.jspa?threadID=109440

//ec2 ip address: ec2-34-238-240-14.compute-1.amazonaws.com