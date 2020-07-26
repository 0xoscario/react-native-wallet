/**
 * @format
 */
import React from 'react';
import { ImageProps } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const BrowserIcon = (props?: Partial<ImageProps>): IconElement => (
  <Icon {...props} name='globe-outline'/>
);
