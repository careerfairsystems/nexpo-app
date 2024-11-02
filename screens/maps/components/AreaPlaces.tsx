import React from 'react';
import { Polygon, Callout, LatLng, Marker } from "react-native-maps";
import { Text, View } from "react-native";
import { ReactPlace } from 'react-native-ai-navigation-sdk';
import Colors from "constants/Colors";
import FloorMapOverlay from "./FloorMapOverlay";

type AreaPolygonsProps = {
  allPlaces: Array<ReactPlace | null>;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  floorNbr?: number;
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

  // Im forced to do this beacuse of traxmate
  const getImageAndBearing = (placeName: string | undefined) => {
    if (placeName) {
      switch (placeName) {
        case 'E-huset':
          return { image: require("assets/images/Buildings/E0.png"), bearing: -75 };
        case 'Kårhuset':
          if(floorNbr===1){
            return { image: require("assets/images/Buildings/K2.png"), bearing: -40 };
          }else {
            return { image: require("assets/images/Buildings/K1.png"), bearing: -40 };
          }
        case 'Studiecentrum, LTH':
          if(floorNbr===1){
            return { image: require("assets/images/Buildings/SC2.png"), bearing: -60 };
          }else {
            return { image: require("assets/images/Buildings/SC1.png"), bearing: -60 };
          }
        case "X-Lab":
          return { image: require("assets/images/Buildings/X1.png"), bearing: -165 };
        default:
          return { image: null, bearing: 0 };
      }
    }
    return { image: null, bearing: 0 };
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
        const { image, bearing } = getImageAndBearing(place.name);

        // Get the floor and floorMap directly from allPlaces here
        const floor = place.floors && floorNbr !== null ? place.floors[floorNbr] : null;
        const floorMap = floor ? floor.floorMap : null;

        return (
          <View key={index}>

            {floorMap && image && (
              <FloorMapOverlay
                floorMap={floorMap}
                bearing={bearing}
                imageReqSource={image}
              />
            )}


          </View>
        );
      })}
    </>
  );
};

export default AreaPolygons;
