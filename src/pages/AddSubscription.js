import React from 'react';
import AddSubscriptionView from './AddSubscriptionView';
const STRIPE_ERROR = 'Payment service error. Try again later.';
import axios from 'axios';
import Service from './../methods/cars';

const urlServer="http://192.168.43.204:3000";

const SERVER_ERROR = 'Server error. Try again later.';
const STRIPE_PUBLISHABLE_KEY = 'Your Key';/**
 * The method sends HTTP requests to the Stripe API.
 * It's necessary to manually send the payment data
 * to Stripe because using Stripe Elements in React 
 * Native apps isn't possible.
 *
 * @param creditCardData the credit card data
 * @return Promise with the Stripe data
 */
const getCreditCardToken = (creditCardData) => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer pk_test_etsvRhuRHhEZdlGzTZMuFon7`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).then(response => response.json());
};/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
const subscribeUser = (creditCardToken) => {
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    
    axios.post(urlServer+'/charge', creditCardToken)
    .then(function (response) {
        console.log(response)
        
        // this.service.rentCar()
        // .then(response=>{
        //   console.log(response)
        // })
    })

    setTimeout(() => {
      resolve({ status: true });
    }, 1000)
  });
};/**
 * The main class that submits the credit card data and
 * handles the response from Stripe.
 */
export default class AddSubscription extends React.Component {
  static navigationOptions = {
    title: 'Subscription page',
  };  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null,
      charges: 0,
    }
    ////////////: checkout 
    this.service = new Service();
  }  

  // Handles submitting the payment request
  onSubmit = async (creditCardInput) => {
    const { navigation } = this.props;
    const car = navigation.getParam('car');
    console.log('car navigation parameter')
    console.log(car)
    // Disable the Submit button after the request is sent
    this.setState({ submitted: true });
    let creditCardToken;    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {
        // Reset the state if Stripe responds with an error
        // Set submitted to false to let the user subscribe again
        this.setState({ submitted: false, error: STRIPE_ERROR });
        return;
      }
    } catch (e) {
      // Reset the state if the request was sent with an error
      // Set submitted to false to let the user subscribe again
      this.setState({ submitted: false, error: STRIPE_ERROR });
      return;
    }    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      this.setState({ submitted: false, error: SERVER_ERROR });
    } else {
      this.setState({ submitted: false, error: null });
      
      this.service.rentCar(car);
      this.setState({ charges : car.price})
      navigation.navigate('ControlCar')
    }
  };
  
  // render the subscription view component and pass the props to it
  render() {
    const { submitted, error , charges} = this.state;
    return (
        <AddSubscriptionView
          charges={charges}
          error={error}
          submitted={submitted}
          onSubmit={this.onSubmit}
        />
    );
  }
}