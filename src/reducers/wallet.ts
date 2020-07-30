/**
 * @format
 */
import produce from 'immer';
import { LOGOUT } from 'src/actions/logout';
import {
  INIT_WALLET
} from 'src/actions/wallet';
import { Vault } from 'src/utils/types';

interface State {
  password: string | null;
  vault: Vault | null;
}

const initialState: State = {
  password: null,
  vault: null
};

const walletReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGOUT: {
      return initialState;
    }
    case INIT_WALLET: {
      const password: string = action.payload.password;
      const vault: Vault = action.payload.vault;

      return produce(state, (draft) => {
        draft.password = password;
        draft.vault = vault;
      });
    }

    default: {
      return state;
    }
  }
};

export default walletReducer;
