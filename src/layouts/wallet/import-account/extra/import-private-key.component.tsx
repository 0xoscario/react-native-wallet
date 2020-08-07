/**
 * @format
 */
import React from 'react';
import { Keyboard, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  useStyleSheet,
  Button,
  Input,
  StyleService,
  ThemeProvider
} from '@ui-kitten/components';
import { showAlertModal } from 'src/actions/ui';
import { importPrivateKey } from 'src/actions/wallet';
import { LoadingIndicator } from 'src/components/loading-indicator.component';
import { useAllAccounts } from 'src/hooks/useAccount';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY, useTheme } from 'src/theme';

export const ImportPrivateKey = () => {
  const [privateKey, setPrivateKey] = React.useState<string>('');
  const privateKeyRef = React.useRef<Input>(null);
  const navigation = useNavigation();
  const dispatch: ThunkDispatch<any, null, Action<string>> = useDispatch();
  const theme = useTheme();
  const i18n = useI18n();
  const allAccounts = useAllAccounts();
  const initAccountName = i18n.t('global.new_account', { number: allAccounts.length + 1 });
  const [accountName, setAccountName] = React.useState(initAccountName);
  const [importing, setImporting] = React.useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);

  const jumpToPrivateKey = () => {
    privateKeyRef.current?.focus();
  };

  const getImportDisabled = () => {
    const name = accountName.trim();
    return name.length === 0 || importing;
  };

  const handleImportAccount = () => {
    Keyboard.dismiss();
    if (getImportDisabled()) {
      return;
    }
    setImporting(true);
    setTimeout(async () => {
      const result = await dispatch(importPrivateKey(privateKey, accountName));
      if (!result) {
        setImporting(false);
        dispatch(showAlertModal({
          message: i18n.t('import_account.invalid_private_key'),
          duration: 1500,
          status: 'info'
        }));
      } else {
        navigation.goBack();
      }
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          label={i18n.t('import_account.name')}
          value={accountName}
          returnKeyType="next"
          onChangeText={setAccountName}
          onSubmitEditing={jumpToPrivateKey}
        />
        <Input
          ref={privateKeyRef}
          style={styles.privateKeyInput}
          textStyle={Platform.OS === 'ios' ? styles.privateKeyTextInput : {}}
          multiline={true}
          numberOfLines={3}
          autoCapitalize="none"
          label={i18n.t('import_account.paste_private_key')}
          placeholder={i18n.t('import_account.private_key_placeholder')}
          value={privateKey}
          onChangeText={setPrivateKey}
          blurOnSubmit={true}
          onSubmitEditing={handleImportAccount}
          keyboardType={Platform.OS === 'android' ? 'visible-password' : 'default'}
          autoCorrect={false}
          textAlignVertical="top"
        />
        <Button
          style={styles.button}
          accessoryLeft={importing ? LoadingIndicator : undefined}
          disabled={getImportDisabled()}
          onPress={handleImportAccount}
        >
          {importing ? undefined : i18n.t('import_account.import')}
        </Button>
      </View>
    </ThemeProvider>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingVertical: spacingY(2),
    paddingHorizontal: spacingX(2),
  },
  privateKeyInput: {
    marginTop: spacingY(2),
  },
  privateKeyTextInput: {
    height: 51,
  },
  button: {
    marginTop: spacingY(3),
  }
});
