/**
 * @format
 */
import React from 'react';
import { Icon, IconElement } from '@ui-kitten/components';

export const ArrowBackIcon = (style: any): IconElement => (
  <Icon {...style} name='arrow-back-outline'/>
);

export const BrowserIcon = (style?: any): IconElement => (
  <Icon {...style} name="appstore-o" pack="ant-design"/>
);

export const CheckIcon = (style?: any): IconElement => (
  <Icon {...style} name="checkmark-outline"/>
);

export const EyeIcon = (style?: any): IconElement => (
  <Icon {...style} name="eye"/>
);

export const EyeOffIcon = (style?: any): IconElement => (
  <Icon {...style} name="eye-off"/>
);

export const MarketIcon = (style?: any): IconElement => (
  <Icon {...style} name="linechart" pack="ant-design"/>
);

export const MenuIcon = (style: any): IconElement => (
  <Icon {...style} name="menu"/>
);

export const NightIcon = (style: any): IconElement => (
  <Icon {...style} name="moon-outline"/>
);

export const SettingsIcon = (style: any): IconElement => (
  <Icon {...style} name="settings-outline"/>
);

export const WalletIcon = (style?: any): IconElement => (
  <Icon {...style} name="wallet" pack="ant-design"/>
);
