/**
 * @format
 */
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { WelcomeScreen } from '../scenes/auth/welcome.component';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator
    headerMode='none'
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS
    }}
  >
    <Stack.Screen name='Welcome' component={WelcomeScreen}/>
  </Stack.Navigator>
);
