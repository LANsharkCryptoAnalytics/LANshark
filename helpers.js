const axios = require('axios');
const fetch = require('node-fetch');
const scrapeIt = require('scrape-it');
const db = require('./database-mySql/dbHelpers.js')

exports.formatResults = (text) => {
  let results = text;
  results = results.replace(/\[(.*?)\]/g, ' ');
  results = results.replace(/[\r\n]/g, ' ');
  results = results.replace(/<[^>]+>/g, ' ');
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
    results[i] = results[i].replace(/  /g, ' ');
    results[i] = results[i].replace(/  /g, ' ');
  });
  return results;
  // return results.split(/[,.;]+/);
};
exports.getNeighborhood = (lat, long) => {
  const endpointUrl = 'https://query.wikidata.org/sparql';
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

  const fullUrl = `${endpointUrl}?query=${encodeURIComponent(sparqlQuery)}`;

  const headers = { Accept: 'application/sparql-results+json' };

  return fetch(fullUrl, {
    headers,
  });
};

exports.formatNeighborhoodData = ((json) => {
  const hood = [];
  const place = {};
  const places = [];
  const {
    head: {
      vars,
    },
    results,
  } = json;
  
  for (const result of results.bindings) {
    hood.push(result)
    for (const variable of vars) {
      place[variable] = result[variable];
    }
  }
  hood.forEach((place) => {
    // filter out results that don't have a title
    let type = null;
    let dist = null;
    if (place.instance_ofLabel !== undefined) {
      type = place.instance_ofLabel.value;
    }
    if (place.dist !== undefined) {
      dist = place.dist.value;
    }
    if (place.placeLabel.value[0] !== 'Q' && place.placeLabel.value.length !== 9) {
      if (place.placeLabel) {
        places.push({
          title: place.placeLabel.value,
          coord: place.coordinate_location.value.slice(6, -1),
          dist: dist,
          type: type
        })
      }
    }
  });
  console.log(places);
  return places;
});

// Retrieves the full wikipedia page for a given title
exports.getFullPage = (title, req, res) => {

  title = title.split(' ').join('_');
  const url = `https://en.wikipedia.org/wiki/${title}`;
  // console.log(url);
  return scrapeIt(url, {
    title: 'h1',
    paragraph: 'p',
  });
};

// Retrieves the neighboorhood map using a wikipedeai Sparql query
exports.getNeighborhoodMap = (lat, long, req, res) => {
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
    Accept: 'application/sparql-results+json'
  };

  fetch(fullUrl, {
    headers,
  }).then(body => body.json()).then((json) => {
    const {
      head: {
        vars,
      },
      results,
    } = json;

    for (const result of results.bindings) {
      for (const variable of vars) {
        console.log('%s: %o', variable, result[variable]);
      }
      console.log('---');
    }
  });
}

exports.getPOINarrow = (lat, long) => axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates%7Cpageimages%7Cpageterms%7Cextracts&exlimit=5&generator=geosearch&colimit=1&piprop=thumbnail&pithumbsize=144&pilimit=10&wbptterms=description&ggscoord=${lat}%7C${long}&ggsradius=1500&ggslimit=1`);

// get the address at the current lat and long
// MapQuet API key is required
// https://www.mapquestapi.com/geocoding/v1/reverse?key=KEY&location=29.92878%2C-90.08422&outFormat=json&thumbMaps=false

exports.getAddress = (lat, long, req, res) => {
  return axios.get(`https://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.MAPQUESTKEY}&location=${lat}%2C${long}&outFormat=json&thumbMaps=false`);
  // https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=1403+Washington+Ave
};

exports.searchByAddress = (add, req, res) => {
  add = add.split(' ').join('+');
  axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${add}+New+Orleans`)
    .then((res) => res.data.query)
    .catch((error) => {
      console.log(error);
    });
}

exports.searchByTitle = (title, req, res) => {
  title = title.split(' ').join('+');
  axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${title}`)
    .then((res) => { return res.data.query; })
    .catch((error) => {
      console.log(error);
    });
};

exports.getFullPageURI = (uri, req, res) => {
  scrapeIt(uri, {
    title: 'h1',
    paragraph: 'p',
  })
    .then(({ data, response }) => {
      let results = data.paragraph.replace(/ *\[[^)]*\] */g, ' ');
      results = results.replace(/[\r\n]/g, '');
      results = results.split('.');
      // console.log(results);
      res.send(results);
    }).catch((error) => {
      console.log(error);
    });
};
/////////////////////////////////////////////
//   USER RELATED FUNCTIONS                //
/////////////////////////////////////////////

exports.loginUser = (user, response, reject) => {
  console.log('login user helper fired');
  // TODO:give me data Senai !

  // the below works but this isn't really the proper place for it
  // possible shift to findAndUPdate or something similar
  // db.findUser(user.body).then((userData)=>{
  //   console.log(`response ${userData}`);
  //   console.log('do whatever we need to do here to log them in');

  // }).catch( (err)=> { console.log(err)});
}

exports.createUser = (user, response, reject) => {
  console.log('create user helper fired');

  db.createUser = (userInfo, sequelize) => {
    (userInfo.body).then((userData) => {
      console.log(`response ${userData}`);
      console.log('do whatever we need to do here to log them in');
      // res.end();
    }).catch((err) => {
      console.log(err);
    });
  }
}

// addToUserFavorites
exports.addToFavorites = (favorite, response, reject) => {
  console.log('addToUserFavorites');
  db.addToUserFavorites(favorite).then((response) => {
    console.log('favorite added', response);
    res.end;
  }).catch((reject) => {
    console.log('reject');
  });
};

/////////////////////////////////////////////////////////
// END OF USER RELATED FUNCTIONS                       //
/////////////////////////////////////////////////////////


exports.neighborhoodCreate = (neighborhood, res, reject) => {
  console.log('neighborhoodCreate');
  db.createNeighborhood(neighborhood).then((response) => {
    console.log('hood created', response);
    res.end();
  }).catch((reject) => {
    console.log('reject');
  });
};

exports.poiCreate = (poi, response, reject) => {
  console.log('poiCreate');
  db.createPoi(poi).then((response) => {
    console.log('poi created', response);
    res.end;
  }).catch((reject) => {
    console.log('reject');
  });
};

exports.vcsCreate = (vcsInfo, res, reject) => {
  console.log('vieux carre address entry create fired');
  db.createVcs(vcsInfo).then((response) => {
    console.log('vc data created', response);
    res.end();
  }).catch((reject) => {
    console.log("you're a reject");
  });
};
