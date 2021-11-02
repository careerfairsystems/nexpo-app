import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ArkadText } from '../StyledText';
import { mapNavigation } from '../../screens/MapScreen';
import { ArkadButton } from '../Buttons';

export function MapPreview ({ navigation, map}: mapNavigation) {
  const myMap = { map }

  function openMap() {
    navigation.navigate('ZoomMapScreen', myMap);
  }

  return (
    <ArkadButton onPress={openMap} style={styles.previewContainer}>
      <ArkadText text={map.name} style={styles.previewText} />
      <Image source={map.props.source} style={styles.img} />
    </ArkadButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
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