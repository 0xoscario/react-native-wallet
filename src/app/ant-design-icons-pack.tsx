/**
 * @format
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { IconPack } from '@ui-kitten/components';

function AntDesignIcon(name: string, style?: any) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <Icon name={name} size={height} color={tintColor} style={iconStyle}/>
  );
}

const IconProvider = (name: string) => ({
  toReactElement: (props?: any) => AntDesignIcon(name, props.style),
});

function createIconsMap() {
  return new Proxy({}, {
    get(target: object, name: string) {
      return IconProvider(name);
    },
  });
}

export const AntDesignIconsPack: IconPack<any> = {
  name: 'ant-design',
  icons: createIconsMap(),
};
