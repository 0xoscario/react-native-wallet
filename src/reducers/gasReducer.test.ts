/**
 * @format
 */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  ETHEREUM_UPDATE_GAS_STATION,
  queryEthereumGasStation,
  EthereumGasStation
} from 'src/actions/gasActions';
import { configureTestStore } from 'src/store';

jest.mock('src/utils/axios');

describe('gas reducer', () => {
  let store: ReturnType<typeof configureTestStore>;

  beforeEach(() => {
    store = configureTestStore();
  });

  test('ethereum gas station', async () => {
    expect(store.getState().gas.ethereumGasStation).toBeNull();
    const dispatch: ThunkDispatch<EthereumGasStation, null, Action<string>> = store.dispatch;
    const result = await dispatch(queryEthereumGasStation());
    expect(result).toBe(true);
    const gasStation = store.getState().gas.ethereumGasStation;
    expect(gasStation).toBeTruthy();
    expect(gasStation!.retrievedTimestamp).toBeGreaterThan(0);
    const gasStationClone = { ...gasStation };

    // cached
    const result2 = await dispatch(queryEthereumGasStation());
    expect(result2).toBe(false);
    expect(gasStationClone).toEqual(store.getState().gas.ethereumGasStation);

    // expired
    (gasStationClone as EthereumGasStation).retrievedTimestamp -= 121 * 1000;
    store.dispatch({
      type: ETHEREUM_UPDATE_GAS_STATION,
      payload: gasStationClone
    });
    const result3 = await dispatch(queryEthereumGasStation());
    expect(result3).toBe(true);
    const newGasStation = store.getState().gas.ethereumGasStation;
    expect(gasStation).not.toEqual(newGasStation);
  });
});
