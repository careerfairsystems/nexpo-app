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
  SyncingInterval, FeatureModelGraph, FeatureModelNode
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
import { RouteProp, useNavigation } from "@react-navigation/native";
import Colors from "constants/Colors";
import { RoutingProvider } from "react-native-ai-navigation-sdk/src/routing-provider";
import { ArkadText } from "components/StyledText";
import RoutableTargetsModal from "./components/RoutableTargetsModal";
import { MapStackParamList } from "./MapNavigator";
import { RoutingMarkerList } from "./components/Markers/RoutingMarkerList";


type PositioningMapScreenProps = {
  route: RouteProp<MapStackParamList, 'PositioningMapScreen'>;
};


export default function PositioningMapScreen({ route }: PositioningMapScreenProps) {
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
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const [featureModelGraph, setFeatureModelGraph] =  useState<FeatureModelGraph>();
  const [routableNodes, setRoutableNodes] = useState<Map<ReactRoutableTarget, FeatureModelNode>>(new Map());
  const [selectedFloor, setSelectedFloor] = useState<number>(0); // State for selected floor



  const navigation = useNavigation();


  const { width, height } = Dimensions.get('window');


  useEffect(() => {
    initializeSDK();
  }, []);


  useEffect(() => {
    if(lat != 0 && lng!=0){
      setLoadingPosition(false);
    }
    console.log(featureModelGraph)
  }, [location, gpsPosition]);




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
  const stopRouting = () => {
    sdk?.getRoutingProvider().removeAllListeners()
    setRoute(null);
    console.log("Routing stopped");
  };

  const putRoutableMarkers = async () => {
    if (sdk) {
      try {
        const featureModelNodes = await sdk.getFeatureModelGraph(137313907);
        setFeatureModelGraph(featureModelNodes);
        console.log(JSON.stringify("featrue" + featureModelNodes))
        const queryTargets = await sdk.getRoutingProvider().queryTarget(" ");
        const targetRouteNodes = new Map<ReactRoutableTarget, FeatureModelNode>();
        queryTargets.forEach((target) => {
          const matchingNode = featureModelNodes!.nodes.find(
            (node) => node.nodeId === target.nodeId
          );
          if (matchingNode) {
            targetRouteNodes.set(target, matchingNode);
          }
        });

        setRoutableNodes(targetRouteNodes);
        console.log("Routable nodes set:", targetRouteNodes);
      } catch (error) {
        console.error("Error in putRoutableMarkers:", error);
      }
    }
  };




  const initializeSDK = useCallback(async () => {
    setLoadingPosition(true); // Start loading
    try {
      if (!sdkInitialized) {
        const { sdk } = route.params;
        sdk.currentLocation.addListener((e) => {
          setLoadingPosition(false);
          console.log(e)
          if(e){
            setLat(e.latitude)
            setLng(e.longitude)
          }
          setLocation(e);
        });
        sdk.gpsLocation.addListener((e) => {
          setGpsPosition(e);
          if(e){
            setLat(e.lat);
            setLng(e.lng);
          }
        });
        await sdk.start();

        const places = await sdk.getAllPlaces();
        setAllPlaces(places!);
        await putRoutableMarkers()
        setSdk(sdk);
        console.log('SDK STARTED');
        setSdkInitialized(true);
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
      { sdk ? (
        (lat === undefined || lng === undefined)  ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.white} />
            <ArkadText text="Loading map ..." style={styles.loadingText} />
          </View>
        ) : (
          <MapView
            style={styles.map}
            customMapStyle={mapStyle}
            scrollEnabled={true}
            zoomEnabled={true}
            showsBuildings={false}
            initialRegion={{
              latitude: lat!,
              longitude: lng!,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0922,
            }}
          >
            <BlueDotMarker coordinate={{ latitude: lat!, longitude: lng! }} />
            {currentRoute && location && <RoutingPath startPosition={currentRoute} currentlocation={location} />}
            <AreaPolygons allPlaces={allPlaces} floorNbr={selectedFloor} />
            <RoutingMarkerList routeNodesMap={routableNodes} onTargetSelect={() => console.log("hej")} company={null}/>

            {/* {currentRoute && location && <RoutingPath startPosition={currentRoute} currentlocation={location} />}*/}
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
          setModalVisible(!isModalVisible)
        }}
      >
        <Text style={styles.searchBarText}>🔍 Search for targets...</Text>
      </TouchableOpacity>

      <View style={styles.floorSelectionContainer}>
        <Button title="Floor 0" onPress={() => setSelectedFloor(0)} />
        <Button title="Floor 1" onPress={() => setSelectedFloor(1)} />
      </View>


      {location?.indoor && (
        <View style={styles.locationOverlay}>
          <Text style={styles.overlayText}>
            {location.indoor?.buildingName} - Floor {location.indoor?.floorIndex}
          </Text>
        </View>
      )}
      {currentRoute && (
        <View style={styles.routingOverlay}>
          <Text style={styles.overlayText}>Routing in progress...to</Text>
          <TouchableOpacity style={styles.stopButton} onPress={stopRouting}>
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      )}


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
  locationOverlay: {
    position: "absolute",
    top: 70,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 8,
    padding: 8,
    zIndex: 3,
  },
  routingOverlay: {
    position: "absolute",
    bottom: 20,
    left: '10%',
    right: '10%',
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    padding: 16,
    zIndex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayText: {
    color: "white",
    fontSize: 16,
  },
  stopButton: {
    marginLeft: 10,
    backgroundColor: "red",
    borderRadius: 5,
    padding: 5,
  },
  stopButtonText: {
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    paddingTop: 15,
    color: Colors.white,
    fontSize: 32,
  },
  floorSelectionContainer: {
    position: 'absolute',
    bottom: 90,
    right: 10,
    flexDirection: 'column',
    zIndex: 3,
  },
});
