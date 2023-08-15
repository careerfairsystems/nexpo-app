import { Ionicons } from "@expo/vector-icons";
import Colors from "constants/Colors";
import * as Font from "expo-font";
import * as ExpoSplashScreen from "expo-splash-screen";
import * as React from "react";
import { Animated, View, StyleSheet, Text, Image } from "react-native";

ExpoSplashScreen.preventAutoHideAsync().catch(() => {});

interface Props {
  children?: React.ReactNode;
}

export default function AppLoader({ children }: Props) {
  const animation = React.useMemo(() => new Animated.Value(0), []);
  const [isAppReady, setAppReady] = React.useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] =
    React.useState(false);
  const font = "main-font-bold";

  React.useEffect(() => {
    // Once everything is loaded, run animation
    if (isAppReady && Font.isLoaded(font)) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => setTimeout(() => setAnimationComplete(true), 1500));
    }
  }, [isAppReady]);

  React.useEffect(() => {
    // Load data
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

    loadResourcesAndDataAsync();
  }, []);

  const onImageLoaded = async () => {
    try {
      // Hide static splash screen
      await ExpoSplashScreen.hideAsync();
    } catch (e) {
      console.warn(e);
    } finally {
      setAppReady(true);
    }
  };

  const animationStyles = {
    opacity: animation,
  };

  const fontStyles = {
    fontFamily: font,
  };

  // Temporrarly disable splash screen when in DEVELOPMENT mode
  // If not disabled the mobile test application of Expo Go wont work
  if (__DEV__) {
    return <View style={styles.container}>{children}</View>;
  }

  return (
    <View style={styles.container}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Colors.arkadNavy,
            },
          ]}
        >
          <Animated.View style={[styles.animatedContainer, animationStyles]}>
            <Image
              style={styles.logo}
              source={require("../assets/images/splash.png")}
              onLoadEnd={onImageLoaded}
              fadeDuration={0}
            />

            {Font.isLoaded(font) && (
              <Text
                style={[styles.title, fontStyles]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                Welcome to ARKAD
              </Text>
            )}
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    position: "absolute",
    alignSelf: "center",
    color: Colors.white,
    fontSize: 30,
  },
});
