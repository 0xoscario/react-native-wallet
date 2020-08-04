/**
 * @format
 */
import produce from 'immer';
import { LOGOUT } from 'src/actions/logout';
import {
  SET_FIRST_RUN,
  SET_LANGUAGE,
  SET_THEME_NAME,
  SET_NETWORK
} from 'src/actions/setting';
import { EthereumChainId } from 'src/utils/constants';
import { ThemeName } from 'src/utils/types';

interface State {
  firstRun: boolean;
  language: string | null;
  themeName: Exclude<ThemeName, 'brand'> | null;
  ethereumChainId: EthereumChainId;
}

const initialState: State = {
  firstRun: true,
  language: null,
  themeName: null,
  ethereumChainId: EthereumChainId.MAINNET
};

const settingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGOUT: {
      return produce(state, (draft) => {
        draft.firstRun = true;
        draft.ethereumChainId = EthereumChainId.MAINNET;
      });
    }
    case SET_FIRST_RUN: {
      return produce(state, (draft) => {
        draft.firstRun = false;
      });
    }
    case SET_LANGUAGE: {
      const language: string = action.payload;

      return produce(state, (draft) => {
        draft.language = language;
      });
    }
    case SET_THEME_NAME: {
      const themeName: ThemeName = action.payload;

      return produce(state, (draft) => {
        if (themeName !== 'brand') {
          draft.themeName = themeName;
        }
      });
    }
    case SET_NETWORK: {
      const chainId: EthereumChainId = action.payload;

      return produce(state, (draft) => {
        draft.ethereumChainId = chainId;
      });
    }

    default: {
      return state;
    }
  }
};

export default settingReducer;
