import helpers from '../helpers';
import server from '../server';

jest.useFakeTimers();

const placesJson = {
  head: { vars: ['place', 'placeLabel', 'image', 'coordinate_location', 'dist', 'instance_of', 'instance_ofLabel'] },
  results: {
    bindings: [{
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q692231' },
      coordinate_location: {
        datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral',
        type: 'literal',
        value: 'Point(-90.0739 29.9683)',
      },
      dist: {
        datatype: 'http://www.w3.org/2001/XMLSchema#double',
        type: 'literal',
        value: '0.866',
      },
      image: {
        type: 'uri',
        value: 'http://commons.wikimedia.org/wiki/Special:FilePath/Rampart15Oct07UpToGuadalupe.jpg',
      },
      instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q79007' },
      placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Rampart Street' },
      instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'street' },
    }, {
      place: {
        type: 'uri',
        value: 'http://www.wikidata.org/entity/Q1133795',
      },
      coordinate_location: {
        datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral',
        type: 'literal',
        value: 'Point(-90.0739 29.9683)',
      },
      dist: {
        datatype: 'http://www.w3.org/2001/XMLSchema#double',
        type: 'literal',
        value: '0.866',
      },
      image: {
        type: 'uri',
        value: 'http://commons.wikimedia.org/wiki/Special:FilePath/TremeStoopsFloodLine.jpg',
      },
      instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q123705' },
      placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Tremé' },
      instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'neighborhood' },
    },
    {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q1133795' },
      coordinate_location: {
        datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral',
        type: 'literal',
        value: 'Point(-90.0739 29.9683)',
      },
      dist: {
        datatype: 'http://www.w3.org/2001/XMLSchema#double',
        type: 'literal',
        value: '0.866',
      },
      image: {
        type: 'uri',
        value: 'http://commons.wikimedia.org/wiki/Special:FilePath/TremeStoopsFloodLine.jpg',
      },
      instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q17343829' },
      placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Tremé' },
      instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'unincorporated community' },
    },
    {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q2892310' },
      coordinate_location: {
        datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral',
        type: 'literal',
        value: 'Point(-90.0861 29.9753)',
      },
      dist: {
        datatype: 'http://www.w3.org/2001/XMLSchema#double',
        type: 'literal',
        value: '0.891',
      },
      image: { type: 'uri', value: 'http://commons.wikimedia.org/wiki/Special:FilePath/DufourPlassanHouse.jpg' },
      instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q123705' },
      placeLabel: {
        'xml:lang': 'en',
        type: 'literal',
        value: 'Bayou St. John',
      },
      instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'neighborhood' },
    },
    {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q2892310' },
      coordinate_location: {
        datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral',
        type: 'literal',
        value: 'Point(-90.0861 29.9753)',
      },
      dist: {
        datatype: 'http://www.w3.org/2001/XMLSchema#double',
        type: 'literal',
        value: '0.891',
      },
      image: {
        type: 'uri',
        value: 'http://commons.wikimedia.org/wiki/Special:FilePath/DufourPlassanHouse.jpg',
      },
      instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q17343829' },
      placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Bayou St. John' },
      instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'unincorporated community' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q5399026' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.0738 29.973)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.417' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Esplanade Avenue, New Orleans' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q5429810' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.0811 29.9838)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.994' }, image: { type: 'uri', value: 'http://commons.wikimedia.org/wiki/Special:FilePath/Jazzfest07FairgroundGrandstand55.jpg' }, instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q1076486' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Fair Grounds Race Course' }, instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'sports venue' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q7185975' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.0782755 29.969119)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.739' }, instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q9842' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Phillis Wheatley Elementary School, New Orleans' }, instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'primary school' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q14691865' },
      coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.0823 29.971)' },
      dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.736' },
      placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Zulu Social Aid & Pleasure Club' },
    },
    {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q22059284' },
      coordinate_location: {
        datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral',
        type: 'literal',
        value: 'Point(-90.07665 29.96708)',
      },
      dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.953' },
      image: { type: 'uri', value: 'http://commons.wikimedia.org/wiki/Special:FilePath/Orleans%20Ave%20Carver%20New%20Marquee.jpg' },
      instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q41253' },
      placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Carver Theater' },
      instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'movie theater' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q30271841' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.084383 29.970204)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.945' }, instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q163740' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'New Schools for New Orleans' }, instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'nonprofit organization' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q30291096' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.076387 29.972143)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.393' }, instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q5691113' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Odyssey House Louisiana' }, instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'health organization' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q42668602' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.083353 29.969704)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.91' }, instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q41253' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Broad Theater' }, instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'movie theater' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q42668898' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.077997 29.979401)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.431' }, instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q41253' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Bell Theatre' }, instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'movie theater' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q42668898' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.077997 29.979401)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.431' }, instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q19860854' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Bell Theatre' }, instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'former building or structure' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q42669304' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.0684069 29.978154)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.86' }, instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q41253' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Circle Theater' }, instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'movie theater' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q42669304' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.0684069 29.978154)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.86' }, instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q19860854' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Circle Theater' }, instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'former building or structure' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q42669316' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.0754624 29.9755143)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.135' }, instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q41253' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Rivoli Theatre' }, instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'movie theater' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q42669316' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.0754624 29.9755143)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.135' }, instance_of: { type: 'uri', value: 'http://www.wikidata.org/entity/Q19860854' }, placeLabel: { 'xml:lang': 'en', type: 'literal', value: 'Rivoli Theatre' }, instance_ofLabel: { 'xml:lang': 'en', type: 'literal', value: 'former building or structure' },
    }, {
      place: { type: 'uri', value: 'http://www.wikidata.org/entity/Q49493111' }, coordinate_location: { datatype: 'http://www.opengis.net/ont/geosparql#wktLiteral', type: 'literal', value: 'Point(-90.07452 29.97354)' }, dist: { datatype: 'http://www.w3.org/2001/XMLSchema#double', type: 'literal', value: '0.325' }, placeLabel: { type: 'literal', value: 'Q49493111' },
    }],
  },
};
const placesFormatted = [{
  title: 'Rampart Street',
coord: '-90.0739 29.9683',
  dist: '0.866',
  type: 'street',
  wideWiki: '',
  narrowWiki: 'http://www.wikidata.org/entity/Q692231',
  wikiImage:
 'http://commons.wikimedia.org/wiki/Special:FilePath/Rampart15Oct07UpToGuadalupe.jpg',
}, {
  title: 'Rivoli Theatre',
  coord: '-90.0754624 29.9755143',
  dist: '0.135',
  type: 'movie theater',
  wideWiki: '',
  narrowWiki: 'http://www.wikidata.org/entity/Q42669316',
  wikiImage: '',
},
];


