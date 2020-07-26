/**
 * @format
 */
import React from 'react';
import { StyleService, useStyleSheet } from '@ui-kitten/components';

export default ({ navigation }: any): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <>
    </>
  );
};

const themedStyles = StyleService.create({
});
