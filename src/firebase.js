import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBAXzP2CxzO3NgPdEMou3X3VIxz3Rhrf8o",
    authDomain: "agri-price-57b0d.firebaseapp.com",
    projectId: "agri-price-57b0d",
    storageBucket: "agri-price-57b0d.firebasestorage.app",
    messagingSenderId: "830396881974",
    appId: "1:830396881974:web:cc97d50b96d2ce3fffcc97",
    measurementId: "G-3CL7YVRGYR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
