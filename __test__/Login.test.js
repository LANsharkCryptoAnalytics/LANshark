import Login from '../js/Login';


test('expect login to be a function', () => {
  expect(typeof Login).toEqual('function');
});

test('expect login to be defined', () => {
  expect(Login).toBeDefined();
});

test('expect state to be empty', () => {
  expect(Login._submit).toBeDefined();
});

test('expect the return of submit to be an object', () => {
  expect.assertions(1);
  return Login._submit()
    .then((data) => {
      expect(typeof data).toEqual('object');
  });
});
