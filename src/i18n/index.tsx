/**
 * @format
 */
import I18n from 'i18n-js';
import React, { PropsWithChildren } from 'react';

interface Translator {
  description: string;
  loader: () => object;
}

interface Translations {
  [key: string]: Translator;
}

export const TRANSLATIONS: Translations = {
  'en-US': {
    description: 'English',
    loader: () => require('./translations/en-US.json')
  },
  'zh-Hans': {
    description: '简体',
    loader: () => require('./translations/zh-Hans.json')
  },
  'zh-Hant': {
    description: '繁体',
    loader: () => require('./translations/zh-Hant.json')
  }
};


interface ContextType {
  language: string;
  i18n: typeof I18n;
}

const I18nContext = React.createContext<ContextType | null>(null);

export function useI18n(): typeof I18n {
  return React.useContext(I18nContext)!.i18n;
}

interface I18nProviderProps extends PropsWithChildren<any> {
  language: string;
}

export function I18nProvider({ language, children }: I18nProviderProps) {
  I18n.translations = { [language]: TRANSLATIONS[language].loader() };
  I18n.locale = language;
  const value: ContextType = {
    language,
    i18n: I18n
  };

  return (
    <I18nContext.Provider
      value={value}
    >
      {children}
    </I18nContext.Provider>
  );
}
