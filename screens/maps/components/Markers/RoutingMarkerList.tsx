import React from "react";
import { View } from "react-native";
import { FeatureModelNode, ReactRoutableTarget } from "react-native-ai-navigation-sdk";
import { PublicCompanyDto } from "api/Companies";
import { RoutingMarker } from "./RoutingMarker";

type RoutingMarkerListProps = {
  routeNodesMap: Map<ReactRoutableTarget, FeatureModelNode>;
  onTargetSelect: (target: ReactRoutableTarget) => void;
  company: PublicCompanyDto | null;
};

export const RoutingMarkerList: React.FC<RoutingMarkerListProps> = ({ routeNodesMap, onTargetSelect, company }) => {
  return (
    <View>
      {Array.from(routeNodesMap.entries()).map(([target, node]: [ReactRoutableTarget, FeatureModelNode]) => (
        <RoutingMarker
          node={node}
          target={target}
          onTargetSelect={() => onTargetSelect(target)}
          company={company}
        />
      ))}
    </View>
  );
};
