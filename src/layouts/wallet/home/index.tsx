/**
 * @format
 */
import React from 'react';
import {
  KeyboardAwareScrollView
} from '@codler/react-native-keyboard-aware-scroll-view';
import {
  useStyleSheet,
  Layout,
  StyleService,
  Tab,
  TabView,
  ThemeProvider
} from '@ui-kitten/components';
import { useI18n } from 'src/i18n';
import { AccountOverview } from 'src/layouts/wallet/home/extra/account-overview.component';
import { useBrandTheme, spacingY } from 'src/theme';

export default (): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const i18n = useI18n();
  const brandTheme = useBrandTheme();
  const styles = useStyleSheet(themedStyles);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      overScrollMode="never"
    >
      <AccountOverview/>
      <ThemeProvider theme={brandTheme}>
        <TabView
          indicatorStyle={styles.indicator}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <Tab
            style={styles.tab}
            title={i18n.t('wallet.tokens')}
          >
            <Layout style={styles.tabContainer} level="2">
            </Layout>
          </Tab>
          <Tab
            style={styles.tab}
            title={i18n.t('wallet.collectibles')}
          >
            <Layout style={styles.tabContainer} level="2">
            </Layout>
          </Tab>
        </TabView>
      </ThemeProvider>
    </KeyboardAwareScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2'
  },
  contentContainer: {
  },
  indicator: {
    height: 1,
  },
  tab: {
    paddingVertical: spacingY(1),
  },
  tabContainer: {
    minHeight: 400,
  },
});
