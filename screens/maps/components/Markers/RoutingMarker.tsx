import { FeatureModelNode, ReactFeatureModelNode, ReactRoutableTarget } from "react-native-ai-navigation-sdk";
import { PublicCompanyDto } from "api/Companies";
import { Callout, Marker } from "react-native-maps";
import { Animated, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "constants/Colors";

type RoutingMarkerProps = {
  node: ReactFeatureModelNode;
  onTargetSelect: () => void;
  company: PublicCompanyDto | null;
}

export const RoutingMarker: React.FC<RoutingMarkerProps> = ({ node, onTargetSelect, company }) => {
  const coord = { latitude: node.pointLLA.lat, longitude: node.pointLLA.lng };

  return (
    <Marker coordinate={coord} title={node.name} tracksViewChanges={false} onPress={onTargetSelect}>
      <ImageBackground
        source={
          company?.logoUrl
            ? { uri: company.logoUrl }
            : require("assets/images/icon.png")
        }
        style={styles.logo}
        imageStyle={styles.image} // Adjusts how the image is rendered
      >
        {/* Optionally, you can add other elements inside the ImageBackground */}
      </ImageBackground>
    </Marker>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 12,
  },
});
