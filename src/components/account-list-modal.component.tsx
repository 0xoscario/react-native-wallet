/**
 * @format
 */
import React from 'react';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';
import { showAccountListModal } from 'src/actions/ui';
import { useI18n } from 'src/i18n';
import { RootState } from 'src/reducers';

interface AccountListModalProps {
  onAccountChange: (address: string) => void;
}

export const AccountListModal = (props: AccountListModalProps): React.ReactElement => {
  const visible = useSelector((state: RootState) => state.ui.accountListModalVisible);
  const dispatch = useDispatch();
  const i18n = useI18n();
  const styles = useStyleSheet(themedStyles);

  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      backdropOpacity={0.5}
      swipeDirection="down"
      coverScreen={false}
      propagateSwipe
      onBackdropPress={() => dispatch(showAccountListModal(false))}
      onBackButtonPress={() => dispatch(showAccountListModal(false))}
      onSwipeComplete={() => dispatch(showAccountListModal(false))}
    >
      <>
      </>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
