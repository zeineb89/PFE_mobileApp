/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,Image, Button,Dimensions, PermissionsAndroid} from 'react-native';
// import Icon  from './../assets/icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RkTheme} from 'react-native-ui-kitten';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import { Avatar } from 'react-native-elements';
import Dialog, { DialogContent, DialogButton,DialogTitle } from 'react-native-popup-dialog';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

RkTheme.setType('RkButton', 'dark', {
  container: {
     backgroundColor: '#000034',
     borderRadius: 10,
  }
});
// The same because 'container' is default component:
RkTheme.setType('RkButton', 'dark', {
  backgroundColor: '#000034',
  borderRadius: 10,
  width: 160,
  height:145,
  margin: 10,
});

RkTheme.setType('RkButton', 'icon', {
  backgroundColor: '#1c0874',
  borderRadius: 10,
  fontSize: 24,
  width: 46,
  borderRadius: 25,
  hitSlop: {top: 5, left: 5, bottom: 5, right: 5}
});

import Service from "./../methods/cars"

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;
const initialRegion = {
    latitude: 35.669439554894446,
    longitude: 10.901655039062462,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
class Home extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
      return {
        title: 'Spopin',
        headerStyle: {
          backgroundColor: 'rgba(194,223,196,0.72)',
        },
        headerTintColor: '#35a543',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (
        <Icon
            name='user-circle'
            color='#35a543'
            size={20}
            containerStyle= {[{ marginRight: 20 }]}
            onPress={() => navigation.navigate('Account')} />
        ),
      };
    };

    constructor(props){
      map = null;
      super(props);
      this.state = {
        isDialogVisible: false,
        result : '',
        markers:[],
        cars:[],
        carToDisplay: {},
        carToRent: {},
        ready : true,
        latitude: 0,
        longitude:0,
        latitudeDelta: 0,
        longitudeDelta: 0,
        initialRegion : {
          latitude: 35.669439554894446,
          longitude: 10.901655039062462,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      };
      this.service = new Service();
      this.getPermisssion();
    };

    async getPermisssion() {
      try {
          console.log("LOAD DATA ........................ WIFI ")
          const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                'title': 'Location Accessing Permission',
                'message': 'App needs access to your location'
              }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("Thank you for your permission! :)");
              

            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
              .then(data => {
                console.log(data)

                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('Position -> ',position);

                        this.setState({
                          latitude: parseFloat(position.coords.latitude),
                          longitude: parseFloat(position.coords.longitude),
                          latitudeDelta: LATITUDE_DELTA,
                          longitudeDelta: LONGITUDE_DELTA
                        })
                        console.log(this.state.latitude)
                        console.log(this.state.longitude)
                        console.log(this.state.latitudeDelta)
                        console.log(this.state.longitudeDelta)
                        this.setState({initialRegion : {latitude: parseFloat(position.coords.latitude),
                          longitude: parseFloat(position.coords.longitude),
                          latitudeDelta: LATITUDE_DELTA,
                          longitudeDelta: LONGITUDE_DELTA}})
                        console.log("this.state.initialRegion ***************************")
                        console.log(this.state.initialRegion.latitude)
                      },
                      (error) => console.log(error),
                     {enableHighAccuracy: true, timeout: 10000}
                      
                  );

              }).catch(err => {
                console.log(err)
                // The user has not accepted to enable the location services or something went wrong during the process
                // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
                // codes : 
                //  - ERR00 : The user has clicked on Cancel button in the popup
                //  - ERR01 : If the Settings change are unavailable
                //  - ERR02 : If the popup has failed to open
              });
              
          } else {
              console.log("You will not able to find cars around");
          }
      } catch (err) {
          console.warn(err)
      } 
    }

    async componentWillMount(){
      console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
      // await this.getPermisssion().then(
     
        this.service.getAllCars().then(cars => {
          
            console.log("cars*****************")
            // console.log(cars)
             this.setState({'cars': cars})
             let markerss = []

              for(let car in cars){
                // console.log('ALOOOOOOOOOOOOOOOOOOOOO'+car)
                if(cars[car].address.lat!=null  && cars[car].address.lng!=null){
                  // console.log('ALOOOOOOOOOOOOOOOOOOOOO')    
                  markerss.push({title: cars[car].brand.brand+' '+cars[car].brand.model, description : 'Tap to see details',latitude :cars[car].address.lat, longitude:cars[car].address.lng})
               } 
              }
              // let marker = [ { latitude: 35.55779619729735, longitude: 10.868696054687462 },
              //   { latitude: 35.669439554894446, longitude: 10.901655039062462 },
              //   { latitude: 35.669439554894446, longitude: 10.901655039062462 } ]
                // console.log(markerss)
                this.setState({'markers':markerss})
            
              })
              
  
      }
      // )
    

  
    

    onRegionChange(region) {
      this.setState({ region });
    }
    showDialog(show, car){
      
      console.log('marker is Clicked !!!!!!!!')

      console.log(car)
      let details = {}
      if(car != null){
        console.log(this.state.cars[car])
        details = {
          name : this.state.cars[car].brand.brand +' '+this.state.cars[car].brand.model,
          description : this.state.cars[car].description,
          price:this.state.cars[car].price+' €/day',
          image: this.state.cars[car].images,
          ownerImage : this.state.cars[car].owner.image,
          ownerName : this.state.cars[car].owner.firstName+' '+this.state.cars[car].owner.lastName ,
          ownerId : this.state.cars[car].owner._id,
          idCar: this.state.cars[car]._id,
          idDevice: this.state.cars[car].device._id,
          position: this.state.cars[car].address,
          available: this.state.cars[car].available,
          price: this.state.cars[car].price
         }
         console.log(details.image)
      }
      this.setState({isDialogVisible : show, carToDisplay : details})
    }
    rentCar(){
      console.log('button is Clicked !!! Go to payment')
      console.log(this.state.carToDisplay)
      this.setState({'carToRent': this.state.carToDisplay})
      this.showDialog(false,null)

      console.log("this.state.carToRent from home page ________________")
      console.log(this.state.carToRent)
      this.props.navigation.navigate('Payment',{'car': this.state.carToRent});
      
      
    }
    markerClick(){
      console.log('marker is Clicked !!!!!!!!')
      this.showDialog(true, this.state.carToDisplay)
    }

    displayOwner(owner){
      this.props.navigate('Owner', {ownerId : owner})
    }

    _onMapReady = () => this.setState({marginBottom: 0})


    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={{ flex: 1}}>
               <MapView
                  onMapReady={this._onMapReady}
                  showsUserLocation ={true}
                  provider={PROVIDER_GOOGLE}
                  region={this.state.initialRegion}
                  // onRegionChange={this.onRegionChange}
                  style={{ flex: 1, marginBottom: this.state.marginBottom,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height}}
               
              >
               {this.state.markers.map((marker,i) => {
                 return (
                    <MapView.Marker key={i}
                        
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                            }}
                        onCalloutPress={() => this.showDialog(true, i)}
                        title={marker.title}
                        description={marker.description}
                        
                        >
                        <MapView.Callout tooltip>
                          {/* <View >
                              <Text>{marker.title}{"\n"}{marker.description}</Text>
                          </View> */}
                      </MapView.Callout>
                    </MapView.Marker>)
                })} 
              
               {(this.state.isDialogVisible != null && this.state.carToDisplay != null) ? (
                    <Dialog
                      visible={this.state.isDialogVisible}
                      // dialogStyle={styles.dialogContainer}
                      onTouchOutside={() => {
                        this.showDialog(false, null);
                      }}
                    >
                      <DialogTitle
                        title= "Car's Details"
                      >
                        
                      </DialogTitle>
                      <DialogContent>
                      <View >
                      
                      <Image
                            source={{uri :this.state.carToDisplay.image }}
                            style={{width: 300, height: 200}}
                          />
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.inputs}>{this.state.carToDisplay.name+"\n"}</Text>
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.inputs}>{this.state.carToDisplay.description+"\n"}</Text>
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.inputs}>{this.state.carToDisplay.price+"\n"}</Text>
                        </View >
                        <View style={{flex: 0.2, flexDirection: 'row'}}>
                          <View style={{width: 50, height: 50}} >
                          <Avatar
                              size="medium"
                              rounded
                              title="BP"
                              source={{ uri: this.state.carToDisplay.ownerImage }}
                              onPress={() => this.displayOwner(owner)}
                              activeOpacity={0.7}
                            />
                          </View>
                          <Text>{this.state.carToDisplay.ownerName}</Text>
                          </View>
                        {/* <View style={styles.inputContainer}>
                            <Avatar
                              size="medium"
                              rounded
                              title="BP"
                              source={{ uri: this.state.carToDisplay.ownerImage }}
                              onPress={() => this.displayOwner(owner)}
                              activeOpacity={0.7}
                            />
                              <Text> {this.state.carToDisplay.ownerName} </Text>
                        </View> */}
                        <View style={{flexDirection: 'row'}}>
                        <View style={styles.buttonContainer}> 
                            <Button 
                              disabled = {!this.state.carToDisplay.available}
                              title="Rent"
                              containerViewStyle={styles.button}
                              onPress={() => this.rentCar(this.state.carToDisplay)}
                            />
                        </View>
                        <View>
                            <Button 
                              title="Close"
                              containerViewStyle={styles.button}
                              onPress={() => this.showDialog(false, null)}
                            /> 
                        </View>
                        </View>
                      </DialogContent>
                    </Dialog>
                    ):(<View></View>
                    )
                  }
              </MapView> 
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
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'space-between',
    // backgroundColor: '#00001a',
  },
  containerButton: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  textButton:{
    fontSize: 20,
    color:'white'
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
    alignItems: 'center',
    backgroundColor: '#64A4C2',
    padding: 50,
    position: 'absolute',
    bottom:0
  },
  buttonContainer: {
    padding:10,
    height: 200,
    width: 150,
    color:"#841584"
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
  bgContainer: { 
    flex:1, 
    width: null, 
    height: null 
  }
});


export default Home;