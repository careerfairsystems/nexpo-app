import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Coordinate = {
  latitude: number;
  longitude: number;
};

type BlueDotMarkerProps = {
  coordinate: Coordinate;
};

export const BlueDotMarker: React.FC<BlueDotMarkerProps> = ({ coordinate }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 2.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [scaleAnim, opacityAnim]);

  return (
    <Marker coordinate={coordinate}>
      <View style={styles.markerWrap}>
        <Animated.View
          style={[
            styles.pulse,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        />
        <View style={styles.marker} />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  pulse: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
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

