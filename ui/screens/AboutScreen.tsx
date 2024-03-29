import { useEffect } from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormattedMessage, useIntl } from 'react-intl';
import tw from '@ui/tailwind';

import { APP_ID } from '@constants';

import FormButton from '@ui/components/Form/Button';
import FormText from '@ui/components/Form/Text';

import { useStore } from '@services/store';

export default function AddCurrencyScreen() {
  const intl = useIntl();
  const navigation = useNavigation();
  const store = useStore();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={tw`p-4 -m-4`}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={tw`font-sansSemiBold text-base`}>
              <FormattedMessage id="app.Close" />
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }, []);

  return (
    <ScrollView style={tw`py-5`}>
      <FormText
        text={`${intl.formatMessage({
          id: 'app.about.Rates updated',
        })} ${intl.formatDate(new Date(store.lastSync))}`}
        description={[
          intl.formatMessage({
            id: 'app.about.Sources info',
          }),
          intl.formatMessage({
            id: 'app.about.Purposes info',
          }),
        ].join('\n\n')}
        isFirst
        isLast
      />

      <FormButton
        title={intl.formatMessage({ id: 'app.about.Feedback' })}
        description={intl.formatMessage({
          id: 'app.about.Feedback description',
        })}
        onPress={() =>
          Linking.openURL(`https://github.com/egorshar/howmuchin/issues`)
        }
        isFirst
        isLast
      />

      <FormButton
        title={intl.formatMessage({ id: 'app.about.Privacy' })}
        onPress={() => Linking.openURL(`https://www.how-much.in/privacy.html`)}
        isFirst
        isLast={false}
      />
      {Platform.OS === 'ios' && (
        <FormButton
          title={intl.formatMessage({ id: 'app.about.Rate in AppStore' })}
          onPress={() =>
            Linking.openURL(
              `https://itunes.apple.com/us/app/appName/id${APP_ID}?mt=8&action=write-review`,
            )
          }
          isFirst={false}
          isLast={false}
        />
      )}
      <FormButton
        title={intl.formatMessage({ id: 'app.about.GitHub repo' })}
        description={intl.formatMessage({
          id: 'app.about.No responsibility message',
        })}
        onPress={() => Linking.openURL(`https://github.com/egorshar/howmuchin`)}
        isFirst={false}
        isLast
      />
    </ScrollView>
  );
}
