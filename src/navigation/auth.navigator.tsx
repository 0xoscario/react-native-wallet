/**
 * @format
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { RootState } from 'src/reducers';
import { OnboardingCarouselScreen } from 'src/scenes/auth/onboarding-carousel.component';
import { OnboardingScreen } from 'src/scenes/auth/onboarding.component';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => {
  const firstRun = useSelector((state: RootState) => state.setting.firstRun);
  const initialRouteName = firstRun ? 'OnboardingCarousel' : 'Onboarding';

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      headerMode='none'
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <Stack.Screen name='OnboardingCarousel' component={OnboardingCarouselScreen}/>
      <Stack.Screen name='Onboarding' component={OnboardingScreen}/>
    </Stack.Navigator>
  );
};