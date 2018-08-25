const express = require('express');
// TODO: axios isn't used on this page
const axios = require('axios');
const bodyParser = require('body-parser');
const hnocSearch = require('./hnocSearch.js');
const helpers = require('./helpers.js');
const db = require('./database-mySql/index.js');
require('dotenv').config();

const app = express(); // (2)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => {
  res.send('LANSHARK');
});


app.get('/vcs', (req, res) => {
  console.log('vcs endoint hit');

  res.send('vcs endpoint');
});

app.get('/neighborhood', (req, res) => {
  // 29.975651,-90.076858
  // 29.9666281,-90.0914401
  // 40.747214,-74.007082
  // 29.928714, -90.001709
  // 29.976169,-90.076438
  // req.query.latitude.slice(0,9), req.query.longitude.slice(0,10), req.query.i

  // the current index in the neighborhoods array
  let i = req.query.i ? req.query.i : 0;
  const lat = req.query.latitude.slice(0, 9);
  const long = req.query.longitude.slice(0, 10);

  helpers.getNeighborhood(lat, long)
    .then(body => body.json())
    .then((json) => {
      const neighborhoods = helpers.formatNeighborhoodData(json).filter(n => n.type === 'neighborhood');

      if (i > neighborhoods.length) {
        i -= neighborhoods.length;
      }
      if (neighborhoods.length) {
        // TODO: these variables aren't used anywhere
        if (neighborhoods[i].coord) {
          long = neighborhoods[i].coord.split(' ')[0];
          lat = neighborhoods[i].coord.split(' ')[1];
        }
        // get the full page for the current neighborhood
        helpers.getFullPage(`${neighborhoods[i].title},_New_Orleans`)
          .then(({ data, response }) => {
            const results = helpers.formatResults(data.paragraph);

            if (data.paragraph.length > 100) {
              res.send(results);
            } else {
              helpers.getFullPage(neighborhoods[i].title)
                .then(({ data }) => {
                  const results = helpers.formatResults(data.paragraph);
                  if (data.paragraph.length < 100) {
                    helpers.getPOINarrow(lat, long)
                      .then((stuff) => {
                        const results = helpers.formatResults(stuff.data.query.pages[Object.keys(stuff.data.query.pages)].extract.replace(/[\r\n]/g, ''));
                        res.send(results);
                      }).catch((error) => { console.log(error); });
                  } else {
                    res.send(results);
                  }
                }).catch((error) => { console.log(error); });
            }
          }).catch((error) => { console.log(error); });
      } else {
        res.send(helpers.formatNeighborhoodData(json)[i].title);
      }
    })
    .catch((error) => { console.log(error); });
});

/**
 *  Endpoint for retrieving broad based information about the users current location
 */
app.get('/broad', (req, res) => {
  // req.query.i the current index passed from the client
  // req.query.latitude, req.query.longitude
  // '29.97616921','-90.0764381'
  let i = req.query.i ? req.query.i : 0;
  
  //29.976169,-90.076438
  //29.928714, -90.001709
  let lat = req.query.latitude.slice(0, 9);
  let long = req.query.longitude.slice(0, 10);

  helpers.getNeighborhood(lat, long).then(body => body.json()).then((json) => {
    // find the places nearby that aren't neighborhoods
    const placesNearby = helpers.formatNeighborhoodData(json).filter(n => n.type !== 'neighborhood' || n.type !== 'unincorporated community');
    console.log(placesNearby, '????????????????????????????????????????????????????????????????????????????');
    // ensure that the current index in the array is less than the length of the array
    // fix this calculation problem
    if (i > placesNearby.length) {
      i -= placesNearby.length;
    }
    if (!placesNearby) { res.send({ content: 'sorry there are no results in your area' }); }
    if (placesNearby) {
      if (placesNearby[i].coord) {
        long = placesNearby[i].coord.split(' ')[0];
        lat = placesNearby[i].coord.split(' ')[1];
      }
      //set the city
      const city = '_New_Orleans'
      // get the full page for the current neighborhood in current city
      let descs = placesNearby[i].type === '' ? [placesNearby[i].title] : [placesNearby[i].title, placesNearby[i].type];
      console.log(descs, "descs ????????????/");

      helpers.getFullPage(`${placesNearby[i].title},${city}`)
        .then(({ data }) => {
          const resultsNO = helpers.formatResults(data.paragraph);
          
          // search for the wikipedia article with the name and appended city
          if (resultsNO.length > 100) {
            placesNearby[i].content = descs.concat(resultsNO);
            res.send(placesNearby[i]);
          } else{ // search for the wikipedia article with the name without appended city
            helpers.getFullPage(placesNearby[i].title)
              .then(({ data }) => {
                const results = helpers.formatResults(data.paragraph);
                if (results[0].length > 100 && results.includes(city)) {
                  res.send(placesNearby[i]);
                } else {
                  // search for wikipedia article using generator search
                  helpers.getPOINarrow(lat, long)
                    .then((stuff) => {
                      const resultsPOI = helpers.formatResults(stuff.data.query.pages[Object.keys(stuff.data.query.pages)].extract.replace(/[\r\n]/g, ''));
                      if (resultsPOI.includes(placesNearby[i].title)) {
                        placesNearby[i].content = descs.concat(resultsPOI);
                      } else { placesNearby[i].content = descs; }
                      res.send(placesNearby[i]);
                    }).catch((error) => { throw error; });
                }
              });
          }
        }).catch((e) => { throw error; });
    }
  })
    .catch((error) => { console.log(error); });
});

// LOGIN RELATED INFORMATION

app.get('/isLoggedIn', (req, res) => {
  res.send('hitting server!!!!');
});

app.post('/login', (req, res) => {
  console.log('server post login endpoint');
  console.log(req.body, 'rrreeeqqqq......bbbbooooddddyyyy');
  // helpers.loginUser(req, res);
  // helpers.createUser(req, res);
  res.send(req.body);

  // res.send('logged in');
});

app.post('/signUp', (user, req, res) => {
  console.log('signUp user fired');
  console.log('user: ', user);
  console.log(req.body);
  res.send('sign up endpoint');
});

// Endpoint to allow a logged in user to save favorite locations or points of interest
app.post('/addToFavorites', (req, res) => {
  console.log('add to user favorites');
  console.log(req.body);
  helpers.addToFavorites(req)
    .then(() => {
      res.send('saved to favorites');
    }).catch(() => {
      console.log('unable to save');
    });
});
// helpers.searchByTitle('Garden District, New Orleans');
// helpers.getFullPage('Garden District, New Orleans');

app.listen(8200, () => {
  console.log('App listening on port 8200');
});

// ******************************************************************** */
// Information regarding the redirection of the server to port 80 from 8200
// This is what I had to do to get the Amazone EC2 instance to redirect
// from 8200 to 80. Works until we update the env file on the server or some
// other solution: something similar to this:
// https://forums.aws.amazon.com/thread.jspa?threadID=109440

// ec2 ip address: ec2-34-238-240-14.compute-1.amazonaws.com
