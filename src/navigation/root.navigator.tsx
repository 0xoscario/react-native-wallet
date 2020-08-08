/**
 * @format
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { setAccount, setNetwork } from 'src/actions/settings';
import { AccountListModal } from 'src/components/account-list-modal.component';
import { NetworkListModal } from 'src/components/network-list-modal.component';
import { SafeAreaLayout } from 'src/components/safe-area-layout.component';
import { AuthNavigator } from 'src/navigation/auth.navigator';
import { BrowserNavigator } from 'src/navigation/browser.navigator';
import { MarketNavigator } from 'src/navigation/market.navigator';
import { WalletNavigator } from 'src/navigation/wallet.navigator';
import { MainBottomNavigation } from 'src/scenes/main/main-bottom-navigation.component';
import { MainDrawer } from 'src/scenes/main/main-drawer.component';
import { RootState } from 'src/reducers';
import { EthereumChainId } from 'src/utils/constants';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const ROOT_ROUTES: string[] = ['Wallet', 'Market', 'Browser'];

const isOneOfRootRoutes = (currentRoute: any): boolean => {
  return ROOT_ROUTES.find(route => currentRoute.name === route) !== undefined;
};

const getTabBarVisibleOnRootScreenOptions = ({ route }: any): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return { tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute) };
};

const MainTabsNavigator = ({ navigation }: any): React.ReactElement => {
  const dispatch = useDispatch();

  const handleNetworkChange = (chainId: EthereumChainId) => {
    dispatch(setNetwork(chainId));
  };

  const handleAccountChange = (address: string) => {
    dispatch(setAccount(address));
  };

  const handleCreateAccount = () => {
    navigation.navigate('Wallet', {
      screen: 'AddAccount'
    });
  };

  const handleImportAccount = () => {
    navigation.navigate('Wallet', {
      screen: 'ImportAccount'
    });
  };

  return (
    <>
      <SafeAreaLayout
        style={styles.safeArea}
      >
        <BottomTab.Navigator
          backBehavior='none'
          screenOptions={getTabBarVisibleOnRootScreenOptions}
          tabBar={props => <MainBottomNavigation {...props}/>}
        >
          <BottomTab.Screen name='Wallet' component={WalletNavigator}/>
          <BottomTab.Screen name='Market' component={MarketNavigator}/>
          <BottomTab.Screen name='Browser' component={BrowserNavigator}/>
        </BottomTab.Navigator>
      </SafeAreaLayout>
      <NetworkListModal onNetworkChange={handleNetworkChange}/>
      <AccountListModal
        onAccountChange={handleAccountChange}
        onCreateAccount={handleCreateAccount}
        onImportAccount={handleImportAccount}
      />
    </>
  );
};

const MainNavigator= (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{ swipeEnabled: false }}
    drawerContent={props => <MainDrawer {...props}/>}
  >
    <Drawer.Screen name='MainTabs' component={MainTabsNavigator}/>
  </Drawer.Navigator>
);

export const RootNavigator = (): React.ReactElement => {
  const vault = useSelector((state: RootState) => state.wallet.vault);
  return vault ? <MainNavigator/> : <AuthNavigator/>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