const text = 'This is an article about stuff [1]. Wikipedia blah blah blah blah blah Wikipedia blah blah blah blah blah.';
const text2 = ['This is an article about stuff Wikipedia blah blah blah blah blah Wikipedia blah blah blah blah blah'];
test('Get address', (done) => {
  const spy = jest.spyOn(helpers, 'searchByAddress');
  helpers.searchByAddress('1403 Washington Ave');
  expect(helpers.searchByAddress).toHaveBeenCalled();
  done();
});


test('expect get neighborhood to have been called', (done) => {
  const spy = jest.spyOn(helpers, 'getNeighborhood');
  helpers.getNeighborhood(29.92878, -90.08422);
  expect(helpers.getNeighborhood).toHaveBeenCalled();
  done();
});
test('expect get neighborhood to have been called with lat and long', (done) => {
  const spy = jest.spyOn(helpers, 'getNeighborhood');
  helpers.getNeighborhood(29.92878, -90.08422);
  expect(helpers.getNeighborhood).toHaveBeenCalledWith(29.92878, -90.08422);
  done();
});
test('Get neighborhood map', (done) => {
  const spy = jest.spyOn(helpers, 'getNeighborhoodMap');
  helpers.getNeighborhoodMap(29.92878, -90.08422);
  expect(helpers.getNeighborhoodMap).toHaveBeenCalled();
  done();
});
test('expect get neighborhood map to have been called with lat and long', (done) => {
  const spy = jest.spyOn(helpers, 'getNeighborhoodMap');
  helpers.getNeighborhoodMap(29.92878, -90.08422);
  expect(helpers.getNeighborhoodMap).toHaveBeenCalledWith(29.92878, -90.08422);
  done();
});
test('Get full page', (done) => {
  const spy = jest.spyOn(helpers, 'getFullPage');
  helpers.getFullPage('Garden District');
  expect(helpers.getFullPage).toHaveBeenCalled();
  done();
});
test('Search by title', (done) => {
  const spy = jest.spyOn(helpers, 'searchByTitle');
  helpers.searchByTitle('Garden District');
  expect(helpers.searchByTitle).toHaveBeenCalled();
  done();
});
test('Search by address', (done) => {
  const spy = jest.spyOn(helpers, 'searchByAddress');
  helpers.searchByAddress('1403 Washington Ave');
  expect(helpers.searchByAddress).toHaveBeenCalled();
  done();
});
describe('text should be formatted correctly', () => {
  test('text should be formatted in an array without periods', (done) => {
    const spy = jest.spyOn(helpers, 'formatResults');
    console.log(helpers.formatResults(text));
    expect(helpers.formatResults(text)[0]).toMatch(text2[0]);
    done();
  });
});
describe('should format JSON data', () => {
  test('format Neighborhood data should be called at least once', (done) => {
    const spy = jest.spyOn(helpers, 'formatNeighborhoodData');
    helpers.formatNeighborhoodData(placesJson);
    expect(helpers.formatNeighborhoodData).toBeCalled();
    done();
  });
  console.log(helpers.formatNeighborhoodData(placesJson)[0]);

  test('format Neighborhood data should format data correctly', (done) => {
    expect(helpers.formatNeighborhoodData(placesJson)[0]).toEqual(placesFormatted[0]);
    done();
  });
});
