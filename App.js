/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */


import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';
<<<<<<< HEAD
import axios from 'axios';
=======

import axios from 'axios';


>>>>>>> 57130ef692a4e165aac365aeaadf975c11656fe5
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroNode,
  ViroSphere,
  ViroText,
  ViroMaterials,
  ViroUtils,
} from 'react-viro';
import { viroKey } from './config';
import Signup from './js/Signup';
<<<<<<< HEAD
=======
import Map from './js/Map.jsx';
>>>>>>> 57130ef692a4e165aac365aeaadf975c11656fe5
import renderIf from './js/helpers/renderIf';

const InitialARScene = require('./js/ARHist');

const isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice;


// var textArray = [
//   'Testing how to',
//   'make the changes',
//   'to Text',
//   ];
const textIMG = require('./js/res/cracked-wallpaper-9.jpg');

const textArray = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam gravida in lectus ultricies facilisis. Donec viverra aliquam nisi sed cursus. Aenean luctus iaculis pellentesque. Vestibulum euismod a augue quis aliquam. Curabitur blandit mauris nec faucibus tristique. Ut vel varius magna. Nulla dapibus sem eget nisi iaculis, non fermentum orci tincidunt. Quisque magna nulla, tincidunt vel neque eu, pharetra sollicitudin dolor. Proin nec laoreet lacus. In ut luctus leo. Maecenas vel tincidunt tellus, id molestie justo. Praesent eu sem felis. Vivamus arcu risus, gravida ut ligula sit amet, dignissim maximus metus. Nam eget velit pellentesque, bibendum tortor quis, facilisis diam'.split('.');
const textArray2 = 'cha cha changes, consectetur adipiscing elit. Etiam gravida in lectus ultricies facilisis. Donec viverra aliquam nisi sed cursus. Aenean luctus iaculis pellentesque. Vestibulum euismod a augue quis aliquam. Curabitur blandit mauris nec faucibus tristique. Ut vel varius magna. Nulla dapibus sem eget nisi iaculis, non fermentum orci tincidunt. Quisque magna nulla, tincidunt vel neque eu, pharetra sollicitudin dolor. Proin nec laoreet lacus. In ut luctus leo. Maecenas vel tincidunt tellus, id molestie justo. Praesent eu sem felis. Vivamus arcu risus, gravida ut ligula sit amet, dignissim maximus metus. Nam eget velit pellentesque, bibendum tortor quis, facilisis diam'.split('.');
let dataCounter = 0;
const dataLength = textArray.length - 1;
let locationProgression = 0;

