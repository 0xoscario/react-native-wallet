/**
 * @format
 */

export enum EthereumChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42
}

export const ETHEREUM_NETWORK_LABELS: { [chainId in EthereumChainId]: string } = {
  [EthereumChainId.MAINNET]: '',
  [EthereumChainId.ROPSTEN]: 'Ropsten',
  [EthereumChainId.RINKEBY]: 'Rinkeby',
  [EthereumChainId.GOERLI]: 'Goerli',
  [EthereumChainId.KOVAN]: 'Kovan'
};

export const ETHERSCAN_NETWORK_PREFIXS: { [chainId in EthereumChainId]: string } = {
  [EthereumChainId.MAINNET]: '',
  [EthereumChainId.ROPSTEN]: 'ropsten.',
  [EthereumChainId.RINKEBY]: 'rinkeby.',
  [EthereumChainId.GOERLI]: 'goerli.',
  [EthereumChainId.KOVAN]: 'kovan.'
};
