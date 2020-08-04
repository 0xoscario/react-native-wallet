/**
 * @format
 */
import React from 'react';
import { ImageStyle } from 'react-native';
import {
  useTheme,
  Avatar,
  AvatarProps
} from '@ui-kitten/components';
import { toDataUrl } from 'src/utils/blockies';

interface IdenticonProps extends Omit<AvatarProps, 'source'> {
  address: string;
}

export const Identicon = (props: IdenticonProps) => {
  const { address, style, ...avatarProps } = props;
  const theme = useTheme();

  const imageStyle: ImageStyle = {
    borderWidth: 2,
    borderColor: theme['color-primary-default-border']
  };

  return (
    <Avatar
      source={{ uri: toDataUrl(address) }}
      {...avatarProps}
      style={[style, imageStyle]}
    />
  );
};
