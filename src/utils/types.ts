/**
 * @format
 */

export type Blockchain = 'BTC' | 'ETH';

export type AccountType = 'HD' | 'PRIVATE KEY' | 'KEYSTORE';

export interface Account {
  blockchain: Blockchain;
  type: AccountType;
  address: string;
  extra: string; // Path | Private key | Keystore
}

export interface Vault {
  mnemonic: string;
  accounts: Account[];
}
