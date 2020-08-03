/**
 * @format
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  Divider,
  Text,
  TextProps,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';
import { MenuIcon } from 'src/components/icons';
import { useEthereumNetwork } from 'src/hooks/useEthereumNetwork';
import { useI18n } from 'src/i18n';
import { spacingX } from 'src/theme';

export const WalletScreen = (props: any): React.ReactElement => {
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
      <TouchableOpacity>
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
