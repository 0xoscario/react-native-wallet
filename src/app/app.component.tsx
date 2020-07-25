/**
 * @format
 */
import React from 'react';
import {
  BackHandler,
  NativeModules
} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { loadWallet } from 'src/actions/wallet';
import { AppLoading, Task } from 'src/app/app-loading.component';
import { configureStore } from 'src/store';
import { SecureKeychain } from 'src/utils/secure-keychain';

const loadingTasks: Task[] = [
  async (dispatch: any) => {
    const credentials = await SecureKeychain.getGenericPassword();
    if (credentials?.password) {
      dispatch(loadWallet(credentials.password));
    }
    return null;
  }
];

interface AppProps {
};

const App = ({}: AppProps): React.ReactElement => {
  React.useEffect(() => {
    // see also: @react-native-community/hooks
    const backAction = (): boolean => {
      NativeModules.SplashScreen.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <>
    </>
  );
};

const { store, persistor } = configureStore();

const Application = (): React.ReactElement => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppLoading tasks={loadingTasks}>
            {props => <App {...props} />}
          </AppLoading>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

export default Application;
