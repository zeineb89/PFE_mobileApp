import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, KeyboardAvoidingView } from 'react-native';

import firebase from 'firebase';

import Service from './../methods/cars'
export default class ControlCar extends Component {
	static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;

      return {
        title: 'Control Car',
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
   
   this.service = new Service();

    }
    
    componentWillMount(){
        var config = {
            databaseURL: "https://iotapp-c9343.firebaseio.com",
            projectId: "iotapp-c9343",
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    unlock(car){
        console.log('lock function')
        console.log(car)
        this.service.unlockCar(car)
    }

	render(){
        const { navigation } = this.props;
        const car = navigation.getParam('car');
        console.log("car Contriol car ****************")
        console.log(car)
        const element = car.idCar+'_'+car.idDevice

		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    		 <View style={styles.container}>
			
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.unlock(element)}>
            <Text style={styles.loginText}>Lock</Text>
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