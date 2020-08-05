/**
 * @format
 */
import { ethers } from 'ethers';
import React from 'react';
import {
  Keyboard,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import zxcvbn from 'zxcvbn';
import {
  KeyboardAwareScrollView
} from '@codler/react-native-keyboard-aware-scroll-view';
import {
  useStyleSheet,
  Button,
  Input,
  StyleService,
  Text
} from '@ui-kitten/components';
import { showAlertModal } from 'src/actions/ui';
import { importWallet } from 'src/actions/wallet';
import { ArrowBackIcon, EyeIcon, EyeOffIcon } from 'src/components/icons';
import { LoadingIndicator } from 'src/components/loading-indicator.component';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY } from 'src/theme';
import { SecureKeychain } from 'src/utils/secure-keychain';
import { SeedPhraseSuggestion } from 'src/layouts/auth/import-from-seed/extra/seed-phrase-suggestion.component';

export default ({ navigation }: any): React.ReactElement => {
  const [seedInputFocus, setSeedInputFocus] = React.useState<boolean>(false);
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
    if (!seedInputFocus) {
      return '';
    }
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
      const enWordlists = ethers.wordlists.en;
      const words = enWordlists.split(seed).filter((val) => !!val);
      const result = await dispatch(importWallet(enWordlists.join(words), i18n));
      if (!result) {
        setImporting(false);
        dispatch(showAlertModal({
          message: i18n.t('import_from_seed.import_error'),
          duration: 1500
        }));
      }
    }, 1000);
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        enableOnAndroid={true}
        overScrollMode="never"
      >
        <View
          style={styles.navigationContainer}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <ArrowBackIcon style={styles.backIcon}/>
          </TouchableOpacity>
          <Text
            category="h4"
          >
            {i18n.t('import_from_seed.title')}
          </Text>
        </View>
        <Input
          style={styles.seedPhraseInput}
          textStyle={Platform.OS === 'ios' ? styles.seedPhraseTextInput : {}}
          multiline={true}
          numberOfLines={3}
          autoCapitalize="none"
          placeholder={i18n.t('import_from_seed.seed_phrase')}
          value={seed}
          status={getSeedWordsStatus()}
          onChangeText={onSeedWordsChange}
          blurOnSubmit={true}
          onFocus={() => setSeedInputFocus(true)}
          onBlur={() => setSeedInputFocus(false)}
          onSubmitEditing={jumpToNewPassword}
          returnKeyType="next"
          keyboardType={Platform.OS === 'android' ? 'visible-password' : 'default'}
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
          style={styles.button}
          accessoryLeft={importing ? LoadingIndicator : undefined}
          disabled={getImportDisabled()}
          onPress={handleImportWallet}
        >
          {importing ? undefined : i18n.t('import_from_seed.import')}
        </Button>
      </KeyboardAwareScrollView>
      <SeedPhraseSuggestion
        seedWord={getLastSeedWord()}
        onSelectSuggestion={handleSelectSuggestion}
      />
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacingX(2),
    paddingVertical: spacingY(2),
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 32,
    height: 32,
    tintColor: 'text-basic-color',
    marginHorizontal: spacingX(1),
    marginVertical: spacingX(1),
  },
  seedPhraseInput: {
    marginTop: spacingY(2),
  },
  seedPhraseTextInput: {
    height: 51,
  },
  passwordInput: {
    marginTop: spacingY(2),
  },
  button: {
    marginTop: spacingY(4),
  }
});
