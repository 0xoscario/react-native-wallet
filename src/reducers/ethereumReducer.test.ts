/**
 * @format
 */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { UPDATE_GAS_STATION, queryGasStation } from 'src/actions/ethereumActions';
import { configureStore } from 'src/store';
import { AppStorage } from 'src/utils/app-storage';
import { EthereumGasStation } from 'src/utils/types';

jest.mock('src/utils/axios');

describe('ethereum reducer', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore();
  });

  test('gas station', async () => {
    expect(store.getState().ethereum.gasStation).toBeNull();
    const dispatch: ThunkDispatch<EthereumGasStation, null, Action<string>> = store.dispatch;
    const result = await dispatch(queryGasStation());
    expect(result).toBe(true);
    const gasStation = await AppStorage.getEthereumGasStation();
    expect(gasStation).toBeTruthy();
    expect(gasStation!.retrievedTimestamp).toBeGreaterThan(0);
    expect(gasStation).toEqual(store.getState().ethereum.gasStation);

    // cached
    const result2 = await dispatch(queryGasStation());
    expect(result2).toBe(false);
    expect(gasStation).toEqual(store.getState().ethereum.gasStation);

    // expired
    gasStation!.retrievedTimestamp -= 121 * 1000;
    store.dispatch({
      type: UPDATE_GAS_STATION,
      payload: gasStation
    });
    const result3 = await dispatch(queryGasStation());
    expect(result3).toBe(true);
    const newGasStation = await AppStorage.getEthereumGasStation();
    expect(gasStation).not.toEqual(newGasStation);
    expect(newGasStation).toEqual(store.getState().ethereum.gasStation);
  });
});
