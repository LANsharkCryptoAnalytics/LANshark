const express = require('express');
//TODO: axios isn't used on this page
const axios = require('axios');

const bodyParser = require('body-parser');
const helpers = require('./helpers.js');
const db = require('./database-mySql/index.js');
require('dotenv').config();
const app = express(); // (2)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.send('LANSHARK');
});

app.get('/isLoggedIn', (req, res) => {
  res.send('hitting server!!!!');
});

app.get('/neighborhood', (req, res) => {
  // 29.975651,-90.076858
  // 29.9666281,-90.0914401
  // 40.747214,-74.007082
  // 29.928714, -90.001709
  // req.query.latitude.slice(0,9), req.query.longitude.slice(0,10), req.query.i

  // TODO: What does i represent?
  let i = req.query.i ? req.query.i : 0;
  const lat = req.query.latitude.slice(0, 9);
  const long = req.query.longitude.slice(0, 10);

  helpers.getNeighborhood(lat, long)
    .then(body => body.json())
    .then((json) => {
      let neighborhoods = helpers.formatNeighborhoodData(json).filter((n) => {
        return n.type === 'neighborhood';
      });
            
      if (i > neighborhoods.length) {
        i = i - neighborhoods.length;
      }
      if (neighborhoods.length) {
        // TODO: these variables aren't used anywhere
        if (neighborhoods[i].coord) {
          const long = neighborhoods[i].coord.split(' ')[0];
          const lat = neighborhoods[i].coord.split(' ')[1];
        }
        // get the full page for the current neighborhood
        helpers.getFullPage(`${neighborhoods[i].title},_New_Orleans`)
          .then(({ data, response }) => {
            let results = helpers.formatResults(data.paragraph);

            if (data.paragraph.length > 100) {
              res.send(results);
            } else {
              helpers.getFullPage(neighborhoods[i].title)
                .then(({ data,response }) => {
                  let results = helpers.formatResults(data.paragraph);
                  if (data.paragraph.length < 100) {
                    helpers.getPOINarrow(lat, long)
                      .then((stuff) => {
                        let results = helpers.formatResults(stuff.data.query.pages[Object.keys(stuff.data.query.pages)].extract.replace(/[\r\n]/g, ''));
                        res.send(results);
                      }).catch((error) => { console.log(error); });
                  } else {
                    res.send(results);
                  }
                }).catch(function (error) { console.log(error); });
            }
          }).catch(function (error) { console.log(error); });
      } else {
        res.send(helpers.formatNeighborhoodData(json)[i].title);
      }
    })
    .catch(function (error) { console.log(error); });
});

// Endpoint for retrieving broad based information about the users current location
app.get('/broad', (req, res) => {
  // TODO: please add addittional comments for readability and to facilitate testing
  // and so that we can all understand the algorithm 
  // req.query.i represents what?
  let i = req.query.i ? req.query.i : 0;
  const lat = req.query.latitude.slice(0, 9);
  const long = req.query.longitude.slice(0, 10);

  helpers.getNeighborhood(lat, long).then(body => body.json()).then((json) => {
    let neighborhoods = helpers.formatNeighborhoodData(json);
    // filter out the neighborhood results?
    if (i > 0) {
      // what does this function do, produce a list of neighborhoods as json?
      // or return a list of non neighborhoods?
      neighborhoods = helpers.formatNeighborhoodData(json).filter((n) => {
        return n.type !== 'neighborhood';
      });
    }
    // TODO: What is i?
    if (i > neighborhoods.length) {
      i = i - neighborhoods.length;
    }
    // if neighborhoods have length ?
    if (neighborhoods.length) {
      if (neighborhoods[i].coord) {
        // TODO: I don't believe these variable are being used anywhere
        const long = neighborhoods[i].coord.split(' ')[0];
        const lat = neighborhoods[i].coord.split(' ')[1];
      }
      // get the full page for the current neighborhood
      helpers.getFullPage(`${neighborhoods[i].title},_New_Orleans`)
        .then(({ data, response}) => {
          // Format the results using formatREsults function
          let results = helpers.formatResults(data.paragraph);
          // if paragraph is greater than 100 chars send results?
          if (data.paragraph.length > 100) {
            res.send(results);
          } else {
            // else get full page data for ?neighborhoods i?
            helpers.getFullPage(neighborhoods[i].title)
              .then(({data,response }) => {
                let results = helpers.formatResults(data.paragraph);
                // if paragraph is less than 100 chars get narrow info???
                if (data.paragraph.length < 100) {
                  helpers.getPOINarrow(lat, long)
                    .then((stuff) => {
                      let results = helpers.formatResults(stuff.data.query.pages[Object.keys(stuff.data.query.pages)].extract.replace(/[\r\n]/g, ''));
                      res.send(results);
                    }).catch((error) => { console.log(error); });
                } else { res.send(results); }
              }).catch((error) => { console.log(error); });
          }
        }).catch((error) => { console.log(error); });
    } else {
      res.send(helpers.formatNeighborhoodData(json)[i].title);
    }
  }).catch((error) => { console.log(error); });
});

app.post('/login', (req, res) => {
  console.log('server post login endpoint');
  console.log(req.body, 'rrreeeqqqq......bbbbooooddddyyyy')
  // helpers.loginUser(req, res);
  // helpers.createUser(req, res);
  res.send("logged in");
});

app.post('/signUp', (user, req, res) => {
  console.log('signUp user fired');
  console.log('user: ', user);
});

// Endpoint to allow a logged in user to save favorite locations or points of interest
app.post('/addToFavorites', (req, res) => {
  console.log('add to user favorites');
  console.log(req.body);
  // helper.addToFavorites(req, res);
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