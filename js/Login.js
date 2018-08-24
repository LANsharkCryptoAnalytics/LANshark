import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  login: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
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
});


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  submit() {
    const url1 = 'http://ec2-34-238-240-14.compute-1.amazonaws.com/login';
    // const url2 = 'http://172.24.6.45:8200/login';
    axios({
      method: 'get',
      url: url1,
      data: this.state,
    })
      .then((response) => {
        console.warn(response);
        this.props.arView();
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    return (
      <View style={styles.login}>

        <Text style={styles.header}>Welcome to HistARy Tour</Text>

        <TextInput style={styles.textinput} placeholder="Email" onChangeText={(text) => this.setState({email: text})}/>

        <TextInput style={styles.textinput} secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({password: text})} />

        <TouchableOpacity style={styles.button} onPress={() => {this.submit()}}>
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>

      </View>
    )
  }
}
