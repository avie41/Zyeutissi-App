import 'react-native-gesture-handler';
import React from 'react';
import './config/firebase';
import { DataProvider } from './src/hooks';
import RootNavigation from './src/navigation/App';

export default function App() {
  return (
    <DataProvider>
      <RootNavigation/>
    </DataProvider>
  );
}

