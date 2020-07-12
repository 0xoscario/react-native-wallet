/**
 * @format
 */
import { enableES5 } from 'immer';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'src/store';

enableES5();

const store = configureStore();

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
