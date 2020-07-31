/**
 * @format
 */
import React from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import zxcvbn from 'zxcvbn';
import {
  useStyleSheet,
  Button,
  Input,
  StyleService,
  Text
} from '@ui-kitten/components';
import { initWallet } from 'src/actions/wallet';
import { ArrowIosBackIcon, EyeIcon, EyeOffIcon } from 'src/components/icons';
import { KeyboardAvoidingView } from 'src/components/keyboard-avoiding-view.component';
import { LoadingIndicator } from 'src/components/loading-indicator.component';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY } from 'src/theme';
import { SecureKeychain } from 'src/utils/secure-keychain';

const keyboardOffset = (height: number): number => Platform.select({
  android: 0,
  ios: height,
})!;

export default ({ navigation }: any): React.ReactElement => {
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [newPasswordVisible, setNewPasswordVisible] = React.useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState<boolean>(false);
  const [creating, setCreating] = React.useState<boolean>(false);
  const confirmPasswordRef = React.useRef<Input>(null);
  const dispatch = useDispatch();
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
        return i18n.t('choose_password.strength_good');
      case 4:
        return i18n.t('choose_password.strength_strong');
      default:
        return i18n.t('choose_password.strength_weak');
    }
  };

  const getConfirmPasswordStatus = () => {
    if (!confirmPassword) {
      return 'basic';
    }
    return (confirmPassword === newPassword) ? 'basic' : 'danger';
  };

  const getCreateDisabled = () => {
    return !((newPassword.length >= 8) && (newPassword === confirmPassword)) || creating;
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
      {i18n.t('choose_password.password_strength')}
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
      {i18n.t('choose_password.must_be_at_least', { number: 8 })}
    </Text>
  );

  const jumpToConfirmPassword = () => {
    confirmPasswordRef.current?.focus();
  };

  const handleCreateWallet = async () => {
    Keyboard.dismiss();
    if (getCreateDisabled()) {
      return;
    }
    setCreating(true);
    await SecureKeychain.setGenericPassword('zmwallet-user', newPassword);
    setTimeout(() => {
      dispatch(initWallet(newPassword));
      setCreating(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      offset={keyboardOffset}
    >
      <ScrollView
        style={styles.contentContainer}
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
          {i18n.t('choose_password.title')}
        </Text>
        <Text
          style={styles.subtitle}
          category="s1"
        >
          {i18n.t('choose_password.subtitle')}
        </Text>
        <Input
          style={styles.passwordInput}
          autoCapitalize="none"
          secureTextEntry={!newPasswordVisible}
          placeholder={i18n.t('choose_password.new_password')}
          accessoryRight={renderNewPasswordIcon}
          value={newPassword}
          caption={renderNewPasswordCaption}
          onChangeText={setNewPassword}
          onSubmitEditing={jumpToConfirmPassword}
        />
        <Input
          style={styles.passwordInput}
          ref={confirmPasswordRef}
          autoCapitalize="none"
          secureTextEntry={!confirmPasswordVisible}
          placeholder={i18n.t('choose_password.confirm_password')}
          accessoryRight={renderConfirmPasswordIcon}
          value={confirmPassword}
          status={getConfirmPasswordStatus()}
          caption={renderConfirmPasswordCaption}
          onChangeText={setConfirmPassword}
          onSubmitEditing={handleCreateWallet}
        />
      </ScrollView>
      <Button
        style={styles.button}
        accessoryLeft={creating ? LoadingIndicator : undefined}
        disabled={getCreateDisabled()}
        onPress={handleCreateWallet}
      >
        {i18n.t('choose_password.create')}
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: spacingX(2),
    marginTop: spacingY(2),
  },
  navigationContainer: {
    flexDirection: 'row',
  },
  subtitle: {
    marginVertical: spacingY(2),
  },
  passwordInput: {
    marginTop: spacingY(2),
    marginBottom: spacingY(1),
  },
  button: {
    marginHorizontal: spacingX(2),
    marginBottom: spacingY(2),
  }
});
