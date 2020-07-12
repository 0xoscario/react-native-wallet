/**
 * @format
 */
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'src/store';

const store = configureStore();

const App = () => {
  return (
    <>
      <Provider store={store}>
      </Provider>
    </>
  );
};

export default App;
