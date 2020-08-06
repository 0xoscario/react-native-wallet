/**
 * @format
 */
import React from 'react';
import {
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import Clipboard from '@react-native-community/clipboard';
import {
  useStyleSheet,
  StyleService,
  Text
} from '@ui-kitten/components';
import { showAccountListModal, showAlertModal } from 'src/actions/ui';
import { setAccountName } from 'src/actions/wallet';
import { EthereumAddress } from 'src/components/ethereum-address.component';
import { Identicon } from 'src/components/identicon.component';
import { useCurrentAccount } from 'src/hooks/useAccount';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY } from 'src/theme';

export const AccountOverview = () => {
  const [editAccount, setEditAccount] = React.useState({
    editing: false,
    name: ''
  });
  const editInputRef = React.useRef<TextInput>(null);
  const dispatch = useDispatch();
  const i18n = useI18n();
  const currentAccount = useCurrentAccount();
  const styles = useStyleSheet(themedStyles);

  const handleEditAccountName = () => {
    setEditAccount({
      editing: true,
      name: currentAccount.name
    });
    setTimeout(() => {
			editInputRef.current && editInputRef.current.focus();
		}, 100);
  };

  const handleChangeAccountName = () => {
    if (editAccount.name) {
      dispatch(setAccountName(currentAccount.address, editAccount.name));
    }
    setEditAccount({
      editing: false,
      name: ''
    });
  };

  const handleCopyAddress = () => {
    Clipboard.setString(currentAccount.address);
    dispatch(showAlertModal({
      message: i18n.t('account_overview.account_copied_to_clipboard'),
      duration: 1500,
      status: 'success'
    }));
  };

  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => dispatch(showAccountListModal(true))}
      >
        <Identicon
          address={currentAccount.address}
          size="large"
        />
      </TouchableOpacity>
      {editAccount.editing ? (
        <TextInput
          ref={editInputRef}
          style={[styles.inputAccountName, styles.field]}
          editable={editAccount.editing}
          blurOnSubmit={true}
          onChangeText={(value: string) => setEditAccount({
            editing: true,
            name: value
          })}
          onSubmitEditing={handleChangeAccountName}
          onBlur={handleChangeAccountName}
          value={editAccount.name}
          selectTextOnFocus
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={16}
        />
      ) : (
        <TouchableOpacity
          style={styles.field}
          onLongPress={handleEditAccountName}
        >
          <Text
            category="h6"
          >
            {currentAccount.name}
          </Text>
        </TouchableOpacity>
      )}
      <Text
        style={styles.field}
        category="label"
      >
        $0
      </Text>
      <TouchableOpacity
        style={[styles.field, styles.addressContainer]}
        onPress={handleCopyAddress}
      >
        <EthereumAddress
          style={styles.address}
          appearance="hint"
          category="label"
          address={currentAccount.address}
        />
      </TouchableOpacity>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacingY(2)
  },
  field: {
    marginTop: spacingY(1),
  },
  inputAccountName: {
    padding: 0,
    fontSize: 18,
    color: 'text-basic-color'
  },
  addressContainer: {
    borderRadius: 40,
		paddingHorizontal: spacingX(1),
    paddingVertical: spacingY(0.5),
    backgroundColor: 'background-basic-color-4'
  },
  address: {
    letterSpacing: 1
  }
});
