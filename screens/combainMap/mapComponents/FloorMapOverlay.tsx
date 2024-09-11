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



  return (
    <View>
      <Overlay
        bounds={[
          [floorMap.latSW, floorMap.lonSW],
          [floorMap.latNE, floorMap.lonNE],
        ]}
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