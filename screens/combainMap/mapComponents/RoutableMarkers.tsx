import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { FeatureModelGraph, FeatureModelNode, ReactRoutingPosition } from "react-native-ai-navigation-sdk";



const FeatureModelMap: React.FC<{featureModelGraph: FeatureModelGraph }> = ({ featureModelGraph }) => {
  const nodes = featureModelGraph.nodes
  return (
    <View >
        {nodes.map((node) => (
          <Marker
            coordinate={{ latitude: node.point.lat, longitude: node.point.lng }}
            title={node.name}
            description={`Floor: ${node.floorIndex}, Node ID: ${node.nodeId}`}
            image={require("assets/images/routingIcons/routing.png")}
          />
        ))}
    </View>
  );
};



export default FeatureModelMap;
