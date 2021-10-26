import React from 'react';
import { StyleSheet } from 'react-native';
import { ImageViewer } from 'react-native-image-zoom-viewer';
import { View } from '../components/Themed';
import Colors from '../constants/Colors';

export default function MapScreen() {
  const images = [
    { url: '', props: {source: require("../assets/images/maps/MapFair.png")}},
    { url: '', props: {source: require("../assets/images/maps/MapKarhuset.png")}},
    { url: '', props: {source: require("../assets/images/maps/MapE.png")}},
    { url: '', props: {source: require("../assets/images/maps/MapSC1.png")}},
    { url: '', props: {source: require("../assets/images/maps/MapSC2.png")}}
  ]

  return (
    <View style={styles.container}>
      <ImageViewer imageUrls={images} backgroundColor={Colors.white}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})