/**
 * @format
 */
import produce from 'immer';
import {
  SHOW_ALERT_MODAL,
  HIDE_ALERT_MODAL,
  SHOW_NETWORK_LIST_MODAL,
  AlertInfo
} from 'src/actions/ui';

interface State {
  alertInfo: AlertInfo | null;
  networkListModalVisible: boolean;
}

const initialState: State = {
  alertInfo: null,
  networkListModalVisible: false
};

const uiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_ALERT_MODAL: {
      const alertInfo: AlertInfo = action.payload;

      return produce(state, (draft) => {
        draft.alertInfo = alertInfo;
      });
    }
    case HIDE_ALERT_MODAL: {
      return produce(state, (draft) => {
        draft.alertInfo = null;
      });
    }
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
