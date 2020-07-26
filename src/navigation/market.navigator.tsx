/**
 * @format
 */
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

const DummyScreen = () => {
  return (
    <>
    </>
  );
};

export const MarketNavigator = (): React.ReactElement => (
  <Stack.Navigator
    headerMode='none'
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS
    }}
  >
    <Stack.Screen name='Market' component={DummyScreen} />
  </Stack.Navigator>
);
