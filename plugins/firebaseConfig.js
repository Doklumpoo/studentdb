import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyAlSLBPAU9tVjF72INDEqgsIOraWlufKtc',
    authDomain: 'cs-student-71fd5.firebaseapp.com',
    databaseURL: 'https://cs-student-71fd5.firebaseio.com',
    projectId: 'cs-student-71fd5',
    storageBucket: 'cs-student-71fd5.appspot.com',
    messagingSenderId: '314716016517',
    appId: '1:314716016517:web:7d426da18db1ec654a7eec',
    measurementId: 'G-4H8WL11MHX',
  }
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
