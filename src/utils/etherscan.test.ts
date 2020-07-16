/**
 * @format
 */
import { EthereumChainId } from 'src/utils/constants';
import { getEtherscanLink } from 'src/utils/etherscan';

describe('etherscan', () => {
  test('mainnet', () => {
    expect(getEtherscanLink(EthereumChainId.MAINNET, '0x', 'transaction')).toBe('https://etherscan.io/tx/0x');
    expect(getEtherscanLink(EthereumChainId.MAINNET, '0x', 'token')).toBe('https://etherscan.io/token/0x');
    expect(getEtherscanLink(EthereumChainId.MAINNET, '0x', 'address')).toBe('https://etherscan.io/address/0x');
  });

  test('ropsten', () => {
    expect(getEtherscanLink(EthereumChainId.ROPSTEN, '0x', 'transaction')).toBe('https://ropsten.etherscan.io/tx/0x');
    expect(getEtherscanLink(EthereumChainId.ROPSTEN, '0x', 'token')).toBe('https://ropsten.etherscan.io/token/0x');
    expect(getEtherscanLink(EthereumChainId.ROPSTEN, '0x', 'address')).toBe('https://ropsten.etherscan.io/address/0x');
  });

  test('rinkeby', () => {
    expect(getEtherscanLink(EthereumChainId.RINKEBY, '0x', 'transaction')).toBe('https://rinkeby.etherscan.io/tx/0x');
    expect(getEtherscanLink(EthereumChainId.RINKEBY, '0x', 'token')).toBe('https://rinkeby.etherscan.io/token/0x');
    expect(getEtherscanLink(EthereumChainId.RINKEBY, '0x', 'address')).toBe('https://rinkeby.etherscan.io/address/0x');
  });

  test('goerli', () => {
    expect(getEtherscanLink(EthereumChainId.GOERLI, '0x', 'transaction')).toBe('https://goerli.etherscan.io/tx/0x');
    expect(getEtherscanLink(EthereumChainId.GOERLI, '0x', 'token')).toBe('https://goerli.etherscan.io/token/0x');
    expect(getEtherscanLink(EthereumChainId.GOERLI, '0x', 'address')).toBe('https://goerli.etherscan.io/address/0x');
  });

  test('kovan', () => {
    expect(getEtherscanLink(EthereumChainId.KOVAN, '0x', 'transaction')).toBe('https://kovan.etherscan.io/tx/0x');
    expect(getEtherscanLink(EthereumChainId.KOVAN, '0x', 'token')).toBe('https://kovan.etherscan.io/token/0x');
    expect(getEtherscanLink(EthereumChainId.KOVAN, '0x', 'address')).toBe('https://kovan.etherscan.io/address/0x');
  });
});
