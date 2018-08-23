import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  Button,
  TouchableOpacity,
  View
} from 'react-native';
import axios from 'axios';

export default class Login extends Component {
  constructor(props){
    super(props)    
  }

  // Open URL in a browser

  loggingIn = () => {
    axios.get('http://172.24.6.45:8200/isLoggedIn')
    .then((data) => alert(data))
    .catch((e) => alert(e))
  }


  render(){
    return (
      <View>
        <Button title="Sign In with Google" onPress={this.loggingIn}></Button>
      </View>
    )
  }
}