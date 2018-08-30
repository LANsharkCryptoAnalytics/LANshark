/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';
import renderIf from './helpers/renderIf';


const styles = StyleSheet.create({

  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffee99',
  },
  btntext: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default class Map extends Component {
  // constructor(props) {
  //   super(props);

  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <WebView
            source={{
              uri: `https://query.wikidata.org/embed.html#%23defaultView%3AMap%7B%22layer%22%3A%22%3Finstance_ofLabel%22%7D%0ASELECT%20%3Fplace%20%3FplaceLabel%20%3Fimage%20%3Fcoordinate_location%20%3Fdist%20%3Finstance_of%20%3Finstance_ofLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Aaround%20%7B%0A%20%20%20%20%3Fplace%20wdt%3AP625%20%3Fcoordinate_location.%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Acenter%20%22Point%28${String(this.props.long).slice(0, 10)}%20${String(this.props.lat).slice(0, 9)}%29%22%5E%5Egeo%3AwktLiteral.%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Aradius%20%221%22.%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Adistance%20%3Fdist.%0A%20%20%7D%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fplace%20wdt%3AP18%20%3Fimage.%20%7D%0A%20%20OPTIONAL%20%7B%20%3Fplace%20wdt%3AP31%20%3Finstance_of.%20%7D%0A%7D`,
            }}
            style={{ flex: 1 }}
            scalesPageToFit
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} // for iOS
            onNavigationStateChange={this.onShouldStartLoadWithRequest}
            geolocationEnabled
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.button} onPress={() => { this.props.showMapView(); }}>
            <Text style={styles.btntext}>AR View</Text>
          </TouchableOpacity>
          {renderIf(this.props.user.id !== null,
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.props.showFavMapView(); }}>
              <Text style={styles.btntext}>Fav Map</Text>
            </TouchableOpacity>)}

          {renderIf(this.props.user.id === null,
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.props._signup(); }}>
              <Text style={styles.btntext}>Login</Text>
            </TouchableOpacity>)}

        </View>
      </View>
    );
  }
}
