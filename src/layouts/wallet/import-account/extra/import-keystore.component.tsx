/**
 * @format
 */
import React from 'react';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';
import {
  useStyleSheet,
  Button,
  Input,
  StyleService,
  ThemeProvider
} from '@ui-kitten/components';
import { EyeIcon, EyeOffIcon } from 'src/components/icons';
import { LoadingIndicator } from 'src/components/loading-indicator.component';
import { useAllAccounts } from 'src/hooks/useAccount';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY, useTheme } from 'src/theme';

export const ImportKeystore = () => {
  const [keystore, setKeystore] = React.useState<string>('');
  const keystoreRef = React.useRef<Input>(null);
  const [password, setPassword] = React.useState<string>('');
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const passwordRef = React.useRef<Input>(null);
  const theme = useTheme();
  const i18n = useI18n();
  const allAccounts = useAllAccounts();
  const initAccountName = i18n.t('global.new_account', { number: allAccounts.length + 1 });
  const [accountName, setAccountName] = React.useState(initAccountName);
  const [importing, setImporting] = React.useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);

  const jumpToKeystore = () => {
    keystoreRef.current?.focus();
  };

  const renderPasswordIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={() => setPasswordVisible(!passwordVisible)}>
      {passwordVisible ? EyeIcon(props) : EyeOffIcon(props)}
    </TouchableWithoutFeedback>
  );

  const jumpToPassword = () => {
    passwordRef.current?.focus();
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
          onSubmitEditing={jumpToKeystore}
        />
        <Input
          ref={keystoreRef}
          style={styles.group}
          textStyle={Platform.OS === 'ios' ? styles.keystoreTextInput : {}}
          multiline={true}
          numberOfLines={3}
          autoCapitalize="none"
          label={i18n.t('import_account.paste_keystore')}
          placeholder="TBD"
          value={keystore}
          returnKeyType="next"
          onChangeText={setKeystore}
          blurOnSubmit={true}
          onSubmitEditing={jumpToPassword}
          keyboardType={Platform.OS === 'android' ? 'visible-password' : 'default'}
          autoCorrect={false}
          textAlignVertical="top"
        />
        <Input
          ref={passwordRef}
          style={styles.group}
          autoCapitalize="none"
          secureTextEntry={!passwordVisible}
          placeholder={i18n.t('import_account.input_keystore_password')}
          accessoryRight={renderPasswordIcon}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleImportAccount}
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
  group: {
    marginTop: spacingY(2),
  },
  keystoreTextInput: {
    height: 51,
  },
  button: {
    marginTop: spacingY(3),
  }
});
