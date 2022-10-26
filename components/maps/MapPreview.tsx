import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ArkadText } from '../StyledText';
import { mapNavigation } from '../../screens/maps/MapScreen';
import { ArkadButton } from '../Buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export function MapPreview ({ navigation, map}: mapNavigation) {
  const myMap = { map }

  function openMap() {
    navigation.navigate('ZoomMapScreen', myMap);
  }

  return (
    <ArkadButton onPress={openMap} style={styles.previewContainer}>
      <ArkadText text={map.name} style={styles.previewText} />
      {/*<Image source={map.props.source} style={styles.img} />*/}
      <Ionicons name="map" size={32} color={Colors.lightBlue} />
    </ArkadButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  previewText: {
    paddingBottom: 10,
  },
  img: {
    width: 120,
    height: 100,
    resizeMode: 'center'
  }
})