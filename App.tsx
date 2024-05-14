import { StatusBar, Platform, SafeAreaView, BackHandler } from "react-native";
import React, { Component, Fragment } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import VersionCheck from "react-native-version-check";

import AppLoader from "./screens/AppLoader";
import Navigation from "./navigation";
import Toast from "react-native-toast-message";

import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Alert, AppRegistry } from "react-native";
import { API } from "api/API";

import * as Linking from "expo-linking";
import * as Notifications from 'expo-notifications';

import Colors from "constants/Colors";
import { RegisterUserDTO } from "api/Expo";

const prefix = Linking.createURL("/");

//Good article about FCM:
//https://medium.com/@arashfallahi1989/how-to-integrate-firebase-push-notification-in-react-native-expo-bd5cc694f181

export default function App() {
  const checkVersion = async () => {
    try {
      const currentVersion = VersionCheck.getCurrentVersion();
      let latestVersion = "";
      if (Platform.OS === "ios") {
        await VersionCheck.getLatestVersion({
          provider: "appStore",
        }).then((res) => {
          latestVersion = res;
        });
      } else if (Platform.OS === "android") {
        await VersionCheck.getLatestVersion({
          provider: "playStore",
        }).then((res) => {
          latestVersion = res;
        });
      }

      if (currentVersion !== latestVersion) {
        Alert.alert(
          "Update Available",
          "There is a new version of the app available. Do you want to update?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "Update",
              onPress: () => {
                BackHandler.exitApp();
                VersionCheck.needUpdate().then(async (res) => {
                  console.log(res.isNeeded); // true
                  if (res.isNeeded) {
                    Linking.openURL(res.storeUrl); // open store if update is needed.
                  }
                });
              },
            },
          ]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkVersion();

    if (!__DEV__) {
      async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log("Authorization status:", authStatus);


    // Get the token
    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync();

    if (expoPushToken) {
      console.log("Your Expo push token is:", expoPushToken);

      // Register the token with the backend
      try {
        const allRegister: RegisterUserDTO = {
          Token: expoPushToken,
          userId: (await API.users.getMe()).id.toString()
        };
        const allResponse = await API.expo.registerExpo(allRegister);
        console.log(
          "Expo registration response: ",
          allResponse
        );
      } catch (error) {
        console.error("Error during Expo 'All' registration:", error);
      }

    } else {
      console.log("Failed to get Expo push token");
    }
        }
      }
      requestUserPermission();
    }
  }, []);

  return (
    <AppLoader>
      <Fragment>
        <SafeAreaProvider>
          <Navigation />
          <ExpoStatusBar style="light" />
        </SafeAreaProvider>

        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.arkadNavy }} />
        <Toast />
      </Fragment>
    </AppLoader>
  );
}
