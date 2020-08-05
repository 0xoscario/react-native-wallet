/**
 * @format
 */
import React from 'react';
import {
  ImageProps,
  ListRenderItemInfo,
  View
} from 'react-native';
import {
  useStyleSheet,
  Button,
  Divider,
  List,
  ListItem,
  Modal,
  ModalProps,
  StyleService,
  Text
} from '@ui-kitten/components';
import { CheckIcon } from 'src/components/icons';
import { useEthereumNetwork } from 'src/hooks/useEthereumNetwork';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY } from 'src/theme';
import {
  allEthereumNetworks,
  EthereumChainId,
  EthereumNetwork
} from 'src/utils/constants';

interface NetworkListModalProps extends Omit<ModalProps, 'children'> {
  onCloseButtonPress: () => void;
  onNetworkChange: (chainId: EthereumChainId) => void;
}

export const NetworkListModal = (props: NetworkListModalProps): React.ReactElement => {
  const i18n = useI18n();
  const ethereumNetwork = useEthereumNetwork();
  const styles = useStyleSheet(themedStyles);
  const { onCloseButtonPress, onNetworkChange, ...modalProps } = props;

  const renderItem = (info?: ListRenderItemInfo<EthereumNetwork>) => (
    <ListItem
      style={styles.listItem}
      title={info!.item.name}
      accessoryLeft={(props?: Partial<ImageProps>) => {
        return <View {...props} style={[styles.networkIcon, { backgroundColor: info!.item.color }]}/>;
      }}
      accessoryRight={ethereumNetwork.chainId === info!.item.chainId ? CheckIcon : undefined}
      onPress={() => onNetworkChange(info!.item.chainId)}
    />
  );

  return (
    <Modal
      style={styles.container}
      backdropStyle={styles.backdrop}
      {...modalProps}
    >
      <Text style={styles.title}>
        {i18n.t('networks.title')}
      </Text>
      <Divider/>
      <List
        style={styles.list}
        data={allEthereumNetworks}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        overScrollMode="never"
      />
      <Divider/>
      <Button
        style={styles.button}
        appearance="outline"
        onPress={onCloseButtonPress}
      >
        {i18n.t('networks.close')}
      </Button>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  container: {
    width: '90%',
    borderRadius: 6,
    backgroundColor: 'background-basic-color-1'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    paddingVertical: spacingY(2),
    textAlign: 'center'
  },
  list: {
    height: 244
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
