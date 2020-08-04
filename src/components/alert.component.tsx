/**
 * @format
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useStyleSheet,
  Modal,
  Text,
  StyleService,
} from '@ui-kitten/components';
import { hideAlertModal } from 'src/actions/ui';
import { RootState } from 'src/reducers';
import { spacingX, spacingY } from 'src/theme';

export const AlertModal = () => {
  const alertInfo = useSelector((state: RootState) => state.ui.alertInfo);
  const dispatch = useDispatch();
  const styles = useStyleSheet(themedStyles);

  const autoDismiss = React.useCallback(() => {
    if (alertInfo === null) {
      return null;
    }
    return setTimeout(() => {
      dispatch(hideAlertModal());
    }, alertInfo.duration);
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
      onBackdropPress={() => dispatch(hideAlertModal())}
    >
      <Text
        appearance='hint'
        category='s1'
      >
        {alertInfo?.message}
      </Text>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  container: {
    borderRadius: 6,
    paddingHorizontal: spacingX(2),
    paddingVertical: spacingY(2),
    width: '60%',
    backgroundColor: 'background-basic-color-1'
  },
});
