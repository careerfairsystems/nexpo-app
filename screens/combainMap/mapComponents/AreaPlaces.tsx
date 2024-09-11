import React from 'react';
import { Polygon, Callout, LatLng, Marker } from "react-native-maps";
import { Text, View } from "react-native";
import {
  ReactPlace, // Importing only ReactPlace as it's used in the component
} from 'react-native-ai-navigation-sdk';
import Colors from "constants/Colors";

type AreaPolygonsProps = {
  allPlaces: Array<ReactPlace>;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};


function center_polygon(coordinates: LatLng[]) {
  let x = coordinates.map(c => c.latitude);
  let y = coordinates.map(c => c.longitude);

  let minX = Math.min(...x);
  let maxX = Math.max(...x);

  let minY = Math.min(...y);
  let maxY = Math.max(...y);

  return {
    latitude: (minX + maxX) / 2,
    longitude: (minY + maxY) / 2
  };
}

/**
 *
 *
 *            <Marker
 *               coordinate={centerCoords}
 *               title={place.name}
 *               icon={require("assets/images/routingIcons/place.png")}
 *             >
 *               <Callout>
 *                 <View>
 *                   <Text>{place.name}</Text>
 *                   <Text>More information can go here.</Text>
 *                 </View>
 *               </Callout>
 *             </Marker>
 *
 * */

const AreaPolygons: React.FC<AreaPolygonsProps> = ({ allPlaces, strokeColor = Colors.arkadOrange, strokeWidth = 2 }) => {

  return (
    <>
      {allPlaces.map((place, index) => {
        const areaPlace = place.placePolygon?.vertices;

        if (!areaPlace || areaPlace.length === 0) {
          return null;
        }

        const coordinates = areaPlace.map(point => ({
          latitude: point!.lat,
          longitude: point!.lng
        }));

        const centerCoords = center_polygon(coordinates);

        return (
          <View key={index}>
            <Polygon
              coordinates={coordinates}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
            />
          </View>
        );
      })}
    </>
  );
};

export default AreaPolygons;
