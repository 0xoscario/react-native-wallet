/**
 * @format
 */
import React from 'react';
import {
  useStyleSheet,
  Layout,
  StyleService,
} from '@ui-kitten/components';
import { useI18n } from 'src/i18n';

export default ({ navigation }: any): React.ReactElement => {
  const i18n = useI18n();
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout
      style={styles.container}
    >
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
});
