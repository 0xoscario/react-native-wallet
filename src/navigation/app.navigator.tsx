/**
 * @format
 */
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './root.navigator';

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

export const AppNavigator = (): React.ReactElement => {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <RootNavigator/>
    </NavigationContainer>
  );
};
