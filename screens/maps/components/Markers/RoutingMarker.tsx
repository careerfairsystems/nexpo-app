import { FeatureModelNode, ReactRoutableTarget } from "react-native-ai-navigation-sdk";
import { PublicCompanyDto } from "api/Companies";
import { styles } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/styles";
import { Marker } from "react-native-maps";
import { Animated, View } from "react-native";
import React from "react";
import { RoutingItem } from "../Routing/RoutingItem";

type RoutingMarkerProps = {
  node:FeatureModelNode
  onTargetSelect: () => void;
  company: PublicCompanyDto | null;
  target : ReactRoutableTarget;
}


export const  RoutingMarker: React.FC<RoutingMarkerProps> = ({node,onTargetSelect,company,target}) => {
  const coord = { latitude: node.point.lat, longitude: node.point.lng };

  return(
    <Marker coordinate={coord} title={target.name}>
      <RoutingItem target={target} company={company} onPress={onTargetSelect}/>
    </Marker>


  )
}