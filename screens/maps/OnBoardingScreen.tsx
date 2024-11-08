import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {
  ReactAIIndoorNavigationSDK,
  ReactIndoorNavigationSDKConfig,
  ReactRoutableNodesOptions,
  ReactRoutingConfig,
  SyncingInterval,
} from 'react-native-ai-navigation-sdk';
import { PermissionStates } from 'react-native-ai-navigation-sdk/src/permission-manager';
import { ArkadButton } from "components/Buttons";
import Colors from "constants/Colors";
import { ArkadText } from "components/StyledText";
import Constants from "expo-constants"; // Import useNavigation

const sync: SyncingInterval = {
  interval: 1,
};

const routingConfig: ReactRoutingConfig = {
  routableNodesOptions: ReactRoutableNodesOptions.All,
};

const indoorNavigationSDKConfig: ReactIndoorNavigationSDKConfig = {
  apiKey: "848bb5dadbcba210e0ad",
  routingConfig: routingConfig,
  syncingInterval: sync,
};

export type MapStackParamList = {
  PositioningMapScreen: undefined;
};


export default function OnboardingScreen() {
  const navigation = useNavigation(); // Get navigation instance
  const [sdk, setSdk] = useState<ReactAIIndoorNavigationSDK | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  async function init() {
    await ReactAIIndoorNavigationSDK.create(indoorNavigationSDKConfig).then(x => setSdk(x));
    console.log("SDK CREATED")
  }

  async function checkPermission() {
    if (sdk) {
      const permissionManager = sdk.getPermissionManager();
      const state = await permissionManager.getPermissionState();
      if (state instanceof PermissionStates.Granted) {
        setHasPermission(true);
        navigation.navigate('PositioningMapScreen', { sdk });
      } else {
        setHasPermission(false);
      }
    }
  }

  async function requestPermissions() {
    if (sdk) {
      const permissionManager = sdk.getPermissionManager();
      const granted = await permissionManager.requestMissingPermission();
      if (granted) {
        setHasPermission(true);
        navigation.navigate('PositioningMapScreen', { sdk });
      } else {
        Alert.alert("Permission Denied", "You need to grant permission to proceed.");
      }
    }
  }

  useEffect(() => {
    init();
    checkPermission();
  }, []);

  useEffect(() => {
    checkPermission();
  }, [sdk]);

  if (sdk == null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.white} />
        <ArkadText text="Loading map ..." style={styles.loadingText} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Map Screen!</Text>
      {
        !hasPermission ? (
          <View>
            <ArkadButton onPress={requestPermissions}>
              <ArkadText text="Request Permission for interactive map " />
            </ArkadButton>
            <ArkadButton onPress={() => navigation.navigate("MapScreen")}>
              <ArkadText text="Go to map of the fair" />
            </ArkadButton>
          </View>
        ) : (
          <View style={styles.box}>
            <ArkadButton onPress={() => navigation.navigate('PositioningMapScreen', { sdk })}>
              <ArkadText text="Go to Interactive map 🌐" />
            </ArkadButton>
            <ArkadButton onPress={() => navigation.navigate("MapScreen")}>
              <ArkadText text="Go to map of the fair 🗺️" />
            </ArkadButton>
          </View>
        )
      }


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    margin: 10,
  },

  box:{
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    paddingTop: 15,
    color: Colors.white,
    fontSize: 32,
  },



});
