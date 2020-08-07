/**
 * @format
 */
import { ethers } from 'ethers';
import I18n from 'i18n-js';
import { Dispatch } from 'redux';
import { setAccount } from 'src/actions/settings';
import { AppStorage } from 'src/utils/app-storage';
import { Encryptor } from 'src/utils/encryptor';
import { deriveChild } from 'src/utils/ethersHelper';
import { SecureKeychain } from 'src/utils/secure-keychain';
import { Vault } from 'src/utils/types';

export const INIT_WALLET = 'INIT_WALLET';

export function initWallet(i18n: typeof I18n) {
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
    const credentials = await SecureKeychain.getGenericPassword();
    const encryptedVault = await Encryptor.encrypt(credentials!.password, vault);
    await AppStorage.setVault(encryptedVault);

    dispatch({
      type: INIT_WALLET,
      payload: vault
    });
  };
}

export function importWallet(mnemonic: string, i18n: typeof I18n) {
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
      const credentials = await SecureKeychain.getGenericPassword();
      const encryptedVault = await Encryptor.encrypt(credentials!.password, vault);
      await AppStorage.setVault(encryptedVault);

      dispatch({
        type: INIT_WALLET,
        payload: vault
      });
      return true;
    } catch (error) {
      return false;
    }
  };
}

export function loadWallet() {
  return async (dispatch: Dispatch<any>) => {
    const credentials = await SecureKeychain.getGenericPassword();
    if (!credentials) {
      return false;
    }
    const encryptedVault = await AppStorage.getVault();
    if (!encryptedVault) {
      return false;
    }

    try {
      const vault: Vault = await Encryptor.decrypt(credentials.password, encryptedVault);
      dispatch({
        type: INIT_WALLET,
        payload: vault
      });
      return true;
    } catch (error) {
      return false;
    }
  };
}

export function setAccountName(address: string, name: string) {
  return async (dispatch: Dispatch<any>) => {
    const credentials = await SecureKeychain.getGenericPassword();
    if (!credentials) {
      return false;
    }
    const encryptedVault = await AppStorage.getVault();
    if (!encryptedVault) {
      return false;
    }

    try {
      const vault: Vault = await Encryptor.decrypt(credentials.password, encryptedVault);
      const account = vault.accounts.find((account) => {
        return account.address === address;
      });
      if (!account) {
        return false;
      }
      account.name = name;
      const newEncryptedVault = await Encryptor.encrypt(credentials.password, vault);
      await AppStorage.setVault(newEncryptedVault);
      dispatch({
        type: INIT_WALLET,
        payload: vault
      });
      return true;
    } catch (error) {
      return false;
    }
  };
}

export function addAccount(name: string) {
  return async (dispatch: Dispatch<any>) => {
    const credentials = await SecureKeychain.getGenericPassword();
    if (!credentials) {
      return false;
    }
    const encryptedVault = await AppStorage.getVault();
    if (!encryptedVault) {
      return false;
    }

    try {
      const vault: Vault = await Encryptor.decrypt(credentials.password, encryptedVault);
      const deriveIndex = vault.accounts.filter(account => account.type === 'HD').length;
      const derivePath = deriveChild(deriveIndex);
      const hdNode = ethers.utils.HDNode.fromMnemonic(vault.mnemonic).derivePath(derivePath);
      // remove duplicate account
      console.log(vault.accounts);
      vault.accounts = vault.accounts.filter(account => account.address !== hdNode.address);
      console.log(vault.accounts);
      vault.accounts.push({
        blockchain: 'ETH',
        type: 'HD',
        address: hdNode.address,
        name: name,
        extra: hdNode.path
      });
      const newEncryptedVault = await Encryptor.encrypt(credentials.password, vault);
      await AppStorage.setVault(newEncryptedVault);
      dispatch({
        type: INIT_WALLET,
        payload: vault
      });
      dispatch(setAccount(hdNode.address));
      return true;
    } catch (error) {
      return false;
    }
  };
}

export function importPrivateKey(privateKey: string, accountName: string) {
  return async (dispatch: Dispatch<any>) => {
    const credentials = await SecureKeychain.getGenericPassword();
    if (!credentials) {
      return false;
    }
    const encryptedVault = await AppStorage.getVault();
    if (!encryptedVault) {
      return false;
    }

    try {
      const wallet = new ethers.Wallet(privateKey);
      const vault: Vault = await Encryptor.decrypt(credentials.password, encryptedVault);
      const account = vault.accounts.find((account) => {
        return account.address === wallet.address;
      });
      if (!account) {
        vault.accounts.push({
          blockchain: 'ETH',
          type: 'PRIVATE KEY',
          address: wallet.address,
          name: accountName,
          extra: privateKey
        });
        const newEncryptedVault = await Encryptor.encrypt(credentials.password, vault);
        await AppStorage.setVault(newEncryptedVault);
        dispatch({
          type: INIT_WALLET,
          payload: vault
        });
      }
      dispatch(setAccount(wallet.address));
      return true;
    } catch (error) {
      return false;
    }
  };
}

export function importKeystore(json: string, password: string, accountName: string) {
  return async (dispatch: Dispatch<any>) => {
    const credentials = await SecureKeychain.getGenericPassword();
    if (!credentials) {
      return false;
    }
    const encryptedVault = await AppStorage.getVault();
    if (!encryptedVault) {
      return false;
    }

    try {
      const wallet = await ethers.Wallet.fromEncryptedJson(json, password);
      if (!wallet) {
        return false;
      }
      // regenerate keystore using password in keychain
      json = await wallet.encrypt(credentials.password);
      const vault: Vault = await Encryptor.decrypt(credentials.password, encryptedVault);
      const account = vault.accounts.find((account) => {
        return account.address === wallet.address;
      });
      if (!account) {
        vault.accounts.push({
          blockchain: 'ETH',
          type: 'PRIVATE KEY',
          address: wallet.address,
          name: accountName,
          extra: json
        });
        const newEncryptedVault = await Encryptor.encrypt(credentials.password, vault);
        await AppStorage.setVault(newEncryptedVault);
        dispatch({
          type: INIT_WALLET,
          payload: vault
        });
      }
      dispatch(setAccount(wallet.address));
      return true;
    } catch (error) {
      return false;
    }
  };
}
