import 'react-native-gesture-handler';
import React from 'react';
import './config/firebase';
import { DataProvider } from './src/hooks';
import RootNavigation from './src/navigation/App';
import {AsyncStorage} from '@react-native-async-storage/async-storage'




export default function App() {
  return (
    <DataProvider>
      <RootNavigation/>
    </DataProvider>
  );
}

