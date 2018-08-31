jest.useFakeTimers()
import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';
import Map from '../js/Map';
import renderIf from '../js/helpers/renderIf';
const user = {id: 3};
test('renders correctly', () => {
  const map = renderer.create(<Map user={user}/>).toJSON();
  expect(map).toMatchSnapshot();
});
