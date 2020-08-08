/**
 * @format
 */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  useStyleSheet,
  Divider,
  Drawer,
  DrawerItem,
  Layout,
  StyleService,
  Text,
  Toggle
} from '@ui-kitten/components';
import { logout } from 'src/actions/logout';
import { setThemeName } from 'src/actions/settings';
import { showAccountListModal } from 'src/actions/ui';
import {
  AddIcon,
  ImportIcon,
  NightIcon,
  SettingsIcon
} from 'src/components/icons';
import { Identicon } from 'src/components/identicon.component';
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
  const styles = useStyleSheet(themedStyles);
  const imported = (currentAccount.type !== 'HD');

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
        onPress={() => {
          navigation.toggleDrawer();
          dispatch(showAccountListModal(true));
        }}
      >
        <Identicon
          address={currentAccount.address}
          size="large"
        />
        <View style={[styles.titleContainer, styles.group]}>
          <Text category="h6">
            {currentAccount.name}
          </Text>
          {imported && (
            <Text
              style={styles.imported}
              status="primary"
            >
              {i18n.t('drawer.imported')}
            </Text>
          )}
        </View>
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
    navigation.navigate('Wallet', {
      screen: 'AddAccount'
    });
  };

  const handleImportAccount = () => {
    navigation.navigate('Wallet', {
      screen: 'ImportAccount'
    });
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

const themedStyles = StyleService.create({
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imported: {
    borderRadius: 10,
		borderWidth: 1,
    borderColor: 'color-primary-default',
    fontSize: 10,
    marginLeft: spacingX(1),
    paddingHorizontal: 6,
  },
  field: {
    marginTop: spacingY(1),
  }
});
