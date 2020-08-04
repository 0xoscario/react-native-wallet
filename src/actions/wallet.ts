/**
 * @format
 */
import { ethers } from 'ethers';
import I18n from 'i18n-js';
import { Dispatch } from 'redux';
import { AppStorage } from 'src/utils/app-storage';
import { Encryptor } from 'src/utils/encryptor';
import { Vault } from 'src/utils/types';

export const INIT_WALLET = 'INIT_WALLET';

export function initWallet(password: string, i18n: typeof I18n) {
  return async (dispatch: Dispatch<any>) => {
    const wallet = ethers.Wallet.createRandom();
    const vault: Vault = {
      mnemonic: wallet.mnemonic.phrase,
      accounts: [{
        blockchain: 'ETH',
        type: 'HD',
        address: wallet.address,
        name: i18n.t('global.new_account', { number: 1 }),
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

export function importWallet(password: string, mnemonic: string, i18n: typeof I18n) {
  return async (dispatch: Dispatch<any>) => {
    try {
      const wallet = ethers.Wallet.fromMnemonic(mnemonic);
      const vault: Vault = {
        mnemonic: wallet.mnemonic.phrase,
        accounts: [{
          blockchain: 'ETH',
          type: 'HD',
          address: wallet.address,
          name: i18n.t('global.new_account', { number: 1 }),
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
      return true;
    } catch (error) {
      return false;
    }
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
