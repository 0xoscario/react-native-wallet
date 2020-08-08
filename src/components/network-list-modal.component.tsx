/**
 * @format
 */
import React from 'react';
import {
  ImageProps,
  ListRenderItemInfo,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  useStyleSheet,
  Button,
  Divider,
  List,
  ListItem,
  StyleService,
  Text
} from '@ui-kitten/components';
import { showNetworkListModal } from 'src/actions/ui';
import { CheckIcon } from 'src/components/icons';
import { useEthereumNetwork } from 'src/hooks/useEthereumNetwork';
import { useI18n } from 'src/i18n';
import { RootState } from 'src/reducers';
import { spacingX, spacingY } from 'src/theme';
import {
  allEthereumNetworks,
  EthereumChainId,
  EthereumNetwork
} from 'src/utils/constants';

interface NetworkListModalProps {
  onNetworkChange: (chainId: EthereumChainId) => void;
}

export const NetworkListModal = (props: NetworkListModalProps): React.ReactElement => {
  const visible = useSelector((state: RootState) => state.ui.networkListModalVisible);
  const dispatch = useDispatch();
  const i18n = useI18n();
  const ethereumNetwork = useEthereumNetwork();
  const styles = useStyleSheet(themedStyles);

  const renderItem = (info?: ListRenderItemInfo<EthereumNetwork>) => (
    <ListItem
      style={styles.listItem}
      title={info!.item.name}
      accessoryLeft={(props?: Partial<ImageProps>) => {
        return <View {...props} style={[styles.networkIcon, { backgroundColor: info!.item.color }]}/>;
      }}
      accessoryRight={ethereumNetwork.chainId === info!.item.chainId ? CheckIcon : undefined}
      onPress={() => {
        dispatch(showNetworkListModal(false));
        props.onNetworkChange(info!.item.chainId);
      }}
    />
  );

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.5}
      swipeDirection="down"
      propagateSwipe
      onBackdropPress={() => dispatch(showNetworkListModal(false))}
      onBackButtonPress={() => dispatch(showNetworkListModal(false))}
      onSwipeComplete={() => dispatch(showNetworkListModal(false))}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          {i18n.t('networks.title')}
        </Text>
        <Divider/>
        <List
          data={allEthereumNetworks}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
          overScrollMode="never"
        />
        <Divider/>
        <Button
          style={styles.button}
          appearance="outline"
          onPress={() => dispatch(showNetworkListModal(false))}
        >
          {i18n.t('networks.close')}
        </Button>
      </View>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  container: {
    borderRadius: 6,
    backgroundColor: 'background-basic-color-1'
  },
  title: {
    paddingVertical: spacingY(2),
    textAlign: 'center'
  },
  listItem: {
    height: 48,
    paddingHorizontal: spacingX(3),
  },
  networkIcon: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginRight: 4,
	},
  button: {
    marginHorizontal: spacingX(3),
    marginVertical: spacingX(2),
  }
});
