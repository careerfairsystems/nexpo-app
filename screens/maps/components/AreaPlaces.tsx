import React, { useEffect, useState } from "react";
import { Polygon, Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import { ReactFeatureModelNode, ReactPlace, ReactRoutableTarget } from "react-native-ai-navigation-sdk";
import Colors from "constants/Colors";
import FloorMapOverlay from "./FloorMapOverlay";
import { RoutingMarker } from "./Markers/RoutingMarker";
import { PublicCompanyDto } from "api/Companies";


type AreaPolygonsProps = {
  allPlaces: Array<ReactPlace | null>;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  floorNbr?: number;
};

const AreaPolygons: React.FC<AreaPolygonsProps> = ({
                                                     allPlaces,
                                                     strokeColor = Colors.arkadOrange,
                                                     strokeWidth = 2,
                                                     floorNbr = 0,

                                                   }) => {
  const [filteredMarkers, setFilteredMarkers] = useState<ReactFeatureModelNode[]>([]);
  const [floorIndex, setFloorIndex] = useState(floorNbr)
  const getImageAndBearing = (placeName: string | undefined) => {
    switch (placeName) {
      case 'E-huset':
        return { image: require("assets/images/Buildings/E0.png"), bearing: -75 };
      case 'Kårhuset':
        return floorNbr === 1
          ? { image: require("assets/images/Buildings/K2.png"), bearing: -40 }
          : { image: require("assets/images/Buildings/K1.png"), bearing: -40 };
      case 'Studiecentrum, LTH':
        return floorNbr === 1
          ? { image: require("assets/images/Buildings/SC2.png"), bearing: -60 }
          : { image: require("assets/images/Buildings/SC1.png"), bearing: -60 };
      case "X-Lab":
        return { image: require("assets/images/Buildings/X1.png"), bearing: -165 };
      default:
        return { image: null, bearing: 0 };
    }
  };



  return (
    <>

      {allPlaces.map((place, index) => {
        if (!place || !place.placePolygon?.vertices || place.placePolygon.vertices.length === 0) {
          return null;
        }

        const coordinates = place.placePolygon.vertices.map(point => ({
          latitude: point!.lat,
          longitude: point!.lng
        }));

        const { image, bearing } = getImageAndBearing(place.name);

        const floor = place.floors?.find(f => f!.floorIndex === floorNbr);
        const floorMap = floor ? floor.floorMap : null;

        return (
          <View key={index}>
            <Polygon
              coordinates={coordinates}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
              fillColor={place.name !== "LTH Campus" ? "#9a9a9a" : "transparent"}
              zIndex={0}
            />

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

const styles = StyleSheet.create({
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default AreaPolygons;