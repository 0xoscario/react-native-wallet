/**
 * @format
 */
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AddAccountScreen } from 'src/scenes/wallet/add-account.component';
import { ImportAccountScreen } from 'src/scenes/wallet/import-account.component';
import { WalletScreen } from 'src/scenes/wallet/wallet.component';

const Stack = createStackNavigator();

export const WalletNavigator = (): React.ReactElement => (
  <Stack.Navigator
    headerMode='none'
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS
    }}
  >
    <Stack.Screen name='Wallet' component={WalletScreen}/>
    <Stack.Screen name='AddAccount' component={AddAccountScreen}/>
    <Stack.Screen name='ImportAccount' component={ImportAccountScreen}/>
  </Stack.Navigator>
);
