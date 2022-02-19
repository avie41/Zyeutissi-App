import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Profile, ToDevelop, SwitchMode, Concept } from '../screens';
import { useScreenOptions, useTranslation } from '../hooks';
import PassOn from '../screens/PassOn';

const Stack = createStackNavigator();

export default () => {
  const { t } = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator initialRouteName="SwitchMode" screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: t('navigation.home') }}
      />

      <Stack.Screen
        name="SwitchMode"
        component={SwitchMode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PassOn"
        component={PassOn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Concept"
        component={Concept}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ToDevelop"
        component={ToDevelop}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};
