// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDufqO6NX7IaXFM3fDU52FfUbDHk9JL2GI",
  authDomain: "fir-auth-e21a3.firebaseapp.com",
  projectId: "fir-auth-e21a3",
  storageBucket: "fir-auth-e21a3.appspot.com",
  messagingSenderId: "88628918299",
  appId: "1:88628918299:web:35aa53c4c1c0c3997620be"
};

// Initialize Firebase
let app;
if (firebase.apps.length == 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();

export { auth };
