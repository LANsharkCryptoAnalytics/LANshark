jest.useFakeTimers();
import db from '../../database-mysql/dbHelpers';
// const server = require('../server');

test(`findUserLogin`, () => {
  const spy = jest.spyOn(db.helpers, 'findUserLogin');
  db.helpers.findUserLogin();
  expect(db.findUserLogin).toHaveBeenCalled();
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