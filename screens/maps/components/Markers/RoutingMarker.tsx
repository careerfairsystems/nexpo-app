  import { FeatureModelNode, ReactFeatureModelNode, ReactRoutableTarget } from "react-native-ai-navigation-sdk";
  import { PublicCompanyDto } from "api/Companies";
  import { Marker } from "react-native-maps";
  import { Image, StyleSheet, View } from "react-native";
  import React, { useState } from "react";
  import Colors from "constants/Colors";
  import FastImage from 'react-native-fast-image';


  type RoutingMarkerProps = {
    node: ReactFeatureModelNode;
    onTargetSelect: () => void;
    company: PublicCompanyDto | null;
  }

  export const RoutingMarker: React.FC<RoutingMarkerProps> = ({ node, onTargetSelect, company }) => {
    const coord = { latitude: node.pointLLA.lat, longitude: node.pointLLA.lng };
    const [imageLoaded, setImageLoaded] = useState(false);


    return (
      <Marker
        coordinate={coord}
        title={node.name}
        tracksViewChanges={!imageLoaded}
        onPress={onTargetSelect}
        zIndex={2}
        id={node.id.toString()}
      >
          <FastImage
            source={
              company?.logoUrl
                ? { uri: company.logoUrl }
                : require("assets/images/icon.png")
            }
            style={styles.image}
            resizeMode={'contain'}
            onLoadEnd={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
      </Marker>
    );
  }

  const styles = StyleSheet.create({
    logoContainer: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white,
      borderRadius: 20,
      overflow: 'hidden',
    },
    image: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white,
      borderRadius: 23,
    },
  });
