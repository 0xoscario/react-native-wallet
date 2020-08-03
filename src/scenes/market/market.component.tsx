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

export const MarketScreen = (props: any): React.ReactElement => {
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
          {i18n.t('bottom_tab_bar.market')}
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
