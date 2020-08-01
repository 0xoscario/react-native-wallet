/**
 * @format
 */
import React from 'react';
import {
  Keyboard,
  KeyboardEvent,
  KeyboardEventName,
  Platform,
  ScrollView
} from 'react-native';
import {
  useStyleSheet,
  Layout,
  StyleService,
  Text
} from '@ui-kitten/components';
import { words } from 'src/layouts/auth/import-from-seed/extra/words';
import { spacingX, spacingY } from 'src/theme';

const showEvent: KeyboardEventName = Platform.select({
  android: 'keyboardDidShow',
  default: 'keyboardWillShow',
});

const hideEvent: KeyboardEventName = Platform.select({
  android: 'keyboardDidHide',
  default: 'keyboardWillHide',
});

export interface SeedPhraseSuggestionProps {
  seedWord: string;
  onSelectSuggestion?: (word: string)=> void;
}

export const SeedPhraseSuggestion = (props: SeedPhraseSuggestionProps) => {
  const [keyboardShowing, setKeyboardShowing] = React.useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);
  let wordlist: string[] = [];

  React.useEffect(() => {
    const showEventSubscription = Keyboard.addListener(
      showEvent,
      onKeyboardShow,
    );
    const hideEventSubscription = Keyboard.addListener(
      hideEvent,
      onKeyboardHide,
    );
    return () => {
      showEventSubscription.remove();
      hideEventSubscription.remove();
    };
  });

  const onKeyboardShow = (event: KeyboardEvent): void => {
    setKeyboardShowing(true);
  };

  const onKeyboardHide = (event: KeyboardEvent): void => {
    setKeyboardShowing(false);
  };

  const getSuggestion = (seedWord: string) => {
    if (wordlist.length === 0) {
      wordlist = words.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ");
    }

    let suggestion = [];
    if (seedWord) {
      for (const word of wordlist) {
        if (word.indexOf(seedWord) === 0) {
          suggestion.push(word);
        }
        if (suggestion.length === 5) {
          break;
        }
      }
    }
    return suggestion;
  };

  const suggestionWords = getSuggestion(props.seedWord);
  const visible = keyboardShowing &&
                  (suggestionWords.length > 0) &&
                  (!suggestionWords.includes(props.seedWord));

  return visible ? (
    <Layout
      style={styles.container}
    >
      <ScrollView
        overScrollMode="never"
        horizontal={true}
        keyboardShouldPersistTaps="always"
      >
        {suggestionWords.map((word, index) => (
          <Text
            key={index}
            style={styles.text}
            onPress={() => {props.onSelectSuggestion?.(word)}}
          >
            {word}
          </Text>
        ))}
      </ScrollView>
    </Layout>
  ) : null;
};

const themedStyles = StyleService.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    marginLeft: spacingX(1.5),
    marginVertical: spacingY(1.5),
    paddingHorizontal: spacingX(1),
    paddingVertical: spacingX(0.5),
    borderRadius: 4,
    backgroundColor: 'background-basic-color-3'
  }
});
