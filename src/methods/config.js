import Firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDgszGPijZpgVR54Mzq3aAo8VUTeAIeZOw",
  authDomain: "iotapp-c9343.firebaseapp.com",
  databaseURL: "https://iotapp-c9343.firebaseio.com",
  projectId: "iotapp-c9343",
  storageBucket: "iotapp-c9343.appspot.com",
  messagingSenderId: "892092660429",
  appId: "1:892092660429:web:3285c742a1e664fa"
};
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();

// export const firebaseAuth = firebaseApp.auth();
