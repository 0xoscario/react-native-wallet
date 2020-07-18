/**
 * @format
 */
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { BigNumber } from 'ethers';
import { AppStorage } from 'src/utils/app-storage';
import axios from 'src/utils/axios';
import { EthereumGasStation } from 'src/utils/types';

export const UPDATE_GAS_STATION = '@ethereum/update-gas-station';

export function queryGasStation(): ThunkAction<
  Promise<boolean>,
  EthereumGasStation,
  null,
  Action<string>
> {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    try {
      const lastGasStation: EthereumGasStation = getState().ethereum.gasStation;
      const lastRetrievedTimestamp = lastGasStation?.retrievedTimestamp || 0;
      if (Date.now() - lastRetrievedTimestamp <= 120 * 1000) {
        return Promise.resolve(false);
      }
      const response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');

      const {
        safeLow, // Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
        average, // Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
        fast, // Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
        fastest, // Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
        block_time, // Average time(in seconds) to mine one single block
        blockNum, // Latest block number
      } = response.data;
      const gasStation: EthereumGasStation = {
        retrievedTimestamp: Date.now(),
        safeLow: BigNumber.from(safeLow).div(10).toNumber(),
        average: BigNumber.from(average).div(10).toNumber(),
        fast: BigNumber.from(fast).div(10).toNumber(),
        fastest: BigNumber.from(fastest).div(10).toNumber(),
        blockTime: block_time,
        blockNum: blockNum
      };
      AppStorage.setEthereumGasStation(gasStation);

      dispatch({
        type: UPDATE_GAS_STATION,
        payload: gasStation
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  };
}
