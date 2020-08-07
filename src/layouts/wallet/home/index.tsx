/**
 * @format
 */
import React from 'react';
import { View } from 'react-native';
import {
  KeyboardAwareScrollView
} from '@codler/react-native-keyboard-aware-scroll-view';
import {
  useStyleSheet,
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
      bounces={false}
      overScrollMode="never"
    >
      <AccountOverview/>
      <ThemeProvider theme={brandTheme}>
        <TabView
          style={styles.tabView}
          tabBarStyle={styles.tabBar}
          indicatorStyle={styles.indicator}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <Tab title={i18n.t('wallet.tokens')}>
            <View style={styles.grow}>
            </View>
          </Tab>
          <Tab title={i18n.t('wallet.collectibles')}>
            <View style={styles.grow}>
            </View>
          </Tab>
        </TabView>
      </ThemeProvider>
    </KeyboardAwareScrollView>
  );
};

const themedStyles = StyleService.create({
  tabView: {
    minHeight: 400
  },
  tabBar: {
    paddingVertical: spacingY(1),
  },
  indicator: {
    height: 1,
  },
  grow: {
    flex: 1,
  }
});
