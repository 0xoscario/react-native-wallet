/**
 * @format
 */
import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'src/reducers';

export function configureStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares)
  
  const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: ['wallet', 'ui'],
    stateReconciler: autoMergeLevel2
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer as any);
  const store = createStore(persistedReducer, middlewareEnhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}
