/**
 * @format
 */
import React from 'react';
import {
  ImageProps,
  ListRenderItemInfo,
  View,
  ViewProps
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  useStyleSheet,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  StyleService,
  Text,
  TextProps
} from '@ui-kitten/components';
import { showAccountListModal } from 'src/actions/ui';
import { CheckIcon, DeleteIcon } from 'src/components/icons';
import { useAllAccounts, useCurrentAccount } from 'src/hooks/useAccount';
import { useI18n } from 'src/i18n';
import { RootState } from 'src/reducers';
import { spacingX } from 'src/theme';
import { toDataUrl } from 'src/utils/blockies';
import { Account } from 'src/utils/types';

interface AccountListModalProps {
  onAccountChange: (address: string) => void;
  onCreateAccount: () => void;
  onImportAccount: () => void;
}

export const AccountListModal = (props: AccountListModalProps): React.ReactElement => {
  const visible = useSelector((state: RootState) => state.ui.accountListModalVisible);
  const dispatch = useDispatch();
  const allAccounts = useAllAccounts();
  const currentAccount = useCurrentAccount();
  const i18n = useI18n();
  const styles = useStyleSheet(themedStyles);

  const renderItem = (info?: ListRenderItemInfo<Account>) => {
    const renderTitle = (props?: TextProps) => {
      const imported = (info!.item.type !== 'HD');
      return (
        <View style={styles.titleContainer}>
          <Text {...props}>
            {info!.item.name}
          </Text>
          {imported && (
            <Text
              style={styles.imported}
              status="primary"
            >
              {i18n.t('accounts.imported')}
            </Text>
          )}
        </View>
      );
    };

    return (
      <ListItem
        style={styles.listItem}
        title={renderTitle}
        description="0 ETH"
        accessoryLeft={(props?: Partial<ImageProps>) => {
          return (
            <View style={styles.accessoryLeft}>
              <Avatar source={{ uri: toDataUrl(info!.item.address) }}/>
              {(currentAccount.address === info!.item.address) && (
                <CheckIcon style={styles.checkIcon}/>
              )}
            </View>
          );
        }}
        accessoryRight={(props?: ViewProps) => {
          const imported = (info!.item.type !== 'HD');
          return imported ? (
            <Button
              accessoryLeft={DeleteIcon}
              {...props}
            />
          ) : (<></>);
        }}
        onPress={() => {
          dispatch(showAccountListModal(false));
          props.onAccountChange(info!.item.address);
        }}
      />
    );
  };

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      backdropOpacity={0.5}
      swipeDirection="down"
      coverScreen={false}
      propagateSwipe
      onBackdropPress={() => dispatch(showAccountListModal(false))}
      onBackButtonPress={() => dispatch(showAccountListModal(false))}
      onSwipeComplete={() => dispatch(showAccountListModal(false))}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.dragger}></View>
        </View>
        <Divider/>
        <List
          style={styles.list}
          data={allAccounts}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
          overScrollMode="never"
        />
        <Divider/>
        <Button
          appearance="ghost"
          onPress={() => {
            dispatch(showAccountListModal(false));
            props.onCreateAccount();
          }}
        >
          {i18n.t('accounts.create_new_account')}
        </Button>
        <Divider/>
        <Button
          appearance="ghost"
          onPress={() => {
            dispatch(showAccountListModal(false));
            props.onImportAccount();
          }}
        >
          {i18n.t('accounts.import_account')}
        </Button>
        <Divider/>
      </View>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 400,
    backgroundColor: 'background-basic-color-1'
  },
  header: {
    height: 28,
    alignItems: 'center',
		justifyContent: 'center',
  },
  dragger: {
    width: 48,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'background-alternative-color-1',
    opacity: 0.5
  },
  list: {
    flex: 1,
  },
  listItem: {
    paddingHorizontal: spacingX(1),
  },
  accessoryLeft: {
    flexDirection: 'row',
    marginRight: spacingX(1),
  },
  checkIcon: {
    position: 'absolute',
    right: -12,
    top: -8,
    width: 16,
    height: 16,
    tintColor: 'color-primary-default',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imported: {
    borderRadius: 10,
		borderWidth: 1,
    borderColor: 'color-primary-default',
    fontSize: 10,
    paddingHorizontal: spacingX(1),
  }
});
