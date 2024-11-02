import React from 'react';
import { ImageRequireSource, StyleSheet, View } from "react-native";
import MapView, { Marker, Overlay } from "react-native-maps";
import { ReactCombainFloorMap } from "react-native-ai-navigation-sdk";
import Constants from "expo-constants";

type FloorMapOverlayProps = {
  floorMap: ReactCombainFloorMap;
  bearing : number | 0
  imageReqSource: ImageRequireSource | null;
};

const FloorMapOverlay: React.FC<FloorMapOverlayProps> = ({ floorMap, bearing, imageReqSource}) => {
  const apiKey: string = Constants.manifest?.extra?.apiKey;
  const imageSource = {
    uri: floorMap.imageURL,
    headers: { 'x-auth-apikey': apiKey },
  };

  const topLeft = {
    latitude: floorMap.latTopLeft,
    longitude: floorMap.lonTopLeft,
  };

  const SW = {
    latitude: floorMap.latSW,
    longitude: floorMap.lonSW,
  };

  const NE = {
    latitude: floorMap.latNE,
    longitude: floorMap.lonNE,
  };

  const bf = {
    latitude: floorMap.latNE - (topLeft.latitude - SW.latitude),
    longitude: floorMap.lonNE - (topLeft.longitude - SW.longitude),
  };



  const isNEBottomLeft = NE.latitude < SW.latitude && NE.longitude < SW.longitude;

  const bottomLeft = isNEBottomLeft ? NE : SW;
  const topRight = isNEBottomLeft ? SW : NE;

  return (
    <View style={styles.container}>
      <Overlay
        bounds={[
          [bottomLeft.latitude, bottomLeft.longitude],
          [topRight.latitude, topRight.longitude],
        ]}
        bearing={bearing}
        style={styles.overlay}
        image={imageReqSource? imageReqSource : imageSource}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default FloorMapOverlay;
