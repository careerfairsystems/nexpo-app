import React, { useEffect, useState } from "react";
import {
  getAllPlaces,
  initSDK,
  ReactBlueToothPipeResult,
  ReactPlace,
  ReactCombainLocation,
  ReactGPSLocation,
  ReactIndoorNavigationSDKConfig,
  ReactRoutableNodesOptions,
  ReactRoutingConfig,
  ReactWifiPipeResult,
  start,
  stop,
  SyncingInterval,
  getPlace,
  getAllRoutableTargets,
  syncData,
  ReactRoutableTarget,
  queryTarget,
  routeToNode,
  ReactRoutingPosition,
  snapToGraph, getFeatureModelGraph, FeatureModelGraph

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
  Modal
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { mapStyle } from "./mapAssets/MapStyle";
import Constants from "expo-constants";
import AreaPlaces from "./mapComponents/AreaPlaces";
import AreaPolygons from "./mapComponents/AreaPlaces";
import RoutingPath from "./mapComponents/RoutingPath";
import { BlueDotMarker } from "./mapComponents/BlueDotMarker";
import FloorMapOverlay from "./mapComponents/FloorMapOverlay";
import { useNavigation } from '@react-navigation/native';
import Colors from "constants/Colors";
import FeatureModelMap from "./mapComponents/RoutableMarkers";

export default function CombainMapScreen() {
  const [location, setLocation] = useState<ReactCombainLocation>();
  const [syncValue, setSync] = useState<number>(0);
  const [sdkInitialized, setSdkInitialized] = useState(false);
  const [bleValues, setBleValues] = useState<ReactBlueToothPipeResult>();
  const [wifiValues, setWifiValues] = useState<ReactWifiPipeResult>();
  const [modeltype, setModelType] = useState<string>();
  const [usingGps, setUsingGps] = useState<boolean>();
  const [gpsPosition, setGpsPosition] = useState<ReactGPSLocation>();
  const [loadingPosition, setLoadingPosition] = useState(true);
  const [allPlaces, setAllPlaces] = useState<Array<ReactPlace>>([]);
  const [allTargets, setAllTargets] = useState<Array<ReactRoutableTarget>>([]);
  const [currentRoute, setRoute] = useState<ReactRoutingPosition>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [featureModelGraph, setFeatureModelGraph] = useState<FeatureModelGraph>()



  const navigation = useNavigation();
  const apiKey: string = Constants.manifest?.extra?.apiKey;
  const lat = location ? location.latitude : (gpsPosition ? gpsPosition.lat : 0);
  const lng = location ? location.longitude : (gpsPosition ? gpsPosition.lng : 0);

  const handleRoute = async (target: ReactRoutableTarget) => {
    setModalVisible(false);
    try {
      const routingTarget = await routeToNode(target);
      if (routingTarget.nextRoutingPosition) {
        console.log('route:', JSON.stringify(routingTarget));
      }
    } catch (error) {
      console.error('Error routing to target:', error);
    }
  };

  const getGraph = async (id:number) => {
    const graph = await getFeatureModelGraph(id)
    setFeatureModelGraph(graph)
  }


  useEffect(() => {
    if (!sdkInitialized) {
      initializeSDK();
      const syncUpdates = DeviceEventEmitter.addListener('syncProgressUpdate', (params) => {
        setSync(params.syncProgress);
      });
      async () => await syncData()
    }
  }, [sdkInitialized]);

  useEffect(() => {
    console.log(syncValue)
    if (sdkInitialized && syncValue === 1) {
      fetchAllBuildings();
      if (location?.indoor?.buildingName) {
        getQueryTargets("").then()
        console.log(location.indoor.featureModelId!!)
        getGraph(location.indoor.featureModelId!!)
      }
      const bleUpdates = DeviceEventEmitter.addListener('bleUpdate', (params) => {
        setBleValues(params);
      });
      const positionUpdates = DeviceEventEmitter.addListener('locationUpdate', (params) => {
        setLocation(params);
        setLoadingPosition(false);
      });
      const usingGpsUpdate = DeviceEventEmitter.addListener('usingGPSUpdate', (params) => {
        setUsingGps(params);
      });
      const newGpsLocationUpdate = DeviceEventEmitter.addListener('newGpsLocationUpdate', (params) => {
        setGpsPosition(params);
      });
      const wifiUpdates = DeviceEventEmitter.addListener('wifiUpdate', (params) => {
        setWifiValues(params);
      });
      const modelUpdates = DeviceEventEmitter.addListener('modelTypeUpdate', (params) => {
        setModelType(params.modetype);
      });

      const listenToRoute = DeviceEventEmitter.addListener('routeUpdated', (params) => {
        setRoute(params);

      });
      return () => {
        bleUpdates.remove();
        positionUpdates.remove();
        usingGpsUpdate.remove();
        newGpsLocationUpdate.remove();
        wifiUpdates.remove();
        modelUpdates.remove();
        listenToRoute.remove();
      };
    }
  }, [sdkInitialized, syncValue, location]);

  const sync: SyncingInterval = {
    interval: 1,
  };

  const snap = async (location: ReactCombainLocation) => {
    const p = await snapToGraph(location).then((data) => console.log(data))
  }

  const getQueryTargets = async (name: string) => {
    const getRoutable = await queryTarget(name);
    setAllTargets(getRoutable);
  }

  const routingConfig: ReactRoutingConfig = {
    routableNodesOptions: ReactRoutableNodesOptions.All,
  };

  const indoorNavigationSDKConfig: ReactIndoorNavigationSDKConfig = {
    apiKey: apiKey,
    routingConfig: routingConfig,
    syncingInterval: sync,
  };


  const fetchAllBuildings = async () => {
    const places = await getAllPlaces().then();
    setAllPlaces(places);
  }

  const initializeSDK = async () => {
    try {
      await initSDK(indoorNavigationSDKConfig);
      console.log('SDK initialized');
      setSdkInitialized(true);
      await start();
      console.log('SDK STARTED');
    } catch (error) {
      console.error('SDK initialization error:', error);
      setSdkInitialized(false);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.titleTextBox}>
        <Text style={styles.titleText}>You are in: {location?.indoor?.buildingName}</Text>
        <Text style={styles.titleText}>Floor: {location?.indoor?.floor}</Text>
      </View>
      {sdkInitialized && syncValue === 1 ? (
        loadingPosition ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <MapView
            style={styles.map}
            customMapStyle={mapStyle}
            minZoomLevel={10}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
          >
            <BlueDotMarker coordinate={{ latitude: lat, longitude: lng }} />
            <AreaPolygons allPlaces={allPlaces} />
            {currentRoute && <RoutingPath startPosition={currentRoute} />}
            {featureModelGraph && <FeatureModelMap featureModelGraph={featureModelGraph}></FeatureModelMap>}
          </MapView>
        )
      ) : (
        <View>
          <Text style={styles.text}>Sync progress: {syncValue * 100}% </Text>
          <Text style={styles.text}>Initializing SDK...</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setModalVisible(!isModalVisible)}
      >
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(!isModalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Routable Targets</Text>
            <FlatList
              data={allTargets.filter(target => target.name!="Node" && target.name!="Footway")}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleRoute(item)}
                >
                  <Text style={styles.dropdownText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.nodeId!.toString()}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('ViewAllBuildingsScreen');
              }}
            >
              <Text style={styles.modalButtonText}>View All Buildings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => snap(location!)}
            >
              <Text style={styles.modalButtonText}>Enable Snap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    zIndex: 2,
  },
  menuButtonText: {
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 15,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: Colors.arkadNavy,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  titleTextBox: {
    marginTop: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    textAlign: "center",
    color: '#FFF'
  },
  titleText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFF',
  },
});
