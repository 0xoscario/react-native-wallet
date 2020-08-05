/**
 * @format
 */
import React from 'react';
import {
  KeyboardAwareScrollView
} from '@codler/react-native-keyboard-aware-scroll-view';
import {
  useStyleSheet,
  StyleService
} from '@ui-kitten/components';
import { AccountOverview } from 'src/layouts/wallet/home/extra/account-overview.component';

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      overScrollMode="never"
    >
      <AccountOverview/>
    </KeyboardAwareScrollView>
  );
};


const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1'
  },
  contentContainer: {
  },
});
