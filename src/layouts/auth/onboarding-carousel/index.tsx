/**
 * @format
 */
import React from 'react';
import { useDispatch } from 'react-redux';
import { ImageBackground, View } from 'react-native';
import {
  useStyleSheet,
  Button,
  Layout,
  StyleService,
  Text,
  ViewPager
} from '@ui-kitten/components';
import { setFirstRun } from 'src/actions/setting';
import { useI18n } from 'src/i18n';
import { spacingX, spacingY } from 'src/theme';

export default ({ navigation }: any): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const dispatch = useDispatch();
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

  const handleOnboarding = () => {
    dispatch(setFirstRun());
  };

  return (
    <Layout
      style={styles.container}
      level="2"
    >
      <ViewPager
        style={styles.carouselContainer}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        {carouselItems.map((carouselItem, index) => (
          <View
            style={styles.carousel}
            key={index}
          >
            <Text
              style={styles.title}
              category="h4"
            >
              {carouselItem.title}
            </Text>
            <Text
              style={styles.subtitle}
              appearance='hint'
              category="s1"
            >
              {carouselItem.subtitle}
            </Text>
            <ImageBackground
              style={styles.image}
              source={carouselItem.imageSrc}
              resizeMode="contain"
            />
          </View>
        ))}
      </ViewPager>
      <View style={styles.indicator}>
        {carouselItems.map((carouselItem, index) => (
          <View
            key={index}
            style={[styles.inactiveCircle, selectedIndex === index ? styles.activeCircle : {}]}
          />
        ))}
      </View>
      <Button
        style={styles.startButton}
        appearance="outline"
        onPress={handleOnboarding}
      >
        {i18n.t('onboarding_carousel.get_started')}
      </Button>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    flex: 1,
  },
  carousel: {
    flex: 1,
    marginTop: spacingY(8),
    marginHorizontal: spacingX(3),
    alignItems: 'center',
  },
  title: {
    marginBottom: spacingY(2),
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: spacingY(2),
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  indicator: {
		flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: spacingY(3),
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
    marginHorizontal: spacingX(3),
    marginBottom: spacingY(3)
  }
});
