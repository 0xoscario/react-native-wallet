/**
 * @format
 */
import React from 'react';
import { Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import zxcvbn from 'zxcvbn';
import {
  useStyleSheet,
  Button,
  Input,
  Layout,
  StyleService,
  Text
} from '@ui-kitten/components';
import { initWallet } from 'src/actions/wallet';
import { EyeIcon, EyeOffIcon } from 'src/components/icons';
import { KeyboardAvoidingView } from 'src/components/keyboard-avoiding-view.component';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY } from 'src/theme';

const keyboardOffset = (height: number): number => Platform.select({
  android: 0,
  ios: height,
})!;

export default ({ navigation }: any): React.ReactElement => {
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [newPasswordVisible, setNewPasswordVisible] = React.useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState<boolean>(false);
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
    return (confirmPassword === newPassword) ? 'basic' : 'warning';
  };

  const getCreateDisabled = () => {
    return !((newPassword.length >= 8) && (newPassword === confirmPassword));
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

  const handleCreateWallet = () => {
    dispatch(initWallet(newPassword));
  };

  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <KeyboardAvoidingView
          offset={keyboardOffset}
        >
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
          />
          <Input
            style={styles.passwordInput}
            autoCapitalize="none"
            secureTextEntry={!confirmPasswordVisible}
            placeholder={i18n.t('choose_password.confirm_password')}
            accessoryRight={renderConfirmPasswordIcon}
            value={confirmPassword}
            status={getConfirmPasswordStatus()}
            caption={renderConfirmPasswordCaption}
            onChangeText={setConfirmPassword}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <Button
        style={styles.button}
        disabled={getCreateDisabled()}
        onPress={handleCreateWallet}
      >
        {i18n.t('choose_password.create')}
      </Button>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: spacingX(2),
    paddingTop: spacingY(6),
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