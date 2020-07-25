/**
 * @format
 */
import produce from 'immer';
import {
  UPDATE_ETHEREUM_GAS_STATION,
  EthereumGasStation
} from 'src/actions/gas';

interface State {
  ethereumGasStation: EthereumGasStation | null;
}

const initialState: State = {
  ethereumGasStation: null
};

const gasReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_ETHEREUM_GAS_STATION: {
      const gasStation: EthereumGasStation = action.payload;

      return produce(state, (draft) => {
        draft.ethereumGasStation = gasStation;
      });
    }

    default: {
      return state;
    }
  }
};

export default gasReducer;
