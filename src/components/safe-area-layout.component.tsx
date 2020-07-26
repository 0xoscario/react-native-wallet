/**
 * @format
 */
import React from 'react';
import { ViewProps } from 'react-native';
import { NativeSafeAreaViewProps, SafeAreaView } from 'react-native-safe-area-context';
import { styled, StyledComponentProps } from '@ui-kitten/components';

export type SafeAreaLayoutProps = NativeSafeAreaViewProps & StyledComponentProps;

@styled('SafeAreaLayout')
export class SafeAreaLayout extends React.Component<SafeAreaLayoutProps> {
  public render(): React.ReactElement<ViewProps> {
    const { style, eva, ...viewProps } = this.props;
    return (
      <SafeAreaView
        {...viewProps}
        style={[eva?.style, style]}
      />
    );
  }
}
