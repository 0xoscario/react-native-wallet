/**
 * @format
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  Divider,
  MenuItem,
  OverflowMenu,
  Text,
  TextProps,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';
import { showNetworkListModal } from 'src/actions/ui';
import { AddIcon, MenuIcon } from 'src/components/icons';
import { useEthereumNetwork } from 'src/hooks/useEthereumNetwork';
import { useI18n } from 'src/i18n';
import ContentView from 'src/layouts/wallet/home';

export const WalletScreen = (props: any): React.ReactElement => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const dispatch = useDispatch();
  const ethereumNetwork = useEthereumNetwork();
  const i18n = useI18n();

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={props.navigation.toggleDrawer}
    />
  );

  const renderAddAction = () => (
    <TopNavigationAction
      icon={AddIcon}
      onPress={() => setMenuVisible(true)}
    />
  );

  const renderOverflowMenu = () => (
    <OverflowMenu
      visible={menuVisible}
      anchor={renderAddAction}
      placement="bottom end"
      onBackdropPress={() => setMenuVisible(false)}
    >
      <MenuItem title='ADD TOKENS'/>
      <MenuItem title='ADD COLLECTIBLES'/>
    </OverflowMenu>
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
        accessoryRight={renderOverflowMenu}
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
