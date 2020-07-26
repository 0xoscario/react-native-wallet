/**
 * @format
 */
import produce from 'immer';
import {
  SET_LANGUAGE
} from 'src/actions/setting';

interface State {
  language: string | null;
}

const initialState: State = {
  language: null
};

const settingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LANGUAGE: {
      const language: string = action.payload;

      return produce(state, (draft) => {
        draft.language = language;
      });
    }

    default: {
      return state;
    }
  }
};

export default settingReducer;
