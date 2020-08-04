/**
 * @format
 */
import { useSelector } from 'react-redux';
import { RootState } from 'src/reducers';

export const useAccount = () => {
  const accounts = useSelector((state: RootState) => state.wallet.vault!.accounts);
  return accounts[0];
}
