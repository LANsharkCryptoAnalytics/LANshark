import 'react-native';
import React from 'react';
import Signup from '../js/Signup';
import renderer from 'react-test-renderer';

test('Signup snapShot', () => {
  const snap = renderer.create(
    <Signup />
  ).toJSON();
expect(snap).toMatchSnapshot();
});
