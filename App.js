/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {createStackNavigator, createAppContainer, StackActions, NavigationActions, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator} from 'react-navigation';
// import { Icon } from 'react-native-vector-icons';
import Icon  from './src/assets/icons'; 


import Home from "./src/pages/Home"
import Account from './src/pages/Account'

import AddSubscription from './src/pages/AddSubscription'
import DrawerScreen from './src/pages/Menu'

import Login from './src/methods/login'
import AuthLoading from './src/pages/AuthLoading'
import SignUp from './src/methods/registration'
import ControlCar from './src/pages/controlCar'
import Owner from './src/pages/displayOwner'
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Account: {
    screen: Account,
  },
  Payment: {
    screen: AddSubscription
  },
  ControlCar: {
    screen: ControlCar
  },
  Owner: {
    screen: Owner
  }
},{
    initialRouteName: 'Home',
});

const AuthStack = createStackNavigator({ SignIn: Login });

const drawerNavigator = createDrawerNavigator({
  AboutUs: { screen: Home }
});

const Navigator = createSwitchNavigator({
  AuthLoading: { screen: AuthLoading },
  Home: { screen: AppNavigator },
  Drawer: {screen: drawerNavigator},
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  
});


const App = createAppContainer(Navigator);

export default App;