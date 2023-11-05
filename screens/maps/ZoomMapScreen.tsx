import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { ImageViewer } from "react-native-image-zoom-viewer";
import { Map } from "components/maps/MapProps";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { View } from "components/Themed";
import Colors from "constants/Colors";

type MapScreenParams = {
  route: {
    params: {
      map: Map;
    };
  };
};

export default function ZoomMapScreen({ route }: MapScreenParams) {
  const map: Map | undefined = route.params.map;

  if (map == undefined) {
    return <ScreenActivityIndicator />;
  }

  const images = map.props.images;

  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={images.map((image: Image, index: number) => ({
          url: image.props.source,
        }))}
        backgroundColor={Colors.arkadNavy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.arkadNavy,
  },
  mapName: {
    paddingTop: 50,
    color: Colors.white,
    marginBottom: "-20%",
    fontSize: 32,
  },
  image: {
    flex: 1,
    transform: [{ scale: 0.5 }],
    position: "relative",
    width: "100%",
    height: "100%",
  },
});
