/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      LoginScreen: 'login',
      SignUpScreen: 'signup',
      FinalizeSignUpScreen: 'finalize_signup/:token',
      ForgotPasswordScreen: 'forgot_password',
      ResetPasswordScreen: 'reset_password/:token',
      Root: {
        screens: {
          Companies: {
            screens: {
              CompaniesScreen: 'companies',
              CompanyDetailsScreen: 'companies/:id',
            },
          },
          Events: {
            screens: {
              EventListScreen: 'events',
              EventDetailsScreen: 'events/:id',
            },
          },
          SSs: {
            screens: {
              SSsCompaniesScreen: 'studentSessions',
              SSsListScreen: 'studentSessions/:companyName',
              SSsDetailsScreen: 'studentSessions/:companyName/:timeslotId',
            },
          },
          Map: {
            screens: {
              MapScreen: 'maps',
              ZoomMapScreen: 'maps/:map.name',
            }
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
              EditProfileScreen: 'profile/edit',
              TicketsScreen: 'event/tickets/',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
