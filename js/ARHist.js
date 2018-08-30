
/* eslint-disable react/prefer-es6-class */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */


import React from 'react';
import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroAmbientLight,
  ViroNode,
  ViroSpotLight,
  ViroAnimations,
  ViroMaterials,
  ViroText,
  ViroQuad,
} from 'react-viro';

// import TimerMixin from 'react-timer-mixin';
// import PropTypes from 'prop-types';

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      scaleX: 2, scaleY: 2, scaleZ: 2, opacity: 1,
    },
    easing: 'Linear',
    duration: 2400,
  },
});

ViroMaterials.createMaterials({
  frontMaterial: {
    shininess: 2.0,
    lightingModel: 'Lambert',
    diffuseColor: '#FFFFFF',
  },
  backMaterial: {
    shininess: 2.0,
    lightingModel: 'Lambert',
    bloomThreshold: 1,
    diffuseColor: '#FFFFFF',
  },
  sideMaterial: {
    shininess: 2.0,
    lightingModel: 'Lambert',
    diffuseColor: '#FFFFFF',
  },
});

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Roboto',
    // fontStyle: 'italic',
    fontSize: 9.5,
    fontWeight: '700',
    // color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

const createReactClass = require('create-react-class');

const ARHist = createReactClass({
  // mixins: [TimerMixin],

  getInitialState() {
    return {
      objPosition: [0, 0, 0],
      // scale: [0.5, 0.5, 0.5],
      rotation: [0, 0, 0],
      shouldBillboard: false,
    };
  },


  _getModel() {
    const modelArray = [];
    if (!this.props.arSceneNavigator.viroAppProps.displayObject || this.props.arSceneNavigator.viroAppProps.displayObjectName === undefined) {
      return;
    } 
    const transformBehaviors = {};
    if (this.state.shouldBillboard) {
      transformBehaviors.transformBehaviors = this.state.shouldBillboard ? 'billboardY' : [];
    }

    const bitMask = 4;
    modelArray.push(<ViroNode
      {...transformBehaviors}
      visible={this.props.arSceneNavigator.viroAppProps.displayObject}
      position={this.state.objPosition}
      onDrag={() => {}}
      ref={this._setARNodeRef}
      scale={[5, 5, 5]}
        // scale={this.state.scale}
      rotation={this.state.rotation}
      dragType="FixedToWorld"
      key={this.props.arSceneNavigator.viroAppProps.displayObjectName}
    >

      <ViroSpotLight
        innerAngle={20}
        outerAngle={20}
        direction={[0, -1, 0]}
        position={[0, 4, 0]}
        color="#ffffff"
        castsShadow
        shadowNearZ={0.1}
        shadowFarZ={6}
        shadowOpacity={0.9}
        ref={this._setSpotLightRef}
      />

      <ViroText
        text={this.props.arSceneNavigator.viroAppProps.objectSource}
          // animation={{name:'animateImage',run:true}}
        extrusionDepth={5.5}
        source={this.props.arSceneNavigator.viroAppProps.objectSource}
        materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
        scale={[0.5, 0.5, 0.5]}
          // position={[0, 0, -1.2]}
        position={[0, this.props.arSceneNavigator.viroAppProps.yOffset, -0.745]}
        style={styles.helloWorldTextStyle}
      />


      {/* <Viro3DObject
          position={[0, this.props.arSceneNavigator.viroAppProps.yOffset, 0]}
          source={this.props.arSceneNavigator.viroAppProps.objectSource}
          type = "VRX" onLoadEnd={this._onLoadEnd} onLoadStart={this._onLoadStart}
          onRotate={this._onRotate}
          onPinch={this._onPinch} /> */}

      <ViroQuad
        rotation={[-90, 0, 0]}
        position={[0, -0.001, 0]}
        width={2.5}
        height={2.5}
        arShadowReceiver={true}
        ignoreEventHandling={true}
      />

                    </ViroNode>);
    return modelArray;
        
  },

  _setARNodeRef(component) {
    this.arNodeRef = component;
  },

  _setSpotLightRef(component) {
    this.spotLight = component;
  },

  _onTrackInit() {
    this.props.arSceneNavigator.viroAppProps._onTrackingInit();
  },


  // Calculate distance between two vectors
  _distance(vectorOne, vectorTwo) {
    const distance = Math.sqrt(((vectorTwo[0] - vectorOne[0]) * (vectorTwo[0] - vectorOne[0])) + ((vectorTwo[1] - vectorOne[1]) * (vectorTwo[1] - vectorOne[1])) + ((vectorTwo[2] - vectorOne[2]) * (vectorTwo[2] - vectorOne[2])));
    return distance;
  },

  render() {
    return (
      <ViroARScene ref="arscene" onTrackingUpdated={this._onTrackInit}>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        {this._getModel()}
      </ViroARScene>
    );
  },

});

module.exports = ARHist;
