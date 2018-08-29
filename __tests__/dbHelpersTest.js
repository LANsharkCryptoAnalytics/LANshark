jest.useFakeTimers();
const db = require('../database-mySql/dbHelpers');
// const server = require('../server');

// Test to see if findUserLogin is called
test('findUserLogin', () => {
  const user = {
    email: 'me@me.com',
  };
  const spy = jest.spyOn(db, 'findUserLogin');
  db.findUserLogin(user);
  let user = db.findUserLogin
  expect(db.findUserLogin).toHaveBeenCalled();
});
// Test to see if findUserLogin is accurate
test('findUserLogin', () => {
  const user = {
    email: 'me@me.com',
  };
  const spy = jest.spyOn(db, 'findUserLogin');
  db.findUserLogin(user);
  expect(db.findUserLogin.email).toMatch(/me@me.com/);
});

// strings tested with regex 
// test('there is no I in team', () => {
  // expect('team').not.toMatch(/I/);
// });
// 
// test('but there is a "stop" in Christoph', () => {
  // expect('Christoph').toMatch(/stop/);
// });

// arrays tested 
// const shoppingList = [
//   'diapers',
//   'kleenex',
//   'trash bags',
//   'paper towels',
//   'beer',
// ];

// test('the shopping list has beer on it', () => {
//   expect(shoppingList).toContain('beer');
// });

