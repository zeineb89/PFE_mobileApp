import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert,ScrollView, KeyboardAvoidingView, WebView, Linking} from 'react-native';
import { Input, TextLink, Loading } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import deviceStorage from './deviceStorage';
import { ValidationForm, ValidationComponent } from "react-native-validation";
import ImagePicker from 'react-native-image-picker'
import {RkTheme,RkTextInput, RkButton} from 'react-native-ui-kitten';

export default class SignUp extends React.Component {

  constructor(props){	
	super(props);      
	this.state = {
		firstName: '',
		lastName: '',
		password: '', 
		confirmPassword: '', 
		email: '', 
		phone_number: '',
		dateOfBirth: '',
		photo: null,
		name:''
	}

	ValidationComponent.setDefaultErrorMessageStyle({
		color: "white",
		fontSize: 12,
	});
}
  

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    try {
	  // here place your signup logic
	  console.log("this.state--------------------------")
	  console.log(this.state)
	  console.log('user successfully signed up!: ')
	  this.props.navigation.navigate("Login");
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
 
  render() {
	const photo  = this.state.photo
	const {name, description}=this.state
    return (
// 		<ScrollView>
// 			<View style={{padding: 20, alignItems: 'center', backgroundColor: '#DCDCDC'}} >
// 				<Image
// 					style={styles.logo}
// 					source={require('./../assets/logo-spopin-simple.png')}
// 				/>
// 			</View>

// 			{/* <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
// 	   style={{width: 400, height: 400}} /> */}
// 	     <View style={{ height: 20,  backgroundColor: '#DCDCDC'}} />
// 		<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
		
		  
// 	{/* <View style={styles.inputContainer}>
// 	  <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/server/ultraviolet/50/3498db'}}/>
// 	  <TextInput style={styles.inputs}
// 		  placeholder="Server"
// 		  underlineColorAndroid='transparent'
// 		  onChangeText={(server) => this.setState({server})}/>
// 	</View> */}

// <View style={styles.inputContainer}>
// 	  <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
// 	  <TextInput style={styles.inputs}
// 		  placeholder="FirstName"
// 		  underlineColorAndroid='transparent'
// 		  onChangeText={(firstName) => this.setState({firstName})}/>
// 	</View>

// 	<View style={styles.inputContainer}>
// 	  <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
// 	  <TextInput style={styles.inputs}
// 		  placeholder="LastName"
// 		  underlineColorAndroid='transparent'
// 		  onChangeText={(lastName) => this.setState({lastName})}/>
// 	</View>

	  
// 	<View style={styles.inputContainer}>
// 	  <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
// 	  <TextInput style={styles.inputs}
// 		  placeholder="Email"
// 		  keyboardType="email-address"
// 		  underlineColorAndroid='transparent'
// 		  onChangeText={(email) => this.setState({email})}/>
// 	</View>
	
// 	<View style={styles.inputContainer}>
// 	  <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
// 	  <TextInput style={styles.inputs}
// 		  placeholder="Password"
// 		  secureTextEntry={true}
// 		  underlineColorAndroid='transparent'
// 		  onChangeText={(password) => this.setState({password})}/>
// 	</View>

// 	<View style={styles.inputContainer}>
// 	  <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
// 	  <TextInput style={styles.inputs}
// 		  placeholder="Confirm password"
// 		  secureTextEntry={true}
// 		  underlineColorAndroid='transparent'
// 		  onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
// 	</View>

// 	<View style={styles.inputContainer}>
// 	  <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
// 	  <TextInput style={styles.inputs}
// 		  placeholder="Phone Number"
// 		  underlineColorAndroid='transparent'
// 		  onChangeText={(phone_number) => this.setState({phone_number})}/>
// 	</View>

// 	<View style={styles.inputContainer}>
// 	  <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
// 	  <TextInput style={styles.inputs}
// 		  placeholder="Date Of Birth"
// 		  underlineColorAndroid='transparent'
// 		  onChangeText={(dateOfBirth) => this.setState({dateOfBirth})}/>
// 	</View>
// 	<View style={styles.inputContainer}>
// 	  <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
// 	  <TextInput style={styles.inputs}
// 		  placeholder="Address"
// 		  underlineColorAndroid='transparent'
// 		  onChangeText={(address) => this.setState({address})}/>
// 	</View>

// 	<View style={styles.inputContainer}>
// 	  <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
// 	  <TextInput style={styles.inputs}
// 		  placeholder="Driver's Licence"
// 		  underlineColorAndroid='transparent'
// 		  onChangeText={(driverLicence) => this.setState({driverLicence})}/>
// 	</View>
// 	<View style={styles.inputContainer}>
// 	  <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
// 	  <TextInput style={styles.inputs}
// 		  placeholder="CIN"
// 		  underlineColorAndroid='transparent'
// 		  onChangeText={(cin) => this.setState({cin})}/>
// 	</View>
// 	<TouchableHighlight style={styles.buttonContainer} onPress={() => this.signUp()}>
// 		<Text>Sign up</Text>
// 	</TouchableHighlight>
  
//   <View style={{ height: 60 }} />
// </KeyboardAvoidingView>
// </ScrollView>
		<ValidationForm
		style={styles.container}
		ref={ref => (this.form = ref)}
		onSubmit={() => this.props.saveUserList()}
		onError={() => console.log("houston we have a problem")}
		>
		<ValidationComponent
		component={
			<RkTextInput
			rkType="bordered"
			style={{ width: "100%" }}
			placeholder="List Name"
			value={name}
			onChangeText={value => this.setState({ name: value.trim() })}
			/>
		}
		validators={["required", "isEmail"]}
		errorMessages={["this field is required", "email is not valid"]}
		/>
		<ValidationComponent
		component={
			<TextInput
			style={{ width: "100%" }}
			placeholder="You can type a description"
			value={description}
			onChangeText={value => this.setState({ description: value })}
			/>
		}
		errorMessageStyle={{
			color: "red"
		}}
		validators={["required"]}
		errorMessages={["this field is required"]}
		/>
		<RkButton rkType="primary xlarge" onPress={() => this.form.validate()}>
		Next
		</RkButton>
		</ValidationForm>
		);
}
}


const styles = StyleSheet.create({
logo: {
	width: 300,
	height: 100,
	borderRadius: 5
},
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
	backgroundColor: "#00b5ec",
},
loginText: {
	color: 'white',
}
});