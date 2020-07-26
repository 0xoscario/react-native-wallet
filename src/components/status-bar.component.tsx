/**
 * @format
 */
import React from 'react';
import {
  StatusBar as RNStatusBar,
  StatusBarProps as RNStatusBarProps
} from 'react-native';
import { styled, StyledComponentProps } from '@ui-kitten/components';

export type StatusBarProps = RNStatusBarProps & StyledComponentProps;

@styled('StatusBar')
export class StatusBar extends React.Component<StatusBarProps> {
  public render(): React.ReactElement<RNStatusBarProps> {
    const { eva, ...statusBarProps } = this.props;

    return (
      <RNStatusBar {...eva?.style} {...statusBarProps}/>
    );
  }
}
