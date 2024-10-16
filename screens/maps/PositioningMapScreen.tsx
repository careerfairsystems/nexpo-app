import React, { useCallback, useEffect, useState } from "react";
import {
  ReactBlueToothPipeResult,
  ReactPlace,
  ReactCombainLocation,
  ReactGPSLocation,
  ReactIndoorNavigationSDKConfig,
  ReactRoutableNodesOptions,
  ReactRoutingConfig,
  ReactWifiPipeResult,
  ReactRoutableTarget,
  ReactRoutingPosition,
  ReactAIIndoorNavigationSDK,
  SyncingInterval
} from "react-native-ai-navigation-sdk";
import {
  Button,
  DeviceEventEmitter,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./assets/MapStyle";
import Constants from "expo-constants";
import AreaPolygons from "./components/AreaPlaces";
import RoutingPath from "./components/RoutingPath";
import { BlueDotMarker } from "./components/BlueDotMarker";
import FloorMapOverlay from "./components/FloorMapOverlay";
import { useNavigation } from '@react-navigation/native';
import Colors from "constants/Colors";
import { RoutingProvider } from "react-native-ai-navigation-sdk/src/routing-provider";
import { ArkadText } from "components/StyledText";
import RoutableTargetsModal from "./components/RoutableTargetsModal";

export default function PositioningMapScreen() {
  const [location, setLocation] = useState<ReactCombainLocation>();
  const [syncValue, setSync] = useState<number>(0);
  const [sdkInitialized, setSdkInitialized] = useState(false);
  const [sdk, setSdk] = useState<ReactAIIndoorNavigationSDK | null>(null);
  const [gpsPosition, setGpsPosition] = useState<ReactGPSLocation>();
  const [loadingPosition, setLoadingPosition] = useState(true);
  const [allPlaces, setAllPlaces] = useState<Array<ReactPlace | null>>([]);
  const [allTargets, setAllTargets] = useState<Array<ReactRoutableTarget | null>>([]);
  const [currentRoute, setRoute] = useState<ReactRoutingPosition | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);


  const navigation = useNavigation();
  const apiKey: string = Constants.manifest?.extra?.apiKey;

  const { width, height } = Dimensions.get('window');

  const handleRoute = async (target: ReactRoutableTarget | null) => {
    setModalVisible(false);
    console.log("Adding listener to currentRoute");
    try {
      if (target) {
        const provider = await sdk?.getRoutingProvider().routeToNode(target);
        if (provider) {
          provider.addOnRouteChangedListener((e) => {
            console.log('SUCCESS:', target);
            setRoute(e)
          });
        }
      }
    } catch (error) {
      console.error('Error routing to target:', error);
    }
  };

  useEffect(() => {
    initializeSDK();
  }, []);
  const lat = location ? location.latitude : (gpsPosition ? gpsPosition.lat : 0);
  const lng = location ? location.longitude : (gpsPosition ? gpsPosition.lng : 0);

  useEffect(() => {
    if(lat != 0 && lng!=0){
      setLoadingPosition(false);
    }
  }, [location, gpsPosition]);

  useEffect(() => {
    if (location && location.indoor ) {
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.headerInfoContainer}>
            <ArkadText text={location.indoor!.buildingName} style={styles.headerInfoText}>

            </ArkadText>
            <Text style={styles.headerInfoText}>
              Floor: {location.indoor?.floorIndex}
            </Text>
          </View>
        ),
      });
      setLoadingPosition(false);
    }
  }, [location, navigation]);



  const sync: SyncingInterval = {
    interval: 1,
  };

  const getQueryTargets = async (name: string) => {
    try {
      const targets = await sdk?.getRoutingProvider()?.queryTarget(name);
      console.log(targets);
      setAllTargets(targets!);
    } catch (error) {
      console.error('Error fetching targets:', error);
    }
  };

  const routingConfig: ReactRoutingConfig = {
    routableNodesOptions: ReactRoutableNodesOptions.All,
  };

  const indoorNavigationSDKConfig: ReactIndoorNavigationSDKConfig = {
    apiKey: Constants.manifest?.extra?.apiKey,
    routingConfig: routingConfig,
    syncingInterval: sync,
  };

  const fetchAllBuildings = async () => {
    try {
      const places = await sdk?.getAllPlaces();
      setAllPlaces(places!);
    } catch (error) {
      console.error('Error fetching buildings:', error);
    }
  };


  const initializeSDK = useCallback(async () => {
    setLoadingPosition(true); // Start loading
    try {
      if (!sdkInitialized) {
        const sdk = await ReactAIIndoorNavigationSDK.create(indoorNavigationSDKConfig);

        sdk.currentLocation.addListener((e) => {
          setLoadingPosition(false);
          setLocation(e);
        });
        sdk.gpsLocation.addListener((e) => {
          setGpsPosition(e);
        });
        await sdk.start();
        setSdk(sdk);
        console.log('SDK STARTED');
        setSdkInitialized(true);
        fetchAllBuildings
      }
    } catch (error) {
      console.error('SDK initialization error:', error);
      setSdkInitialized(false);
    } finally {
    }
  }, [sdkInitialized]);


  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  return (
    <View style={styles.container}>
      {sdk ? (
        loadingPosition ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <MapView
            style={styles.map}
            customMapStyle={mapStyle}
            scrollEnabled={true}
            zoomEnabled={true}
            showsBuildings={false}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0922,
            }}
          >
            <BlueDotMarker coordinate={{ latitude: lat, longitude: lng }} />
            {currentRoute && location && <RoutingPath startPosition={currentRoute} currentlocation={location} />}
            {/* {currentRoute && location && <RoutingPath startPosition={currentRoute} currentlocation={location} />}
 */}
          </MapView>
        )
      ) : (
        <View>
          <Text style={styles.text}>Initializing SDK...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => {
          getQueryTargets(" ").then(() => setModalVisible(!isModalVisible));
        }}
      >
        <Text style={styles.searchBarText}>🔍 Search for targets...</Text>
      </TouchableOpacity>
    <RoutableTargetsModal sdk={sdk} isVisible={isModalVisible} onClose={() => setModalVisible(false)} onTargetSelect={handleRoute}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: 'white',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: "100%",
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    zIndex: 2,
  },
  menuButtonText: {
    fontSize: 30,
  },
  headerInfoContainer: {
    alignItems: "flex-end",
  },
  headerInfoText: {
    fontSize: 15,
    color: "#FFF",
  },
  searchBar: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  searchBarText: {
    color: '#888',
    fontSize: 16,
  },
});
