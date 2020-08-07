/**
 * @format
 */
import React from 'react';
import { Platform, View } from 'react-native';
import {
  useStyleSheet,
  Button,
  Input,
  StyleService,
  ThemeProvider
} from '@ui-kitten/components';
import { LoadingIndicator } from 'src/components/loading-indicator.component';
import { useAllAccounts } from 'src/hooks/useAccount';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY, useTheme } from 'src/theme';

export const ImportPrivateKey = () => {
  const [privateKey, setPrivateKey] = React.useState<string>('');
  const privateKeyRef = React.useRef<Input>(null);
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

  const getImportingDisabled = () => {
    const name = accountName.trim();
    return name.length === 0 || importing;
  };

  const handleImportAccount = () => {
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
          placeholder="TBD"
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
          disabled={getImportingDisabled()}
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
