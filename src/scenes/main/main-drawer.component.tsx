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
import { setThemeName } from 'src/actions/setting';
import { NightIcon, SettingsIcon } from 'src/components/icons';
import { useI18n } from 'src/i18n';
import { RootState } from 'src/reducers';

export const MainDrawer = ({ navigation }: any): React.ReactElement => {
  const dispatch = useDispatch();
  const themeName = useSelector((state: RootState) => state.setting.themeName);
  const i18n = useI18n();

  const renderHeader = (): React.ReactElement => (
    <Layout
      style={styles.header}
      level='2'
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
    <Layout>
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

  return (
    <>
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
        />
      </Drawer>
    </>
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
