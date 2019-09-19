import axios from 'axios';
import deviceStorage from './deviceStorage';
import { db } from './config';

import { AsyncStorage } from 'react-native';

const urlServer="http://192.168.43.204:3000";

let carsRef = db.ref('/cars');

export default class Service {

getAllCars() {
    let cars = []
    return   axios.get(urlServer+'/cars')
        .then(function (response){
            for(let car in response.data){
                cars.push(response.data[car])
            }
            return cars

        })
        .catch(function (error){
            console.log(error);
        });
}

checkout(creditCard){
    console.log("creditCard  =========================================")
    console.log(creditCard)
    return axios.post(urlServer+'/charge', creditCard)
    .then(function (response) {
        console.log(response)
    })
}

async rentCar(rentData){
    let cilentId = await deviceStorage.retrieveItem("client")
    var data = {
        car : rentData.idCar,
        client : JSON.parse(cilentId)._id,
        inProgress: true,
    }
    console.log("data renting new")
    console.log(data)
    return axios.post(urlServer+'/rentings/addRenting', {car : rentData.idCar,
        client : JSON.parse(cilentId)._id})
    .then(function(response){
        console.log(response)
    })
}


unlockCar(car){
    console.log("car ***************")
    console.log(car)
    db.ref('cars/' + car).update({locked: false});
}

_signOutAsync = async () => {
    await AsyncStorage.clear();
  };
}