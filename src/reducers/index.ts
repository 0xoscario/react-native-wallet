/**
 * @format
 */
import { combineReducers } from 'redux';
import gasReducer from 'src/reducers/gas';
import walletReducer from 'src/reducers/wallet';

const rootReducer = combineReducers({
  gas: gasReducer,
  wallet: walletReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
