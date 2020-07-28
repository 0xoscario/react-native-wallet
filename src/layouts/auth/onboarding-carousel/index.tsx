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
  const carouselItems = [
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
      <ViewPager
        style={styles.carouselContainer}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        {carouselItems.map((carouselItem, index) => (
          <Layout
            style={styles.carousel}
            key={index}
          >
            <Text
              category="h4"
            >
              {carouselItem.title}
            </Text>
            <Text
              category="s1"
            >
              {carouselItem.subtitle}
            </Text>
            <ImageBackground
              style={styles.image}
              source={carouselItem.imageSrc}
            />
          </Layout>
        ))}
      </ViewPager>
      <Layout style={styles.indicator}>
        {carouselItems.map((carouselItem, index) => (
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
  carouselContainer: {
    flex: 1,
    marginTop: 64,
    marginHorizontal: 24,
  },
  carousel: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  indicator: {
		flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 24,
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
    marginHorizontal: 24,
    marginBottom: 24
  }
});
