import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Coordinate = {
  latitude: number;
  longitude: number;
};

type BlueDotMarkerProps = {
  coordinate: Coordinate;
};

export const BlueDotMarker: React.FC<BlueDotMarkerProps> = ({ coordinate }) => {
  return (
    <Marker coordinate={coordinate}>
      <View style={styles.markerWrap}>
        <View style={styles.marker} />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    borderWidth: 2,
    borderColor: 'white',
  },
});
