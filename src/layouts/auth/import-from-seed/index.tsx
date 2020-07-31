/**
 * @format
 */
import React from 'react';
import {
  useStyleSheet,
  Button,
  StyleService,
  Text
} from '@ui-kitten/components';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY } from 'src/theme';

export default ({ navigation }: any): React.ReactElement => {
  const i18n = useI18n();
  const styles = useStyleSheet(themedStyles);


  return (
    <>
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: spacingY(8),
    paddingHorizontal: spacingX(2),
    alignItems: 'center',
  },
});
