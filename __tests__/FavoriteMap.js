jest.useFakeTimers();
import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';
import FavoriteMap from '../js/FavoriteMap';
import renderIf from '../js/helpers/renderIf';
const user = {id: 3};
test('renders correctly', () => {
  const favmap = renderer.create(<FavoriteMap user={user}/>).toJSON();
  expect(favmap).toMatchSnapshot();
});
