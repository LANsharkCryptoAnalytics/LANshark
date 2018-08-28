let passport = require('passport'),
   LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const bodyParser = require('body-parser');
const hnocSearch = require('./hnocSearch.js');
const helpers = require('./helpers.js');
const dbHelpers = require('./database-mySql/dbHelpers');
const db = require('./database-mySql/index.js');
require('dotenv').config();

const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => {
  res.send('LANSHARK');
});

app.get('/vcs', (req, res) => {
  console.log('vcs endpoint hit');
  res.send('vcs endpoint');
});

/**
 *  Endpoint for retrieving neighborhood information about the users current location
 */
app.get('/neighborhood', (req, res) => {
  // '29.975651''-90.076858'
  // '29.966628','-90.091440'
  // 40.747214,-74.007082
  // 29.928714, -90.001709
  // 29.976169,-90.076438
  // req.query.latitude.slice(0,9), req.query.longitude.slice(0,10)
  const i = 0;
  let lat = req.query.latitude.slice(0, 9);
  let long = req.query.longitude.slice(0, 10);
  helpers.getNeighborhood(lat, long).then(body => body.json()).then((json) => {
    // find the neighborhoods
    const neighborhoods = helpers.formatNeighborhoodData(json).filter(placeNearby => placeNearby.type === 'neighborhood');
    if (!neighborhoods) { res.send({ content: 'sorry there are no results in your area' }); }
    if (neighborhoods) {
      if (neighborhoods[i].coord) {
        long = neighborhoods[i].coord.split(' ')[0];
        lat = neighborhoods[i].coord.split(' ')[1];
      }
      // set the city
      const city = '_New_Orleans';
      // filter out empty types
      const descs = neighborhoods[i].type === '' ? [neighborhoods[i].title] : [neighborhoods[i].title, neighborhoods[i].type];
      const city2 = city.replace(/_/g, ' ').trim();
      // get the full page for the current neighborhood in current city
      helpers.getFullPage(`${neighborhoods[i].title},${city}`)
        .then(({ data }) => {
          const resultsNO = helpers.formatResults(data.paragraph);
          // check for short results and only results in current city
          if (resultsNO.join().length > 50 && resultsNO.join().includes(city2)) {
            neighborhoods[i].content = descs.concat(resultsNO);
            res.send(neighborhoods[i]);
          } else { // search for the wikipedia article with the name without appended city
            helpers.getFullPage(neighborhoods[i].title)
              .then(({ data }) => {
                const results = helpers.formatResults(data.paragraph);
                // check for short results and only results in current city
                if (results.join().length > 50 && results.join().includes(city2)) {
                  neighborhoods[i].content = descs.concat(results);
                  res.send(neighborhoods[i]);
                } else {
                  // search for wikipedia article using generator search
                  helpers.getPOINarrow(lat, long)
                    .then((stuff) => {
                      const resultsPOI = helpers.formatResults(stuff.data.query.pages[Object.keys(stuff.data.query.pages)].extract.replace(/[\r\n]/g, ''));
                      if (resultsPOI.includes(neighborhoods[i].title)) {
                        neighborhoods[i].content = descs.concat(resultsPOI);
                      } else { neighborhoods[i].content = descs; }
                      res.send(neighborhoods[i]);
                    }).catch((error) => { throw error; });
                }
              });
          }
        }).catch((error) => { throw error; });
    }
  }).catch((error) => { throw error; });
});

/**
 *  Endpoint for retrieving broad information about the users current location
 */
app.get('/broad', (req, res) => {
  // req.query.i the current index passed from the client
  // req.query.latitude, req.query.longitude
  // '29.97616921','-90.0764381'
  const i = req.query.i ? req.query.i : 0;
  // 29.976169,-90.076438
  // 29.928714, -90.001709
  let lat = req.query.latitude.slice(0, 9);
  let long = req.query.longitude.slice(0, 10);
  helpers.getNeighborhood(lat, long).then(body => body.json()).then((json) => {
    // find the places nearby that aren't neighborhoods
    const placesNearby = helpers.formatNeighborhoodData(json).filter(place => (place.type !== 'neighborhood' && place.type !== 'unincorporated community'));
    placesNearby.forEach((_place, i) => {
      if (placesNearby[i + 1]) {
        if (placesNearby[i].title === placesNearby[i + 1].title) {
          placesNearby.splice(i + 1, 1);
        }
      }
    });
    if (!placesNearby) { res.send({ content: 'sorry there are no results in your area' }); }
    if (placesNearby) {
      if (placesNearby[i].coord) {
        long = placesNearby[i].coord.split(' ')[0];
        lat = placesNearby[i].coord.split(' ')[1];
      }
      // set the city
      const city = '_New_Orleans';
      // filter out empty types
      const descs = placesNearby[i].type === '' ? [placesNearby[i].title] : [placesNearby[i].title, placesNearby[i].type];
      const city2 = city.replace(/_/g, ' ').trim();
      // get the full page for the current place in current city
      helpers.getFullPage(`${placesNearby[i].title},${city}`)
        .then(({ data }) => {
          const resultsNO = helpers.formatResults(data.paragraph);
          // check for short results and only results in current city
          if (resultsNO.join().length > 50 && resultsNO.join().includes(city2)) {
            placesNearby[i].content = descs.concat(resultsNO);
            res.send(placesNearby[i]);
          } else { // search for the wikipedia article with the name without appended city
            helpers.getFullPage(placesNearby[i].title)
              .then(({ data }) => {
                const results = helpers.formatResults(data.paragraph);
                // check for short reaults and only results in current city
                if (results.join().length > 50 && results.join().includes(city2)) {
                  placesNearby[i].content = descs.concat(results);
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
        }).catch((error) => { throw error; });
    }
  }).catch((error) => { throw error; });
});

// LOGIN RELATED INFORMATION

app.post('/login', (req, res) => {
  const userInfo = req.body;
  console.log('0987654321qwertghjnbvcertyuik-------------------------------------     ', userInfo);
  const password = req.body.password;
  const success = 'true';
  dbHelpers.findUserLogin(userInfo)
    .then((user) => {
      if (user !== null) {
        dbHelpers.comparePassword(password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            res.send({ user, success });
            // const token = jwt.sign(tokenData, process.env.LOCALSECRET);
            // res.json(`JWT ${token}`);
          } else {
            res.send('Password is incorrect');
          }
        });
      } else {
        res.send('false');
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post('/signup', (req, res) => {
  const userObject = req.body;
  dbHelpers.findUserSignup(userObject)
    .then((response) => {
      if (response !== 'false') {
        dbHelpers.hashPassword(userObject);
        res.send('true');
      } else {
        res.send('false');
      }
    })
    .catch((error) => { throw error; });
});

// Endpoint to allow a logged in user to save favorite locations or points of interest
app.post('/addToFavorites', (req) => {
  console.log('add to user favorites');
  console.log(req.body);
  helpers.addToFavorites(req.body)
    .then(() => {
      console.log('saved');
      res.send('saved to favorites');
    })
    .catch(() => {
      console.log('error saving');
    });
});

app.get('/getUserFavorites', (req, res) => {
  console.log('get all user favorites ');
  // console.log(req.query);
  helpers.getAllUserFavorites(req.query)
    .then((favorites) => {
      console.log('server.js', favorites);
      res.send(favorites);
    })
    .catch((error) => {
      console.log('error retrieving favorites', error);
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
