import React from 'react';
import { StyleSheet, View, Image, ImageURISource } from "react-native";
import MapView, { Marker, Overlay } from "react-native-maps";
import { ReactCombainFloorMap, ReactCombainLocation } from "react-native-ai-navigation-sdk";
import Constants from "expo-constants";

type FloorMapOverlayProps = {
  floorMap: ReactCombainFloorMap;
};


const FloorMapOverlay: React.FC<FloorMapOverlayProps> = ({ floorMap }) => {
  const apiKey:string = Constants.manifest?.extra?.apiKey;
  const imageSource: ImageURISource = {
    uri: floorMap.imageURL,
    headers: { 'x-auth-apikey': apiKey },
  };

  console.log(imageSource)

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
    longitude: floorMap.lonNE
  };

  const bottomleft = {
    latitude: floorMap.latNE - (topLeft.latitude - SW.latitude),
    longitude: floorMap.lonNE - (topLeft.longitude - SW.longitude),
  };



  return (
    <View>
      <Marker coordinate={bottomleft} title={"bottomLeft"}/>
      <Marker coordinate={NE} title={"NE"}/>
      <Marker coordinate={topLeft} title={"topleft"}/>
      <Marker coordinate={SW} title={"SW"}/>


      <Overlay
        bounds={[
          [NE.latitude, NE.longitude],
          [SW.latitude, SW.longitude],
        ]}
        bearing={0}
        style={styles.overlay}
        image={imageSource}
      >
      </Overlay>
    </View>

  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlayImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default FloorMapOverlay;