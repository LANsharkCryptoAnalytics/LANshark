const axios = require('axios');
const fetch = require('node-fetch');
const scrapeIt = require('scrape-it');
const db = require('./database-mySql/dbHelpers.js');
/**
 * format and parse the string from html
 * @param {String} text the string to format
 * @returns {array} formatted text split into lines for display
 */
exports.formatResults = (text) => {
  let results = text;
  results = results.replace(/\[(.*?)\]/g, ' ');
  results = results.replace(/[\r\n]/g, ' '); // remove new lines
  results = results.replace(/<[^>]+>/g, ' '); // parse html tags
  results = results.trim();
  results = results.split('—');
  results = results.join(' ');
  results = results.split(' ');
  results.forEach((sentence, i) => {
    let result = sentence;
    result = result.trim();
    result = result.split(' ');

    result = result.join('');
    result = result.split('');
    if (result.length < 7 && result[0]) {
      result.forEach((char) => {
        if (char === char.toUpperCase()) {
          results.splice(i, 1, result.join('').replace(/\./g, ''));
        }
      });
    }
  });
  results = results.join(' ');
  results = results.split(/[,.;]+/);
  results.forEach((result, i) => {
    results[i] = result.trim();
    results[i] = results[i].replace(/ {2}/g, ' ');
    results[i] = results[i].replace(/ {2}/g, ' ');
  });
  return results;
};
/**
 * get neighborhood at a current location
 * @param {String} lat the latitude of the current location
 * @param {String} long the longitude of the current location
 * @returns {function} fetch with the sparql query for lat and long at current location
 */
exports.getNeighborhood = (lat, long) => {
  //  endpoint for sparql query
  const endpointUrl = 'https://query.wikidata.org/sparql';
  //  sparql query for geo sparql getting place, coordinate location,
  //  and instance of label and image if it exists
  //  sorted by distance
  const sparqlQuery = `PREFIX geo: <http://www.opengis.net/ont/geosparql#>
    SELECT ?place ?placeLabel ?image ?coordinate_location ?dist ?instance_of ?instance_ofLabel WHERE {
      SERVICE wikibase:around {
        ?place wdt:P625 ?coordinate_location.
        bd:serviceParam wikibase:center "Point(${long} ${lat})"^^geo:wktLiteral.
        bd:serviceParam wikibase:radius "1".
        bd:serviceParam wikibase:distance ?dist.
      }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      OPTIONAL { ?place wdt:P18 ?image. }
      OPTIONAL { ?place wdt:P31 ?instance_of. }
    }
    ORDER BY ASC(?dist)
    LIMIT 100`;
  // putting the two urls together to make a full url
  const fullUrl = `${endpointUrl}?query=${encodeURIComponent(sparqlQuery)}`;
  // json formatted results
  const headers = { Accept: 'application/sparql-results+json' };
  return fetch(fullUrl, {
    headers,
  });
};
/**
 * formats the data received from the wikidata API call
 * @param {String} json the json formatted results from the query
 * @returns {Array} place an array of objects containing data about all of the places
 */
exports.formatNeighborhoodData = ((json) => {
  const hood = []; // array for storing all of the current neighborhoods
  const place = {}; // object for storing data about the current place
  const places = []; // an array for storing all the place objects in the area
  const { // getting the variables and results from json data
    head: {
      vars,
    },
    results,
  } = json;
  // get all of the variable names and results for each place
  // in the neighborhood and store them in an object
  results.bindings.forEach((result) => {
    hood.push(result);
    vars.forEach((variable) => {
      place[variable] = result[variable];
    });
  });
  hood.forEach((currPlace) => {
    // filter out results that don't have a title
    let type = '';
    let dist = '';
    let wideWiki = '';
    let narrowWiki = '';
    let wikiImage = '';
  
    // check for instance of label
    if (currPlace.instance_ofLabel !== undefined) {
      type = currPlace.instance_ofLabel.value;
      if (currPlace.instance_ofLabel.value === 'neighborhood' || currPlace.instance_ofLabel.value === 'unincorporated community') {
        wideWiki = currPlace.place.value;
      } else {
        narrowWiki = currPlace.place.value;
      }
    }
    if (currPlace.image) {
      wikiImage = currPlace.image.value;
    }
    // check for distance
    if (currPlace.dist !== undefined) {
      dist = currPlace.dist.value;
    }
    // filter out results saved by wikidata ID and add the formatted places to the array
    if (currPlace.placeLabel.value[0] !== 'Q' && currPlace.placeLabel.value.length !== 9) {
      if (currPlace.placeLabel) {
        places.push({
          title: currPlace.placeLabel.value,
          coord: currPlace.coordinate_location.value.slice(6, -1),
          dist,
          type,
          wideWiki,
          narrowWiki,
          wikiImage,
        });
      }
    }
  });
  return places;
});
/**
 * gets a full page parsed by scrapeIt
 * @param {String} lat the latitude of the current location
 * @param {String} long the longitude of the current location
 * @returns {function} fetch with the sparql query for lat and long at current location
 */
