/**
 * @format
 */
import React from 'react';
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { MenuIcon } from 'src/components/icons';
import { useI18n } from 'src/i18n';

export const WalletScreen = (props: any): React.ReactElement => {
  const i18n = useI18n();

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={props.navigation.toggleDrawer}
    />
  );

  return (
    <>
      <TopNavigation
        accessoryLeft={renderDrawerAction}
        title={i18n.t('bottom_tab_bar.wallet')}
      />
      <Divider/>
    </>
  );
};
