/**
 * @format
 */
import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'src/reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export function configureStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares)
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, middlewareEnhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}

export function configureTestStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(rootReducer, middlewareEnhancer);
  return store;
}
