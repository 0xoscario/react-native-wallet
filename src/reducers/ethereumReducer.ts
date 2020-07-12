/**
 * @format
 */
import produce from 'immer';
import {
  UPDATE_GAS_STATION
} from 'src/actions/ethereumActions';
import { EthereumGasStation } from 'src/utils/types';

export interface EthereumState {
  gasStation: EthereumGasStation | null;
}

const initialState: EthereumState = {
  gasStation: null
};

const ethereumReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_GAS_STATION: {
      const gasStation: EthereumGasStation = action.payload;

      return produce(state, (draft) => {
        draft.gasStation = gasStation;
      });
    }

    default: {
      return state;
    }
  }
};

export default ethereumReducer;
