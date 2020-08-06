/**
 * @format
 */
import React from 'react';
import {
  Divider,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';
import { ArrowBackIcon } from 'src/components/icons';
import { useI18n } from 'src/i18n';
import ContentView from 'src/layouts/wallet/add-account';

export const AddAccountScreen = (props: any): React.ReactElement => {
  const i18n = useI18n();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowBackIcon}
      onPress={props.navigation.goBack}
    />
  );

  return (
    <>
      <TopNavigation
        accessoryLeft={renderBackAction}
        title={i18n.t('accounts.create_new_account')}
      />
      <Divider/>
      <ContentView navigation={props.navigation}/>
    </>
  );
};