exports.getFullPage = (pagetitle) => {
  const title = pagetitle.split(' ').join('_');
  const url = `https://en.wikipedia.org/wiki/${title}`;
  return scrapeIt(url, {
    title: 'h1',
    paragraph: 'p',
  });
};
/**
 * Retrieves the neighboorhood map using a wikipedia Sparql query currently not being used
 * get neighborhood map at a current location
 * @param {String} lat the latitude of the current location
 * @param {String} long the longitude of the current location
 * @returns {function} fetch with the sparql query for lat and long at current location
 */
exports.getNeighborhoodMap = (lat, long) => {
  const endpointUrl = 'https://query.wikidata.org/sparql';
  const sparqlQuery = `#defaultView:Map{"layer":"?instance_ofLabel"}
      SELECT ?place ?placeLabel ?image ?coordinate_location ?dist ?instance_of ?instance_ofLabel WHERE {
        SERVICE wikibase:around {
          ?place wdt:P625 ?coordinate_location.
          bd:serviceParam wikibase:center "Point(${long} ${lat})"^^geo:wktLiteral .
          bd:serviceParam wikibase:radius "1".
          bd:serviceParam wikibase:distance ?dist.
        }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        OPTIONAL { ?place wdt:P18 ?image. }
        OPTIONAL { ?place wdt:P31 ?instance_of. }
      }`;

  const fullUrl = `${endpointUrl}?query=${encodeURIComponent(sparqlQuery)}`;

  const headers = {
    Accept: 'application/sparql-results+json',
  };
  return fetch(fullUrl, {
    headers,
  });
};
/**
 * search for wikipedia article using generator search
 * gets the closest full article
 * @param {String} lat the latitude of the current location
 * @param {String} long the longitude of the current location
 * @returns {function} the axios get request for wikipedia
 */
exports.getPOINarrow = (lat, long) => axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates%7Cpageimages%7Cpageterms%7Cextracts&exlimit=5&generator=geosearch&colimit=1&piprop=thumbnail&pithumbsize=144&pilimit=10&wbptterms=description&ggscoord=${lat}%7C${long}&ggsradius=1500&ggslimit=1`);

// https://www.mapquestapi.com/geocoding/v1/reverse?key=KEY&location=29.92878%2C-90.08422&outFormat=json&thumbMaps=false
/**
 * Retrieves the address from coordinate
 * MapQuest API key is required
 * @param {String} lat the latitude of the current location
 * @param {String} long the longitude of the current location
 * @returns {function} the axios get request for mapquest
 */
exports.getAddress = (lat, long) => axios.get(`https://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.MAPQUESTKEY}&location=${lat}%2C${long}&outFormat=json&thumbMaps=false`);
// https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=1403+Washington+Ave


/**
 * Retrieves the wikipedia search result at an address
 * @param {String} address the address to search
 * @returns {function} the axios get request for wikipedia
 */
exports.searchByAddress = (address) => {
  const add = address.split(' ').join('+');
  return axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${add}+New+Orleans`);
};

exports.searchHnoc = searchString => db.hnocSearch(searchString);
/**
 * gets a search results from wikipedia by title
 * @param {String} titleInput the title to search
 * @returns {function} the axios get request for wikipedia
 */
exports.searchByTitle = (titleInput) => {
  const title = titleInput.split(' ').join('+');
  return axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${title}`);
};

// ///////////////////////////////////////////
//   USER RELATED FUNCTIONS                //
// //////////////////////////////////////////

exports.loginUser = (user) => {
  console.log('login user helper fired');

  // the below works but this isn't really the proper place for it
  // possible shift to findAndUPdate or something similar
  return db.findUser(user.body);
};

// Create a new user
exports.createUser = (user, response, reject) => {
  console.log('create user helper fired', user);
  return db.createUser(user, sequelize);
};

// addToUserFavorites
exports.addToFavorites = (favorite) => {
  // console.log('addToUserFavorites');
  // const favorite = favorite
  db.addToUserFavorites(favorite);
};

exports.getAllUserFavorites = (user) => {
  console.log('helpers get all user favorites');
  return db.findUserFavorites(user.id);
};

// ///////////////////////////////////////////////////////
// END OF USER RELATED FUNCTIONS                       //
// ///////////////////////////////////////////////////////

// Create data helpers
exports.neighborhoodCreate = (neighborhood) => {
  console.log('neighborhoodCreate');
  db.createNeighborhood(neighborhood);
};

exports.poiCreate = (poi) => {
  console.log('poiCreate');
  db.createPoi(poi);
};

exports.vcsCreate = (vcsInfo) => {
  console.log('vieux carre address entry create fired');
  db.createVcs(vcsInfo);
};
