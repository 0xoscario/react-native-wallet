/**
 * @format
 */
import { enableES5 } from 'immer';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { configureStore } from 'src/store';
import { SecureKeychain } from 'src/utils/secure-keychain';

enableES5();

const { store, persistor } = configureStore();

const App = () => {
  const test = async (): Promise<void> => {
    await SecureKeychain.setGenericPassword('zmwallet-user', '123');
    const credentials = await SecureKeychain.getGenericPassword();
    console.log(credentials);
  };
  test();

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
