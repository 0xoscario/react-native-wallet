/**
 * @format
 */
import { ethers } from 'ethers';
import React from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import zxcvbn from 'zxcvbn';
import {
  useStyleSheet,
  Button,
  Input,
  StyleService,
  Text
} from '@ui-kitten/components';
import { importWallet } from 'src/actions/wallet';
import { ArrowIosBackIcon, EyeIcon, EyeOffIcon } from 'src/components/icons';
import { KeyboardAvoidingView } from 'src/components/keyboard-avoiding-view.component';
import { LoadingIndicator } from 'src/components/loading-indicator.component';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY } from 'src/theme';
import { SecureKeychain } from 'src/utils/secure-keychain';
import { SeedPhraseSuggestion } from 'src/layouts/auth/import-from-seed/extra/seed-phrase-suggestion.component';

const keyboardOffset = (height: number): number => Platform.select({
  android: 0,
  ios: height,
})!;

export default ({ navigation }: any): React.ReactElement => {
  const [seed, setSeed] = React.useState<string>('');
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [newPasswordVisible, setNewPasswordVisible] = React.useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState<boolean>(false);
  const [importing, setImporting] = React.useState<boolean>(false);
  const newPasswordRef = React.useRef<Input>(null);
  const confirmPasswordRef = React.useRef<Input>(null);
  const dispatch: ThunkDispatch<any, null, Action<string>> = useDispatch();
  const i18n = useI18n();
  const styles = useStyleSheet(themedStyles);

  const getPasswordStrengthStatue = () => {
    switch (zxcvbn(newPassword).score) {
      case 3:
        return 'primary';
      case 4:
        return 'success';
      default:
        return 'danger';
    }
  };

  const getPasswordStrengthText = () => {
    switch (zxcvbn(newPassword).score) {
      case 3:
        return i18n.t('import_from_seed.strength_good');
      case 4:
        return i18n.t('import_from_seed.strength_strong');
      default:
        return i18n.t('import_from_seed.strength_weak');
    }
  };

  const onSeedWordsChange = (value: string) => {
    setSeed(value.toLowerCase());
  };

  const getSeedWordsStatus = () => {
    const enWordlists = ethers.wordlists.en;
    const words = enWordlists.split(seed).filter((val) => !!val);
    for (const word of words) {
      if (enWordlists.getWordIndex(word) === -1) {
        return 'danger';
      }
    }
    return 'basic';
  };

  const getLastSeedWord = () => {
    const enWordlists = ethers.wordlists.en;
    const words = enWordlists.split(seed).filter((val) => !!val);
    if (words.length > 0) {
      return words[words.length - 1];
    }
    return '';
  };

  const handleSelectSuggestion = (word: string) => {
    const enWordlists = ethers.wordlists.en;
    const words = enWordlists.split(seed).filter((val) => !!val);
    words.pop();
    words.push(word);
    const newSeed = enWordlists.join(words) + ' ';
    setSeed(newSeed);
  };

  const getConfirmPasswordStatus = () => {
    if (!confirmPassword) {
      return 'basic';
    }
    return (confirmPassword === newPassword) ? 'basic' : 'danger';
  };

  const getImportDisabled = () => {
    return !((newPassword.length >= 8) && (newPassword === confirmPassword)) || importing;
  };

  const onNewPasswordIconPress = (): void => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const renderNewPasswordIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={onNewPasswordIconPress}>
      {newPasswordVisible ? EyeIcon(props) : EyeOffIcon(props)}
    </TouchableWithoutFeedback>
  );

  const renderNewPasswordCaption = (): React.ReactElement => (
    <Text
      category="label"
      appearance="hint"
    >
      {i18n.t('import_from_seed.password_strength')}
      <Text
        category="label"
        status={getPasswordStrengthStatue()}
      >
        {getPasswordStrengthText()}
      </Text>
    </Text>
  );

  const onConfirmPasswordIconPress = (): void => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const renderConfirmPasswordIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={onConfirmPasswordIconPress}>
      {confirmPasswordVisible ? EyeIcon(props) : EyeOffIcon(props)}
    </TouchableWithoutFeedback>
  );

  const renderConfirmPasswordCaption = (): React.ReactElement => (
    <Text
      category="label"
      appearance="hint"
    >
      {i18n.t('import_from_seed.must_be_at_least', { number: 8 })}
    </Text>
  );

  const jumpToNewPassword = () => {
    newPasswordRef.current?.focus();
  };

  const jumpToConfirmPassword = () => {
    confirmPasswordRef.current?.focus();
  };

  const handleImportWallet = () => {
    Keyboard.dismiss();
    if (getImportDisabled()) {
      return;
    }
    setImporting(true);
    setTimeout(async () => {
      await SecureKeychain.setGenericPassword('zmwallet-user', newPassword);
      const result = await dispatch(importWallet(newPassword, seed));
      if (!result) {
        setImporting(false);
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      offset={keyboardOffset}
    >
      <ScrollView
        overScrollMode="never"
      >
        <View
          style={styles.navigationContainer}
        >
          <Button
            appearance='ghost'
            status='basic'
            accessoryLeft={ArrowIosBackIcon}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text
          category="h4"
        >
          {i18n.t('import_from_seed.title')}
        </Text>
        <Input
          style={styles.seedPhraseInput}
          multiline={true}
          numberOfLines={3}
          autoCapitalize="none"
          placeholder={i18n.t('import_from_seed.seed_phrase')}
          value={seed}
          status={getSeedWordsStatus()}
          onChangeText={onSeedWordsChange}
          blurOnSubmit={true}
          onSubmitEditing={jumpToNewPassword}
          returnKeyType="next"
          keyboardType={(Platform.OS === 'android') ? 'visible-password' : 'default'}
          autoCorrect={false}
          textAlignVertical="top"
        />
        <Input
          style={styles.passwordInput}
          ref={newPasswordRef}
          autoCapitalize="none"
          secureTextEntry={!newPasswordVisible}
          placeholder={i18n.t('import_from_seed.new_password')}
          accessoryRight={renderNewPasswordIcon}
          value={newPassword}
          caption={renderNewPasswordCaption}
          onChangeText={setNewPassword}
          onSubmitEditing={jumpToConfirmPassword}
          returnKeyType="next"
        />
        <Input
          style={styles.passwordInput}
          ref={confirmPasswordRef}
          autoCapitalize="none"
          secureTextEntry={!confirmPasswordVisible}
          placeholder={i18n.t('import_from_seed.confirm_password')}
          accessoryRight={renderConfirmPasswordIcon}
          value={confirmPassword}
          status={getConfirmPasswordStatus()}
          caption={renderConfirmPasswordCaption}
          onChangeText={setConfirmPassword}
          onSubmitEditing={handleImportWallet}
        />
        <Button
          accessoryLeft={importing ? LoadingIndicator : undefined}
          disabled={getImportDisabled()}
          onPress={handleImportWallet}
        >
          {i18n.t('import_from_seed.import')}
        </Button>
      </ScrollView>
      <SeedPhraseSuggestion
        seedWord={getLastSeedWord()}
        onSelectSuggestion={handleSelectSuggestion}
      />
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: spacingY(8),
    paddingHorizontal: spacingX(2),
  },
  navigationContainer: {
    flexDirection: 'row',
  },
  seedPhraseInput: {
    marginTop: spacingY(2),
    marginBottom: spacingY(1),
  },
  passwordInput: {
    marginTop: spacingY(2),
    marginBottom: spacingY(1),
  }
});
