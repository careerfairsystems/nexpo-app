import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppLoader from "./screens/AppLoader";
import Navigation from "./navigation";
import Toast from "react-native-toast-message";

import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Alert, AppRegistry } from "react-native";

// Good article about FCM:
// https://medium.com/@arashfallahi1989/how-to-integrate-firebase-push-notification-in-react-native-expo-bd5cc694f181

export default function App() {
  // Register background handler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });
  AppRegistry.registerComponent("app", () => App);

  // messaging()
  // .subscribeToTopic('weather')
  // .then(() => console.log('Subscribed to topic!'));

  // messaging()
  // .unsubscribeFromTopic('weather')
  // .then(() => console.log('Unsubscribed fom the topic!'));

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
        } else {
          console.log("Failed to get FCM token");
        }
      }
    }

    requestUserPermission();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!");
      console.log(JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <AppLoader>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style="dark" />
      </SafeAreaProvider>

      <Toast />
    </AppLoader>
  );
}
