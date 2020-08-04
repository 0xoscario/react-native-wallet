/**
 * @format
 */

export const SHOW_ALERT_MODAL = 'SHOW_ALERT_MODAL';
export const HIDE_ALERT_MODAL = 'HIDE_ALERT_MODAL';
export const SHOW_NETWORK_LIST_MODAL = 'SHOW_NETWORK_LIST_MODAL';

export interface AlertInfo {
  message: string;
  duration: number;
}

export function showAlertModal(info: AlertInfo) {
  return {
    type: SHOW_ALERT_MODAL,
    payload: info
  };
}

export function hideAlertModal() {
  return {
    type: HIDE_ALERT_MODAL,
  };
}

export function showNetworkListModal(visible: boolean) {
  return {
    type: SHOW_NETWORK_LIST_MODAL,
    payload: visible
  };
}
