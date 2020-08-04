/**
 * @format
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  Divider,
  Text,
  TextProps,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';
import { showNetworkListModal } from 'src/actions/ui';
import { MenuIcon } from 'src/components/icons';
import { useEthereumNetwork } from 'src/hooks/useEthereumNetwork';
import { useI18n } from 'src/i18n';
import ContentView from 'src/layouts/wallet/home';

export const WalletScreen = (props: any): React.ReactElement => {
  const dispatch = useDispatch();
  const ethereumNetwork = useEthereumNetwork();
  const i18n = useI18n();

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={props.navigation.toggleDrawer}
    />
  );

  const renderSubtitle = (props?: TextProps) => {
    return (
      <TouchableOpacity
        onPress={() => dispatch(showNetworkListModal(true))}
      >
         <Text style={styles.title}>
          {i18n.t('bottom_tab_bar.wallet')}
        </Text>
        <View style={styles.network}>
          <View style={[styles.networkIcon, { backgroundColor: ethereumNetwork.color }]}/>
          <Text style={props?.style}>
            {ethereumNetwork.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TopNavigation
        accessoryLeft={renderDrawerAction}
        subtitle={renderSubtitle}
      />
      <Divider/>
      <ContentView/>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  network: {
    flexDirection: 'row',
    alignItems: 'center'
	},
  networkIcon: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginRight: 4,
	},
});
