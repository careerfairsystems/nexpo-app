import React, { useEffect, useState } from "react";
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import { ImageViewer } from "react-native-image-zoom-viewer";
import { Map } from "components/maps/MapProps";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { View } from "components/Themed";
import Colors from "constants/Colors";
import { ArkadText } from "components/StyledText";

type MapScreenParams = {
  route: {
    params: {
      map: Map;
    };
  };
};

export default function ZoomMapScreen({ route }: MapScreenParams) {
  const map: Map | undefined = route.params.map;
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(false);

    const imageUrls =
      map?.props.images.map((image: Image) => image.props.source) || [];

    Promise.all(
      imageUrls.map((imageUrl: string) => {
        return Image.prefetch(imageUrl);
      })
    )
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error("Image loading error:", error);
      });
  }, [map]);

  if (map == undefined) {
    return <ScreenActivityIndicator />;
  }

  const images = map.props.images;

  return (
    <View style={styles.container}>
      {(isLoading || !imagesLoaded) && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.white} />
          <ArkadText style={styles.mapName} text="Loading map ..." />
        </View>
      )}
      {!isLoading && imagesLoaded && (
        <ImageViewer
          imageUrls={images.map((image: Image, index: number) => ({
            url: image.props.source,
          }))}
          backgroundColor={Colors.arkadNavy}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.arkadNavy,
  },
  mapName: {
    paddingTop: 15,
    color: Colors.white,
    fontSize: 32,
  },
  image: {
    flex: 1,
    transform: [{ scale: 0.5 }],
    position: "relative",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    fontSize: 50,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
