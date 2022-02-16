import 'react-native-gesture-handler';
import React from 'react';
import './config/firebase';
import { DataProvider } from './src/hooks';
import AppNavigation from './src/navigation/App';

export default function App() {
  return (
    <DataProvider>
      <AppNavigation />
    </DataProvider>
  );
}

