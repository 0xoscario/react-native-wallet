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
import { spacingX, spacingY } from 'src/theme';

export default (): React.ReactElement => {
  const i18n = useI18n();
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.container} level="2">
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
