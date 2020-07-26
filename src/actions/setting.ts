/**
 * @format
 */
import { ThemeName } from 'src/utils/types';

export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_THEME_NAME = 'SET_THEME_NAME';

export function setLanguage(language: string) {
  return {
    type: SET_LANGUAGE,
    payload: language
  };
}

export function setThemeName(themeName: ThemeName) {
  return {
    type: SET_THEME_NAME,
    payload: themeName
  };
}
