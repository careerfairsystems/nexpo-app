import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import { ReactPointLLA, ReactRoutingPosition } from 'react-native-ai-navigation-sdk';

type Coordinate = {
  latitude: number;
  longitude: number;
};

const RoutingPath: React.FC<{ startPosition: ReactRoutingPosition }> = ({ startPosition }) => {
  const [pathCoordinates, setPathCoordinates] = useState<Coordinate[]>([]);

  useEffect(() => {
    const extractPath = (position: ReactRoutingPosition | null): Coordinate[] => {
      const coordinates: Coordinate[] = [];
      let current = position;
      console.log(JSON.stringify(current?.point))
      while (current?.nextRoutingPosition) {
        coordinates.push({
          latitude: current?.point.lat,
          longitude: current?.point.lng,
        });
        current = current?.nextRoutingPosition;
      }
      return coordinates;
    };

    setPathCoordinates(extractPath(startPosition));
  }, [startPosition]);

  const initialRegion = pathCoordinates.length > 0
    ? {
      latitude: pathCoordinates[0].latitude,
      longitude: pathCoordinates[0].longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
    : {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

  return (
    <View style={styles.container}>

      {pathCoordinates.length > 1 && (
        <>
          {/* Render the polyline */}
          <Polyline
            coordinates={pathCoordinates}
            strokeColor="#007AFF"
            strokeWidth={4}
          />
          <Marker
            coordinate={pathCoordinates[pathCoordinates.length - 1]}
            title="Goal"
            description="You have reached your destination"
            image={require("assets/images/routingIcons/flag.png")}

          />
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default RoutingPath;
