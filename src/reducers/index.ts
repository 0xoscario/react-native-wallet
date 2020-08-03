/**
 * @format
 */
import { combineReducers } from 'redux';
import gasReducer from 'src/reducers/gas';
import settingReducer from 'src/reducers/setting';
import walletReducer from 'src/reducers/wallet';
import uiReducer from 'src/reducers/ui';

const rootReducer = combineReducers({
  gas: gasReducer,
  setting: settingReducer,
  wallet: walletReducer,
  ui: uiReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
