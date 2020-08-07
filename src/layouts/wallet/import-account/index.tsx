/**
 * @format
 */
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  useStyleSheet,
  StyleService,
  Tab,
  TabView,
  ThemeProvider
} from '@ui-kitten/components';
import { useI18n } from 'src/i18n';
import { useBrandTheme, spacingX, spacingY } from 'src/theme';

export default (): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const i18n = useI18n();
  const brandTheme = useBrandTheme();
  const styles = useStyleSheet(themedStyles);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      bounces={false}
    >
      <ThemeProvider theme={brandTheme}>
        <TabView
          style={styles.grow}
          tabBarStyle={styles.tabBar}
          indicatorStyle={styles.indicator}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <Tab title={i18n.t('import_account.private_key')}>
            <View style={styles.grow}>
            </View>
          </Tab>
          <Tab title={i18n.t('import_account.keystore')}>
            <View style={styles.grow}>
            </View>
          </Tab>
        </TabView>
      </ThemeProvider>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2'
  },
  grow: {
    flex: 1,
  },
  tabBar: {
    paddingVertical: spacingY(1),
  },
  indicator: {
    height: 1,
  },
});
