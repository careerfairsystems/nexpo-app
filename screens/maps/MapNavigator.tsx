import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import MapScreen from "./MapScreen";
import ZoomMapScreen from './ZoomMapScreen';
import { Map } from '../../components/maps/MapProps';
import { HeaderStyles } from '../../components/HeaderStyles';


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
        options={{ title: 'Maps', headerTitle: 'Maps', ...HeaderStyles }} />
      <MapStack.Screen
        name="ZoomMapScreen"
        component={ZoomMapScreen}
        options={{ title: 'Map', headerTitle: 'Maps', ...HeaderStyles }} />
    </MapStack.Navigator>
  );
}
