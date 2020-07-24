/**
 * @format
 */
import { combineReducers } from 'redux';
import gasReducer from 'src/reducers/gasReducer';

const rootReducer = combineReducers({
  gas: gasReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
