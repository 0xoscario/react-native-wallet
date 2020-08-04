/**
 * @format
 */
import { EthereumChainId, ETHERSCAN_NETWORK_PREFIXS } from 'src/utils/constants';

export const getEtherscanLink = (
  chainId: EthereumChainId,
  data: string,
  type: 'transaction' | 'token' | 'address'
): string => {
  const prefix = `https://${ETHERSCAN_NETWORK_PREFIXS[chainId]}etherscan.io`;
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
};
