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
import { InfoIcon, SuccessIcon } from 'src/components/icons';
import { RootState } from 'src/reducers';
import { spacingX, spacingY } from 'src/theme';
import { View } from 'react-native';

const iconMap = {
  info: InfoIcon,
  success: SuccessIcon
};

export const AlertModal = () => {
  const alertInfo = useSelector((state: RootState) => state.ui.alertInfo);
  const dispatch = useDispatch();
  const styles = useStyleSheet(themedStyles);
  let Icon = null;
  if (alertInfo && alertInfo.status) {
    Icon = iconMap[alertInfo.status];
  }

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
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon style={styles.icon}/>
        </View>
      )}
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
    maxWidth: 320,
    paddingHorizontal: spacingX(2),
    paddingVertical: spacingY(2),
    backgroundColor: '#222B45'
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacingY(2),
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: 'text-hint-color'
  },
});
