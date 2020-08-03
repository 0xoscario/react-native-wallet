/**
 * @format
 */
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { BrowserScreen } from 'src/scenes/browser/browser.component';

const Stack = createStackNavigator();

export const BrowserNavigator = (): React.ReactElement => (
  <Stack.Navigator
    headerMode='none'
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS
    }}
  >
    <Stack.Screen name='Browser' component={BrowserScreen} />
  </Stack.Navigator>
);
