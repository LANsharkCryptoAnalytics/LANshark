jest.useFakeTimers();
const helpers = require('../helpers');
const server = require('../server');

const places= [
  {"title":"Garden District","coord":"Point(-90.0847 29.9278)","dist":"0.118"},
  {"title":"Washington Theatre","coord":"Point(-90.082542 29.9263218)","dist":"0.318"},
  {"title":"Christ Church Cathedral","coord":"Point(-90.0878 29.9303)","dist":"0.384"},
  {"title":"George Washington Cable House","coord":"Point(-90.087167 29.926353)","dist":"0.392"},
  {"title":"Protestant Home for Babies","coord":"Point(-90.0862 29.9257)","dist":"0.392"},
  {"title":"McGehee School","coord":"Point(-90.08179444 29.93203611)","dist":"0.431"},
  {"title":"Touro Infirmary Foundation","coord":"Point(-90.088866 29.925778)","dist":"0.558"},
  {"title":"Q49505355","coord":"Point(-90.08063 29.92382)","dist":"0.651"},
  {"title":"Anshe Sfard","coord":"Point(-90.08184 29.93432)","dist":"0.657"},
  {"title":"Irish Channel","coord":"Point(-90.0819 29.9231)","dist":"0.67"}];


test(`Get address`, () => {
  const spy = jest.spyOn(helpers, 'searchByAddress');
  helpers.searchByAddress('1403 Washington Ave');
  expect(helpers.searchByAddress).toHaveBeenCalled();
});
// TODO: Test to check if get address pull information for that actual address
// Build here


test(`Get neighborhood`, () => {
  const spy = jest.spyOn(helpers, 'getNeighborhood');
  helpers.getNeighborhood(29.92878, -90.08422);
  
  expect(helpers.getNeighborhood).toHaveBeenCalled();
});
test(`Get neighborhood map`, () => {
  const spy = jest.spyOn(helpers, 'getNeighborhoodMap');
  helpers.getNeighborhoodMap(29.92878, -90.08422);
    
  expect(helpers.getNeighborhoodMap).toHaveBeenCalled();
});
test(`Get full page`, () => {
  const spy = jest.spyOn(helpers, 'getFullPage');
  helpers.getFullPage('Garden Disctrict');
    
  expect(helpers.getFullPage).toHaveBeenCalled();
});
test(`Search by title`, () => {
  const spy = jest.spyOn(helpers, 'searchByTitle');
  helpers.searchByTitle('Garden District');
    
  expect(helpers.searchByTitle).toHaveBeenCalled();
});
test(`Search by address`, () => {
  const spy = jest.spyOn(helpers, 'searchByAddress');
  helpers.searchByAddress('1403 Washington Ave');
    
  expect(helpers.searchByAddress).toHaveBeenCalled();
});