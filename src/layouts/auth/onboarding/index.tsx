/**
 * @format
 */
import React from 'react';
import { ImageBackground } from 'react-native';
import {
  useStyleSheet,
  Button,
  StyleService,
  Text
} from '@ui-kitten/components';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY } from 'src/theme';

export default ({ navigation }: any): React.ReactElement => {
  const i18n = useI18n();
  const styles = useStyleSheet(themedStyles);

  const handleImportWallet = () => {
    
  };

  const handleCreateWallet = () => {
    navigation.navigate('ChoosePassword');
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('./assets/background.png')}
      resizeMode="stretch"
    >
      <Text
        category="h4"
      >
        {i18n.t('onboarding.title')}
      </Text>
      <Text
        style={styles.subtitle}
        appearance='hint'
        category="s1"
      >
        {i18n.t('onboarding.import_subtitle')}
      </Text>
      <Button
        style={styles.button}
        appearance="outline"
        onPress={handleImportWallet}
      >
        {i18n.t('onboarding.import_wallet')}
      </Button>
      <Text
        style={styles.subtitle}
        appearance='hint'
        category="s1"
      >
        {i18n.t('onboarding.create_subtitle')}
      </Text>
      <Button
        style={styles.button}
        onPress={handleCreateWallet}
      >
        {i18n.t('onboarding.create_wallet')}
      </Button>
    </ImageBackground>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: spacingY(8),
    paddingHorizontal: spacingX(2),
    alignItems: 'center',
  },
  subtitle: {
    marginTop: spacingY(4),
    textAlign: 'center',
  },
  button: {
    marginHorizontal: spacingX(4),
    marginVertical: spacingY(2),
    alignSelf: 'stretch',
  }
});
