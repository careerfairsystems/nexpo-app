import React from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import { ImageViewer } from 'react-native-image-zoom-viewer';
import { Map } from '../components/maps/MapProps';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { ArkadText } from '../components/StyledText';
import { View } from '../components/Themed';
import Colors from '../constants/Colors';
import Pdf from 'react-native-pdf';
import PDFExample from '../components/maps/ZoomableImage';

type MapScreenParams = {
  route: {
    params: {
      map: Map
    };
  };
}

export default function ZoomMapScreen({ route }: MapScreenParams) {
  const map: Map | undefined = route.params.map
  if(map == undefined) {
    return (
      <ScreenActivityIndicator />
    )
  }
  const images = [{
    url: '',
    props: map.props
  }]
  const source = {uri: 'https://ibb.co/mDtRWxf'};

  return (
    <View style={styles.container}>
      <PDFExample/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  }
})