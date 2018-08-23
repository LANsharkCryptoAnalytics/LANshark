import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';

export default class Signup extends Component {
  constructor(props){
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  // Open URL in a browser

  loggingIn = () => {
    axios.post('http://172.24.6.45:8200/login')
    .then((data) => alert(data))
    .catch((e) => alert(e))
  }

  updateValue(text, field) {
    if (field == 'name'){
      this.setState({
        name: text,
      })
    }else if (field == 'email'){
      this.setState({
        email: text,
      })
    }else if(field == 'password'){
      this.setState({
        password: text,
      })
    }
  }

  submit() {
    let collection = {}
    collection.name = this.state.name,
    collection.email = this.state.email,
    collection.password = this.state.password,
    console.warn(collection);

    var url = 'http://ec2-34-238-240-14.compute-1.amazonaws.com/login';

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(collection), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => console.warn('Success:', JSON.stringify(response)))
.catch(error => console.warn('Error:', error));
  }

  render(){
    return (
      <View style={styles.login}> 

        <Text style={styles.header}>Welcome to HistARy Tour</Text>
        
        <TextInput style={styles.textinput} placeholder="Your Name" onChangeText={(text) => this.updateValue(text, 'name')}/>

        <TextInput style={styles.textinput} placeholder="Email" onChangeText={(text) => this.updateValue(text, 'email')} />

        <TextInput style={styles.textinput} placeholder="Password" secureTextEntry={true} onChangeText={(text) => this.updateValue(text, 'password')}/>

        <TouchableOpacity style={styles.button} onPress={this.submit()}>
          <Text style={styles.btntext}>Sign Up</Text>        
        </TouchableOpacity>
        
      </View>
    )
  }
}

var styles = StyleSheet.create({
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
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
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
  }

})