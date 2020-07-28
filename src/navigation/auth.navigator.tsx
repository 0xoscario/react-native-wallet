/**
 * @format
 */
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { OnboardingCarouselScreen } from 'src/scenes/auth/onboarding-carousel.component';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator
    headerMode='none'
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS
    }}
  >
    <Stack.Screen name='OnboardingCarousel' component={OnboardingCarouselScreen}/>
  </Stack.Navigator>
);
