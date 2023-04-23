import { Ionicons } from "@expo/vector-icons";
import Colors from "constants/Colors";
import * as Font from "expo-font";
import * as ExpoSplashScreen from "expo-splash-screen";
import * as React from "react";
import { Animated, View, StyleSheet, Text, Image } from 'react-native';

async function loadResourcesAndDataAsync() {
  try {
    // Load fonts
    await Font.loadAsync({
      ...Ionicons.font,
      "secondary-font": require("../assets/fonts/BAHNSCHRIFT.ttf"),
      "main-font-bold": require("../assets/fonts/MyriadProBoldCondensed.ttf"),
      "main-font": require("../assets/fonts/MyriadProCondensed.ttf"),
    });
  } catch (e) {
    // We might want to provide this error information to an error reporting service
    console.warn(e);
    // FIX ger error i expo
  }
}

interface Props {
  children?: React.ReactNode;
}

export default function AppLoader({children}: Props) {
  const animation = React.useMemo(() => new Animated.Value(0), []);
  const [isAppReady, setAppReady] = React.useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = React.useState(false);

  React.useEffect(() => {
    // Once everything is loaded, run animation
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setTimeout(() => setAnimationComplete(true), 1000));
    }
  }, [isAppReady])

  const onImageLoaded = React.useCallback(async () => {
    try {
      // Load data
      await loadResourcesAndDataAsync();
      // Hide static splash screen
      await ExpoSplashScreen.hideAsync();
    } catch (e) {
      // Handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Colors.arkadOrange,
            },
          ]}
        >
          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              opacity: animation
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
              source={require("../assets/images/splash.png")}
              onLoadEnd={onImageLoaded}
              fadeDuration={0}
            />

            <Text
              style={{
                position: "absolute",
                alignSelf: "center",
                fontFamily: "main-font",
                color: Colors.white,
                fontSize: 20
              }}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              Welcome to ARKAD
            </Text>
          </Animated.View>

        </View>
      )}
    </View>
  );
}