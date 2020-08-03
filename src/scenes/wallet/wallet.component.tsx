/**
 * @format
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import {
  Divider,
  Text,
  TextProps,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';
import { setNetwork } from 'src/actions/setting';
import { MenuIcon } from 'src/components/icons';
import { NetworkListModal } from 'src/components/network-list-modal.component';
import { useEthereumNetwork } from 'src/hooks/useEthereumNetwork';
import { useI18n } from 'src/i18n';
import { EthereumChainId } from 'src/utils/constants';

export const WalletScreen = (props: any): React.ReactElement => {
  const [networkModalVisible, setNetworkModalVisible] = React.useState<boolean>(false);
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
        onPress={() => setNetworkModalVisible(true)}
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

  const handleNetworkChange = (chainId: EthereumChainId) => {
    setNetworkModalVisible(false);
    dispatch(setNetwork(chainId));
  };

  return (
    <>
      <TopNavigation
        accessoryLeft={renderDrawerAction}
        subtitle={renderSubtitle}
      />
      <Divider/>
      <NetworkListModal
        visible={networkModalVisible}
        onBackdropPress={() => setNetworkModalVisible(false)}
        onCloseButtonPress={() => setNetworkModalVisible(false)}
        onNetworkChange={handleNetworkChange}
      />
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
