import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { ReactCombainLocation, ReactRoutingPosition } from 'react-native-ai-navigation-sdk';

type Coordinate = {
  latitude: number;
  longitude: number;
};

const RoutingPath: React.FC<{ startPosition: ReactRoutingPosition, currentlocation: ReactCombainLocation }> = ({ startPosition, currentlocation }) => {
  const [pathCoordinates, setPathCoordinates] = useState<Coordinate[]>([]);


  useEffect(() => {
    const extractPath = (position: ReactRoutingPosition | null, currentLocation: ReactCombainLocation): Coordinate[] => {
      const coordinates: Coordinate[] = [];
      coordinates.push({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
      let current = position;
      while (current?.nextRoutingPosition) {
        coordinates.push({
          latitude: current.point.lat,
          longitude: current.point.lng,
        });
        current = current.nextRoutingPosition;
      }
      return coordinates;
    };

    setPathCoordinates(extractPath(startPosition, currentlocation));
  }, [startPosition, currentlocation]);

  const firstSegment = pathCoordinates.slice(0, 2);
  const remainingSegments = pathCoordinates.slice(1);

  return (
    <View style={styles.container}>
      {pathCoordinates.length > 1 && (
        <>
          {firstSegment.length === 2 && (
            <Polyline
              coordinates={firstSegment}
              strokeColor="#007AFF"
              strokeWidth={4}
              lineCap="round"
              lineJoin="round"
              lineDashPattern={[20,20]}
            />
          )}

          {remainingSegments.length > 1 && (
            <Polyline
              coordinates={remainingSegments}
              strokeColor="#007AFF"
              strokeWidth={4}
              lineCap="round"
              lineJoin="round"
            />
          )}

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
