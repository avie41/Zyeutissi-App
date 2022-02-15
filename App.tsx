import 'react-native-gesture-handler';
import React from 'react';
import firebase from 'firebase/app';
import apiKeys from './config/firebaseKey';
import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';

export default function App() {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  return (
    <DataProvider>
      <AppNavigation/>
    </DataProvider>
  );
}
