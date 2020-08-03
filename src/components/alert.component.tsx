/**
 * @format
 */
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  useStyleSheet,
  Modal,
  StyleService,
} from '@ui-kitten/components';
import { hideAlertModal, AlertInfo } from 'src/actions/ui';

interface AlertModalProps {
  alertInfo: AlertInfo | null;
}

export const AlertModal = (props: AlertModalProps): React.ReactElement => {
  const dispatch = useDispatch();
  const styles = useStyleSheet(themedStyles);
  const { alertInfo } = props;

  const autoDismiss = React.useCallback(() => {
    if (alertInfo === null) {
      return null;
    }
    return setTimeout(() => {
      dispatch(hideAlertModal());
    }, 1500);
  }, [alertInfo]);

  React.useEffect(() => {
    const timer = autoDismiss();
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [autoDismiss]);

  return (
    <Modal
      style={styles.container}
      visible={alertInfo !== null}
    >

    </Modal>
    );
};

const themedStyles = StyleService.create({
  container: {
  },
});
