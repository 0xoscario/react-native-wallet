/**
 * @format
 */
import React from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  useStyleSheet,
  Button,
  Input,
  Layout,
  StyleService
} from '@ui-kitten/components';
import { addAccount } from 'src/actions/wallet';
import { LoadingIndicator } from 'src/components/loading-indicator.component';
import { useAllAccounts } from 'src/hooks/useAccount';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY } from 'src/theme';

export default ({ navigation }: any): React.ReactElement => {
  const dispatch: ThunkDispatch<any, null, Action<string>> = useDispatch();
  const i18n = useI18n();
  const allAccounts = useAllAccounts();
  const initAccountName = i18n.t('global.new_account', { number: allAccounts.length + 1 });
  const [accountName, setAccountName] = React.useState(initAccountName);
  const [creating, setCreating] = React.useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);

  const getCreateDisabled = () => {
    const name = accountName.trim();
    return name.length === 0 || creating;
  };

  const handleAddAccount = () => {
    Keyboard.dismiss();
    if (getCreateDisabled()) {
      return;
    }
    setCreating(true);
    setTimeout(async () => {
      await dispatch(addAccount(accountName));
      navigation.goBack();
    }, 1000);
  };

  return (
    <Layout style={styles.container} level="2">
      <ScrollView>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          label={i18n.t('add_account.name')}
          value={accountName}
          onChangeText={setAccountName}
          onSubmitEditing={handleAddAccount}
        />
        <Button
          style={styles.button}
          accessoryLeft={creating ? LoadingIndicator : undefined}
          disabled={getCreateDisabled()}
          onPress={handleAddAccount}
        >
          {creating ? undefined : i18n.t('add_account.create')}
        </Button>
      </ScrollView>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingVertical: spacingY(2),
    paddingHorizontal: spacingX(2),
  },
  button: {
    marginTop: spacingY(4),
  }
});
