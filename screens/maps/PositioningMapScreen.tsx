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
  SyncingInterval, FeatureModelGraph, ReactFeatureModelNode, ReactCombainFloorMap
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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RoutingMarker } from "./components/Markers/RoutingMarker";
import PlacePolygon from "./components/PlacePolygon";
import { getImageAndBearing } from "./components/utils/getBearingAndImage";
import e from "express";



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
  const mapRef = useRef<MapView>(null);
  const [initialFloorSet, setInitialFloorSet] = useState(false); // Track if initial floor was set


  const navigation = useNavigation();

  const handleMarkerSelect = (marker: ReactFeatureModelNode, target: ReactRoutableTarget | null, company: PublicCompanyDto | null) => {
    setSelectedMarker(marker);
    setSelectedTarget(target);
    setSelectedCompany(company);
    refRBSheet.current?.open();
  };




  const { width, height } = Dimensions.get('window');


  useEffect(() => {
    if (!initialFloorSet && location?.indoor?.floorIndex) {
      setSelectedFloor(location.indoor.floorIndex);
      setInitialFloorSet(true);
    }else if(!initialFloorSet && gpsPosition){
      setSelectedFloor(0)
      setInitialFloorSet(true);
    }
  }, [location]);

  useEffect(() => {
    initializeSDK();
  }, []);



  useEffect(() => {
    if(lat != 0 && lng!=0){
      setLoadingPosition(false);
    }
  }, [location, gpsPosition, selectedFloor]);


  useEffect(() => {
    fetchQueryTargets()
  }, [sdk, sdkInitialized, location]);



  const INITIAL_CAMERA = {
    center: { latitude: lat || 0, longitude: lng || 0 },
    pitch: 0,
    heading: 0,
    altitude: 200,
    zoom: 30,
  };




  const handleRoute = async (target: ReactRoutableTarget | null) => {
    setModalVisible(false);
    refRBSheet.current.close();
    setSelectedFloor(location?.indoor?.floorIndex || 0);


    if (lat !== undefined && lng !== undefined) {
      mapRef.current?.animateCamera({
        center: { latitude: lat, longitude: lng },
        zoom: 30,
        altitude: 200,
        heading: 0,
        pitch: 0,
      });
    }


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
  };
  const handleFloorSelect = (floor: number) => {
    setSelectedFloor(floor);
  };

  const renderSelectedFloor = () => {
    if(selectedFloor===0){
      return allPlaces.map(place => {
        if(place?.floors[0]?.floorMap?.imageURL) {
          const floorMap = place.floors[0].floorMap
          const {image,bearing} = getImageAndBearing(place.name, selectedFloor)
          const key = place!.originalFeatureModelId!+selectedFloor
          return(
            <View key={key }>
              {selectedFloor===0 ? ( <FloorMapOverlay key={key} floorMap={floorMap} bearing={bearing} imageReqSource={image}  />
              ): null}
            </View>
          )
        }
      })
    }else if(selectedFloor===1){
      return allPlaces.map(place => {
        if(place?.floors[1]?.floorMap?.imageURL) {
          const floorMap = place.floors[1].floorMap
          const {image,bearing} = getImageAndBearing(place.name, selectedFloor)
          const key = place!.originalFeatureModelId!+selectedFloor
          return(
            <View key={key }>
            {selectedFloor===1 ? ( <FloorMapOverlay key={key} floorMap={floorMap} bearing={bearing} imageReqSource={image}  />
              ): null}
            </View>
          )
        }
      })
    }else {
      return null;
    }
  }

  const floorZeroNodes = featureModelNodes.filter(node => node.floorIndex === 0);
  const floorOneNodes = featureModelNodes.filter(node => node.floorIndex === 1);

  const renderMarkersForSelectedFloor = () => {
    const nodesToRender = selectedFloor === 0 ? floorZeroNodes : floorOneNodes;
    return nodesToRender.map(marker => {
      const matchingCompany = companyMap[marker.name] || null;
      const matchingTarget = targetMap[marker.name] || null;
      return (
        <RoutingMarker
          key={`${marker.id}`}
          node={marker}
          onTargetSelect={() => handleMarkerSelect(marker, matchingTarget, matchingCompany)}
          company={matchingCompany}
        />
      );
    });
  };
  const fetchQueryTargets = async () => {
    const targets = await sdk?.getRoutingProvider()?.queryTarget(" ");
    const filteredTargets = (targets || []).filter(
      (target) => target?.name && !target.name.includes("Footway") && !target.name.includes("Node")
    );
    console.log(filteredTargets)
    setAllTargets(filteredTargets);
  }


  const initializeSDK = useCallback(async () => {
    setLoadingPosition(true); // Start loading
    try {
      if (!sdkInitialized) {
        const { sdk } = route.params;
        sdk.currentLocation.addListener((e) => {
          setLoadingPosition(false);
          if(e?.latitude!==undefined && e?.longitude!==undefined){
            setLat(e.latitude)
            setLng(e.longitude)
          }
          setLocation(e);
        });
        sdk.gpsLocation.addListener((e) => {
          if(e?.lat!==undefined && e.lng!==undefined){
            setLat(e.lat);
            setLng(e.lng);
          }
        });
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const fromTimestamp = startOfToday.getTime();

        await sdk.start();

        const places = await sdk.getAllPlaces();
        setAllPlaces(places!);
        setSdk(sdk);
        console.log('SDK STARTED');
        setSdkInitialized(true);
        if(sdk){

        }


        const campus = allPlaces.find((place) => place?.name === "LTH Campus");
        await sdk?.getFeatureModelGraph(campus?.featureModelId || 137564108 ).then(x => {
          if(x!=null){
            console.log(x.length)
            setFeatureModelNodes(x.filter(x => x.name !== "Footway" && x.name !== "Node"));
          }
        });
        console.log(campus?.featureModelId)
        await API.companies.getAll().then(companies => {setAllCompanies(companies)})
      }
    } catch (error) {
      console.error('SDK initialization error:', error);
      setSdkInitialized(false);
    } finally {
    }
  }, [sdkInitialized]);

  const companyMap = allCompanies?.reduce((acc, company) => {
    if (company.name) acc[company.name] = company;
    return acc;
  }, {} as Record<string, PublicCompanyDto>) || {};

  const targetMap = allTargets?.reduce((acc, target) => {
    if (target.name) acc[target.name] = target;
    return acc;
  }, {} as Record<string, ReactRoutableTarget>) || {};




  return (
    <View style={styles.container}>
      { sdk ? (
        ((lat === undefined || lng === undefined) && !initialFloorSet  )  ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.white} />
            <ArkadText text="Loading map ..." style={styles.loadingText} />
          </View>
        ) : (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialCamera={INITIAL_CAMERA}
            customMapStyle={mapStyle}
            scrollEnabled={true}
            zoomEnabled={true}
            showsBuildings={false}
            loadingEnabled={true}
            loadingIndicatorColor={Colors.white}
            loadingBackgroundColor = {Colors.arkadNavy}
            userInterfaceStyle ="dark"
          >


            {location?.indoor?.floorIndex===selectedFloor || location?.indoor===undefined ? (<BlueDotMarker coordinate={{ latitude: lat!, longitude: lng! }} />) : null}
            {currentRoute && location && <RoutingPath startPosition={currentRoute} currentlocation={location} selectedFloor={selectedFloor} />}
            <PlacePolygon allPlaces={allPlaces}/>

            {renderMarkersForSelectedFloor()}
            {renderSelectedFloor()}



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


      <TouchableOpacity
        style={styles.myPositionButton}
        onPress={() => {
          if (lat !== undefined && lng !== undefined) {
            mapRef.current?.animateCamera({
              center: { latitude: lat, longitude: lng },
              zoom: 30,
              altitude: 200,
              heading: 0,
              pitch: 0,
            });
            setSelectedFloor(location?.indoor?.floorIndex || 0); // Update to user's floor
          }
        }}
      >
        <MaterialIcons name="my-location" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Only show this if we are not in routing-mode since routing mode will automatically switch floor*/}

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
                  selectedFloor === floor && styles.selectedFloorText]}>
                Floor {floor + 1 }
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      {location?.indoor && (
        <View style={styles.locationOverlay}>
          <Text style={styles.overlayText}>
            {location.indoor?.buildingName} - Floor: {location.indoor?.floorIndex !== null && location.indoor?.floorIndex !== undefined ? location.indoor.floorIndex + 1 : ''}
          </Text>
        </View>
      )}
      {currentRoute && (
        <View style={styles.routingOverlay}>
          <Text style={styles.overlayText}>Routing in progress...to {selectedMarker?.name}</Text>
          <ArkadButton style={styles.stopButton} onPress={stopRouting}>
            <Text style={styles.stopButtonText}>Stop</Text>
          </ArkadButton>
        </View>
      )}


      <RBSheet
        ref={refRBSheet}
        height={500}
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
            <View style={styles.infoContainer}>
              <TagsList company={selectedCompany} showOptions={ShowOptions.Industries} />
            </View>
          )}

          {selectedTarget && (
            <ArkadButton onPress={ () => handleRoute(selectedTarget)}  style={styles.routeButton}>
              <ArkadText text={"Take me here!"} />
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
    top: 80,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 30,
    padding: 12,
    zIndex: 3,
  },
  overlayText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontWeight: 'bold',

  },
  routingOverlay: {
    position: "absolute",
    bottom: 90,
    left: '1%',
    right: '1%',
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    padding: 3,
    zIndex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stopButton: {
    marginLeft: 10,
    backgroundColor: Colors.arkadOrange,
    padding: 5,
  },
  routeButton: {
    marginLeft: 10,
    backgroundColor: Colors.arkadTurkos,
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
    top: 80,
    right: 10,
    zIndex: 3,
    backgroundColor: '#333',
    flexDirection: 'row',
    borderRadius: 30,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
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
    padding: 10,
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 1,
    backgroundColor: 'transparent',
  },
  selectedFloorButton: {
    backgroundColor: '#1e90ff',
  },
  floorButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedFloorText: {
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 20,
  },
  myPositionButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    marginLeft: -25,
    backgroundColor: Colors.arkadOrange, // Button color
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  }
});
