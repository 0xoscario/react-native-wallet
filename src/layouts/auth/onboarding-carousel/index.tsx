/**
 * @format
 */
import React from 'react';
import { ImageBackground, View } from 'react-native';
import {
  useStyleSheet,
  Button,
  Layout,
  StyleService,
  Text,
  ViewPager
} from '@ui-kitten/components';
import { useI18n } from 'src/i18n';

export default ({ navigation }: any): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const i18n = useI18n();
  const styles = useStyleSheet(themedStyles);
  const carousels = [
    {
      title: i18n.t('onboarding_carousel.title1'),
      subtitle: i18n.t('onboarding_carousel.subtitle1'),
      imageSrc: require('./assets/carousel-1.png')
    },
    {
      title: i18n.t('onboarding_carousel.title2'),
      subtitle: i18n.t('onboarding_carousel.subtitle2'),
      imageSrc: require('./assets/carousel-2.png')
    },
    {
      title: i18n.t('onboarding_carousel.title3'),
      subtitle: i18n.t('onboarding_carousel.subtitle3'),
      imageSrc: require('./assets/carousel-3.png')
    },
  ];

  return (
    <Layout
      style={styles.container}
    >
      <Layout style={styles.headerContainer}>

      </Layout>
      <ViewPager
        style={styles.carousel}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        {carousels.map((carousel, index) => (
          <Layout
            key={index}
            style={styles.container}
          >
            <Text
              category='h4'
            >
              {carousel.title}
            </Text>
            <Text
              category='s1'
            >
              {carousel.subtitle}
            </Text>
            <ImageBackground
              style={styles.image}
              source={carousel.imageSrc}
            />
          </Layout>
        ))}
      </ViewPager>
      <Layout style={styles.indicator}>
        {carousels.map((carousel, index) => (
          <View
            key={index}
            style={[styles.inactiveCircle, selectedIndex === index ? styles.activeCircle : {}]}
          />
        ))}
      </Layout>
      <Button
        style={styles.startButton}
        appearance="outline"
      >
        {i18n.t('onboarding_carousel.get_started')}
      </Button>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  carousel: {
    flexGrow: 1
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  indicator: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
  inactiveCircle: {
		width: 8,
		height: 8,
		borderRadius: 8 / 2,
		backgroundColor: "color-primary-active",
		opacity: 0.5,
		marginHorizontal: 8
	},
	activeCircle: {
		opacity: 1,
  },
  startButton: {
    margin: 24,
  }
});
