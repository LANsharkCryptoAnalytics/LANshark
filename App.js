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
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import axios from 'axios';


import {
  ViroARSceneNavigator,
  ViroMaterials,
  ViroUtils,
} from 'react-viro';
import { viroKey } from './config';
import Signup from './js/Signup';
import Map from './js/Map';
import FavoriteMap from './js/FavoriteMap';
import renderIf from './js/helpers/renderIf';

// console.disableYellowBox = true;

const InitialARScene = require('./js/ARHist');


const isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice;
const textArray = 'A green hunting cap squeezed the top of the fleshy balloon of a head. The green earflaps, full of large ears and uncut hair and the fine bristles that grew in the ears themselves, stuck out on either side like turn signals indicating two directions at once. Full, pursed lips protruded beneath the bushy black moustache and, at their corners, sank into little folds filled with disapproval and potato chip crumbs. In the shadow under the green visor of the cap Ignatius J. Reilly’s supercilious blue and yellow eyes looked down upon the other people waiting under the clock at the D. H. Holmes department store, studying the crowd of people for signs of bad taste and dress. Several of the outfits, Ignatius noticed, were new enough and expensive enough to be properly considered offenses against taste and decency. Possession of anything new or expensive only reflected a person’s lack of theology and geometry; it could even cast doubts upon one’s soul.'.split('.');
const textArray2 = 'cha cha changes, consectetur adipiscing elit. Etiam gravida in lectus ultricies facilisis. Donec viverra aliquam nisi sed cursus. Aenean luctus iaculis pellentesque. Vestibulum euismod a augue quis aliquam. Curabitur blandit mauris nec faucibus tristique. Ut vel varius magna. Nulla dapibus sem eget nisi iaculis, non fermentum orci tincidunt. Quisque magna nulla, tincidunt vel neque eu, pharetra sollicitudin dolor. Proin nec laoreet lacus. In ut luctus leo. Maecenas vel tincidunt tellus, id molestie justo. Praesent eu sem felis. Vivamus arcu risus, gravida ut ligula sit amet, dignissim maximus metus. Nam eget velit pellentesque, bibendum tortor quis, facilisis diam'.split('.');
let dataLength = textArray.length - 1;
const user = { id: null, email: null };
let dataCounter = 0;
let locationProgression = 1;
let wideWiki = '';
let narrowWiki = '';
let wikiImage = '';

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
  button: {
    // alignSelf: 'stretch',
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: '#ffffff00',
    padding: 30,
    backgroundColor: '#59cbbd',
  },
  btntext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
    // shininess: 2.0,
    // specularTexture: textIMG,
    blendMode: 'None',
    // lightingModel: 'Lambert',
    diffuseColor: '#f7dc13',
  },
  backMaterial: {
    // lightingModel: "Lambert",
    bloomThreshold: 2.0,
    diffuseColor: '#333333',
  },
  sideMaterial: {
    // lightingModel: "Lambert",
    // shininess: 2.0,
    // bloomThreshold: 1.5,
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
        axios.get('http://ec2-54-152-18-28.compute-1.amazonaws.com/neighborhood', {
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
          .then((res) => {
            const generalData = res.data.content;
            wideWiki = res.data.wideWiki;
            dataLength = generalData.length - 1;
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
        axios.get('http://ec2-54-152-18-28.compute-1.amazonaws.com/broad', {
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
          .then((res) => {
            const narrowData = res.data.content;
            narrowWiki = res.data.narrowWiki;
            wikiImage = res.data.wikiImage;
            if (narrowData.length > dataLength) {
              dataLength = narrowData.length - 1;
            }
            this.setState({ narrowData });
          })
          .catch((error) => { this.setState({ error }); });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );


    // this._onShowObject = this._onShowObject.bind(this);
    this._logIn = this._logIn.bind(this);
    this._signup = this._signup.bind(this);
    this._onSaveLocation = this._onSaveLocation.bind(this);
    this._onShowText = this._onShowText.bind(this);
    this._onShowText2 = this._onShowText2.bind(this);
    this._onShowText3 = this._onShowText3.bind(this);
    this._onRemoveText = this._onRemoveText.bind(this);
    this._onDisplayDialog2 = this._onDisplayDialog2.bind(this);
    this._onAttemptHNOC = this._onAttemptHNOC.bind(this);
    this._showMapView = this._showMapView.bind(this);
    this._showFavMapView = this._showFavMapView.bind(this);
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
      success: null,
      error: null,
      generalData: textArray,
      posPhone: false,
      narrowData: textArray2,
      dataStore: null,
      isLoggedIn: false,
      nonUser: true,
      mapView: false,
      favMapView: false,
      signupView: false,
    };
  }


  componentDidMount() {
    isARSupportedOnDevice(this._handleARNotSupported, this._handleARSupported);
  }

  _logIn() {
    this.setState({
      isLoggedIn: true,
      nonUser: false,
      signupView: false,
    });
  }

  _signup() {
    this.setState({
      signupView: true,
    });
  }

  _showMapView() {
    const currentMap = !this.state.mapView;
    this.setState({ mapView: currentMap });
  }

  _showFavMapView() {
    const currentMap = !this.state.favMapView;
    this.setState({ favMapView: currentMap });
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


  _onTrackingInit() {
    this.setState({
      trackingInitialized: true,
    });
  }

  _onDisplayDialog() {
    if (this.state.nonUser) {
      Alert.alert(
        'Learn About The Area Around You',
        'Choose an Option Below',
        [

          // {text: 'Save Location', onPress: () => this._onSaveLocation(0, dataCounter, 0 )},
          { text: 'General Fact', onPress: () => this._onShowText(0, dataCounter, 0) },
          { text: 'Next Location', onPress: () => this._onRemoveText() },
          { text: 'Show Map', onPress: () => this._showMapView() },
          { text: 'Signup or Login', onPress: () => this._signup() },
        ],
      );
    } else {
      Alert.alert(
        'Learn About The Area Around You',
        'Choose an Option Below',
        [
          { text: 'General Fact', onPress: () => this._onShowText(0, dataCounter, 0) },
          { text: 'Next Location', onPress: () => this._onRemoveText() },
          { text: 'Show Map', onPress: () => this._showMapView() },
          { text: 'Favorites Map', onPress: () => this._showFavMapView() },
          {
            text: 'User Menu',
            onPress: () => Alert.alert(
              'User Menu',
              'Please Choose an option',
              [
                { text: 'Save Location', onPress: () => this._onSaveLocation(0, dataCounter, 0) },
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
    this.setState((prevState) => {
      const objectSource = prevState.generalData[dataCounter];
      return {
        viroAppProps: {
          ...currentProps,
          displayObject: true,
          yOffset,
          displayObjectName: objUniqueName,
          objectSource,
        },
      };
    });
  }

  _onSaveLocation(objIndex, objUniqueName, yOffset) {
    const isSaved = 'Location Information Saved!';
    const notSaved = 'Sorry, We could\'nt Save the Information';
    let saveMessage;

    axios.post('http://ec2-54-152-18-28.compute-1.amazonaws.com/addToFavorites', {
      id: user.id,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      wideData: this.state.generalData,
      narrowData: this.state.narrowData,
      wideWiki,
      narrowWiki,
      wikiImage,
    })
      .then(() => {
        saveMessage = isSaved;
        const currentProps = { ...this.state.viroAppProps };
        this.setState({
          viroAppProps: {
            ...currentProps,
            displayObject: true,
            yOffset,
            displayObjectName: objUniqueName,
            objectSource: saveMessage,
          },
          // viroAppProps:{...this.state.viroAppProps,
          // displayObject: true, yOffset: yOffset, displayObjectName: objUniqueName,
          // objectSource:String(this.state.latitude) + String(this.state.longitude)},
        });
      })
      .catch((error) => {
        this.setState({ error });
        saveMessage = notSaved;
        const currentProps = { ...this.state.viroAppProps };
        this.setState({
          viroAppProps: {
            ...currentProps, displayObject: true, yOffset, displayObjectName: objUniqueName, objectSource: saveMessage,
          },
        });
      });
  }

  _onAttemptHNOC() {
    axios.post('http://ec2-54-152-18-28.compute-1.amazonaws.com/', {
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
    this.setState((prevState) => {
      const objectSource = prevState.generalData[dataCounter];
      return {
        viroAppProps: {
          ...currentProps,
          displayObject: true,
          yOffset,
          displayObjectName: objUniqueName,
          objectSource,
        },
      };
    });
  }

  _onShowText3(objIndex, objUniqueName, yOffset) {
    dataCounter -= 1;
    if (dataCounter < 0) {
      dataCounter = 0;
    }
    const currentProps = { ...this.state.viroAppProps };
    this.setState((prevState) => {
      const objectSource = prevState.generalData[dataCounter];
      return {
        viroAppProps: {
          ...currentProps,
          displayObject: true,
          yOffset,
          displayObjectName: objUniqueName,
          objectSource,
        },
      };
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
        axios.get('http://ec2-54-152-18-28.compute-1.amazonaws.com/broad', {
          params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            i: locationProgression,
          },
        })
          .then((res) => {
            locationProgression += 1;
            const narrowData = res.data.content;
            if (narrowData.length > dataLength) {
              dataLength = narrowData.length - 1;
            }
            this.setState({ narrowData });
          })
          .catch((error) => { this.setState({ error }); });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    this.setState({
      viroAppProps: { ...this.state.viroAppProps, displayObject: false },
      posComp: false,
    }, () => {
      this.setState({ posComp: true });
    }, this.setState({ generalData: this.state.narrowData }));
  }


  render() {
    return (
      <View style={localStyles.outer}>
        {renderIf(!this.state.mapView && this.state.signupView,
          <View style={styles.login}>
            <Signup _signup={this._signup} _logIn={this._logIn} user={user} />
          </View>)}
        {renderIf(this.state.mapView,
          <Map user={user} showMapView={this._showMapView} lat={this.state.latitude} long={this.state.longitude} />)}

        {renderIf(this.state.favMapView && this.state.isLoggedIn,
          <FavoriteMap user={user} showFavMapView={this._showFavMapView} lat={this.state.latitude} long={this.state.longitude} />)}
        {renderIf(this.state.posPhone && this.state.isLoggedIn && !this.state.mapView && !this.state.favMapView,
          <View>
            <Text>
              Sorry your phone sucks! heres some data for you anyway
              {this.state.generalData[dataCounter]}
            </Text>
          </View>)}
        {renderIf(this.state.posComp && !this.state.posPhone && !this.state.mapView && !this.state.favMapView && !this.state.signupView,
          <ViroARSceneNavigator
            style={localStyles.arView}
            apiKey={viroKey}
            initialScene={{ scene: InitialARScene, passProps: { displayObject: this.state.displayObject } }}
            ref="scene"
            viroAppProps={this.state.viroAppProps}
          />)}
        {/* {renderIf(this.state.isLoggedIn,
          this._renderTrackingText())} */}

        {renderIf(this.state.isLoading && this.state.isLoggedIn && !this.state.mapView && !this.state.favMapView,
          <View style={{
            position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center',
          }}
          >
            <ActivityIndicator size="large" animating={this.state.isLoading} color="#ffffff" />
          </View>)
      }
        {renderIf(!this.state.mapView && !this.state.favMapView && !this.state.signupView,
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={localStyles.button} >
              <Text style={localStyles.btntext}>AR View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={localStyles.button} >
              <Text style={localStyles.btntext}>AR View</Text>
          </TouchableOpacity>

           <TouchableOpacity style={localStyles.button} >
              <Text style={localStyles.btntext}>AR View</Text>
          </TouchableOpacity>

        </View>



      </View>
    );
  }
}

module.exports = ViroSample;
