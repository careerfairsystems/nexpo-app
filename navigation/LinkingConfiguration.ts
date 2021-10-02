/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';
import EventDetailsScreen from '../screens/EventDetailsScreen';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: 'login',
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          Companies: {
            screens: {
              CompaniesScreen: 'companies',
              CompanyDetailsScreen: 'companies/:id',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          Events: {
            screens: {
              EventListScreen: 'events',
              EventDetailsScreen: 'events/:id',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
