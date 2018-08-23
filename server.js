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
    //29.975651,-90.076858
    //29.9666281,-90.0914401
    //40.747214,-74.007082
    //29.928714, -90.001709
    //req.query.latitude.slice(0,9), req.query.longitude.slice(0,10), req.query.i
    let i = req.query.i ? req.query.i : 0;
    helpers.getNeighborhood(req.query.latitude.slice(0,9), req.query.longitude.slice(0,10)).then(body => body.json()).then((json)=>{  
        let neighborhoods = helpers.formatNeighborhoodData(json).filter(n => {
            return n.type === "neighborhood";
        });
        
        if(i > 0){ neighborhoods = helpers.formatNeighborhoodData(json); }
        if(i > neighborhoods.length){ i = i - neighborhoods.length; }
        if(neighborhoods.length){
            if(neighborhoods[i].coord){
        const long = neighborhoods[i].coord.split(' ')[0];
        const lat = neighborhoods[i].coord.split(' ')[1];
            }
        
        helpers.getFullPage(`${neighborhoods[i].title},_New_Orleans`).then(({ data, response }) => {
            let results = data.paragraph.replace(/ *\[[^)]*\] */g, " ");
            results = results.replace(/[\r\n]/g, " ");
            results = results.split('.');

            if(data.paragraph.length > 100){
                res.send(results);
            }else{
                helpers.getFullPage(neighborhoods[i].title).then(({ data, response }) => {
                    let results = data.paragraph.replace(/ *\[[^)]*\] */g, " ");
                    results = results.replace(/[\r\n]/g, " ");
                    results = results.split('.');
                    res.send(results);
                });
                if(data.paragraph.length < 100){
                    res.send(neighborhoods[i].title);
                }
            }
        }).catch(function (error) {
          console.log(error);
        });
    }else{
        res.send(helpers.formatNeighborhoodData(json)[i].title);
    }
        })
        .catch(function (error) {
          console.log(error);
        });

});

app.get('/broad', (req, res) => {
    let i = req.query.i ? req.query.i : 0;
    helpers.getNeighborhood(req.query.latitude.slice(0,9), req.query.longitude.slice(0,10)).then(body => body.json()).then((json)=>{  
        let neighborhoods = helpers.formatNeighborhoodData(json).filter(n => {
            return n.type === "neighborhood";
        });
        //filter out the neighborhood results
        if(i >0){ neighborhoods = helpers.formatNeighborhoodData(json).filter(n => {
            return n.type !== "neighborhood";
        }); }
        if(i > neighborhoods.length){ i = i - neighborhoods.length; }
        if(neighborhoods.length){
            if(neighborhoods[i].coord){
        const long = neighborhoods[i].coord.split(' ')[0];
        const lat = neighborhoods[i].coord.split(' ')[1];
            }
        //get the full page for the current neighborhood
        helpers.getFullPage(`${neighborhoods[i].title},_New_Orleans`).then(({ data, response }) => {
            let results = helpers.formatResults(data.paragraph);

            if(data.paragraph.length > 100){
                res.send(results);
            }else{
                helpers.getFullPage(neighborhoods[i].title).then(({ data, response }) => {
                    let results = helpers.formatResults(data.paragraph);
                    // console.log(results);
                    res.send(results);
                
                if(data.paragraph.length < 100){
                    helpers.getPOINarrow( req.query.latitude.slice(0,9), req.query.longitude.slice(0,10)).then(stuff=> {
                        // console.log(stuff.data.query);
                        results = stuff.data.query.pages[Object.keys(stuff.data.query.pages)].extract.replace(/[\r\n]/g, "");
                        results = results.replace(/<[^>]+>/g, ' ')
                        results = results.replace('  ', ' ').trim();
                        results = results.split('.');
                        res.send(results);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }
            }).catch(function (error) {
                console.log(error);
              });
            }
        }).catch(function (error) {
          console.log(error);
        });
    }
    else{
        res.send(helpers.formatNeighborhoodData(json)[i].title);
    }
        })
        .catch(function (error) {
          console.log(error);
        });
    // console.log( req.query.latitude.slice(0,9), req.query.longitude.slice(0,10)) ;
    
});

app.get('/test', (req, res) => {
    
    // helpers.getFullPage('Garden District, New Orleans', req, res);
    helpers.getNeighborhoodMap(29.975651,-90.076858,req,res);
});


app.post('/login', (req, res) =>{
    console.log("server post login endpoint");
    helpers.loginUser(req, res);
    // helpers.createUser(req, res).then(()=>{}).catch( ()=>{ console.log('failed to create');});
});

app.patch('/addToFavorites', (req, res)=>{
    console.log('add to user favorites');
    console.log(req.body)
    // helper.addToFavorites(req, res);
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