// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,initializeAuth, getReactNativePersistence } from "firebase/auth";
import { Platform } from 'react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "authapp-a35a1.firebaseapp.com",
  projectId: "authapp-a35a1",
  storageBucket: "authapp-a35a1.firebasestorage.app",
  messagingSenderId: "597603329018",
  appId: "1:597603329018:web:3da09215f4d1572aac3a43",
  measurementId: "G-N0GRC8LKXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth=Platform.OS == 'web' ? getAuth(app):initializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});