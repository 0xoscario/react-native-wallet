/**
 * @format
 */
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { MarketScreen } from 'src/scenes/market/market.component';

const Stack = createStackNavigator();

export const MarketNavigator = (): React.ReactElement => (
  <Stack.Navigator
    headerMode='none'
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS
    }}
  >
    <Stack.Screen name='Market' component={MarketScreen} />
  </Stack.Navigator>
);
