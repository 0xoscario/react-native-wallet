/**
 * @format
 */
import { BigNumber } from 'ethers';
import { Dispatch } from 'redux';
import axios from 'src/utils/axios';

export const UPDATE_ETHEREUM_GAS_STATION = 'UPDATE_ETHEREUM_GAS_STATION';

export interface EthereumGasStation {
  retrievedTimestamp: number; // Api retrieved timestamp(in ms)
  safeLow: number; // Recommended safe(expected to be mined in < 30 minutes) gas price in Gwei
  average: number; // Recommended average(expected to be mined in < 5 minutes) gas price in Gwei
  fast: number; // Recommended fast(expected to be mined in < 2 minutes) gas price in Gwei
  fastest: number; // Recommended fastest(expected to be mined in < 30 seconds) gas price in Gwei
  blockTime: number; // Average time(in seconds) to mine one single block
  blockNum: number; // Latest block number
}

export function queryEthereumGasStation() {
  return async (dispatch: Dispatch<any>, getState: () => any) => {
    try {
      const lastGasStation: EthereumGasStation = getState().gas.ethereumGasStation;
      const lastRetrievedTimestamp = lastGasStation?.retrievedTimestamp || 0;
      if (Date.now() - lastRetrievedTimestamp <= 120 * 1000) {
        return false;
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

      dispatch({
        type: UPDATE_ETHEREUM_GAS_STATION,
        payload: gasStation
      });
      return true;
    } catch (error) {
      return false;
    }
  };
}
