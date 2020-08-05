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
  vault: Vault | null;
}

const initialState: State = {
  vault: null
};

const walletReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGOUT: {
      return initialState;
    }
    case INIT_WALLET: {
      const vault: Vault = action.payload;

      return produce(state, (draft) => {
        draft.vault = vault;
      });
    }

    default: {
      return state;
    }
  }
};

export default walletReducer;
