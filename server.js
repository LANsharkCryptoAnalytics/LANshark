const express = require('express');
const axios = require('axios');

const bodyParser = require('body-parser');
const helpers = require('./helpers.js');
const db = require('./database-mySql/index.js');
require('dotenv').config();
const app = express(); // (2)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('LANSHARK');


}); 

app.get('/neighborhood', (req, res) => {
    //29.9756517,-90.0768586
    //29.9666281,-90.0914401
    //40.747214,-74.007082
    //29.928714, -90.001709
    //req.query.latitude.slice(0,9), req.query.longitude.slice(0,10)
    helpers.getNeighborhood(29.928714, -90.001709).then(body => body.json()).then((json)=>{  
        let neighborhoods = helpers.formatNeighborhoodData(json).filter(n => {
            return n.type === "neighborhood";
        });
        if(neighborhoods.length){
            if(neighborhoods[0].coord){
        const long = neighborhoods[0].coord.split(' ')[0];
        const lat = neighborhoods[0].coord.split(' ')[1];
            }
        }else{
            res.send(helpers.formatNeighborhoodData(json)[0].title);
        }
        helpers.getFullPage(neighborhoods[0].title).then(({ data, response }) => {
            let results = data.paragraph.replace(/ *\[[^)]*\] */g, " ");
            results = results.replace(/[\r\n]/g, " ");
            results = results.split('.');

            if(data.paragraph.length > 100){
                res.send(results);
            }else{
                helpers.getFullPage(`${neighborhoods[0].title},_New_Orleans`).then(({ data, response }) => {
                    let results = data.paragraph.replace(/ *\[[^)]*\] */g, " ");
                    results = results.replace(/[\r\n]/g, " ");
                    results = results.split('.');
                    res.send(results);
                });
                if(data.paragraph.length > 100){
                    res.send(neighborhoods[0].title);
                }
            }
        }).catch(function (error) {
          console.log(error);
        });

    //     helpers.getPOINarrow(lat, long).then(stuff=> {
    //         // console.log(stuff.data.query.pages[Object.keys(stuff.data.query.pages)].extract);
    //         results = stuff.data.query.pages[Object.keys(stuff.data.query.pages)].extract.replace(/[\r\n]/g, "");
    //         results = results.replace(/<[^>]+>/g, ' ')
    //         results = results.replace('  ', ' ').trim();
    //         results = results.split('.');
    //         res.send(results);
        })
        .catch(function (error) {
          console.log(error);
        });
    //     // let place = helpers.formatNeighborhoodData(json)[0].title;
    // }).catch(error => { console.error(error)});
    // console.log('neigh', helpers.getNeighborhood(29, -90, req, res));
});

// helpers.searchByTitle('Christ Church Cathedral, New Olocationrleans');
app.get('/broad', (req, res) => {
    // console.log( req.query.latitude.slice(0,9), req.query.longitude.slice(0,10)) ;
    helpers.getPOINarrow( req.query.latitude.slice(0,9), req.query.longitude.slice(0,10)).then(stuff=> {
        console.log(stuff.data.query);
        results = stuff.data.query.pages[Object.keys(stuff.data.query.pages)].extract.replace(/[\r\n]/g, "");
        results = results.replace(/<[^>]+>/g, ' ')
        results = results.replace('  ', ' ').trim();
        results = results.split('.');
        res.send(results);
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.get('/narrow', (req, res) => {
    helpers.getFullPageURI('http://ec2-34-238-240-14.compute-1.amazonaws.com/prenarrow', req, res);
});
app.get('/test', (req, res) => {
    
    helpers.getFullPage('Garden District, New Orleans', req, res);
    
});


app.post('/login', (req, res) =>{
    console.log("server post login endpoint");
    helpers.loginUser(req, res);
    // helpers.createUser(req, res).then(()=>{}).catch( ()=>{ console.log('failed to create');});
});

app.patch('/addToFavorites', (req, res)=>{
    console.log('add to user favorites');
    helper.addToFavorites(req, res);
})

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