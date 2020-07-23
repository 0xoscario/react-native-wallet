/**
 * @format
 */
import { enableES5 } from 'immer';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'src/store';
import { Encryptor } from 'src/utils/encryptor';
import { ethers } from 'ethers';

enableES5();

const store = configureStore();

const App = () => {
  (new Encryptor()).encrypt('', {});
  const wallet = ethers.Wallet.createRandom();
  console.log(wallet);
  console.log(ethers.utils.base64.encode(ethers.utils.randomBytes(32)));
  return (
    <React.StrictMode>
      <Provider store={store}>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
