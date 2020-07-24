/**
 * @format
 */
import { enableES5 } from 'immer';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { configureStore } from 'src/store';
import { Encryptor } from 'src/utils/encryptor';
import { SecureKeychain } from 'src/utils/secure-keychain';

enableES5();

const { store, persistor } = configureStore();

const App = () => {
  const test = async (): Promise<void> => {
    const data = 'Hello, ZMWallet!';
    const password1 = 'password1';
    const password2 = 'password2';
    const encryptor = new Encryptor();
    const encryptedText1 = await encryptor.encrypt(password1, data);
    const encryptedData1 = await encryptor.decrypt(password1, encryptedText1);
    console.log(encryptedText1);
    console.log(encryptedData1);
  
    const encryptedText2 = await encryptor.encrypt(password2, data);
    const encryptedData2 = await encryptor.decrypt(password2, encryptedText2);
    console.log(encryptedText2);
    console.log(encryptedData2);

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
