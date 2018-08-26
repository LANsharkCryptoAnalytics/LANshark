import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';
import Signup from './Signup';
import renderIf from './helpers/renderIf';

const styles = StyleSheet.create({
  login: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput: {
    backgroundColor: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'stretch',
    height: 60,
    marginBottom: 0,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  btntext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signuptext: {
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginPage: true,
      signupPage: false,
    };

    this._signup = this._signup.bind(this);
    this._submit = this._submit.bind(this);
  }

  _signup() {
    this.setState({
      loginPage: false,
      signupPage: true,
    });
  }

  _submit() {
    // const url1 = 'http://ec2-34-238-240-14.compute-1.amazonaws.com/login';
    const testServer = 'http://192.168.0.15:8200/login';
    axios({
      method: 'post',
      url: testServer,
      data: this.state,
    })
      .then((response) => {
        console.warn('response.data', response.data);
        if (response.data === 'success') {
          this.props.arView();
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    return (
      <View style={styles.login}>
        {renderIf(this.state.loginPage,
        <View>
          <Text style={styles.header}>Welcome to AR History Tour</Text>

          <TextInput style={styles.textinput} placeholder="   Email" onChangeText={(text) => this.setState({email: text})}/>

          <TextInput style={styles.textinput} secureTextEntry={true} placeholder="   Password" onChangeText={(text) => this.setState({password: text})} />

          <TouchableOpacity style={styles.button} onPress={() => { this._submit() }}>
            <Text style={styles.btntext}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.signuptext} onPress={() => { this._signup() }}>Sign Up</Text>
        </View>)}

        {renderIf(this.state.signupPage,
          <View>
            <Signup />
          </View>)}

      </View>
    )
  }
}