export default class ViroSample extends Component {
  constructor(props) {
    super(props);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        axios.get('http://ec2-34-238-240-14.compute-1.amazonaws.com/neighborhood', {
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
          .then((res) => {
            const generalData = res.data;
            this.setState({ generalData });
          })
          .catch(error => this.setState({ error }));
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        axios.get('http://ec2-34-238-240-14.compute-1.amazonaws.com/broad', {
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
          .then((res) => {
            const narrowData = res.data;
            this.setState({ narrowData });
          })
          .catch(err => this.state.error = err);
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );


    // this._onShowObject = this._onShowObject.bind(this);
    this._onShowLoc = this._onShowLoc.bind(this);
    this._onShowText = this._onShowText.bind(this);
    this._onShowText2 = this._onShowText2.bind(this);
    this._onShowText3 = this._onShowText3.bind(this);
    this._onRemoveText = this._onRemoveText.bind(this);
    this._onDisplayDialog2 = this._onDisplayDialog2.bind(this);
    this._onAttemptHNOC = this._onAttemptHNOC.bind(this);
    // this._renderTrackingText = this._renderTrackingText.bind(this);
    this._onTrackingInit = this._onTrackingInit.bind(this);
    this._onDisplayDialog = this._onDisplayDialog.bind(this);
    this._onLoadStart = this._onLoadStart.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);

    this.state = {
      viroAppProps: {
        displayObject: false, objectSource: null, yOffset: 0, _onLoadEnd: this._onLoadEnd, _onLoadStart: this._onLoadStart, _onTrackingInit: this._onTrackingInit,
      },
      trackingInitialized: false,
      isLoading: false,
      posComp: true,
      latitude: '29.97616921',
      longitude: '-90.0764381',
      error: null,
      generalData: textArray,
      posPhone: false,
      narrowData: textArray2,
      dataStore: null,
      isLoggedIn: true,
<<<<<<< HEAD
    }
=======
      mapView: false,
    };
>>>>>>> 57130ef692a4e165aac365aeaadf975c11656fe5
  }


  componentDidMount() {
    isARSupportedOnDevice(this._handleARNotSupported, this._handleARSupported);
  }

  logIn() {
    this.setState({
      isLoggedIn: true,
    });
  }
  changeView = () => {
    this.setState({mapView: false});
  }
  _handleARSupported() {

  }

  _handleARNotSupported() {
    this.setState({
      posPhone: true,
    });
  }

  // Invoked when a model has started to load, we show a loading indictator.
  _onLoadStart() {
    this.setState({
      isLoading: true,
    });
  }

  // Invoked when a model has loaded, we hide the loading indictator.
  _onLoadEnd() {
    this.setState({
      isLoading: false,
    });
  }

  // _renderTrackingText() {
  //   if (this.state.trackingInitialized) {
  //     return (
  //       <View style={{
  //         position: 'absolute', backgroundColor: '#ffffff22', left: 30, right: 30, top: 30, alignItems: 'center',
  //       }}
  //       >
  //         <Text style={{ fontSize: 12, color: '#ffffff' }}>
  //           {this.loc}
  //             Tracking initialized.
  //         </Text>
  //       </View>
  //     );
  //   }
  //   return (
  //     <View style={{
  //       position: 'absolute', backgroundColor: '#ffffff22', left: 30, right: 30, top: 30, alignItems: 'center',
  //     }}
  //     >
  //       <Text style={{ fontSize: 12, color: '#ffffff' }}>Waiting for tracking to initialize.</Text>
  //     </View>
  //   );
  // }

  _onTrackingInit() {
    this.setState({
      trackingInitialized: true,
    });
  }

  _onDisplayDialog() {
    if (!this.state.isLoggedIn) {
      Alert.alert(
        'Learn About The Area Around You',
        'Choose an Option Below',
        [

          // {text: 'Save Location', onPress: () => this._onShowLoc(0, dataCounter, 0 )},
          { text: 'General Fact', onPress: () => this._onShowText(0, dataCounter, 0) },
          { text: 'New Location', onPress: () => this._onRemoveText() },
        ],
      );
    } else {
      Alert.alert(
        'Learn About The Area Around You',
        'Choose an Option Below',
        [
          { text: 'General Fact', onPress: () => this._onShowText(0, dataCounter, 0) },
          { text: 'New Location', onPress: () => this._onRemoveText() },
          {
            text: 'User Menu',
            onPress: () => Alert.alert(
              'User Menu',
              'Please Choose an option',
              [
                { text: 'Save Location', onPress: () => this._onShowLoc(0, dataCounter, 0) },
                // {text: 'General Fact', onPress: () => this._onShowText(0, dataCounter, 0 )},
                // {text: 'New Location', onPress: () => this._onRemoveText()},
              ],
            ),
          },
        ],
      );
    }
  }

  _onDisplayDialog2() {
    Alert.alert(
      'Choose an object',
      'Select an object to place in the world!',
      [
        { text: 'Clear All Facts', onPress: () => this._onRemoveText() },
      ],
    );
  }

  // _onShowObject(objIndex, objUniqueName, yOffset) {
  //   this.setState({
  //       // displayText: true,
  //       // text: 'hello'
  //       viroAppProps:{...this.state.viroAppProps, displayObject: true, yOffset: yOffset, displayObjectName: objUniqueName, objectSource:objArray[objIndex]},
  //   });
  // }
  _onShowText(objIndex, objUniqueName, yOffset) {
    dataCounter = 0;
    const currentProps = { ...this.state.viroAppProps };
    this.setState({
      viroAppProps: {
        ...currentProps, displayObject: true, yOffset, displayObjectName: objUniqueName, objectSource: this.state.generalData[dataCounter],
      },
    });
  }

  _onShowLoc(objIndex, objUniqueName, yOffset) {
    axios.post('http://ec2-34-238-240-14.compute-1.amazonaws.com/addToFavorites', {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      wideData: this.state.generalData,
      narrowData: this.state.narrowData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({

      viroAppProps: {
        ...this.state.viroAppProps, displayObject: true, yOffset, displayObjectName: objUniqueName, objectSource: 'Location Information Saved!',
      },

      // viroAppProps:{...this.state.viroAppProps, displayObject: true, yOffset: yOffset, displayObjectName: objUniqueName, objectSource:String(this.state.latitude) + String(this.state.longitude)},
    });
  }

  _onAttemptHNOC() {
    axios.post('http://ec2-34-238-240-14.compute-1.amazonaws.com/', {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _onShowText2(objIndex, objUniqueName, yOffset) {
    dataCounter += 1;
    if (dataCounter > dataLength) {
      dataCounter = 0;
    }
    const currentProps = { ...this.state.viroAppProps };
    this.setState({
      viroAppProps: {
        ...currentProps, displayObject: true, yOffset, displayObjectName: objUniqueName, objectSource: this.state.generalData[dataCounter],
      },
    });
  }

  _onShowText3(objIndex, objUniqueName, yOffset) {
    dataCounter -= 1;
    if (dataCounter < 0) {
      dataCounter = 0;
    }
    this.setState({
      viroAppProps: {
        ...this.state.viroAppProps, displayObject: true, yOffset, displayObjectName: objUniqueName, objectSource: this.state.generalData[dataCounter],
      },
    });
  }

  _onRemoveText() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        axios.get('http://ec2-34-238-240-14.compute-1.amazonaws.com/broad', {
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            i: locationProgression,
          },
        })
          .then((res) => {
            locationProgression += 1;
            const narrowData = res.data;
            this.setState({ narrowData });
          })
          .catch(err => this.state.error = err);
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    this.setState({
      viroAppProps: { ...this.state.viroAppProps, displayObject: false },
      posComp: false,
      dataStore: this.state.generalData,
    }, () => {
      this.setState({ posComp: true });
    }, this.setState({ generalData: this.state.narrowData }));
  }


  render() {
    return (
      <View style={localStyles.outer}>
        {renderIf(!this.state.isLoggedIn && !this.state.mapView,
          <View style={styles.login}>
            <Signup logIn={this.logIn} />
          </View>)}
        {renderIf(this.state.mapView,
          <Map changeView={this.changeView} lat={this.state.latitude} long={this.state.longitude}/>)}
        {renderIf(this.state.posPhone && this.state.isLoggedIn && !this.state.mapView,
          <View>
            <Text>
              Sorry your phone sucks! heres some data for you anyway
              {this.state.generalData[dataCounter]}
            </Text>
          </View>)}
        {renderIf(this.state.posComp && !this.state.posPhone && this.state.isLoggedIn && !this.state.mapView,
          <ViroARSceneNavigator
            style={localStyles.arView}
            apiKey={viroKey}
            initialScene={{ scene: InitialARScene, passProps: { displayObject: this.state.displayObject } }}
            ref="scene"
            viroAppProps={this.state.viroAppProps}
          />)}
        {/* {renderIf(this.state.isLoggedIn,
          this._renderTrackingText())} */}

        {renderIf(this.state.isLoading && this.state.isLoggedIn && !this.state.mapView,
          <View style={{
            position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center',
          }}
          >
            <ActivityIndicator size="large" animating={this.state.isLoading} color="#ffffff" />
          </View>)
      }
        {renderIf(this.state.isLoggedIn && !this.state.mapView,
          <View style={{
            position: 'absolute', left: 50, right: 0, bottom: 77, alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between',
          }}
          >
            <TouchableHighlight
              style={localStyles.buttons}
              onPress={() => this._onShowText3(0, dataCounter, 0)}
              underlayColor="#00000000"
            >
              <Image source={require('./js/res/left-gold-arrow.png')} />
            </TouchableHighlight>
            <TouchableHighlight
              style={localStyles.buttons}
              onPress={this._onDisplayDialog}
              underlayColor="#00000000"
            >
              <Image source={require('./js/res/MainBTTN.png')} />
            </TouchableHighlight>
            <TouchableHighlight
              style={localStyles.buttons}
              onPress={() => this._onShowText2(0, dataCounter, 0)}
              underlayColor="#00000000"
            >
              <Image source={require('./js/res/right-gold-arrow.png')} />
            </TouchableHighlight>
          </View>)}
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  arView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  buttons: {
    height: 80,
    width: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingTop:20,
    // paddingBottom:20,
    // marginTop: 10,
    // marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
});
ViroMaterials.createMaterials({
  frontMaterial: {
    // bloomThreshold: 0.1,
    shininess: 2.0,
    // specularTexture: textIMG,
    blendMode: 'None',
    // lightingModel: 'Lambert',
    diffuseColor: '#FFFFFF',
  },
  backMaterial: {
    // lightingModel: "Lambert",
    bloomThreshold: 2.0,
    diffuseColor: '#333333',
  },
  sideMaterial: {
    // lightingModel: "Lambert",
    // shininess: 2.0,
    // bloomThreshold: .5,
    diffuseColor: '#333333',
  },
});
// "Comic Sans MS", cursive, sans-serif
const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
  helloWorldTextStyle: {
    fontFamily: 'Roboto',
    // fontStyle: 'italic',
    fontSize: 8,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },

});

module.exports = ViroSample;
