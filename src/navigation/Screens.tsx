import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { Home, Profile, Login, ResetPassword, Register, ToDevelop, HowItWorks} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import { resetPassword } from '../services/firebaseMethods';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="HowItWorks"
        component={HowItWorks}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ToDevelop"
        component={ToDevelop}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
};
