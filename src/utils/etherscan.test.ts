/**
 * @format
 */
import { EthereumChainId } from 'src/utils/constants';
import { getEtherscanLink } from 'src/utils/etherscan';

describe('getEtherscanLink', () => {
  test('Mainnet', () => {
    expect(getEtherscanLink(EthereumChainId.MAINNET, '0x', 'transaction')).toBe('https://etherscan.io/tx/0x');
  });

  test('Ropsten', () => {
    expect(getEtherscanLink(EthereumChainId.ROPSTEN, '0x', 'transaction')).toBe('https://ropsten.etherscan.io/tx/0x');
  });

  test('Rinkeby', () => {
    expect(getEtherscanLink(EthereumChainId.RINKEBY, '0x', 'transaction')).toBe('https://rinkeby.etherscan.io/tx/0x');
  });

  test('Goerli', () => {
    expect(getEtherscanLink(EthereumChainId.GOERLI, '0x', 'transaction')).toBe('https://goerli.etherscan.io/tx/0x');
  });

  test('Kovan', () => {
    expect(getEtherscanLink(EthereumChainId.KOVAN, '0x', 'transaction')).toBe('https://kovan.etherscan.io/tx/0x');
  });
});
