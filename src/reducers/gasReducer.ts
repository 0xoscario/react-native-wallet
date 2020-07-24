/**
 * @format
 */
import produce from 'immer';
import {
  ETHEREUM_UPDATE_GAS_STATION,
  EthereumGasStation
} from 'src/actions/gasActions';

interface State {
  ethereumGasStation: EthereumGasStation | null;
}

const initialState: State = {
  ethereumGasStation: null
};

const gasReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ETHEREUM_UPDATE_GAS_STATION: {
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
