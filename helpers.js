const axios = require('axios');
const fetch = require('node-fetch');
const scrapeIt = require("scrape-it");
const db = require('./database-mySql/dbHelpers.js')


exports.getNeighborhood = (lat, long)=> {
  const endpointUrl = 'https://query.wikidata.org/sparql',
  sparqlQuery = `SELECT ?place ?location ?distance ?placeLabel WHERE {
    SERVICE wikibase:around { 
    ?place wdt:P625 ?location . 
    bd:serviceParam wikibase:center "Point(${long} ${lat})"^^geo:wktLiteral .
    bd:serviceParam wikibase:radius "1" . 
    bd:serviceParam wikibase:distance ?distance .
     } 
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    } ORDER BY ?distance LIMIT 10`,
  fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery),
  headers = { 'Accept': 'application/sparql-results+json' };

return fetch( fullUrl, { headers });
}
exports.formatNeighborhoodData = ( json => {
  const hood = [];
const place = {};
const places = [];
  const { head: { vars }, results } = json;
  for ( const result of results.bindings ) {
    hood.push(result)
      for ( const variable of vars ) {
          place[variable] = result[variable];
      }
  }
  hood.forEach(place =>{
    //filter out results that don't have a title
    console.log(place);
    if(place.placeLabel.value[0] !== 'Q'&& place.placeLabel.value.length !== 9){
      places.push({ title: place.placeLabel.value, coord: place.location.value, dist: place.distance.value, dist: place.place.value })
    }
    // console.log(places);

  });
  return places;
});
exports.getFullPage = (title, req, res)=> {
  title = title.split(' ').join('_');
  scrapeIt(`https://en.wikipedia.org/wiki/${title}`, {
    title: 'h1',
    paragraph: 'p',
    
}).then(({ data, response }) => {
    let results = data.paragraph.replace(/ *\[[^)]*\] */g, " ");
    results = results.replace(/[\r\n]/g, "");
    results = results.split('.');
    console.log(results);
    res.send(results)
}).catch(function (error) {
  console.log(error);
});
};

exports.getNeighborhoodMap = (lat, long, req, res)=> {
  const endpointUrl = 'https://query.wikidata.org/sparql',
      sparqlQuery = `#defaultView:Map{"layer":"?instance_ofLabel"}
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
}`,
      fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery ),
      headers = { 'Accept': 'application/sparql-results+json' };

fetch( fullUrl, { headers } ).then( body => body.json() ).then( json => {
    const { head: { vars }, results } = json;
    for ( const result of results.bindings ) {
        for ( const variable of vars ) {
            console.log( '%s: %o', variable, result[variable] );
        }
        console.log( '---' );
    }
} );
}
exports.getPOINarrow = (lat, long)=> {
    return axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates%7Cpageimages%7Cpageterms%7Cextracts&exlimit=5&generator=geosearch&colimit=1&piprop=thumbnail&pithumbsize=144&pilimit=10&wbptterms=description&ggscoord=${lat}%7C${long}&ggsradius=500&ggslimit=1`);
};

//get the address at the current lat and long
// MapQuet API key is required
// https://www.mapquestapi.com/geocoding/v1/reverse?key=KEY&location=29.92878%2C-90.08422&outFormat=json&thumbMaps=false
exports.getAddress = (lat, long, req, res)=> {
  axios.get(`https://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.MAPQUESTKEY}&location=${lat}%2C${long}&outFormat=json&thumbMaps=false`).then(function (res) {
      console.log(res.data.results[0].locations[0].street);
      return res.data.results[0].locations[0].street;
    })
    .catch(function (error) {
      console.log(error);
    });
    // https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=1403+Washington+Ave
  }
    exports.searchByAddress = (add, req, res)=> {
      add = add.split(' ').join('+');
      axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${add}+New+Orleans`).then(function (res) {
        res.data.query;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
      exports.searchByTitle = (title, req, res)=> {
        title = title.split(' ').join('+');
        axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${title}`).then(function (res) {
          console.log(res.data.query);
          return res.data.query;
        })
        .catch(function (error) {
          console.log(error);
        });   

}
/////////////////////////////////////////////
exports.loginUser = (user, response, reject )=>{
  console.log('login user helper fired');
  db.findUser(user).then((response)=>{
    console.log(`response ${response}`);
    console.log('do whatever we need to do here to log them in');
    res.end;
  }).catch( (err)=> { console.log(err)});
  

}