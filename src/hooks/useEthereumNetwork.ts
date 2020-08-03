/**
 * @format
 */
import { useSelector } from 'react-redux';
import { RootState } from 'src/reducers';
import { allEthereumNetworks } from 'src/utils/constants';

export const useEthereumNetwork = () => {
  const chainId = useSelector((state: RootState) => state.setting.ethereumChainId);
  const network = allEthereumNetworks.find((ethereumNetwork) => {
    return ethereumNetwork.chainId === chainId
  });
  if (!network) {
    throw new Error(`Unknown network with id ${chainId}`);
  }
  return network;
}
