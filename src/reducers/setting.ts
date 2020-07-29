/**
 * @format
 */
import produce from 'immer';
import {
  SET_FIRST_RUN,
  SET_LANGUAGE,
  SET_THEME_NAME
} from 'src/actions/setting';
import { ThemeName } from 'src/utils/types';

interface State {
  firstRun: boolean;
  language: string | null;
  themeName: Exclude<ThemeName, 'brand'> | null;
}

const initialState: State = {
  firstRun: true,
  language: null,
  themeName: null
};

const settingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FIRST_RUN: {
      return produce(state, (draft) => {
        draft.firstRun = false;
      });
    }
    case SET_LANGUAGE: {
      const language: string = action.payload;

      return produce(state, (draft) => {
        draft.language = language;
      });
    }
    case SET_THEME_NAME: {
      const themeName: ThemeName = action.payload;

      return produce(state, (draft) => {
        if (themeName !== 'brand') {
          draft.themeName = themeName;
        }
      });
    }

    default: {
      return state;
    }
  }
};

export default settingReducer;
