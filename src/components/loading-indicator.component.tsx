/**
 * @format
 */
import React from 'react';
import { ImageProps, StyleSheet, View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

export const LoadingIndicator = (props?: Partial<ImageProps>): React.ReactElement => {
  return (
    <View style={[props?.style, styles.indicator]}>
      <Spinner status='control' size="small"/>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
