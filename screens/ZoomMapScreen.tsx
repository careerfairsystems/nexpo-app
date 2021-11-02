import { StyleSheet } from 'react-native';
import { ImageViewer } from 'react-native-image-zoom-viewer';
import { Map } from '../components/maps/MapProps';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { ArkadText } from '../components/StyledText';
import { View } from '../components/Themed';
import Colors from '../constants/Colors';

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

  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={images}
        maxOverflow={0}
        renderHeader={(currentIndex?: number) => 
          <ArkadText 
            text={map.name} 
            style={styles.mapName} />}
        backgroundColor={Colors.white} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapName: {
    color: Colors.darkBlue,
    fontSize: 24,
  },
})