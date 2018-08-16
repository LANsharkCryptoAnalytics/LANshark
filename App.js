import React, { Component } from 'react';
import { viroKey } from './config'
import {
  AppRegistry,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';


import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroNode,
  ViroSphere,
  ViroText,
  ViroMaterials,
} from 'react-viro';

import renderIf from './js/helpers/renderIf';
var InitialARScene = require('./js/ARHist');

// Array of 3d models that we use in this sample. This app switches between this these models.
var textArray = [
  'Testing how to',
  'make the changes',
  'to Text',
  ];
  var dataCounter = 0;
  var dataLength = textArray.length;

export default class ViroSample extends Component {
  constructor() {
    super();

    // this._onShowObject = this._onShowObject.bind(this);
    this._onShowText = this._onShowText.bind(this);
    this._onShowText2 = this._onShowText2.bind(this);
    this._onRemoveText = this._onRemoveText.bind(this);
    this._onDisplayDialog2 = this._onDisplayDialog2.bind(this);
    this._renderTrackingText = this._renderTrackingText.bind(this);
    this._onTrackingInit = this._onTrackingInit.bind(this);
    this._onDisplayDialog = this._onDisplayDialog.bind(this);
    this._onLoadStart = this._onLoadStart.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);

    this.state = {
      viroAppProps: {displayObject:false, objectSource:null, yOffset:0, _onLoadEnd: this._onLoadEnd, _onLoadStart: this._onLoadStart, _onTrackingInit:this._onTrackingInit},
      trackingInitialized: false,
      isLoading: false,
      displayText: false,
    }
  }

  render() {
    return (
      <View style={localStyles.outer} >
        <ViroARSceneNavigator style={localStyles.arView} apiKey={viroKey}
          initialScene={{scene:InitialARScene, passProps:{displayObject:this.state.displayObject}}}  viroAppProps={this.state.viroAppProps}
        />

        {this._renderTrackingText()}

        {renderIf(this.state.isLoading,
          <View style={{position:'absolute', left:0, right:0, top:0, bottom:0,  justifyContent:'center'}}>
            <ActivityIndicator size='large' animating={this.state.isLoading} color='#ffffff'/>
          </View>)
        }

        <View style={{position: 'absolute',  left: 0, right: 0, bottom: 77, alignItems: 'center', justifyContent: 'space-between',}}>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._onDisplayDialog}
            underlayColor={'#00000000'} >
            <Image source={require("./js/res/btn_mode_objects.png")} />
          </TouchableHighlight>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._onDisplayDialog2}
            underlayColor={'#00000000'} >
            <Image source={require("./js/res/btn_mode_objects.png")} />
          </TouchableHighlight>
        </View>
      </View>
    );
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

  _renderTrackingText() {
    if(this.state.trackingInitialized) {
      return (<View style={{position: 'absolute', backgroundColor:"#ffffff22", left: 30, right: 30, top: 30, alignItems: 'center'}}>
        <Text style={{fontSize:12, color:"#ffffff"}}>{Object.keys(this.state.viroAppProps)}Tracking initialized.</Text>
      </View>);
    } else {
      return (<View style={{position: 'absolute', backgroundColor:"#ffffff22", left: 30, right: 30, top:30, alignItems: 'center'}}>
        <Text style={{fontSize:12, color:"#ffffff"}}>Waiting for tracking to initialize.</Text>
        </View>);
    }
  }

  _onTrackingInit() {
    this.setState({
      trackingInitialized: true,
    });
  }

  _onDisplayDialog() {
    Alert.alert(
    'Choose an object',
    'Select an object to place in the world!',
    [
      {text: 'General Fact', onPress: () => this._onShowText(0, 10, .290760)},
      {text: 'Next Fact', onPress: () => this._onShowText2(0, 10, .290760)}, 
    ],
    );
  }
  _onDisplayDialog2() {
    Alert.alert(
    'Choose an object',
    'Select an object to place in the world!',
    [
      {text: 'Clear All Facts', onPress: () => this._onRemoveText(0, 10, .290760)}, 
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
  _onShowText(objIndex, objUniqueName, yOffset){
    this.setState({
      displayText: true,
        // text: 'hello',
        viroAppProps:{...this.state.viroAppProps, displayObject: true, yOffset: yOffset, displayObjectName: 10, objectSource:'Testing Where this shit comes from!'},
    });
  }
  _onShowText2(objIndex, objUniqueName, yOffset){
    this.setState({
      viroAppProps:{...this.state.viroAppProps, displayObject: true, yOffset: yOffset, displayObjectName: 10, objectSource:'cha cha changes'},
    })
  }
  _onRemoveText(objIndex, objUniqueName, yOffset){
    this.setState({
      viroAppProps:{...this.state.viroAppProps, displayObject: false},
    })
  }
}

var localStyles = StyleSheet.create({
  outer : {
    flex : 1,
  },
  arView: {
    flex:1,
  },
  buttons : {
    height: 80,
    width: 80,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  }
});
ViroMaterials.createMaterials({
  frontMaterial: {
    diffuseColor: '#FFFFFF',
  },
  backMaterial: {
    diffuseColor: '#FF0000',
  },
  sideMaterial: {
    diffuseColor: '#0000FF',
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontStyle: 'italic',
    fontSize: 12,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = ViroSample
