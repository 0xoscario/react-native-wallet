/**
 * @format
 */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { queryGasStation } from 'src/actions/ethereumActions';
import { configureStore } from 'src/store';
import { EthereumGasStation } from 'src/utils/types';

jest.mock('src/utils/axios');

describe('ethereum reducer', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore();
  });

  test('gas station', async () => {
    const dispatch: ThunkDispatch<EthereumGasStation, null, Action<string>> = store.dispatch;
    const result = await dispatch(queryGasStation());
    expect(result).toBe(true);
  });
});
