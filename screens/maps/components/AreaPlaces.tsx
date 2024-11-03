import React, { useRef, useState,  } from "react";
import { Polygon, Callout, LatLng, Marker } from "react-native-maps";
import { Text, View, StyleSheet, Button } from "react-native";
import { ReactFeatureModelNode, ReactPlace, ReactRoutableTarget } from "react-native-ai-navigation-sdk";
import Colors from "constants/Colors";
import FloorMapOverlay from "./FloorMapOverlay";
import { RoutingMarker } from "./Markers/RoutingMarker";
import { PublicCompanyDto } from "api/Companies";
import RBSheet from "react-native-raw-bottom-sheet";

type AreaPolygonsProps = {
  allPlaces: Array<ReactPlace | null>;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  floorNbr?: number;
  markers?: ReactFeatureModelNode[];
  companies?: PublicCompanyDto[];
  routingTargets?: ReactRoutableTarget[];
  onMarkerSelect: (marker: ReactFeatureModelNode, target: ReactRoutableTarget | null, company: PublicCompanyDto | null) => void;


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

const AreaPolygons: React.FC<AreaPolygonsProps> = ({ allPlaces, strokeColor = Colors.arkadOrange, strokeWidth = 2, floorNbr = 0, markers, companies, routingTargets,onMarkerSelect }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<ReactRoutableTarget | null>(null);
  const [featureModelNode, setFeatureModelNode] = useState<ReactFeatureModelNode | null>(null);
  const refRBSheet = React.useRef<any>();




  const getImageAndBearing = (placeName: string | undefined) => {
    if (placeName) {
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
    }
    return { image: null, bearing: 0 };
  };

  const companyMap = companies?.reduce((acc, company) => {
    if (company.name) acc[company.name] = company;
    return acc;
  }, {} as Record<string, PublicCompanyDto>) || {};

  const targetMap = routingTargets?.reduce((acc, target) => {
    if (target.nodeId) acc[target.nodeId] = target;
    return acc;
  }, {} as Record<string, ReactRoutableTarget>) || {};


  const filteredMarkers = markers?.filter(marker => marker.floorIndex === floorNbr) || [];

  const handleMarkerPress = (marker: ReactFeatureModelNode) => {
    const target = targetMap[marker.id];
    const company = companyMap[marker.name]
    onMarkerSelect(marker, target || null, company || null);
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



        const { image, bearing } = getImageAndBearing(place.name);

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

            {filteredMarkers.map(marker => {
              const matchingCompany = companyMap[marker.name] || null;

              return (
                <RoutingMarker
                  key={marker.id}
                  node={marker}
                  onTargetSelect={() => handleMarkerPress(marker)}
                  company={matchingCompany}
                />
              );
            })}
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
