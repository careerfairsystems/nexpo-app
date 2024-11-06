import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface BlueDotMarkerProps {
  coordinate: Coordinate;
}

export const BlueDotMarker: React.FC<BlueDotMarkerProps> = ({ coordinate }) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [opacityAnim]);

  return (
    <Marker coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={styles.markerWrap}>
        <Animated.View
          style={[
            styles.scanningCircle,
            { opacity: opacityAnim },
          ]}
        />
        <View style={styles.marker} />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerWrap: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanningCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
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