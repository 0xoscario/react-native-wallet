/**
 * @format
 */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import gasReducer from 'src/reducers/gas';
import settingsReducer from 'src/reducers/settings';
import uiReducer from 'src/reducers/ui';

const rootReducer = combineReducers({
  gas: gasReducer,
  settings: settingsReducer,
  ui: uiReducer
});

export function configureTestStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(rootReducer, middlewareEnhancer);
  return store;
}
