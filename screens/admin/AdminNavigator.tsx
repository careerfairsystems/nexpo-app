import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HeaderStyles } from "components/HeaderStyles";
import AdminScreen from './AdminScreen';

export type AdminStackParamList = {
    AdminScreen: undefined;
};
const MapStack = createStackNavigator<AdminStackParamList>();

export function AdminNavigator() {
    return (
        <MapStack.Navigator>
            <MapStack.Screen
                name="AdminScreen"
                component={AdminScreen}
                options={{ title: 'Admin', headerTitle: 'Admin', ...HeaderStyles }}
            />
        </MapStack.Navigator>
    );
}