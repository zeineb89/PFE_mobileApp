import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView,Image, Alert, KeyboardAvoidingView} from 'react-native';
import deviceStorage from './deviceStorage';

const urlServer="http://192.168.1.77:3000";

export default class Login extends Component {
	static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;

      return {
        title: 'Login',
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

		this.loginUser = this.loginUser.bind(this);
	}

	loginUser() {
	    const { email, password} = this.state;
      console.log("this.state ================================================")
	    console.log(this.state)
	    this.setState({ error: '', loading: true });
	    
	    // NOTE HTTP is insecure, only post to HTTPS in production apps
	    fetch(urlServer+'/users/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.state.email.toLowerCase().trim(),
            password : this.state.password
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("response 8888888888888888888888888888888888888888888888888888888888")
          console.log(responseJson)
          
          if(responseJson.data.token && responseJson.data.user)
          {
            deviceStorage.saveItem("token", responseJson.data.token).then(
              deviceStorage.saveItem("client", JSON.stringify(responseJson.data.user)).then(
                this.props.navigation.navigate("Home")
              )
            )
          }
            
          else Alert.alert('Please make sure that all inputs are corrects !')

      })
      .catch(function (error) {
			    console.log("error ---------------------------------------------------------------------------------------------------")	       
        console.log(error);
        Alert.alert('Please make sure that the server link is correct !')

      });
	}

	register() {
      this.props.navigation.navigate("SignUp");
	}

	render(){
		return (
      <ScrollView>
        <View style={{flex: 1,backgroundColor: '#DCDCDC'}}>
	     <View style={{ height: 60,  backgroundColor: '#DCDCDC'}} />

        <View style={{padding: 20, alignItems: 'center', backgroundColor: '#DCDCDC'}} >
				<Image
					style={styles.logo}
					source={require('./../assets/logo-spopin-simple.png')}
				/>
			</View>

			{/* <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
	   style={{width: 400, height: 400}} /> */}
	     <View style={{ height: 40,  backgroundColor: '#DCDCDC'}} />
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    		<View style={styles.container}>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.loginUser()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.register()}>
            <Text>Sign up</Text>
        </TouchableHighlight>
      </View>
      <View style={{ height: 200 }} />
	</KeyboardAvoidingView>
  </View>
  </ScrollView>
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
    width:20,
    height:20,
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
    backgroundColor: "#35a543",
  },
  loginText: {
    color: 'white',
  },
  logo: {
    width: 300,
    height: 100,
    borderRadius: 5
  },
});