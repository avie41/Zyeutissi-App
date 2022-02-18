import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/SignIn';
import SignOutScreen from '../screens/SignUp';
import ResetPasswordScreen from '../screens/ResetPassword';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignUp" component={SignOutScreen} options={{headerShown: false}} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}