/**
 * @format
 */
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { WalletScreen } from 'src/scenes/wallet/wallet.component';

const Stack = createStackNavigator();

export const WalletNavigator = (): React.ReactElement => (
  <Stack.Navigator
    headerMode='none'
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS
    }}
  >
    <Stack.Screen name='Wallet' component={WalletScreen} />
  </Stack.Navigator>
);
