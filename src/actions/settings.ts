/**
 * @format
 */
import { EthereumChainId } from 'src/utils/constants';
import { ThemeName } from 'src/utils/types';

export const SET_FIRST_RUN = 'SET_FIRST_RUN';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_THEME_NAME = 'SET_THEME_NAME';
export const SET_NETWORK = 'SET_NETWORK';
export const SET_ACCOUNT = 'SET_ACCOUNT';

export function setFirstRun() {
  return {
    type: SET_FIRST_RUN,
  };
}

export function setLanguage(language: string) {
  return {
    type: SET_LANGUAGE,
    payload: language
  };
}

export function setThemeName(themeName: ThemeName) {
  return {
    type: SET_THEME_NAME,
    payload: themeName
  };
}

export function setNetwork(chainId: EthereumChainId) {
  return {
    type: SET_NETWORK,
    payload: chainId
  };
}

export function setAccount(address: string) {
  return {
    type: SET_ACCOUNT,
    payload: address
  };
}
