/**
 * @format
 */
import { combineReducers } from 'redux';
import ethereumReducer from 'src/reducers/ethereumReducer';

const rootReducer = combineReducers({
  ethereum: ethereumReducer
});

export default rootReducer;
