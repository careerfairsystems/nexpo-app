import React from 'react';
import { Polygon, Callout, LatLng, Marker } from "react-native-maps";
import { Text, View } from "react-native";
import {
  ReactPlace, // Importing only ReactPlace as it's used in the component
} from 'react-native-ai-navigation-sdk';
import Colors from "constants/Colors";
import FloorMapOverlay from "./FloorMapOverlay";

type AreaPolygonsProps = {
  allPlaces: Array<ReactPlace | null>;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  floorNbr?: number | null;
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

const AreaPolygons: React.FC<AreaPolygonsProps> = ({ allPlaces, strokeColor = Colors.arkadOrange, strokeWidth = 2, floorNbr = 0 }) => {


  /**
   * Unlike Flutter React native does not support skewing and rotation for their overlay images so i had to hardcode bearing for ovelay
   *
   * */
  const getBearing = (placeName: string | undefined) => {
    if (placeName) {
      switch (placeName) {
        case 'E-huset':
          return 180;
        case 'Kårhuset':
          return -55;
        case 'Studiecentrum, LTH':
          return 15;
        default:
          return 0;
      }
    }
    return 0;
  };

  return (
    <>
      {allPlaces.map((place, index) => {
        if (!place || !place.placePolygon?.vertices || place.placePolygon.vertices.length === 0) {
          return null;
        }

        const areaPlace = place.placePolygon.vertices;
        const coordinates = areaPlace.map(point => ({
          latitude: point!.lat,
          longitude: point!.lng
        }));

        const centerCoords = center_polygon(coordinates);
        const bearing = getBearing(place.name);
        console.log(place.name);

        const floor = place.floors && floorNbr !== null ? place.floors[floorNbr] : null;
        const floorMap = floor ? floor.floorMap : null;

        return (
          <View key={index}>
            <Polygon
              coordinates={coordinates}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
            />
            {floorMap?.imageURL && <FloorMapOverlay floorMap={floorMap} bearing={bearing} />}
          </View>
        );
      })}
    </>
  );
};

export default AreaPolygons;
