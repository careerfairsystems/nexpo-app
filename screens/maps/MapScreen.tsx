import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, ImageBackground, Text } from "react-native";
import { EMap, KarhusetMap, Map, SC1Map } from "components/maps/MapProps";
import { View } from "components/Themed";
import { MapStackParamList } from "./MapNavigator";
import { ArkadButton } from "components/Buttons";
import Colors from "constants/Colors";

export type mapNavigation = {
  navigation: StackNavigationProp<MapStackParamList, "MapScreen">;
  map: Map;
};

export default function MapScreen({ navigation }: mapNavigation) {
  const imageSource = require("../../assets/images/maps/overview.png");

  function openMap(map: Map) {
    navigation.navigate("ZoomMapScreen", { map });
  }
  return (
    <View style={styles.container}>
      <ImageBackground resizeMode="contain" source={imageSource} style={styles.image}>
        <ArkadButton style={styles.karbutton} onPress={() => openMap(KarhusetMap)} />
        <ArkadButton style={styles.studiebutton} onPress={() => openMap(SC1Map)} />
        <ArkadButton style={styles.ebutton} onPress={() => openMap(EMap)} />
        <ArkadButton style={styles.etext} onPress={() => openMap(EMap)} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  scroller: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    zIndex: 1,
    opacity: 1,
    position: "relative",
  },

  karbutton: {
    position: "absolute",
    width: "50%",
    aspectRatio: 1.4,
    textAlign: "center",
    opacity: 0,
    borderRadius: 100,
    left: "32%",
    bottom: "52%",
    margin: 0,
    zIndex: 1001,
  },

  studiebutton: {
    position: "absolute",
    width: "60%",
    aspectRatio: 2.2,
    opacity: 0,
    borderRadius: 100,
    textAlign: "center",
    margin: "0%",
    left: "0%",
    bottom: "35%",
    zIndex: 1000,
  },

  ebutton: {
    position: "absolute",
    width: "28%",
    aspectRatio: 0.5,
    opacity: 0,
    textAlign: "center",
    margin: 0,
    left: "59%",
    bottom: "14%",
    borderRadius: 100,
  },

  etext: {
    position: "absolute",
    width: "55%",
    aspectRatio: 2.3,
    opacity: 0,
    textAlign: "center",
    margin: 0,
    left: "18%",
    bottom: "15%",
    borderRadius: 100,
  },
});
