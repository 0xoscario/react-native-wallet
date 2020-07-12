/**
 * @format
 */
import { EthereumChainId } from 'src/utils/constants';
import { getEtherscanLink } from 'src/utils/etherscan';

test('Mainnet', () => {
  expect(getEtherscanLink(EthereumChainId.MAINNET, '0x', 'transaction')).toBe('https://etherscan.io/tx/0x');
});
