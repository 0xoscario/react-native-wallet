/**
 * @format
 */
import { Dispatch } from 'redux';
import { AppStorage } from 'src/utils/app-storage';

export const LOGOUT = 'LOGOUT';

export function logout() {
  return async (dispatch: Dispatch<any>) => {
    await AppStorage.setVault(null);

    dispatch({
      type: LOGOUT
    });
  };
}
