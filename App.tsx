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
import { RegisterUserDTO } from "api/Firebase";

import * as Linking from "expo-linking";
import Colors from "constants/Colors";

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
  }, []);

  if (!__DEV__) {
    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    AppRegistry.registerComponent("se.arkadtlth.nexpo", () => App);

    const linking = {
      prefixes: [prefix],
    };

    messaging()
      .subscribeToTopic("weather")
      .then(() => console.log("Subscribed to topic!"));

    messaging()
      .unsubscribeFromTopic("weather")
      .then(() => console.log("Unsubscribed fom the topic!"));

    useEffect(() => {
      async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log("Authorization status:", authStatus);

          // Get the token
          const fcmToken = await messaging().getToken();
          if (fcmToken) {
            console.log("Your Firebase Cloud Messaging token is:", fcmToken);
            const register: RegisterUserDTO = {
              token: fcmToken,
              topic: "all",
            };

            const response = API.firebase.registerFirebase(register);
            console.log("Firebase: ", response);
          } else {
            console.log("Failed to get FCM token");
          }
        }
      }

      requestUserPermission();

      const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
        Alert.alert("A new FCM message arrived!");
        console.log(JSON.stringify(remoteMessage));
      });
      return unsubscribe;
    }, []);
  }

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
