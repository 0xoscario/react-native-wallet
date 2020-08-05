/**
 * @format
 */
import { combineReducers } from 'redux';
import gasReducer from 'src/reducers/gas';
import settingsReducer from 'src/reducers/settings';
import uiReducer from 'src/reducers/ui';
import walletReducer from 'src/reducers/wallet';

const rootReducer = combineReducers({
  gas: gasReducer,
  settings: settingsReducer,
  ui: uiReducer,
  wallet: walletReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
