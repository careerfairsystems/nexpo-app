/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Companies: {
            screens: {
              CompaniesScreen: "companies",
              CompanyDetailsScreen: "companies/:id",
            },
          },
          Events: {
            screens: {
              EventListScreen: "events",
              EventSwitchScreen: "events/:screen/:id",
              QRScreen: "events/qr/:id",
            },
          },
          SSsStudent: {
            screens: {
              SSsCompaniesScreen: "studentSessions",
              SSsListScreen: "studentSessions/:companyId",
              SSsSwitchScreen: "studentSessions/:screen/:id",
            },
          },
          SSsCRep: {
            screens: {
              SSsListScreen: "company/studentSessions/:companyId",
              SSsSwitchScreen: "company/studentSessions/:screen/:id",
              SSsApplicationDetailsScreen:
                "company/studentSessions/application-details/:applicationId",
            },
          },
          Map: {
            screens: {
              MapScreen: "maps",
              ZoomMapScreen: "maps/:map.name",
            },
          },
          You: { 
            screens: { 
              ProfileScreen: "profile", 
              ProfileSwitchScreen: "profile/:screen/:id", 
            }, 
          },
          Login: {
            screens: {
              LoginScreen: "login",
              SignUpScreen: "signup",
              FinalizeSignUpScreen: "finalize_signup/:token",
              ForgotPasswordScreen: "forgot_password",
              ResetPasswordScreen: "reset_password/:token",
            },
          },
          Admin: {
            screens: {
              AdminScreen: "admin",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
