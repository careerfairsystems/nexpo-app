import React from 'react'
import { StyleSheet } from 'react-native';
import { ImageViewer } from 'react-native-image-zoom-viewer';
import { Map } from '../../components/maps/MapProps';
import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import { ArkadText } from '../../components/StyledText';
import { View } from '../../components/Themed';
import Colors from '../../constants/Colors';

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

  const images = map.props.images
  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={images}
        backgroundColor={Colors.white}
        renderHeader={(currentIndex?: number) => 
          <ArkadText 
            text={'Page ' + (currentIndex! + 1) + '/2'}
            style={styles.mapName} />} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapName: {
    paddingTop: 50,
    color: Colors.darkBlue,
    marginBottom: '-20%',
    fontSize: 32,
  },
})