/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// type Props = {};

export default class Settings extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: 'Settings',
      headerStyle: {
        backgroundColor: '#153084',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      // headerRight: (
      // <Icon
      //     name='cog'
      //     type='font-awesome'
      //     color='#fff'
      //     containerStyle= {[{ margin: 15 }]}
      //     onPress={() => navigation.navigate('Settings')} />
      // ),

      };
    };
    
    render() {
      const {navigate} = this.props.navigation;
      return (            
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
            
            </View>

    );
  }
}


const styles = StyleSheet.create({
  containerHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#386375',
    height: '15%'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: '85%'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    width: 50, 
    height: 50,
    color : "#841584"
  },
  buttonContainer: {
    justifyContent: 'space-around',
    margin: 10,
    padding:10,
    height: 200,
    width: 200,
  },
});