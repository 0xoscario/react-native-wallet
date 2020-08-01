/**
 * @format
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Modal, ModalProps, Text } from '@ui-kitten/components';
import { useI18n } from 'src/i18n';

interface ImportErrorModalProps extends Omit<ModalProps, 'children'> {
  onGotItButtonPress: () => void;
}

export const ImportErrorModal = (props: ImportErrorModalProps): React.ReactElement => {
  const { onGotItButtonPress, ...modalProps } = props;
  const i18n = useI18n();

  return (
    <Modal
      backdropStyle={styles.backdrop}
      {...modalProps}
    >
      <Layout style={styles.container}>
        <Text
          style={styles.description}
          appearance='hint'
          category='s1'
        >
          {i18n.t('import_from_seed.import_error_modal.error')}
        </Text>
        <Button
          onPress={onGotItButtonPress}
        >
          {i18n.t('import_from_seed.import_error_modal.got_it')}
        </Button>
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 16,
    width: 320,
  },
  description: {
    marginTop: 8,
    marginBottom: 24,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
