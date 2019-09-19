import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, KeyboardAvoidingView } from 'react-native';
import { Input, TextLink, Loading } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import deviceStorage from './../methods/deviceStorage';
import { AsyncStorage } from 'react-native';
import Service from '../methods/cars';

export default class Account extends Component{
	static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;

      return {
        title: 'Account',
        headerStyle: {
          backgroundColor: '#153084',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    };
	constructor(props){	
		super(props);      
   	this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
   };
   this.service= new Service();
	}

  async _signOutAsync() {
    await this.service._signOutAsync();
    this.props.navigation.navigate('Login');
  };
	_updateProfile(){
    console.log('_updateProfile')
  }
	onClickListener = (viewId) => {
	    Alert.alert("Alert", "Button pressed "+viewId);
  }
  
  getCurrentUser(){
    const currentUser = deviceStorage.retrieveItem('client');
    console.log("currentUser")
    console.log(currentUser)
  }

	render(){
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    		 <View style={styles.container}>
			
        

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this._updateProfile()}>
            <Text style={styles.loginText}>Update Profile</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this._signOutAsync()}>
            <Text style={styles.loginText}>Logout</Text>
        </TouchableHighlight> 

      </View>
      <View style={{ height: 60 }} />
	</KeyboardAvoidingView>
      );
	}
}


const styles = StyleSheet.create({
  containerHeader: {
    flex : 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});