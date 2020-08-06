/**
 * @format
 */
import { useSelector } from 'react-redux';
import { RootState } from 'src/reducers';

export const useAllAccounts = () => {
  const accounts = useSelector((state: RootState) => state.wallet.vault!.accounts);
  return accounts;
}

export const useCurrentAccount = () => {
  const address = useSelector((state: RootState) => state.settings.address);
  const accounts = useSelector((state: RootState) => state.wallet.vault!.accounts);
  const account = accounts.find((account) => {
    return account.address === address;
  });
  return account || accounts[0];
}
