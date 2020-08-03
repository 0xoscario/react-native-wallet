/**
 * @format
 */

export const SHOW_NETWORK_LIST_MODAL = 'SHOW_NETWORK_LIST_MODAL';

export function showNetworkListModal(visible: boolean) {
  return {
    type: SHOW_NETWORK_LIST_MODAL,
    payload: visible
  };
}
