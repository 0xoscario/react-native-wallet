/**
 * @format
 */
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import {
  setLanguage
} from 'src/actions/setting';
import { configureTestStore } from 'src/store';
import { I18nProvider, useI18n } from 'src/i18n';

jest.mock('src/utils/axios');

describe('setting reducer', () => {
  let store: ReturnType<typeof configureTestStore>;

  beforeEach(() => {
    store = configureTestStore();
  });

  test('language', () => {
    expect(store.getState().setting.language).toBeNull();
    store.dispatch(setLanguage('en-US'));
    expect(store.getState().setting.language).toBe('en-US');
    store.dispatch(setLanguage('zh-Hant'));
    expect(store.getState().setting.language).toBe('zh-Hant');
  });

  test('i18n', () => {
    const I18nComponent = (): React.ReactElement => {
      const i18n = useI18n();

      return (
        <>
          {i18n.t('wallet')}
        </>
      );
    };

    const I18nApp = ({ language }: any): React.ReactElement => {
      return (
        <Provider store={store}>
          <I18nProvider language={language}>
            <I18nComponent/>
          </I18nProvider>
        </Provider>
      )
    };
    const tree = renderer.create(<I18nApp language="en-US"/>);
    expect(tree.toJSON()).toBe('Wallet');
    tree.update(<I18nApp language="zh-Hant"/>);
    expect(tree.toJSON()).toBe('錢包');
  });
});
