/**
 * @format
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout
} from '@ui-kitten/components';
import { Identicon } from 'src/components/identicon.component';

export default (): React.ReactElement => {
  return (
    <Layout
      style={styles.container}
      level="2"
    >
      <Identicon
        address="0x0"
        size="giant"
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
