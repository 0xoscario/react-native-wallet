/**
 * @format
 */
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStorage } from 'src/utils/app-storage';
import axios from 'src/utils/axios';
import { EthereumGasStation } from 'src/utils/types';

export const UPDATE_GAS_STATION = '@ethereum/update-gas-station';

export function queryGasStation(): ThunkAction<
  void,
  EthereumGasStation,
  null,
  Action<string>
> {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    try {
      const lastGasStation: EthereumGasStation = getState().ethereum.gasStation;
      const lastRetrievedTimestamp = lastGasStation?.retrievedTimestamp || 0;
      if (Date.now() - lastRetrievedTimestamp <= 120 * 1000) {
        return;
      }
      const response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
      const gasStation: EthereumGasStation = {
        retrievedTimestamp: Date.now(),
      };
      AppStorage.setEthereumGasStation(gasStation);

      dispatch({
        type: UPDATE_GAS_STATION,
        payload: gasStation
      });
    } catch (error) {
    }
  };
}
