/**
 * @format
 */
import produce from 'immer';
import {
  SHOW_NETWORK_LIST_MODAL
} from 'src/actions/ui';

interface State {
  networkListModalVisible: boolean;
}

const initialState: State = {
  networkListModalVisible: false
};

const uiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_NETWORK_LIST_MODAL: {
      const visible: boolean = action.payload;

      return produce(state, (draft) => {
        draft.networkListModalVisible = visible;
      });
    }

    default: {
      return state;
    }
  }
};

export default uiReducer;
