import React from "react";
import { Polygon } from "react-native-maps";
import { View } from "react-native";
import Colors from "constants/Colors";
import { ReactPlace } from "react-native-ai-navigation-sdk";

type PlacePolygonsProps = {
  allPlaces: Array<ReactPlace | null>;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
};

const PlacePolygons: React.FC<PlacePolygonsProps> = ({
                                                       allPlaces,
                                                       strokeColor = Colors.arkadOrange,
                                                       strokeWidth = 2,
                                                       fillColor = "#9a9a9a",  // default fillColor for places except "LTH Campus"
                                                     }) => {
  return (
    <>
      {allPlaces.map((place, index) => {
        //console.log(place?.name)

        //console.log(place?.placePolygon?.vertices.length)
        if (!place || !place.placePolygon?.vertices || place.placePolygon.vertices.length === 0) {
          return null;
        }

        const coordinates = place.placePolygon.vertices.map((point) => ({
          latitude: point!.lat,
          longitude: point!.lng,
        }));

        return (
          <View key={index}>
            <Polygon
              coordinates={coordinates}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
              fillColor={place.name !== "LTH Campus" ? fillColor : "transparent"}
              zIndex={0}
            />
          </View>
        );
      })}
    </>
  );
};

export default PlacePolygons;
