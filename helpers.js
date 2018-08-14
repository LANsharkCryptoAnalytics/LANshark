const axios = require('axios');
const MAPQUESTKEY = require('./config.js')
//Cheerio is an html parser
//get the entire http content for the first search result
exports.getPOINarrow = (lat, long)=> {
    axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates%7Cpageimages%7Cpageterms%7Cextracts&exlimit=5&generator=geosearch&colimit=1&piprop=thumbnail&pithumbsize=144&pilimit=10&wbptterms=description&ggscoord=${lat}%7C${long}&ggsradius=100&ggslimit=10`).then(function (res) {
        console.log(res.data.query);
        return res.data.query;
      })
      .catch(function (error) {
        console.log(error);
      });
};
//not working right yet
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
    } ORDER BY ?distance LIMIT 100`,
  fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery),
  headers = { 'Accept': 'application/sparql-results+json' };

    axios.get(`https://en.wikivoyage.org/wiki/Special:Nearby#/coord/${lat},${long}`).then(function (res) {
        console.log(res.data);
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      axios({
        method:'get',
        url: fullUrl,
        headers: headers
      })
      .then(function (res) {
        console.log(res.data.query);
        return res.data.query;
      })
      .catch(function (error) {
        console.log(error);
      });
      
}
//get the address at the current lat and long
// MapQuet API key is required
// https://www.mapquestapi.com/geocoding/v1/reverse?key=KEY&location=29.92878%2C-90.08422&outFormat=json&thumbMaps=false
exports.getAddress = (lat, long)=> {
  axios.get(`https://www.mapquestapi.com/geocoding/v1/reverse?key=${MAPQUESTKEY.MAPQUESTKEY}&location=${lat}%2C${long}&outFormat=json&thumbMaps=false`).then(function (res) {
      console.log(res.data.results[0].locations[0].street);
      return res.data.results[0].locations[0].street;
    })
    .catch(function (error) {
      console.log(error);
    });
    // https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=1403+Washington+Ave
  }

    exports.searchByAddress = (add)=> {
      axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${add}+New+Orleans`).then(function (res) {
        console.log(res.data.query);
        return res.data.query;
      })
      .catch(function (error) {
        console.log(error);
      });

      

        

}