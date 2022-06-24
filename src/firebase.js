import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBafEV__a4lJWpKZwm1k51hfqjPKRghyhU",
    authDomain: "prueba100-6e760.firebaseapp.com",
    projectId: "prueba100-6e760",
    storageBucket: "prueba100-6e760.appspot.com",
    messagingSenderId: "323588870034",
    appId: "1:323588870034:web:a9a62bbef32f68b6cdfb4b"
};

app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export {db, auth}