/**
 * @format
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
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
import { NightIcon, SettingsIcon } from 'src/components/icons';
import { useI18n } from 'src/i18n';
import { RootState } from 'src/reducers';
import { SecureKeychain } from 'src/utils/secure-keychain';

export const MainDrawer = ({ navigation }: any): React.ReactElement => {
  const dispatch = useDispatch();
  const themeName = useSelector((state: RootState) => state.settings.themeName);
  const i18n = useI18n();

  const renderHeader = (): React.ReactElement => (
    <Layout
      style={styles.header}
      level="2"
    >
      <View style={styles.profileContainer}>
        <Text
          style={styles.profileName}
          category='h6'
        >
          ZMWallet
        </Text>
      </View>
    </Layout>
  );

  const renderFooter = (): React.ReactElement => (
    <Layout level="2">
      <Divider/>
      <Text
        appearance='hint'
        style={styles.footer}
      >
        Version 1.0.0
      </Text>
    </Layout>
  );

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
      <DrawerItem
        title="Share"
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
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  footer: {
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
