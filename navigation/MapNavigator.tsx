import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import MapScreen from "../screens/MapScreen";
import ZoomMapScreen from '../screens/ZoomMapScreen';
import { Map } from '../components/maps/MapProps';


export type MapStackParamList = {
  MapScreen: undefined;
  ZoomMapScreen: {
    map: Map;
  };
};
const MapStack = createStackNavigator<MapStackParamList>();
export function MapNavigator() {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ title: 'Maps', headerTitle: 'Maps' }} />
      <MapStack.Screen
        name="ZoomMapScreen"
        component={ZoomMapScreen}
        options={{ title: 'Map', headerTitle: 'Map' }} />
    </MapStack.Navigator>
  );
}
