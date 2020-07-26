/**
 * @format
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Divider,
  Drawer,
  DrawerItem,
  Layout,
  Text,
} from '@ui-kitten/components';

export const MainDrawer = ({ navigation }: any): React.ReactElement => {
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
          ZM Wallet
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

  return (
    <>
      <Drawer
        header={renderHeader}
        footer={renderFooter}
      >
        <DrawerItem
          title='Dummy'
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
