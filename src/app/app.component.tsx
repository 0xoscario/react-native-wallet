/**
 * @format
 */
import React from 'react';
import {
  BackHandler,
  NativeModules
} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector, Provider } from 'react-redux';
import { setLanguage } from 'src/actions/setting';
import { AppLoading, Task } from 'src/app/app-loading.component';
import { TRANSLATIONS, I18nProvider } from 'src/i18n';
import { RootState } from 'src/reducers';
import { configureStore } from 'src/store';

const loadingTasks: Task[] = [
  async (dispatch: any, state: RootState) => {
    if (!state.setting.language) {
      const find = RNLocalize.findBestAvailableLanguage(Object.keys(TRANSLATIONS));
      const language = find?.languageTag || 'en-US';
      dispatch(setLanguage(language));
    }
    return null;
  }
];

const App = (): React.ReactElement => {
  const language = useSelector((state: RootState) => state.setting.language!);
  
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
    <I18nProvider language={language}>
    </I18nProvider>
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
