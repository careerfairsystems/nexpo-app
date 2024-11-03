import React, { useCallback, useEffect, useRef, useState } from "react";
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
  SyncingInterval, FeatureModelGraph, ReactFeatureModelNode
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
  Image,
  Modal,
  Dimensions
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./assets/MapStyle";
import Constants from "expo-constants";
import AreaPolygons from "./components/AreaPlaces";
import RoutingPath from "./components/Routing/RoutingPath";
import { BlueDotMarker } from "./components/Markers/BlueDotMarker";
import FloorMapOverlay from "./components/FloorMapOverlay";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Colors from "constants/Colors";
import { RoutingProvider } from "react-native-ai-navigation-sdk/src/routing-provider";
import { ArkadText } from "components/StyledText";
import RoutableTargetsModal from "./components/RoutableTargetsModal";
import { MapStackParamList } from "./MapNavigator";
import { PublicCompanyDto } from "api/Companies";
import { API } from "api/API";
import RBSheet from "react-native-raw-bottom-sheet";
import { ShowOptions, TagsList } from "components/companies/TagsList";
import { ArkadButton } from "components/Buttons";


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
  const [allTargets, setAllTargets] = useState<Array<ReactRoutableTarget >>([]);
  const [currentRoute, setRoute] = useState<ReactRoutingPosition | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const [selectedFloor, setSelectedFloor] = useState<number>(0); // State for selected floor
  const [featureModelNodes, setFeatureModelNodes] = useState<ReactFeatureModelNode[]>([])
  const [allCompanies, setAllCompanies] = useState<PublicCompanyDto[]>([])
  const [selectedMarker, setSelectedMarker] = useState<ReactFeatureModelNode | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<ReactRoutableTarget | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<PublicCompanyDto | null>(null);
  const refRBSheet = useRef<any>(null);


  const navigation = useNavigation();

  const handleMarkerSelect = (marker: ReactFeatureModelNode, target: ReactRoutableTarget | null, company: PublicCompanyDto | null) => {
    setSelectedMarker(marker);
    setSelectedTarget(target);
    setSelectedCompany(company);
    refRBSheet.current?.open();
  };


  const { width, height } = Dimensions.get('window');


  useEffect(() => {
    initializeSDK();
  }, []);


  useEffect(() => {
    if(lat != 0 && lng!=0){
      setLoadingPosition(false);
    }
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
        setSdk(sdk);
        console.log('SDK STARTED');
        setSdkInitialized(true);
        await sdk?.getFeatureModelGraph(137521724).then(x => {
          if(x!=null){
            setFeatureModelNodes(x.filter(x => x.name !== "Footway" && x.name !== "Node"));
          }
        });
        await API.companies.getAll().then(companies => {setAllCompanies(companies)})
        await sdk.getRoutingProvider().queryTarget(" ").then(x=> setAllTargets(x))


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
            minZoomLevel={5}
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
            <AreaPolygons allPlaces={allPlaces} floorNbr={selectedFloor} markers={featureModelNodes} companies={allCompanies} routingTargets={allTargets} onMarkerSelect={handleMarkerSelect} />
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

      <RBSheet
        ref={refRBSheet}
        height={300}
        openDuration={250}
        customStyles={{
          container: styles.sheetContainer,
        }}
      >
        <View key={selectedMarker?.id} style={styles.contentContainer}>
          {selectedCompany?.logoUrl ? (
            <Image source={{ uri: selectedCompany.logoUrl }} style={styles.logo} />
          ) : (
            <Image source={require("assets/images/icon.png")} style={styles.logo} />
          )}

          <Text style={styles.sheetTitle}>
            {selectedMarker?.name || selectedCompany?.name || "Unknown Marker"}
          </Text>

          {selectedCompany ? (<TagsList company={selectedCompany} showOptions={ShowOptions.Industries} />
          ): null}

          <ArkadButton onPress={() => refRBSheet.current?.close()} style={styles.stopButton}><ArkadText text={"Close"}/></ArkadButton>
        </View>
      </RBSheet>

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
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sheetContainer: {
    padding: 20,
    backgroundColor: Colors.arkadTurkos,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginBottom: 12,
  },
  detailsText: {
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 16,
  },
});
