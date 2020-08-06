/**
 * @format
 */
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Divider,
  Drawer,
  DrawerItem,
  Layout,
  Text,
  Toggle
} from '@ui-kitten/components';
import { logout } from 'src/actions/logout';
import { setThemeName } from 'src/actions/settings';
import { showAccountListModal } from 'src/actions/ui';
import { Identicon } from 'src/components/identicon.component';
import {
  AddIcon,
  ImportIcon,
  NightIcon,
  SettingsIcon
} from 'src/components/icons';
import { useCurrentAccount } from 'src/hooks/useAccount';
import { useI18n } from 'src/i18n';
import { RootState } from 'src/reducers';
import { spacingX, spacingY } from 'src/theme';
import { getEthereumShortAddress } from 'src/utils/address';
import { SecureKeychain } from 'src/utils/secure-keychain';

export const MainDrawer = ({ navigation }: any): React.ReactElement => {
  const dispatch = useDispatch();
  const currentAccount = useCurrentAccount();
  const themeName = useSelector((state: RootState) => state.settings.themeName);
  const i18n = useI18n();

  const renderHeader = (): React.ReactElement => (
    <Layout
      style={styles.header}
      level="2"
    >
      <Text
        style={styles.logo}
        category='h6'
      >
        ZMWALLET
      </Text>
      <TouchableOpacity
        style={styles.group}
        onPress={() => dispatch(showAccountListModal(true))}
      >
        <Identicon
          address={currentAccount.address}
          size="large"
        />
        <Text
          style={styles.group}
          category="h6"
        >
          {currentAccount.name}
        </Text>
        <Text
          style={styles.field}
          category="label"
        >
          $0
        </Text>
        <Text
          style={styles.field}
          appearance="hint"
          category="label"
        >
          {getEthereumShortAddress(currentAccount.address)}
        </Text>
      </TouchableOpacity>
    </Layout>
  );

  const renderFooter = (): React.ReactElement => (
    <>
    </>
  );

  const handleCreateAccount = () => {
  };

  const handleImportAccount = () => {
  };

  const renderDarkModeToggle = () => (
    <Toggle checked={themeName === 'dark'} onChange={toggleDarkMode}/>
  );

  const toggleDarkMode = () => {
    dispatch(setThemeName((themeName === 'dark') ? 'light' : 'dark'));
  };

  const handleSettings = async () => {
    await SecureKeychain.resetGenericPassword();
    dispatch(logout());
  };

  return (
    <Drawer
      appearance="noDivider"
      header={renderHeader}
      footer={renderFooter}
    >
      <Divider/>
      <DrawerItem
        title={i18n.t('drawer.create_new_account')}
        accessoryLeft={AddIcon}
        onPress={handleCreateAccount}
      />
      <DrawerItem
        title={i18n.t('drawer.import_account')}
        accessoryLeft={ImportIcon}
        onPress={handleImportAccount}
      />
      <Divider/>
      <DrawerItem
        title={i18n.t('drawer.dark_mode')}
        accessoryLeft={NightIcon}
        accessoryRight={renderDarkModeToggle}
        onPress={toggleDarkMode}
      />
      <DrawerItem
        title={i18n.t('drawer.settings')}
        accessoryLeft={SettingsIcon}
        onPress={handleSettings}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacingX(2),
    paddingVertical: spacingY(2),
  },
  logo: {
    letterSpacing: 1,
  },
  group: {
    marginTop: spacingY(2),
  },
  field: {
    marginTop: spacingY(1),
  }
});
