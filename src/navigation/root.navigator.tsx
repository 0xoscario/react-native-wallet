/**
 * @format
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaLayout } from 'src/components/safe-area-layout.component';
import { AuthNavigator } from 'src/navigation/auth.navigator';
import { BrowserNavigator } from 'src/navigation/browser.navigator';
import { MarketNavigator } from 'src/navigation/market.navigator';
import { WalletNavigator } from 'src/navigation/wallet.navigator';
import { MainBottomNavigation } from 'src/scenes/main/main-bottom-navigation.component';
import { MainDrawer } from 'src/scenes/main/main-drawer.component';
import { RootState } from 'src/reducers';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ROOT_ROUTES: string[] = ['Wallet', 'Market', 'Browser'];

const isOneOfRootRoutes = (currentRoute: any): boolean => {
  return ROOT_ROUTES.find(route => currentRoute.name === route) !== undefined;
};

const getTabBarVisibleOnRootScreenOptions = ({ route }: any): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return { tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute) };
};

const MainTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    backBehavior='none'
    screenOptions={getTabBarVisibleOnRootScreenOptions}
    tabBar={props => <MainBottomNavigation {...props}/>}
  >
    <BottomTab.Screen name='Wallet' component={WalletNavigator}/>
    <BottomTab.Screen name='Market' component={MarketNavigator}/>
    <BottomTab.Screen name='Browser' component={BrowserNavigator}/>
  </BottomTab.Navigator>
);

const MainNavigator= (): React.ReactElement => (
  <SafeAreaLayout
    style={styles.safeArea}
  >
    <Drawer.Navigator
      openByDefault={false}
      screenOptions={{ swipeEnabled: false }}
      drawerContent={props => <MainDrawer {...props}/>}
    >
      <Drawer.Screen name='MainTabs' component={MainTabsNavigator}/>
    </Drawer.Navigator>
  </SafeAreaLayout>
);

export const RootNavigator = (): React.ReactElement => {
  const wallet = useSelector((state: RootState) => state.wallet);
  return (wallet.password && wallet.vault) ? <MainNavigator/> : <AuthNavigator/>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
