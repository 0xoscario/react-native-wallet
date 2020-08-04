/**
 * @format
 */
import React from 'react';
import {
  Text,
  TextProps
} from '@ui-kitten/components';
import { getEthereumShortAddress } from 'src/utils/address';

interface EthereumAddressProps extends TextProps {
  address: string;
}

export const EthereumAddress = (props: EthereumAddressProps) => {
  const { address, ...textProps } = props;
  const shortAddress = getEthereumShortAddress(address);

  return (
    <Text
      {...textProps}
    >
      {shortAddress}
    </Text>
  );
};
