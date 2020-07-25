/**
 * @format
 */
import { ethers } from 'ethers';
import { Dispatch } from 'redux';
import { AppStorage } from 'src/utils/app-storage';
import { Encryptor } from 'src/utils/encryptor';
import { Vault } from 'src/utils/types';

export const INIT_WALLET = 'INIT_WALLET';

export function initWallet(password: string) {
  return async (dispatch: Dispatch<any>) => {
    const wallet = ethers.Wallet.createRandom();
    const vault: Vault = {
      mnemonic: wallet.mnemonic.phrase,
      accounts: [{
        blockchain: 'ETH',
        type: 'HD',
        address: wallet.address,
        extra: wallet.mnemonic.path
      }]
    };
    const encryptedVault = await Encryptor.encrypt(password, vault);
    await AppStorage.setVault(encryptedVault);

    dispatch({
      type: INIT_WALLET,
      payload: {
        password,
        vault
      }
    });
  };
}

export function loadWallet(password: string) {
  return async (dispatch: Dispatch<any>) => {
    const encryptedVault = await AppStorage.getVault();
    if (!encryptedVault) {
      return false;
    }

    try {
      const vault: Vault = await Encryptor.decrypt(password, encryptedVault);
      dispatch({
        type: INIT_WALLET,
        payload: {
          password,
          vault
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  };
}
