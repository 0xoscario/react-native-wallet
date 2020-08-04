/**
 * @format
 */
import React from 'react';
import {
  Layout
} from '@ui-kitten/components';
import { AccountOverview } from 'src/layouts/wallet/home/extra/account-overview.component';

export default (): React.ReactElement => {
  return (
    <Layout level="1">
      <AccountOverview/>
    </Layout>
  );
};
