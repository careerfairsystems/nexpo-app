import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { ReactCombainLocation, ReactRoutingPosition, ReactNodeType } from 'react-native-ai-navigation-sdk';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from "constants/Colors";


type Coordinate = {
  latitude: number;
  longitude: number;
};

const RoutingPath: React.FC<{ startPosition: ReactRoutingPosition, currentlocation: ReactCombainLocation, selectedFloor: number}> = ({ startPosition, currentlocation, selectedFloor }) => {
  const [pathCoordinates, setPathCoordinates] = useState<Coordinate[]>([]);
  const [markers, setMarkers] = useState<{ coordinate: Coordinate; title: string; description: string,type: ReactNodeType}[]>([]);



  useEffect(() => {
    if (!startPosition) return;

    const extractPath = (position: ReactRoutingPosition | null, currentLocation: ReactCombainLocation): { coordinates: Coordinate[], markers: { coordinate: Coordinate; title: string; description: string,type: ReactNodeType }[] } => {
      const coordinates: Coordinate[] = [];
      const newMarkers: { coordinate: Coordinate; title: string; description: string,type: ReactNodeType  }[] = [];

      if(currentLocation.indoor?.floorIndex=== selectedFloor){
        coordinates.push({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        });
      }


      let current = position;
      let isIndoors = currentLocation.indoor != null;

      while (current) {

        if (current.floorIndex !== selectedFloor) {
          current = current.nextRoutingPosition;
          break;
        }

        const coordinate = {
          latitude: current.point.lat,
          longitude: current.point.lng,
        };

        coordinates.push(coordinate);

        if (current.type === ReactNodeType.Door) {
          newMarkers.push({
            coordinate,
            title: 'Door',
            description: 'Proceed through the door',
            type: ReactNodeType.Door,

          });
        } else if (current.type === ReactNodeType.Stairs) {
          newMarkers.push({
            coordinate,
            title: 'Stairs',
            description: 'Proceed to the stairs',
            type: ReactNodeType.Stairs,
          });
        }

        current = current.nextRoutingPosition;
      }

      return { coordinates, markers: newMarkers };
    };

    const { coordinates, markers: newMarkers } = extractPath(startPosition, currentlocation);
    setPathCoordinates(coordinates);
    setMarkers(newMarkers);
  }, [startPosition, currentlocation]);

  const getMarkerIcon = (type: ReactNodeType) => {
    switch (type) {
      case ReactNodeType.Door:
            return <FontAwesome5 name="door-closed" size={30} color="#007AFF" />;
      case ReactNodeType.Stairs:
        return <MaterialIcons name="stairs" size={30} color="#007AFF" />;
      default:
        return <AntDesign name="flag" size={30} color="#007AFF" />;
    }
  };



  const firstSegment = pathCoordinates.slice(0, 2);
  const remainingSegments = pathCoordinates.slice(1);

  return (
    <View style={styles.container}>
      {pathCoordinates.length > 1  && (
        <>
          {firstSegment.length === 2 && currentlocation.indoor?.floorIndex === selectedFloor && (
            <Polyline
              coordinates={firstSegment}
              strokeColor="#007AFF"
              strokeWidth={4}
              lineCap="round"
              lineJoin="round"
              lineDashPattern={[20, 20]}
              zIndex={3}
            />
          )}

          {remainingSegments.length > 1 && (
            <Polyline
              coordinates={remainingSegments}
              strokeColor="#007AFF"
              strokeWidth={4}
              lineCap="round"
              lineJoin="round"
              zIndex={3}
            />
          )}
        </>
      )}

      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        >
          {getMarkerIcon(marker.type)}
        </Marker>
      ))}
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