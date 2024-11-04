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
  Dimensions, ScrollView
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
import { floor } from "colord/helpers";


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


  useEffect(() => {
    fetchQueryTargets()
  }, [sdk, sdkInitialized, location]);


  const handleRoute = async (target: ReactRoutableTarget | null) => {
    setModalVisible(false);
    refRBSheet.current.close();
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

  const handleFloorSelect = (floor: number) => {
    setSelectedFloor(floor);
  };

  const fetchQueryTargets = async () => {
    const targets = await sdk?.getRoutingProvider()?.queryTarget(" ");
    const filteredTargets = (targets || []).filter(
      (target) => target?.name && !target.name.includes("Footway") && !target.name.includes("Node")
    );
    setAllTargets(filteredTargets);
  }



  const initializeSDK = useCallback(async () => {
    setLoadingPosition(true); // Start loading
    try {
      if (!sdkInitialized) {
        const { sdk } = route.params;
        sdk.currentLocation.addListener((e) => {
          setLoadingPosition(false);
          console.log(e?.indoor?.featureModelId)
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
            {location?.indoor?.floorIndex === selectedFloor ? ( <BlueDotMarker coordinate={{ latitude: lat!, longitude: lng! }} />) : null}
            {currentRoute && location && <RoutingPath startPosition={currentRoute} currentlocation={location} selectedFloor={selectedFloor} />}
            <AreaPolygons allPlaces={allPlaces} floorNbr={selectedFloor} markers={featureModelNodes} companies={allCompanies} routingTargets={allTargets} onMarkerSelect={handleMarkerSelect} />
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
        {[0, 1].map((floor) => (
          <TouchableOpacity
            key={floor}
            onPress={() => handleFloorSelect(floor)}
            style={[
              styles.floorButton,
              selectedFloor === floor && styles.selectedFloorButton,
            ]}
          >
            <Text
              style={[
                styles.floorButtonText,
                selectedFloor === floor && styles.selectedFloorText,
              ]}
            >
              Floor {floor}
            </Text>
          </TouchableOpacity>
        ))}
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
        height={400}  // Increase height if needed
        openDuration={250}
        customStyles={{
          container: styles.sheetContainer,
        }}
      >
        <View style={styles.topBackground}>
          {/* Logo Section */}
          {selectedCompany?.logoUrl ? (
            <Image source={{ uri: selectedCompany.logoUrl }} style={styles.logo} />
          ) : (
            <Image source={require("assets/images/icon.png")} style={styles.logo} />
          )}
        </View>

        <ScrollView style={styles.contentContainer}>
          <Text style={styles.sheetTitle}>
            {selectedMarker?.name || selectedCompany?.name || "Unknown Marker"}
          </Text>

          {selectedCompany && (
            <TagsList company={selectedCompany} showOptions={ShowOptions.Industries} />
          )}

          {selectedTarget && (
            <ArkadButton onPress={ () => handleRoute(selectedTarget)}  style={styles.routeButton}>
              <ArkadText text={`Take me to ${selectedTarget?.name}`} />
            </ArkadButton>

          )}
          <ArkadButton
            onPress={() => refRBSheet.current?.close()}
            style={styles.stopButton}
          >
            <ArkadText text="Close" />
          </ArkadButton>

        </ScrollView>
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
  routeButton: {
    marginLeft: 10,
    backgroundColor: Colors.arkadTurkos,
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
    marginRight: 10,
    position: 'absolute',
    top: 80,
    right: 10,
    flexDirection: 'column',
    zIndex: 3,
  },
  sheetContainer: {
    padding: 0,
    backgroundColor: Colors.arkadNavy,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topBackground: {
    backgroundColor: Colors.arkadTurkos,
    paddingVertical: 10,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 15,
    resizeMode: "contain",
    backgroundColor: Colors.white
  },
  contentContainer: {
    paddingHorizontal: 20,
    backgroundColor: Colors.arkadNavy,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginVertical: 10,
  },
  floorButton: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 8,
  },
  selectedFloorButton: {
    backgroundColor: "#1e90ff",
  },
  floorButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  selectedFloorText: {
    fontWeight: "bold",
  },

});
