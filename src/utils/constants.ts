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

export interface EthereumNetwork {
  name: string;
  shortName: string;
  chainId: EthereumChainId;
  color: string;
}

export const allEthereumNetworks: EthereumNetwork[] = [
	{
		name: 'Ethereum Main Network',
		shortName: 'Ethereum',
		chainId: EthereumChainId.MAINNET,
		color: '#2ecc71'
	},
	{
		name: 'Ropsten Test Network',
		shortName: 'Ropsten',
		chainId: EthereumChainId.ROPSTEN,
		color: '#d35400'
	},
	{
		name: 'Rinkeby Test Network',
		shortName: 'Rinkeby',
		chainId: EthereumChainId.RINKEBY,
		color: '#f1c40f'
	},
	{
		name: 'Goerli Test Network',
		shortName: 'Goerli',
		chainId: EthereumChainId.GOERLI,
		color: '#3498db'
  },
  {
		name: 'Kovan Test Network',
		shortName: 'Kovan',
		chainId: EthereumChainId.KOVAN,
		color: '#9b59b6'
	},
];
